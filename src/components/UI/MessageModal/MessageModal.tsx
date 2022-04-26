import React from 'react';
import './MessageModal.scss';

interface MessageModalProps {
	message: string | null;
	error?: boolean;
}

const MessageModal = ({ message }: MessageModalProps) => {
	return (
		<div className="message">
			<span>{message}</span>
		</div>
	);
};

export default MessageModal;
