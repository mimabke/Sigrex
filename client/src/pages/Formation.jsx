import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useNavigate, useParams } from "react-router-dom";
import FormationDétails from "../components/FormationDétails";
import Axios from "axios";

const Formation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formation, setFormation] = useState(null);
  const fetchFormation = () => {
    Axios.get(`http://localhost:3001/formation/${id}`)
      .then((response) => {
        setFormation(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchFormation();
  }, []);

  return (
    <div className="h-screen w-screen">
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="flex flex-col w-full mx-8 my-2 ">
          {formation && (
            <FormationDétails
              formationId={formation.formationId}
              offreId={formation.offreId}
              themeId={formation.themeId}
              chargesId={formation.chargesId}
              exercice={formation.exercice}
              date_ajout={formation.date_ajout}
              date_debut={formation.date_debut}
              date_fin={formation.date_fin}
              marge_prime={formation.marge_prime}
              reduction_pourcentage={formation.reduction_pourcentage}
              objet={formation.objet}
              notes={formation.notes}
              evaluation={formation.evaluation}
              type_formation={formation.type_formation}
              nom={formation.nom}
              tarif_unitaire={formation.tarif_unitaire}
              quantite={formation.quantité}
              taux_reduction={formation.taux_reduction}
              montant={formation.montant}
              montant_final={formation.montant_final}
              taux_tva={formation.taux_tva}
              montant_tva={formation.montant_tva}
              montant_ttc={formation.ttc}
              Designation={formation.Designation}
              support_pedagogique={formation.support_pedagogique}
              duree_jours={formation.duree_jours}
              duree_heures={formation.duree_heures}
              niveau={formation.niveau}
              tarif_participant={formation.tarif_participant}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Formation;
