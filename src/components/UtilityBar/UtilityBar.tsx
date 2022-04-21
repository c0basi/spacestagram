import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Badge from '@mui/material/Badge';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import './UtilityBar.scss';
import { setDefaultDate } from '../../utils/dateFunctions';

const UtilityBar = () => {
	const [date, setDate] = React.useState<any>(setDefaultDate(false));

	const handleSelectedDate = (date: Date[]) => {
		setDate(date);
	};

	return (
		<div className="utility">
			<div className="utility__actions">
				<h2 className="uitlity__actions--title">Home</h2>
				<IconButton aria-label="delete">
					<Badge badgeContent={4} color="error">
						<ThumbUpIcon />
					</Badge>
				</IconButton>
			</div>
			<DateRangePicker
				value={date}
				onChange={setDate}
				minDate={new Date(1995, 5, 16)}
			/>
		</div>
	);
};

export default UtilityBar;
