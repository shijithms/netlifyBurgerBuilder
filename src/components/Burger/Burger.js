import React from 'react'
import './Burger.css'
import BurgerIngredient from '../BurgerIngredients/BurgerIngredient'





const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igkey=> {
        return [...Array(props.ingredients[igkey])].map((_,i)=>{
            return <BurgerIngredient key ={igkey + i} type ={igkey}/>
        })
    })
    .reduce ((arr,el) => {
        return arr.concat(el)
    },[])

    if (transformedIngredients.length===0){
        transformedIngredients=<p>your Ingredients</p>
    }
    
    return (
        <div className = {'Burger'}>
            <BurgerIngredient type = "bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type = "bread-bottom"/>
        </div>
    )
}

export default burger
