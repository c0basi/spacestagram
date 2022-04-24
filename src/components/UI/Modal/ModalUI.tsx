import ReactDOM from 'react-dom';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import { styled } from '@mui/material';

// interface ModalProps {
// 	children: React.ReactNode;
// }

// const style = {
// 	position: 'absolute' as 'absolute',
// 	top: '50%',
// 	left: '50%',
// 	transform: 'translate(-50%, -50%)',
// 	bgcolor: 'background.paper',
// 	border: '2px solid #000',
// 	boxShadow: 24,
// 	p: 4,
// };

// const style2 = {
// 	overflowY: 'scroll',
// 	maxWidth: '700px',
// 	maxHeight: '70%',
// 	marginBlock: 'auto',
// 	backgroundColor: '#171717',
// };

// const StyledModal = styled(Modal)({
// 	display: 'flex',
// 	justifyContent: 'center',
// 	alignItems: 'center',
// 	backgroundColor: '#171717',
// 	margin: 3,
// });

// export default function BasicModal({ children }: ModalProps) {
// 	const [open, setOpen] = React.useState(false);
// 	const handleOpen = () => setOpen(true);
// 	const handleClose = () => setOpen(false);

// 	return (
// 		<div>
// 			<Button onClick={handleOpen}>Open modal</Button>
// 			<StyledModal
// 				BackdropProps={{
// 					style: { backgroundColor: '#01727498' },
// 				}}
// 				open={open}
// 				onClose={handleClose}
// 				aria-labelledby="modal-modal-title"
// 				aria-describedby="modal-modal-description"
// 			>
// 				<Box sx={style2}>{children}</Box>
// 			</StyledModal>
// 		</div>
// 	);
// }

import React from 'react';

interface ModalUIProps {
	onClose: () => void;
	children: React.ReactNode;
}

interface BackdropProps {
	onClose: () => void;
}

interface ModalOverlayProps {
	children: React.ReactNode;
}

const BackDrop = ({ onClose }: BackdropProps) => {
	return <div className="backdrop" onClick={onClose}></div>;
};

const ModalOverlay = ({ children }: ModalOverlayProps) => {
	return (
		<div className="modal">
			<div className="content">{children}</div>
		</div>
	);
};

const portalElement = document.getElementById('modal-overlays')!;
const ModalUI = (props: ModalUIProps) => {
	return (
		<>
			{ReactDOM.createPortal(
				<BackDrop onClose={props.onClose} />,
				portalElement
			)}
			{ReactDOM.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				portalElement
			)}
		</>
	);
};

export default ModalUI;
