import React, { useState } from "react";
import { Navbar } from "../../components/navbar/navbar";
import { useAppContext } from "../../contexts/AppContext";
import "./home.css"

export const Home = () => {
  const { snacksData , dispatch, getFilteredProducts, searchData, newData} = useAppContext();
  const [sortTypeAsc, setSortTypeAsc] = useState(false);

  // const newData = getFilteredProducts();

  return (
    <div>
      <Navbar />

<div className="table-container">

      <table>
      <thead>
        <tr>
          <th onClick={() => { setSortTypeAsc(!sortTypeAsc); dispatch({ type: "SORT_BY_ID", payload: sortTypeAsc }) }}>ID</th>
          <th onClick={() => { setSortTypeAsc(!sortTypeAsc); dispatch({ type: "SORT_BY_NAME", payload: sortTypeAsc })}}>Product Name</th>
          <th onClick={() => { setSortTypeAsc(!sortTypeAsc);dispatch({ type: "SORT_BY_WEIGHT", payload: sortTypeAsc })}}>Weight</th>
          <th onClick={() => { setSortTypeAsc(!sortTypeAsc);dispatch({ type: "SORT_BY_PRICE", payload: sortTypeAsc })}}>Price</th>
          <th onClick={() => {setSortTypeAsc(!sortTypeAsc); dispatch({ type: "SORT_BY_CALORIES", payload: sortTypeAsc })}}>Calories</th>
          <th>Ingredients</th>
        </tr>
      </thead>
      <tbody>
        {newData.map((snack) => (
          <tr key={snack.id}>
            <td>{snack.id}</td>
            <td>{snack.product_name}</td>
            <td>{snack.product_weight}</td>
            <td>{snack.price}</td>
            <td>{snack.calories}</td>
            <td>
              <ul>
                {snack.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
</div>

    
    </div>
  );
};
