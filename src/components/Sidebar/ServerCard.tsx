import { useState } from "react";
import Divider from "@mui/material/Divider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteDialog from "./DeleteDialog";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import { useServers } from "../../stores";
import {
  useDeleteServerMutation,
  useGetServerByIdQuery,
} from "../../services/servers";
import { Server } from "../../types/server";

const ITEM_HEIGHT = 48;

interface ServerCardProps {
  server: Server;
}

const ServerCard: React.FC<ServerCardProps> = ({ server }) => {
  const store = useServers();
  const { isLoading, data } = useGetServerByIdQuery(server.id);
  const [deleteServer, { isLoading: deleting }] = useDeleteServerMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
    store.edit(server.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteServer(server.id);
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleSelect = (e) => {
    e.stopPropagation();
    store.selectServer(server.id);
  };

  return (
    <Box sx={{ mx: 1, my: 1.2 }}>
      <Card
        key={server.id}
        sx={{
          minWidth: 50,
          height: "210px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          backgroundColor: server.id === store.selected ? "#dddedf" : "#fff",
        }}
      >
        <CardActionArea onClick={handleSelect}>
          <CardHeader
            action={
              <IconButton
                aria-label="settings"
                onClick={handleClick}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <MoreVertIcon />
              </IconButton>
            }
            title={server.name}
          />
          <Menu
            id={`menu-${server.id}`}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem>
              <Divider sx={{ my: 0.5 }} />
            </MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
              Delete
            </MenuItem>
          </Menu>

          <CardContent style={{ paddingTop: 4, height: "145px" }}>
            {isLoading && <Typography variant="body2">Loading...</Typography>}
            {!isLoading &&
              !!data &&
              data.info?.containers.map((container) => (
                <Typography variant="body2" component="div">
                  {container.name}
                </Typography>
              ))}
          </CardContent>
        </CardActionArea>
      </Card>
      <DeleteDialog
        open={deleteDialogOpen}
        instanceName={server.name}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default ServerCard;
