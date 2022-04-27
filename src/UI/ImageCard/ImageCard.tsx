import Favorite from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';
import BasicModal from '../../UI/Modal/ModalUI';
import Post from '../CardContent/CardContent';
import './ImageCard.scss';

interface ImageCardProps {
	image: string;
	title: string;
	description?: string;
	date: string;
	onClickLike: () => void;
	isLiked?: boolean;
}

const ImageCard = ({
	image,
	title,
	onClickLike,
	description,
	date,
	isLiked,
}: ImageCardProps) => {
	const [openModal, setOpenModal] = useState(false);
	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);

	return (
		<>
			<div className="image--container">
				<img src={image} alt={title} className="nasa-images" />
				<div className="image--container__content">
					<h3 className="image--container__content--title">{title}</h3>
					<div className="image--container__content--icons">
						<IconButton aria-label="add to likes" onClick={onClickLike}>
							{isLiked ? (
								<Favorite sx={{ color: 'red' }} />
							) : (
								<Favorite sx={{ color: 'white' }} />
							)}
							{/* <Checkbox
								icon={<Favorite sx={{ color: 'white' }} />}
								checkedIcon={<Favorite sx={{ color: 'red' }} />}
							/> */}
						</IconButton>

						<IconButton aria-label="more info" onClick={handleOpen}>
							<InfoIcon sx={{ color: 'white' }} />
						</IconButton>
						<BasicModal handleClose={handleClose} open={openModal}>
							<Post
								onCloseModal={handleClose}
								date={date}
								description={description}
								title={title}
								image={image}
								isLiked={isLiked}
								onClickLike={onClickLike}
							/>
						</BasicModal>
					</div>
				</div>
			</div>
		</>
	);
};

export default ImageCard;
