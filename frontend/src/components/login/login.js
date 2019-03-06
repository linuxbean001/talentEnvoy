import React, { Component } from 'react';
import './login.scss';
import AuthService from '../../services/loginService';
//import AuthService from '../services/login/loginService';
const Auth = new AuthService();
class Login extends Component {
    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
       
    }
    componentDidMount() {

    }

    switchModeHandler = () => {
        this.setState(prevState => {
          return { isLogin: !prevState.isLogin };
        });
      };
    
      submitHandler = event => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
    
        if (email.trim().length === 0 || password.trim().length === 0) {
          return;
        }
    
        let requestBody = {
          query: `
            query {
              login(email: "${email}", password: "${password}") {
                userId
                token
                tokenExpiration
              }
            }
          `
        };
    
        fetch('http://localhost:3300/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed!');
            }
            return res.json();
          })
          .then(resData => {
            console.log('xxxxxxxxxxx login', resData.data.login);
            if (resData.data.login.token) {
                this.setToken(resData.data.login);
            //   this.context.login(
            //     resData.data.login.token,
            //     resData.data.login.userId,
            //     resData.data.login.tokenExpiration
            //   );
            }
          })
          .catch(err => {
            console.log(err);
          });
      };

      setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('token', JSON.stringify(idToken));
    }

    getToken() {
        let token = '';
        if (localStorage.getItem('token')) {
            token = JSON.parse(localStorage.getItem('token'));
        }
        return token
    }
    
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }
    // LoginMe = () => {
    //     console.log('xxxxxxxxxxx', this.state.fields);
    //     Auth.authenticateUsr(this.state.fields)
    //         .then(result => {
    //             console.log('xxxx result', result);
    //         }).catch(err => {
    //             console.log("xxxxxxxx xxxxxxxxxx xxxx err is ", err);
    //         });
    // }
    // handleChange(field, e) {
    //     let fields = this.state.fields;
    //     fields[field] = e.target.value;
    //     this.setState({ fields });
    // }
    render() {
        return (
            <div>
                <div class="wrapper">
                    <form class="form-signin">
                        <h2 class="form-signin-heading">Please login</h2>
                        <input type="text" class="form-control"  name="email" placeholder="Email Address"  id="email" ref={this.emailEl} />
                        <input type="password" class="form-control" name="password" placeholder="Password"  id="password" ref={this.passwordEl} />
                        <label class="checkbox">
                            <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember me
      </label>
                        <button class="btn btn-lg btn-primary btn-block" type="button" onClick={this.submitHandler}>Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;