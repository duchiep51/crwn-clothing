import './App.css';

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import HatsPage from './pages/hatspage/hatspage.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot =>
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        );

      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
   return (
    <Router>
      <div>
        <Header/>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage}/>
            <Route path='/contact' component={HatsPage}/>
            <Route exact path='/checkout' component={CheckoutPage}/>
            <Route exact path='/sign-in' 
              render={() => 
                this.props.currentUser 
                ? (<Redirect to='/'/>)
                : (<SignInAndSignUpPage/>)
              }/>
        </Switch>
      </div>
    </Router>
  )};
}

const mapStatetoProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStatetoProps, mapDispatchToProps)(App);
