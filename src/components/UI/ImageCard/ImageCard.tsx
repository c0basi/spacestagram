import React from 'react';
import './ImageCard.scss';

const ImageCard = () => {
	return (
		<div className="image--container">
			<img
				src="https://apod.nasa.gov/apod/image/2204/N11_HubbleLake_1600.jpg"
				alt=""
				className="nasa-images"
			/>
		</div>
	);
};

export default ImageCard;
