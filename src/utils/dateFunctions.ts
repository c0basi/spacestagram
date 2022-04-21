export const getRegularDate = (date: string) => {
	const day = new Date(date).getDate();
	const month = new Date(date).getMonth() + 1;
	const year = new Date(date).getFullYear();
	const dateString = day + '-' + month + '-' + year;
	return dateString;
};

export const parseSelectedDates = (selectedDate: string[]) => {
	return [getRegularDate(selectedDate[0]), getRegularDate(selectedDate[1])];
};

// sets the date range picker to the past week
export const setDefaultDate = (stringVersion = false) => {
	const currentDate = new Date();
	const oneWeekAgo = new Date();
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

	// checks if we are using the string representation of date
	const defaultDate = stringVersion
		? [
				...parseSelectedDates([
					oneWeekAgo.toISOString(),
					currentDate.toISOString(),
				]),
		  ]
		: [oneWeekAgo, currentDate];

	return defaultDate;
};
