// import * as React from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
// import authCustomhook from "../customhooks/AuthCustomHook";
// import LogoutIcon from "@mui/icons-material/Logout";

// export default function LogoutDialog() {
//   const [open, setOpen] = React.useState(false);
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
//   const { handleLogout } = authCustomhook();

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleLogoutAccount = () => {
//     handleLogout();
//     console.log("User logged out");
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <div    onClick={handleClickOpen} className="flex flex-row items-center gap-4 p-2 cursor-pointer   hover:bg-black hover:text-white">
//         <button
//           type="button"

//           className="text-white bg-blue-500 hover:bg-[#3065d8] p-2 flex justify-center  items-center   rounded-full "
//         >
//           <LogoutIcon />
//         </button>

//         <p className="font-mono"> Logout</p>
//       </div>
//       <Dialog
//         fullScreen={fullScreen}
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="logout-dialog-title"
//       >
//         <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to logout? You will need to sign in again to
//             access your account.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleLogoutAccount} autoFocus color="primary">
//             Yes, Logout
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LogoutIcon from "@mui/icons-material/Logout";
import authCustomhook from "../customhooks/AuthCustomHook";

export default function LogoutDialog() {
  const [open, setOpen] = React.useState(false);

  const { handleLogout } = authCustomhook();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogoutAccount = () => {
    handleLogout();
    console.log("User logged out.");
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div
        onClick={handleClickOpen}
        className="flex flex-row items-center gap-4 p-2 cursor-pointer   hover:bg-black hover:text-white"
      >
        <button
          type="button"
          className="text-white bg-blue-500 hover:bg-[#3065d8] p-2 flex justify-center  items-center   rounded-full "
        >
          <LogoutIcon />
        </button>

        <p className="font-mono"> Logout</p>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "#000",
            color: "#fff",
          },
        }}
      >
        <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="logout-dialog-description"
            style={{ color: "#ccc" }}
          >
            Are you sure you want to log out? You will need to sign in again to
            access your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "#aaa" }}>
            Cancel
          </Button>
          <Button
            onClick={handleLogoutAccount}
            autoFocus
            style={{
              backgroundColor: "#444",
              color: "#fff",
              fontWeight: 600,
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#666")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#444")}
          >
            Yes, Logout
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
