import React, { Component } from 'react';
 import registerService from '../../services/registerService';
 const Api = new registerService();
class Register extends Component {
    constructor(props){
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.state={
           
        }
    }
    componentDidMount() {
      
    }

    submitHandler = event => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
    
        if (email.trim().length === 0 || password.trim().length === 0) {
          return;
        }
    
        let requestBody = {
            query: `
              mutation {
                createUser(userInput: {email: "${email}", password: "${password}"}) {
                  _id
                  email
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
            console.log('xxxxxxxxxxx ss', resData.data.login);
            if (resData.data.login.token) {
              this.context.login(
                resData.data.login.token,
                resData.data.login.userId,
                resData.data.login.tokenExpiration
              );
            }
          })
          .catch(err => {
            console.log(err);
          });
      };

    // RegisterMe=(event)=>{
    //     event.preventDefault();
    //     let userInfo={
    //         'email':this.emailEl.current.value,
    //         'password':this.passwordEl.current.value
    //     }
    //     console.log('xxxxxxxxxxx', userInfo);
    //     Api.authenticateUsr(userInfo)
    //     .then(result => {
    //         console.log('xxxx result',result );
    //     }).catch(err => {
    //         console.log("xxxxxxxx xxxxxxxxxx xxxx err is ", err);
    //     });
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
                        <h2 class="form-signin-heading">Please Register</h2>
                        <input type="text" class="form-control"  name="email"  id="email" ref={this.emailEl} />
                        <input type="password" class="form-control" name="password" placeholder="Password" id="password" ref={this.passwordEl}  />
                        <label class="checkbox">
                            <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember me
      </label>
                        <button class="btn btn-lg btn-primary btn-block" type="button" onClick={this.submitHandler}>Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;