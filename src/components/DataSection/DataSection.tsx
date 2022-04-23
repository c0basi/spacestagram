import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './DataSection.scss';
import { convertDateRange, setDefaultDate } from '../../utils/dateFunctions';
import UtilityBar from '../UtilityBar/UtilityBar';
import { getNasaData } from '../../utils/dateFunctions';
const api_Key = 'EgxctQoITsGFJtjVAXfeldq6xEKnW6y9j4Wwm0IG';

const DataSection = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [errorMessage, setErrorMessage] = useState<null | string>(null);
	const [dateRange, setDateRange] = useState<any[]>(setDefaultDate(true));

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
			console.log(data);
			setIsLoading(false);
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
	return (
		<section className="container">
			<>
				<UtilityBar onDateChange={dateRangeHnadler} />
				<button onClick={clickHandler}>Click</button>
				{isLoading && <p>Loading...</p>}
				{hasError && <p>error...</p>}
			</>
		</section>
	);
};

export default DataSection;
