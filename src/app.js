import { inject, computedFrom } from 'aurelia-framework';
import { UserApi } from 'api/user';

@inject(UserApi)
export class App {
    constructor(userApi) {
        this.userApi = userApi;
        this._users = [];
        this.count = 0;
        this.message = 'Hello World!';
    }

    activate(count) { 
        return this.userApi.getAll(count)
            .then(users => this._users = users);
    }

    get() {
        return this._users;
    }
}
