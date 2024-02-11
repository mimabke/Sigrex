import React from "react";

const FormationDetails = (props) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${day}-${month}-${year}`;
      };
  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">Détails de la formation</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>
            <span className="font-semibold">Exercice:</span> {props.exercice}
          </p>
          <p>
            <span className="font-semibold">Date de début:</span>{" "}
            {props.date_debut}
          </p>
          <p>
            <span className="font-semibold">Date de fin:</span> {props.date_fin}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold">Marge prime:</span>{" "}
            {props.marge_prime}
          </p>
          <p>
            <span className="font-semibold">Réduction pourcentage:</span>{" "}
            {props.reduction_pourcentage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormationDetails;
