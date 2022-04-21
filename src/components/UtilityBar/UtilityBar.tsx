import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Badge from '@mui/material/Badge';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import './UtilityBar.scss';

const UtilityBar = () => {
	const [value, onChange] = useState([new Date(), new Date()]);
	console.log(value);

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
			<DateRangePicker value={value} />
		</div>
	);
};

export default UtilityBar;
