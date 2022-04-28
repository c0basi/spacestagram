import axios from 'axios';
const api_Key = 'EgxctQoITsGFJtjVAXfeldq6xEKnW6y9j4Wwm0IG';

export const getTodaysDate = () => {
	const currentDate = new Date();
	return currentDate.toLocaleDateString();
};

export const getRegularDate = (date: string) => {
	const day = new Date(date).getDate();
	const month = new Date(date).getMonth() + 1;
	const year = new Date(date).getFullYear();
	const dateString = year + '-' + month + '-' + day;
	return dateString;
};

// rember to keep date range naming consistent
export const convertDateRange = (dateRange: string[]) => {
	return [getRegularDate(dateRange[0]), getRegularDate(dateRange[1])];
};

// sets the date range picker to the past week
export const setDefaultDate = (stringUse = false) => {
	const currentDate = new Date();
	const oneWeekAgo = new Date();
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

	/*  checks if we are using the string representation of date
	the react-date range picker uses Date[],
	 while we want to convert the dates to the strign for the nasa api requests
	*/

	const defaultDate = stringUse
		? [
				...convertDateRange([
					oneWeekAgo.toISOString(),
					currentDate.toISOString(),
				]),
		  ]
		: [oneWeekAgo, currentDate];

	return defaultDate;
};

export const isoStringToDate = (date: string) => {
	const dates = date.split(',');
	const newDate = new Date(dates[0]);
	const newDate2 = new Date(dates[1]);
	return [newDate, newDate2];
};

export const getNasaData = (dateRange: string[]) => {
	const req = axios.get(
		`https://api.nasa.gov/planetary/apod?api_key=${api_Key}&thumbs=true&start_date=${dateRange[0]}&end_date=${dateRange[1]}`
	);
	return req;
};

// sort an array of objects based on their dates
export const arraySort = (a: Date, b: Date) => {
	if (a < b) return 1;
	if (a > b) return -1;
	return 0;
};
