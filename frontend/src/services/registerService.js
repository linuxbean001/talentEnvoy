import axios from 'axios';
import { url } from '../const/url';

export default class RegisterService {

    constructor() {
       // this.getProfile = this.getProfile.bind(this) 
    }

    authenticateUsr(userInfoVo) {
      console.log('xxxxxxxxxx', userInfoVo);
       
        let requestBody = {
            query: `
              mutation {
                createUser(userInput: {email: "${userInfoVo.email}", password: "${userInfoVo.password}"}) {
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
    }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed!');
            }
            return res.json();
          })
          .then(resData => {
            console.log('xxxxxxxxxxx ss', resData.data.login);
            if (resData.data.login.token) {

              return Promise.resolve(resData.data.login);// this.context.login(
              //   resData.data.login.token,
              //   resData.data.login.userId,
              //   resData.data.login.tokenExpiration
              // );
            }
          })
          .catch(err => {
            console.log(err);
          });
    
       // return axios.post(url.graphql_url, requestBody)
      //  fetch('http://localhost:8000/graphql', {
      //   method: 'POST',
      //   body: JSON.stringify(requestBody),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      //       .then((result) => {
      //           console.log('xxxxx servise', result);
      //           // if (result.data.success) {
                   
      //           // }
      //           return Promise.resolve(result);
      //       }).catch(err => {
      //           console.log('xxxxxxx xxxxxxxxxxx err is ', err);
      //       });
    }

}
