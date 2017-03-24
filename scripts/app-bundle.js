define('app',['exports', 'aurelia-framework', 'api/user'], function (exports, _aureliaFramework, _user) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.App = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_user.UserApi), _dec(_class = function () {
        function App(userApi) {
            _classCallCheck(this, App);

            this.nationalities = [{ value: 'au', name: 'AU' }, { value: 'br', name: 'BR' }, { value: 'ca', name: 'CA' }, { value: 'ch', name: 'CH' }, { value: 'de', name: 'DE' }, { value: 'dk', name: 'DK' }, { value: 'es', name: 'ES' }, { value: 'fi', name: 'FI' }, { value: 'fr', name: 'FR' }, { value: 'gb', name: 'GB' }, { value: 'ie', name: 'IE' }, { value: 'ir', name: 'IR' }, { value: 'nl', name: 'NL' }, { value: 'nz', name: 'NZ' }, { value: 'tr', name: 'TR' }, { value: 'us', name: 'US' }];
            this.isSuccess = false;

            this.userApi = userApi;
            this._users = [];
            this.count = 0;
            this.nat = '';
            this.output = '';
        }

        App.prototype.getUsers = function getUsers(count, nat) {
            var _this = this;

            if (this.count > 5000) {
                return false;
            } else {
                return this.userApi.getAll(count, nat).then(function (users) {
                    return _this._users = users;
                }).then(function (users) {
                    _this.output = JSON.stringify(users.results);
                });
            }
        };

        App.prototype.get = function get() {
            return this._users;
        };

        return App;
    }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', 'jquery', 'bootstrap'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('api/api',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'whatwg-fetch'], function (exports, _aureliaFramework, _aureliaFetchClient) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Api = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var BASE_URL = 'https://randomuser.me/api';

    var Api = exports.Api = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
        function Api(http) {
            _classCallCheck(this, Api);

            http.configure(function (config) {
                config.withBaseUrl(BASE_URL).withInterceptor({
                    request: function request(_request) {
                        console.log('Intercepted request using method: ' + _request.method + ' with URL: ' + _request.url);
                        return _request;
                    },
                    response: function response(_response) {
                        console.log('Intercepted response ' + _response.status + ' using URL: ' + _response.url);
                        if (_response.status > 299 || _response.status < 200) {
                            throw Error('' + _response.status);
                        }
                        return _response;
                    }
                });
            });
            this.http = http;
        }

        Api.prototype.get = function get(url) {
            var responseType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'json';

            return this.http.fetch(url).then(function (response) {
                switch (responseType.toLowerCase()) {
                    case 'json':
                        return response.json();
                    case 'text':
                        return response.text();
                    default:
                        return response.json();
                }
            });
        };

        Api.prototype.put = function put(url, payload) {
            var responseType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'text';

            return this.http.fetch(url, {
                method: "put",
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(function (response) {
                switch (responseType.toLowerCase()) {
                    case 'json':
                        return response.json();
                    default:
                        return response.text();
                }
            });
        };

        Api.prototype.post = function post() {
            throw Error('Not yet implemented');
        };

        Api.prototype.delete = function _delete(url) {
            return this.http.fetch(url, {
                method: "delete"
            }).then(function (response) {
                return response.json();
            });
        };

        return Api;
    }()) || _class);
});
define('api/user',['exports', 'aurelia-framework', './api'], function (exports, _aureliaFramework, _api) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UserApi = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var UserApi = exports.UserApi = (_dec = (0, _aureliaFramework.inject)(_api.Api), _dec(_class = function () {
        function UserApi(api) {
            _classCallCheck(this, UserApi);

            this.api = api;
        }

        UserApi.prototype.getAll = function getAll(count, nat) {
            return this.api.get('/?results=' + count + '&nat=' + nat);
        };

        return UserApi;
    }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"./style.css\"></require><div class=\"container\"><div class=\"row\"><div class=\"col-sm-6\"><div class=\"form-group\"><label class=\"control-label\">Number of Results</label><br><span class=\"help-block\">Random User Generator allows you to fetch up to <strong>5,000</strong> generated users in one request</span><div class=\"row\"><div class=\"col-sm-3\"><input id=\"count\" type=\"number\" value.bind=\"count\" class=\"form-control\"></div><div class=\"col-sm-12\"><span if.bind=\"count > 5000\" class=\"text-danger\">Please enter a value less than or equal to <strong>5,000<strong>.</strong></strong></span></div></div></div><div class=\"form-group\"><label class=\"control-label\">Nationality</label><br><div class=\"row\"><div class=\"col-sm-3\"><select value.bind=\"nat\" class=\"form-control\"><option value=\"\"></option><option repeat.for=\"option of nationalities\" model.bind=\"option.value\">${option.name}</option></select></div></div></div><button click.delegate=\"getUsers(count, nat)\" class=\"btn btn-default\" disabled.bind=\"count > 5000\">Generate <span if.bind=\"count\">(${count})</span> users</button></div><div class=\"col-sm-12\" style=\"margin-top:15px\"><div class=\"form-group\"><label for=\"output\" class=\"control-label\">Output</label><span class=\"help-block pull-right\">You can copy the results for use</span></div></div></div></div></template>"; });
define('text!style.css', ['module'], function(module) { module.exports = "body {\n    background-color: #efefef;\n    margin: 1% auto;\n}\n\n.form-control[readonly] {\n    background-color: #fff;\n}\n\ntextarea.form-control {\n    overflow: auto;\n}\n\n.val-error {\n    border-color: red;\n    box-shadow: inset 0 1px 1px red, 0 1px 3px 2px red;\n}"; });
//# sourceMappingURL=app-bundle.js.map