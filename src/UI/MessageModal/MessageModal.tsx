import React from 'react';
import { getTodaysDate } from '../../utils/dateFunctions';
import './MessageModal.scss';

interface MessageModalProps {
	message: string | null;
	error?: boolean;
}

const todaysDate = getTodaysDate();

const MessageModal = ({ message, error }: MessageModalProps) => {
	return (
		<div className={`message ${error ? 'error' : ''}`}>
			<span>{message}.</span>
			{error && (
				<span>Make sure the date is not greater than {todaysDate}.</span>
			)}
		</div>
	);
};

export default MessageModal;
