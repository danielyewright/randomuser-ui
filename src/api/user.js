import { inject } from 'aurelia-framework';
import { Api } from './api';

@inject(Api)
export class UserApi {
    constructor(api) {
        this.api = api;
    }

    // TODO: Add extra params for controlling returned data
    getAll(count, nat) {
        return this.api.get(`/?results=${count}&nat=${nat}`);
    }
}