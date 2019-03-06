import axios from 'axios';
import { url } from '../const/url';

export default class AuthService {

    constructor() {
       // this.getProfile = this.getProfile.bind(this)
    }

    authenticateUsr(userInfoVo) { 
        let requestBody = {
            query: `
              query {
                login(email: "${userInfoVo.email}", password: "${userInfoVo.password}") {
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
        // return axios.post(url.AUTHENTICATE_USR, userInfoVo)
        //     .then((result) => {
        //         if (result.data.success) {
        //             console.log('xxxxx servise', result.data);
        //            // this.setToken(result.data.body);
        //         }
        //         return Promise.resolve(result);
        //     }).catch(err => {
        //         console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        //     });

    }

}
