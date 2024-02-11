import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const logoStyle = {
  width: "140px",
  height: "auto",
};

export default function Footer({message}) {
  const [email, setEmail] = React.useState(""); 

  const handleEmailChange = (event) => {
    setEmail(event.target.value); 
  };

  const handleSendEmail = () => {
    const from = email; 
    const url = "/send-email-demandePartenariat";


    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from }),
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi de l'e-mail");
        }
        alert("E-mail envoyé avec succès");
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
        alert("Erreur lors de l'envoi de l'e-mail. Veuillez réessayer.");
      });
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Sigrex
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
         {message}
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap>
          <TextField
            id="outlined-basic"
            hiddenLabel
            size="small"
            variant="outlined"
            fullWidth
            aria-label="Entrer votre adresse e-mail"
            placeholder="Votre adresse e-mail"
            inputProps={{
              autocomplete: "off",
              ariaLabel: "Enter your email address",
            }}
            value={email}
            onChange={handleEmailChange}
          />
          <button
            className="text-white bg-[#00457E] border-[#00457E] border border-1/2 hover:bg-[#013E70] hover:text-white hover:shadow-sm  text-[14px]  hover:border-[#013E70]  uppercase  px-4 py-2 rounded shadow  outline-none focus:outline-none mr-1 mb-1"
            type="button"
            onClick={handleSendEmail}
          >
            Envoyer
          </button>
        </Stack>
      </Box>
    </Container>
  );
}
