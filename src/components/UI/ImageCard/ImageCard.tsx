import React from 'react';
import './ImageCard.scss';

interface ImageCardProps {
	image: string;
	title: string;
}

const ImageCard = ({ image, title }: ImageCardProps) => {
	console.log(image);

	return (
		<div className="image--container">
			<img src={image} alt={title} className="nasa-images" />
			<div className="image--container__content">
				<h3 className="image--container__content--title">{title}</h3>
			</div>
		</div>
	);
};

export default ImageCard;
