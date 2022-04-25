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

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const res = await getNasaData(earthDates);
			const data = await res.data;
			console.log('waiting for data');

			console.log(data);
			let fetchedData: Apod[] = [];

			fetchedData = data;
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

	const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		fetchData();
	};

	const likeHnadler = (index: number) => {
		// chan
	};

	// console.log(nasaPosts[0].date);

	// console.log('url is ', nasaPosts[0].title);

	// console.log(`gotenthe posts`, nasaPosts[0]);

	return (
		<section className="container">
			<>
				<UtilityBar onDateChange={dateRangeHnadler} />
				<button onClick={clickHandler}>Click</button>
				{hasError && <p>error...</p>}
				{nasaPosts.length}
				<div className="container--images">
					{isLoading && <LoadingSpinner />}
					{!isLoading &&
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
