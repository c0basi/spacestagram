import { Favorite } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import './CardContent.scss';

interface PostProps {
	onCloseModal: () => void;
	title: string;
	date: string;
	description?: string;
	image: string;
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
	isLiked,
}: PostProps) => {
	const [expanded, setExpanded] = React.useState(false);

	let descriptionContent;
	// display only a part of the description until expand is clicked
	if (expanded) {
		descriptionContent = description;
	} else {
		descriptionContent = description?.substring(0, 200) + '...';
	}

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const likeClickHandler = (ev: React.MouseEvent<HTMLButtonElement>) => {
		ev.stopPropagation();
		onCloseModal();
	};

	return (
		<Card className="ModalCard">
			<CardHeader
				action={
					<IconButton aria-label="settings" onClick={likeClickHandler}>
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
					{description ? descriptionContent : 'No description provided'}
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
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
		</Card>
	);
};

export default Post;
