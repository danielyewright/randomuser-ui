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

            this.userApi = userApi;
            this._users = [];
            this.count = 0;
        }

        App.prototype.activate = function activate(count) {
            var _this = this;

            return this.userApi.getAll(count).then(function (users) {
                return _this._users = users;
            });
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

        UserApi.prototype.getAll = function getAll(count) {
            return this.api.get('/?nat=us&results=' + count);
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
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"./style.css\"></require><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3 form-inline\"><div class=\"form-group\"><label for=\"numberOfUsers\" class=\"control-label\">Number of Users</label><br><select id=\"numberOfUsers\" value.bind=\"count\" class=\"form-control\" style=\"margin-right:5px\"><option value=\"\">-</option><option model.bind=\"25\">25</option><option model.bind=\"50\">50</option></select><button click.delegate=\"activate(count)\" class=\"btn btn-default\">Get Users</button></div></div><div class=\"col-sm-12\" style=\"margin-top:15px\"><div class=\"form-group\"><label for=\"output\" class=\"control-label\">Output</label><textarea cols=\"30\" rows=\"15\" class=\"form-control\" value=\"${apiValue}\" readonly=\"readonly\"></textarea></div></div></div></div></template>"; });
define('text!style.css', ['module'], function(module) { module.exports = "body {\r\n    background-color: #ececec;\r\n    margin: 1% auto;\r\n}\r\n\r\n.form-control[readonly] {\r\n    background-color: #fff;\r\n}\r\n\r\ntextarea.form-control {\r\n    overflow: auto;\r\n}"; });
//# sourceMappingURL=app-bundle.js.map