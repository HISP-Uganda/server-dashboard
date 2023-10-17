import * as React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
} from "@mui/material";

interface DeleteDialogProps {
   open: boolean;
   instanceName: string;
   onCancel: () => void;
   onConfirm: () => void;
}

const DeleteDialog = (props: DeleteDialogProps) => {
	const { open, instanceName, onCancel, onConfirm } = props;

	return (
		<Dialog open={open} onClose={onCancel}>
			<DialogTitle>Delete Instance</DialogTitle>
			<DialogContent>
				<Typography variant="body1" color="text.primary">
					Are you sure you want to delete <b>{instanceName}</b>?
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCancel}>Cancel</Button>
				<Button onClick={onConfirm} sx={{ color: "error.main" }}>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default DeleteDialog;
