import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import InfoIcon from '@mui/icons-material/Info';
import React, { useState } from 'react';
import './ImageCard.scss';
import BasicModal from '../Modal/ModalUI';
import Post from '../CardContent/CardContent';

interface ImageCardProps {
	image: string;
	title: string;
	open: boolean;
	description?: string;
	date: string;
	onOpenModal: () => void;
	onCloseModal: () => void;
	index: number;
}

const ImageCard = ({
	image,
	title,
	onOpenModal,
	onCloseModal,
	description,
	date,
	open,
	index,
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
						<IconButton aria-label="add to likes">
							<Checkbox
								icon={<Favorite sx={{ color: 'white' }} />}
								checkedIcon={<Favorite sx={{ color: 'red' }} />}
							/>
						</IconButton>

						<IconButton aria-label="more info" onClick={handleOpen}>
							<InfoIcon sx={{ color: 'white' }} />
						</IconButton>
						<BasicModal
							handleClose={handleClose}
							open={openModal}
							handleOpen={handleOpen}
						>
							<Post
								onCloseModal={onCloseModal}
								date={date}
								description={description}
								title={title}
								image={image}
								index={index}
							/>
						</BasicModal>
					</div>
				</div>
			</div>
			{/* commented this out */}
			{/* {open && (
				<Post
					onCloseModal={onCloseModal}
					date={date}
					description={description}
					title={title}
					image={image}
					index={index}
				/>
			)} */}
		</>
	);
};

export default ImageCard;
