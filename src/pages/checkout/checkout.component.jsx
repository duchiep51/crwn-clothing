import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import CustomButton from '../../components/custom-button/custom-button.component';

import './checkout.styles.scss';

import axios from 'axios';

const test = () => {
    axios({
        url: 'orders',
        method: 'post',
        data: {
            "userId": "5fd73c3865e394467846d889",
            "totalPrice": 200,
            "details": [
                {
                    "productId": "5fd7051ec3649a48983a63a6",
                    "quantity": 20
                },
                {
                    "productId": "5fd70992be1c344600db7337",
                    "quantity": 19
                }
            ]
        }
    }).then(res => {
        alert('succeed!')
    }).catch(error => {
        // console.log('error: ', JSON.parse(error));
        alert('There was an error.');
    });
}
const CheckoutPage = ({ cartItems, cartTotal }) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map((item) => item.name)
        }
        <div className='total'> TOTAL: ${cartTotal} </div>
        <CustomButton onClick={
            test
        } > Test API </CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotal: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);