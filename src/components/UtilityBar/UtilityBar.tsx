import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import React from 'react';
import { setDefaultDate } from '../../utils/dateFunctions';
import './UtilityBar.scss';

interface UtilityBarProps {
	onDateChange: (daterange: string[]) => void;
	likes: number;
	onClickExplore: () => void;
	onClickLikes: () => void;
}

const UtilityBar = ({
	onDateChange,
	likes,
	onClickExplore,
	onClickLikes,
}: UtilityBarProps) => {
	const [date, setDate] = React.useState<any[]>(setDefaultDate(false));

	const handleSelectedDate = (date: Date[]) => {
		onDateChange([date[0].toISOString(), date[1].toISOString()]);
		setDate(date);
	};

	return (
		<div className="utility">
			<div className="utility__actions">
				<h2 className="uitlity__actions--title" onClick={onClickExplore}>
					Explore
				</h2>
				<IconButton aria-label="likes" onClick={onClickLikes}>
					<Badge badgeContent={likes} color="error">
						<FavoriteBorder color="error" />
					</Badge>
				</IconButton>
			</div>
			<DateRangePicker
				value={date}
				onChange={(value) => handleSelectedDate(value as unknown as Date[])}
				minDate={new Date(1995, 5, 16)}
			/>
		</div>
	);
};

export default UtilityBar;
