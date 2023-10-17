import React, { useRef, useEffect, useState } from "react";
import { XTerm } from "xterm-for-react";
import { FitAddon } from 'xterm-addon-fit';
import { socket } from "../../utils/socket";
import { useConnectWebterminalQuery } from "../../services/servers";
import { useServers } from "../../stores";
import { Box, CircularProgress, Typography } from "@mui/material";

const fitAddon = new FitAddon();

export const WebTerminal = () => {
   const xtermRef = useRef<XTerm | null>(null);
   const [isConnected, setIsConnected] = useState(socket.connected);
   const [fooEvents, setFooEvents] = useState<any[]>([]);
   const store = useServers();  
   const { data: server, isLoading, isError, error } = useConnectWebterminalQuery(store.selected as any);
   const err: any = error; 
   

   useEffect(() => {
      console.log("WebTerminal mounted", xtermRef.current);
      if (!xtermRef.current) return;
      console.log("Connecting...");
      xtermRef.current.terminal.writeln("Connecting...");      
      socket.on('terminalOutput', (output) => {
         xtermRef.current?.terminal.write(output);
      });
      socket.connect();
      return () => {
         socket.disconnect();
       };
   }, []);

   const onData = (data: string) => {
      console.log("Input received:", data, socket.connected);
      if (!socket.connected) return;
      socket.emit("terminalInput", {input: data, server: store.selected});
      // xtermRef.current?.terminal.write(data);
   };

   useEffect(() => {
      function onConnect() {
         setIsConnected(true);
         console.log("Connected");
         socket.emit("terminalInput", 'ls -la');
      }

      function onDisconnect() {
         setIsConnected(false);
      }

      function onFooEvent(value) {
         setFooEvents((previous) => [...previous, value]);
      }

      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
      socket.on("foo", onFooEvent);
      socket.onAny((eventName, ...args) => {
         console.log('Received event:', eventName);
         console.log('Arguments:', args);
       });
      

      return () => {
         socket.off("connect", onConnect);
         socket.off("disconnect", onDisconnect);
         socket.off("foo", onFooEvent);
      };
   }, []);

   // if (isLoading)
   //    return (
   //       <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
   //          <CircularProgress />
   //       </Box>
   //    );

   // if (isError)
   //    return (
   //       <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
   //          <Typography paragraph>{err.data.error || error.toString()}</Typography>
   //       </Box>
   //    );

   return (
      <>
         <XTerm addons={[fitAddon]} onData={onData}  ref={xtermRef} />
      </>
   );
};
