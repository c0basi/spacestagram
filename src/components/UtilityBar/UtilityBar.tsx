import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import React from 'react';
import { setDefaultDate } from '../../utils/dateFunctions';
import './UtilityBar.scss';

interface UtilityBarProps {
	onDateChange: (daterange: string[]) => void;
}

const UtilityBar = ({ onDateChange }: UtilityBarProps) => {
	const [date, setDate] = React.useState<any>(setDefaultDate(false));

	const handleSelectedDate = (date: string | Date) => {
		setDate(date);
	};
	console.log(date);

	return (
		<div className="utility">
			<div className="utility__actions">
				<h2 className="uitlity__actions--title">Explore</h2>
				<IconButton aria-label="delete">
					<Badge badgeContent={4} color="error">
						<ThumbUpIcon />
					</Badge>
				</IconButton>
			</div>
			<DateRangePicker
				value={date}
				onChange={handleSelectedDate}
				minDate={new Date(1995, 5, 16)}
			/>
		</div>
	);
};

export default UtilityBar;
