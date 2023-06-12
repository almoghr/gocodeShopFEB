import React from 'react'
import './SortOrFilter.css'
export const SortOrFilter = ({label, optionsArray, onChange}) => {

  return (
    <div className="collection-sort">
        <label>{label}</label>
        <select onChange={onChange}>
          <option value={"All"}>All Products</option>
          {optionsArray.map((opt) => <option value={opt}>{opt}</option>)}
        </select>
      </div>
  )
}


// const obj = {a:1, b:2, c:3}



// const {a,b} = obj