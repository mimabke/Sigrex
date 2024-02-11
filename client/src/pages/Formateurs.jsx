import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Axios from "axios";
import SpeedDial from "../components/SpeedDial";
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
import { useLocation, useNavigate } from "react-router-dom";
const Formateurs = () => {
  const [formateurs, setFormateurs] = useState([]);
  const fetchFormateurs = () => {
    Axios.get("http://localhost:5000/formateurs")
      .then((response) => {
        setFormateurs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchFormateurs();
  }, []);
  const handleClick = (pdfFile) => {
    window.open(pdfFile, "_blank");
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState(localStorage.getItem("role"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const authenticated = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(authenticated);
    const role = localStorage.getItem("role");
    setUserType(role);
  }, []);
  return (
    
    <>
      <div className="h-screen w-screen">
        <NavBar />
        <div className="flex">
          <SideBar />
          <div className="flex flex-col w-full mx-8 my-2 ">
            <div className="flex flex-col justify-center p-4">
              <h1 className="font-semibold text-[24px] uppercase">
                Nos Formateurs
              </h1>
            </div>

            <div className="min-w-[1000px] border w-fit">
              <Box>
                <Tabs aria-label="basic tabs example">
                  <Tab disabled label="Formateurs" />
                  <Tab disabled label="" />
                  <Tab disabled label="" />
                </Tabs>
              </Box>
              <div className="grid grid-cols-1 gap-4">
                <div className="pt-4">
                  {formateurs.length !== 0 ? (
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>N° </TableCell>
                            <TableCell>Nom et prénom</TableCell>
                            <TableCell align="right">Specialité</TableCell>
                            <TableCell align="right">Fonction</TableCell>
                            <TableCell align="right">
                              Diplome&nbsp;(J)
                            </TableCell>
                            <TableCell align="center">CV&nbsp;(PDF)</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {formateurs.map((f, index) => (
                            <TableRow
                              key={f.formateurId}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {index + 1}
                              </TableCell>
                              <TableCell>
                                {f.nom} {f.prenom}{" "}
                              </TableCell>
                              <TableCell align="right">
                                {f.specialite}
                              </TableCell>
                              <TableCell align="right">{f.fonction}</TableCell>
                              <TableCell align="right">{f.diplome}</TableCell>
                              <TableCell align="right">
                                <button
                                  className="bg-white text-[#00457E] border-[#00457E] border border-1/2 hover:bg-[#013E70] hover:text-white hover:shadow-sm  text-[12px]  hover:border-[#013E70]  uppercase  px-4 py-2 rounded shadow  outline-none focus:outline-none mr-1 mb-1"
                                  type="button"
                                  onClick={() => {
                                    handleClick(
                                      `http://localhost:5000/${f.cv_path}`
                                    );
                                  }}
                                >
                                  Consulter CV
                                </button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        {userType === "Administrateur" && (
                        <TableFooter>
                          <TableCell colSpan={8} align="right">
                            <button className="text-[15px] font-normal bg-[#00457E] px-2 py-1 rounded text-white"> + Ajouter un formateur</button>
                          </TableCell>
                        </TableFooter>)}
                      </Table>
                    </TableContainer>
                  ) : (
                    <>
                      <p className="p-2 text-[13px] my-4">
                        La liste de nos formateurs sera publiée ultérieurement.
                        Nous nous efforcerons de la publier dans les meilleurs
                        délais.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SpeedDial />
    </>
  );
};

export default Formateurs;
