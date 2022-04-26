import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, styled } from '@mui/material';
import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import './ModalUI.scss';

interface ModalProps {
	children: React.ReactNode;
	handleOpen: () => void;
	handleClose: () => void;
	open: boolean;
}

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const style2 = {
	overflowY: 'scroll',
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
	handleOpen,
	handleClose,
	open,
}: ModalProps) {
	// const [open, setOpen] = React.useState(false);
	// const handleOpen = () => setOpen(true);
	// const handleClose = () => setOpen(false);

	return (
		<div>
			{/* <IconButton aria-label="more info" onClick={handleOpen}>
				<InfoIcon sx={{ color: 'white' }} />
			</IconButton> */}
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

// import React from 'react';

// interface ModalUIProps {
// 	onClose: () => void;
// 	children: React.ReactNode;
// }

// interface BackdropProps {
// 	onClose: () => void;
// }

// interface ModalOverlayProps {
// 	children: React.ReactNode;
// }

// const BackDrop = ({ onClose }: BackdropProps) => {
// 	return <div className="backdrop" onClick={onClose}></div>;
// };

// const ModalOverlay = ({ children }: ModalOverlayProps) => {
// 	return (
// 		<div className="modal">
// 			<div className="content">{children}</div>
// 		</div>
// 	);
// };

// const portalElement = document.getElementById('modal-overlay')!;
// const ModalUI = (props: ModalUIProps) => {
// 	return (
// 		<>
// 			{ReactDOM.createPortal(
// 				<BackDrop onClose={props.onClose} />,
// 				portalElement
// 			)}
// 			{ReactDOM.createPortal(
// 				<ModalOverlay>{props.children}</ModalOverlay>,
// 				portalElement
// 			)}
// 		</>
// 	);
// };

// export default ModalUI;
