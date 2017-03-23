import { inject } from 'aurelia-framework';
import { Api } from './api';

@inject(Api)
export class UserApi {
    constructor(api) {
        this.api = api;
    }

    getAll(count) {
        // return this.api.get("/?nat=us");
        return this.api.get(`/?nat=us&results=${count}`);
    }
}