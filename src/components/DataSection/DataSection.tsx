import axios from 'axios';
import React, { useState } from 'react';
import './DataSection.scss';
import { setDefaultDate } from '../../utils/dateFunctions';
import UtilityBar from '../UtilityBar/UtilityBar';

const api_Key = 'EgxctQoITsGFJtjVAXfeldq6xEKnW6y9j4Wwm0IG';

const DataSection = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [errorMessage, setErrorMessage] = useState<null | string>(null);
	const [dateRange, setDateRange] = useState<any[]>(setDefaultDate(true));

	// get the startdate and end date from the utility bar component
	const dateRangeHnadler = (range: string[]) => {
		setDateRange(range);
	};

	const getData = async (key: string) => {
		try {
			setIsLoading(true);
			const res = await axios.get(
				`https://api.nasa.gov/planetary/apod?api_key=${key}`
			);
			const data = res.data;
			console.log(data);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			setHasError(true);
			console.log(err);
			setErrorMessage(err as string);
		}
	};

	const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		getData(api_Key);
	};
	return (
		<section className="container">
			<>
				<UtilityBar onDateChange={dateRangeHnadler} />
				<button onClick={clickHandler}>Click</button>
				{isLoading ? (
					<p>Loading...</p>
				) : hasError ? (
					<p>{errorMessage}</p>
				) : (
					<p>Worked Out ..</p>
				)}
			</>
		</section>
	);
};

export default DataSection;
