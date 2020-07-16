import React from 'react'
import burgerlogo from '../../assets/images/original.png'
import './Logo.css'

const logo =(props) => (
    <div className ={'Logo'}>
        <img src={burgerlogo} alt= "MYBurger"/>
    </div>
)

export default logo