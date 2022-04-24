import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';
import './ImageCard.scss';
import BasicModal from './Modal/ModalUI';

interface ImageCardProps {
	image: string;
	title: string;
	open: boolean;
	onOpenModal: () => void;
	onCloseModal: () => void;
}

const ImageCard = ({
	image,
	title,
	onOpenModal,
	onCloseModal,
	open,
}: ImageCardProps) => {
	// const [openModal, setOpenModal] = useState(false);
	// const handleOpen = () => setOpenModal(true);
	// const handleClose = () => setOpenModal(false);
	console.log(image);

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
						<IconButton aria-label="more info" onClick={onOpenModal}>
							<InfoIcon sx={{ color: 'white' }} />
						</IconButton>
					</div>
				</div>
			</div>
			<BasicModal />
		</>
	);
};

export default ImageCard;
