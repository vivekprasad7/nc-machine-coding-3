import { createContext, useContext, useReducer, useState } from "react";
import { snacks } from "../api/data";

const AppContext = createContext()

export const AppContextProvider = ({children}) => {

    const [snacksData, setSnacksData] = useState(snacks);

    const initial ={
        userInput:"",
        sortOrder:"",
        sortBy:"",
    }

    function reducer(state, action){
        switch(action.type){
            case "SEARCH":
                if(action.payload.length > 0){
                    return {...state, userInput: action.payload};
                }
            case "SORT_BY_ID":
                return {...state, sortOrder: action.payload ? "LTH" : "HTL", sortBy : "ID"};
            case "SORT_BY_NAME":
                return {...state, sortOrder: action.payload ? "LTH" : "HTL", sortBy : "NAME"};
            case "SORT_BY_WEIGHT":
                return {...state, sortOrder: action.payload ? "LTH" : "HTL", sortBy : "WEIGHT"};
            case "SORT_BY_PRICE":
                return {...state, sortOrder: action.payload ? "LTH" : "HTL", sortBy : "PRICE"};
            case "SORT_BY_CALORIES":
                return {...state, sortOrder: action.payload ? "LTH" : "HTL", sortBy : "CALORIES"};
            
            default:
                return state;
        }
    }


    const [ state, dispatch] = useReducer(reducer, initial);

    const searchData = state.userInput.length > 0 ? snacksData.filter(({product_name}) => product_name.toLowerCase().includes(state.userInput.toLowerCase())) : snacksData;

    const getFilteredProducts = (snacksData, state) => {

        // destructure state
        
        let filteredProducts = snacksData;
    
        if (state?.userInput?.length > 0)  {
            filteredProducts = snacksData.filter((item) => item.product_name.toLowerCase().includes(state?.userInput.toLowerCase())) 
        }
    
        if (state?.sortBy === "ID"){
            filteredProducts = snacksData.sort((a,b) => state.sortOrder === 'LTH' ? a.id - b.id : b.id - a.id) 
        }

        if (state?.sortBy === "NAME"){
            filteredProducts = snacksData.sort((a,b) => state.sortOrder === 'LTH' ? a.product_name - b.product_name : b.product_name - a.product_name) 
        }

        if (state?.sortBy === "WEIGHT"){
            filteredProducts = snacksData.sort((a,b) => state.sortOrder === 'LTH' ? a.product_weight - b.product_weight : b.product_weight - a.product_weight) 
        }
        if (state?.sortBy === "PRICE"){
            filteredProducts = snacksData.sort((a,b) => state.sortOrder === 'LTH' ? a.price - b.price : b.price - a.price) 
        }
        if (state?.sortBy === "CALORIES"){
            filteredProducts = snacksData.sort((a,b) => state.sortOrder === 'LTH' ? a.calories - b.calories : b.calories - a.calories) 
        }
    

        return filteredProducts;
    
    
    }

    const newData = getFilteredProducts(snacksData, state);



    // const sortData = state.sort.length > 0 ? searchData.sort((a,b) => state.sort === 'LTH' ? a.price - b.price : b.price - a.price) : searchData



    return(
        <AppContext.Provider value={{snacksData, state, dispatch, getFilteredProducts, searchData, newData}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);