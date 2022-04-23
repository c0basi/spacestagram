import React from 'react';
import './ImageCard.scss';

interface ImageCardProps {
	image: string;
	alt: string;
}

const ImageCard = ({ image, alt }: ImageCardProps) => {
	console.log(image);

	return (
		<div className="image--container">
			<img src={image} alt={alt} className="nasa-images" />
		</div>
	);
};

export default ImageCard;
