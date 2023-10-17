import React from "react";
import {
   Box,
   Button,
   Card,
   CardActionArea,
   CardContent,
   Chip,
   CircularProgress,
   Grid,
   Paper,
   Stack,
   Typography,
   styled,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useServers } from "../../stores";
import ServerDashboard from "./ServerDashboard";
import ServerCard from "../Sidebar/ServerCard";
import ServerConfig from "../ServerConfig";

const fabStyle = {
   position: "absolute",
   bottom: 16,
   right: 16,
};

const Dashboard: React.FC = () => {
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
      <>
         {!!store.selected ? (
            <ServerDashboard />
         ) : (
            <>
               <Fab onClick={handleAddServer} color="primary" aria-label="add" sx={fabStyle}>
                  <AddIcon />
               </Fab>
               {!!servers && servers.length > 0 ? (
                  <Grid container spacing={2}>
                     {servers.map((server) => (
                        <Grid item xs={12} sm={6} md={4} key={server.id}>
                           <ServerCard server={server} />
                        </Grid>
                     ))}
                  </Grid>
               ) : (
                  <Box sx={{ mx: 1, my: 1.2 }}>
                     <Card sx={{ minWidth: 50 }}>
                        <CardActionArea onClick={handleAddServer}>
                           <CardContent>
                              <Typography variant="h5" color="text.secondary">
                                 Add a server
                              </Typography>
                           </CardContent>
                        </CardActionArea>
                     </Card>
                  </Box>
               )}
            </>
         )}

         <ServerConfig onClose={handleClose} open={open} />
         <ServerConfig onClose={store.stopEdit} open={!!store.currentEdit} server={store.currentEditServer} />
      </>
   );
   // const server = store.current;
   // if (!store.selected)
   //    return (
   //       <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
   //          <Typography paragraph>Select a server to view its dashboard.</Typography>
   //       </Box>
   //    );
   // else return <ServerDashboard />;
};

export default Dashboard;
