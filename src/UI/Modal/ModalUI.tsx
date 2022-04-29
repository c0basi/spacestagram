import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React from 'react';
import './ModalUI.scss';

interface ModalProps {
	children: React.ReactNode;
	handleClose: () => void;
	open: boolean;
}

const style2 = {
	overflowY: 'auto',
	maxWidth: '700px',
	width: '80%',
	maxHeight: '80%',
	marginBlock: 'auto',
	backgroundColor: '#171717',
};

const StyledModal = styled(Modal)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	// backgroundColor: '#171717',
	margin: 3,
});

export default function BasicModal({
	children,
	handleClose,
	open,
}: ModalProps) {
	return (
		<div>
			<StyledModal
				disableEscapeKeyDown={true}
				BackdropProps={{
					style: { backgroundColor: 'rgba(255,255,255,0.3) ' },
				}}
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style2}>{children}</Box>
			</StyledModal>
		</div>
	);
}
