import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './DataSection.scss';
import { convertDateRange, setDefaultDate } from '../../utils/dateFunctions';
import UtilityBar from '../UtilityBar/UtilityBar';
import { getNasaData } from '../../utils/dateFunctions';
import ImageCard from '../UI/ImageCard/ImageCard';
import { Apod } from '../../types/Types';
const api_Key = 'EgxctQoITsGFJtjVAXfeldq6xEKnW6y9j4Wwm0IG';

const DataSection = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [errorMessage, setErrorMessage] = useState<null | string>(null);
	const [dateRange, setDateRange] = useState<any[]>(setDefaultDate(true));
	const [nasaPosts, setNasaPosts] = useState<Apod[]>([]);

	// modal
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
			setIsLoading(false);
			setNasaPosts(data);
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

	// console.log('url is ', nasaPosts[0].title);

	// console.log(`gotenthe posts`, nasaPosts[0]);

	return (
		<section className="container">
			<>
				<UtilityBar onDateChange={dateRangeHnadler} />
				<button onClick={clickHandler}>Click</button>
				{isLoading && <p>Loading...</p>}
				{hasError && <p>error...</p>}
				{nasaPosts.length}
				<div className="container--images">
					{!isLoading &&
						nasaPosts.map((item, index) => (
							<ImageCard
								key={index}
								image={item.hdUrl ? item.hdUrl : item.url}
								title={item.title}
								onOpenModal={handleOpen}
								onCloseModal={handleClose}
								open={openModal}
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
