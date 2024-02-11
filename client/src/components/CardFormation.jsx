import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Button, Rating } from "@mui/material";

const CardFormation = ({ designation, objet, date_debut, date_fin }) => {
  const [value, setValue] = useState(0);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
  return (
    <Card sx={{ maxWidth: 900 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {designation}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Objet: {objet}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          De {formatDate(date_debut)} à {formatDate(date_fin)}
        </Typography>
      </CardContent>
      <CardActions>
      <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
      <div style={{ marginLeft: 'auto' }}>
          <Button size="small">Voir plus</Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default CardFormation;
