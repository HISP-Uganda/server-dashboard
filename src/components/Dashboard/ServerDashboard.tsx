import React from "react";
import Typography from "@mui/material/Typography";
import OnlineIndicator, { SmallOnlineIndicator } from "../OnlineIndicator";
import {
   Box,
   Button,
   ButtonGroup,
   Chip,
   CircularProgress,
   Grid,
   IconButton,
   Paper,
   Stack,
   Tab,
   ToggleButton,
   ToggleButtonGroup,
   styled,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useServers } from "../../stores";
import DashboardChart from "./Chart";
import { useGetServerByIdQuery, useRunScriptMutation } from "../../services/servers";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { WebTerminal } from "./WebTerminal";

const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#efefef",
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: "center",
   color: theme.palette.text.secondary,
}));

const ServerDashboard: React.FC = () => {
   const store = useServers();
   const [tab, setTab] = React.useState("1");
   const [selectedContainer, setSelectedContainer] = React.useState<string | null>(null);
   const [script, setScript] = React.useState<string | null>(null);
   const [runScript, { isLoading: isRunningScript, isError: scErr }] = useRunScriptMutation();
   const { data: server, isLoading, isError, error } = useGetServerByIdQuery(store.selected as any);
   const err: any = error; // coz ts being annoying

   const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
      console.log(nextView);
      setSelectedContainer(nextView);
   };

   const handleStart = () => {
      handleRun("start");
   };

   const handleStop = () => {
      handleRun("stop");
   };

   const handleRun = (script: string) => {
      if (!selectedContainer) return;
      setScript(script);
      runScript({ id: server!.id, formData: { container: selectedContainer, script } }).finally(() => {
         setScript(null);
      });
   };

   const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
      setTab(newValue);
   };

   console.log(server);

   return (
      <>
         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <div style={{ display: "flex" }}>
               <IconButton onClick={() => store.selectServer(null)}>
                  <ArrowBackIcon />
               </IconButton>
               <Typography variant="h4">{server?.name}</Typography>
            </div>
            {!!server && (
               <>
                  <Chip icon={<FaceIcon />} label={server.username} />
                  <OnlineIndicator />
               </>
            )}
         </Box>
         {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
               <CircularProgress />
            </Box>
         )}

         {isError && !isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
               <Typography paragraph>{err.data.error || error.toString()}</Typography>
            </Box>
         )}
         {!!server && !isError && !isLoading && (
            <>
               <Grid container spacing={2}>
                  <Grid item xs={12} md={2}>
                     <Item elevation={0}>
                        <Box
                           sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexDirection: "column",
                              minHeight: "380px",
                           }}
                        >
                           <ToggleButtonGroup
                              fullWidth
                              orientation="vertical"
                              value={selectedContainer}
                              exclusive
                              onChange={handleChange}
                              disabled={isRunningScript}
                           >
                              {server.info?.containers.map((c) => (
                                 <ToggleButton
                                    sx={{ justifyContent: "flex-start" }}
                                    value={c.name}
                                    aria-label={c.name}
                                    color={c.state.toLowerCase() == "running" ? "success" : "error"}
                                 >
                                    <SmallOnlineIndicator active={c.state.toLowerCase() === "running"} />
                                    {c.name}
                                 </ToggleButton>
                              ))}
                           </ToggleButtonGroup>
                        </Box>
                     </Item>
                  </Grid>
                  <Grid item xs={12} md={10}>
                     <TabContext value={tab}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                           <TabList variant="fullWidth" onChange={handleChangeTab} aria-label="lab API tabs example">
                              <Tab label="Home" value="1" />
                              <Tab label="Terminal" value="2" />
                              <Tab label="Others" value="3" />
                           </TabList>
                        </Box>
                        <TabPanel value="1">
                           <Item elevation={0}>
                              <DashboardChart />
                              <Box
                                 sx={{
                                    display: "flex",
                                    mt: 2,
                                    justifyContent: "space-between",
                                 }}
                              >
                                 <Box>
                                    <Stack spacing={2}>
                                       <Button
                                          variant="contained"
                                          disabled={!selectedContainer || isRunningScript}
                                          onClick={handleStart}
                                       >
                                          {isRunningScript && script === "start" && <CircularProgress size={20} />}
                                          Start
                                       </Button>
                                       <Button
                                          variant="contained"
                                          disabled={!selectedContainer || isRunningScript}
                                          onClick={handleStop}
                                       >
                                          {isRunningScript && script === "stop" && <CircularProgress size={20} />}
                                          Stop
                                       </Button>
                                    </Stack>
                                 </Box>

                                 <Box
                                    sx={{
                                       display: "flex",
                                       flexDirection: "column",
                                       alignItems: "flex-end",
                                    }}
                                 >
                                    <Typography paragraph>Total Space: {server.info?.disk.total}</Typography>
                                    <Typography paragraph>Used Space: {server.info?.disk.used}</Typography>
                                    <Typography paragraph>Free Space: {server.info?.disk.free}</Typography>
                                    <Typography paragraph>RAM: {server.info?.memory.total}</Typography>
                                    <Typography paragraph>Uptime: {server.info?.uptime}</Typography>
                                    <Typography paragraph>Version: {server.info?.os?.PRETTY_NAME}</Typography>
                                 </Box>
                              </Box>
                           </Item>
                        </TabPanel>
                        <TabPanel value="2">
                           <Item elevation={0}>
                              <Box
                                 sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                 }}
                                 className="termbox"
                              >
                                 <WebTerminal />
                              </Box>
                           </Item>
                        </TabPanel>
                        <TabPanel value="3">
                           <Item elevation={0}>
                              <Box
                                 sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                 }}
                              >
                                 <Typography variant="h5">Others</Typography>
                                 <Typography variant="h3">Coming Soon</Typography>
                              </Box>
                           </Item>
                        </TabPanel>
                     </TabContext>
                  </Grid>
               </Grid>
            </>
         )}
      </>
   );
};

export default ServerDashboard;
