import React from "react";
import { Box, Typography } from "@mui/material";
import "./indicator.css";

export default function OnlineIndicator() {
   return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
         <div className="online-indicator">
            <span className="blink"></span>
         </div>
         <Typography paragraph sx={{ mb: 0 }}>
            Online
         </Typography>
      </Box>
   );
}

interface SmallOnlineIndicatorProps {
   active: boolean;
}
export const SmallOnlineIndicator: React.FC<SmallOnlineIndicatorProps> = ({ active }) => {
   return <div className={`small-online-indicator ${active ? "" : "offline"}`}></div>;
};
