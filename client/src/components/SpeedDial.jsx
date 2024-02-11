import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import ShareIcon from "@mui/icons-material/Call";
import HandIcon from "@mui/icons-material/Handshake";
import Payments from "@mui/icons-material/Payments";
import Formation from "@mui/icons-material/ImportContacts";

import { useNavigate } from "react-router-dom";

export default function SpeedDialComponent() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate() ; 

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Afficher le PDF
  const pdfFile = "http://localhost:5000/catalogue.pdf";
  const handleClick = (pdfFile) => {
    window.open(pdfFile, "_blank");
  };

  return (
    <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="Exemple de tooltip SpeedDial"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        <SpeedDialAction
          icon={<FileCopyIcon />}
          tooltipTitle="Catalogue"
          onClick={() => {
            handleClose();
            handleClick(pdfFile);
          }}
        />
        <SpeedDialAction
          icon={<ShareIcon />}
          tooltipTitle="Contact"
          onClick={() => window.open("https://www.esi.dz/", "_blank")}
        />
      <SpeedDialAction
          icon={<HandIcon />}
          tooltipTitle="Demande partenariat"
          onClick={() => navigate("/demande_partenariat") }
        />
        <SpeedDialAction
          icon={<Payments />}
          tooltipTitle="Demande Sponsoring"
          onClick={() => navigate("/demande_sponsoring") }
        />
         <SpeedDialAction
          icon={<Formation/>}
          tooltipTitle="Commande formation"
          onClick={() => navigate("/commande_formation") }
        />
      </SpeedDial>
    </Box>
  );
}
