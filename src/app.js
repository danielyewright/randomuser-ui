import { inject, computedFrom } from 'aurelia-framework';
import { UserApi } from 'api/user';

@inject(UserApi)
export class App {
    nationalities = [
        { value: 'au', name: 'AU' },
        { value: 'br', name: 'BR' },
        { value: 'ca', name: 'CA' },
        { value: 'ch', name: 'CH' },
        { value: 'de', name: 'DE' },
        { value: 'dk', name: 'DK' },
        { value: 'es', name: 'ES' },
        { value: 'fi', name: 'FI' },
        { value: 'fr', name: 'FR' },
        { value: 'gb', name: 'GB' },
        { value: 'ie', name: 'IE' },
        { value: 'ir', name: 'IR' },
        { value: 'nl', name: 'NL' },
        { value: 'nz', name: 'NZ' },
        { value: 'tr', name: 'TR' },
        { value: 'us', name: 'US' }
    ];

    constructor(userApi) {
        this.userApi = userApi;
        this._users = [];
        this.count = 0;
        this.nat = '';
        this.output = '';
    }

    activate() { }

    getUsers(count, nat) {
        return this.userApi.getAll(count, nat)
            .then(users => this._users = users)
            .then(users => {
                this.output = JSON.stringify(users.results);
            })
    }

    get() {
        return this._users;
    }
}
