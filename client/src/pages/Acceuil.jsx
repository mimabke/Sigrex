import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Axios from "axios";
import {
  Box,
  Paper,
  Rating,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import SpeedDial from "../components/SpeedDial";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const Acceuil = () => {
  const location = useLocation();
  const [userType, setUserType] = useState(localStorage.getItem("role"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const authenticated = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(authenticated);
    const role = localStorage.getItem("role");
    setUserType(role);
  }, []);
  const [formations, setFormations] = useState([]);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const fetchFormations = () => {
    Axios.get("http://localhost:5000/formations")
      .then((response) => {
        setFormations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect((e) => {
    fetchFormations();
    handleChange(e, 0);
  }, []);
  const [sortedFormations, setSortedFormations] = useState([]);
  const sorted = sortedFormations.sort(
    (a, b) => new Date(a.date_debut) - new Date(b.date_debut)
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      const avantPromotionFormations = formations.filter(
        (formation) => formation.type_formation === "Avant promotion"
      );
      setSortedFormations(avantPromotionFormations);
    } else if (newValue === 1) {
      const aLaCarteFormations = formations.filter(
        (formation) => formation.type_formation === "A la carte"
      );
      setSortedFormations(aLaCarteFormations);
    } else {
      setSortedFormations(formations);
    }
  };
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      cursor: "pointer", // Changement du curseur au survol
    },
  }));
  return (
    <>
      <div className="h-screen w-screen">
        <NavBar />
        <div className="flex">
          <SideBar />
          <div className="flex flex-col w-full mx-8 my-2 ">
            <div className="flex flex-col justify-center p-4">
              <h1 className="font-semibold text-[24px] uppercase">
                Nos formations
              </h1>
            </div>
            <div className="min-w-[1000px] border w-fit">
              <Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Avant promotion" />
                  <Tab label="A la carte" />
                  <Tab label="Textes réglementaires " />
                </Tabs>
              </Box>
              <div className="grid grid-cols-1 gap-4">
                {value === 0 && (
                  <div className="pt-4">
                    {sorted.length !== 0 ? (
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>N° </TableCell>
                              <TableCell>Theme</TableCell>
                              <TableCell align="right">Offre</TableCell>
                              <TableCell align="right">Partenaire</TableCell>
                              <TableCell align="right">
                                Volume&nbsp;(J)
                              </TableCell>
                              <TableCell align="right">
                                Volume&nbsp;(H)
                              </TableCell>
                              <TableCell align="right">
                                Réduction&nbsp;(%)
                              </TableCell>
                              <TableCell align="center">Evaluation</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {sorted.map((formation, index) => (
                              <StyledTableRow
                                key={formation.formationId}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                                onClick={() => {
                                  navigate(
                                    `/formation/${formation.formationId}`
                                  );
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {index + 1}
                                </TableCell>
                                <TableCell>{formation.Designation}</TableCell>
                                <TableCell align="right">
                                  {formation.descrip}
                                </TableCell>
                                <TableCell align="right">
                                  {formation.description}
                                </TableCell>
                                <TableCell align="right">
                                  {formation.duree_jours}
                                </TableCell>
                                <TableCell align="right">
                                  {formation.duree_heures}
                                </TableCell>
                                <TableCell align="right">
                                  {formation.reduction_pourcentage}
                                </TableCell>
                                <TableCell align="right">
                                  <Rating
                                    name="read-only"
                                    value={formation.evaluation}
                                    readOnly
                                  />
                                </TableCell>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                          {userType === "Administrateur" && (
                            <TableFooter>
                              <TableCell colSpan={10} align="right">
                                <button className="text-[15px] font-normal bg-[#00457E] px-2 py-1 rounded text-white">
                                  {" "}
                                  + Ajouter une formation avant promotion
                                </button>
                              </TableCell>
                            </TableFooter>
                          )}
                        </Table>
                      </TableContainer>
                    ) : (
                      <>
                        <p className="p-2 text-[13px] my-4">
                          Le planning de la formation sera publié
                          ultérieurement. Nous nous efforcerons de le publier
                          dans les meilleurs délais.{" "}
                        </p>
                        <Table>
                        {userType === "Administrateur" && (
                            <TableFooter>
                              <TableCell colSpan={10} align="right">
                                <button className="text-[15px] font-normal bg-[#00457E] px-2 py-1 rounded text-white">
                                  {" "}
                                  + Ajouter une formation avant promotion
                                </button>
                              </TableCell>
                            </TableFooter>
                          )}
                        </Table>
                      </>
                    )}
                  </div>
                )}
                {value === 1 && (
                  <div>
                    {sorted.length !== 0 ? (
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell> </TableCell>
                              <TableCell>Theme</TableCell>
                              <TableCell align="right">Offre</TableCell>
                              <TableCell align="right">Partenaire</TableCell>
                              <TableCell align="right">
                                Volume&nbsp;(J)
                              </TableCell>
                              <TableCell align="right">
                                Volume&nbsp;(H)
                              </TableCell>
                              <TableCell align="right">
                                Réduction&nbsp;(%)
                              </TableCell>
                              <TableCell align="center">Evaluation</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {sorted.map((formation, index) => (
                              <StyledTableRow
                                key={formation.formationId}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                                onClick={() => {
                                  navigate(
                                    `/formation/${formation.formationId}`
                                  );
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {index + 1}
                                </TableCell>
                                <TableCell>{formation.Designation}</TableCell>
                                <TableCell align="right">
                                  {formation.descrip}
                                </TableCell>
                                <TableCell align="right">
                                  {formation.description}
                                </TableCell>
                                <TableCell align="right">
                                  {formation.duree_jours}
                                </TableCell>
                                <TableCell align="right">
                                  {formation.duree_heures}
                                </TableCell>
                                <TableCell align="right">
                                  {formation.reduction_pourcentage}
                                </TableCell>
                                <TableCell align="right">
                                  <Rating
                                    name="read-only"
                                    value={formation.evaluation}
                                    readOnly
                                  />
                                </TableCell>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                          {userType === "Administrateur" && (
                            <TableFooter>
                              <TableCell colSpan={10} align="right">
                                <button className="text-[15px] font-normal bg-[#00457E] px-2 py-1 rounded text-white">
                                  {" "}
                                  + Ajouter une formation à la carte
                                </button>
                              </TableCell>
                            </TableFooter>
                          )}
                        </Table>
                      </TableContainer>
                    ) : (
                      <>
                        <p className="p-2 text-[13px] my-4">
                          Le planning de la formation sera publié
                          ultérieurement. Nous nous efforcerons de le publier
                          dans les meilleurs délais.{" "}
                        </p>
                        <Table>
                        {userType === "Administrateur" && (
                            <TableFooter>
                              <TableCell colSpan={10} align="right">
                                <button className="text-[15px] font-normal bg-[#00457E] px-2 py-1 rounded text-white">
                                  {" "}
                                  + Ajouter une formation à la carte
                                </button>
                              </TableCell>
                            </TableFooter>
                          )}
                        </Table>
                      </>
                    )}
                  </div>
                )}
                {value === 2 && (
                  <div>
                    <p className="p-2 text-[13px] my-4">
                      Les textes réglementaires seront partagés ultérieurement.
                      Nous nous efforcerons de les publier dans les meilleurs
                      délais.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SpeedDial />
    </>
  );
};

export default Acceuil;
