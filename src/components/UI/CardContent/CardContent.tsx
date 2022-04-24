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
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import CancelIcon from '@mui/icons-material/Cancel';

interface PostProps {
	onCloseModal: () => void;
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
const Post = () => {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleClick = () => {
		console.log('clicked');
	};

	return (
		<Card>
			<CardHeader
				// action={
				// 	<IconButton aria-label="settings" onClick={onCloseModal}>
				// 		<CancelIcon color="error" />
				// 	</IconButton>
				// }
				title="Shrimp and Chorizo Paella"
				subheader="September 14, 2016"
			/>
			<CardMedia
				component="img"
				height="20%"
				image="data:image/jpeg;base64,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"
				alt="Paella dish"
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					This impressive paella is a perfect party dish and a fun meal to cook
					together with your guests. Add 1 cup of frozen peas along with the
					mussels, if you like.
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites" onClick={handleClick}>
					<Checkbox
						icon={<FavoriteBorder />}
						checkedIcon={<Favorite sx={{ color: 'red' }} />}
					/>
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
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
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>Method:</Typography>
					<Typography paragraph>
						Heat 1/2 cup of the broth in a pot until simmering, add saffron and
						set aside for 10 minutes.
					</Typography>
					<Typography paragraph>
						Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
						over medium-high heat. Add chicken, shrimp and chorizo, and cook,
						stirring occasionally until lightly browned, 6 to 8 minutes.
						Transfer shrimp to a large plate and set aside, leaving chicken and
						chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
						onion, salt and pepper, and cook, stirring often until thickened and
						fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
						cups chicken broth; bring to a boil.
					</Typography>
					<Typography paragraph>
						Add rice and stir very gently to distribute. Top with artichokes and
						peppers, and cook without stirring, until most of the liquid is
						absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
						shrimp and mussels, tucking them down into the rice, and cook again
						without stirring, until mussels have opened and rice is just tender,
						5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
					</Typography>
					<Typography>
						Set aside off of the heat to let rest for 10 minutes, and then
						serve.
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default Post;
