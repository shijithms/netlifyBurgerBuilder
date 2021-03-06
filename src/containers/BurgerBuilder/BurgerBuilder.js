import React ,{Component} from 'react'
import Auxillary from '../../hoc/Auxillary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENTS_PRICE = {
    salad: 5,
    bacon: 7,
    cheese: 8,
    meat: 10,
}


class BurgerBuilder extends Component {
    state={
        ingredients : {
            salad:0,
            bacon:0,
            cheese:0, 
            meat:0
        },
        totalPrice : 10,
        purchasable : false,
        purchasing : false
    }

    updatePurchaseState(ingredients){

        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el)=> {
            return sum + el
        } , 0)
        this.setState({ purchasable: sum>0 })
    }


    addIngredientHandler =(type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount+1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedCount
        const priceAddition = INGREDIENTS_PRICE[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice+priceAddition
        this.setState({totalPrice:newPrice , ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }
    
    removeIngredientHandler =(type) => {
        const oldCount = this.state.ingredients[type]
        if(oldCount <= 0) {
            return
        }
        const updatedCount = oldCount-1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedCount
        const priceDeduction = INGREDIENTS_PRICE[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice-priceDeduction
        this.setState({totalPrice:newPrice , ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        alert('YOU CONTINUE')
    }


    render () {

        const disadledInfo ={
            ...this.state.ingredients
        }
        for(let key in disadledInfo){
            disadledInfo[key]= disadledInfo[key] <= 0
        }
        return(
            <Auxillary>
              <Modal show ={this.state.purchasing} modalClosed ={this.purchaseCancelHandler}>
                    <OrderSummary
                     ingredients= {this.state.ingredients}
                     price ={this.state.totalPrice}
                     purchaseCancled = {this.purchaseCancelHandler}
                     purchaseContinued = {this.purchaseContinueHandler}
                     />
              </Modal>

                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls
                    ingredientAdded= {this.addIngredientHandler}
                    ingredientRemoved= {this.removeIngredientHandler}
                    disabled = {disadledInfo}
                    purchasable = {this.state.purchasable}
                    ordered ={this.purchaseHandler}
                    price={this.state.totalPrice}/>
            </Auxillary>
        )
    }
}
 
export default BurgerBuilder;