
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import authCustomhook from "../customhooks/AuthCustomHook";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const { handleDelete } = authCustomhook();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAccount = () => {
    handleDelete();
    console.log("Account deletion confirmed.");
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div
        onClick={handleClickOpen}
        className="flex flex-row  items-center gap-4 p-2 cursor-pointer  hover:bg-black hover:text-white "
      >
        <button
          type="button"
          className="text-white bg-red-600 flex justify-center items-center hover:bg-[#ec090a] p-2  rounded-full"
        >
          <DeleteIcon />
        </button>
        <p className="font-mono"> Delete Account</p>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "#000",
            color: "#fff",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          Confirm Account Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "#ddd" }}
          >
            Are you sure you want to permanently delete your account? This
            action cannot be undone, and all associated data will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "#ccc" }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccount}
            autoFocus
            style={{
              backgroundColor: "#d32f2f",
              color: "#fff",
              fontWeight: 600,
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#b71c1c")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#d32f2f")}
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
