import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth } from '../../firebase/firebase.utils';

import axios from 'axios';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            id: '',
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert('Password doesn\'t math confirm password');
            return;
        }

        try {
            auth.createUserWithEmailAndPassword(email, password)
            .then(async result => {
                const { user } = result;

                if (result.additionalUserInfo.isNewUser) {
                axios({
                  url: `users/sign-up`,
                  method: 'post',
                  data: {
                    id: user.uid,
                    email: user.email,
                    phone: user.phoneNumber,
                    fullname: displayName
                  }
                }).then(() => {
                  console.log("success!!!")
                }).catch(error => {
                  console.log(error);
                })
              }
            });
            
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error(error);
        }
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({[name]: value})
        
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.setState;

        return (
          <div className='sign-up'>
            <h2 className='title'>I do not have a account</h2>
            <span>Sign up with your mail and password</span>
            <form className='sign-up-form' onSubmit={this.handleSubmit}>
                <FormInput 
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={this.handleChange}
                    label='Display name'
                    required
                />
                <FormInput 
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.handleChange}
                    label='email'
                    required
                />
                <FormInput 
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.handleChange}
                    label='Password'
                    required
                />
                <FormInput 
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={this.handleChange}
                    label='Confirm password'
                    required
                />
               <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
          </div>  
        );
    }
}

export default SignUp;