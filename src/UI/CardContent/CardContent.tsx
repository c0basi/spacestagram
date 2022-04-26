import React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { Favorite } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import ModalUI from '../Modal/ModalUI';

interface PostProps {
	onCloseModal: () => void;
	title: string;
	date: string;
	description?: string;
	image: string;
	index: number;
	isLiked?: boolean;
	onClickLike: () => void;
}

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

// add post props after
const Post = ({
	onCloseModal,
	onClickLike,
	title,
	description,
	date,
	image,
	index,
	isLiked,
}: PostProps) => {
	// const [expanded, setExpanded] = React.useState(false);

	// const handleExpandClick = () => {
	// 	setExpanded(!expanded);
	// };

	// const handleClick = () => {
	// 	console.log('clicked');
	// };
	// console.log('data for specific componet');

	// console.log(index);

	// changing thr modalui onclose

	return (
		// <ModalUI onClose={onCloseModal}>
		<Card>
			<CardHeader
				action={
					<IconButton aria-label="settings" onClick={onCloseModal}>
						<CancelIcon color="error" />
					</IconButton>
				}
				title={title}
				subheader={date}
			/>
			<CardMedia
				component="img"
				height="350px"
				image={image}
				alt={title}
				// sx={{ objectFit: 'contain' }}
			/>
			<CardContent>
				<Typography variant="h6" color="text.primary">
					{description ? description : 'No description provided'}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to likes" onClick={onClickLike}>
					{isLiked ? (
						<Favorite sx={{ color: 'red' }} />
					) : (
						<FavoriteBorder sx={{ color: 'red' }} />
					)}
				</IconButton>

				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
			</CardActions>
		</Card>
		// </ModalUI>
	);
};

export default Post;
