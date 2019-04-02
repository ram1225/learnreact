import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
    const  transformedIngredients = Object.keys(props.ingredients)
    .map(ingKey =>{
        return [...Array(props.ingredients[ingKey])].map(
            (_,i)=>{
                return <BurgerIngredient key={ingKey+i} type={ingKey}/>;
            }
        );
    }).reduce((arr,el)=>{
      return arr.concat(el);
    },[]) ;

    if(transformedIngredients.length === 0 ){
      return <p>Start adding ingredients</p>;
    }
    

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
        {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
