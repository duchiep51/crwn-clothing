import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';

import CustomButton from '../../components/custom-button/custom-button.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';
import { clearCart } from '../../redux/cart/cart.actions';

const checkOut = ({ id }, cartTotal, cartItems, clearCart) => {

    const cloneItems = cartItems.map(item => ({
        productId: item._id,
        quantity: item.quantity
    }))
    axios({
        url: 'orders',
        method: 'post',
        data: {
            "userId": id,
            "totalPrice": cartTotal,
            "details": [
                ...cloneItems
            ]
        }
    }).then(res => {
       clearCart();
    }).catch(error => {
        // console.log('error: ', JSON.parse(error));
        alert('There was an error.', error);
    });
}
const CheckoutPage = ({ cartItems, cartTotal, currentUser, clearCart }) => (
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
            cartItems.map((item) => (
                <CheckoutItem key={item._id} item={item} />
            ))
        }
        <div className='total'> TOTAL: ${cartTotal} </div>
        <CustomButton onClick={
            () => checkOut(currentUser, cartTotal, cartItems, clearCart)
        } > CHECK OUT </CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotal: selectCartTotal,
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    clearCart: () => dispatch(clearCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);