export const getRegularDate = (date: string) => {
	const day = new Date(date).getDate();
	const month = new Date(date).getMonth() + 1;
	const year = new Date(date).getFullYear();
	const dateString = day + '-' + month + '-' + year;
	return dateString;
};
