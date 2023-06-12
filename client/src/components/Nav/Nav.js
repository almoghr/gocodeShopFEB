import "./Nav.css"
import { SortOrFilter } from "../SortOrFilter/SortOrFilter";
import { sortArrOptions } from "../../dummy-data/data";
import { useContext } from "react";
import { MyContext } from "../../MyContext";
import IconButton from '@mui/material/IconButton';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

export const Nav = () => {
  const {categories, handleFilterProducts, setIsCartOpen} = useContext(MyContext)
  // const clock = useClock()
  return (
    <nav className="product-filter">
      <h1>Jackets</h1>
      {/* {clock} */}
      <div className="sort">
      <SortOrFilter onChange={(event) => handleFilterProducts(event.target.value)} label={"filter"} optionsArray={categories}/>
      <SortOrFilter onChange={(event) => {console.log(event.target.value)}} label={"sort"} optionsArray={sortArrOptions}/>
      <IconButton onClick={() => {setIsCartOpen(true)}}>
        <ShoppingCartTwoToneIcon color="primary" aria-label="shopping cart"/>
      </IconButton>
      </div>
    </nav>
  );
};
