import React, { useEffect, useState } from "react";
import Acceuil from "./pages/Acceuil";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Domaines from "./pages/Domaines";
import Evenements from "./pages/Evenements";
import Formateurs from "./pages/Formateurs";
import Locaux from "./pages/Locaux";
import Thèmes from "./pages/Thèmes";
import Statistiques from "./pages/Statistiques";
import Attestations from "./pages/Attestations";
import Partenaires from "./pages/Partenaires";
import DemandePartenariat from "./pages/DemandePartenariat";
import DemandeSponsoring from "./pages/DemandeSponsoring";
import DemandeFormation from "./pages/DemandeFormation";
import Formation from "./pages/Formation";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  useEffect(() => {
    // Check if the user is authenticated in local storage
    const authenticated = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(authenticated);
    const role = localStorage.getItem("role");
    setUserType(role);
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/formations" element={<Acceuil />} />
        <Route path="/domaines" element={<Domaines />} />
        <Route path="evenements" element={<Evenements />} />
        <Route path="formateurs" element={<Formateurs />} />
        <Route path="/clubs" element={<Locaux />} />
        <Route path="/themes" element={<Thèmes />} />
        <Route path="/formation/:id" element={<Formation />} />
        {isLoggedIn && (
          <Route path="/attestations" element={<Attestations />} />
        )}
        {isLoggedIn && (
          <Route path="/demande_partenariat" element={<DemandePartenariat />} />
        )}
        {isLoggedIn && (
          <Route path="/demande_sponsoring" element={<DemandeSponsoring />} />
        )}
        {isLoggedIn && (
          <Route path="/commande_formation" element={<DemandeFormation />} />
        )}

        {isLoggedIn && userType === "Administrateur" && (
          <Route path="/partenaires" element={<Partenaires />} />
        )}
        {isLoggedIn && userType === "Administrateur" && (
          <Route path="/statistiques" element={<Statistiques />} />
        )}
        {!isLoggedIn ||
          (isLoggedIn && userType !== "Administrateur" && (
            <Route path="/statistiques" element={<LoginPage />} />
          ))}
        {!isLoggedIn && <Route path="/statistiques" element={<LoginPage />} />}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
