import React, { useEffect, useState } from 'react';
import { Apod } from '../../types/Types';
import ImageCard from '../../UI/ImageCard/ImageCard';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import MessageModal from '../../UI/MessageModal/MessageModal';
import {
	arraySort,
	convertDateRange,
	getNasaData,
	setDefaultDate,
} from '../../utils/dateFunctions';
import UtilityBar from '../UtilityBar/UtilityBar';
import './DataSection.scss';
import { MediaType } from '../../types/Types';

const DataSection = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [errorMessage, setErrorMessage] = useState<null | string>(null);
	const [dateRange, setDateRange] = useState<any[]>(setDefaultDate(true));
	const [nasaPosts, setNasaPosts] = useState<Apod[]>([]);
	const [likedNasaPosts, setLikedNasaPosts] = useState<Apod[]>([]);
	const [showExplorePage, setShowExplorePage] = useState(true);

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

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const res = await getNasaData(earthDates);
				const data = await res.data;
				let fetchedData: Apod[] = [];
				fetchedData = [...data];
				// inatially set the isliked property to false
				fetchedData.map((item) => (item.isLiked = false));
				fetchedData.sort((a, b) =>
					arraySort(new Date(a.date), new Date(b.date))
				);
				setIsLoading(false);
				setNasaPosts(fetchedData);
				setHasError(false);
			} catch (err) {
				setIsLoading(false);
				setHasError(true);
				setErrorMessage(String(err));
			}
		};
		fetchData();
	}, [dateRange]);

	const likeButtonHandler = (index: number) => {
		// change like property of the nasa post
		const likedNasaPost = {
			...nasaPosts[index],
			isLiked: !nasaPosts[index].isLiked,
		};
		console.log('liked post');

		console.log(likedNasaPost);

		const tempNasaPosts = [...nasaPosts];
		tempNasaPosts[index] = likedNasaPost;
		let tempLikedNasaPosts = [...likedNasaPosts];

		// check if the post is part of the likedNasaPosts
		const existingPostIndex = likedNasaPosts.findIndex(
			(post) => post.title === nasaPosts[index].title
		);

		if (existingPostIndex !== -1) {
			tempLikedNasaPosts[existingPostIndex] = likedNasaPost;
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
		// update the post (isLiked property changed)
		tempNasaPosts[unlikedPostIndex] = postToRemove;

		//filter out all unliked posts from likedNasaPosts
		tempLikedNasaPosts = tempLikedNasaPosts.filter((post) => post.isLiked);

		setNasaPosts(tempNasaPosts);
		setLikedNasaPosts(tempLikedNasaPosts);
	};

	const Result = () => {
		if (isLoading) {
			return <LoadingSpinner />;
		}
		if (hasError) {
			return <MessageModal message={errorMessage} error={true} />;
		}
		if (!isLoading && showExplorePage) {
			return (
				<>
					{nasaPosts.map((item, index) => (
						<ImageCard
							key={index}
							//  maybe make the component be an iframe instead of an image for videos ??
							image={
								item.media_type === MediaType.IMAGE
									? item.hdurl
									: item.thumbnail_url!
							}
							title={item.title}
							description={item.explanation}
							date={item.date}
							isLiked={item.isLiked}
							onClickLike={likeButtonHandler.bind(this, index)}
						/>
					))}
				</>
			);
		} else {
			return (
				<>
					{likedNasaPosts.length < 1 ? (
						<MessageModal message={'No liked photos'} />
					) : (
						likedNasaPosts.map((item, index) => (
							<ImageCard
								key={index}
								//  maybe make the component be an iframe instead of an image for videos ??
								image={
									item.media_type === MediaType.IMAGE
										? item.hdurl
										: item.thumbnail_url!
								}
								title={item.title}
								description={item.explanation}
								date={item.date}
								isLiked={item.isLiked}
								onClickLike={removeLikeHandler.bind(this, index)}
							/>
						))
					)}
				</>
			);
		}
	};

	console.log(likedNasaPosts);

	return (
		<section className="container">
			<>
				<UtilityBar
					onDateChange={dateRangeHnadler}
					likes={likedNasaPosts.length}
					onClickExplore={showExploreHandler}
					onClickLikes={showLikedHandler}
				/>
				{nasaPosts.length}
				<div className="container__content">
					<Result />
				</div>
			</>
		</section>
	);
};

export default DataSection;
