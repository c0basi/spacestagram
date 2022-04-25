import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './DataSection.scss';
import { convertDateRange, setDefaultDate } from '../../utils/dateFunctions';
import UtilityBar from '../UtilityBar/UtilityBar';
import { getNasaData } from '../../utils/dateFunctions';
import ImageCard from '../UI/ImageCard/ImageCard';
import { Apod } from '../../types/Types';
import { arraySort } from '../../utils/dateFunctions';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
const api_Key = 'EgxctQoITsGFJtjVAXfeldq6xEKnW6y9j4Wwm0IG';

const DataSection = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [errorMessage, setErrorMessage] = useState<null | string>(null);
	const [dateRange, setDateRange] = useState<any[]>(setDefaultDate(true));
	const [nasaPosts, setNasaPosts] = useState<Apod[]>([]);
	const [likedNasaPosts, setLikedNasaPosts] = useState<Apod[]>([]);
	const [showExplorePage, setShowExplorePage] = useState(true);

	// modal chanhe name of these handlers
	const [openModal, setOpenModal] = useState(false);
	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);

	console.log('date range for data section', dateRange);

	// get the startdate and end date from the utility bar component
	const dateRangeHnadler = (range: string[]) => {
		setDateRange(range);
		console.log('set the dates', dateRange);
	};

	const earthDates = convertDateRange(dateRange);
	console.log(earthDates);

	const showExploreHandler = () => {
		setShowExplorePage(true);
	};

	const showLikedHandler = () => {
		setShowExplorePage(false);
	};

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const res = await getNasaData(earthDates);
			const data = await res.data;
			console.log('waiting for data');

			console.log(data);
			let fetchedData: Apod[] = [];

			fetchedData = data;
			fetchedData.map((item) => (item.isLiked = false));
			fetchedData.sort((a, b) => arraySort(new Date(a.date), new Date(b.date)));
			setIsLoading(false);
			setNasaPosts(fetchedData);
			setHasError(false);
		} catch (err) {
			setIsLoading(false);
			setHasError(true);
			console.log(err);
			setErrorMessage(err as string);
		}
	};

	useEffect(() => {
		fetchData();
	}, [dateRange]);

	// liked posts before like handler
	console.log('liked posts before like handler');

	console.log(likedNasaPosts);
	const likeButtonHandler = (index: number) => {
		// change like property of the nasa post
		const likedNasaPost = {
			...nasaPosts[index],
			isLiked: !nasaPosts[index].isLiked,
		};
		console.log('liked post');

		console.log(likedNasaPost);

		// update the content of the . needs work here
		const tempNasaPosts = [...nasaPosts];
		tempNasaPosts[index] = likedNasaPost;
		let tempLikedNasaPosts = [...likedNasaPosts];

		const existingPostIndex = likedNasaPosts.findIndex(
			(post) => post.title === nasaPosts[index].title
		);

		if (existingPostIndex !== -1) {
			if (likedNasaPost.isLiked) {
				tempLikedNasaPosts[existingPostIndex] = likedNasaPost;
			} else {
				// remove post from likedNasaPost if isLiked is  false
				tempLikedNasaPosts[existingPostIndex] = likedNasaPost;
				tempLikedNasaPosts = tempLikedNasaPosts.filter(
					(post) => post.title !== likedNasaPost.title
				);
			}
		} else {
			tempLikedNasaPosts = [...tempLikedNasaPosts, likedNasaPost];
		}

		setNasaPosts(tempNasaPosts);
		setLikedNasaPosts(tempLikedNasaPosts);
		console.log(likedNasaPosts);
	};

	const removeLikeHandler = (index: number) => {
		const postToRemove: Apod = {
			...likedNasaPosts[index],
			isLiked: !likedNasaPosts[index].isLiked,
		};
		let tempNasaPosts = [...nasaPosts];
		let tempLikedNasaPosts = [...likedNasaPosts];
		tempLikedNasaPosts[index] = postToRemove;

		// find the index of the post to be unliked from the nasaPosts
		const unlikedPostIndex = nasaPosts.findIndex(
			(post) => post.title === likedNasaPosts[index].title
		);
		tempNasaPosts[unlikedPostIndex] = postToRemove;

		//filter out all unliked posts from likedNasaPosts
		tempLikedNasaPosts = tempLikedNasaPosts.filter((post) => post.isLiked);

		setNasaPosts(tempNasaPosts);
		setLikedNasaPosts(tempLikedNasaPosts);
	};

	// console.log(nasaPosts[0].date);
	// console.log(nasaPosts);

	// console.log('url is ', nasaPosts[0].title);

	// console.log(`gotenthe posts`, nasaPosts[0]);

	return (
		<section className="container">
			<>
				<UtilityBar
					onDateChange={dateRangeHnadler}
					likes={likedNasaPosts.length}
					onClickExplore={showExploreHandler}
					onClickLikes={showLikedHandler}
				/>
				{hasError && <p>error...</p>}
				{nasaPosts.length}
				<div className="container--images">
					{isLoading && <LoadingSpinner />}
					{showExplorePage &&
						nasaPosts.map((item, index) => (
							<ImageCard
								key={index}
								image={item.hdUrl ? item.hdUrl : item.url}
								title={item.title}
								onOpenModal={handleOpen}
								onCloseModal={handleClose}
								description={item.explanation}
								date={item.date}
								open={openModal}
								index={index}
								isLiked={item.isLiked}
								onClickLike={likeButtonHandler.bind(this, index)}
							/>
						))}
					{!showExplorePage &&
						likedNasaPosts.map((item, index) => (
							<ImageCard
								key={index}
								image={item.hdUrl ? item.hdUrl : item.url}
								title={item.title}
								onOpenModal={handleOpen}
								onCloseModal={handleClose}
								description={item.explanation}
								date={item.date}
								open={openModal}
								isLiked={item.isLiked}
								index={index}
								onClickLike={removeLikeHandler.bind(this, index)}
							/>
						))}
					{/* <ImageCard />
					<ImageCard />
					<ImageCard />
					<ImageCard />
					<ImageCard /> */}
				</div>
			</>
		</section>
	);
};

export default DataSection;
