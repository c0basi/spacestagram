import React from 'react';

interface ErrorModalProps {
	message: string | null;
}

const ErrorModal = ({ message }: ErrorModalProps) => {
	return (
		<div className="error">
			<span>{message}</span>
		</div>
	);
};

export default ErrorModal;
