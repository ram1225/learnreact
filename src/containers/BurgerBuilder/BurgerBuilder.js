import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.5
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable:false
  };

  updatePurchaseState(ingredients){
 

    const sum = Object.keys(ingredients)
    .map(igKey=>{
      return ingredients[igKey];
    })
    .reduce((sum,e)=>{
      return sum+e;
    },0);

    this.setState({
      purchasable: sum>0

    });
  }

  addIngHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount+1;
    const updatedIng = {
        ...this.state.ingredients
    };
    updatedIng[type]= updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
        totalPrice: newPrice,
        ingredients: updatedIng
    });
    this.updatePurchaseState(updatedIng);
  }

  removeIngHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0) return;
    const updatedCount = oldCount-1;
    const updatedIng = {
        ...this.state.ingredients
    };
    updatedIng[type]= updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
        totalPrice: newPrice,
        ingredients: updatedIng
    });
    this.updatePurchaseState(updatedIng);
  };
  render() {
      const disableInfo = {
          ...this.state.ingredients
      };
      for(let key in disableInfo){
          disableInfo[key]= disableInfo[key]<=0;
      }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
        ingAdded={this.addIngHandler} 
        ingReduced={this.removeIngHandler}
        disabled={disableInfo}
        purchasable={this.state.purchasable}
        price={this.state.totalPrice}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
