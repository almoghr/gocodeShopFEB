import { Drawer } from "@mui/material";
import React, { useContext } from "react";
import { MyContext } from "../../MyContext";

const CustomDrawer = ({children}) => {
  const {isCartOpen, setIsCartOpen} = useContext(MyContext)
  return (
    <>
      <Drawer
        anchor={"right"}
        open={isCartOpen}
        onClose={() => {setIsCartOpen(false)}}
      >
        {children}
      </Drawer>
    </>
  );
};

export default CustomDrawer;
