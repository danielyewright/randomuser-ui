import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import 'whatwg-fetch';

let BASE_URL = 'https://randomuser.me/api';

@inject(HttpClient)
export class Api {
    constructor(http) {
        http.configure(config => {
            config
                .withBaseUrl(BASE_URL)
                // .withDefaults({
                //     credentials: 'include'
                // })
                .withInterceptor({
                    request(request) {
                        console.log(`Intercepted request using method: ${request.method} with URL: ${request.url}`);
                        return request;
                    },
                    response(response) {
                        console.log(`Intercepted response ${response.status} using URL: ${response.url}`);
                        if (response.status > 299 || response.status < 200){
                            throw Error(`${response.status}`);
                        }
                        return response;
                    }
                });
        });
        this.http = http;
    }

    get(url, responseType = 'json'){
        return this.http.fetch(url)
            .then(response => {
                 switch(responseType.toLowerCase()){
                    case 'json': 
                        return response.json();
                    case 'text': 
                        return response.text();
                    default: 
                        return response.json();
                }
            })
    }
    put(url, payload, responseType = 'text'){       
        //TODO: Test to make sure this works. Not tested yet
        // var data = new FormData();
        // data.append( "json", JSON.stringify( payload ) );
        return this.http.fetch(url,
            {
                method: "put",
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(response => {
                switch(responseType.toLowerCase()){
                    case 'json': 
                        return response.json();
                    default: 
                        return response.text();
                }
            })
    }
    post(){
        throw Error('Not yet implemented');
    }
    delete(url){
        //TODO: Test to make sure this works. Not tested yet
        return this.http.fetch(url,
            {
                method: "delete",
            })
            .then(response => {
                return response.json()
            })
    }
}