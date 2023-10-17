import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Server, ServerForm } from "../../types/server";
import { useServers } from "../../stores";
import { useCreateServerMutation, useUpdateServerMutation } from "../../services/servers";

interface Props {
   open: boolean;
   onClose: () => void;
   server?: Server | undefined | null;
}

const ServerConfig: React.FC<Props> = ({ open, onClose, server }) => {
   const store = useServers();
   const [createServer, { isLoading: isCreateLoading, isSuccess: isCreateSuccess }] = useCreateServerMutation();
   const [updateServer, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess }] = useUpdateServerMutation();
   const submitting = server ? isUpdateLoading : isCreateLoading;
   const [form, setForm] = React.useState<ServerForm>(server ?? ({} as Server));

   React.useEffect(() => {
      setForm(server ?? ({} as Server));
   }, [server]);

   const handleClose = () => {
      setForm(server ?? ({} as Server));
      onClose();
   };

   const handleSave = async () => {
      try {
         if (!server) await createServer(form);
         else await updateServer({ id: server.id, formData: form });
         handleClose();
      } catch (e) {
         console.log("Error: ", e);
      }
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.id]: e.target.value });
   };

   return (
      <div>
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Server Connection Config</DialogTitle>
            <DialogContent>
               <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  defaultValue={form.name}
                  type="text"
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
               />
               <TextField
                  autoFocus
                  margin="dense"
                  id="ip"
                  label="IP Address"
                  defaultValue={form.ip}
                  type="text"
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
               />
               <TextField
                  autoFocus
                  margin="dense"
                  id="username"
                  label="Username"
                  defaultValue={form.username}
                  type="text"
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
               />
               <TextField
                  autoFocus
                  margin="dense"
                  id="password"
                  label="Password"
                  defaultValue={form.password}
                  type="password"
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <LoadingButton loading={submitting} onClick={handleSave}>
                  Save
               </LoadingButton>
            </DialogActions>
         </Dialog>
      </div>
   );
};

export default ServerConfig;
