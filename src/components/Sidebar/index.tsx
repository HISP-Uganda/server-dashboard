import * as React from "react";
import Drawer from "@mui/material/Drawer";
import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	Typography,
} from "@mui/material";
import { useServers } from "../../stores";
import ServerConfig from "../ServerConfig";
import ServerCard from "./ServerCard";

const drawerWidth = 320;

const Sidebar: React.FC<{}> = () => {
	const store = useServers();
	const servers = store.servers;
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleAddServer = () => {
		setOpen(true);
	};

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					backgroundColor: "#f3f4f5",
					marginTop: "48px",
					paddingBottom: "120px",
					boxSizing: "border-box",
				},
			}}
			variant="permanent"
			anchor="left"
		>
			<>
				{!!servers && servers.length > 0 ? (
					<>
						{servers.map((server) => (
							<ServerCard key={server.id} server={server} />
						))}
					</>
				) : (
					<Box sx={{ mx: 1, my: 1.2 }}>
						<Card sx={{ minWidth: 50 }}>
							<CardActionArea onClick={handleAddServer}>
								<CardContent>
									<Typography
										variant="h5"
										color="text.secondary"
										marginBottom={0}
									>
										No Servers
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Box>
				)}
				<Box
					sx={{
						position: "fixed",
						bottom: 0,
						backgroundColor: "#e9eaeb",
						width: drawerWidth,
					}}
				>
					<Box sx={{ mx: 1, mb: "1rem", mt: "1.5rem" }}>
						<Button variant="contained" onClick={handleAddServer}>
							New Instance
						</Button>
					</Box>
				</Box>
			</>
			<ServerConfig onClose={handleClose} open={open} />
			<ServerConfig onClose={store.stopEdit} open={!!store.currentEdit} server={store.currentEditServer} />
		</Drawer>
	);
};

export default Sidebar;
