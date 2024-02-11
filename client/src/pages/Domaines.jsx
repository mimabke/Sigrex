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
const Domaines = () => {
    const [domaines, setDomaines] = useState([]);
  const fetchDomaines = () => {
    Axios.get("http://localhost:5000/domaines")
      .then((response) => {
        setDomaines(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchDomaines();
  }, []);
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
                Liste des domaines
              </h1>
            </div>

            <div className="min-w-[1000px] border w-fit">
              <Box>
                <Tabs aria-label="basic tabs example">
                  <Tab disabled label="Domaines" />
                  <Tab disabled label="" />
                  <Tab disabled label="" />
                </Tabs>
              </Box>
              <div className="grid grid-cols-1 gap-4">
                <div className="pt-4">
                  {domaines.length !== 0 ? (
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>N° </TableCell>
                            <TableCell align="left">Domaine</TableCell>
                            <TableCell align="left">Description</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {domaines.map((f, index) => (
                            <TableRow
                              key={f.eventId}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {index + 1}
                              </TableCell>
                              <TableCell align="left">{f.designation} </TableCell>
                              <TableCell align="left">
                                {f.descrip}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        {userType === "Administrateur" && (
                        <TableFooter>
                          <TableCell colSpan={8} align="right">
                            <button className="text-[15px] font-normal bg-[#00457E] px-2 py-1 rounded text-white"> + Ajouter un domaine</button>
                          </TableCell>
                        </TableFooter>)}
                      </Table>
                    </TableContainer>
                  ) : (
                    <>
                      <p className="p-2 text-[13px] my-4">
                        La liste de nos évènements sera publiée ultérieurement.
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

export default Domaines;
