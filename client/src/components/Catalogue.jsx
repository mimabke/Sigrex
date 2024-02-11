import { Box } from "@mui/material";
import React from "react";

const Catalogue = () => {
  // Display le pdf
  const pdfFile = `http://localhost:5000/catalogue.pdf`;
  const handleClick = (pdfFile) => {
    window.open(pdfFile, "_blank");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        width: "100%",
        position: "fixed",
        bottom: 24,
        padding: "16px",
      }}
    >
      <div className="flex flex-row">
        <button
          className="bg-white text-[#00457E] border-[#00457E] border border-1/2 hover:bg-[#013E70] hover:text-white hover:shadow-sm  text-[14px]  hover:border-[#013E70]  uppercase  px-4 py-2 rounded shadow  outline-none focus:outline-none mr-1 mb-1"
          type="button"
          onClick={() => {
            handleClick(pdfFile); 
          }}
        >
          Catalogue
        </button>
        <a href="https://www.esi.dz/">
        <button
          className="bg-white text-[#00457E] border-[#00457E] border border-1/2 hover:bg-[#013E70] hover:text-white hover:shadow-sm  text-[14px]  hover:border-[#013E70]  uppercase  px-4 py-2 rounded shadow  outline-none focus:outline-none mr-1 mb-1"
          type="button"
        >
          Contact
        </button>
        </a>
      </div>
    </Box>
  );
};

export default Catalogue;
