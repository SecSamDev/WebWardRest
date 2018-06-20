webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/alert/alert.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let alert of alerts\" class=\"{{ cssClass(alert) }} alert-dismissable\">\n    {{alert.msg}}\n    <a class=\"close\" (click)=\"removeAlert(alert)\">&times;</a>\n</div>"

/***/ }),

/***/ "./src/app/alert/alert.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alert__ = __webpack_require__("./src/app/alert/alert.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AlertComponent = /** @class */ (function () {
    function AlertComponent(alertService) {
        this.alertService = alertService;
        this.alerts = [];
    }
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.alertService.getAlert().subscribe(function (alert) {
            if (!alert) {
                // clear alerts when an empty alert is received
                _this.alerts = [];
                return;
            }
            // add alert to array
            _this.alerts.push(alert);
        });
    };
    AlertComponent.prototype.removeAlert = function (alert) {
        this.alerts = this.alerts.filter(function (x) { return x !== alert; });
    };
    AlertComponent.prototype.cssClass = function (alert) {
        if (!alert) {
            return;
        }
        // return css class based on alert type
        switch (alert.type) {
            case __WEBPACK_IMPORTED_MODULE_1__alert__["a" /* AlertType */].Success:
                return 'alert alert-success';
            case __WEBPACK_IMPORTED_MODULE_1__alert__["a" /* AlertType */].Error:
                return 'alert alert-danger';
            case __WEBPACK_IMPORTED_MODULE_1__alert__["a" /* AlertType */].Info:
                return 'alert alert-info';
            case __WEBPACK_IMPORTED_MODULE_1__alert__["a" /* AlertType */].Warning:
                return 'alert alert-warning';
        }
    };
    AlertComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            moduleId: module.i,
            selector: 'app-alert',
            template: __webpack_require__("./src/app/alert/alert.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__alert_service__["a" /* AlertService */]])
    ], AlertComponent);
    return AlertComponent;
}());



/***/ }),

/***/ "./src/app/alert/alert.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert__ = __webpack_require__("./src/app/alert/alert.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AlertService = /** @class */ (function () {
    function AlertService(router) {
        var _this = this;
        this.router = router;
        this.subject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["b" /* Subject */]();
        this.keepAfterRouteChange = false;
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationStart */]) {
                if (_this.keepAfterRouteChange) {
                    // only keep for a single route change
                    _this.keepAfterRouteChange = false;
                }
                else {
                    // clear alert messages
                    _this.clear();
                }
            }
        });
    }
    AlertService.prototype.getAlert = function () {
        return this.subject.asObservable();
    };
    AlertService.prototype.success = function (message, keepAfterRouteChange) {
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.alert(__WEBPACK_IMPORTED_MODULE_3__alert__["a" /* AlertType */].Success, message, keepAfterRouteChange);
    };
    AlertService.prototype.error = function (message, keepAfterRouteChange) {
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.alert(__WEBPACK_IMPORTED_MODULE_3__alert__["a" /* AlertType */].Error, message, keepAfterRouteChange);
    };
    AlertService.prototype.info = function (message, keepAfterRouteChange) {
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.alert(__WEBPACK_IMPORTED_MODULE_3__alert__["a" /* AlertType */].Info, message, keepAfterRouteChange);
    };
    AlertService.prototype.warn = function (message, keepAfterRouteChange) {
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.alert(__WEBPACK_IMPORTED_MODULE_3__alert__["a" /* AlertType */].Warning, message, keepAfterRouteChange);
    };
    AlertService.prototype.alert = function (type, message, keepAfterRouteChange) {
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: type, msg: message });
    };
    AlertService.prototype.clear = function () {
        // clear alerts
        this.subject.next();
    };
    AlertService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], AlertService);
    return AlertService;
}());



/***/ }),

/***/ "./src/app/alert/alert.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Alert */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertType; });
var Alert = /** @class */ (function () {
    function Alert() {
    }
    return Alert;
}());

var AlertType;
(function (AlertType) {
    AlertType[AlertType["Success"] = 0] = "Success";
    AlertType[AlertType["Error"] = 1] = "Error";
    AlertType[AlertType["Info"] = 2] = "Info";
    AlertType[AlertType["Warning"] = 3] = "Warning";
})(AlertType || (AlertType = {}));


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_guard_service__ = __webpack_require__("./src/app/auth/auth-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_admin_service__ = __webpack_require__("./src/app/auth/auth-admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_auth_nologin_service__ = __webpack_require__("./src/app/auth/auth-nologin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signin_signin_component__ = __webpack_require__("./src/app/signin/signin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dashboard_dashboard_component__ = __webpack_require__("./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__web_project_index__ = __webpack_require__("./src/app/web-project/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_not_found_page_not_found_component__ = __webpack_require__("./src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__user_management_index__ = __webpack_require__("./src/app/user-management/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__scan_profile_scan_profile_component__ = __webpack_require__("./src/app/scan-profile/scan-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__web_ward_console_web_ward_console_component__ = __webpack_require__("./src/app/web-ward-console/web-ward-console.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__user_management_my_profile_my_profile_component__ = __webpack_require__("./src/app/user-management/my-profile/my-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pipeline_pipeline_component__ = __webpack_require__("./src/app/pipeline/pipeline.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__webhook_index__ = __webpack_require__("./src/app/webhook/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__infrastructure_infrastructure_component__ = __webpack_require__("./src/app/infrastructure/infrastructure.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__infrastructure_infrastructure_edit_infrastructure_edit_component__ = __webpack_require__("./src/app/infrastructure/infrastructure-edit/infrastructure-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__arachni_arachni_component__ = __webpack_require__("./src/app/arachni/arachni.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__wwmodules_wwmodules_component__ = __webpack_require__("./src/app/wwmodules/wwmodules.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__scan_report_scan_report_component__ = __webpack_require__("./src/app/scan-report/scan-report.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__scan_report_full_view_full_view_component__ = __webpack_require__("./src/app/scan-report/full-view/full-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__threat_model_threat_model_component__ = __webpack_require__("./src/app/threat-model/threat-model.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__threat_model_edit_edit_component__ = __webpack_require__("./src/app/threat-model/edit/edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__database_database_component__ = __webpack_require__("./src/app/database/database.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_6__dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard_service__["a" /* AuthGuardService */]] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_5__signin_signin_component__["a" /* SigninComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_4__auth_auth_nologin_service__["a" /* AuthNoLoginService */]] },
    { path: 'users', component: __WEBPACK_IMPORTED_MODULE_9__user_management_index__["b" /* UserManagementComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard_service__["a" /* AuthGuardService */]] },
    { path: 'users/edit/:id', component: __WEBPACK_IMPORTED_MODULE_9__user_management_index__["a" /* UserEditComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard_service__["a" /* AuthGuardService */]] },
    { path: 'reports', component: __WEBPACK_IMPORTED_MODULE_19__scan_report_scan_report_component__["a" /* ScanReportComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard_service__["a" /* AuthGuardService */]] },
    { path: 'reports/:id', component: __WEBPACK_IMPORTED_MODULE_20__scan_report_full_view_full_view_component__["a" /* FullReportViewComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard_service__["a" /* AuthGuardService */]] },
    { path: 'projects', component: __WEBPACK_IMPORTED_MODULE_7__web_project_index__["b" /* WebProjectComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard_service__["a" /* AuthGuardService */]] },
    { path: 'projects/edit/:id', component: __WEBPACK_IMPORTED_MODULE_7__web_project_index__["c" /* WebProjectEditComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard_service__["a" /* AuthGuardService */]] },
    { path: 'projects/:id', component: __WEBPACK_IMPORTED_MODULE_7__web_project_index__["e" /* WebProjectPageComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard_service__["a" /* AuthGuardService */]] },
    { path: 'threat-models', component: __WEBPACK_IMPORTED_MODULE_21__threat_model_threat_model_component__["a" /* ThreatModelComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard_service__["a" /* AuthGuardService */]] },
    { path: 'threat-models/:id', component: __WEBPACK_IMPORTED_MODULE_22__threat_model_edit_edit_component__["a" /* ThreatModelEditComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard_service__["a" /* AuthGuardService */]] },
    { path: 'users/:id', component: __WEBPACK_IMPORTED_MODULE_9__user_management_index__["d" /* UserProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard_service__["a" /* AuthGuardService */]] },
    { path: 'scan_profile', component: __WEBPACK_IMPORTED_MODULE_10__scan_profile_scan_profile_component__["a" /* ScanProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard_service__["a" /* AuthGuardService */]] },
    { path: 'console', component: __WEBPACK_IMPORTED_MODULE_11__web_ward_console_web_ward_console_component__["a" /* WebWardConsoleComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__auth_auth_admin_service__["a" /* AuthAdminService */]] },
    { path: 'database', component: __WEBPACK_IMPORTED_MODULE_23__database_database_component__["a" /* DatabaseComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__auth_auth_admin_service__["a" /* AuthAdminService */]] },
    { path: 'ww-module', component: __WEBPACK_IMPORTED_MODULE_18__wwmodules_wwmodules_component__["a" /* WwmodulesComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__auth_auth_admin_service__["a" /* AuthAdminService */]] },
    { path: 'infrastructure', component: __WEBPACK_IMPORTED_MODULE_15__infrastructure_infrastructure_component__["a" /* InfrastructureComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__auth_auth_admin_service__["a" /* AuthAdminService */]] },
    { path: 'infrastructure/:id', component: __WEBPACK_IMPORTED_MODULE_16__infrastructure_infrastructure_edit_infrastructure_edit_component__["a" /* InfrastructureEditComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__auth_auth_admin_service__["a" /* AuthAdminService */]] },
    { path: 'arachni', component: __WEBPACK_IMPORTED_MODULE_17__arachni_arachni_component__["a" /* ArachniComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__auth_auth_admin_service__["a" /* AuthAdminService */]] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_12__user_management_my_profile_my_profile_component__["a" /* MyProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard_service__["a" /* AuthGuardService */]] },
    { path: 'pipeline', component: __WEBPACK_IMPORTED_MODULE_13__pipeline_pipeline_component__["a" /* PipelineComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard_service__["a" /* AuthGuardService */]] },
    { path: 'webhook', component: __WEBPACK_IMPORTED_MODULE_14__webhook_index__["b" /* WebhookComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard_service__["a" /* AuthGuardService */]] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_8__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */] } //Redirect to LOGIN
    //INIT path the last because then redirect not loaded
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forRoot(routes, { enableTracing: false })],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app-settings.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppSettingsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppSettingsService = /** @class */ (function () {
    function AppSettingsService() {
        this._API_ENDPOINT = 'http://localhost:80/api/';
        this._API_FILES = 'http://localhost:80/files/';
    }
    Object.defineProperty(AppSettingsService.prototype, "API_FILES", {
        get: function () {
            return this._API_FILES;
        },
        set: function (api) {
            this._API_FILES = api;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppSettingsService.prototype, "API_ENDPOINT", {
        get: function () {
            return this._API_ENDPOINT;
        },
        set: function (api) {
            this._API_ENDPOINT = api;
            try {
                var urlAux = new URL(api);
                this._API_FILES = urlAux.origin + "/files/";
            }
            catch (err) { }
            console.log("Api Endpoint: " + this._API_ENDPOINT);
        },
        enumerable: true,
        configurable: true
    });
    AppSettingsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], AppSettingsService);
    return AppSettingsService;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-alert></app-alert>\r\n<nav class=\"navbar navbar-dark bg-dark\">\r\n\r\n    <!--\r\n    <button class=\"navbar-toggler\" type=\"button\" (click)=\"isNavbarCollapsed = !isNavbarCollapsed\" aria-controls=\"exCollapsingNavbar2\"\r\n        aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n        <span class=\"navbar-toggler-icon\"></span>\r\n    </button>\r\n-->\r\n    <div *ngIf=\"auth.isAuth()\" ngbDropdown class=\"d-inline-block\">\r\n        <button class=\"btn btn-outline-primary navbar-toggler\" type=\"button\" id=\"dropdownBasic1\" ngbDropdownToggle>\r\n            <span class=\"navbar-toggler-icon\"></span>\r\n        </button>\r\n        <div *ngIf=\"auth.isAuth()\" ngbDropdownMenu aria-labelledby=\"dropdownBasic1\">\r\n            <button class=\"dropdown-item\" [routerLink]=\"['/']\">\r\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"\r\n                    stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-home\">\r\n                    <path d=\"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" style=\"fill: none;stroke: rgb(70, 120, 255);\"></path>\r\n                    <polyline points=\"9 22 9 12 15 12 15 22\" style=\"fill: none;stroke: rgb(70, 120, 255);\"></polyline>\r\n                </svg>\r\n                Dashboard\r\n            </button>\r\n            <button class=\"dropdown-item\" [routerLink]=\"['/reports']\">\r\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"\r\n                    stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-bar-chart-2\">\r\n                    <line x1=\"18\" y1=\"20\" x2=\"18\" y2=\"10\" style=\"fill: none;stroke: rgb(70, 120, 255);\"></line>\r\n                    <line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"4\" style=\"fill: none;stroke: rgb(70, 120, 255);\"></line>\r\n                    <line x1=\"6\" y1=\"20\" x2=\"6\" y2=\"14\" style=\"fill: none;stroke: rgb(70, 120, 255);\"></line>\r\n                </svg>\r\n                Reports\r\n            </button>\r\n            <button class=\"dropdown-item\" [routerLink]=\"['/projects']\">\r\n                <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Capa_1\" x=\"0px\" y=\"0px\"\r\n                    viewBox=\"0 0 480 480\" xml:space=\"preserve\" width=\"24\" height=\"24\" style=\"fill: rgb(70, 120, 255);stroke: rgb(70, 120, 255);\">\r\n                    <g>\r\n                        <path d=\"M472,0H112c-4.418,0-8,3.582-8,8v120h16V16h344v440c0.077,4.207-3.169,7.731-7.368,8c-0.688,0-1.376-0.056-2.064-0.072\r\n                                c-1.416-0.04-2.832-0.072-4.224-0.216c-0.12,0-0.232,0-0.352-0.048c-26.128-2.856-46.767-23.475-49.648-49.6\r\n                                c0-0.112-0.04-0.232-0.056-0.344c-0.194-1.901-0.29-3.81-0.288-5.72v-16c0-4.418-3.582-8-8-8H120V240h-16v144H40\r\n                                c-4.418,0-8,3.582-8,8v16c0.044,39.746,32.254,71.956,72,72h352.8c12.982-0.34,23.3-11.014,23.2-24V8C480,3.582,476.418,0,472,0z\r\n                                 M104,464c-30.913-0.035-55.965-25.087-56-56v-8h336v8c0.011,2.638,0.163,5.274,0.456,7.896c0.072,0.696,0.208,1.368,0.304,2.056\r\n                                c0.264,1.936,0.584,3.864,1.008,5.76c0.144,0.664,0.328,1.32,0.496,1.984c0.488,1.928,1.04,3.824,1.68,5.696\r\n                                c0.184,0.536,0.376,1.064,0.576,1.6c0.728,1.984,1.552,3.92,2.456,5.832c0.192,0.392,0.368,0.8,0.56,1.16\r\n                                c1.003,2.027,2.104,3.997,3.304,5.912c0.16,0.256,0.304,0.52,0.464,0.8c1.304,2.043,2.712,4.019,4.216,5.92l0.256,0.344\r\n                                c1.746,2.193,3.616,4.284,5.6,6.264c1.723,1.707,3.509,3.307,5.36,4.8L104,464z\" />\r\n                        <path d=\"M264,224c2.122,0,4.156-0.844,5.656-2.344l32-32c3.123-3.124,3.123-8.188,0-11.312l-32-32\r\n                                c-1.5-1.5-3.534-2.344-5.656-2.344H40c-22.091,0-40,17.909-40,40s17.909,40,40,40H264z M261.936,161.248L284.688,184\r\n                                l-22.752,22.752L256.248,184L261.936,161.248z M64,160h181.76l-4,16H80v16h161.76l4,16H64V160z M16,184c0-13.255,10.745-24,24-24\r\n                                h8v48h-8C26.745,208,16,197.255,16,184z\" />\r\n                        <path d=\"M184,344h240c4.418,0,8-3.582,8-8V96c-0.001-4.418-3.583-7.999-8.002-7.998c-2.121,0-4.154,0.843-5.654,2.342l-240,240\r\n                                c-3.124,3.125-3.123,8.19,0.002,11.314C179.846,343.157,181.879,344,184,344z M416,115.312V136h-16v16h16v16h-16v16h16v16h-16v16\r\n                                h16v16h-16v16h16v16h-16v16h16v16h-16v16h16v16h-16v-16h-16v16h-16v-16h-16v16h-16v-16h-16v16h-16v-16h-16v16h-16v-16h-16v16h-16\r\n                                v-16h-16v16h-20.688L416,115.312z\" />\r\n                        <path d=\"M299.88,296H376c4.418,0,8-3.582,8-8v-76.12c-0.001-4.418-3.583-7.999-8.002-7.998c-2.121,0-4.154,0.843-5.654,2.342\r\n                                l-76.12,76.12c-3.124,3.125-3.123,8.19,0.002,11.314C295.726,295.157,297.759,296,299.88,296z M368,231.2V280h-48.8L368,231.2z\"\r\n                        />\r\n                    </g>\r\n                </svg>\r\n                Projects\r\n            </button>\r\n            <button class=\"dropdown-item\" [routerLink]=\"['/threat-models']\">\r\n                <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n                    viewBox=\"0 0 60 60\" style=\"enable-background:new 0 0 60 60;\" xml:space=\"preserve\" width=\"24\" height=\"24\">\r\n                    <g>\r\n                        <path style=\"fill: rgb(70, 120, 255);\" d=\"M57.49,27H54v-6.268C54,19.226,52.774,18,51.268,18H50V0H10v2H7v2H4v7H2.732C1.226,11,0,12.226,0,13.732v43.687l0.006,0\r\n                        c-0.005,0.563,0.17,1.114,0.522,1.575C1.018,59.634,1.76,60,2.565,60h44.759c1.157,0,2.175-0.78,2.449-1.813L60,30.149v-0.177\r\n                        C60,28.25,58.944,27,57.49,27z M51.268,20C51.672,20,52,20.328,52,20.732V27h-2v-7H51.268z M48,2v16v9H12.731\r\n                        c-0.233,0-0.457,0.039-0.674,0.098c-0.018,0.005-0.039,0.003-0.057,0.008V2H48z M10,4v25.585l-0.063,0.173L9,32.326V4H10z M6,6h1\r\n                        v31.81l-1,2.741V11V6z M2,13.732C2,13.328,2.329,13,2.732,13H4v32.943l-2,5.455V13.732z M47.868,57.584\r\n                        C47.803,57.829,47.579,58,47.324,58H2.565c-0.243,0-0.385-0.139-0.448-0.222c-0.063-0.082-0.16-0.256-0.123-0.408L4,51.87v0.001\r\n                        l3-8.225l0,0l3-8.225v0.003l1.932-5.301L12,29.938l0,0l0.16-0.439l0.026-0.082C12.252,29.172,12.477,29,12.731,29H48h2h4h3.49\r\n                        c0.379,0,0.477,0.546,0.501,0.819L47.868,57.584z\" />\r\n                        <path style=\"fill: rgb(70, 120, 255);\" d=\"M18,17h24c0.552,0,1-0.447,1-1s-0.448-1-1-1H18c-0.552,0-1,0.447-1,1S17.448,17,18,17z\" />\r\n                        <path style=\"fill: rgb(70, 120, 255);\" d=\"M18,10h10c0.552,0,1-0.447,1-1s-0.448-1-1-1H18c-0.552,0-1,0.447-1,1S17.448,10,18,10z\" />\r\n                        <path style=\"fill: rgb(70, 120, 255);\" d=\"M18,24h24c0.552,0,1-0.447,1-1s-0.448-1-1-1H18c-0.552,0-1,0.447-1,1S17.448,24,18,24z\" />\r\n                    </g>\r\n                </svg>\r\n                Threat Models\r\n            </button>\r\n            <button class=\"dropdown-item\" [routerLink]=\"['/pipeline']\">\r\n                <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\"  x=\"0px\" y=\"0px\"\r\n                    viewBox=\"0 0 512 512\" xml:space=\"preserve\" width=\"24\" height=\"24\">\r\n                    <g>\r\n                        <rect x=\"28.7\" width=\"154.6\" height=\"45\" style=\"fill: rgb(70, 120, 255);\" />\r\n                    </g>\r\n                    <g>\r\n                        <rect x=\"28.7\" y=\"467\" width=\"154.6\" height=\"45\" style=\"fill: rgb(70, 120, 255);\" />\r\n                    </g>\r\n                    <g>\r\n                        <rect x=\"0\" y=\"75.043\" width=\"212\" height=\"63.2\" style=\"fill: rgb(70, 120, 255);\" />\r\n                    </g>\r\n                    <g>\r\n                        <rect x=\"0\" y=\"373.757\" width=\"212\" height=\"63.2\" style=\"fill: rgb(70, 120, 255);\" />\r\n                    </g>\r\n                    <g>\r\n                        <path d=\"M384.007,128.006c-49.826,0-93.089,28.621-114.224,70.283h-86.512V168.24H28.679v175.52h154.593V313.71h86.512    c21.135,41.663,64.398,70.283,114.224,70.283c70.576,0,127.994-57.418,127.994-127.994S454.583,128.006,384.007,128.006z     M286.014,256c0-48.934,36.054-89.604,82.992-96.845v52.749c-18.349,6.259-31.587,23.655-31.587,44.096    c0,3.1,0.311,6.129,0.892,9.061l-45.667,26.366C288.366,280.435,286.014,268.487,286.014,256z M384.007,353.993    c-30.813,0-58.346-14.3-76.322-36.607l45.655-26.359c8.201,7.189,18.93,11.562,30.667,11.562c11.737,0,22.466-4.372,30.667-11.562    l45.655,26.359C442.352,339.692,414.82,353.993,384.007,353.993z M429.703,265.061c0.581-2.932,0.892-5.961,0.892-9.061    c0-20.441-13.239-37.837-31.587-44.096v-52.749c46.939,7.241,82.992,47.911,82.992,96.845c0,12.488-2.352,24.434-6.629,35.428    L429.703,265.061z\"\r\n                            style=\"fill: rgb(70, 120, 255);\" />\r\n                    </g>\r\n                </svg>\r\n                Pipelines\r\n            </button>\r\n            <button *ngIf=\"!auth.isDev()\" class=\"dropdown-item\" [routerLink]=\"['/scan_profile']\">\r\n                <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Capa_1\" x=\"0px\" y=\"0px\"\r\n                    viewBox=\"0 0 416 416\" style=\"enable-background:new 0 0 416 416;\" xml:space=\"preserve\" width=\"24\" height=\"24\">\r\n                    <polygon points=\"72.103,175.999 72.103,207.999 243.816,207.999 264.103,187.714 264.103,175.999   \" fill=\"#006DF0\" />\r\n                    <polygon points=\"72.103,239.999 72.103,271.999 179.814,271.999 211.816,239.999   \" fill=\"#006DF0\" />\r\n                    <rect x=\"72.104\" y=\"303.998\" width=\"96\" height=\"32\" fill=\"#006DF0\" />\r\n                    <path d=\"M403.212,139.108l-22.628-22.627c-6.245-6.245-16.381-6.245-22.626,0c-6.03,6.03-11.568,11.568-16.877,16.877    l45.255,45.255c5.35-5.35,10.902-10.902,16.876-16.877C409.459,155.49,409.459,145.354,403.212,139.108z\"\r\n                        fill=\"#006DF0\" />\r\n                    <path d=\"M329.797,144.7c-57.43,57.431-74.356,74.298-145.694,145.638c0,27.687,0,21.687,0,45.662    c38.518-0.001,28.774,0.017,44.917-0.07c3.55-3.55,6.928-6.928,10.239-10.239l56.844-56.819V384h-256V96h32.002v32h191.998V96h32    v59.717l32-31.999V96c0-17.674-14.326-32-32-32h-44.424c-5.926-6.583-13.538-11.62-22.284-14.136    c-7.368-2.118-13.038-7.788-15.156-15.156C208.474,14.664,190.001,0,168.103,0c-21.898,0-40.37,14.664-46.136,34.707    c-2.121,7.376-7.805,13.039-15.181,15.164C98.048,52.389,90.444,57.421,84.524,64H40.103c-17.673,0-32,14.326-32,32v288    c0,17.673,14.327,32,32,32h256c17.674,0,32-14.327,32-32V236.885l46.95-46.93L329.797,144.7z M222.354,319.967    c-5.962,0.034-6.66,0.034-21.938,0.032L200.103,320v-8.958v-14.078l5.214-5.215l22.627,22.628L222.354,319.967z M168.308,31.999    c8.837,0,16,7.163,16,16c0,8.836-7.163,16-16,16s-16-7.164-16-16C152.308,39.162,159.472,31.999,168.308,31.999z\"\r\n                        fill=\"#006DF0\" />\r\n                </svg>\r\n                Scan Profiles\r\n            </button>\r\n            <button class=\"dropdown-item\" [routerLink]=\"['/webhook']\">\r\n                <svg xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"30\" height=\"30\" viewBox=\"0 0 50 50\">\r\n                    <path style=\"fill: rgb(70, 120, 255);\" d=\"M 25 4 C 19.488281 4 15 8.488281 15 14 C 15 17.289063 16.632813 20.175781 19.09375 22 L 14.125 30.1875 C 13.109375 29.886719 11.980469 29.964844 11 30.53125 C 9.097656 31.628906 8.433594 34.097656 9.53125 36 C 10.628906 37.902344 13.097656 38.566406 15 37.46875 C 16.902344 36.371094 17.566406 33.902344 16.46875 32 C 16.296875 31.703125 16.074219 31.453125 15.84375 31.21875 L 21.28125 22.28125 L 21.8125 21.40625 L 20.9375 20.90625 C 18.582031 19.515625 17 16.941406 17 14 C 17 9.570313 20.570313 6 25 6 C 29.429688 6 33 9.570313 33 14 C 33 14.824219 32.886719 15.597656 32.65625 16.34375 L 34.5625 16.9375 C 34.851563 16.003906 35 15.023438 35 14 C 35 8.488281 30.511719 4 25 4 Z M 25 10 C 22.800781 10 21 11.800781 21 14 C 21 16.199219 22.800781 18 25 18 C 25.332031 18 25.660156 17.953125 25.96875 17.875 L 30.78125 26.59375 L 31.25 27.46875 L 32.15625 27 C 33.300781 26.367188 34.597656 26 36 26 C 40.429688 26 44 29.570313 44 34 C 44 38.429688 40.429688 42 36 42 C 33.839844 42 31.878906 41.136719 30.4375 39.75 L 29.0625 41.1875 C 30.859375 42.917969 33.3125 44 36 44 C 41.511719 44 46 39.511719 46 34 C 46 28.488281 41.511719 24 36 24 C 34.613281 24 33.328125 24.363281 32.125 24.875 L 27.71875 16.875 C 28.492188 16.144531 29 15.136719 29 14 C 29 11.800781 27.199219 10 25 10 Z M 25 12 C 26.117188 12 27 12.882813 27 14 C 27 15.117188 26.117188 16 25 16 C 23.882813 16 23 15.117188 23 14 C 23 12.882813 23.882813 12 25 12 Z M 10.5625 24.28125 C 6.207031 25.367188 3 29.324219 3 34 C 3 39.511719 7.488281 44 13 44 C 18.15625 44 22.285156 40.019531 22.8125 35 L 32.15625 35 C 32.601563 36.71875 34.148438 38 36 38 C 38.199219 38 40 36.199219 40 34 C 40 31.800781 38.199219 30 36 30 C 34.148438 30 32.601563 31.28125 32.15625 33 L 21 33 L 21 34 C 21 38.429688 17.429688 42 13 42 C 8.570313 42 5 38.429688 5 34 C 5 30.242188 7.585938 27.117188 11.0625 26.25 Z M 12.75 32 C 13.523438 31.902344 14.300781 32.273438 14.71875 33 C 15.277344 33.96875 14.96875 35.160156 14 35.71875 C 13.03125 36.277344 11.839844 35.96875 11.28125 35 C 10.722656 34.03125 11.03125 32.839844 12 32.28125 C 12.242188 32.140625 12.492188 32.03125 12.75 32 Z M 36 32 C 37.117188 32 38 32.882813 38 34 C 38 35.117188 37.117188 36 36 36 C 34.882813 36 34 35.117188 34 34 C 34 32.882813 34.882813 32 36 32 Z \"></path>\r\n                </svg>\r\n                WebHooks\r\n            </button>\r\n            <button *ngIf=\"!auth.isDev()\" class=\"dropdown-item\" [routerLink]=\"['/ww-module']\">\r\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"\r\n                    stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-layers\">\r\n                    <polygon points=\"12 2 2 7 12 12 22 7 12 2\" style=\"fill: none;stroke: rgb(70, 120, 255);\"></polygon>\r\n                    <polyline points=\"2 17 12 22 22 17\" style=\"fill: none;stroke: rgb(70, 120, 255);\"></polyline>\r\n                    <polyline points=\"2 12 12 17 22 12\" style=\"fill: none;stroke: rgb(70, 120, 255);\"></polyline>\r\n                </svg>\r\n                Web Ward Modules\r\n            </button>\r\n            <button *ngIf=\"!auth.isDev()\" class=\"dropdown-item\" [routerLink]=\"['/infrastructure']\">\r\n                <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 512\" width=\"24\" height=\"24\">\r\n                    <path d=\"M349.9 236.3h-66.1v-59.4h66.1v59.4zm0-204.3h-66.1v60.7h66.1V32zm78.2 144.8H362v59.4h66.1v-59.4zm-156.3-72.1h-66.1v60.1h66.1v-60.1zm78.1 0h-66.1v60.1h66.1v-60.1zm276.8 100c-14.4-9.7-47.6-13.2-73.1-8.4-3.3-24-16.7-44.9-41.1-63.7l-14-9.3-9.3 14c-18.4 27.8-23.4 73.6-3.7 103.8-8.7 4.7-25.8 11.1-48.4 10.7H2.4c-8.7 50.8 5.8 116.8 44 162.1 37.1 43.9 92.7 66.2 165.4 66.2 157.4 0 273.9-72.5 328.4-204.2 21.4.4 67.6.1 91.3-45.2 1.5-2.5 6.6-13.2 8.5-17.1l-13.3-8.9zm-511.1-27.9h-66v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm-78.1-72.1h-66.1v60.1h66.1v-60.1z\"\r\n                        style=\"fill: rgb(70, 120, 255);\" />\r\n                </svg>\r\n                Infrastructure\r\n            </button>\r\n            <button *ngIf=\"!auth.isDev()\" class=\"dropdown-item\" [routerLink]=\"['/database']\">\r\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\r\n                    <path d=\"M22 18.055v2.458c0 1.925-4.655 3.487-10 3.487-5.344 0-10-1.562-10-3.487v-2.458c2.418 1.738 7.005 2.256 10 2.256 3.006 0 7.588-.523 10-2.256zm-10-3.409c-3.006 0-7.588-.523-10-2.256v2.434c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.434c-2.418 1.738-7.005 2.256-10 2.256zm0-14.646c-5.344 0-10 1.562-10 3.488s4.656 3.487 10 3.487c5.345 0 10-1.562 10-3.487 0-1.926-4.655-3.488-10-3.488zm0 8.975c-3.006 0-7.588-.523-10-2.256v2.44c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.44c-2.418 1.738-7.005 2.256-10 2.256z\"\r\n                        style=\"fill: rgb(70, 120, 255);\" />\r\n                </svg>\r\n                DD.BB\r\n            </button>\r\n            <button *ngIf=\"!auth.isDev()\" class=\"dropdown-item\" [routerLink]=\"['/users']\">\r\n                <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\">\r\n                    <g>\r\n                        <g>\r\n                            <path d=\"M337.118,269.871c25.13,19.968,45.376,48.935,57.969,83.351c66.033-3.371,112.442-19.337,112.442-19.337    c0-61.853-25.654-116.077-64.162-146.426c-16.932,20.482-42.531,33.537-71.18,33.537c-8.823,0-17.355-1.242-25.436-3.554    c0.387,3.415,0.593,6.884,0.593,10.402C347.345,242.999,343.651,257.29,337.118,269.871z\"\r\n                                style=\"fill: rgb(70, 120, 255);\" />\r\n                            <path d=\"M174.883,269.871c-6.532-12.581-10.227-26.872-10.227-42.027c0-3.51,0.205-6.971,0.59-10.378    c-7.717,2.093-15.833,3.218-24.213,3.218c-28.649,0-54.25-13.055-71.181-33.537C31.344,217.495,5.69,271.719,5.69,333.572    c0,0,44.998,16.175,111.316,19.4C129.605,318.666,149.814,289.791,174.883,269.871z\"\r\n                                style=\"fill: rgb(70, 120, 255);\" />\r\n                        </g>\r\n                        <path d=\"M391.343,433.041c0-61.853-25.654-116.077-64.162-146.426c-16.932,20.482-42.531,33.537-71.18,33.537   c-28.649,0-54.25-13.055-71.181-33.537c-38.508,30.349-64.163,84.573-64.163,146.426c0,0,55.51,19.959,134.096,19.959   S391.343,433.041,391.343,433.041z\"\r\n                            style=\"fill: rgb(70, 120, 255);\" />\r\n                        <circle cx=\"256.001\" cy=\"227.844\" r=\"74.844\" style=\"fill: rgb(70, 120, 255);\" />\r\n                        <path d=\"M372.188,53.844c-41.336,0-74.845,33.508-74.845,74.844c0,6.554,0.849,12.909,2.431,18.967   c19.537,10.687,34.737,28.307,42.3,49.551c9.217,4.057,19.397,6.325,30.114,6.325c41.334,0,74.844-33.508,74.844-74.844   S413.522,53.844,372.188,53.844z\"\r\n                            style=\"fill: rgb(70, 120, 255);\" />\r\n                        <path d=\"M213.452,147.323c1.579-6.053,2.425-12.401,2.425-18.948c0-41.336-33.51-74.844-74.844-74.844   c-41.336,0-74.845,33.508-74.845,74.844s33.509,74.844,74.845,74.844c10.484,0,20.461-2.164,29.52-6.057   C178.2,175.716,193.632,157.968,213.452,147.323z\"\r\n                            style=\"fill: rgb(70, 120, 255);\" />\r\n                    </g>\r\n                </svg>\r\n                Users\r\n            </button>\r\n            <button *ngIf=\"auth.isAdmin()\" class=\"dropdown-item\" [routerLink]=\"['/arachni']\">\r\n                <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n                    width=\"32\" height=\"44\" viewBox=\"0 0 592.574 592.573\" style=\"enable-background:new 0 0 592.574 592.573;\" xml:space=\"preserve\">\r\n                    <path style=\"fill: rgb(70, 120, 255);\" d=\"M261.98,298.023l-6.597-0.054c-2.252,0-4.227,1.041-5.431,2.824l-9.359,8.89c-0.824,0.783-1.424,1.73-1.759,2.75\r\n\t\t\tl-27.229,22.154c-3.48-2.443-7.499-3.599-12.399-3.599c-1.828,0-3.802,0.147-6.406,0.481c-17.107,2.199-31.245,1.343-44.684-2.664\r\n\t\t\tc-1.028-0.306-5.255-1.823-10.147-3.586c-23.668-8.503-30.792-10.828-33.129-10.828c-1.713,0-3.484,1.142-4.076,2.758\r\n\t\t\tl-0.595,1.624c-0.372,1.02-0.318,2.146,0.143,3.133s1.297,1.742,2.321,2.109l33.771,12.032c-0.408,2.559,0.249,4.509,1.04,5.854\r\n\t\t\tc2.668,4.513,9.058,6.528,20.718,6.528c0.698,0,1.383-0.008,2.061-0.021c0.339,0.09,0.673,0.155,1.012,0.191\r\n\t\t\tc2.709,0.273,5.451,0.135,8.205-0.008c4.537-0.24,9.225-0.114,13.88-0.028c6.067,0.122,11.758,0.249,18.47-0.045\r\n\t\t\tc6.818-0.302,14.423-0.637,21.261-5.186c-1.853,2.362-3.656,4.725-5.414,7.038c-2.293,3.011-4.558,5.985-6.826,8.812\r\n\t\t\tc-10.167,12.677-18.768,24.333-26.292,35.627c-1.224,1.84-2.366,3.908-3.468,5.907c-1.824,3.309-3.709,6.724-5.871,8.919\r\n\t\t\tc-0.804,0.812-1.812,1.461-2.881,2.15c-2.529,1.632-5.989,3.868-7.107,9.09c-1.342,6.268,1.754,11.971,4.239,16.549\r\n\t\t\tc0.661,1.22,1.31,2.403,1.84,3.558c1.844,3.99,3.606,8.033,5.369,12.073c1.228,2.818,2.46,5.643,3.717,8.441l8.479,18.886\r\n\t\t\tc4.582,10.2,9.16,20.396,13.725,30.604c1.403,3.138,2.681,6.622,4.035,10.31c3.627,9.895,7.735,21.106,15.639,27.948\r\n\t\t\tc17.34,15.015,35.61,29.335,54.312,42.575c1.755,1.244,4.174,0.905,5.524-0.764c1.354-1.672,1.179-4.108-0.4-5.564\r\n\t\t\tc-5.288-4.884-11.118-9.278-16.756-13.525c-3.044-2.293-6.083-4.582-9.025-6.94c-8.723-6.993-12.909-12.325-18.78-20.375\r\n\t\t\tc0.016-0.037,0.037-0.069,0.053-0.103c0.506-1.023,0.559-2.211,0.146-3.28c-1.481-3.822-2.938-7.634-4.394-11.444\r\n\t\t\tc-6.744-17.646-13.717-35.896-22.485-53.432c-5.887-11.774-11.697-23.859-17.312-35.549c-2.162-4.496-4.321-8.992-6.491-13.484\r\n\t\t\tc2.942-12.664,10.849-24.17,17.85-34.361c5.732-8.353,12.13-16.528,18.311-24.436l3.178-4.076c1.29-1.648,2.595-3.292,3.913-4.929\r\n\t\t\tc-3.929,18.54-0.747,35.541,9.499,50.604c7.168,10.539,17.968,17.81,32.101,21.607c8.042,2.158,16.092,3.252,23.929,3.252\r\n\t\t\tl0.833-0.004l0.922,0.004c7.838,0,15.892-1.094,23.93-3.252c14.133-3.798,24.933-11.068,32.105-21.607\r\n\t\t\tc10.24-15.063,13.427-32.064,9.494-50.604c1.321,1.637,2.627,3.28,3.912,4.929l3.183,4.076\r\n\t\t\tc6.182,7.907,12.579,16.083,18.312,24.436c7.001,10.191,14.908,21.697,17.85,34.361c-2.171,4.492-4.333,8.988-6.491,13.484\r\n\t\t\tc-5.614,11.689-11.424,23.774-17.312,35.549c-8.768,17.536-15.74,35.786-22.484,53.432c-1.453,3.811-2.913,7.622-4.395,11.444\r\n\t\t\tc-0.412,1.069-0.359,2.257,0.146,3.28c0.017,0.037,0.033,0.069,0.054,0.103c-5.871,8.05-10.058,13.382-18.78,20.375\r\n\t\t\tc-2.942,2.358-5.981,4.647-9.025,6.94c-5.639,4.247-11.469,8.642-16.757,13.525c-1.578,1.456-1.754,3.893-0.399,5.564\r\n\t\t\tc0.804,0.988,1.979,1.51,3.17,1.51c0.816,0,1.641-0.244,2.354-0.75c18.698-13.236,36.973-27.561,54.312-42.575\r\n\t\t\tc7.899-6.842,12.012-18.054,15.639-27.948c1.354-3.688,2.632-7.177,4.035-10.31c4.562-10.209,9.144-20.404,13.722-30.604\r\n\t\t\tl8.478-18.887c1.257-2.803,2.485-5.622,3.718-8.441c1.762-4.039,3.524-8.082,5.369-12.072c0.53-1.154,1.179-2.338,1.84-3.558\r\n\t\t\tc2.484-4.578,5.577-10.282,4.239-16.549c-1.114-5.218-4.578-7.454-7.107-9.09c-1.069-0.689-2.077-1.339-2.877-2.15\r\n\t\t\tc-2.166-2.191-4.051-5.61-5.871-8.919c-1.102-1.999-2.239-4.067-3.468-5.908c-7.523-11.297-16.124-22.949-26.291-35.626\r\n\t\t\tc-2.269-2.828-4.533-5.802-6.826-8.813c-1.759-2.309-3.562-4.676-5.414-7.042c6.842,4.554,14.483,4.888,21.555,5.202\r\n\t\t\tc6.046,0.266,12.109,0.155,18.176,0.033c4.603-0.086,9.229-0.213,13.881,0.028c2.75,0.143,5.459,0.285,8.229,0.004\r\n\t\t\tc0.33-0.032,0.656-0.094,0.987-0.188c0.677,0.012,1.362,0.021,2.06,0.021c11.661,0,18.051-2.012,20.719-6.528\r\n\t\t\tc0.796-1.342,1.448-3.297,1.04-5.854l33.771-12.032c1.024-0.367,1.86-1.122,2.321-2.109s0.515-2.113,0.143-3.133l-0.596-1.633\r\n\t\t\tc-0.587-1.607-2.357-2.75-4.071-2.75c-2.334,0-9.453,2.326-33.122,10.829c-4.896,1.758-9.122,3.28-10.15,3.586\r\n\t\t\tc-13.448,4.007-27.568,4.863-44.688,2.664c-2.603-0.334-4.578-0.481-6.405-0.481c-4.9,0-8.919,1.155-12.399,3.599l-27.229-22.154\r\n\t\t\tc-0.339-1.02-0.935-1.967-1.763-2.754l-9.359-8.887c-1.208-1.787-3.187-2.823-5.496-2.823l-6.532,0.054v-0.054\r\n\t\t\tc-0.053-2.733-0.102-5.462-0.176-8.192l1.71-0.416c1.175-0.216,2.559-0.535,3.917-1.249l1.946-1.02\r\n\t\t\tc23.48-12.342,47.756-25.104,71.51-37.912c4.88-2.627,9.56-5.646,14.093-8.576c1.261,0.062,2.525-0.228,3.635-0.869\r\n\t\t\tc4.704-1.546,8.417-5.275,11.343-11.375c2.606-5.443,5.026-11.057,7.364-16.483c1.158-2.689,2.317-5.374,3.496-8.05\r\n\t\t\tc0.645-1.457,0.768-3.031,0.396-4.354c-0.123-2.974,7.258-13.88,10.032-17.984c1.562-2.31,2.881-4.268,3.615-5.533\r\n\t\t\tc8.515-14.7,8.482-28.927,8.445-43.986l-0.004-3.125c0-1.081-0.796-2.117-1.562-2.884c-0.768-0.767-2.171-1.191-3.252-1.191\r\n\t\t\tc-4.022,0-4.149,1.424-5.382,15.043c-0.265,2.921-0.592,6.552-0.705,7.177c-0.996,4.104-3.044,7.581-5.419,11.616l-1.31,2.24\r\n\t\t\tc-3.039,5.267-6.405,10.62-9.972,16.283c-10.433,16.573-21.216,33.705-25.691,51.714c-2.154,1.31-8.222,3.814-10.653,4.818\r\n\t\t\tc-1.767,0.726-3.17,1.313-3.777,1.616l-53.032,26.508c1.95-2.534,3.9-5.166,5.74-7.846c6.182-9,12.277-18.262,18.169-27.213\r\n\t\t\tc5.059-7.691,10.122-15.382,15.291-22.999c2.293-3.382,5.5-6.993,8.891-10.816c10.727-12.089,24.076-27.128,15.178-44.692\r\n\t\t\tc-0.216-0.429-0.478-0.833-0.767-1.195c-0.18-1.477-0.404-2.828-0.674-4.097c-3.758-17.65-8.005-36.467-12.982-57.52\r\n\t\t\tc1.036-19.809-9.498-34.876-19.686-49.446l-0.474-0.677c-5.549-7.932-11.229-15.773-16.924-23.64l-7.185-9.938\r\n\t\t\tc-1.27-1.767-3.701-2.232-5.524-1.045c-1.824,1.175-2.407,3.579-1.322,5.463l6.858,11.856\r\n\t\t\tc5.402,9.323,10.796,18.633,16.055,28.021c1.102,1.966,2.313,3.929,3.529,5.892c0.763,1.236,1.526,2.468,2.265,3.708\r\n\t\t\tc0.208,0.514,0.51,1.037,0.987,1.706c2.252,3.99,3.488,7.05,4.007,9.922c4.835,26.749,8.992,54.101,13.007,80.552\r\n\t\t\tc1.073,7.05,2.142,14.101,3.228,21.146c-3.113,2.893-5.978,7.393-9.147,12.656c-1.053,1.746-1.983,3.305-2.767,4.39\r\n\t\t\tl-18.205,25.333c-12.468,17.369-24.912,34.758-37.258,52.208c-1.408,1.982-2.452,4.084-3.351,6.197\r\n\t\t\tc-1.33-3.472-3.459-6.687-7.082-9c-1.253-0.8-1.571-1.245-1.604-3.468c-0.144-10.131-7.716-17.312-17.222-15.712\r\n\t\t\tc-1.212,0.2-2.272,0.935-2.881,2.003c-0.607,1.073-0.702,2.354-0.253,3.5l2.623,6.728l-5.553-0.22l-5.214,0.22l2.624-6.728\r\n\t\t\tc0.444-1.146,0.351-2.432-0.253-3.5c-0.608-1.069-1.668-1.803-2.88-2.003c-9.494-1.607-17.079,5.582-17.222,15.712\r\n\t\t\tc-0.028,2.223-0.351,2.664-1.599,3.468c-3.627,2.313-5.757,5.524-7.087,9c-0.902-2.113-1.946-4.207-3.35-6.193\r\n\t\t\tc-12.346-17.454-24.791-34.843-37.259-52.212l-18.205-25.337c-0.779-1.085-1.713-2.64-2.766-4.386\r\n\t\t\tc-3.17-5.263-6.034-9.764-9.147-12.656c1.085-7.046,2.154-14.096,3.228-21.146c4.015-26.451,8.172-53.807,13.007-80.552\r\n\t\t\tc0.518-2.872,1.758-5.932,3.798-9.592c0.012-0.017,0.429-0.625,0.441-0.641c0.314-0.44,0.567-0.906,0.763-1.403\r\n\t\t\tc0.734-1.241,1.498-2.469,2.256-3.701c1.216-1.962,2.428-3.925,3.529-5.892c5.259-9.388,10.653-18.699,16.055-28.021l6.858-11.856\r\n\t\t\tc1.085-1.885,0.502-4.288-1.322-5.463c-1.824-1.179-4.251-0.718-5.524,1.045l-7.185,9.938\r\n\t\t\tc-5.696,7.866-11.379,15.708-16.924,23.64l-0.474,0.677c-10.192,14.57-20.726,29.637-19.686,49.446\r\n\t\t\tc-4.978,21.049-9.225,39.865-12.982,57.52c-0.269,1.269-0.494,2.62-0.673,4.097c-0.293,0.367-0.551,0.767-0.771,1.195\r\n\t\t\tc-8.898,17.564,4.451,32.603,15.178,44.692c3.395,3.827,6.597,7.434,8.89,10.816c5.169,7.617,10.233,15.308,15.292,22.999\r\n\t\t\tc5.892,8.952,11.987,18.213,18.168,27.213c1.84,2.681,3.79,5.312,5.74,7.846l-53.032-26.508c-0.604-0.298-2.011-0.89-3.774-1.616\r\n\t\t\tc-2.432-1.004-8.499-3.505-10.653-4.818c-4.476-18.009-15.259-35.137-25.692-51.714c-3.566-5.667-6.936-11.016-9.972-16.283\r\n\t\t\tl-1.31-2.24c-2.375-4.031-4.418-7.511-5.398-11.53c-0.134-0.706-0.461-4.337-0.726-7.258c-1.232-13.619-1.359-15.043-5.381-15.043\r\n\t\t\tl-0.734-0.004c-1.082,0-2.122,0.428-2.885,1.195s-1.195,1.803-1.195,2.885l-0.004,3.125c-0.037,15.06-0.073,29.291,8.446,43.987\r\n\t\t\tc0.734,1.269,2.048,3.223,3.615,5.532c2.779,4.104,10.155,15.01,10.074,17.789c-0.412,1.518-0.286,3.093,0.359,4.549\r\n\t\t\tc1.183,2.672,2.338,5.357,3.497,8.05c2.338,5.427,4.757,11.041,7.364,16.479c2.921,6.104,6.638,9.833,11.343,11.379\r\n\t\t\tc1.105,0.641,2.35,0.93,3.635,0.869c4.529,2.929,9.212,5.949,14.088,8.576c23.754,12.807,48.03,25.569,71.51,37.911l1.946,1.024\r\n\t\t\tc1.354,0.71,2.738,1.028,3.705,1.199l1.922,0.461c-0.074,2.726-0.123,5.455-0.176,8.188v0.058H261.98z\" />\r\n                </svg>\r\n                Arachni\r\n            </button>\r\n\r\n            <button class=\"dropdown-item\" [routerLink]=\"['/profile']\">\r\n                <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Capa_1\" x=\"0px\" y=\"0px\"\r\n                    viewBox=\"0 0 563.43 563.43\" xml:space=\"preserve\" width=\"24\" height=\"24\">\r\n                    <path d=\"M280.79,314.559c83.266,0,150.803-67.538,150.803-150.803S364.055,13.415,280.79,13.415S129.987,80.953,129.987,163.756  S197.524,314.559,280.79,314.559z M280.79,52.735c61.061,0,111.021,49.959,111.021,111.021S341.851,274.776,280.79,274.776  s-111.021-49.959-111.021-111.021S219.728,52.735,280.79,52.735z\"\r\n                        style=\"fill: rgb(70, 120, 255);\" />\r\n                    <path d=\"M19.891,550.015h523.648c11.102,0,19.891-8.789,19.891-19.891c0-104.082-84.653-189.198-189.198-189.198H189.198  C85.116,340.926,0,425.579,0,530.124C0,541.226,8.789,550.015,19.891,550.015z M189.198,380.708h185.034  c75.864,0,138.313,56.436,148.028,129.524H41.17C50.884,437.607,113.334,380.708,189.198,380.708z\"\r\n                        style=\"fill: rgb(70, 120, 255);\" />\r\n                </svg>\r\n                My Profile\r\n            </button>\r\n            <button class=\"dropdown-item\" *ngIf=\"auth.isAdmin()\" [routerLink]=\"['/console']\">\r\n                <svg height=\"24\" version=\"1.1\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\r\n                    <g transform=\"translate(0 -1028.4)\">\r\n                        <path d=\"m3 1030.4c-1.1046 0-2 0.9-2 2v7 2 7c0 1.1 0.8954 2 2 2h9 9c1.105 0 2-0.9 2-2v-7-2-7c0-1.1-0.895-2-2-2h-9-9z\" fill=\"#2c3e50\"\r\n                        />\r\n                        <path d=\"m3 1049.4c-1.1046 0-2-0.9-2-2v-7-2-3h22v3 2 7c0 1.1-0.895 2-2 2h-9-9z\" style=\"fill: rgb(70, 120, 255);\" />\r\n                        <path d=\"m4 1032.9v1.1l2 2.4-2 2.3v1.1l3-3.4-3-3.5z\" fill=\"#ecf0f1\" />\r\n                        <path d=\"m3 2c-1.1046 0-2 0.8954-2 2v7 2 3h22v-3-2-7c0-1.1046-0.895-2-2-2h-9-9z\" style=\"fill: rgb(70, 120, 255);\" transform=\"translate(0 1028.4)\"\r\n                        />\r\n                        <path d=\"m4 5.125v1.125l3 1.75-3 1.75v1.125l5-2.875-5-2.875zm5 4.875v1h5v-1h-5z\" fill=\"#ecf0f1\" transform=\"translate(0 1028.4)\"\r\n                        />\r\n                    </g>\r\n                </svg>\r\n                Console\r\n            </button>\r\n\r\n            <button class=\"dropdown-item\" (click)=\"signout()\">\r\n                <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\">\r\n                    <g>\r\n                        <g>\r\n                            <path d=\"M337.118,269.871c25.13,19.968,45.376,48.935,57.969,83.351c66.033-3.371,112.442-19.337,112.442-19.337    c0-61.853-25.654-116.077-64.162-146.426c-16.932,20.482-42.531,33.537-71.18,33.537c-8.823,0-17.355-1.242-25.436-3.554    c0.387,3.415,0.593,6.884,0.593,10.402C347.345,242.999,343.651,257.29,337.118,269.871z\"\r\n                                style=\"fill: rgb(70, 120, 255);\" />\r\n                            <path d=\"M174.883,269.871c-6.532-12.581-10.227-26.872-10.227-42.027c0-3.51,0.205-6.971,0.59-10.378    c-7.717,2.093-15.833,3.218-24.213,3.218c-28.649,0-54.25-13.055-71.181-33.537C31.344,217.495,5.69,271.719,5.69,333.572    c0,0,44.998,16.175,111.316,19.4C129.605,318.666,149.814,289.791,174.883,269.871z\"\r\n                                style=\"fill: rgb(70, 120, 255);\" />\r\n                        </g>\r\n                        <path d=\"M391.343,433.041c0-61.853-25.654-116.077-64.162-146.426c-16.932,20.482-42.531,33.537-71.18,33.537   c-28.649,0-54.25-13.055-71.181-33.537c-38.508,30.349-64.163,84.573-64.163,146.426c0,0,55.51,19.959,134.096,19.959   S391.343,433.041,391.343,433.041z\"\r\n                            style=\"fill: rgb(70, 120, 255);\" />\r\n                        <circle cx=\"256.001\" cy=\"227.844\" r=\"74.844\" style=\"fill: rgb(70, 120, 255);\" />\r\n                        <path d=\"M372.188,53.844c-41.336,0-74.845,33.508-74.845,74.844c0,6.554,0.849,12.909,2.431,18.967   c19.537,10.687,34.737,28.307,42.3,49.551c9.217,4.057,19.397,6.325,30.114,6.325c41.334,0,74.844-33.508,74.844-74.844   S413.522,53.844,372.188,53.844z\"\r\n                            style=\"fill: rgb(70, 120, 255);\" />\r\n                        <path d=\"M213.452,147.323c1.579-6.053,2.425-12.401,2.425-18.948c0-41.336-33.51-74.844-74.844-74.844   c-41.336,0-74.845,33.508-74.845,74.844s33.509,74.844,74.845,74.844c10.484,0,20.461-2.164,29.52-6.057   C178.2,175.716,193.632,157.968,213.452,147.323z\"\r\n                            style=\"fill: rgb(70, 120, 255);\" />\r\n                    </g>\r\n                </svg>\r\n                Sign Out\r\n            </button>\r\n        </div>\r\n    </div>\r\n    <div *ngIf=\"auth.isAuth()\" ngbDropdown class=\"d-inline-block\">\r\n        <button class=\"btn btn-outline-primary\" type=\"button\" id=\"dropdownWebProject\" (click)=\"fetchWebProjects()\" ngbDropdownToggle>\r\n            Actual Project: {{actual_project.name}}\r\n        </button>\r\n        <div *ngIf=\"auth.isAuth()\" ngbDropdownMenu aria-labelledby=\"dropdownWebProject\">\r\n\r\n            <button *ngFor=\"let proj of projects\" class=\"dropdown-item\" (click)=\"selectProject(proj)\">\r\n                {{proj.name}}\r\n            </button>\r\n        </div>\r\n    </div>\r\n    <a class=\"navbar-brand\" href=\"#\">WebWard</a>\r\n</nav>\r\n<div class=\"container-fluid w-100\">\r\n    <div class=\"row w-100\">\r\n\r\n        <main role=\"main\" class=\"ml-sm-auto col-xl pt-3 w-100\">\r\n            <div style=\"position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;\"\r\n                class=\"chartjs-size-monitor\">\r\n                <div class=\"chartjs-size-monitor-expand\" style=\"position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;\">\r\n                    <div style=\"position:absolute;width:1000000px;height:1000000px;left:0;top:0\"></div>\r\n                </div>\r\n                <div class=\"chartjs-size-monitor-shrink\" style=\"position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;\">\r\n                    <div style=\"position:absolute;width:200%;height:200%;left:0; top:0\"></div>\r\n                </div>\r\n            </div>\r\n            <router-outlet class=\"w-100\"></router-outlet>\r\n        </main>\r\n\r\n\r\n    </div>\r\n\r\n</div>\r\n<!--\r\n\r\n<nav class=\"d-none d-xl-block col-xl-auto bg-light sidebar\">\r\n            <div *ngIf=\"auth.isAuth()\" class=\"sidebar-sticky\">\r\n                <ul class=\"nav flex-column\">\r\n                    <li class=\"nav-item\">\r\n                        <a class=\"nav-link active\" [routerLink]=\"['/']\">\r\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"\r\n                                stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-home\">\r\n                                <path d=\"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>\r\n                                <polyline points=\"9 22 9 12 15 12 15 22\"></polyline>\r\n                            </svg>\r\n                            Dashboard\r\n                            <span class=\"sr-only\">(current)</span>\r\n                        </a>\r\n                    </li>\r\n                    <li class=\"nav-item\">\r\n                        <a class=\"nav-link\" [routerLink]=\"['/reports']\">\r\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"\r\n                                stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-bar-chart-2\">\r\n                                <line x1=\"18\" y1=\"20\" x2=\"18\" y2=\"10\"></line>\r\n                                <line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"4\"></line>\r\n                                <line x1=\"6\" y1=\"20\" x2=\"6\" y2=\"14\"></line>\r\n                            </svg>\r\n                            Reports\r\n                        </a>\r\n                    </li>\r\n                    <li class=\"nav-item\">\r\n\r\n                        <a class=\"nav-link\" [routerLink]=\"['/pipeline']\">\r\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Capa_1\" x=\"0px\" y=\"0px\"\r\n                                viewBox=\"0 0 512 512\" xml:space=\"preserve\" width=\"24\" height=\"24\">\r\n                                <g>\r\n                                    <rect x=\"28.7\" width=\"154.6\" height=\"45\" style=\"fill: rgb(70, 120, 255);\" />\r\n                                </g>\r\n                                <g>\r\n                                    <rect x=\"28.7\" y=\"467\" width=\"154.6\" height=\"45\" style=\"fill: rgb(70, 120, 255);\" />\r\n                                </g>\r\n                                <g>\r\n                                    <rect x=\"0\" y=\"75.043\" width=\"212\" height=\"63.2\" style=\"fill: rgb(70, 120, 255);\" />\r\n                                </g>\r\n                                <g>\r\n                                    <rect x=\"0\" y=\"373.757\" width=\"212\" height=\"63.2\" style=\"fill: rgb(70, 120, 255);\" />\r\n                                </g>\r\n                                <g>\r\n                                    <path d=\"M384.007,128.006c-49.826,0-93.089,28.621-114.224,70.283h-86.512V168.24H28.679v175.52h154.593V313.71h86.512    c21.135,41.663,64.398,70.283,114.224,70.283c70.576,0,127.994-57.418,127.994-127.994S454.583,128.006,384.007,128.006z     M286.014,256c0-48.934,36.054-89.604,82.992-96.845v52.749c-18.349,6.259-31.587,23.655-31.587,44.096    c0,3.1,0.311,6.129,0.892,9.061l-45.667,26.366C288.366,280.435,286.014,268.487,286.014,256z M384.007,353.993    c-30.813,0-58.346-14.3-76.322-36.607l45.655-26.359c8.201,7.189,18.93,11.562,30.667,11.562c11.737,0,22.466-4.372,30.667-11.562    l45.655,26.359C442.352,339.692,414.82,353.993,384.007,353.993z M429.703,265.061c0.581-2.932,0.892-5.961,0.892-9.061    c0-20.441-13.239-37.837-31.587-44.096v-52.749c46.939,7.241,82.992,47.911,82.992,96.845c0,12.488-2.352,24.434-6.629,35.428    L429.703,265.061z\"\r\n                                        style=\"fill: rgb(70, 120, 255);\" />\r\n                                </g>\r\n                            </svg>\r\n                            Pipelines\r\n                        </a>\r\n                    </li>\r\n                    <li *ngIf=\"!auth.isDev()\" class=\"nav-item\">\r\n                        <a class=\"nav-link\" [routerLink]=\"['/check']\">\r\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Capa_1\" x=\"0px\" y=\"0px\"\r\n                                viewBox=\"0 0 416 416\" style=\"enable-background:new 0 0 416 416;\" xml:space=\"preserve\" width=\"24\"\r\n                                height=\"24\">\r\n                                <polygon points=\"72.103,175.999 72.103,207.999 243.816,207.999 264.103,187.714 264.103,175.999   \" style=\"fill: rgb(70, 120, 255);\"\r\n                                />\r\n                                <polygon points=\"72.103,239.999 72.103,271.999 179.814,271.999 211.816,239.999   \" style=\"fill: rgb(70, 120, 255);\" />\r\n                                <rect x=\"72.104\" y=\"303.998\" width=\"96\" height=\"32\" style=\"fill: rgb(70, 120, 255);\" />\r\n                                <path d=\"M403.212,139.108l-22.628-22.627c-6.245-6.245-16.381-6.245-22.626,0c-6.03,6.03-11.568,11.568-16.877,16.877    l45.255,45.255c5.35-5.35,10.902-10.902,16.876-16.877C409.459,155.49,409.459,145.354,403.212,139.108z\"\r\n                                    style=\"fill: rgb(70, 120, 255);\" />\r\n                                <path d=\"M329.797,144.7c-57.43,57.431-74.356,74.298-145.694,145.638c0,27.687,0,21.687,0,45.662    c38.518-0.001,28.774,0.017,44.917-0.07c3.55-3.55,6.928-6.928,10.239-10.239l56.844-56.819V384h-256V96h32.002v32h191.998V96h32    v59.717l32-31.999V96c0-17.674-14.326-32-32-32h-44.424c-5.926-6.583-13.538-11.62-22.284-14.136    c-7.368-2.118-13.038-7.788-15.156-15.156C208.474,14.664,190.001,0,168.103,0c-21.898,0-40.37,14.664-46.136,34.707    c-2.121,7.376-7.805,13.039-15.181,15.164C98.048,52.389,90.444,57.421,84.524,64H40.103c-17.673,0-32,14.326-32,32v288    c0,17.673,14.327,32,32,32h256c17.674,0,32-14.327,32-32V236.885l46.95-46.93L329.797,144.7z M222.354,319.967    c-5.962,0.034-6.66,0.034-21.938,0.032L200.103,320v-8.958v-14.078l5.214-5.215l22.627,22.628L222.354,319.967z M168.308,31.999    c8.837,0,16,7.163,16,16c0,8.836-7.163,16-16,16s-16-7.164-16-16C152.308,39.162,159.472,31.999,168.308,31.999z\"\r\n                                    style=\"fill: rgb(70, 120, 255);\" />\r\n                            </svg>\r\n                            Scan checks\r\n                        </a>\r\n                    </li>\r\n                    <li *ngIf=\"!auth.isDev()\" class=\"nav-item\">\r\n                        <a class=\"nav-link\" [routerLink]=\"['/integrations']\">\r\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"\r\n                                stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-layers\">\r\n                                <polygon points=\"12 2 2 7 12 12 22 7 12 2\"></polygon>\r\n                                <polyline points=\"2 17 12 22 22 17\"></polyline>\r\n                                <polyline points=\"2 12 12 17 22 12\"></polyline>\r\n                            </svg>\r\n                            Integrations\r\n                        </a>\r\n                    </li>\r\n                    <li *ngIf=\"!auth.isDev()\" class=\"nav-item\">\r\n                        <a class=\"nav-link\" [routerLink]=\"['/containers']\">\r\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 512\" width=\"24\" height=\"24\">\r\n                                <path d=\"M349.9 236.3h-66.1v-59.4h66.1v59.4zm0-204.3h-66.1v60.7h66.1V32zm78.2 144.8H362v59.4h66.1v-59.4zm-156.3-72.1h-66.1v60.1h66.1v-60.1zm78.1 0h-66.1v60.1h66.1v-60.1zm276.8 100c-14.4-9.7-47.6-13.2-73.1-8.4-3.3-24-16.7-44.9-41.1-63.7l-14-9.3-9.3 14c-18.4 27.8-23.4 73.6-3.7 103.8-8.7 4.7-25.8 11.1-48.4 10.7H2.4c-8.7 50.8 5.8 116.8 44 162.1 37.1 43.9 92.7 66.2 165.4 66.2 157.4 0 273.9-72.5 328.4-204.2 21.4.4 67.6.1 91.3-45.2 1.5-2.5 6.6-13.2 8.5-17.1l-13.3-8.9zm-511.1-27.9h-66v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm-78.1-72.1h-66.1v60.1h66.1v-60.1z\"\r\n                                    style=\"fill: rgb(70, 120, 255);\" />\r\n                            </svg>\r\n                            Containers\r\n                        </a>\r\n                    </li>\r\n                    <li *ngIf=\"!auth.isDev()\" class=\"nav-item\">\r\n                        <a class=\"nav-link\" [routerLink]=\"['/databases']\">\r\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\r\n                                <path d=\"M22 18.055v2.458c0 1.925-4.655 3.487-10 3.487-5.344 0-10-1.562-10-3.487v-2.458c2.418 1.738 7.005 2.256 10 2.256 3.006 0 7.588-.523 10-2.256zm-10-3.409c-3.006 0-7.588-.523-10-2.256v2.434c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.434c-2.418 1.738-7.005 2.256-10 2.256zm0-14.646c-5.344 0-10 1.562-10 3.488s4.656 3.487 10 3.487c5.345 0 10-1.562 10-3.487 0-1.926-4.655-3.488-10-3.488zm0 8.975c-3.006 0-7.588-.523-10-2.256v2.44c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.44c-2.418 1.738-7.005 2.256-10 2.256z\"\r\n                                    style=\"fill: rgb(70, 120, 255);\" />\r\n                            </svg>\r\n                            DD.BB\r\n                        </a>\r\n                    </li>\r\n                    <li *ngIf=\"!auth.isDev()\" class=\"nav-item\">\r\n                        <a class=\"nav-link\" [routerLink]=\"['/users']\">\r\n                            <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\">\r\n                                <g>\r\n                                    <g>\r\n                                        <path d=\"M337.118,269.871c25.13,19.968,45.376,48.935,57.969,83.351c66.033-3.371,112.442-19.337,112.442-19.337    c0-61.853-25.654-116.077-64.162-146.426c-16.932,20.482-42.531,33.537-71.18,33.537c-8.823,0-17.355-1.242-25.436-3.554    c0.387,3.415,0.593,6.884,0.593,10.402C347.345,242.999,343.651,257.29,337.118,269.871z\"\r\n                                            style=\"fill: rgb(70, 120, 255);\" />\r\n                                        <path d=\"M174.883,269.871c-6.532-12.581-10.227-26.872-10.227-42.027c0-3.51,0.205-6.971,0.59-10.378    c-7.717,2.093-15.833,3.218-24.213,3.218c-28.649,0-54.25-13.055-71.181-33.537C31.344,217.495,5.69,271.719,5.69,333.572    c0,0,44.998,16.175,111.316,19.4C129.605,318.666,149.814,289.791,174.883,269.871z\"\r\n                                            style=\"fill: rgb(70, 120, 255);\" />\r\n                                    </g>\r\n                                    <path d=\"M391.343,433.041c0-61.853-25.654-116.077-64.162-146.426c-16.932,20.482-42.531,33.537-71.18,33.537   c-28.649,0-54.25-13.055-71.181-33.537c-38.508,30.349-64.163,84.573-64.163,146.426c0,0,55.51,19.959,134.096,19.959   S391.343,433.041,391.343,433.041z\"\r\n                                        style=\"fill: rgb(70, 120, 255);\" />\r\n                                    <circle cx=\"256.001\" cy=\"227.844\" r=\"74.844\" style=\"fill: rgb(70, 120, 255);\" />\r\n                                    <path d=\"M372.188,53.844c-41.336,0-74.845,33.508-74.845,74.844c0,6.554,0.849,12.909,2.431,18.967   c19.537,10.687,34.737,28.307,42.3,49.551c9.217,4.057,19.397,6.325,30.114,6.325c41.334,0,74.844-33.508,74.844-74.844   S413.522,53.844,372.188,53.844z\"\r\n                                        style=\"fill: rgb(70, 120, 255);\" />\r\n                                    <path d=\"M213.452,147.323c1.579-6.053,2.425-12.401,2.425-18.948c0-41.336-33.51-74.844-74.844-74.844   c-41.336,0-74.845,33.508-74.845,74.844s33.509,74.844,74.845,74.844c10.484,0,20.461-2.164,29.52-6.057   C178.2,175.716,193.632,157.968,213.452,147.323z\"\r\n                                        style=\"fill: rgb(70, 120, 255);\" />\r\n                                </g>\r\n                            </svg>\r\n                            Users\r\n                        </a>\r\n                    </li>\r\n                    <li class=\"nav-item active\">\r\n                        <a class=\"nav-link\" [routerLink]=\"['/profile']\">\r\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Capa_1\" x=\"0px\" y=\"0px\"\r\n                                viewBox=\"0 0 563.43 563.43\" xml:space=\"preserve\" width=\"24\" height=\"24\">\r\n                                <path d=\"M280.79,314.559c83.266,0,150.803-67.538,150.803-150.803S364.055,13.415,280.79,13.415S129.987,80.953,129.987,163.756  S197.524,314.559,280.79,314.559z M280.79,52.735c61.061,0,111.021,49.959,111.021,111.021S341.851,274.776,280.79,274.776  s-111.021-49.959-111.021-111.021S219.728,52.735,280.79,52.735z\"\r\n                                    style=\"fill: rgb(70, 120, 255);\" />\r\n                                <path d=\"M19.891,550.015h523.648c11.102,0,19.891-8.789,19.891-19.891c0-104.082-84.653-189.198-189.198-189.198H189.198  C85.116,340.926,0,425.579,0,530.124C0,541.226,8.789,550.015,19.891,550.015z M189.198,380.708h185.034  c75.864,0,138.313,56.436,148.028,129.524H41.17C50.884,437.607,113.334,380.708,189.198,380.708z\"\r\n                                    style=\"fill: rgb(70, 120, 255);\" />\r\n                            </svg>\r\n                            My Profile\r\n                        </a>\r\n                    </li>\r\n                    <li *ngIf=\"auth.isAdmin()\" class=\"nav-item active\">\r\n                        <a class=\"nav-link\" [routerLink]=\"['/console']\">\r\n                            <svg height=\"24\" version=\"1.1\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\r\n                                <g transform=\"translate(0 -1028.4)\">\r\n                                    <path d=\"m3 1030.4c-1.1046 0-2 0.9-2 2v7 2 7c0 1.1 0.8954 2 2 2h9 9c1.105 0 2-0.9 2-2v-7-2-7c0-1.1-0.895-2-2-2h-9-9z\" fill=\"#2c3e50\"\r\n                                    />\r\n                                    <path d=\"m3 1049.4c-1.1046 0-2-0.9-2-2v-7-2-3h22v3 2 7c0 1.1-0.895 2-2 2h-9-9z\" style=\"fill: rgb(70, 120, 255);\" />\r\n                                    <path d=\"m4 1032.9v1.1l2 2.4-2 2.3v1.1l3-3.4-3-3.5z\" fill=\"#ecf0f1\" />\r\n                                    <path d=\"m3 2c-1.1046 0-2 0.8954-2 2v7 2 3h22v-3-2-7c0-1.1046-0.895-2-2-2h-9-9z\" style=\"fill: rgb(70, 120, 255);\" transform=\"translate(0 1028.4)\"\r\n                                    />\r\n                                    <path d=\"m4 5.125v1.125l3 1.75-3 1.75v1.125l5-2.875-5-2.875zm5 4.875v1h5v-1h-5z\" fill=\"#ecf0f1\" transform=\"translate(0 1028.4)\"\r\n                                    />\r\n                                </g>\r\n                            </svg>\r\n                            Console\r\n                        </a>\r\n                    </li>\r\n                    <li *ngIf=\"auth.isAuth()\" class=\"nav-item active\">\r\n                        <a class=\"nav-link\" href=\"#\" (click)=\"signout()\">Sign out</a>\r\n                    </li>\r\n\r\n                </ul>\r\n            </div>\r\n        </nav>\r\n\r\n-->"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__web_project_index__ = __webpack_require__("./src/app/web-project/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = /** @class */ (function () {
    function AppComponent(appSettings, auth, alerts, webProjServ) {
        this.appSettings = appSettings;
        this.auth = auth;
        this.alerts = alerts;
        this.webProjServ = webProjServ;
        this.title = 'WebWard';
        this.actual_project = new __WEBPACK_IMPORTED_MODULE_3__web_project_index__["a" /* WebProject */]();
        this.projects = [];
    }
    AppComponent.prototype.signout = function () {
        this.auth.signOut();
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (window.location.hostname !== 'localhost')
            this.appSettings.API_ENDPOINT = window.location.origin + '/api/';
        this.fetchWebProjects();
        this.webProjServ.subscribeToWebProjects().subscribe(function (data) {
            _this.fetchWebProjects();
        }, function (err) { });
    };
    AppComponent.prototype.selectProject = function (proj) {
        this.webProjServ.setActualProject(proj);
        this.actual_project = proj;
    };
    AppComponent.prototype.fetchWebProjects = function () {
        var _this = this;
        this.webProjServ.getWebProjects(false).subscribe(function (data) {
            _this.projects = data;
            _this.actual_project = _this.webProjServ.getActualProject();
        }, function (err) { });
    };
    AppComponent.prototype.setAPIRoute = function () {
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__app_settings_service__["a" /* AppSettingsService */],
            __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_3__web_project_index__["f" /* WebProjectService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__swimlane_ngx_charts__ = __webpack_require__("./node_modules/@swimlane/ngx-charts/release/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__swimlane_ngx_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__swimlane_ngx_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_routing_module__ = __webpack_require__("./src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__signin_signin_component__ = __webpack_require__("./src/app/signin/signin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dashboard_dashboard_component__ = __webpack_require__("./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__alert_alert_component__ = __webpack_require__("./src/app/alert/alert.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__page_not_found_page_not_found_component__ = __webpack_require__("./src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__environment_environment_component__ = __webpack_require__("./src/app/environment/environment.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__environment_environment_service__ = __webpack_require__("./src/app/environment/environment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__web_project_index__ = __webpack_require__("./src/app/web-project/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__user_management_index__ = __webpack_require__("./src/app/user-management/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__scan_profile_scan_profile_component__ = __webpack_require__("./src/app/scan-profile/scan-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__scan_profile_scan_profile_service__ = __webpack_require__("./src/app/scan-profile/scan-profile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__auth_auth_guard_service__ = __webpack_require__("./src/app/auth/auth-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__auth_auth_admin_service__ = __webpack_require__("./src/app/auth/auth-admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__auth_auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__auth_auth_nologin_service__ = __webpack_require__("./src/app/auth/auth-nologin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__auth_auth_interceptor__ = __webpack_require__("./src/app/auth/auth.interceptor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pipeline_index__ = __webpack_require__("./src/app/pipeline/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__web_ward_console_web_ward_console_component__ = __webpack_require__("./src/app/web-ward-console/web-ward-console.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__user_management_my_profile_my_profile_component__ = __webpack_require__("./src/app/user-management/my-profile/my-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__user_management_user_profile_user_profile_component__ = __webpack_require__("./src/app/user-management/user-profile/user-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__webhook_index__ = __webpack_require__("./src/app/webhook/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__types_types_module__ = __webpack_require__("./src/app/types/types.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__wwmodules_wwmodules_component__ = __webpack_require__("./src/app/wwmodules/wwmodules.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__wwmodules_wwmodules_service__ = __webpack_require__("./src/app/wwmodules/wwmodules.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__infrastructure_infrastructure_component__ = __webpack_require__("./src/app/infrastructure/infrastructure.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__infrastructure_infrastructure_edit_infrastructure_edit_component__ = __webpack_require__("./src/app/infrastructure/infrastructure-edit/infrastructure-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__infrastructure_infrastructure_new_infrastructure_new_component__ = __webpack_require__("./src/app/infrastructure/infrastructure-new/infrastructure-new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__infrastructure_infrastructure_service__ = __webpack_require__("./src/app/infrastructure/infrastructure.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__infrastructure_infrastructure_infrastructure_component__ = __webpack_require__("./src/app/infrastructure/infrastructure/infrastructure.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__dashboard_reports_reports_component__ = __webpack_require__("./src/app/dashboard/reports/reports.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__scan_report_scan_report_component__ = __webpack_require__("./src/app/scan-report/scan-report.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__scan_report_reports_service__ = __webpack_require__("./src/app/scan-report/reports.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__scan_report_view_view_component__ = __webpack_require__("./src/app/scan-report/view/view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__scan_report_chart_chart_component__ = __webpack_require__("./src/app/scan-report/chart/chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__scan_report_full_view_full_view_component__ = __webpack_require__("./src/app/scan-report/full-view/full-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__arachni_arachni_component__ = __webpack_require__("./src/app/arachni/arachni.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__scan_profile_new_profile_new_profile_component__ = __webpack_require__("./src/app/scan-profile/new-profile/new-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__scan_profile_edit_profile_edit_profile_component__ = __webpack_require__("./src/app/scan-profile/edit-profile/edit-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__wwmodules_edit_module_edit_module_component__ = __webpack_require__("./src/app/wwmodules/edit-module/edit-module.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__wwmodules_new_module_new_module_component__ = __webpack_require__("./src/app/wwmodules/new-module/new-module.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__arachni_view_view_component__ = __webpack_require__("./src/app/arachni/view/view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__arachni_arachni_service__ = __webpack_require__("./src/app/arachni/arachni.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pipeline_contextual_menu_contextual_menu_component__ = __webpack_require__("./src/app/pipeline/contextual-menu/contextual-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__pipeline_contextual_directive__ = __webpack_require__("./src/app/pipeline/contextual.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__threat_model_threat_model_component__ = __webpack_require__("./src/app/threat-model/threat-model.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__scan_report_chart_temporal_chart_temporal_component__ = __webpack_require__("./src/app/scan-report/chart-temporal/chart-temporal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__threat_model_report_report_component__ = __webpack_require__("./src/app/threat-model/report/report.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__threat_model_view_view_component__ = __webpack_require__("./src/app/threat-model/view/view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__threat_model_edit_edit_component__ = __webpack_require__("./src/app/threat-model/edit/edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__threat_model_threat_model_service__ = __webpack_require__("./src/app/threat-model/threat-model.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__threat_model_new_new_component__ = __webpack_require__("./src/app/threat-model/new/new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__scan_report_full_view_wappalyzer_full_view_wappalyzer_component__ = __webpack_require__("./src/app/scan-report/full-view-wappalyzer/full-view-wappalyzer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__scan_report_full_view_arachni_full_view_arachni_component__ = __webpack_require__("./src/app/scan-report/full-view-arachni/full-view-arachni.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__scan_report_wappa_cat_pipe__ = __webpack_require__("./src/app/scan-report/wappa-cat.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__safe_dom_pipe__ = __webpack_require__("./src/app/safe-dom.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__database_database_component__ = __webpack_require__("./src/app/database/database.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















//----------WebProjects-------------

//---------- User Management --------------

//----------- SCANS --------------------


//-----------AUTH---------------





//-------------PIPELINE-------------




//-------------WEBHOOKS--------------------

//---------------NODE ATTRIBUYTE TYPES-------------------------




//Infrastructure





//REPORTS



























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_9__signin_signin_component__["a" /* SigninComponent */],
                __WEBPACK_IMPORTED_MODULE_10__dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_13__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */],
                __WEBPACK_IMPORTED_MODULE_11__alert_alert_component__["a" /* AlertComponent */],
                __WEBPACK_IMPORTED_MODULE_14__environment_environment_component__["a" /* EnvironmentComponent */],
                //--------------------------WEB PROJECT
                __WEBPACK_IMPORTED_MODULE_16__web_project_index__["b" /* WebProjectComponent */],
                __WEBPACK_IMPORTED_MODULE_16__web_project_index__["d" /* WebProjectNewComponent */],
                __WEBPACK_IMPORTED_MODULE_16__web_project_index__["g" /* WebProjectUserComponent */],
                __WEBPACK_IMPORTED_MODULE_16__web_project_index__["h" /* WebProjectViewComponent */],
                __WEBPACK_IMPORTED_MODULE_16__web_project_index__["c" /* WebProjectEditComponent */],
                __WEBPACK_IMPORTED_MODULE_16__web_project_index__["e" /* WebProjectPageComponent */],
                //-------------------------SCAN PROFILE
                __WEBPACK_IMPORTED_MODULE_18__scan_profile_scan_profile_component__["a" /* ScanProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_46__scan_profile_new_profile_new_profile_component__["a" /* NewProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_47__scan_profile_edit_profile_edit_profile_component__["a" /* EditProfileComponent */],
                //------------------------ USERS
                __WEBPACK_IMPORTED_MODULE_17__user_management_index__["b" /* UserManagementComponent */],
                __WEBPACK_IMPORTED_MODULE_17__user_management_index__["a" /* UserEditComponent */],
                __WEBPACK_IMPORTED_MODULE_17__user_management_index__["c" /* UserNewComponent */],
                __WEBPACK_IMPORTED_MODULE_17__user_management_index__["f" /* UserViewComponent */],
                __WEBPACK_IMPORTED_MODULE_28__user_management_user_profile_user_profile_component__["a" /* UserProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_27__user_management_my_profile_my_profile_component__["a" /* MyProfileComponent */],
                //-------------------------- CONSOLE
                __WEBPACK_IMPORTED_MODULE_26__web_ward_console_web_ward_console_component__["a" /* WebWardConsoleComponent */],
                //----------------------- PIPELINE
                __WEBPACK_IMPORTED_MODULE_25__pipeline_index__["f" /* PipelineComponent */],
                __WEBPACK_IMPORTED_MODULE_25__pipeline_index__["m" /* PipelineNodeComponent */],
                __WEBPACK_IMPORTED_MODULE_25__pipeline_index__["n" /* PipelineNodeEditComponent */],
                __WEBPACK_IMPORTED_MODULE_25__pipeline_index__["o" /* PipelineNodeNewComponent */],
                __WEBPACK_IMPORTED_MODULE_25__pipeline_index__["g" /* PipelineDirective */],
                __WEBPACK_IMPORTED_MODULE_25__pipeline_index__["h" /* PipelineEditComponent */],
                __WEBPACK_IMPORTED_MODULE_25__pipeline_index__["j" /* PipelineNewComponent */],
                __WEBPACK_IMPORTED_MODULE_25__pipeline_index__["c" /* NodeMoveDirective */],
                __WEBPACK_IMPORTED_MODULE_25__pipeline_index__["e" /* NodeResizeDirective */],
                __WEBPACK_IMPORTED_MODULE_25__pipeline_index__["d" /* NodePipeMeDirective */],
                __WEBPACK_IMPORTED_MODULE_25__pipeline_index__["b" /* NodeConnectorComponent */],
                __WEBPACK_IMPORTED_MODULE_52__pipeline_contextual_menu_contextual_menu_component__["a" /* ContextualMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_53__pipeline_contextual_directive__["a" /* ContextualDirective */],
                //---------------------- WEB HOOK
                __WEBPACK_IMPORTED_MODULE_29__webhook_index__["b" /* WebhookComponent */],
                __WEBPACK_IMPORTED_MODULE_29__webhook_index__["c" /* WebhookNewComponent */],
                //--------------------- WW Modules
                __WEBPACK_IMPORTED_MODULE_31__wwmodules_wwmodules_component__["a" /* WwmodulesComponent */],
                __WEBPACK_IMPORTED_MODULE_48__wwmodules_edit_module_edit_module_component__["a" /* EditModuleComponent */],
                __WEBPACK_IMPORTED_MODULE_49__wwmodules_new_module_new_module_component__["a" /* NewModuleComponent */],
                //--------------------- INFRASTRUCTURE
                __WEBPACK_IMPORTED_MODULE_34__infrastructure_infrastructure_component__["a" /* InfrastructureComponent */],
                __WEBPACK_IMPORTED_MODULE_35__infrastructure_infrastructure_edit_infrastructure_edit_component__["a" /* InfrastructureEditComponent */],
                __WEBPACK_IMPORTED_MODULE_36__infrastructure_infrastructure_new_infrastructure_new_component__["a" /* InfrastructureNewComponent */],
                __WEBPACK_IMPORTED_MODULE_38__infrastructure_infrastructure_infrastructure_component__["a" /* InfrastructureObjectComponent */],
                //----------------------- ARACHNI
                __WEBPACK_IMPORTED_MODULE_45__arachni_arachni_component__["a" /* ArachniComponent */],
                __WEBPACK_IMPORTED_MODULE_50__arachni_view_view_component__["a" /* ArachniViewComponent */],
                //----------------------- SCAN REPORT
                __WEBPACK_IMPORTED_MODULE_40__scan_report_scan_report_component__["a" /* ScanReportComponent */],
                __WEBPACK_IMPORTED_MODULE_39__dashboard_reports_reports_component__["a" /* ReportsComponent */],
                __WEBPACK_IMPORTED_MODULE_42__scan_report_view_view_component__["a" /* ViewReportComponent */],
                __WEBPACK_IMPORTED_MODULE_43__scan_report_chart_chart_component__["a" /* ScanReportChartComponent */],
                __WEBPACK_IMPORTED_MODULE_44__scan_report_full_view_full_view_component__["a" /* FullReportViewComponent */],
                __WEBPACK_IMPORTED_MODULE_55__scan_report_chart_temporal_chart_temporal_component__["a" /* ReportChartTemporalComponent */],
                //-------------------------------THREAT MODEL
                __WEBPACK_IMPORTED_MODULE_54__threat_model_threat_model_component__["a" /* ThreatModelComponent */],
                __WEBPACK_IMPORTED_MODULE_56__threat_model_report_report_component__["a" /* ThreatModelReportComponent */],
                __WEBPACK_IMPORTED_MODULE_57__threat_model_view_view_component__["a" /* ThreatModelViewComponent */],
                __WEBPACK_IMPORTED_MODULE_58__threat_model_edit_edit_component__["a" /* ThreatModelEditComponent */],
                __WEBPACK_IMPORTED_MODULE_60__threat_model_new_new_component__["a" /* ThreatModelNewComponent */],
                __WEBPACK_IMPORTED_MODULE_61__scan_report_full_view_wappalyzer_full_view_wappalyzer_component__["a" /* FullViewWappalyzerComponent */],
                __WEBPACK_IMPORTED_MODULE_62__scan_report_full_view_arachni_full_view_arachni_component__["a" /* FullViewArachniComponent */],
                __WEBPACK_IMPORTED_MODULE_63__scan_report_wappa_cat_pipe__["a" /* WappaCatPipe */],
                __WEBPACK_IMPORTED_MODULE_64__safe_dom_pipe__["a" /* SafeDomPipe */],
                __WEBPACK_IMPORTED_MODULE_65__database_database_component__["a" /* DatabaseComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["c" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_8__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_30__types_types_module__["a" /* TypesModule */],
                __WEBPACK_IMPORTED_MODULE_3__swimlane_ngx_charts__["NgxChartsModule"]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_16__web_project_index__["f" /* WebProjectService */],
                __WEBPACK_IMPORTED_MODULE_20__auth_auth_guard_service__["a" /* AuthGuardService */],
                __WEBPACK_IMPORTED_MODULE_21__auth_auth_admin_service__["a" /* AuthAdminService */],
                __WEBPACK_IMPORTED_MODULE_22__auth_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_23__auth_auth_nologin_service__["a" /* AuthNoLoginService */],
                __WEBPACK_IMPORTED_MODULE_12__alert_alert_service__["a" /* AlertService */],
                __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */],
                __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["a" /* NgbActiveModal */],
                __WEBPACK_IMPORTED_MODULE_17__user_management_index__["e" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_15__environment_environment_service__["a" /* EnvironmentService */],
                __WEBPACK_IMPORTED_MODULE_25__pipeline_index__["a" /* HosePipeService */],
                __WEBPACK_IMPORTED_MODULE_25__pipeline_index__["i" /* PipelineMouseService */],
                __WEBPACK_IMPORTED_MODULE_25__pipeline_index__["p" /* PipelineService */],
                __WEBPACK_IMPORTED_MODULE_29__webhook_index__["d" /* WebhookService */],
                __WEBPACK_IMPORTED_MODULE_19__scan_profile_scan_profile_service__["a" /* ScanProfileService */],
                __WEBPACK_IMPORTED_MODULE_33__app_settings_service__["a" /* AppSettingsService */],
                __WEBPACK_IMPORTED_MODULE_32__wwmodules_wwmodules_service__["a" /* WwmodulesService */],
                __WEBPACK_IMPORTED_MODULE_37__infrastructure_infrastructure_service__["a" /* InfrastructureService */],
                __WEBPACK_IMPORTED_MODULE_51__arachni_arachni_service__["a" /* ArachniService */],
                __WEBPACK_IMPORTED_MODULE_41__scan_report_reports_service__["a" /* ReportsService */],
                __WEBPACK_IMPORTED_MODULE_59__threat_model_threat_model_service__["a" /* ThreatModelService */],
                {
                    provide: __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                    useClass: __WEBPACK_IMPORTED_MODULE_24__auth_auth_interceptor__["a" /* TokenInterceptor */],
                    multi: true
                }
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_25__pipeline_index__["h" /* PipelineEditComponent */], __WEBPACK_IMPORTED_MODULE_25__pipeline_index__["n" /* PipelineNodeEditComponent */], __WEBPACK_IMPORTED_MODULE_52__pipeline_contextual_menu_contextual_menu_component__["a" /* ContextualMenuComponent */], __WEBPACK_IMPORTED_MODULE_43__scan_report_chart_chart_component__["a" /* ScanReportChartComponent */], __WEBPACK_IMPORTED_MODULE_55__scan_report_chart_temporal_chart_temporal_component__["a" /* ReportChartTemporalComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/arachni/arachni.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/arachni/arachni.component.html":
/***/ (function(module, exports) {

module.exports = "<div class='container'>\n  <div class=\"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom\">\n    <h4>List of Infrastructures</h4>\n    <div class=\"btn-toolbar mb-2 mb-md-0\">\n      <div class=\"btn-group mr-2\">\n        <div>\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"fetchReports()\">Refresh</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-12 col-md-6\">\n      <div class=\"list-group\">\n          <h5>Reports</h5>\n          <a *ngFor=\"let report of reports\" [class.active]=\"report === selectedReport\" (click)=\"onSelect(report)\" class=\"list-group-item\">\n              <span>{{report.id}} </span>\n          </a>\n      </div>\n      <hr/>\n    </div>\n    <div class=\"col-sm-12 col-md-6\">\n        <arachni-view [report]=\"selectedReport\"></arachni-view>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/arachni/arachni.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArachniComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__arachni_service__ = __webpack_require__("./src/app/arachni/arachni.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ArachniComponent = /** @class */ (function () {
    function ArachniComponent(arachService) {
        this.arachService = arachService;
    }
    ArachniComponent.prototype.ngOnInit = function () {
        this.fetchReports();
    };
    ArachniComponent.prototype.fetchReports = function () {
        var _this = this;
        this.arachService.getAllReportsREST().subscribe(function (data) {
            _this.reports = data;
        }, function (err) { });
    };
    ArachniComponent.prototype.onSelect = function (report) {
        this.selectedReport = report;
    };
    ArachniComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-arachni',
            template: __webpack_require__("./src/app/arachni/arachni.component.html"),
            styles: [__webpack_require__("./src/app/arachni/arachni.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__arachni_service__["a" /* ArachniService */]])
    ], ArachniComponent);
    return ArachniComponent;
}());



/***/ }),

/***/ "./src/app/arachni/arachni.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArachniService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ArachniService = /** @class */ (function () {
    function ArachniService(AppSettings, http) {
        var _this = this;
        this.AppSettings = AppSettings;
        this.http = http;
        this.pullerObserver = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.subscriber = observer;
        });
    }
    ArachniService.prototype.getAllReportsREST = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.get(_this.AppSettings.API_ENDPOINT + 'arachni/rest', { responseType: 'json' })
                .subscribe(function (data) {
                var keys = Object.keys(data);
                observer.next(keys.map(function (val, i, arr) {
                    return {
                        id: val,
                        content: {}
                    };
                }));
            }, function (err) {
                observer.error(err);
            });
        });
    };
    ArachniService.prototype.getReportREST = function (id) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.get(_this.AppSettings.API_ENDPOINT + 'arachni/rest/' + id, { responseType: 'json' })
                .subscribe(function (data) {
                observer.next({ id: id, content: data });
            }, function (err) {
                observer.error(err);
            });
        });
    };
    ArachniService.prototype.deleteReportREST = function (id) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.delete(_this.AppSettings.API_ENDPOINT + 'arachni/rest/' + id, { responseType: 'json' })
                .subscribe(function (data) {
                observer.next({ id: id, content: data });
            }, function (err) {
                observer.error(err);
            });
        });
    };
    ArachniService.prototype.subscribeToArachni = function () {
        return this.pullerObserver;
    };
    ArachniService.prototype.notify = function () {
        try {
            this.subscriber.next(true);
        }
        catch (err) { }
    };
    ArachniService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__app_settings_service__["a" /* AppSettingsService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */]])
    ], ArachniService);
    return ArachniService;
}());



/***/ }),

/***/ "./src/app/arachni/view/view.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/arachni/view/view.component.html":
/***/ (function(module, exports) {

module.exports = "<button type=\"button\" class=\"btn btn-primary\" (click)=\"deleteReport()\">Delete</button>\n<p *ngIf=\"_report\">\n  {{_report.id}}\n</p>\n<p>\n  {{_content}}\n</p>"

/***/ }),

/***/ "./src/app/arachni/view/view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArachniViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__arachni_service__ = __webpack_require__("./src/app/arachni/arachni.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ArachniViewComponent = /** @class */ (function () {
    function ArachniViewComponent(arachService) {
        this.arachService = arachService;
        this._content = "";
    }
    Object.defineProperty(ArachniViewComponent.prototype, "report", {
        get: function () {
            return this._report;
        },
        set: function (rep) {
            var _this = this;
            this._report = rep;
            this.arachService.getReportREST(rep.id).subscribe(function (dat) {
                Object.assign(_this._report, dat);
                _this._content = JSON.stringify(_this._report.content, null, '\t');
            }, function (err) {
                console.log(err);
            });
        },
        enumerable: true,
        configurable: true
    });
    ArachniViewComponent.prototype.ngOnInit = function () {
    };
    ArachniViewComponent.prototype.deleteReport = function () {
        this.arachService.deleteReportREST(this._report.id).subscribe(function () {
        }, function (err) { });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ArachniViewComponent.prototype, "report", null);
    ArachniViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'arachni-view',
            template: __webpack_require__("./src/app/arachni/view/view.component.html"),
            styles: [__webpack_require__("./src/app/arachni/view/view.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__arachni_service__["a" /* ArachniService */]])
    ], ArachniViewComponent);
    return ArachniViewComponent;
}());



/***/ }),

/***/ "./src/app/auth/auth-admin.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthAdminService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthAdminService = /** @class */ (function () {
    function AuthAdminService(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthAdminService.prototype.canActivate = function () {
        try {
            return this.auth.isAdmin();
        }
        catch (err) {
            return false;
        }
    };
    AuthAdminService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], AuthAdminService);
    return AuthAdminService;
}());



/***/ }),

/***/ "./src/app/auth/auth-guard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuardService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuardService.prototype.canActivate = function () {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    };
    AuthGuardService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], AuthGuardService);
    return AuthGuardService;
}());



/***/ }),

/***/ "./src/app/auth/auth-nologin.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthNoLoginService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Allow us to redirect from login to the main route if we are logged in.
 */
var AuthNoLoginService = /** @class */ (function () {
    function AuthNoLoginService(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthNoLoginService.prototype.canActivate = function () {
        if (this.auth.isAuthenticated()) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    };
    AuthNoLoginService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], AuthNoLoginService);
    return AuthNoLoginService;
}());



/***/ }),

/***/ "./src/app/auth/auth.interceptor.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/do.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(auth, alerts, AppSettings) {
        this.auth = auth;
        this.alerts = alerts;
        this.AppSettings = AppSettings;
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        var apiURL = new URL(this.AppSettings.API_ENDPOINT);
        var targetURL = new URL(request.url);
        if (apiURL.origin === targetURL.origin) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + this.auth.getToken()
                }
            });
        }
        return next.handle(request).do(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpResponse */]) {
            }
        }, function (err) {
            if (err instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpErrorResponse */]) {
                switch (err.status) {
                    case 0:
                        _this.alerts.clear();
                        _this.alerts.error("Server not responding", false);
                        break;
                    case 404:
                        _this.alerts.error("Not Found", false);
                        break;
                    case 401:
                        _this.alerts.clear();
                        _this.alerts.error("Unauthorized", false);
                        _this.auth.signOut();
                        break;
                }
            }
        });
    };
    TokenInterceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__["a" /* AlertService */], __WEBPACK_IMPORTED_MODULE_5__app_settings_service__["a" /* AppSettingsService */]])
    ], TokenInterceptor);
    return TokenInterceptor;
}());



/***/ }),

/***/ "./src/app/auth/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth0_angular_jwt__ = __webpack_require__("./node_modules/@auth0/angular-jwt/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AuthService = /** @class */ (function () {
    function AuthService(http, router, AppSettings) {
        this.http = http;
        this.router = router;
        this.AppSettings = AppSettings;
        this.helper = new __WEBPACK_IMPORTED_MODULE_3__auth0_angular_jwt__["a" /* JwtHelperService */]();
        this.myVar = true;
    }
    AuthService.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    AuthService.prototype.isAuthenticated = function () {
        var token = this.getToken();
        //this.http.get<any>(AppSettings.API_ENDPOINT + 'authenticate').toPromise();
        return !this.helper.isTokenExpired(token);
    };
    /**
     * Send auth
     */
    AuthService.prototype.signIn = function (username, password, remember) {
        var _this = this;
        if (remember === void 0) { remember = false; }
        return this.http.post(this.AppSettings.API_ENDPOINT + 'authenticate', { 'username': username, 'password': password, 'remember': remember }, { responseType: 'json' })
            .map(function (data) {
            // login successful if there's a jwt token in the response
            if (data && data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                _this.createToken(data.token);
                if (data.user && 'name' in data.user && 'id' in data.user && 'role' in data.user) {
                    _this.storeUser(data.user.name, data.user.id, data.user.role);
                }
            }
            return data.token;
        });
    };
    /**
     * Saves a token in the localstorage
     * @param token The token from the Server
     */
    AuthService.prototype.createToken = function (token) {
        localStorage.setItem('token', token);
    };
    /**
     * Saves simple User information like role, ID, name etc
     */
    AuthService.prototype.storeUser = function (userName, userID, userRole) {
        localStorage.setItem('userName', userName);
        localStorage.setItem('userID', userID);
        localStorage.setItem('userRole', userRole.toString());
    };
    AuthService.prototype.getUser = function () {
        var user = {
            id: localStorage.getItem('userID'),
            name: localStorage.getItem('userName'),
            role: parseInt(localStorage.getItem('userRole'))
        };
        return localStorage.getItem('userID') !== null ? user : null;
    };
    /**
     * Remove Auth token
     */
    AuthService.prototype.signOut = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userID');
        localStorage.removeItem('userRole');
        this.router.navigate(['login']);
    };
    AuthService.prototype.isDev = function () {
        var user = this.getUser();
        if (user === null || user.id === null) {
            return true;
        }
        else {
            return user.role == 0 ? true : false;
        }
    };
    AuthService.prototype.isAuth = function () {
        var user = this.getUser();
        if (user === null || user.id === null) {
            return false;
        }
        else {
            return true;
        }
    };
    AuthService.prototype.isAdmin = function () {
        try {
            if (parseInt(localStorage.getItem('userRole')) === 3) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            return false;
        }
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_5__app_settings_service__["a" /* AppSettingsService */]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom\">\n  <h1 class=\"h2\">Dashboard</h1>\n  <div class=\"btn-toolbar mb-2 mb-md-0\">\n    <div class=\"btn-group mr-2\">\n      <button class=\"btn btn-sm btn-outline-secondary\">Share</button>\n      <button class=\"btn btn-sm btn-outline-secondary\">Export</button>\n    </div>\n    <button class=\"btn btn-sm btn-outline-secondary dropdown-toggle\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"\n        stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-calendar\">\n        <rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\n        <line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"></line>\n        <line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"></line>\n        <line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"></line>\n      </svg>\n      This week\n    </button>\n  </div>\n</div>\n<reports-dashboard></reports-dashboard> "

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(auth) {
        this.auth = auth;
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__("./src/app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("./src/app/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/reports/reports.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dashboard/reports/reports.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-md-4\">\n    <div class=\"list-group\">\n      <h4>Last scan reports</h4>\n      <div *ngFor=\"let report of reports\" (click)=\"onSelect(report)\">\n        <a routerLink=\"/reports/{{report.id}}\" [class.active]=\"report === selectedReport\" class=\"list-group-item list-group-item-action flex-column align-items-start\">\n\n          <div class=\"d-flex w-100 justify-content-between\">\n            <h5 class=\"mb-1\">{{report.name}}</h5>\n            <small *ngIf=\"report.daysAgo === 0\">Today</small>\n            <small *ngIf=\"report.daysAgo != 0\">{{report.daysAgo}} days ago</small>\n          </div>\n          <p class=\"mb-1\">\n            For URL: {{report.data.url}} Total issues: {{report.data.issues.length}}\n          </p>\n          <small>Project: {{report.project}}</small>\n        </a>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-md-8\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h4 class=\"text-center\">% Vulnerabilities found</h4>\n        <scan-report-chart *ngIf=\"reports && selectedReport\" [report]=\"selectedReport\"></scan-report-chart>\n      </div>\n\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h4 class=\"text-center\">Vulnerabilities Evolution</h4>\n        <report-chart-temporal *ngIf=\"reports\" [reports]=\"reports\"></report-chart-temporal>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/dashboard/reports/reports.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scan_report_reports_service__ = __webpack_require__("./src/app/scan-report/reports.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scan_report_scan_report__ = __webpack_require__("./src/app/scan-report/scan-report.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__web_project__ = __webpack_require__("./src/app/web-project/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ReportsComponent = /** @class */ (function () {
    function ReportsComponent(reportService, projService) {
        this.reportService = reportService;
        this.projService = projService;
    }
    ReportsComponent.prototype.fetchData = function () {
        var _this = this;
        this.reportService.getReports().subscribe(function (data) {
            _this.reports = data.filter(function (val, i, arr) {
                if (val.reporter.toLowerCase() === 'arachni') {
                    return true;
                }
                return false;
            });
            if (data.length > 0)
                _this.selectReport(data[0]);
        }, function (err) {
            _this.reports = [];
            _this.selectedReport = null;
        });
    };
    ReportsComponent.prototype.onSelect = function (event) {
        this.selectReport(event);
    };
    ReportsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projService.subscribeToWebProjects().subscribe(function (data) {
            _this.fetchData();
        }, function (err) { });
        //Give time to get webprojects
        setTimeout(this.fetchData.bind(this), 700);
    };
    ReportsComponent.prototype.selectReport = function (report) {
        this.mapAllReports(report);
    };
    ReportsComponent.prototype.mapAllReports = function (report) {
        var auxReport = new __WEBPACK_IMPORTED_MODULE_2__scan_report_scan_report__["a" /* ScanReport */]();
        Object.assign(auxReport, report);
        auxReport.data = {};
        auxReport.data.issues = this.reports.reduce(function (total, val, i, arr) {
            if (val.data && val.data.issues) {
                total = total.concat(val.data.issues);
            }
            return total;
        }, []);
        this.selectedReport = auxReport;
    };
    ReportsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'reports-dashboard',
            template: __webpack_require__("./src/app/dashboard/reports/reports.component.html"),
            styles: [__webpack_require__("./src/app/dashboard/reports/reports.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__scan_report_reports_service__["a" /* ReportsService */], __WEBPACK_IMPORTED_MODULE_3__web_project__["f" /* WebProjectService */]])
    ], ReportsComponent);
    return ReportsComponent;
}());



/***/ }),

/***/ "./src/app/database/database.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/database/database.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <textarea #consoleHistory [scrollTop]=\"consoleHistory.scrollHeight\" class=\"form-control\" rows=\"20\" name=\"console\" [(ngModel)]=\"commandHistory\"></textarea>\n</div>\n<div class=\"row\">\n  <input type=\"text\" list=\"consoleList\" autocomplete=\"off\" class=\"col-10 form-control\" (keyup.enter)=\"send()\" name=\"name\" id=\"consoleInput\" placeholder=\"command\" [(ngModel)]=\"actualCommand\">\n  <datalist id=\"consoleList\">\n\n      <option *ngFor=\"let com of lastCommands\" [ngValue]=\"com\" value=\"{{com}}\">\n\n    </datalist>\n  <button type=\"submit\" class=\"col-2 btn btn-principal\" (click)=\"send()\">Send</button>\n\n</div>"

/***/ }),

/***/ "./src/app/database/database.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DatabaseComponent = /** @class */ (function () {
    function DatabaseComponent(AppSettings, auth, http, alertService) {
        this.AppSettings = AppSettings;
        this.auth = auth;
        this.http = http;
        this.alertService = alertService;
        this.actualCommand = "";
        this.lastCommands = [];
        this.commandHistory = "";
    }
    DatabaseComponent.prototype.ngOnInit = function () {
    };
    DatabaseComponent.prototype.send = function () {
        var _this = this;
        if (this.actualCommand !== "") {
            this.lastCommands.push(this.actualCommand);
            this.http.post(this.AppSettings.API_ENDPOINT + 'database', { 'command': this.actualCommand }, { responseType: 'text' }).pipe().subscribe(function (data) {
                _this.commandHistory = _this.commandHistory + data + "\n";
                _this.actualCommand = "";
            });
        }
    };
    DatabaseComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-database',
            template: __webpack_require__("./src/app/database/database.component.html"),
            styles: [__webpack_require__("./src/app/database/database.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__app_settings_service__["a" /* AppSettingsService */],
            __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__alert_alert_service__["a" /* AlertService */]])
    ], DatabaseComponent);
    return DatabaseComponent;
}());



/***/ }),

/***/ "./src/app/environment/environment.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/environment/environment.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  environment works!\n</p>\n"

/***/ }),

/***/ "./src/app/environment/environment.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnvironmentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EnvironmentComponent = /** @class */ (function () {
    function EnvironmentComponent() {
    }
    EnvironmentComponent.prototype.ngOnInit = function () {
    };
    EnvironmentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-environment',
            template: __webpack_require__("./src/app/environment/environment.component.html"),
            styles: [__webpack_require__("./src/app/environment/environment.component.css")]
        })
        /**
         * This component defains the environment for the project.
         */
        ,
        __metadata("design:paramtypes", [])
    ], EnvironmentComponent);
    return EnvironmentComponent;
}());



/***/ }),

/***/ "./src/app/environment/environment.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnvironmentService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EnvironmentService = /** @class */ (function () {
    function EnvironmentService(http, alertService, AppSettings) {
        this.http = http;
        this.alertService = alertService;
        this.AppSettings = AppSettings;
    }
    EnvironmentService.prototype.getEnvironments = function (fill) {
        if (fill === void 0) { fill = false; }
        return this.http.get(this.AppSettings.API_ENDPOINT + 'environment').map(function (data) { return data; });
    };
    EnvironmentService.prototype.getEnvironment = function (id, fill) {
        if (fill === void 0) { fill = false; }
        return this.http.get(this.AppSettings.API_ENDPOINT + 'environment/' + id).map(function (data) { return data; });
    };
    EnvironmentService.prototype.postEnvironment = function (env) {
        return this.http.post(this.AppSettings.API_ENDPOINT + 'environment', JSON.stringify(env));
    };
    EnvironmentService.prototype.updateEnvironment = function (env) {
        return this.http.put(this.AppSettings.API_ENDPOINT + 'environment/' + env.id, JSON.stringify(env));
    };
    EnvironmentService.prototype.deleteEnvironment = function (env) {
        return this.http.delete(this.AppSettings.API_ENDPOINT + 'environment/' + env.id);
    };
    EnvironmentService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__["a" /* AlertService */], __WEBPACK_IMPORTED_MODULE_4__app_settings_service__["a" /* AppSettingsService */]])
    ], EnvironmentService);
    return EnvironmentService;
}());



/***/ }),

/***/ "./src/app/infrastructure/infrastructure-edit/infrastructure-edit.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/infrastructure/infrastructure-edit/infrastructure-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #content let-c=\"close\" let-d=\"dismiss\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"deleteModalLabel\">Are you sure?</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"c('Close click')\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        Do you want to delet the infrastructure labeled as \"{{_infrastructure.name}}\"?\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"d('Close click')\">Cancel</button>\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"sureDelete();c('Close click');\">Remove</button>\n      </div>\n    </div>\n  </div>\n</ng-template>\n<div *ngIf=\"_infrastructure\">\n  <form>\n    <div class=\"card\">\n      <div class=\"card-header\">\n\n        <!--HEADER -->\n        <dl class=\"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3\">\n          <div class=\"ml-2\">\n            <dt class=\"\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Name of the usder\">Name:</dt>\n            <dd class=\"\">{{_infrastructure.name}}</dd>\n          </div>\n          <div class=\"btn-group mr-2\">\n            <button type=\"submit\" class=\"btn btn-primary\" (click)=\"edit()\">Edit</button>\n            <button type=\"submit\" class=\"btn btn-secondary\" (click)=\"cancel()\">Cancel</button>\n            <button type=\"submit\" class=\"btn btn-danger\" data-toggle=\"modal\" data-target=\"#deleteModal\" (click)=\"deleteModal(content)\">Remove</button>\n          </div>\n        </dl>\n      </div>\n      <div class=\"card-body\">\n          <dl class=\"row\">\n              <dt class=\"col-sm-3\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The description of the infrastructure\">Description</dt>\n              <dd class=\"col-sm-9\">{{_infrastructure.description}}</dd>\n            </dl>\n        <div class=\"row\">\n          <textarea class=\"form-control\" rows=\"20\" name=\"infrFile\" [(ngModel)]=\"_content\"></textarea>\n        </div>\n        <dl class=\"row\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The last time the was connected\">Last Connection</dt>\n          <dd class=\"col-sm-7\">{{_infrastructure.last_update}}</dd>\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The creation date for this infrastructure\">Creation Date</dt>\n          <dd class=\"col-sm-7\">{{_infrastructure.create_date}}</dd>\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-3\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The ID of the infrastructure\">ID</dt>\n          <dd class=\"col-sm-9\">{{_infrastructure.id}}</dd>\n        </dl>\n      </div>\n    </div>\n  </form>\n\n</div>"

/***/ }),

/***/ "./src/app/infrastructure/infrastructure-edit/infrastructure-edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfrastructureEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__infrastructure_service__ = __webpack_require__("./src/app/infrastructure/infrastructure.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__infrastructure__ = __webpack_require__("./src/app/infrastructure/infrastructure.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var InfrastructureEditComponent = /** @class */ (function () {
    function InfrastructureEditComponent(route, location, infrService, alert, modalService, activeModal) {
        this.route = route;
        this.location = location;
        this.infrService = infrService;
        this.alert = alert;
        this.modalService = modalService;
        this.activeModal = activeModal;
        this._content = "{}";
    }
    Object.defineProperty(InfrastructureEditComponent.prototype, "infrastructure", {
        get: function () {
            return this._infrastructure;
        },
        set: function (inf) {
            this._infrastructure = inf;
            this._content = JSON.stringify(this._infrastructure.content, null, "\t");
        },
        enumerable: true,
        configurable: true
    });
    InfrastructureEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.infrService.findInfrastructure(params['id']); })
            .subscribe(function (infr) { return _this.infrastructure = infr; });
    };
    InfrastructureEditComponent.prototype.edit = function () {
        var _this = this;
        try {
            this._infrastructure.content = JSON.parse(this._content);
        }
        catch (err) { }
        this.infrService.updateInfrastructure(this._infrastructure).subscribe(function (data) {
            _this.alert.success("Updated");
        }, function (err) {
            _this.alert.error('message' in err.error ? err.error.message : "Cannot save Infraestructure");
        });
    };
    InfrastructureEditComponent.prototype.cancel = function () {
        this._infrastructure = null;
        this.location.back();
    };
    InfrastructureEditComponent.prototype.sureDelete = function () {
        var _this = this;
        this.activeModal.close('Close click');
        this.infrService.deleteInfrastructure(this._infrastructure).subscribe(function (data) {
            _this.alert.success("Deleted");
            _this._infrastructure = null;
            _this.location.back();
        }, function (err) {
            _this.alert.error('message' in err.error ? err.error.message : "Cannot delete Infraestructure");
        });
    };
    InfrastructureEditComponent.prototype.deleteModal = function (content) {
        this.modalService.open(content).result.then(function (result) {
            console.log(result);
        }, function (reason) {
            console.error(reason);
        }).catch(function (err) {
            console.error(err);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_7__infrastructure__["a" /* WWInfrastructure */]),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__infrastructure__["a" /* WWInfrastructure */]])
    ], InfrastructureEditComponent.prototype, "infrastructure", null);
    InfrastructureEditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'infrastructure-edit',
            template: __webpack_require__("./src/app/infrastructure/infrastructure-edit/infrastructure-edit.component.html"),
            styles: [__webpack_require__("./src/app/infrastructure/infrastructure-edit/infrastructure-edit.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_6__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_1__infrastructure_service__["a" /* InfrastructureService */],
            __WEBPACK_IMPORTED_MODULE_4__alert_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["a" /* NgbActiveModal */]])
    ], InfrastructureEditComponent);
    return InfrastructureEditComponent;
}());



/***/ }),

/***/ "./src/app/infrastructure/infrastructure-new/infrastructure-new.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/infrastructure/infrastructure-new/infrastructure-new.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"_infrastructure\">\n  <form>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <!--HEADER -->\n        <div class=\"form-group row\">\n          <label class=\"col-sm-4\" for=\"pipeName\">Infraestructure Name</label>\n          <input type=\"text\" class=\"form-control col-sm-8\" name=\"name\" id=\"infrastructureName\" placeholder=\"Infraestructure Name\"\n            [(ngModel)]=\"_infrastructure.name\">\n        </div>\n      </div>\n      <div class=\"card-body\">\n        <div class=\"row\">\n          <textarea class=\"form-control\" rows=\"20\" name=\"infrFile\" [(ngModel)]=\"_content\"></textarea>\n        </div>\n        <dl class=\"row\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The last time the was connected\">Last Connection</dt>\n          <dd class=\"col-sm-7\">{{_infrastructure.last_update}}</dd>\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The creation date for this _infrastructure\">Creation Date</dt>\n          <dd class=\"col-sm-7\">{{_infrastructure.create_date}}</dd>\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-3\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The ID of the _infrastructure\">ID</dt>\n          <dd class=\"col-sm-9\">{{_infrastructure.id}}</dd>\n        </dl>\n        <div class=\"btn-group\">\n          <button type=\"submit\" class=\"btn btn-primary\" (click)=\"create()\">Create</button>\n        </div>\n        <div class=\"btn-group\">\n            <button type=\"cancel\" class=\"btn btn-primary\" (click)=\"cancel()\">Cancel</button>\n          </div>\n      </div>\n    </div>\n  </form>\n\n</div>"

/***/ }),

/***/ "./src/app/infrastructure/infrastructure-new/infrastructure-new.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfrastructureNewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__infrastructure_service__ = __webpack_require__("./src/app/infrastructure/infrastructure.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__infrastructure__ = __webpack_require__("./src/app/infrastructure/infrastructure.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var InfrastructureNewComponent = /** @class */ (function () {
    function InfrastructureNewComponent(infrService) {
        this.infrService = infrService;
        this._content = "";
    }
    Object.defineProperty(InfrastructureNewComponent.prototype, "infrastructure", {
        get: function () {
            return this._infrastructure;
        },
        set: function (inf) {
            this._infrastructure = inf;
            this._content = JSON.stringify(inf.content, null, "\t");
        },
        enumerable: true,
        configurable: true
    });
    InfrastructureNewComponent.prototype.ngOnInit = function () {
    };
    InfrastructureNewComponent.prototype.create = function () {
        try {
            this._infrastructure.content = JSON.parse(this._content);
            this.infrService.createInfrastructure(this.infrastructure).subscribe(function (data) {
            }, function (err) {
            });
        }
        catch (err) {
        }
    };
    InfrastructureNewComponent.prototype.cancel = function () {
        this.infrastructure = null;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__infrastructure__["a" /* WWInfrastructure */]),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__infrastructure__["a" /* WWInfrastructure */]])
    ], InfrastructureNewComponent.prototype, "infrastructure", null);
    InfrastructureNewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'infrastructure-new',
            template: __webpack_require__("./src/app/infrastructure/infrastructure-new/infrastructure-new.component.html"),
            styles: [__webpack_require__("./src/app/infrastructure/infrastructure-new/infrastructure-new.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__infrastructure_service__["a" /* InfrastructureService */]])
    ], InfrastructureNewComponent);
    return InfrastructureNewComponent;
}());



/***/ }),

/***/ "./src/app/infrastructure/infrastructure.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/infrastructure/infrastructure.component.html":
/***/ (function(module, exports) {

module.exports = "<div class='container'>\n    <div class=\"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom\">\n      <h4>List of Infrastructures</h4>\n      <div class=\"btn-toolbar mb-2 mb-md-0\">\n        <div class=\"btn-group mr-2\">\n          <div>\n              <button type=\"button\" class=\"btn btn-primary\" (click)=\"fetchAll()\">Refresh</button>\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"newInfrastructure()\">Create new Infrastructure</button>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div *ngIf=\"tempInfrastructure\" class=\"row\">\n        <div class=\"col-sm-12 col-xl-12\">\n          <infrastructure-new [infrastructure]=\"tempInfrastructure\">></infrastructure-new>\n        </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-sm-12 col-md-3\">\n        <div class=\"list-group\">\n            <h5>Stored Infrastructures</h5>\n            <a *ngFor=\"let infr of infrastructures\" [class.active]=\"infr === selectedInfrastructure\" (click)=\"onSelect(infr)\" class=\"list-group-item\">\n                <span>{{infr.name}} </span>\n            </a>\n        </div>\n        <hr/>\n      </div>\n      <div class=\"col-sm-12 col-md-3\">\n        <div class=\"list-group\">\n            <h5>Active Infrastructures</h5>\n            <a *ngFor=\"let infr of activeInfrastructures\" [class.active]=\"infr === selectedInfrastructure\" (click)=\"onSelect(infr)\" class=\"list-group-item\">\n                <span>{{infr.name}} </span>\n            </a>\n        </div>\n        <hr/>\n      </div>\n      <div class=\"col-sm-12 col-md-6\">\n          <infrastructure-object [infrastructure]=\"selectedInfrastructure\"></infrastructure-object>\n      </div>\n    </div>\n  </div>"

/***/ }),

/***/ "./src/app/infrastructure/infrastructure.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfrastructureComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__infrastructure__ = __webpack_require__("./src/app/infrastructure/infrastructure.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__infrastructure_service__ = __webpack_require__("./src/app/infrastructure/infrastructure.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var InfrastructureComponent = /** @class */ (function () {
    function InfrastructureComponent(infrServ) {
        this.infrServ = infrServ;
        this.infrastructures = [];
        this.activeInfrastructures = [];
    }
    InfrastructureComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.infrServ.subscribeToInfrastructures().subscribe(function () {
            _this.fetchData();
            _this.fetcActivehData();
        }, function (err) { });
        this.fetchData();
        this.fetcActivehData();
    };
    InfrastructureComponent.prototype.fetchData = function () {
        var _this = this;
        this.infrServ.findInfrastructures().subscribe(function (data) {
            _this.infrastructures = data;
        }, function (err) { });
    };
    InfrastructureComponent.prototype.newInfrastructure = function () {
        this.tempInfrastructure = new __WEBPACK_IMPORTED_MODULE_1__infrastructure__["a" /* WWInfrastructure */]();
    };
    InfrastructureComponent.prototype.onSelect = function (infr) {
        this.selectedInfrastructure = infr;
    };
    InfrastructureComponent.prototype.fetcActivehData = function () {
        var _this = this;
        this.infrServ.findActiveInfrastructures().subscribe(function (data) {
            console.log(data);
            _this.activeInfrastructures = data;
        }, function (err) { });
    };
    InfrastructureComponent.prototype.fetchAll = function () {
        this.fetchData();
        this.fetcActivehData();
    };
    InfrastructureComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-infrastructure',
            template: __webpack_require__("./src/app/infrastructure/infrastructure.component.html"),
            styles: [__webpack_require__("./src/app/infrastructure/infrastructure.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__infrastructure_service__["a" /* InfrastructureService */]])
    ], InfrastructureComponent);
    return InfrastructureComponent;
}());



/***/ }),

/***/ "./src/app/infrastructure/infrastructure.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfrastructureService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var InfrastructureService = /** @class */ (function () {
    function InfrastructureService(http, AppSettings) {
        var _this = this;
        this.http = http;
        this.AppSettings = AppSettings;
        this.pullerObserver = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.subscriber = observer;
        });
    }
    InfrastructureService.prototype.findInfrastructure = function (id) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.get(_this.AppSettings.API_ENDPOINT + 'infrastructure/' + id)
                .map(function (data) { return data; })
                .subscribe(function (data) {
                observer.next(data);
            }, function (err) {
                observer.error(err);
            });
        });
    };
    InfrastructureService.prototype.findInfrastructures = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.get(_this.AppSettings.API_ENDPOINT + 'infrastructure')
                .map(function (data) { return data; })
                .subscribe(function (data) {
                observer.next(data);
            }, function (err) {
                observer.error(err);
            });
        });
    };
    InfrastructureService.prototype.findActiveInfrastructures = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.get(_this.AppSettings.API_ENDPOINT + 'infrastructure?active=true')
                .map(function (data) { return data; })
                .subscribe(function (data) {
                observer.next(data);
            }, function (err) {
                observer.error(err);
            });
        });
    };
    InfrastructureService.prototype.createInfrastructure = function (obj) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.post(_this.AppSettings.API_ENDPOINT + 'infrastructure', obj, { responseType: 'json' })
                .map(function (data) { return data; })
                .subscribe(function (data) {
                _this.notify();
                observer.next(data);
            }, function (err) {
                observer.error(err);
            });
        });
    };
    InfrastructureService.prototype.updateInfrastructure = function (obj) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.put(_this.AppSettings.API_ENDPOINT + 'infrastructure/' + obj.id, obj, { responseType: 'json' })
                .map(function (data) { return data; })
                .subscribe(function (data) {
                _this.notify();
                observer.next(data);
            }, function (err) {
                observer.error(err);
            });
        });
    };
    InfrastructureService.prototype.updateActiveInfrastructure = function (obj) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.put(_this.AppSettings.API_ENDPOINT + 'infrastructure/' + obj.id + "?active=true", obj, { responseType: 'json' })
                .map(function (data) { return data; })
                .subscribe(function (data) {
                _this.notify();
                observer.next(data);
            }, function (err) {
                observer.error(err);
            });
        });
    };
    InfrastructureService.prototype.activateInfrastructure = function (obj) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.post(_this.AppSettings.API_ENDPOINT + 'infrastructure?active=true', obj, { responseType: 'json' })
                .map(function (data) { return data; })
                .subscribe(function (data) {
                _this.notify();
                observer.next(data);
            }, function (err) {
                observer.error(err);
            });
        });
    };
    InfrastructureService.prototype.deleteInfrastructure = function (obj) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.delete(_this.AppSettings.API_ENDPOINT + 'infrastructure/' + obj.id, { responseType: 'json' })
                .map(function (data) { return data; })
                .subscribe(function (data) {
                _this.notify();
                observer.next(data);
            }, function (err) {
                observer.error(err);
            });
        });
    };
    InfrastructureService.prototype.deleteActiveInfrastructure = function (obj) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.delete(_this.AppSettings.API_ENDPOINT + 'infrastructure/' + obj.name + "?active=true" + (obj.content && obj.content.kind ? "&kind=" + obj.content.kind : ""), { responseType: 'json' })
                .map(function (data) { return data; })
                .subscribe(function (data) {
                _this.notify();
                observer.next(data);
            }, function (err) {
                observer.error(err);
            });
        });
    };
    /**
       * Get notified when a object is deleted, update or created.
       * Dont use it in @Input Components
       */
    InfrastructureService.prototype.subscribeToInfrastructures = function () {
        return this.pullerObserver;
    };
    /**
     * Use internally
     */
    InfrastructureService.prototype.notify = function () {
        try {
            this.subscriber.next(true);
        }
        catch (err) { }
    };
    InfrastructureService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__app_settings_service__["a" /* AppSettingsService */]])
    ], InfrastructureService);
    return InfrastructureService;
}());



/***/ }),

/***/ "./src/app/infrastructure/infrastructure.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WWInfrastructure; });
/**
 * Simplify the infraestructure file. We store it and the platform will transform it into a kubernetes file or docker
 */
var WWInfrastructure = /** @class */ (function () {
    function WWInfrastructure() {
        this.content = {};
        /**
         * This infrastructure is active in the server?
         */
        this.active = false;
    }
    return WWInfrastructure;
}());



/***/ }),

/***/ "./src/app/infrastructure/infrastructure/infrastructure.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/infrastructure/infrastructure/infrastructure.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"_infrastructure\">\n  <form>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <!--HEADER -->\n        <dl class=\"row\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Name of the usder\">Name:</dt>\n          <dd class=\"col-sm-7\">{{_infrastructure.name}}</dd>\n        </dl>\n      </div>\n      <div class=\"card-body\">\n          <dl class=\"row\">\n              <dt class=\"col-sm-3\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The description of the infrastructure\">Description</dt>\n              <dd class=\"col-sm-9\">{{_infrastructure.description}}</dd>\n            </dl>\n        <div class=\"row\">\n          <textarea *ngIf=\"!_infrastructure.active\" class=\"form-control\" rows=\"20\" name=\"infrFile\" [(ngModel)]=\"_content\" readonly></textarea>\n          <textarea *ngIf=\"_infrastructure.active\" class=\"form-control\" rows=\"20\" name=\"infrFile\" [(ngModel)]=\"_content\"></textarea>\n        </div>\n        <dl class=\"row\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The last time the was connected\">Last Connection</dt>\n          <dd class=\"col-sm-7\">{{_infrastructure.last_update}}</dd>\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The creation date for this infrastructure\">Creation Date</dt>\n          <dd class=\"col-sm-7\">{{_infrastructure.create_date}}</dd>\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-3\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The ID of the infrastructure\">ID</dt>\n          <dd class=\"col-sm-9\">{{_infrastructure.id}}</dd>\n        </dl>\n        <div  class=\"btn-group\">\n          <button *ngIf=\"!_infrastructure.active\" type=\"submit\" class=\"btn btn-primary\" routerLink=\"/infrastructure/{{_infrastructure.id}}\">Edit</button>\n          <button *ngIf=\"_infrastructure.active\" type=\"submit\" class=\"btn btn-primary\" (click)=\"editActive()\">Edit</button>\n          <button *ngIf=\"!_infrastructure.active\" type=\"submit\" class=\"btn btn-warning\" (click)=\"activateInfr()\">Activate</button>\n          <button *ngIf=\"_infrastructure.active\" type=\"submit\" class=\"btn btn-danger\" (click)=\"deleteInfr()\">Delete</button>\n        </div>\n      </div>\n    </div>\n  </form>\n\n</div>"

/***/ }),

/***/ "./src/app/infrastructure/infrastructure/infrastructure.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfrastructureObjectComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__infrastructure__ = __webpack_require__("./src/app/infrastructure/infrastructure.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__infrastructure_service__ = __webpack_require__("./src/app/infrastructure/infrastructure.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var InfrastructureObjectComponent = /** @class */ (function () {
    function InfrastructureObjectComponent(infrServ, alert) {
        this.infrServ = infrServ;
        this.alert = alert;
        this._content = "{}";
    }
    Object.defineProperty(InfrastructureObjectComponent.prototype, "infrastructure", {
        get: function () {
            return this._infrastructure;
        },
        set: function (inf) {
            this._infrastructure = inf;
            this._content = JSON.stringify(this._infrastructure.content, null, "\t");
        },
        enumerable: true,
        configurable: true
    });
    InfrastructureObjectComponent.prototype.ngOnInit = function () {
    };
    InfrastructureObjectComponent.prototype.editActive = function () {
        var _this = this;
        try {
            this._infrastructure.content = JSON.parse(this._content);
        }
        catch (err) { }
        this.infrServ.updateActiveInfrastructure(this._infrastructure).subscribe(function (dat) {
            _this.alert.clear();
            _this.alert.success("Infrastructure " + _this._infrastructure.name + " updated");
        }, function (err) {
            _this.alert.error("Can\u00B4t update " + _this._infrastructure.name);
        });
    };
    InfrastructureObjectComponent.prototype.activateInfr = function () {
        var _this = this;
        this.infrServ.activateInfrastructure(this._infrastructure).subscribe(function (dat) {
            _this.alert.success("Infrastructure " + _this._infrastructure.name + " activated");
        }, function (err) {
            _this.alert.success("Can\u00B4t activate " + _this._infrastructure.name);
        });
    };
    InfrastructureObjectComponent.prototype.deleteInfr = function () {
        var _this = this;
        this.infrServ.deleteActiveInfrastructure(this._infrastructure).subscribe(function (dat) {
            _this.alert.success("Infrastructure " + _this._infrastructure.name + " deleted");
        }, function (err) {
            _this.alert.success(err.error && err.error.error ? err.error.error : "Can\u00B4t delete " + _this._infrastructure.name);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__infrastructure__["a" /* WWInfrastructure */]),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__infrastructure__["a" /* WWInfrastructure */]])
    ], InfrastructureObjectComponent.prototype, "infrastructure", null);
    InfrastructureObjectComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'infrastructure-object',
            template: __webpack_require__("./src/app/infrastructure/infrastructure/infrastructure.component.html"),
            styles: [__webpack_require__("./src/app/infrastructure/infrastructure/infrastructure.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__infrastructure_service__["a" /* InfrastructureService */], __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__["a" /* AlertService */]])
    ], InfrastructureObjectComponent);
    return InfrastructureObjectComponent;
}());



/***/ }),

/***/ "./src/app/page-not-found/page-not-found.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/page-not-found/page-not-found.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row justify-content-center\">\n    <div class=\"col-6\">\n        <h1>404 - Not Found</h1>\n    </div>\n    \n  </div>\n  <div class=\"row justify-content-center\">\n      <div class=\"col-6\">\n          <h3><a class=\"nav-link\" [routerLink]=\"['/']\">Return</a></h3>\n      </div>\n      \n    </div>\n</div>"

/***/ }),

/***/ "./src/app/page-not-found/page-not-found.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageNotFoundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageNotFoundComponent = /** @class */ (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    PageNotFoundComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-page-not-found',
            template: __webpack_require__("./src/app/page-not-found/page-not-found.component.html"),
            styles: [__webpack_require__("./src/app/page-not-found/page-not-found.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());



/***/ }),

/***/ "./src/app/pipeline/contextual-menu/contextual-menu.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pipeline/contextual-menu/contextual-menu.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"context-menu\" style=\"position : fixed \" [style.left.px]=\"posX\" [style.top.px]=\"posY\">\n  <div class=\"dropdown-menu\" style=\"visibility: visible; display: block\" aria-labelledby=\"dropdownMenuButton\">\n    <a *ngIf=\"node\" class=\"dropdown-item\" (click)=\"copyNode()\">Copy Node</a>\n    <a *ngIf=\"node\" class=\"dropdown-item\" (click)=\"cloneNode()\">Clone Node</a>\n    <a *ngIf=\"node\" class=\"dropdown-item\" (click)=\"deleteNode()\"> Remove Node</a>\n    <a *ngIf=\"node\" class=\"dropdown-item\" (click)=\"storeNode()\"> Store Node</a>\n    <a *ngIf=\"!node\" class=\"dropdown-item\" (click)=\"pasteNode()\">Paste Node</a>\n    <div *ngIf=\"!node\" ngbDropdown class=\"dropdown-submenu  dropright\">\n      <a ngbDropdownToggle class=\"dropdown-item dropdown-toggle\" type=\"button\" id=\"dropdownStoredNode\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\n        aria-expanded=\"false\" title=\"Centers a node in the middle of the PipelineCanvas\" (click)=\"getStoredNodes()\">\n        Add stored Node\n      </a>\n      <div ngbDropdownMenu class=\"dropdown-submenu dropright\" aria-labelledby=\"dropdownStoredNode\">\n        <a *ngFor=\"let stor of storedNodes\" class=\"dropdown-item\" (click)=\"newNodeFromTemplate(stor)\">{{stor.name}}</a>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/pipeline/contextual-menu/contextual-menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContextualMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node__ = __webpack_require__("./src/app/pipeline/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipeline_service__ = __webpack_require__("./src/app/pipeline/pipeline.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ContextualMenuComponent = /** @class */ (function () {
    function ContextualMenuComponent(alertService, pipService) {
        this.alertService = alertService;
        this.pipService = pipService;
        this.posX = 0;
        this.posY = 0;
        this.completed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.storedNodes = [];
    }
    ContextualMenuComponent.prototype.ngOnInit = function () {
        if (!this.node) {
            //Contextual menu witouth node
        }
        else {
            //Contextual menu over node
        }
    };
    ContextualMenuComponent.prototype.storeNode = function () {
        if (this.node) {
            var clonedNode = obtainCleanNode(this.node);
            this.pipService.newStoredNode(clonedNode).subscribe(function (data) {
            }, function (err) { });
            this.completed.emit({
                "event": "store"
            });
        }
    };
    ContextualMenuComponent.prototype.copyNode = function () {
        if (this.node) {
            try {
                var clonedNode = obtainCleanNode(this.node);
                localStorage.setItem('clip-node', JSON.stringify(clonedNode));
                this.completed.emit({
                    "event": "copy"
                });
            }
            catch (err) { }
        }
    };
    ContextualMenuComponent.prototype.cloneNode = function () {
        if (this.node) {
            try {
                var clonedNode = obtainCleanNode(this.node);
                this.completed.emit({
                    "event": "clone",
                    "node": Object(__WEBPACK_IMPORTED_MODULE_1__node__["f" /* pipelineNodeFromJSON */])(clonedNode)
                });
            }
            catch (err) {
            }
        }
    };
    ContextualMenuComponent.prototype.pasteNode = function () {
        if (!this.node) {
            try {
                var copiedNode = JSON.parse(localStorage.getItem('clip-node'));
                localStorage.removeItem('clip-node');
                copiedNode.x = this.posX;
                copiedNode.y = this.posY;
                this.completed.emit({
                    "event": "paste",
                    "node": Object(__WEBPACK_IMPORTED_MODULE_1__node__["f" /* pipelineNodeFromJSON */])(copiedNode)
                });
            }
            catch (err) { }
        }
    };
    ContextualMenuComponent.prototype.newNode = function (node) {
    };
    ContextualMenuComponent.prototype.getStoredNodes = function () {
        var _this = this;
        this.pipService.getStoredNodes().subscribe(function (nodes) {
            _this.storedNodes = nodes;
        }, function (err) { });
    };
    ContextualMenuComponent.prototype.deleteNode = function () {
        if (this.node) {
            try {
                this.completed.emit({
                    "event": "delete",
                    "node": this.node
                });
            }
            catch (err) { }
        }
    };
    ContextualMenuComponent.prototype.newNodeFromTemplate = function (node) {
        if (!this.node) {
            try {
                node.x = this.posX;
                node.y = this.posY;
                this.completed.emit({
                    "event": "template",
                    "node": node
                });
            }
            catch (err) { }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], ContextualMenuComponent.prototype, "posX", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], ContextualMenuComponent.prototype, "posY", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__node__["b" /* PipelineNode */])
    ], ContextualMenuComponent.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], ContextualMenuComponent.prototype, "completed", void 0);
    ContextualMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'contextual-menu',
            template: __webpack_require__("./src/app/pipeline/contextual-menu/contextual-menu.component.html"),
            styles: [__webpack_require__("./src/app/pipeline/contextual-menu/contextual-menu.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__alert_alert_service__["a" /* AlertService */], __WEBPACK_IMPORTED_MODULE_3__pipeline_service__["a" /* PipelineService */]])
    ], ContextualMenuComponent);
    return ContextualMenuComponent;
}());

function obtainCleanNode(node) {
    var clonedNode = node.toJSON();
    clonedNode.inputConnectors.map(function (val, i, arr) {
        val.conectedNodes = [];
        val.originNode = null;
        return val;
    });
    clonedNode.outputConnectors.map(function (val, i, arr) {
        val.conectedNodes = [];
        val.originNode = null;
        return val;
    });
    clonedNode.errorConnectors.map(function (val, i, arr) {
        val.conectedNodes = [];
        val.originNode = null;
        return val;
    });
    clonedNode.id = "";
    clonedNode.pipe = "";
    return clonedNode;
}


/***/ }),

/***/ "./src/app/pipeline/contextual.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContextualDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ContextualDirective = /** @class */ (function () {
    function ContextualDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    ContextualDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[contextalizable]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]])
    ], ContextualDirective);
    return ContextualDirective;
}());



/***/ }),

/***/ "./src/app/pipeline/hose-pipe.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HosePipe */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HosePipeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node__ = __webpack_require__("./src/app/pipeline/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HosePipe = /** @class */ (function () {
    function HosePipe() {
        /**
         * Posicion final en el eje x del hosepipe
         */
        this.x = 0;
        /**
         * Posicion final en el eje y del hosepipe
         */
        this.y = 0;
        this.active = false;
    }
    return HosePipe;
}());

var HosePipeService = /** @class */ (function () {
    function HosePipeService(alertService) {
        var _this = this;
        this.alertService = alertService;
        this.pullerObserver = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.subscriber = observer;
        });
        this.hosepipe = new HosePipe();
        this.hosepipe.origin = new __WEBPACK_IMPORTED_MODULE_1__node__["a" /* NodeConnector */](Math.random().toString());
        this.hosepipe.origin.x = 0;
        this.hosepipe.origin.y = 0;
    }
    HosePipeService.prototype.getHosePipe = function () {
        return this.hosepipe;
    };
    HosePipeService.prototype.setPos = function (x, y) {
        if (this.hosepipe.active) {
            this.hosepipe.x += x;
            this.hosepipe.y += y;
        }
        else {
            this.hosepipe.x = 0;
            this.hosepipe.y = 0;
        }
    };
    //TODO : Desacoplar el sistema por completo
    HosePipeService.prototype.setOrigin = function (connector) {
        //FALSIFY the connector
        this.hosepipe.realOrigin = connector;
        this.hosepipe.origin.x = connector.x + connector.originNode.x;
        this.hosepipe.origin.y = connector.y + connector.originNode.y;
        this.hosepipe.origin.originNode = connector.originNode;
        this.hosepipe.origin.type = connector.type;
        //At the moment the x and y target position of the hose pipe are in the same position as the origin connector
        this.hosepipe.x = this.hosepipe.origin.x;
        this.hosepipe.y = this.hosepipe.origin.y;
    };
    HosePipeService.prototype.clean = function () {
        this.hosepipe.x = 0;
        this.hosepipe.y = 0;
        this.hosepipe.origin.x = 0;
        this.hosepipe.origin.y = 0;
        this.hosepipe.realOrigin = null;
    };
    HosePipeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__alert_alert_service__["a" /* AlertService */]])
    ], HosePipeService);
    return HosePipeService;
}());



/***/ }),

/***/ "./src/app/pipeline/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node__ = __webpack_require__("./src/app/pipeline/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipeline_component__ = __webpack_require__("./src/app/pipeline/pipeline.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pipeline_directive__ = __webpack_require__("./src/app/pipeline/pipeline.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipeline_service__ = __webpack_require__("./src/app/pipeline/pipeline.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pipeline_edit_pipeline_edit_component__ = __webpack_require__("./src/app/pipeline/pipeline-edit/pipeline-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipeline_new_pipeline_new_component__ = __webpack_require__("./src/app/pipeline/pipeline-new/pipeline-new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipeline_node_pipeline_node_component__ = __webpack_require__("./src/app/pipeline/pipeline-node/pipeline-node.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pipeline_node_edit_pipeline_node_edit_component__ = __webpack_require__("./src/app/pipeline/pipeline-node-edit/pipeline-node-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pipeline_node_new_pipeline_node_new_component__ = __webpack_require__("./src/app/pipeline/pipeline-node-new/pipeline-node-new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pipeline_node_node_move_directive__ = __webpack_require__("./src/app/pipeline/pipeline-node/node-move.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pipeline_node_node_resize_directive__ = __webpack_require__("./src/app/pipeline/pipeline-node/node-resize.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pipeline_node_node_pipeme_directive__ = __webpack_require__("./src/app/pipeline/pipeline-node/node-pipeme.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__hose_pipe_service__ = __webpack_require__("./src/app/pipeline/hose-pipe.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pipeline_mouse_service__ = __webpack_require__("./src/app/pipeline/pipeline-mouse.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pipeline_node_node_connector_component__ = __webpack_require__("./src/app/pipeline/pipeline-node/node-connector.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_0__node__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_0__node__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_6__pipeline_node_pipeline_node_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_7__pipeline_node_edit_pipeline_node_edit_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_8__pipeline_node_new_pipeline_node_new_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_9__pipeline_node_node_move_directive__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_1__pipeline_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_2__pipeline_directive__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_3__pipeline_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_10__pipeline_node_node_resize_directive__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_11__pipeline_node_node_pipeme_directive__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_5__pipeline_new_pipeline_new_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_4__pipeline_edit_pipeline_edit_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_12__hose_pipe_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_13__pipeline_mouse_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_14__pipeline_node_node_connector_component__["a"]; });

//import {} from ''
//---------PIPES---------





//---------NODES---------












/***/ }),

/***/ "./src/app/pipeline/node.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return minHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return minWidth; });
/* unused harmony export PIPE_TAGS */
/* unused harmony export IO_TYPES */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PipelineNode; });
/* harmony export (immutable) */ __webpack_exports__["f"] = pipelineNodeFromJSON;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PipelineNodeAtribute; });
/* unused harmony export NODE_ATTR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeConnector; });
/* unused harmony export connectorsFromJSONarray */
/* unused harmony export nodeConnectorFromJSON */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");

var minHeight = 200;
var minWidth = 150;
var PIPE_TAGS = {
    START: "START",
    INTEGRATION: "INTEGRATION",
    BUILDER: "BUILDER",
    DEPLOYER: "DEPLOYER",
    CHECKER: "CHECKER",
    ERROR_NOTIFIER: "ERROR_NOTIFIER",
    REPORT_NOTIFIER: "REPORT_NOTIFIER",
    ANY: "ANY"
};
var IO_TYPES = {
    INPUT: 0,
    OUTPUT: 1,
    ERR: 2
};
/**
 * This class allows us to create a graphical system to create dynamical pipelines
 */
var PipelineNode = /** @class */ (function () {
    function PipelineNode(name, tag, type) {
        if (type === void 0) { type = PIPE_TAGS.ANY; }
        /**
         * Pipe Type of this node like START or NOTIFY_ERR
         */
        this.type = PIPE_TAGS.ANY;
        /**
         * Actual status of the node
         */
        this.status = 0;
        /**
         * Database identificator
         */
        this.id = "";
        /**
         * For what pipe?
         */
        this.pipe = "";
        /**
         * Internal properties for the node
         */
        this.properties = [];
        /**
         * Recive data from a list of nodes.
         * Dont needed
         */
        //inputNodes : PipelineNode[];
        this.inputConnectors = [];
        this.outputConnectors = [];
        this.errorConnectors = [];
        /**
         * Parameters that needs this node
         */
        this.inputParams = [];
        /**
         * Parameters that this node sends to the next
         */
        this.outputParams = [];
        /**
         * Parameters to pass to the error nodes.
         */
        this.errorParams = [];
        /**
         * X position in SVG
         */
        this.x = 1;
        this.width = 200;
        /**
         * Y position in SVG
         */
        this.y = 1;
        this.height = 300;
        this.selected = false;
        this.subscriptor = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.name = name;
        this.tag = tag;
        this.type = type;
    }
    PipelineNode.prototype.setStatus = function (status) {
        this.status = status;
        this.subscriptor.emit(true);
    };
    PipelineNode.prototype.removeParam = function (param) {
        for (var i = 0; i < this.properties.length; i++) {
            if (this.properties[i] === param) {
                this.properties.splice(i, 1);
                return;
            }
        }
        for (var i = 0; i < this.inputParams.length; i++) {
            if (this.inputParams[i] === param) {
                this.properties.splice(i, 1);
                return;
            }
        }
        for (var i = 0; i < this.outputParams.length; i++) {
            if (this.outputParams[i] === param) {
                this.properties.splice(i, 1);
                return;
            }
        }
    };
    PipelineNode.prototype.removeMe = function () {
        for (var i = 0; i < this.inputConnectors.length; i++) {
            this.deleteInput();
            i--;
        }
        for (var i = 0; i < this.outputConnectors.length; i++) {
            this.deleteOutput();
            i--;
        }
        for (var i = 0; i < this.errorConnectors.length; i++) {
            this.deleteError();
            i--;
        }
    };
    PipelineNode.prototype.createInputConnector = function () {
        var con = new NodeConnector(generateIdForConnector());
        con.originNode = this;
        con.type = IO_TYPES.INPUT;
        this.inputConnectors.push(con);
        this.calculatePosInputConnectors();
        return con;
    };
    PipelineNode.prototype.createOutputConnector = function () {
        var con = new NodeConnector(generateIdForConnector());
        con.originNode = this;
        con.type = IO_TYPES.OUTPUT;
        this.outputConnectors.push(con);
        this.calculatePosOutputConnectors();
        return con;
    };
    PipelineNode.prototype.createErrorConnector = function () {
        var con = new NodeConnector(generateIdForConnector());
        con.originNode = this;
        con.type = IO_TYPES.ERR;
        this.errorConnectors.push(con);
        this.calculatePosErrorConnectors();
        return con;
    };
    PipelineNode.prototype.calculatePosInputConnectors = function () {
        for (var i = 0; i < this.inputConnectors.length; i++) {
            this.inputConnectors[i].x = 11;
            this.inputConnectors[i].y = (i + 1) * this.height / (this.inputConnectors.length + 1);
        }
    };
    PipelineNode.prototype.calculatePosOutputConnectors = function () {
        for (var i = 0; i < this.outputConnectors.length; i++) {
            this.outputConnectors[i].x = this.width - 11;
            this.outputConnectors[i].y = (i + 1) * (this.height / 2) / (this.outputConnectors.length + 1);
        }
    };
    PipelineNode.prototype.calculatePosErrorConnectors = function () {
        for (var i = 0; i < this.errorConnectors.length; i++) {
            this.errorConnectors[i].x = this.width - 11;
            this.errorConnectors[i].y = ((i + 1) * (this.height / 2) / (this.errorConnectors.length + 1)) + this.height / 2;
        }
    };
    PipelineNode.prototype.recalculate = function () {
        this.calculatePosInputConnectors();
        this.calculatePosOutputConnectors();
        this.calculatePosErrorConnectors();
    };
    PipelineNode.prototype.deleteInput = function () {
        var con = this.inputConnectors.pop();
        for (var i = 0; i < con.conectedNodes.length; i++) {
            con.conectedNodes[i].removeThisConnector(con);
        }
        this.recalculate();
    };
    PipelineNode.prototype.deleteOutput = function () {
        var con = this.outputConnectors.pop();
        for (var i = 0; i < con.conectedNodes.length; i++) {
            con.conectedNodes[i].removeThisConnector(con);
        }
        this.recalculate();
    };
    PipelineNode.prototype.deleteError = function () {
        var con = this.errorConnectors.pop();
        for (var i = 0; i < con.conectedNodes.length; i++) {
            con.conectedNodes[i].removeThisConnector(con);
        }
        this.recalculate();
    };
    /**
     * Serialize the object to a JSON format witouth references
     */
    PipelineNode.prototype.toJSON = function () {
        var ret = {};
        ret.id = this.id;
        ret.name = this.name;
        ret.type = this.type;
        ret.tag = this.tag;
        ret.y = this.y;
        ret.x = this.x;
        ret.width = this.width;
        ret.height = this.height;
        ret.pipe = this.pipe;
        ret.status = Number(this.status);
        ret.inputParams = this.inputParams;
        ret.outputParams = this.outputParams;
        ret.errorParams = this.errorParams;
        ret.properties = this.properties;
        ret.inputConnectors = this.inputConnectors.map(function (val, i, arr) {
            return val.toJSON();
        });
        ret.outputConnectors = this.outputConnectors.map(function (val, i, arr) {
            return val.toJSON();
        });
        ret.errorConnectors = this.errorConnectors.map(function (val, i, arr) {
            return val.toJSON();
        });
        return ret;
    };
    PipelineNode.prototype.fillReferences = function (array) {
        //FIRST INPUT
        for (var i = 0; i < this.inputConnectors.length; i++) {
            var connecteds = this.inputConnectors[i].conectedNodes;
            var us_in_connector = this.inputConnectors[i]; //Nuestro conector de entrada
            us_in_connector.conectedNodes = [];
            for (var i_c = 0; i_c < connecteds.length; i_c++) {
                //El conector unido al nuestro
                var his_connector_toUs = connecteds[i_c];
                //Obtenemos referencia real al nodo
                if (his_connector_toUs.originNode && his_connector_toUs.originNode) {
                    var pipNode = findNodeInArray(array, his_connector_toUs.originNode.id); //Nodo conectado
                    if (pipNode) {
                        //conRef = OutputConnectors or ErrorConnectors
                        var connectorsOfConectedToUs = his_connector_toUs.type === 1 ?
                            pipNode.outputConnectors : his_connector_toUs.type === 2 ?
                            pipNode.errorConnectors : [];
                        var findConector = false;
                        for (var i_pnc = 0; i_pnc < connectorsOfConectedToUs.length; i_pnc++) {
                            //Buscar conector del nodo conectado
                            var outOrErr = connectorsOfConectedToUs[i_pnc];
                            if (outOrErr.id === his_connector_toUs.id) {
                                //We exists in the other node
                                findConector = true;
                                us_in_connector.addConnector(outOrErr);
                                outOrErr.addConnector(us_in_connector);
                                break;
                            }
                        }
                        if (!findConector) {
                            console.log("Not connected to us: " + his_connector_toUs);
                            connecteds.splice(i_c, 1);
                            i_c--;
                        }
                    }
                    else {
                        //Nodo no encontrado
                        console.log("Nodo no encontrado");
                        connecteds.splice(i_c, 1);
                        i_c--;
                    }
                }
                else {
                    connecteds.splice(i_c, 1);
                }
            }
        }
        this.clean(array);
    };
    /**
     * Removes ghost conectors
     * @param array
     */
    PipelineNode.prototype.clean = function (array) {
        for (var i = 0; i < this.inputConnectors.length; i++) {
            if (this.inputConnectors[i].conectedNodes.length > 0) {
                var conecteds = this.inputConnectors[i].conectedNodes;
                for (var j = 0; j < conecteds.length; j++) {
                    var node = findNodeInArray(array, conecteds[j].originNode.id);
                    if (!node) {
                        console.log("Node not found");
                        this.inputConnectors[i].removeThisConnector(conecteds[j]);
                        j--;
                    }
                }
            }
        }
        for (var i = 0; i < this.outputConnectors.length; i++) {
            if (this.outputConnectors[i].conectedNodes.length > 0) {
                var conecteds = this.outputConnectors[i].conectedNodes;
                for (var j = 0; j < conecteds.length; j++) {
                    var node = findNodeInArray(array, conecteds[j].originNode.id);
                    if (!node) {
                        this.outputConnectors[i].removeThisConnector(conecteds[j]);
                        j--;
                    }
                    else {
                        //Exists buy maybe it hasnt us
                        for (var i_n_c = 0; i_n_c < node.inputConnectors.length; i_n_c++) {
                            var posCon = node.inputConnectors[i_n_c].findConnector(this.outputConnectors[i]);
                            //Problem here if used !posCon because if posCon=0 => true and we want posCon=== null
                            if (posCon === null || posCon < 0) {
                                this.outputConnectors[i].removeThisConnector(node.inputConnectors[i_n_c]);
                                node.inputConnectors[i_n_c].removeThisConnector(this.outputConnectors[i]);
                            }
                        }
                    }
                }
            }
        }
        for (var i = 0; i < this.errorConnectors.length; i++) {
            if (this.errorConnectors[i].conectedNodes.length > 0) {
                var conecteds = this.errorConnectors[i].conectedNodes;
                for (var j = 0; j < conecteds.length; j++) {
                    var node = findNodeInArray(array, conecteds[j].originNode.id);
                    if (!node) {
                        this.errorConnectors[i].removeThisConnector(conecteds[j]);
                        j--;
                    }
                    else {
                        //Exists buy maybe it hasnt us
                        for (var i_n_c = 0; i_n_c < node.inputConnectors.length; i_n_c++) {
                            var posCon = node.inputConnectors[i_n_c].findConnector(this.errorConnectors[i]);
                            //Problem here if used !posCon because if posCon=0 => true and we want posCon=== null
                            if (posCon === null || posCon < 0) {
                                this.errorConnectors[i].removeThisConnector(node.inputConnectors[i_n_c]);
                                node.inputConnectors[i_n_c].removeThisConnector(this.errorConnectors[i]);
                            }
                        }
                    }
                }
            }
        }
    };
    return PipelineNode;
}());

/**
 *
 * @param data The new PipelineNode
 */
function pipelineNodeFromJSON(data) {
    var node = new PipelineNode(data.name, data.tag, data.type);
    if (data.id)
        node.id = data.id;
    if (data.outputParams)
        node.outputParams = data.outputParams;
    if (data.inputParams)
        node.inputParams = data.inputParams;
    if (data.errorParams)
        node.errorParams = data.errorParams;
    if (data.properties)
        node.properties = data.properties;
    if (data.x && typeof data.x === 'number')
        node.x = data.x;
    if (data.y && typeof data.y === 'number')
        node.y = data.y;
    if (data.height && typeof data.height === 'number')
        node.height = data.height;
    if (data.width && typeof data.width === 'number')
        node.width = data.width;
    if (data.pipe)
        node.pipe = data.pipe;
    if (data.status)
        node.status = data.status;
    if (data.inputConnectors)
        node.inputConnectors = connectorsFromJSONarray(data.inputConnectors, 0, node);
    if (data.outputConnectors)
        node.outputConnectors = connectorsFromJSONarray(data.outputConnectors, 1, node);
    if (data.errorConnectors)
        node.errorConnectors = connectorsFromJSONarray(data.errorConnectors, 2, node);
    node.recalculate();
    return node;
}
/**
 * Atributes for a pipeline node
 */
var PipelineNodeAtribute = /** @class */ (function () {
    function PipelineNodeAtribute() {
        /**
         * Default value
         */
        this.value = "";
        /**
         * Default value
         */
        this.decoratorValue = this.value;
    }
    return PipelineNodeAtribute;
}());

var NODE_ATTR = {
    string: 'STRING',
    number: 'NUMBER',
    url: 'URL',
    boolean: 'BOOLEAN',
    select: 'SELECT',
    time: 'TIME',
    folder: 'FOLDER',
    file: 'FILE',
    error: 'ERROR',
    SCAN_REPORT: 'SCAN_REPORT',
    ip: 'IP',
    port: 'PORT'
};
/**
 * Conector de un Nodo. Pueden conectarse varios Nodos a este conector.
 */
var NodeConnector = /** @class */ (function () {
    function NodeConnector(id) {
        this.x = 11;
        this.y = 11;
        this.type = 0;
        this.originNode = null;
        this.conectedNodes = [];
        this.id = id;
    }
    /**
     * Serialize the object to a JSON format witouth references
     */
    NodeConnector.prototype.toJSON = function () {
        var ret = {};
        ret.id = this.id;
        ret.conectedNodes = this.conectedNodes.map(function (val, i, arr) {
            var aux = {};
            aux.id = val.id;
            aux.type = val.type;
            aux.originNode = val.originNode.id;
            return aux;
        });
        return ret;
    };
    /**
     * Busca el conector y lo elimina de nuestra lista de conexiones
     * @param con
     */
    NodeConnector.prototype.removeThisConnector = function (con) {
        for (var i = 0; i < this.conectedNodes.length; i++) {
            if (this.conectedNodes[i] === con) {
                this.conectedNodes.splice(i, 1);
                con.removeThisConnector(this);
                break;
            }
            else if (this.conectedNodes[i].originNode && this.conectedNodes[i].originNode.pipe === "") {
                this.conectedNodes.splice(i, 1);
                con.removeThisConnector(this);
                break;
            }
        }
    };
    NodeConnector.prototype.findConnector = function (con) {
        for (var i = 0; i < this.conectedNodes.length; i++) {
            if (this.conectedNodes[i] === con || this.conectedNodes[i].id === con.id) {
                return i;
            }
        }
        return null;
    };
    /**
     * Une dos conectores
     * @param con
     */
    NodeConnector.prototype.joinToConnector = function (con) {
        if (con.originNode !== this.originNode && con.addConnector(this) && this.addConnector(con)) {
            return true;
        }
        else {
            this.removeThisConnector(con);
            return false;
        }
    };
    /**
     * Añade un conector a nuestra lista. Devuelve true si lo logra y si no false.
     * @param con
     */
    NodeConnector.prototype.addConnector = function (con) {
        for (var i = 0; i < this.conectedNodes.length; i++) {
            if (this.conectedNodes[i].id === con.id) {
                this.conectedNodes[i] = con;
                return false;
            }
        }
        if (this.type === IO_TYPES.INPUT && (con.type === IO_TYPES.ERR || con.type === IO_TYPES.OUTPUT)) {
            this.conectedNodes.push(con);
            return true;
        }
        else if (con.type === IO_TYPES.INPUT && (this.type === IO_TYPES.ERR || this.type === IO_TYPES.OUTPUT)) {
            this.conectedNodes.push(con);
            return true;
        }
    };
    return NodeConnector;
}());

function connectorsFromJSONarray(array, type, originNode) {
    var conectors = [];
    for (var i = 0; i < array.length; i++) {
        conectors.push(nodeConnectorFromJSON(array[i], originNode, type));
    }
    return conectors;
}
function nodeConnectorFromJSON(data, originNode, type) {
    var aux = new NodeConnector(data.id ? data.id : generateIdForConnector());
    aux.x = data.x || 0;
    aux.y = data.y || 0;
    aux.type = type;
    if (originNode)
        aux.originNode = originNode;
    if (data.conectedNodes) {
        aux.conectedNodes = data.conectedNodes.map(function (val, i, arr) {
            var ret = new NodeConnector(val.id);
            ret.type = val.type;
            if (typeof val.originNode === 'string') {
                ret.originNode = new PipelineNode("", "");
                ret.originNode.id = val.originNode;
            }
            return ret;
        });
    }
    return aux;
}
function findNodeInArray(array, nodeID) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].id === nodeID) {
            return array[i];
        }
    }
    return null;
}
function generateIdForConnector() {
    return Date.now().toString(36).substring(6, 15) + Math.random().toString(36).substring(2, 7);
}


/***/ }),

/***/ "./src/app/pipeline/pipeline-edit/pipeline-edit.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pipeline/pipeline-edit/pipeline-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n  <h4 class=\"modal-title\">{{pipeline.name}}</h4>\r\n  <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\r\n    <span aria-hidden=\"true\">&times;</span>\r\n  </button>\r\n</div>\r\n<div class=\"modal-body\">\r\n  <form class=\"col-sm-12\">\r\n    <div class=\"form-group row\">\r\n      <label class=\"col-sm-4\" for=\"pipeName\">Pipeline Name</label>\r\n      <input type=\"text\" class=\"form-control col-sm-8\" name=\"name\" id=\"pipeName\" placeholder=\"Pipeline Name\" [(ngModel)]=\"pipeline.name\">\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"pipelineDescription\">Pipeline Description</label>\r\n      <textarea class=\"form-control\" id=\"pipelineDescription\" rows=\"3\" name=\"description\" [(ngModel)]=\"pipeline.description\"></textarea>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"pipelineStatus\">Pipeline Status</label>\r\n      <select class=\"custom-select\" name=\"pipelineStatus\" id=\"pipelineStatus\" [(ngModel)]=\"pipeline.status\">\r\n        <option [value]=\"0\" [selected]=\"pipeline.status === 0\">WAITING</option>\r\n        <option [value]=\"1\" [selected]=\"pipeline.status === 1\">STARTED</option>\r\n        <option [value]=\"2\" [selected]=\"pipeline.status === 2\">SUCCESS</option>\r\n        <option [value]=\"3\" [selected]=\"pipeline.status === 3\">ERROR</option>\r\n        <option [value]=\"4\" [selected]=\"pipeline.status === 4\">END</option>\r\n        <option [value]=\"5\" [selected]=\"pipeline.status === 5\">INACTIVE</option>\r\n      </select>\r\n    </div>\r\n    <div class=\"btn-group d-flex\" role=\"group\">\r\n      <button type=\"submit\" class=\"btn btn-primary w-100\" (click)=\"save()\" title=\"Saves the current pipeline\">\r\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 49 49\"\r\n          xml:space=\"preserve\" height=\"24px\" width=\"24px\" style=\"fill: #ffffff\">\r\n          <g>\r\n            <path d=\"M39.914,0H37.5h-28h-9v49h7h33h8V8.586L39.914,0z M35.5,2v14h-24V2H35.5z M9.5,47V28h29v19H9.5z M46.5,47h-6V26h-33v21h-5\r\n                      V2h7v16h28V2h1.586L46.5,9.414V47z\" />\r\n            <path d=\"M13.5,33h7c0.553,0,1-0.447,1-1s-0.447-1-1-1h-7c-0.553,0-1,0.447-1,1S12.947,33,13.5,33z\" />\r\n            <path d=\"M23.5,35h-10c-0.553,0-1,0.447-1,1s0.447,1,1,1h10c0.553,0,1-0.447,1-1S24.053,35,23.5,35z\" />\r\n            <path d=\"M25.79,35.29c-0.181,0.189-0.29,0.45-0.29,0.71s0.109,0.52,0.29,0.71C25.979,36.89,26.229,37,26.5,37\r\n                      c0.26,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71s-0.11-0.521-0.29-0.71C26.84,34.92,26.16,34.92,25.79,35.29z\"\r\n            />\r\n            <path d=\"M33.5,4h-6v10h6V4z M31.5,12h-2V6h2V12z\" />\r\n          </g>\r\n        </svg>\r\n      </button>\r\n      <button type=\"submit\" class=\"btn btn-secondary w-100\" (click)=\"cancel()\" title=\"Cancels the cahanges done to the pipeline\">\r\n        <svg width=\"24px\" height=\"24px\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\"\r\n          x=\"0px\" y=\"0px\" viewBox=\"0 0 212.982 212.982\" xml:space=\"preserve\" style=\"fill: #ffffff\">\r\n          <g>\r\n            <path style=\"fill-rule:evenodd;clip-rule:evenodd;\" d=\"M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312   c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312   l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937   c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z\"\r\n              fill=\"#FFFFFF\" />\r\n          </g>\r\n        </svg>\r\n      </button>\r\n      <button type=\"submit\" class=\"btn btn-danger w-100\" data-toggle=\"modal\" data-target=\"#deleteModal\" (click)=\"deleteModal(content)\"\r\n        title=\"Delete the current pipeline\">\r\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"24px\"\r\n          height=\"24px\" viewBox=\"0 0 774.266 774.266\" style=\"fill: #ffffff\" xml:space=\"preserve\">\r\n          <g>\r\n            <path d=\"M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875\r\n                        C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916\r\n                        c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703\r\n                        c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z\r\n                        M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282\r\n                        c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802\r\n                        H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z\" />\r\n            <rect x=\"475.031\" y=\"286.593\" width=\"48.418\" height=\"396.942\" />\r\n            <rect x=\"363.361\" y=\"286.593\" width=\"48.418\" height=\"396.942\" />\r\n            <rect x=\"251.69\" y=\"286.593\" width=\"48.418\" height=\"396.942\" />\r\n          </g>\r\n        </svg>\r\n      </button>\r\n    </div>\r\n  </form>\r\n</div>\r\n<ng-template #content let-c=\"close\" let-d=\"dismiss\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"deleteModalLabel\">Are you sure?</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"c('Close click')\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        Do you want to delet the node \"{{pipeline.name}}\"?\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"d('Close click')\">Cancel</button>\r\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"sureDelete();c('Close click');\">Remove</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</ng-template>"

/***/ }),

/***/ "./src/app/pipeline/pipeline-edit/pipeline-edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipelineEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipeline__ = __webpack_require__("./src/app/pipeline/pipeline.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pipeline_service__ = __webpack_require__("./src/app/pipeline/pipeline.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PipelineEditComponent = /** @class */ (function () {
    function PipelineEditComponent(pipService, modalService, activeModal, alert) {
        this.pipService = pipService;
        this.modalService = modalService;
        this.activeModal = activeModal;
        this.alert = alert;
    }
    Object.defineProperty(PipelineEditComponent.prototype, "pipeline", {
        get: function () {
            return this._pipeline;
        },
        set: function (pipe) {
            this._pipeline = pipe;
            this._pipelineCopy = Object.assign({}, pipe);
        },
        enumerable: true,
        configurable: true
    });
    PipelineEditComponent.prototype.ngOnInit = function () {
    };
    PipelineEditComponent.prototype.save = function () {
        var _this = this;
        this.pipService.updatePipeline(this._pipeline).subscribe(function (data) {
            _this.alert.success('Pipeline Updated');
        }, function (err) {
            _this.alert.error('Cant update pipeline');
        });
    };
    PipelineEditComponent.prototype.cancel = function () {
        Object.assign(this._pipeline, this._pipelineCopy);
    };
    PipelineEditComponent.prototype.delete = function () {
        var _this = this;
        this.pipService.deletePipeline(this._pipeline).subscribe(function (data) {
            _this.alert.success('Pipeline Deleted');
        }, function (err) {
            _this.alert.error('Cant delete pipeline');
        });
    };
    PipelineEditComponent.prototype.sureDelete = function () {
        this.delete();
        this.activeModal.close('Close click');
    };
    PipelineEditComponent.prototype.deleteModal = function (content) {
        this.modalService.open(content).result.then(function (result) {
        }, function (reason) {
        }).catch(function (err) {
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline__["a" /* Pipeline */]),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__pipeline__["a" /* Pipeline */]])
    ], PipelineEditComponent.prototype, "pipeline", null);
    PipelineEditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'pipeline-edit',
            template: __webpack_require__("./src/app/pipeline/pipeline-edit/pipeline-edit.component.html"),
            styles: [__webpack_require__("./src/app/pipeline/pipeline-edit/pipeline-edit.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__pipeline_service__["a" /* PipelineService */], __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["a" /* NgbActiveModal */], __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__["a" /* AlertService */]])
    ], PipelineEditComponent);
    return PipelineEditComponent;
}());



/***/ }),

/***/ "./src/app/pipeline/pipeline-mouse.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipelineMouseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PipelineMouseService = /** @class */ (function () {
    function PipelineMouseService(alertService) {
        var _this = this;
        this.alertService = alertService;
        this.nodes = [];
        this.pullerObserver = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.subscriber = observer;
        });
    }
    PipelineMouseService.prototype.getMouseEvents = function () {
        return this.pullerObserver;
    };
    PipelineMouseService.prototype.sendMouseEvent = function (event) {
        try {
            this.subscriber.next(event);
        }
        catch (err) { }
    };
    PipelineMouseService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__alert_alert_service__["a" /* AlertService */]])
    ], PipelineMouseService);
    return PipelineMouseService;
}());



/***/ }),

/***/ "./src/app/pipeline/pipeline-new/pipeline-new.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pipeline/pipeline-new/pipeline-new.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"pipe\">\r\n  <form>\r\n    <div class=\"card\">\r\n      <div class=\"card-header\">\r\n        <!--HEADER -->\r\n        <div class=\"form-group row\">\r\n          <label for=\"pipeName\" class=\"col-sm-2 col-form-label\">Pipeline Name</label>\r\n          <div class=\"col-sm-10\">\r\n            <input type=\"text\" class=\"form-control\" name=\"name\" id=\"pipeName\" placeholder=\"Pipeline Name\" [(ngModel)]=\"pipe.name\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"card-body\">\r\n        <div class=\"form-group\">\r\n          <label for=\"pipelineDescription\">Pipeline Description</label>\r\n          <textarea class=\"form-control\" id=\"pipelineDescription\" rows=\"3\" name=\"description\" [(ngModel)]=\"pipe.description\"></textarea>\r\n        </div>\r\n        <button type=\"submit\" class=\"btn btn-primary\" (click)=\"save()\">Save</button>\r\n        <button type=\"submit\" class=\"btn btn-primary\" (click)=\"cancel()\">Cancel</button>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</div>"

/***/ }),

/***/ "./src/app/pipeline/pipeline-new/pipeline-new.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipelineNewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipeline__ = __webpack_require__("./src/app/pipeline/pipeline.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pipeline_service__ = __webpack_require__("./src/app/pipeline/pipeline.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * With this component we can create a new Pipeline
 */
var PipelineNewComponent = /** @class */ (function () {
    function PipelineNewComponent(pipService, alertService) {
        this.pipService = pipService;
        this.alertService = alertService;
        this.completed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    PipelineNewComponent.prototype.ngOnInit = function () {
    };
    PipelineNewComponent.prototype.save = function () {
        var _this = this;
        this.pipe.status = 5;
        this.pipService.createPipeline(this.pipe).subscribe(function (data) {
            _this.alertService.success('Suscessfully saved pipeline');
            return data;
        }, function (err) {
            _this.alertService.warn('message' in err.error ? err.error.message : 'Cant save Pipeline');
        });
    };
    PipelineNewComponent.prototype.cancel = function () {
        this.pipe = null;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline__["a" /* Pipeline */])
    ], PipelineNewComponent.prototype, "pipe", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PipelineNewComponent.prototype, "completed", void 0);
    PipelineNewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'pipeline-new',
            template: __webpack_require__("./src/app/pipeline/pipeline-new/pipeline-new.component.html"),
            styles: [__webpack_require__("./src/app/pipeline/pipeline-new/pipeline-new.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__pipeline_service__["a" /* PipelineService */], __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__["a" /* AlertService */]])
    ], PipelineNewComponent);
    return PipelineNewComponent;
}());



/***/ }),

/***/ "./src/app/pipeline/pipeline-node-edit/pipeline-node-edit.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pipeline/pipeline-node-edit/pipeline-node-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n  <h4 class=\"modal-title\">{{node.name}}</h4>\r\n  <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\r\n    <span aria-hidden=\"true\">&times;</span>\r\n  </button>\r\n</div>\r\n<div *ngIf=\"node\" class=\"modal-body\">\r\n\r\n  <form class=\"col-sm-12\">\r\n    <div class=\"form-group row\">\r\n      <label class=\"col-sm-4\" for=\"nodeName\">Node Name</label>\r\n      <input type=\"text\" class=\"form-control col-sm-8\" name=\"name\" id=\"nodeName\" placeholder=\"Node Name\" [(ngModel)]=\"node.name\">\r\n    </div>\r\n    <node-types [node]=\"node\"></node-types>\r\n    <hr/>\r\n    <div class=\"btn-group mr-2  d-flex\">\r\n      <button class=\"btn btn-sm btn-outline-secondary w-100\" (click)=\"addInConnector()\">+Inputs</button>\r\n      <button class=\"btn btn-sm btn-outline-secondary w-100\" (click)=\"node.deleteInput()\">-Inputs</button>\r\n    </div>\r\n    <div class=\"form-group row\">\r\n      <label class=\"col-sm-4\" for=\"nodeName\">Node Status</label>\r\n      <select class=\"custom-select\" name=\"nodeStatus\" id=\"nodeStatus\" [(ngModel)]=\"node.status\">\r\n        <option [value]=\"0\" [selected]=\"node.status === 0\">WAITING</option>\r\n        <option [value]=\"1\" [selected]=\"node.status === 1\">STARTED</option>\r\n        <option [value]=\"2\" [selected]=\"node.status === 2\">SUCCESS</option>\r\n        <option [value]=\"3\" [selected]=\"node.status === 3\">ERROR</option>\r\n        <option [value]=\"4\" [selected]=\"node.status === 4\">END</option>\r\n        <option [value]=\"5\" [selected]=\"node.status === 5\">INACTIVE</option>\r\n      </select>\r\n    </div>\r\n    <dl class=\"row\">\r\n      <dt class=\"col-sm-1\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The ID of the node\">ID</dt>\r\n      <dd class=\"col-sm-11\">{{node.id}}</dd>\r\n    </dl>\r\n    <dl class=\"row\">\r\n      <dt class=\"col-sm-3\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The TAG of the node\">Node TAG</dt>\r\n      <dd class=\"col-sm-9\">{{node.tag}}</dd>\r\n    </dl>\r\n    <div class=\"btn-group d-flex\" role=\"group\">\r\n      <button type=\"submit\" class=\"btn btn-primary w-100\" (click)=\"save()\" title=\"Saves the current node\">\r\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 49 49\"\r\n          xml:space=\"preserve\" height=\"24px\" width=\"24px\" style=\"fill: #ffffff\">\r\n          <g>\r\n            <path d=\"M39.914,0H37.5h-28h-9v49h7h33h8V8.586L39.914,0z M35.5,2v14h-24V2H35.5z M9.5,47V28h29v19H9.5z M46.5,47h-6V26h-33v21h-5\r\n                    V2h7v16h28V2h1.586L46.5,9.414V47z\" />\r\n            <path d=\"M13.5,33h7c0.553,0,1-0.447,1-1s-0.447-1-1-1h-7c-0.553,0-1,0.447-1,1S12.947,33,13.5,33z\" />\r\n            <path d=\"M23.5,35h-10c-0.553,0-1,0.447-1,1s0.447,1,1,1h10c0.553,0,1-0.447,1-1S24.053,35,23.5,35z\" />\r\n            <path d=\"M25.79,35.29c-0.181,0.189-0.29,0.45-0.29,0.71s0.109,0.52,0.29,0.71C25.979,36.89,26.229,37,26.5,37\r\n                    c0.26,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71s-0.11-0.521-0.29-0.71C26.84,34.92,26.16,34.92,25.79,35.29z\"\r\n            />\r\n            <path d=\"M33.5,4h-6v10h6V4z M31.5,12h-2V6h2V12z\" />\r\n          </g>\r\n        </svg>\r\n      </button>\r\n      <button type=\"submit\" class=\"btn btn-secondary w-100\" (click)=\"cancel()\" title=\"Cancels the cahanges done to the node\">\r\n        <svg width=\"24px\" height=\"24px\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\"\r\n          x=\"0px\" y=\"0px\" viewBox=\"0 0 212.982 212.982\" xml:space=\"preserve\" style=\"fill: #ffffff\">\r\n          <g>\r\n            <path style=\"fill-rule:evenodd;clip-rule:evenodd;\" d=\"M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312   c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312   l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937   c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z\"\r\n              fill=\"#FFFFFF\" />\r\n          </g>\r\n        </svg>\r\n      </button>\r\n      <button type=\"submit\" class=\"btn btn-danger w-100\" data-toggle=\"modal\" data-target=\"#deleteModal\" (click)=\"deleteModal(content)\"\r\n        title=\"Delete the current node\">\r\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"24px\"\r\n          height=\"24px\" viewBox=\"0 0 774.266 774.266\" style=\"fill: #ffffff\" xml:space=\"preserve\">\r\n          <g>\r\n            <path d=\"M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875\r\n                      C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916\r\n                      c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703\r\n                      c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z\r\n                      M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282\r\n                      c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802\r\n                      H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z\" />\r\n            <rect x=\"475.031\" y=\"286.593\" width=\"48.418\" height=\"396.942\" />\r\n            <rect x=\"363.361\" y=\"286.593\" width=\"48.418\" height=\"396.942\" />\r\n            <rect x=\"251.69\" y=\"286.593\" width=\"48.418\" height=\"396.942\" />\r\n          </g>\r\n        </svg>\r\n      </button>\r\n    </div>\r\n  </form>\r\n</div>\r\n<ng-template #content let-c=\"close\" let-d=\"dismiss\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"deleteModalLabel\">Are you sure?</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"c('Close click')\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        Do you want to delet the pipeline named \"{{node.name}}\"?\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"d('Close click')\">Cancel</button>\r\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"sureDelete();c('Close click');\">Remove</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</ng-template>"

/***/ }),

/***/ "./src/app/pipeline/pipeline-node-edit/pipeline-node-edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipelineNodeEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node__ = __webpack_require__("./src/app/pipeline/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pipeline_service__ = __webpack_require__("./src/app/pipeline/pipeline.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PipelineNodeEditComponent = /** @class */ (function () {
    function PipelineNodeEditComponent(alert, modalService, activeModal, pipService) {
        this.alert = alert;
        this.modalService = modalService;
        this.activeModal = activeModal;
        this.pipService = pipService;
    }
    PipelineNodeEditComponent.prototype.ngOnInit = function () {
    };
    PipelineNodeEditComponent.prototype.save = function () {
        this._node = Object.assign({}, this.node);
        this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
        }, function (err) { });
    };
    PipelineNodeEditComponent.prototype.cancel = function () {
        this.node = Object.assign(this.node, this._node);
    };
    PipelineNodeEditComponent.prototype.sureDelete = function () {
        var _this = this;
        this.node.removeMe();
        this.pipService.removeNodeForPipeline(this.node).subscribe(function (data) {
            _this.alert.clear();
            _this.alert.success("Deleted");
        }, function (err) {
            _this.alert.error("Cant delete");
        });
        this.activeModal.close('Close click');
    };
    PipelineNodeEditComponent.prototype.deleteModal = function (content) {
        this.modalService.open(content).result.then(function (result) {
        }, function (reason) {
        }).catch(function (err) {
        });
    };
    PipelineNodeEditComponent.prototype.ngOnChanges = function () {
        this._node = Object.assign({}, this.node);
    };
    PipelineNodeEditComponent.prototype.addOutConnector = function () {
        this.node.createOutputConnector();
    };
    PipelineNodeEditComponent.prototype.addInConnector = function () {
        this.node.createInputConnector();
    };
    PipelineNodeEditComponent.prototype.addErrConnector = function () {
        this.node.createErrorConnector();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__node__["b" /* PipelineNode */])
    ], PipelineNodeEditComponent.prototype, "node", void 0);
    PipelineNodeEditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'pipeline-node-edit',
            template: __webpack_require__("./src/app/pipeline/pipeline-node-edit/pipeline-node-edit.component.html"),
            styles: [__webpack_require__("./src/app/pipeline/pipeline-node-edit/pipeline-node-edit.component.css")]
        })
        /**
         * For editing a PipelineNode
         */
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__alert_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["a" /* NgbActiveModal */],
            __WEBPACK_IMPORTED_MODULE_4__pipeline_service__["a" /* PipelineService */]])
    ], PipelineNodeEditComponent);
    return PipelineNodeEditComponent;
}());



/***/ }),

/***/ "./src/app/pipeline/pipeline-node-new/pipeline-node-new.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pipeline/pipeline-node-new/pipeline-node-new.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  pipeline-node-new works!\n</p>\n"

/***/ }),

/***/ "./src/app/pipeline/pipeline-node-new/pipeline-node-new.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipelineNodeNewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PipelineNodeNewComponent = /** @class */ (function () {
    function PipelineNodeNewComponent() {
    }
    PipelineNodeNewComponent.prototype.ngOnInit = function () {
    };
    PipelineNodeNewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-pipeline-node-new',
            template: __webpack_require__("./src/app/pipeline/pipeline-node-new/pipeline-node-new.component.html"),
            styles: [__webpack_require__("./src/app/pipeline/pipeline-node-new/pipeline-node-new.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PipelineNodeNewComponent);
    return PipelineNodeNewComponent;
}());



/***/ }),

/***/ "./src/app/pipeline/pipeline-node/node-connector.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pipeline/pipeline-node/node-connector.component.html":
/***/ (function(module, exports) {

module.exports = "<svg:circle [node-pipe-me-directive]=\"connector\"  [attr.cx]=\"connector.x\"\r\n    [attr.cy]=\"connector.y\" r=\"10\" [attr.fill]=\"(connector.type === 0) ? 'green' :(connector.type === 1) ? 'blue' : 'red' \" stroke=\"black\" stroke-width=\"1\" style=\"cursor:crosshair;\" />"

/***/ }),

/***/ "./src/app/pipeline/pipeline-node/node-connector.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeConnectorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node__ = __webpack_require__("./src/app/pipeline/node.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * SVG Component.
 * Use this component as:
 * <svg:g pipeline-node  [node]="node"/>
 */
var NodeConnectorComponent = /** @class */ (function () {
    function NodeConnectorComponent(el) {
        this.el = el;
    }
    NodeConnectorComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__node__["a" /* NodeConnector */])
    ], NodeConnectorComponent.prototype, "connector", void 0);
    NodeConnectorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'svg:g[node-connector]',
            template: __webpack_require__("./src/app/pipeline/pipeline-node/node-connector.component.html"),
            styles: [__webpack_require__("./src/app/pipeline/pipeline-node/node-connector.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], NodeConnectorComponent);
    return NodeConnectorComponent;
}());



/***/ }),

/***/ "./src/app/pipeline/pipeline-node/node-move.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeMoveDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node__ = __webpack_require__("./src/app/pipeline/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pipeline_mouse_service__ = __webpack_require__("./src/app/pipeline/pipeline-mouse.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NodeMoveDirective = /** @class */ (function () {
    // Tambien la proporcion en el eje X (Global Position vs Local Position)
    function NodeMoveDirective(el, pipMouseService) {
        this.el = el;
        this.pipMouseService = pipMouseService;
    }
    NodeMoveDirective.prototype.onMouseDown = function (event) {
        var _this = this;
        var subscription;
        var lastX = 0;
        var lastY = 0;
        subscription = this.pipMouseService.getMouseEvents().subscribe(function (event) {
            if (event.name === "mousemove") {
                if (lastX === 0 && lastY === 0) {
                }
                else {
                    _this.moveNode((event.x - lastX), (event.y - lastY));
                }
                lastX = event.x;
                lastY = event.y;
            }
            else if (event.name === "mouseup") {
                _this.moveNode((event.x - lastX), (event.y - lastY));
                subscription.unsubscribe();
            }
            else if (event.name === "mouseleave") {
                subscription.unsubscribe();
            }
        });
    };
    /**
     * Moves the node. Protects the movement from draganddrop errors
     * @param difX
     * @param difY
     */
    NodeMoveDirective.prototype.moveNode = function (difX, difY) {
        if (difX < 200 && difX < 200) {
            this.node.x += difX;
            this.node.y += difY;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('node-move-directive'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__node__["b" /* PipelineNode */])
    ], NodeMoveDirective.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NodeMoveDirective.prototype, "onMouseDown", null);
    NodeMoveDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'svg:rect[node-move-directive]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_2__pipeline_mouse_service__["a" /* PipelineMouseService */]])
    ], NodeMoveDirective);
    return NodeMoveDirective;
}());



/***/ }),

/***/ "./src/app/pipeline/pipeline-node/node-pipeme.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodePipeMeDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node__ = __webpack_require__("./src/app/pipeline/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hose_pipe_service__ = __webpack_require__("./src/app/pipeline/hose-pipe.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipeline_mouse_service__ = __webpack_require__("./src/app/pipeline/pipeline-mouse.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NodePipeMeDirective = /** @class */ (function () {
    function NodePipeMeDirective(el, hosePipeService, pipeMouseService) {
        this.el = el;
        this.hosePipeService = hosePipeService;
        this.pipeMouseService = pipeMouseService;
        this.hosepipe = hosePipeService.getHosePipe();
    }
    NodePipeMeDirective.prototype.onMouseDown = function (event) {
        var _this = this;
        if (event.target == this.el.nativeElement) {
            this.hosepipe.active = true;
            this.hosePipeService.clean();
            this.hosePipeService.setOrigin(this.nodeConnector);
            var subscription_1;
            var lastX_1 = 0;
            var lastY_1 = 0;
            subscription_1 = this.pipeMouseService.getMouseEvents().subscribe(function (event) {
                if (event.name === "mousemove") {
                    if (lastX_1 === 0 && lastY_1 === 0) {
                        _this.hosepipe.x = _this.nodeConnector.x + _this.nodeConnector.originNode.x;
                        _this.hosepipe.y = _this.nodeConnector.y + _this.nodeConnector.originNode.y;
                    }
                    else {
                        _this.hosepipe.x += (event.x - lastX_1);
                        _this.hosepipe.y += (event.y - lastY_1);
                    }
                    lastX_1 = event.x;
                    lastY_1 = event.y;
                }
                else if (event.name === "mouseup") {
                    _this.hosePipeService.clean();
                    subscription_1.unsubscribe();
                }
                else if (event.name === "mouseleave") {
                    subscription_1.unsubscribe();
                    _this.hosePipeService.clean();
                }
            });
        }
    };
    NodePipeMeDirective.prototype.onMouseUp = function (event) {
        if (event.target == this.el.nativeElement) {
            if (!this.hosepipe.active) {
                this.hosePipeService.clean();
            }
            else {
                //--------------------------------- TODO refactorizar para tener en cuenta los parametros de entrada y salida
                this.hosepipe.realOrigin.joinToConnector(this.nodeConnector);
                this.hosePipeService.clean();
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('node-pipe-me-directive'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__node__["a" /* NodeConnector */])
    ], NodePipeMeDirective.prototype, "nodeConnector", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NodePipeMeDirective.prototype, "onMouseDown", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NodePipeMeDirective.prototype, "onMouseUp", null);
    NodePipeMeDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'svg:circle[node-pipe-me-directive]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_2__hose_pipe_service__["a" /* HosePipeService */], __WEBPACK_IMPORTED_MODULE_3__pipeline_mouse_service__["a" /* PipelineMouseService */]])
    ], NodePipeMeDirective);
    return NodePipeMeDirective;
}());



/***/ }),

/***/ "./src/app/pipeline/pipeline-node/node-resize.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeResizeDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node__ = __webpack_require__("./src/app/pipeline/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pipeline_mouse_service__ = __webpack_require__("./src/app/pipeline/pipeline-mouse.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NodeResizeDirective = /** @class */ (function () {
    function NodeResizeDirective(el, pipMouseService) {
        this.el = el;
        this.pipMouseService = pipMouseService;
    }
    NodeResizeDirective.prototype.onMouseDown = function (event) {
        var _this = this;
        var subscription;
        var lastX = 0;
        var lastY = 0;
        subscription = this.pipMouseService.getMouseEvents().subscribe(function (event) {
            if (event.name === "mousemove") {
                if (lastX === 0 && lastY === 0) {
                }
                else {
                    _this.node.width += (event.x - lastX);
                    _this.node.height += (event.y - lastY);
                    if (_this.node.width < __WEBPACK_IMPORTED_MODULE_1__node__["e" /* minWidth */]) {
                        _this.node.width = __WEBPACK_IMPORTED_MODULE_1__node__["e" /* minWidth */];
                    }
                    if (_this.node.height < __WEBPACK_IMPORTED_MODULE_1__node__["d" /* minHeight */]) {
                        _this.node.height = __WEBPACK_IMPORTED_MODULE_1__node__["d" /* minHeight */];
                    }
                }
                _this.node.recalculate();
                lastX = event.x;
                lastY = event.y;
            }
            else if (event.name === "mouseup") {
                _this.node.width += (event.x - lastX);
                _this.node.height += (event.y - lastY);
                _this.node.recalculate();
                subscription.unsubscribe();
            }
            else if (event.name === "mouseleave") {
                subscription.unsubscribe();
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('node-resize-directive'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__node__["b" /* PipelineNode */])
    ], NodeResizeDirective.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NodeResizeDirective.prototype, "onMouseDown", null);
    NodeResizeDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'svg:rect[node-resize-directive]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_2__pipeline_mouse_service__["a" /* PipelineMouseService */]])
    ], NodeResizeDirective);
    return NodeResizeDirective;
}());



/***/ }),

/***/ "./src/app/pipeline/pipeline-node/pipeline-node.component.css":
/***/ (function(module, exports) {

module.exports = ".pipe-card {\r\n  fill-opacity:0.6;\r\n  fill:#909090;\r\n}\r\n.pipe-card-head {\r\n  fill-opacity:0.6;\r\n  fill:#848077;\r\n}\r\n.pipe-card-vert {\r\n  fill-opacity:0;\r\n  cursor: n-resize;\r\n}\r\n.pipe-card-diag-left {\r\n  fill-opacity:0;\r\n  cursor: nw-resize;\r\n}\r\n.pipe-card-diag-right {\r\n  fill-opacity:0;\r\n  cursor: ne-resize;\r\n}\r\n.pipe-card-horiz {\r\n  fill-opacity:0;\r\n  cursor: e-resize;\r\n}\r\n.pipe-card-move {\r\n  fill-opacity:0;\r\n  cursor: move;\r\n}\r\nsvg text {\r\n    -webkit-user-select: none;\r\n       -moz-user-select: none;\r\n        -ms-user-select: none;\r\n            user-select: none;\r\n}\r\nsvg text::-moz-selection {\r\n    background: none;\r\n}\r\nsvg text::selection {\r\n    background: none;\r\n}"

/***/ }),

/***/ "./src/app/pipeline/pipeline-node/pipeline-node.component.html":
/***/ (function(module, exports) {

module.exports = "<svg:rect #content class=\"pipe-card\" x=\"10\" y=\"10\" [attr.height]=\"node.height-20\" [attr.width]=\"node.width-20\" rx=\"20\" ry=\"20\"\r\n    [attr.stroke]=\"node.selected ? 'green' :'black'\" stroke-width=\"1.5\" />\r\n<!---->\r\n<svg:svg x=\"10\" y=\"10\" height=\"40\" [attr.width]=\"node.width-20\">\r\n    <svg:path [attr.d]=\"'M1 40 V21 Q1 1 21 1 H' + (node.width-40) + ' Q' + (node.width-20) + ' 1 ' + (node.width) + ' 21' + ' V40z'\"\r\n        class=\"pipe-card-head\" />\r\n    <svg:path [attr.d]=\"'M1 40 V21 Q1 1 21 1 H41 V40z'\" [attr.fill]=\"statusColor\" stroke=\"black\" sroke-width=\"1.5\" />\r\n    <svg:text [attr.x]=\"50\" [attr.y]=\"30\" fill=\"black\" font-family=\"Arial\" font-size=\"30\">{{node.name}}</svg:text>\r\n</svg:svg>\r\n<svg:svg x=\"30\" y=\"40\" [attr.height]=\"node.height - 50\" [attr.width]=\"node.width-50\">\r\n    <!-- Aqui ira el contenido. Solo los parametros que acepta de entrada del nodo que recibe -->\r\n    <svg:g *ngFor=\"let prop of showProperties;let i = index\">\r\n        <svg:text  [attr.x]=\"5\" [attr.y]=\"35 + 70*i\" fill=\"black\" font-family=\"Arial\" font-size=\"30\">{{prop.nickname || prop.name}}:</svg:text>\r\n        <svg:text  [attr.x]=\"50\" [attr.y]=\"70 + 70*i\" fill=\"black\" font-family=\"Arial\" font-size=\"30\">{{prop.decoratorValue || prop.value}}</svg:text>\r\n    </svg:g>\r\n</svg:svg>\r\n<svg:rect [node-move-directive]=\"node\" #content class=\"pipe-card-move\" *ngIf=\"node\" x=\"10\" y=\"10\" [attr.height]=\"node.height - 20\"\r\n    [attr.width]=\"node.width - 20\" rx=\"20\" ry=\"20\" (click)=\"selectElement()\" />\r\n<svg:g node-connector *ngFor=\"let connector of node.inputConnectors\" [connector]=\"connector\">\r\n\r\n</svg:g>\r\n<svg:g node-connector *ngFor=\"let connector of node.outputConnectors\" [connector]=\"connector\">\r\n\r\n</svg:g>\r\n<svg:g node-connector *ngFor=\"let connector of node.errorConnectors\" [connector]=\"connector\">\r\n\r\n</svg:g>\r\n<!-- Scale Diag BOT-RIGHT-->\r\n<svg:path [attr.d]=\"'M' + (node.width-20) + ' ' + (node.height-30) + ' V' + (node.height-20) + ' H' + (node.width-30) +'z'\"\r\n    fill=\"black\" stroke=\"black\" sroke-width=\"1\" />\r\n<svg:rect [node-resize-directive]=\"node\" class=\"pipe-card-diag-left\" [attr.x]=\"node.width-40\" [attr.y]=\"node.height-40\" height=\"40\"\r\n    width=\"40\" />\r\n\r\n\r\n\r\n\r\n<!-- Scale  <svg:rect class=\"pipe-card-vert\" x=\"20\" y=\"0\" height=\"20\" [attr.width]=\"node.width\" />vert Superior-->\r\n\r\n<!-- Scale <svg:rect class=\"pipe-card-diag-left\" x=\"0\" y=\"0\" height=\"20\" width=\"20\" /> Diag TOP-LEFT-->\r\n\r\n<!-- Scale <svg:rect class=\"pipe-card-horiz\" x=\"0\" y=\"20\" [attr.height]=\"node.height\" width=\"20\" /> Horiz Left-->\r\n\r\n<!-- Scale <svg:rect class=\"pipe-card-diag-right\" [attr.x]=\"node.width + 20\" y=\"0\" height=\"20\" width=\"20\" /> Diag TOP-RIGHT-->\r\n\r\n<!-- Scale  <svg:rect class=\"pipe-card-horiz\" [attr.x]=\"node.width +20\" y=\"20\" [attr.height]=\"node.height\" width=\"20\" /> Horiz Right-->\r\n\r\n<!-- Scale  <svg:rect class=\"pipe-card-vert\" x=\"20\" [attr.y]=\"node.height + 20\" height=\"20\" [attr.width]=\"node.width\" />  vert Inferior -->\r\n\r\n\r\n<!-- Scale  <svg:rect class=\"pipe-card-diag-right\" x=\"0\" [attr.y]=\"node.height + 20\" height=\"20\" width=\"20\" /> Diag BOT-LEFT-->"

/***/ }),

/***/ "./src/app/pipeline/pipeline-node/pipeline-node.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipelineNodeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node__ = __webpack_require__("./src/app/pipeline/node.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PipelineNodeComponent = /** @class */ (function () {
    function PipelineNodeComponent(el) {
        this.el = el;
        this.statusColor = "green";
        this.showProperties = [];
        this.nodeClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(PipelineNodeComponent.prototype, "node", {
        get: function () {
            return this._node;
        },
        set: function (node) {
            var _this = this;
            if (this.subscription)
                this._node.subscriptor.unsubscribe();
            this._node = node;
            this.setColor();
            this.setProperties();
            this.subscription = this._node.subscriptor.subscribe(function () {
                _this.setColor();
            });
        },
        enumerable: true,
        configurable: true
    });
    PipelineNodeComponent.prototype.setColor = function () {
        switch (this._node.status) {
            case 0:
                this.statusColor = "white";
                break;
            case 1:
                this.statusColor = "blue";
                break;
            case 2:
                this.statusColor = "green";
                break;
            case 3:
                this.statusColor = "red";
                break;
            case 4:
                this.statusColor = "black";
                break;
        }
    };
    PipelineNodeComponent.prototype.ngOnInit = function () {
    };
    PipelineNodeComponent.prototype.setProperties = function () {
        var showProp;
        if ((showProp = this._node.properties.find(function (val, i, arr) {
            if (val.name === '_SHOW') {
                return true;
            }
            else {
                return false;
            }
        }))) {
            var propNames = showProp.value.split(',');
            var _loop_1 = function (searchPropertie) {
                var foundPropertie = void 0;
                if ((foundPropertie = this_1._node.properties.find(function (val, i, arr) {
                    if (val.name === searchPropertie) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }))) {
                    this_1.showProperties.push(foundPropertie);
                }
            };
            var this_1 = this;
            for (var _i = 0, propNames_1 = propNames; _i < propNames_1.length; _i++) {
                var searchPropertie = propNames_1[_i];
                _loop_1(searchPropertie);
            }
        }
    };
    PipelineNodeComponent.prototype.selectElement = function () {
        console.log(this.node);
        this.nodeClicked.emit(this.node);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PipelineNodeComponent.prototype, "nodeClicked", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__node__["b" /* PipelineNode */]),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__node__["b" /* PipelineNode */]])
    ], PipelineNodeComponent.prototype, "node", null);
    PipelineNodeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: '[pipeline-node]',
            template: __webpack_require__("./src/app/pipeline/pipeline-node/pipeline-node.component.html"),
            styles: [__webpack_require__("./src/app/pipeline/pipeline-node/pipeline-node.component.css")]
        })
        /**
         * SVG Component.
         * Use this component as:
         * <svg:g pipeline-node  [node]="node"/>
         */
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], PipelineNodeComponent);
    return PipelineNodeComponent;
}());



/***/ }),

/***/ "./src/app/pipeline/pipeline.component.css":
/***/ (function(module, exports) {

module.exports = ".fill { \r\n    min-height: 100%;\r\n    height: 100%;\r\n overflow:hidden;\r\n}\r\n"

/***/ }),

/***/ "./src/app/pipeline/pipeline.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom\">\r\n  <h1 class=\"h2\">Pipeline Visual Editor</h1>\r\n\r\n  <div class=\"btn-toolbar mb-2 mb-md-0\">\r\n    <div class=\"btn-group mr-2\">\r\n      <button class=\"btn btn-sm btn-outline-secondary\" (click)=\"newPipeline()\" title=\"Create a new Pipline\">New Pipeline</button>\r\n      <button class=\"btn btn-sm btn-outline-secondary\" (click)=\"editPipeline()\" title=\"Edits the current Pipline\">Edit Pipeline</button>\r\n      <button class=\"btn btn-sm btn-outline-secondary\" (click)=\"savePipelineNodes()\" title=\"Save the current status of the pipeline and all the Nodes\">Save</button>\r\n    </div>\r\n    <div ngbDropdown class=\"dropdown  mr-2\">\r\n      <button ngbDropdownToggle class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"selectPipeline\" data-toggle=\"dropdown\"\r\n        aria-haspopup=\"true\" aria-expanded=\"false\" title=\"Allow us to switch between pipelines\">\r\n        Select Pipeline\r\n      </button>\r\n      <div ngbDropdownMenu aria-labelledby=\"selectPipelineButton\">\r\n        <a class=\"dropdown-item\" *ngFor=\"let pipe of pipelines\" (click)=\"selectPipeline(pipe)\">{{pipe.name}}</a>\r\n      </div>\r\n    </div>\r\n    <div class=\"btn-group mr-2\">\r\n      <button type=\"button\" class=\"btn\" [ngClass]=\"['btn',!periodicStatus ? 'btn-secondary' : 'btn-primary']\" (click)=\"periodicStatus=!periodicStatus;doPeriodicStatusUpdate(periodicStatus);\">\r\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0\" y=\"0\" width=\"30\" height=\"30\"\r\n          viewBox=\"0 0 561 561\" style=\"enable-background:new 0 0 561 561;\" xml:space=\"preserve\">\r\n          <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0\" y=\"0\" width=\"561\"\r\n            height=\"561\" viewBox=\"0 0 561 561\" style=\"enable-background:new 0 0 561 561;\" xml:space=\"preserve\">\r\n            <animateTransform *ngIf=\"periodicStatus\" attributeType=\"xml\" attributeName=\"transform\" type=\"rotate\" from=\"360 280 280 \"\r\n              to=\"0 280 280\" dur=\"4s\" repeatCount=\"indefinite\" />\r\n            <g>\r\n              <path d=\"M280.5,76.5V0l-102,102l102,102v-76.5c84.15,0,153,68.85,153,153c0,25.5-7.65,51-17.85,71.4l38.25,38.25\r\n            C471.75,357,484.5,321.3,484.5,280.5C484.5,168.3,392.7,76.5,280.5,76.5z M280.5,433.5c-84.15,0-153-68.85-153-153\r\n            c0-25.5,7.65-51,17.85-71.4l-38.25-38.25C89.25,204,76.5,239.7,76.5,280.5c0,112.2,91.8,204,204,204V561l102-102l-102-102V433.5z\">\r\n\r\n              </path>\r\n            </g>\r\n\r\n          </svg>\r\n        </svg>\r\n      </button>\r\n    </div>\r\n    <div ngbDropdown class=\"dropdown  mr-2\">\r\n      <button ngbDropdownToggle class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"selectNewNode\" data-toggle=\"dropdown\"\r\n        aria-haspopup=\"true\" aria-expanded=\"false\" title=\"Creates a new Node based on a template\">\r\n        New Node\r\n      </button>\r\n      <div ngbDropdownMenu aria-labelledby=\"selectNewNodeButton\">\r\n        <a class=\"dropdown-item\" *ngFor=\"let template of templates\" (click)=\"newNode(template)\">{{template.name}}</a>\r\n      </div>\r\n    </div>\r\n    <div ngbDropdown class=\"dropdown  mr-2\">\r\n      <button ngbDropdownToggle class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\"\r\n        aria-haspopup=\"true\" aria-expanded=\"false\" title=\"Centers a node in the middle of the PipelineCanvas\">\r\n        Focus On Node\r\n      </button>\r\n      <div ngbDropdownMenu aria-labelledby=\"dropdownBasic1\">\r\n        <a class=\"dropdown-item\" *ngFor=\"let node of _nodes\" (click)=\"focusNode(node)\">{{node.name}}</a>\r\n      </div>\r\n    </div>\r\n    <div class=\"btn-group mr-2\">\r\n      <button class=\"btn btn-sm btn-outline-secondary\" (click)=\"handleZoom(-0.2)\" title=\"Zoom In. Use (Shift) + (Mouse Wheel)\">+</button>\r\n      <button class=\"btn btn-sm btn-outline-secondary\" (click)=\"handleZoom(0.2)\" title=\"Zoom Out. Use (Shift) + (Mouse Wheel)\">-</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"container-fluid\" *ngIf=\"newPipe\">\r\n  <pipeline-new (completed)=\"selectPipeline($event)\" [pipe]=\"newPipe\"></pipeline-new>\r\n</div>\r\n<div class=\"container-fluid\">\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-12 col-md-12 col-sm-12\" (window:resize)=\"onResize($event)\">\r\n      <ng-template contextalizable></ng-template>\r\n      <svg #pipeCanvas version=\"1.1\" [attr.viewBox]=\"'0 0 '+ width +' ' + height\" width=\"100%\" height=\"100%\" (mousedown)=\"onMouseDown($event)\"\r\n        (mouseleave)=\"onMouseLeave($event)\" (mouseup)=\"onMouseUp($event)\" (contextmenu)=handleContextMenu($event) (mousemove)=\"onMouseMove($event)\">\r\n        <defs>\r\n          <pattern id=\"smallGrid\" width=\"10\" height=\"10\" patternUnits=\"userSpaceOnUse\">\r\n            <path d=\"M 10 0 L 0 0 0 10\" fill=\"none\" stroke=\"gray\" stroke-width=\"0.5\" />\r\n          </pattern>\r\n          <pattern id=\"grid\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\">\r\n            <rect width=\"100\" height=\"100\" fill=\"url(#smallGrid)\" />\r\n            <path d=\"M 100 0 L 0 0 0 100\" fill=\"none\" stroke=\"gray\" stroke-width=\"1\" />\r\n          </pattern>\r\n        </defs>\r\n        <svg:g x=\"0\" y=\"0\">\r\n          <svg:path [attr.stroke]=\" ((hosePipe.origin) ? (hosePipe.origin.type === 2)? 'red' : 'green' : 'white')\" stroke-width=\"3\"\r\n            fill=\"none\" [attr.d]=\"'M ' + (dx + hosePipe.origin.x ) + ',' + (hosePipe.origin.y +dy)\r\n            + ' L '+(dx + hosePipe.x ) + ',' +(dy + hosePipe.y )\" />\r\n        </svg:g>\r\n\r\n        <svg:g x=\"0\" y=\"0\" *ngFor=\"let node of _nodes\">\r\n          <svg:g x=\"0\" y=\"0\" *ngFor=\"let outCon of node.outputConnectors\">\r\n            <svg:g x=\"0\" y=\"0\" *ngFor=\"let conex of outCon.conectedNodes\">\r\n              <svg:path stroke=\"green\" stroke-width=\"3\" fill=\"none\" [attr.d]=\"'M ' + (node.x + dx + outCon.x) + ',' + (node.y + dy + outCon.y)\r\n                + ' C '+ ((node.x + dx + outCon.x)-(node.x  + outCon.x - conex.x -conex.originNode.x)/2) + ',' +(node.y + dy + outCon.y)\r\n                + ' ' + ((node.x + dx + outCon.x)-(node.x  + outCon.x - conex.x -conex.originNode.x)/2)  + ',' +(conex.y + dy + conex.originNode.y)  \r\n                + ' '+ (conex.x + dx + conex.originNode.x) + ',' + (conex.y + dy + conex.originNode.y) \" />\r\n            </svg:g>\r\n\r\n          </svg:g>\r\n          <svg:g x=\"0\" y=\"0\" *ngFor=\"let outCon of node.errorConnectors\">\r\n            <svg:g x=\"0\" y=\"0\" *ngFor=\"let conex of outCon.conectedNodes\">\r\n              <svg:path stroke=\"red\" stroke-width=\"3\" fill=\"none\" [attr.d]=\"'M ' + (node.x + dx + outCon.x) + ',' + (node.y + dy + outCon.y)\r\n                + ' C '+ ((node.x + dx + outCon.x)-(node.x  + outCon.x - conex.x -conex.originNode.x)/2) + ',' +(node.y + dy + outCon.y)\r\n                + ' ' + ((node.x + dx + outCon.x)-(node.x  + outCon.x - conex.x -conex.originNode.x)/2)  + ',' +(conex.y + dy + conex.originNode.y)  \r\n                + ' '+ (conex.x + dx + conex.originNode.x) + ',' + (conex.y + dy + conex.originNode.y) \" />\r\n            </svg:g>\r\n\r\n          </svg:g>\r\n          <!--\r\n          <svg:g x=\"0\" y=\"0\" *ngFor=\"let stdErr of node.errorNodes\">\r\n            <svg:path stroke=\"red\" stroke-width=\"3\" fill=\"none\" [attr.d]=\"'M ' + (node.x + dx + node.width +20) + ',' + (node.y + dy + node.height*3/4 +20)\r\n            + ' C '+ ((node.x + dx + node.width + 20)-(node.x + node.width -stdErr.x )/2) + ',' +(node.y + dy + node.height*3/4 +20)\r\n            + ' ' + ((node.x + dx + node.width + 20)-(node.x + node.width -stdErr.x )/2) + ',' +(stdErr.y + dy + stdErr.height/2 +20)  + ' '+ (stdErr.x + dx + 20) + ',' + (stdErr.y + dy + stdErr.height/2 +20)\"\r\n            />\r\n          </svg:g>\r\n          -->\r\n        </svg:g>\r\n\r\n        <!-- (mouseEvnt)=\"handleMousePos($event)\" -->\r\n        <svg:rect width=\"100%\" height=\"100%\" fill=\"url(#grid)\" pipeline-directive (movEmit)=\"handleMove($event)\" (zoom)=\"handleZoom($event)\"\r\n        />\r\n        <!-- SVG is not HTML is XML so use attribute instead of element [attr.height]=\"height\" [attr.width]=\"width\"-->\r\n        <svg:svg pipeline-node *ngFor=\"let node of _nodes\" [node]=\"node\" (nodeClicked)=\"handleNodeClick($event)\" (contextmenu)=handleContextMenu($event,node) \r\n          [attr.x]=\"node.x + dx\" [attr.y]=\"node.y + dy\" [attr.height]=\"node.height\" [attr.width]=\"node.width\"></svg:svg>\r\n      </svg>\r\n    </div>\r\n  </div>\r\n\r\n\r\n</div>"

/***/ }),

/***/ "./src/app/pipeline/pipeline.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipelineComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node__ = __webpack_require__("./src/app/pipeline/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hose_pipe_service__ = __webpack_require__("./src/app/pipeline/hose-pipe.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipeline_mouse_service__ = __webpack_require__("./src/app/pipeline/pipeline-mouse.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pipeline_service__ = __webpack_require__("./src/app/pipeline/pipeline.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipeline_node_edit_pipeline_node_edit_component__ = __webpack_require__("./src/app/pipeline/pipeline-node-edit/pipeline-node-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipeline_edit_pipeline_edit_component__ = __webpack_require__("./src/app/pipeline/pipeline-edit/pipeline-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pipeline__ = __webpack_require__("./src/app/pipeline/pipeline.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__contextual_menu_contextual_menu_component__ = __webpack_require__("./src/app/pipeline/contextual-menu/contextual-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__contextual_directive__ = __webpack_require__("./src/app/pipeline/contextual.directive.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var PipelineComponent = /** @class */ (function () {
    function PipelineComponent(router, hosePipeService, pipMouseService, pipService, modalService, activeModal, alertService, componentFactoryResolver) {
        this.router = router;
        this.hosePipeService = hosePipeService;
        this.pipMouseService = pipMouseService;
        this.pipService = pipService;
        this.modalService = modalService;
        this.activeModal = activeModal;
        this.alertService = alertService;
        this.componentFactoryResolver = componentFactoryResolver;
        this._nodes = [];
        this.templates = [];
        this.pipelines = [];
        this.actual_pipe = null;
        this.newPipe = null;
        this.letItBe = true;
        /**
         * Allow to poll periodically the status of the nodes
         * @type boolean
         */
        this.periodicStatus = false;
        /**
         * The node active, changes goes to this node
         */
        this.activeNode = null;
        this.height = 1280;
        this.width = 2048;
        this.propX = 1;
        this.propY = 1;
        this.dx = 0;
        this.dy = 0;
        this.lastX = 0;
        this.lastY = 0;
        this.hosePipe = this.hosePipeService.getHosePipe();
    }
    PipelineComponent.prototype.ngAfterViewInit = function () {
        try {
            this.reCalculate();
        }
        catch (err) { }
    };
    PipelineComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.reCalculate();
        var routersubs = this.router.events.subscribe(function (val) {
            _this.cleanPipes();
            routersubs.unsubscribe();
        });
        this.pipService.findPipelines().subscribe(function (pipes) {
            _this.pipelines = pipes;
            if (pipes.length > 0) {
                _this.selectPipeline(_this.pipelines[0]);
            }
        }, function (err) {
            _this.cleanPipes();
        });
        this.pipService.getNodeTemplates().subscribe(function (nodes) {
            _this.templates = nodes;
        }, function (err) { });
        this.pipService.subscribeToPipelines().subscribe(function (data) {
            _this.pipService.findPipelines().subscribe(function (data) {
                if (data.length === 0) {
                    _this.cleanPipes();
                }
                else {
                    var found = false;
                    _this.pipelines = data;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].id === _this.actual_pipe.id) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        _this.actual_pipe = data[0];
                    }
                    _this.pipService.getNodesForPipeline(_this.actual_pipe).subscribe(function (data) {
                        _this._nodes = data;
                    }, function (err) { });
                }
            }, function (err) {
                _this.cleanPipes();
            });
        }, function (err) {
            _this.cleanPipes();
        });
    };
    Object.defineProperty(PipelineComponent.prototype, "nodes", {
        get: function () {
            return this._nodes;
        },
        set: function (nodes) {
            this._nodes = nodes;
        },
        enumerable: true,
        configurable: true
    });
    PipelineComponent.prototype.cleanPipes = function () {
        this.actual_pipe = new __WEBPACK_IMPORTED_MODULE_7__pipeline__["a" /* Pipeline */]();
        this.actual_pipe.name = "No selected Pipeline";
        this.pipelines = [];
        this._nodes = [];
        this.activeNode = null;
        if (this.periodicNotifier) {
            this.periodicNotifier.unsubscribe();
        }
    };
    PipelineComponent.prototype.selectPipeline = function (pipe) {
        var _this = this;
        if (this.periodicNotifier) {
            this.periodicNotifier.unsubscribe();
        }
        this.actual_pipe = pipe;
        this.pipService.getNodesForPipeline(this.actual_pipe).subscribe(function (nodes) {
            _this._nodes = nodes;
            if (_this.periodicStatus) {
                _this.doPeriodicStatusUpdate();
            }
        }, function (err) {
            _this._nodes = [];
        });
    };
    PipelineComponent.prototype.doPeriodicStatusUpdate = function (status) {
        var _this = this;
        if (status === void 0) { status = true; }
        this.periodicStatus = status;
        if (this.periodicStatus) {
            if (this.periodicNotifier) {
                this.periodicNotifier.unsubscribe();
            }
            var subs_1 = this.pipService.checkPipelineStatus(this.actual_pipe).subscribe(function (data) {
                if (_this.actual_pipe.id === data.id) {
                    _this.actual_pipe.status = data.status;
                    _this.pipService.getNodesForPipeline(_this.actual_pipe).subscribe(function (nodes) {
                        var _loop_1 = function (nod) {
                            var myNodo = _this._nodes.find(function (val) {
                                if (val.id === nod.id)
                                    return true;
                                return false;
                            });
                            if (myNodo) {
                                myNodo.setStatus(nod.status);
                            }
                        };
                        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                            var nod = nodes_1[_i];
                            _loop_1(nod);
                        }
                    }, function (err) { });
                }
                else {
                    subs_1.unsubscribe();
                }
            }, function (err) {
                subs_1.unsubscribe();
            });
            this.periodicNotifier = subs_1;
        }
        else {
            if (this.periodicNotifier) {
                this.periodicNotifier.unsubscribe();
            }
        }
    };
    PipelineComponent.prototype.handleNodeClick = function (event) {
        var _this = this;
        this.removeContextMenu();
        //If double click in less than 1 sec then set as active node
        setTimeout(function () {
            _this.letItBe = false;
        }, 1000);
        if (this.activeNode === event && this.letItBe) {
            this.activeNode = event;
            var modalRef = this.modalService.open(__WEBPACK_IMPORTED_MODULE_5__pipeline_node_edit_pipeline_node_edit_component__["a" /* PipelineNodeEditComponent */]);
            modalRef.componentInstance.node = this.activeNode;
        }
        else {
            this.letItBe = true;
            this.activeNode = event;
        }
    };
    /**
     * Zoom in and out from the canvas
     * @param delta
     */
    PipelineComponent.prototype.handleZoom = function (delta) {
        this.height *= (1 + delta);
        this.width *= (1 + delta);
        this.reCalculate();
    };
    /**
     * Moves the canvas
     * @param xY
     */
    PipelineComponent.prototype.handleMove = function (xY) {
        this.dx += xY[0];
        this.dy += xY[1];
    };
    /**
     * Give us the position of the mouse
     */
    PipelineComponent.prototype.handleMousePos = function (event) {
        if (event.evnt === 'mousemove') {
            if (this.lastX === 0 && this.lastY === 0) {
            }
            else {
            }
            this.registerMousePos(event.clientX, event.clientY);
        }
    };
    /**
     * Give us the position of the mouse
     */
    PipelineComponent.prototype.onMouseMove = function (event) {
        this.pipMouseService.sendMouseEvent({
            'name': 'mousemove',
            'x': event.clientX * this.propX,
            'y': event.clientY * this.propY
        });
        if (this.lastX === 0 && this.lastY === 0) {
        }
        else {
        }
        this.registerMousePos(event.clientX, event.clientY);
    };
    PipelineComponent.prototype.registerMousePos = function (x, y) {
        this.lastX = x;
        this.lastY = y;
    };
    PipelineComponent.prototype.onMouseDown = function (event) {
        this.removeContextMenu();
        this.pipMouseService.sendMouseEvent({
            'name': 'mousedown',
            'x': event.clientX * this.propX,
            'y': event.clientY * this.propY
        });
    };
    PipelineComponent.prototype.onMouseUp = function (event) {
        this.pipMouseService.sendMouseEvent({
            'name': 'mouseup',
            'x': event.clientX * this.propX,
            'y': event.clientY * this.propY
        });
    };
    PipelineComponent.prototype.onMouseLeave = function (event) {
        this.pipMouseService.sendMouseEvent({
            'name': 'mouseleave',
            'x': event.clientX * this.propX,
            'y': event.clientY * this.propY
        });
    };
    /**
     * Moves the canvas to allow the node to be in the center
     * @param node
     */
    PipelineComponent.prototype.focusNode = function (node) {
        try {
            var rect = this.pipeCanvas.nativeElement.getBoundingClientRect();
            this.dx += rect.width * this.propX / 2 - this.dx - node.x - node.width / 2;
            this.dy += rect.height * this.propY / 2 - this.dy - node.y - node.height / 2;
        }
        catch (err) { }
    };
    PipelineComponent.prototype.newNode = function (temp) {
        var _this = this;
        var node;
        if (temp) {
            node = new __WEBPACK_IMPORTED_MODULE_1__node__["b" /* PipelineNode */](temp.name, temp.tag, temp.type);
            node.inputConnectors = temp.inputConnectors;
            node.inputParams = temp.inputParams;
            node.outputConnectors = temp.outputConnectors;
            node.outputParams = temp.outputParams;
            node.errorConnectors = temp.errorConnectors;
            node.errorParams = temp.errorParams;
            node.properties = temp.properties;
            node.x = temp.x ? temp.x : 10;
            node.y = temp.y ? temp.y : 10;
        }
        else {
            node = new __WEBPACK_IMPORTED_MODULE_1__node__["b" /* PipelineNode */]("New Node", Math.random().toString(), "ANY");
            node.x = 10;
            node.y = 10;
        }
        node.pipe = this.actual_pipe.id;
        var rect = this.pipeCanvas.nativeElement.getBoundingClientRect();
        if (this._nodes.length > 0)
            this.savePipelineNodes();
        console.log(node);
        this.pipService.createNodeForPipeline(node).subscribe(function (data) {
        }, function (err) {
            _this.alertService.error(err.error.message);
        });
    };
    PipelineComponent.prototype.newPipeline = function () {
        this.newPipe = new __WEBPACK_IMPORTED_MODULE_7__pipeline__["a" /* Pipeline */]();
    };
    PipelineComponent.prototype.editPipeline = function () {
        //PipelineEditComponent
        var modalRef = this.modalService.open(__WEBPACK_IMPORTED_MODULE_6__pipeline_edit_pipeline_edit_component__["a" /* PipelineEditComponent */]);
        modalRef.componentInstance.pipeline = this.actual_pipe;
    };
    PipelineComponent.prototype.savePipelineNodes = function () {
        var _this = this;
        //this.pipService.
        var i = 0;
        this.pipService.updateNodeForPipeline(this._nodes[i]).subscribe(function (data) {
            //First try with one node. If error then abort updates
            for (i = 1; i < _this._nodes.length; i++) {
                _this.pipService.updateNodeForPipeline(_this._nodes[i]).subscribe(function (data) { }, function (err) {
                    _this.alertService.error((err.error && err.error.message) ? err.error.message : "Cant save nodes");
                });
            }
        }, function (err) {
            _this.alertService.error((err.error && err.error.message) ? err.error.message : "Cant save nodes");
        });
    };
    PipelineComponent.prototype.reCalculate = function () {
        try {
            var rect = this.pipeCanvas.nativeElement.getBoundingClientRect();
            this.propX = this.height / rect.height;
            this.propY = this.width / rect.width;
        }
        catch (err) { }
    };
    PipelineComponent.prototype.onResize = function (event) {
        this.reCalculate();
    };
    PipelineComponent.prototype.handleContextMenu = function (event, node) {
        var _this = this;
        var comp = __WEBPACK_IMPORTED_MODULE_11__contextual_menu_contextual_menu_component__["a" /* ContextualMenuComponent */];
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(comp);
        var viewContainerRef = this.contextualElement.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        (componentRef.instance).node = node;
        (componentRef.instance).posX = event.clientX;
        (componentRef.instance).posY = event.clientY;
        (componentRef.instance).completed.subscribe(function (nodeEvent) {
            _this.onContextAction(nodeEvent);
        });
        event.stopPropagation();
        event.preventDefault();
    };
    PipelineComponent.prototype.removeContextMenu = function () {
        var viewContainerRef = this.contextualElement.viewContainerRef;
        viewContainerRef.clear();
    };
    PipelineComponent.prototype.onContextAction = function (event) {
        if (event && event.event) {
            switch (event.event) {
                case "paste":
                    this.newNode(event.node);
                    break;
                case "template":
                    this.newNode(event.node);
                    break;
                case "clone":
                    try {
                        this.newNode(event.node);
                    }
                    catch (err) { }
                    break;
                case "delete":
                    try {
                        this.pipService.removeNodeForPipeline(event.node).subscribe(function (data) { }, function (err) { });
                    }
                    catch (err) { }
                    break;
            }
            //Is PipelineNode
        }
        this.removeContextMenu();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_12__contextual_directive__["a" /* ContextualDirective */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_12__contextual_directive__["a" /* ContextualDirective */])
    ], PipelineComponent.prototype, "contextualElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('pipeCanvas'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], PipelineComponent.prototype, "pipeCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], PipelineComponent.prototype, "nodes", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PipelineComponent.prototype, "onResize", null);
    PipelineComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-pipeline',
            template: __webpack_require__("./src/app/pipeline/pipeline.component.html"),
            styles: [__webpack_require__("./src/app/pipeline/pipeline.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_10__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__hose_pipe_service__["a" /* HosePipeService */],
            __WEBPACK_IMPORTED_MODULE_3__pipeline_mouse_service__["a" /* PipelineMouseService */],
            __WEBPACK_IMPORTED_MODULE_4__pipeline_service__["a" /* PipelineService */],
            __WEBPACK_IMPORTED_MODULE_9__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_9__ng_bootstrap_ng_bootstrap__["a" /* NgbActiveModal */],
            __WEBPACK_IMPORTED_MODULE_8__alert_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"]])
    ], PipelineComponent);
    return PipelineComponent;
}());



/***/ }),

/***/ "./src/app/pipeline/pipeline.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipelineDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipeline_mouse_service__ = __webpack_require__("./src/app/pipeline/pipeline-mouse.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * This directive allow us to move the svg canvas, do zoom using the mouse wheel.
 * For zoom use "shift + wheel".
 * For movement only click inside the canvas.
 */
var PipelineDirective = /** @class */ (function () {
    function PipelineDirective(el, pipeMouseService) {
        this.el = el;
        this.pipeMouseService = pipeMouseService;
        this.moving = false;
        this.zoom = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.movEmit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.mouseEvnt = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    PipelineDirective.prototype.onMouseWheel = function (event) {
        this.mouseWheelFunc(event);
    };
    PipelineDirective.prototype.mouseWheelFunc = function (event) {
        if (event.target == this.el.nativeElement && event.deltaY != 0 && event.shiftKey) {
            var delta = event.deltaY; //Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
            if (delta && (delta > -1 || delta < 1))
                this.zoom.emit(1 / 40 * event.deltaY);
        }
    };
    PipelineDirective.prototype.onMouseLeave = function (event) {
        if (event.target == this.el.nativeElement && this.moving) {
            this.moving = false;
            this.mouseEvnt.emit({ evnt: 'mouseleave', x: event.clientX, y: event.clientY });
        }
    };
    PipelineDirective.prototype.onMouseDown = function (event) {
        var _this = this;
        if (event.target == this.el.nativeElement) {
            var subscription_1;
            var lastX_1 = 0;
            var lastY_1 = 0;
            subscription_1 = this.pipeMouseService.getMouseEvents().subscribe(function (event) {
                if (event.name === "mousemove") {
                    if (lastX_1 === 0 && lastY_1 === 0) {
                    }
                    else {
                        _this.moveElement((event.x - lastX_1), (event.y - lastY_1));
                    }
                    lastX_1 = event.x;
                    lastY_1 = event.y;
                }
                else if (event.name === "mouseup") {
                    _this.moveElement((event.x - lastX_1), (event.y - lastY_1));
                    subscription_1.unsubscribe();
                }
                else if (event.name === "mouseleave") {
                    subscription_1.unsubscribe();
                }
            });
        }
    };
    PipelineDirective.prototype.moveElement = function (x, y) {
        if (x < 200 && y < 200) {
            this.movEmit.emit([x, y]);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PipelineDirective.prototype, "zoom", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PipelineDirective.prototype, "movEmit", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PipelineDirective.prototype, "mouseEvnt", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('wheel', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PipelineDirective.prototype, "onMouseWheel", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseleave', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PipelineDirective.prototype, "onMouseLeave", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PipelineDirective.prototype, "onMouseDown", null);
    PipelineDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'svg:rect[pipeline-directive]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__pipeline_mouse_service__["a" /* PipelineMouseService */]])
    ], PipelineDirective);
    return PipelineDirective;
}());



/***/ }),

/***/ "./src/app/pipeline/pipeline.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipelineService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_interval__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/interval.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__web_project_index__ = __webpack_require__("./src/app/web-project/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__node__ = __webpack_require__("./src/app/pipeline/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__stored_nodes__ = __webpack_require__("./src/app/pipeline/stored-nodes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var PipelineService = /** @class */ (function () {
    function PipelineService(AppSettings, http, webProjServ) {
        var _this = this;
        this.AppSettings = AppSettings;
        this.http = http;
        this.webProjServ = webProjServ;
        this.nodes = [];
        this._nodes = [];
        this.pipelines = [];
        this.lastSearchPipe = Date.now() - 20000;
        this.lastSearchNode = Date.now() - 20000;
        this.activeCache = false;
        this.pullerObserver = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.subscriber = observer;
        });
        this.webProjServ.subscribeToWebProjects().subscribe(function (data) {
            _this.clearCache();
            _this.notify();
        }, function (err) { });
    }
    PipelineService.prototype.clearCache = function () {
        this.nodes = [];
        this._nodes = [];
        this.pipelines = [];
        this.lastSearchPipe -= 30000;
        this.lastSearchNode -= 30000;
    };
    PipelineService.prototype.findPipeline = function (id) {
        return this.http.get(this.AppSettings.API_ENDPOINT + 'pipeline/' + id).map(function (data) { return data; });
    };
    PipelineService.prototype.findPipelines = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            if ((!_this.activeCache) || (Date.now() - _this.lastSearchPipe) > 10000) {
                _this.lastSearchPipe = Date.now();
                _this.http.get(_this.AppSettings.API_ENDPOINT + 'pipeline?web_project=' + _this.webProjServ.getActualProject().id).map(function (data) { return data; }).subscribe(function (data) {
                    _this.pipelines = data;
                    observer.next(data);
                    observer.complete();
                }, function (err) {
                    observer.error(err);
                    observer.complete();
                });
            }
            else {
                //Return cached data
                observer.next(_this.getPipelinesForWebProject(_this.webProjServ.getActualProject().id));
                observer.complete();
            }
        });
    };
    PipelineService.prototype.getStoredNodes = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            Object(__WEBPACK_IMPORTED_MODULE_9__stored_nodes__["b" /* getStoredNodes */])(_this.http, _this.AppSettings).subscribe(function (data) {
                var pipes = [];
                var auxPipe = data;
                for (var i = 0; i < auxPipe.length; i++) {
                    var aux = Object(__WEBPACK_IMPORTED_MODULE_7__node__["f" /* pipelineNodeFromJSON */])(auxPipe[i]);
                    pipes.push(aux);
                }
                observer.next(pipes);
                observer.complete();
            }, function (err) {
                observer.error();
                observer.complete();
            });
        });
    };
    PipelineService.prototype.removeStoredNode = function (node) {
        return Object(__WEBPACK_IMPORTED_MODULE_9__stored_nodes__["c" /* removeStoredNode */])(this.http, this.AppSettings, node);
    };
    PipelineService.prototype.newStoredNode = function (node) {
        return Object(__WEBPACK_IMPORTED_MODULE_9__stored_nodes__["a" /* createStoredNode */])(this.http, this.AppSettings, node);
    };
    PipelineService.prototype.createPipeline = function (pipeline) {
        var _this = this;
        this.lastSearchPipe == this.lastSearchPipe - 20000;
        this.clearCache();
        pipeline.web_project = this.webProjServ.getActualProject().id;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.post(_this.AppSettings.API_ENDPOINT + 'pipeline', pipeline, { responseType: 'json' }).map(function (data) { return data; })
                .subscribe(function (data) {
                _this.notify();
                observer.next(data);
                observer.complete();
            }, function (err) {
                observer.error(err);
            });
        });
    };
    PipelineService.prototype.updatePipeline = function (pipeline) {
        var _this = this;
        this.lastSearchPipe == this.lastSearchPipe - 20000;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.put(_this.AppSettings.API_ENDPOINT + 'pipeline/' + pipeline.id, pipeline, { responseType: 'json' })
                .subscribe(function (data) {
                _this.notify();
                observer.next(data);
                observer.complete();
            }, function (err) {
                observer.error(err);
            });
        });
    };
    PipelineService.prototype.deletePipeline = function (pipeline) {
        var _this = this;
        this.lastSearchPipe == this.lastSearchPipe - 20000;
        this.clearCache();
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.delete(_this.AppSettings.API_ENDPOINT + 'pipeline/' + pipeline.id, { responseType: 'json' })
                .subscribe(function (data) {
                _this.notify();
                observer.next(data);
                observer.complete();
            }, function (err) {
                observer.error(err);
            });
        });
    };
    PipelineService.prototype.checkPipelineStatus = function (pipeline) {
        var _this = this;
        this.activeCache = false;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].interval(1000).flatMap(function (i) {
            return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
                _this.findPipeline(pipeline.id).subscribe(function (data) {
                    if (data.last_update !== pipeline.last_update) {
                        observer.next(data);
                        observer.complete();
                    }
                }, function (err) { });
            });
        });
    };
    PipelineService.prototype.getNode = function (node) {
        return this.http.get(this.AppSettings.API_ENDPOINT + 'pipeline/' + node.pipe + '/node/' + node.id);
    };
    PipelineService.prototype.getNodesForPipeline = function (pipeline) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            if ((_this.activeCache) && (_this.nodesForPipelineInCache(pipeline) && (Date.now() - _this.lastSearchNode) < 10000)) {
                //Return cached data
                console.log("From cache");
                observer.next(_this.findNodesInCache(pipeline));
                observer.complete();
            }
            else {
                _this.lastSearchNode = Date.now();
                _this.http.get(_this.AppSettings.API_ENDPOINT + 'pipeline/' + pipeline.id + '/node').map(function (data) {
                    var pipes = [];
                    var auxPipe = data;
                    for (var i = 0; i < auxPipe.length; i++) {
                        var aux = Object(__WEBPACK_IMPORTED_MODULE_7__node__["f" /* pipelineNodeFromJSON */])(auxPipe[i]);
                        pipes.push(aux);
                    }
                    for (var i = 0; i < pipes.length; i++) {
                        pipes[i].fillReferences(pipes);
                    }
                    return pipes;
                }).subscribe(function (pipes) {
                    _this.addNodesToCache(pipes);
                    console.log("From API");
                    observer.next(pipes);
                    observer.complete();
                }, function (err) {
                    observer.error(err);
                });
            }
        });
    };
    PipelineService.prototype.getAllNodesUser = function () {
        return this.http.get(this.AppSettings.API_ENDPOINT + 'pipeline/nodes').map(function (data) { return data; });
    };
    PipelineService.prototype.createNodeForPipeline = function (node) {
        var _this = this;
        this.lastSearchNode == this.lastSearchNode - 20000;
        this.clearCache();
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.post(_this.AppSettings.API_ENDPOINT + 'pipeline/' + node.pipe + '/node', node, { responseType: 'json' })
                .subscribe(function (data) {
                var data2 = data;
                console.log(data2);
                Object.assign(node, data2);
                _this.addNodeToCache(node);
                _this.notify();
                observer.next(data);
                observer.complete();
            }, function (err) {
                observer.error(err);
                observer.complete();
            });
        });
    };
    PipelineService.prototype.removeNodeForPipeline = function (node) {
        var _this = this;
        this.lastSearchNode == this.lastSearchNode - 20000;
        this.clearCache();
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.delete(_this.AppSettings.API_ENDPOINT + 'pipeline/' + node.pipe + '/node/' + node.id, { responseType: 'json' })
                .subscribe(function (data) {
                _this.removeNodeInCache(node);
                _this.notify();
                observer.next(data);
                observer.complete();
            }, function (err) {
                observer.error(err);
                observer.complete();
            });
        });
    };
    PipelineService.prototype.updateNodeForPipeline = function (node) {
        var _this = this;
        this.lastSearchNode == this.lastSearchNode - 20000;
        var dif = this.activeCache ? this.getDiffNodeInCache(node) : node;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            if (dif === null) {
                observer.next({});
                observer.complete();
            }
            else {
                _this.http.put(_this.AppSettings.API_ENDPOINT + 'pipeline/' + node.pipe + '/node/' + node.id, dif, { responseType: 'json' })
                    .subscribe(function (data) {
                    console.log("Updated Node " + node.id);
                    _this.updateNodeInCache(node);
                    observer.next(data);
                    observer.complete();
                }, function (err) {
                    observer.error(err);
                    observer.complete();
                });
            }
        });
    };
    /**
       * Get notified when a object is deleted, update or created.
       * Dont use it in @Input Components
       */
    PipelineService.prototype.subscribeToPipelines = function () {
        return this.pullerObserver;
    };
    PipelineService.prototype.getNodeTemplates = function () {
        return this.http.get(this.AppSettings.API_ENDPOINT + 'node_templates').map(function (data) {
            var retData = [];
            for (var i = 0; i < data.length; i++) {
                var auxNode = data[i];
                var newNode = Object(__WEBPACK_IMPORTED_MODULE_7__node__["f" /* pipelineNodeFromJSON */])(auxNode);
                retData.push(newNode);
            }
            return retData;
        });
    };
    /**
     * Use internally
     */
    PipelineService.prototype.notify = function () {
        try {
            this.subscriber.next(true);
        }
        catch (err) { }
    };
    PipelineService.prototype.addNodesToCache = function (nodes) {
        for (var i = 0; i < nodes.length; i++) {
            this.addNodeToCache(nodes[i]);
        }
    };
    PipelineService.prototype.addNodeToCache = function (node) {
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].id === node.id) {
                //Node exists so update and end
                Object.assign(this.nodes[i], node);
                this._nodes[i] = Object.assign({}, node);
                return;
            }
        }
        this.nodes.push(node);
        this._nodes.push(Object.assign({}, node));
    };
    PipelineService.prototype.nodesForPipelineInCache = function (pipe) {
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].pipe === pipe.id) {
                return true;
            }
        }
        return false;
    };
    PipelineService.prototype.findNodesInCache = function (pipe) {
        var retNodes = [];
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].pipe === pipe.id) {
                retNodes.push(this.nodes[i]);
            }
        }
        return retNodes;
    };
    PipelineService.prototype.removeNodeInCache = function (node) {
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].id === node.id) {
                this.nodes.splice(i, 1);
                this._nodes.splice(i, 1);
                return;
            }
        }
    };
    PipelineService.prototype.removeNodesInCache = function (pipe) {
        this.lastSearchNode -= 20000;
        var retNodes = [];
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].pipe === pipe.id) {
                this.nodes.splice(i, 1);
                this._nodes.splice(i, 1);
                i--;
            }
        }
        return retNodes;
    };
    PipelineService.prototype.getPipelinesForWebProject = function (id) {
        var arr = [];
        for (var i = 0; i < this.pipelines.length; i++) {
            if (this.pipelines[i].web_project === id) {
                arr.push(this.pipelines[i]);
            }
        }
        return arr;
    };
    PipelineService.prototype.getDiffNodeInCache = function (node) {
        var diff = Object.assign({}, node);
        for (var i = 0; i < this._nodes.length; i++) {
            if (this._nodes[i].id === node.id) {
                var keys = Object.keys(this._nodes[i]);
                for (var j = 0; j < keys.length; j++) {
                    if (deepEqual(this._nodes[i][keys[j]], node[keys[j]])) {
                        delete diff[keys[j]];
                    }
                }
                break;
            }
        }
        if ((Object.keys(diff)).length < 1)
            return null;
        else {
            diff.id = node.id;
            return diff;
        }
    };
    PipelineService.prototype.updateNodeInCache = function (node) {
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].id === node.id) {
                this.nodes[i] = node;
                this._nodes[i] = Object.assign({}, node);
                return;
            }
        }
    };
    PipelineService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__app_settings_service__["a" /* AppSettingsService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_6__web_project_index__["f" /* WebProjectService */]])
    ], PipelineService);
    return PipelineService;
}());

function deepEqual(x, y, deep) {
    if (deep === void 0) { deep = 4; }
    if (deep < 0)
        return true;
    if (typeof x !== "object" && x === y) {
        return true;
    }
    else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
        if (Object.keys(x).length != Object.keys(y).length)
            return false;
        for (var prop in x) {
            if (y.hasOwnProperty(prop)) {
                if (!deepEqual(x[prop], y[prop], deep - 1))
                    return false;
            }
            else
                return false;
        }
        return true;
    }
    else
        return false;
}


/***/ }),

/***/ "./src/app/pipeline/pipeline.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Pipeline; });
/**
 * This class allow us to look at the information of the pipeline.
 */
var Pipeline = /** @class */ (function () {
    function Pipeline() {
        /**
         * ID of the pipeline stored in the DB
         */
        this.id = "";
        /**
         * User owner of this pipeline
         */
        this.owner = "";
        /**
         * Name of the pipeline
         */
        this.name = "";
        this.web_project = "";
        /**
         * Description of the pipeline
         */
        this.description = "";
        /**
         * Status of the pipeline
         */
        this.status = 5;
        /**
         * When the pipeline was created
         */
        this.create_date = new Date(Date.now());
        /**
         * When the pipeline was lastly updated
         */
        this.last_update = new Date(Date.now());
        /**
         * This must be or PipelineNode or String
         */
        this.nodes = [];
    }
    return Pipeline;
}());



/***/ }),

/***/ "./src/app/pipeline/stored-nodes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getStoredNodes;
/* unused harmony export updateStoredNode */
/* harmony export (immutable) */ __webpack_exports__["c"] = removeStoredNode;
/* harmony export (immutable) */ __webpack_exports__["a"] = createStoredNode;
function getStoredNodes(http, AppSettings) {
    return http.get(AppSettings.API_ENDPOINT + 'nodes').map(function (data) { return data; });
}
function updateStoredNode(http, AppSettings, node) {
    return http.put(AppSettings.API_ENDPOINT + 'nodes/' + node.id, node, { responseType: 'json' }).map(function (data) { return data; });
}
function removeStoredNode(http, AppSettings, node) {
    return http.delete(AppSettings.API_ENDPOINT + 'nodes/' + node.id).map(function (data) { return data; });
}
function createStoredNode(http, AppSettings, node) {
    return http.post(AppSettings.API_ENDPOINT + 'nodes', node, { responseType: 'json' }).map(function (data) { return data; });
}


/***/ }),

/***/ "./src/app/safe-dom.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafeDomPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SafeDomPipe = /** @class */ (function () {
    function SafeDomPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafeDomPipe.prototype.transform = function (value, args) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    };
    SafeDomPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'safeDom'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["DomSanitizer"]])
    ], SafeDomPipe);
    return SafeDomPipe;
}());



/***/ }),

/***/ "./src/app/scan-profile/edit-profile/edit-profile.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/scan-profile/edit-profile/edit-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #content let-c=\"close\" let-d=\"dismiss\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"deleteModalLabel\">Are you sure?</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"c('Close click')\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        Do you want to delet the security profile \"{{profile.name}}\"?\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"d('Close click')\">Cancel</button>\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"sureDelete();c('Close click');\">Remove</button>\n      </div>\n    </div>\n  </div>\n</ng-template>\n<div *ngIf=\"profile\">\n  <form>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <!--HEADER -->\n\n        <div class=\"form-group\">\n          <label for=\"checkName\">Scan Profile Name</label>\n          <input type=\"text\" class=\"form-control\" name=\"name\" id=\"profileName\" placeholder=\"Profile Name\" [(ngModel)]=\"profile.name\">\n        </div>\n      </div>\n      <div class=\"card-body\">\n        <div class=\"form-group\">\n          <label for=\"description\">Description</label>\n          <input type=\"text\" class=\"form-control\" name=\"description\" id=\"description\" placeholder=\"Description\" [(ngModel)]=\"profile.description\">\n        </div>\n        <div class=\"form-group\">\n          <table class=\"table\">\n            <thead>\n              <tr>\n                <th scope=\"col\">#</th>\n                <th scope=\"col\">\n                  Scan Profile:\n                  <button type=\"submit\" class=\"btn btn-primary float-right\" (click)=\"addRow()\" title=\"Adds a row to the array\">+</button>\n                </th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let elemento of array_elements; let i = index;trackBy:trackByFn\">\n                <th scope=\"row\">{{i}}</th>\n                <td>\n                  <input [ngModelOptions]=\"{standalone: true}\" type=\"text\" [(ngModel)]=\"array_elements[i]\" />\n                  <button type=\"submit\" class=\"btn btn-secondary float-right\" (click)=\"removeRow(i)\" title=\"Removes a row in the array\">-</button>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <div class=\"btn-group\">\n          <button type=\"submit\" class=\"btn btn-primary\" (click)=\"edit()\">Edit</button>\n          <button type=\"submit\" class=\"btn btn-secondary\" (click)=\"cancel()\">Cancel</button>\n          <button type=\"submit\" class=\"btn btn-danger\" data-toggle=\"modal\" data-target=\"#deleteModal\" (click)=\"deleteModal(content)\">Remove</button>\n        </div>\n      </div>\n    </div>\n  </form>\n\n</div>"

/***/ }),

/***/ "./src/app/scan-profile/edit-profile/edit-profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scan_profile__ = __webpack_require__("./src/app/scan-profile/scan-profile.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scan_profile_service__ = __webpack_require__("./src/app/scan-profile/scan-profile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EditProfileComponent = /** @class */ (function () {
    function EditProfileComponent(alert, modalService, activeModal, profileService) {
        this.alert = alert;
        this.modalService = modalService;
        this.activeModal = activeModal;
        this.profileService = profileService;
        this.array_elements = [];
    }
    Object.defineProperty(EditProfileComponent.prototype, "profile", {
        get: function () {
            return this._profile;
        },
        set: function (prof) {
            this._profile = prof;
            this.array_elements = prof.checks;
            console.log(this.array_elements);
        },
        enumerable: true,
        configurable: true
    });
    EditProfileComponent.prototype.ngOnInit = function () {
    };
    EditProfileComponent.prototype.edit = function () {
        var _this = this;
        this._profile.checks = this.array_elements;
        this.profileService.updateProfileTemplate(this.profile).subscribe(function (data) {
            _this.alert.success("Updated");
        }, function (err) {
            _this.alert.error('message' in err.error ? err.error.message : "Cannot save SecurityCheck");
        });
    };
    EditProfileComponent.prototype.cancel = function () {
        this.profile = null;
    };
    EditProfileComponent.prototype.sureDelete = function () {
        var _this = this;
        this.activeModal.close('Close click');
        this.profileService.deleteProfileTemplate(this.profile).subscribe(function (data) {
            _this.alert.success("Deleted");
            _this.profile = null;
        }, function (err) {
            _this.alert.error('message' in err.error ? err.error.message : "Cannot delete SecurityCheck");
        });
    };
    EditProfileComponent.prototype.deleteModal = function (content) {
        this.modalService.open(content).result.then(function (result) {
        }, function (reason) {
        }).catch(function (err) {
        });
    };
    EditProfileComponent.prototype.addRow = function () {
        this.array_elements.push("Element " + this.array_elements.length);
    };
    EditProfileComponent.prototype.removeRow = function (pos) {
        if (pos === void 0) { pos = 0; }
        this.array_elements.splice(pos, 1);
    };
    EditProfileComponent.prototype.trackByFn = function (index, item) {
        return index;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__scan_profile__["a" /* ScanProfile */]),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__scan_profile__["a" /* ScanProfile */]])
    ], EditProfileComponent.prototype, "profile", null);
    EditProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'edit-scan-profile',
            template: __webpack_require__("./src/app/scan-profile/edit-profile/edit-profile.component.html"),
            styles: [__webpack_require__("./src/app/scan-profile/edit-profile/edit-profile.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__alert_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["a" /* NgbActiveModal */],
            __WEBPACK_IMPORTED_MODULE_4__scan_profile_service__["a" /* ScanProfileService */]])
    ], EditProfileComponent);
    return EditProfileComponent;
}());



/***/ }),

/***/ "./src/app/scan-profile/new-profile/new-profile.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/scan-profile/new-profile/new-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"profile\">\n  <form>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <!--HEADER -->\n\n        <div class=\"form-group\">\n          <label for=\"checkName\">Scan Profile Name</label>\n          <input type=\"text\" class=\"form-control\" name=\"name\" id=\"profileName\" placeholder=\"Profile Name\" [(ngModel)]=\"profile.name\">\n        </div>\n      </div>\n      <div class=\"card-body\">\n        <div class=\"form-group\">\n          <label for=\"description\">Description</label>\n          <input type=\"text\" class=\"form-control\" name=\"description\" id=\"description\" placeholder=\"Description\" [(ngModel)]=\"profile.description\">\n        </div>\n        <div class=\"form-group\">\n          <table class=\"table\">\n            <thead>\n              <tr>\n                <th scope=\"col\">#</th>\n                <th scope=\"col\">\n                  Scan Profile:\n                  <button type=\"submit\" class=\"btn btn-primary float-right\" (click)=\"addRow()\" title=\"Adds a row to the array\">+</button>\n                </th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let elemento of array_elements; let i = index;trackBy:trackByFn\">\n                <th scope=\"row\">{{i}}</th>\n                <td>\n                  <input [ngModelOptions]=\"{standalone: true}\" type=\"text\" [(ngModel)]=\"array_elements[i]\" />\n                  <button type=\"submit\" class=\"btn btn-secondary float-right\" (click)=\"removeRow(i)\" title=\"Removes a row in the array\">-</button>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <div class=\"btn-group\">\n          <button type=\"submit\" class=\"btn btn-primary\" (click)=\"save()\">Save</button>\n          <button type=\"submit\" class=\"btn btn-secondary\" (click)=\"cancel()\">Cancel</button>\n        </div>\n      </div>\n    </div>\n  </form>\n\n</div>"

/***/ }),

/***/ "./src/app/scan-profile/new-profile/new-profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scan_profile__ = __webpack_require__("./src/app/scan-profile/scan-profile.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scan_profile_service__ = __webpack_require__("./src/app/scan-profile/scan-profile.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NewProfileComponent = /** @class */ (function () {
    function NewProfileComponent(alert, profileService) {
        this.alert = alert;
        this.profileService = profileService;
        this.array_elements = [];
    }
    Object.defineProperty(NewProfileComponent.prototype, "profile", {
        get: function () {
            return this._profile;
        },
        set: function (prof) {
            this._profile = prof;
            this.array_elements = prof.checks;
        },
        enumerable: true,
        configurable: true
    });
    NewProfileComponent.prototype.ngOnInit = function () {
    };
    NewProfileComponent.prototype.save = function () {
        var _this = this;
        this.profileService.createProfileTemplate(this.profile).subscribe(function (data) {
            _this.alert.success("Created");
        }, function (err) {
            _this.alert.error('message' in err.error ? err.error.message : "Cannot save SecurityCheck");
        });
    };
    NewProfileComponent.prototype.cancel = function () {
        this.profile = null;
    };
    NewProfileComponent.prototype.addRow = function () {
        this.array_elements.push("Element " + this.array_elements.length);
    };
    NewProfileComponent.prototype.removeRow = function (pos) {
        if (pos === void 0) { pos = 0; }
        this.array_elements.splice(pos, 1);
    };
    NewProfileComponent.prototype.trackByFn = function (index, item) {
        return index;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__scan_profile__["a" /* ScanProfile */]),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__scan_profile__["a" /* ScanProfile */]])
    ], NewProfileComponent.prototype, "profile", null);
    NewProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'new-scan-profile',
            template: __webpack_require__("./src/app/scan-profile/new-profile/new-profile.component.html"),
            styles: [__webpack_require__("./src/app/scan-profile/new-profile/new-profile.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__alert_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_3__scan_profile_service__["a" /* ScanProfileService */]])
    ], NewProfileComponent);
    return NewProfileComponent;
}());



/***/ }),

/***/ "./src/app/scan-profile/scan-profile.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/scan-profile/scan-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class='container'>\n  <div class=\"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom\">\n    <h4>List of Security Profiles</h4>\n    <div class=\"btn-toolbar mb-2 mb-md-0\">\n      <div class=\"btn-group mr-2\">\n        <div>\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"cloneProfile()\">Clone Profile</button>\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"newProfile()\">Create new Security Profile</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"tempProfile\" class=\"row\">\n      <div class=\"col-sm-12 col-xl-12\">\n        <new-scan-profile [profile]=\"tempProfile\"></new-scan-profile>\n      </div>\n      \n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-12 col-md-6\">\n      <div class=\"list-group\">\n        <a *ngFor=\"let prof of profileList\" [class.active]=\"prof === selectedProfile\" (click)=\"onSelect(prof)\" class=\"list-group-item\">\n          <span>{{prof.name}}</span>\n        </a>\n      </div>\n      <hr/>\n    </div>\n    <div class=\"col-sm-12 col-md-6\">\n      <edit-scan-profile [profile]=\"selectedProfile\"></edit-scan-profile>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/scan-profile/scan-profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scan_profile__ = __webpack_require__("./src/app/scan-profile/scan-profile.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scan_profile_service__ = __webpack_require__("./src/app/scan-profile/scan-profile.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ScanProfileComponent = /** @class */ (function () {
    function ScanProfileComponent(auth, profileService) {
        this.auth = auth;
        this.profileService = profileService;
    }
    ScanProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tempProfile = null;
        this.fetchData();
        this.profileService.subscribeToScanProfiles().subscribe(function (data) {
            _this.fetchData();
        }, function (err) {
        });
    };
    ScanProfileComponent.prototype.onSelect = function (check) {
        this.selectedProfile = check;
    };
    ScanProfileComponent.prototype.fetchData = function () {
        var _this = this;
        this.profileService.getProfileTemplates().subscribe(function (checks) {
            _this.profileList = checks;
        });
    };
    ScanProfileComponent.prototype.newProfile = function () {
        this.tempProfile = new __WEBPACK_IMPORTED_MODULE_2__scan_profile__["a" /* ScanProfile */]();
    };
    ScanProfileComponent.prototype.cloneProfile = function () {
        if (this.selectedProfile) {
            this.tempProfile = new __WEBPACK_IMPORTED_MODULE_2__scan_profile__["a" /* ScanProfile */]();
            Object.assign(this.tempProfile, this.selectedProfile);
        }
    };
    ScanProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'scan-profile',
            template: __webpack_require__("./src/app/scan-profile/scan-profile.component.html"),
            styles: [__webpack_require__("./src/app/scan-profile/scan-profile.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_3__scan_profile_service__["a" /* ScanProfileService */]])
    ], ScanProfileComponent);
    return ScanProfileComponent;
}());



/***/ }),

/***/ "./src/app/scan-profile/scan-profile.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanProfileService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ScanProfileService = /** @class */ (function () {
    function ScanProfileService(http, alertService, AppSettings) {
        var _this = this;
        this.http = http;
        this.alertService = alertService;
        this.AppSettings = AppSettings;
        this.pullerObserver = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.subscriber = observer;
        });
    }
    ScanProfileService.prototype.getProfileTemplates = function () {
        return this.http.get(this.AppSettings.API_ENDPOINT + 'scan_profile').map(function (data) { return data; });
    };
    ScanProfileService.prototype.updateProfileTemplate = function (scan) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.put(_this.AppSettings.API_ENDPOINT + 'scan_profile/' + scan.id, scan).subscribe(function (data) {
                _this.notify();
                observer.next();
                observer.complete();
            }, function (err) {
                observer.error(err);
                observer.complete();
            });
        });
    };
    ScanProfileService.prototype.createProfileTemplate = function (scan) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.post(_this.AppSettings.API_ENDPOINT + 'scan_profile', scan).subscribe(function (data) {
                _this.notify();
                observer.next();
                observer.complete();
            }, function (err) {
                observer.error(err);
                observer.complete();
            });
        });
    };
    ScanProfileService.prototype.deleteProfileTemplate = function (scan) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.delete(_this.AppSettings.API_ENDPOINT + 'scan_profile/' + scan.id).subscribe(function (data) {
                _this.notify();
                observer.next();
                observer.complete();
            }, function (err) {
                observer.error(err);
                observer.complete();
            });
        });
    };
    /**
     * Get notified when a object is deleted, update or created.
     * Dont use it in @Input Components
     */
    ScanProfileService.prototype.subscribeToScanProfiles = function () {
        return this.pullerObserver;
    };
    /**
     * Use internally
     */
    ScanProfileService.prototype.notify = function () {
        this.subscriber.next(true);
    };
    ScanProfileService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_6__alert_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_5__app_settings_service__["a" /* AppSettingsService */]])
    ], ScanProfileService);
    return ScanProfileService;
}());



/***/ }),

/***/ "./src/app/scan-profile/scan-profile.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanProfile; });
var ScanProfile = /** @class */ (function () {
    function ScanProfile() {
        /**
         * Array of vulenrabilities to check
         */
        this.checks = [];
    }
    return ScanProfile;
}());



/***/ }),

/***/ "./src/app/scan-report/chart-temporal/chart-temporal.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/scan-report/chart-temporal/chart-temporal.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-charts-bar-vertical-stacked *ngIf=\"multi\"\n  [view]=\"view\"\n  [scheme]=\"colorScheme\"\n  [results]=\"multi\"\n  [gradient]=\"gradient\"\n  [xAxis]=\"showXAxis\"\n  [yAxis]=\"showYAxis\"\n  [legend]=\"showLegend\"\n  [showXAxisLabel]=\"showXAxisLabel\"\n  [showYAxisLabel]=\"showYAxisLabel\"\n  [xAxisLabel]=\"xAxisLabel\"\n  [yAxisLabel]=\"yAxisLabel\"\n  (select)=\"onSelect($event)\">\n</ngx-charts-bar-vertical-stacked>\n"

/***/ }),

/***/ "./src/app/scan-report/chart-temporal/chart-temporal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportChartTemporalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ReportChartTemporalComponent = /** @class */ (function () {
    function ReportChartTemporalComponent() {
        this.view = [];
        // options
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = true;
        this.showXAxisLabel = true;
        this.xAxisLabel = 'Days';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'Vulnerabilities';
        this.added = [];
        this.colorScheme = {
            domain: []
        };
    }
    Object.defineProperty(ReportChartTemporalComponent.prototype, "reports", {
        get: function () {
            return this._reports;
        },
        set: function (reps) {
            var _this = this;
            this._reports = reps;
            if (reps[0] && reps[0].data && reps[0].data.issues) {
                this.multi = reps.map(function (val, i, arr) {
                    var day = new Date(val.create_date);
                    return {
                        "name": day.getUTCDate() + "/" + (day.getMonth() + 1),
                        "series": val.data.issues.reduce(function (total, isu, j, arr2) {
                            _this.addColorForSeverity(isu.severity);
                            var vulner = total.filter(function (redVal) { return redVal.name === isu.severity; });
                            if (!vulner || vulner.length === 0) {
                                total.push({
                                    "name": isu.severity,
                                    "value": 1
                                });
                            }
                            else {
                                vulner[0].value++;
                            }
                            return total;
                        }, [])
                    };
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    ReportChartTemporalComponent.prototype.ngOnInit = function () {
    };
    ReportChartTemporalComponent.prototype.addColorForSeverity = function (sev) {
        //['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
        if (this.added.find(function (val, i, obj) {
            if (val === sev)
                return true;
            return false;
        })) {
            return;
        }
        else {
            this.added.push(sev);
            if (sev === 'informational') {
                this.colorScheme.domain.push('#AAAAAA');
            }
            else if (sev === "low") {
                this.colorScheme.domain.push("#5AA454");
            }
            else {
                this.colorScheme.domain.push("#A10A28");
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], ReportChartTemporalComponent.prototype, "reports", null);
    ReportChartTemporalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'report-chart-temporal',
            template: __webpack_require__("./src/app/scan-report/chart-temporal/chart-temporal.component.html"),
            styles: [__webpack_require__("./src/app/scan-report/chart-temporal/chart-temporal.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ReportChartTemporalComponent);
    return ReportChartTemporalComponent;
}());



/***/ }),

/***/ "./src/app/scan-report/chart/chart.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/scan-report/chart/chart.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-charts-pie-chart *ngIf=\"report\"\n  [view]=\"view\"\n  [scheme]=\"colorScheme\"\n  [results]=\"single\"\n  [legend]=\"showLegend\"\n  [explodeSlices]=\"explodeSlices\"\n  [labels]=\"showLabels\"\n  [doughnut]=\"doughnut\"\n  [gradient]=\"gradient\"\n  (select)=\"onSelect($event)\">\n</ngx-charts-pie-chart>\n\n<!--\n<ngx-charts-bar-vertical *ngIf=\"report\"\n  [view]=\"view\"\n  [scheme]=\"colorScheme\"\n  [results]=\"single\"\n  [gradient]=\"gradient\"\n  [xAxis]=\"showXAxis\"\n  [yAxis]=\"showYAxis\"\n  [legend]=\"showLegend\"\n  [showXAxisLabel]=\"showXAxisLabel\"\n  [showYAxisLabel]=\"showYAxisLabel\"\n  [xAxisLabel]=\"xAxisLabel\"\n  [yAxisLabel]=\"yAxisLabel\"\n  (select)=\"onSelect($event)\">\n</ngx-charts-bar-vertical>\n\n-->"

/***/ }),

/***/ "./src/app/scan-report/chart/chart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanReportChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scan_report_scan_report__ = __webpack_require__("./src/app/scan-report/scan-report.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ScanReportChartComponent = /** @class */ (function () {
    function ScanReportChartComponent() {
        this.multi = [];
        this.single = [];
        this.view = [];
        // options
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = true;
        this.showXAxisLabel = true;
        this.xAxisLabel = 'Vulnerabilities';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'Occurrancces';
        // pie
        this.showLabels = true;
        this.explodeSlices = false;
        this.doughnut = false;
        this.colorScheme = {
            domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
        };
    }
    Object.defineProperty(ScanReportChartComponent.prototype, "report", {
        get: function () {
            return this._report;
        },
        set: function (rep) {
            this._report = rep;
            if (rep && rep.data && rep.data.issues) {
                this.single = rep.data.issues.map(function (val, i, arr) {
                    return val.name;
                }).reduce(function (valLast, val, i, arr) {
                    var vulner = valLast.filter(function (redVal) { return redVal.name === val; });
                    if (!vulner || vulner.length === 0) {
                        valLast.push({
                            "name": val,
                            "value": 1
                        });
                    }
                    else {
                        vulner[0].value++;
                    }
                    return valLast;
                }, []);
                console.log(this.single);
            }
        },
        enumerable: true,
        configurable: true
    });
    ScanReportChartComponent.prototype.onSelect = function (event) {
        console.log(event);
    };
    ScanReportChartComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__scan_report_scan_report__["a" /* ScanReport */]),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__scan_report_scan_report__["a" /* ScanReport */]])
    ], ScanReportChartComponent.prototype, "report", null);
    ScanReportChartComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'scan-report-chart',
            template: __webpack_require__("./src/app/scan-report/chart/chart.component.html"),
            styles: [__webpack_require__("./src/app/scan-report/chart/chart.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ScanReportChartComponent);
    return ScanReportChartComponent;
}());



/***/ }),

/***/ "./src/app/scan-report/full-view-arachni/full-view-arachni.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/scan-report/full-view-arachni/full-view-arachni.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"report\" class=\"row\">\n  <div class=\"col-md-6\">\n    <form>\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <!--HEADER -->\n          <dl class=\"row\">\n            <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Name of the Report\">Report:</dt>\n            <dd class=\"col-sm-8 text-left text-truncate\">{{report.name}}</dd>\n          </dl>\n        </div>\n        <div class=\"card-body\">\n          <dl *ngIf=\"report.data.url\" class=\"row\">\n            <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Scan for URL\">URL: </dt>\n            <dd class=\"col-sm-8 text-left text-truncate\">\n              <a>{{report.data.url}}</a>\n            </dd>\n\n          </dl>\n          <hr />\n          <dl *ngFor=\"let issue of report.data.issues\" class=\"row\">\n            <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Issue Name\">Issue: </dt>\n            <dd class=\"col-sm-8 text-left text-truncate\">\n              <a>{{issue.name}}</a>\n            </dd>\n            <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Issue Severity\">Severity: </dt>\n            <dd class=\"col-sm-8 text-left text-truncate\">\n              <a>{{issue.severity}}</a>\n            </dd>\n            <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Issue Vector\">Vector: </dt>\n            <dd class=\"col-sm-8 text-left text-truncate\">\n              <a>{{issue.vector}}</a>\n            </dd>\n            <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Issue found in URL\">Found in: </dt>\n            <dd class=\"col-sm-8 text-left text-truncate\">\n              <a>{{issue.url}}</a>\n            </dd>\n            <hr />\n          </dl>\n          <dl class=\"row\">\n            <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The creation date for this report\">Creation Date</dt>\n            <dd class=\"col-sm-8 text-left text-truncate\">{{report.create_date}}</dd>\n          </dl>\n          <dl class=\"row\">\n            <dt class=\"col-sm-3\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The ID of the report\">ID</dt>\n            <dd class=\"col-sm-9\">{{report.id}}</dd>\n          </dl>\n          <hr />\n        </div>\n      </div>\n    </form>\n  </div>\n  <div class=\"col-md-6\">\n      <scan-report-chart [report]=\"report\"></scan-report-chart>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/scan-report/full-view-arachni/full-view-arachni.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FullViewArachniComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scan_report__ = __webpack_require__("./src/app/scan-report/scan-report.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FullViewArachniComponent = /** @class */ (function () {
    function FullViewArachniComponent() {
        this.reportOut = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    FullViewArachniComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__scan_report__["a" /* ScanReport */])
    ], FullViewArachniComponent.prototype, "report", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], FullViewArachniComponent.prototype, "reportOut", void 0);
    FullViewArachniComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'full-view-arachni',
            template: __webpack_require__("./src/app/scan-report/full-view-arachni/full-view-arachni.component.html"),
            styles: [__webpack_require__("./src/app/scan-report/full-view-arachni/full-view-arachni.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FullViewArachniComponent);
    return FullViewArachniComponent;
}());



/***/ }),

/***/ "./src/app/scan-report/full-view-wappalyzer/full-view-wappalyzer.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/scan-report/full-view-wappalyzer/full-view-wappalyzer.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"report\" class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-sm-4 text-right\">\n      <form>\n        <div class=\"card\">\n          <div class=\"card-header\">\n            <!--HEADER -->\n            <h4>Report: {{report.name}}</h4>\n          </div>\n          <div class=\"card-body\">\n            <h4>Detected URLs</h4>\n            <p *ngFor=\"let url of report.data.urls\">\n              <a (href)=\"url\">{{url}}</a>\n            </p>\n            <hr />\n            <dl class=\"row\">\n              <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The creation date for this report\">Creation Date</dt>\n              <dd class=\"col-sm-8 text-left text-truncate\">{{report.create_date}}</dd>\n            </dl>\n            <dl class=\"row\">\n              <dt class=\"col-sm-3\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The ID of the report\">ID</dt>\n              <dd class=\"col-sm-9\">{{report.id}}</dd>\n            </dl>\n            <hr />\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class=\"col-sm-8 text-left text-truncate\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <!--HEADER -->\n          <h5>Application List</h5>\n        </div>\n        <div class=\"card-body\">\n          <table class=\"table table-striped table-hover\">\n            <thead>\n              <tr>\n                <th scope=\"col\">Application</th>\n                <th scope=\"col\">Confidence</th>\n                <th scope=\"col\">Version</th>\n                <th scope=\"col\">Categories</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let app of report.data.applications\">\n                <th scope=\"row\">{{app.name}}</th>\n                <td>{{app.confidence}}</td>\n                <td>{{app.version}}</td>\n                <td>\n                  <a *ngFor=\"let cat of app.categories\">{{cat | wappacat}}</a>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/scan-report/full-view-wappalyzer/full-view-wappalyzer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FullViewWappalyzerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scan_report__ = __webpack_require__("./src/app/scan-report/scan-report.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FullViewWappalyzerComponent = /** @class */ (function () {
    function FullViewWappalyzerComponent() {
    }
    FullViewWappalyzerComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__scan_report__["a" /* ScanReport */])
    ], FullViewWappalyzerComponent.prototype, "report", void 0);
    FullViewWappalyzerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'full-view-wappalyzer',
            template: __webpack_require__("./src/app/scan-report/full-view-wappalyzer/full-view-wappalyzer.component.html"),
            styles: [__webpack_require__("./src/app/scan-report/full-view-wappalyzer/full-view-wappalyzer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FullViewWappalyzerComponent);
    return FullViewWappalyzerComponent;
}());



/***/ }),

/***/ "./src/app/scan-report/full-view/full-view.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/scan-report/full-view/full-view.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"report\">\n  <full-view-arachni [report]=\"report\" *ngIf=\"report.reporter.toLowerCase() ==='webward' || report.reporter.toLowerCase() ==='arachni'\"></full-view-arachni>\n  <full-view-wappalyzer [report]=\"report\" *ngIf=\"report.reporter.toLowerCase() ==='wappalyzer'\"></full-view-wappalyzer>\n</div>"

/***/ }),

/***/ "./src/app/scan-report/full-view/full-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FullReportViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reports_service__ = __webpack_require__("./src/app/scan-report/reports.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FullReportViewComponent = /** @class */ (function () {
    function FullReportViewComponent(route, location, reportService, alert) {
        this.route = route;
        this.location = location;
        this.reportService = reportService;
        this.alert = alert;
    }
    FullReportViewComponent.prototype.ngOnInit = function () {
        setTimeout(this.fetchData.bind(this), 500);
    };
    FullReportViewComponent.prototype.fetchData = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.reportService.getReport(params['id']); })
            .subscribe(function (data) {
            console.log(data);
            _this.report = data;
        }, function (err) { });
    };
    FullReportViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'report-full-view',
            template: __webpack_require__("./src/app/scan-report/full-view/full-view.component.html"),
            styles: [__webpack_require__("./src/app/scan-report/full-view/full-view.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_0__reports_service__["a" /* ReportsService */],
            __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__["a" /* AlertService */]])
    ], FullReportViewComponent);
    return FullReportViewComponent;
}());



/***/ }),

/***/ "./src/app/scan-report/reports.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__web_project_web_project_service__ = __webpack_require__("./src/app/web-project/web-project.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ReportsService = /** @class */ (function () {
    function ReportsService(http, AppSettings, webProjService) {
        var _this = this;
        this.http = http;
        this.AppSettings = AppSettings;
        this.webProjService = webProjService;
        this.pullerObserver = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.subscriber = observer;
        });
    }
    ReportsService.prototype.getReports = function () {
        var webProj = this.webProjService.getActualProject();
        if (webProj && webProj.id) {
            return this.http.get(this.AppSettings.API_ENDPOINT + 'report/' + webProj.id).map(function (data) {
                return data.map(function (val, i, arr) {
                    val.daysAgo = millisecsToDays(Math.abs(Date.now() - (new Date(val.create_date)).valueOf()));
                    return val;
                });
            });
        }
    };
    ReportsService.prototype.getReport = function (id) {
        var webProj = this.webProjService.getActualProject();
        if (webProj && webProj.id) {
            return this.http.get(this.AppSettings.API_ENDPOINT + 'report/' + webProj.id + "/" + id).map(function (data) {
                var data2 = data;
                data2.daysAgo = millisecsToDays(Math.abs(Date.now() - (new Date(data2.create_date)).valueOf()));
                return data2;
            });
        }
    };
    ReportsService.prototype.deleteReport = function (id) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            var webProj = _this.webProjService.getActualProject();
            if (webProj && webProj.id) {
                _this.http.delete(_this.AppSettings.API_ENDPOINT + 'report/' + webProj.id + "/" + id, { responseType: 'json' })
                    .subscribe(function (data) {
                    _this.notify();
                    observer.next(data);
                }, function (err) {
                    observer.error(err);
                });
            }
            else {
                observer.error(new Error("No valid webproject"));
            }
        });
    };
    /**
     * Get notified when a object is deleted, update or created.
     * Dont use it in @Input Components
     */
    ReportsService.prototype.subscribeToReports = function () {
        return this.pullerObserver;
    };
    /**
     * Use internally
     */
    ReportsService.prototype.notify = function () {
        try {
            this.subscriber.next(true);
        }
        catch (err) { }
    };
    ReportsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__app_settings_service__["a" /* AppSettingsService */], __WEBPACK_IMPORTED_MODULE_6__web_project_web_project_service__["a" /* WebProjectService */]])
    ], ReportsService);
    return ReportsService;
}());

function millisecsToDays(mills) {
    return Math.round(mills / (1000 * 60 * 60 * 24));
}


/***/ }),

/***/ "./src/app/scan-report/scan-report.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/scan-report/scan-report.component.html":
/***/ (function(module, exports) {

module.exports = "<div class='container'>\n  <div class=\"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom\">\n    <h4>List of Reports for this Web Project</h4>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-12 col-md-6\">\n      <div class=\"list-group\">\n        <div *ngFor=\"let report of reportList\" (click)=\"onSelect(report)\">\n          <a [class.active]=\"report === selectedReport\" class=\"list-group-item list-group-item-action flex-column align-items-start\">\n\n            <div class=\"d-flex w-100 justify-content-between\">\n              <h5 class=\"mb-1\">{{report.name}}</h5>\n              <small *ngIf=\"report.daysAgo === 0\">Today</small>\n              <small *ngIf=\"report.daysAgo != 0\">{{report.daysAgo}} days ago</small>\n            </div>\n            <p class=\"mb-1\" *ngIf=\"report.reporter.toLowerCase() === 'webward' || report.reporter.toLowerCase() === 'arachni'\">\n              For URL: {{report.data.url}}\n              Total issues: {{report.data.issues.length}}\n            </p>\n            <small>Project: {{report.project}}</small>\n          </a>\n        </div>\n\n      </div>\n      <hr/>\n    </div>\n    <div class=\"col-sm-12 col-md-6\">\n      <view-report [report]=\"selectedReport\"></view-report>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/scan-report/scan-report.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanReportComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reports_service__ = __webpack_require__("./src/app/scan-report/reports.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ScanReportComponent = /** @class */ (function () {
    function ScanReportComponent(reportService) {
        this.reportService = reportService;
        this.reportList = [];
    }
    ScanReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchData();
        this.reportService.subscribeToReports().subscribe(function (data) {
            _this.fetchData();
        }, function (err) { });
    };
    ScanReportComponent.prototype.fetchData = function () {
        var _this = this;
        this.reportService.getReports().subscribe(function (data) {
            _this.reportList = data;
        }, function (err) {
            _this.reportList = [];
        });
    };
    ScanReportComponent.prototype.onSelect = function (report) {
        this.selectedReport = report;
    };
    ScanReportComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'scan-report',
            template: __webpack_require__("./src/app/scan-report/scan-report.component.html"),
            styles: [__webpack_require__("./src/app/scan-report/scan-report.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__reports_service__["a" /* ReportsService */]])
    ], ScanReportComponent);
    return ScanReportComponent;
}());



/***/ }),

/***/ "./src/app/scan-report/scan-report.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanReport; });
var ScanReport = /** @class */ (function () {
    function ScanReport() {
        /**
         * Report data
         */
        this.data = {};
    }
    return ScanReport;
}());

/**
 * WAPPALYZER Categories:
 *
 *
 */ 


/***/ }),

/***/ "./src/app/scan-report/view/view.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/scan-report/view/view.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"report\">\n  <form>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <!--HEADER -->\n        <dl class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Name of the Report\">Report:</dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">{{report.name}}</dd>\n        </dl>\n      </div>\n      <div class=\"card-body\" *ngIf=\"report.reporter.toLowerCase() === 'webward' || report.reporter.toLowerCase() === 'arachni'\">\n        <dl *ngIf=\"report.data.url\" class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Scan for URL\">URL: </dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">\n            <a>{{report.data.url}}</a>\n          </dd>\n\n        </dl>\n        <hr />\n        <dl *ngFor=\"let issue of report.data.issues\" class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Issue Name\">Issue: </dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">\n            <a>{{issue.name}}</a>\n          </dd>\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Issue Severity\">Severity: </dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">\n            <a>{{issue.severity}}</a>\n          </dd>\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Issue Vector\">Vector: </dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">\n            <a>{{issue.vector}}</a>\n          </dd>\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Issue found in URL\">Found in: </dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">\n            <a>{{issue.url}}</a>\n          </dd>\n          <hr />\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The creation date for this report\">Creation Date</dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">{{report.create_date}}</dd>\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The ID of the report\">ID</dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">{{report.id}}</dd>\n        </dl>\n        <hr />\n        <dl *ngIf=\"report.data.url\" class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Scan for URL\">URL: </dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">\n            <a>{{report.data.url}}</a>\n          </dd>\n        </dl>\n        <div class=\"btn-group\">\n          <button type=\"submit\" class=\"btn btn-primary\" routerLink=\"/reports/{{report.id}}\">Full View</button>\n          <div *ngIf=\"!auth.isDev()\" class=\"btn-group\">\n            <button type=\"submit\" class=\"btn btn-danger\" (click)=\"deleteReport()\">Remove</button>\n          </div>\n        </div>\n      </div>\n      <div class=\"card-body\" *ngIf=\"report.reporter.toLowerCase() === 'wappalyzer'\">\n        <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"reporter\">Reported By: </dt>\n        <dd class=\"col-sm-8 text-left text-truncate\">Wappalyzer Scanner</dd>\n        <div class=\"btn-group\">\n          <button type=\"submit\" class=\"btn btn-primary\" routerLink=\"/reports/{{report.id}}\">Full View</button>\n          <div *ngIf=\"!auth.isDev()\" class=\"btn-group\">\n            <button type=\"submit\" class=\"btn btn-danger\" (click)=\"deleteReport()\">Remove</button>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </form>\n\n</div>"

/***/ }),

/***/ "./src/app/scan-report/view/view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewReportComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scan_report__ = __webpack_require__("./src/app/scan-report/scan-report.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reports_service__ = __webpack_require__("./src/app/scan-report/reports.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ViewReportComponent = /** @class */ (function () {
    function ViewReportComponent(auth, reportService) {
        this.auth = auth;
        this.reportService = reportService;
    }
    ViewReportComponent.prototype.ngOnInit = function () {
    };
    ViewReportComponent.prototype.deleteReport = function () {
        this.reportService.deleteReport(this.report.id).subscribe(function (dat) { }, function (err) { });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__scan_report__["a" /* ScanReport */])
    ], ViewReportComponent.prototype, "report", void 0);
    ViewReportComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'view-report',
            template: __webpack_require__("./src/app/scan-report/view/view.component.html"),
            styles: [__webpack_require__("./src/app/scan-report/view/view.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_3__reports_service__["a" /* ReportsService */]])
    ], ViewReportComponent);
    return ViewReportComponent;
}());



/***/ }),

/***/ "./src/app/scan-report/wappa-cat.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WappaCatPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wappalyzer__ = __webpack_require__("./src/app/scan-report/wappalyzer.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var WappaCatPipe = /** @class */ (function () {
    function WappaCatPipe() {
    }
    WappaCatPipe.prototype.transform = function (value, args) {
        var aux = __WEBPACK_IMPORTED_MODULE_1__wappalyzer__["a" /* CATEGORIES */][value];
        if (aux.name) {
            return aux.name;
        }
        else {
            return value;
        }
    };
    WappaCatPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'wappacat'
        })
    ], WappaCatPipe);
    return WappaCatPipe;
}());



/***/ }),

/***/ "./src/app/scan-report/wappalyzer.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CATEGORIES; });
var CATEGORIES = {
    "1": {
        "name": "CMS",
        "priority": 1
    },
    "2": {
        "name": "Message Boards",
        "priority": 1
    },
    "3": {
        "name": "Database Managers",
        "priority": 2
    },
    "4": {
        "name": "Documentation Tools",
        "priority": 2
    },
    "5": {
        "name": "Widgets",
        "priority": 9
    },
    "6": {
        "name": "Ecommerce",
        "priority": 1
    },
    "7": {
        "name": "Photo Galleries",
        "priority": 1
    },
    "8": {
        "name": "Wikis",
        "priority": 1
    },
    "9": {
        "name": "Hosting Panels",
        "priority": 1
    },
    "10": {
        "name": "Analytics",
        "priority": 9
    },
    "11": {
        "name": "Blogs",
        "priority": 1
    },
    "12": {
        "name": "JavaScript Frameworks",
        "priority": 5
    },
    "13": {
        "name": "Issue Trackers",
        "priority": 2
    },
    "14": {
        "name": "Video Players",
        "priority": 7
    },
    "15": {
        "name": "Comment Systems",
        "priority": 9
    },
    "16": {
        "name": "Captchas",
        "priority": 9
    },
    "17": {
        "name": "Font Scripts",
        "priority": 9
    },
    "18": {
        "name": "Web Frameworks",
        "priority": 4
    },
    "19": {
        "name": "Miscellaneous",
        "priority": 9
    },
    "20": {
        "name": "Editors",
        "priority": 4
    },
    "21": {
        "name": "LMS",
        "priority": 1
    },
    "22": {
        "name": "Web Servers",
        "priority": 7
    },
    "23": {
        "name": "Cache Tools",
        "priority": 9
    },
    "24": {
        "name": "Rich Text Editors",
        "priority": 5
    },
    "25": {
        "name": "JavaScript Graphics",
        "priority": 3
    },
    "26": {
        "name": "Mobile Frameworks",
        "priority": 3
    },
    "27": {
        "name": "Programming Languages",
        "priority": 4
    },
    "28": {
        "name": "Operating Systems",
        "priority": 5
    },
    "29": {
        "name": "Search Engines",
        "priority": 4
    },
    "30": {
        "name": "Web Mail",
        "priority": 2
    },
    "31": {
        "name": "CDN",
        "priority": 9
    },
    "32": {
        "name": "Marketing Automation",
        "priority": 9
    },
    "33": {
        "name": "Web Server Extensions",
        "priority": 7
    },
    "34": {
        "name": "Databases",
        "priority": 5
    },
    "35": {
        "name": "Maps",
        "priority": 9
    },
    "36": {
        "name": "Advertising Networks",
        "priority": 9
    },
    "37": {
        "name": "Network Devices",
        "priority": 9
    },
    "38": {
        "name": "Media Servers",
        "priority": 1
    },
    "39": {
        "name": "Webcams",
        "priority": 9
    },
    "40": {
        "name": "Printers",
        "priority": 9
    },
    "41": {
        "name": "Payment Processors",
        "priority": 8
    },
    "42": {
        "name": "Tag Managers",
        "priority": 9
    },
    "43": {
        "name": "Paywalls",
        "priority": 9
    },
    "44": {
        "name": "Build CI Systems",
        "priority": 4
    },
    "45": {
        "name": "Control Systems",
        "priority": 8
    },
    "46": {
        "name": "Remote Access",
        "priority": 8
    },
    "47": {
        "name": "Dev Tools",
        "priority": 3
    },
    "48": {
        "name": "Network Storage",
        "priority": 9
    },
    "49": {
        "name": "Feed Readers",
        "priority": 1
    },
    "50": {
        "name": "Document Management Systems",
        "priority": 1
    },
    "51": {
        "name": "Landing Page Builders",
        "priority": 2
    },
    "52": {
        "name": "Live Chat",
        "priority": 9
    },
    "53": {
        "name": "CRM",
        "priority": 7
    },
    "54": {
        "name": "SEO",
        "priority": 7
    },
    "55": {
        "name": "Accounting",
        "priority": 1
    },
    "56": {
        "name": "Cryptominer",
        "priority": 8
    },
    "57": {
        "name": "Static Site Generator",
        "priority": 1
    }
};


/***/ }),

/***/ "./src/app/signin/signin.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/signin/signin.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row justify-content-center\">\n    <div class=\"col-6\">\n      <form class=\"form-signin\">\n        <div class=\"col-sm-12 text-center\">\n          <img class=\"img-responsive\" src=\"/assets/WebWardLogo.svg\" alt=\"\" width=\"72\" height=\"72\">\n          <h1 class=\"h3 mb-3 font-weight-normal\">Please sign in</h1>\n        </div>\n\n        \n        <label for=\"inputUsername\" class=\"sr-only\">User Name</label>\n        <input id=\"inputUsername\" class=\"form-control\" placeholder=\"User Name\" required=\"\" autofocus=\"\" type=\"text\" [(ngModel)]=\"username\"\n          name=\"username\">\n        <label for=\"inputPassword\" class=\"sr-only\">Password</label>\n        <input id=\"inputPassword\" class=\"form-control\" placeholder=\"Password\" required=\"\" type=\"password\" [(ngModel)]=\"password\"\n          name=\"password\">\n        <div class=\"checkbox mb-3\">\n          <label>\n            <input name=\"rememberMe\" value=\"remember-me\" type=\"checkbox\" [(ngModel)]=\"remember\"> Remember me\n          </label>\n        </div>\n        <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\" (click)=\"signIn()\">Sign in</button>\n        <p class=\"mt-5 mb-3 text-muted\">© 2017-2018</p>\n      </form>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/signin/signin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SigninComponent = /** @class */ (function () {
    function SigninComponent(auth, router, alerts) {
        this.auth = auth;
        this.router = router;
        this.alerts = alerts;
        this.username = "";
        this.password = "";
        this.remember = false;
    }
    SigninComponent.prototype.ngOnInit = function () {
        this.auth.signOut();
    };
    SigninComponent.prototype.signIn = function () {
        var _this = this;
        if (this.username.length >= 3) {
            this.auth.signIn(this.username, this.password, this.remember).subscribe(function (data) {
                _this.router.navigate(['']);
            }, function (err) {
                _this.alerts.clear();
                _this.alerts.error('message' in err.error ? err.error.message : "Cant login", false);
            });
        }
        else {
            this.alerts.error("No user provided", false);
        }
    };
    SigninComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-signin',
            template: __webpack_require__("./src/app/signin/signin.component.html"),
            styles: [__webpack_require__("./src/app/signin/signin.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__["a" /* AlertService */]])
    ], SigninComponent);
    return SigninComponent;
}());



/***/ }),

/***/ "./src/app/threat-model/edit/edit.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/threat-model/edit/edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"model\" class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <h3>Threat Model: {{model.name}}</h3>\n    </div>\n    <div class=\"col-md-5\">\n      <form>\n        <div class=\"card\">\n          <div class=\"card-header\">\n            <!--HEADER -->\n            <div class=\"form-group\">\n              <label for=\"checkName\">Threat Model Name</label>\n              <input type=\"text\" class=\"form-control\" name=\"name\" id=\"modelName\" placeholder=\"Threat Model Name\" [(ngModel)]=\"model.name\">\n            </div>\n          </div>\n          <div class=\"card-body\">\n            <div class=\"form-group\">\n              <label for=\"description\">Description</label>\n              <input type=\"text\" class=\"form-control\" name=\"description\" id=\"description\" placeholder=\"Threat Model Description\" [(ngModel)]=\"model.description\">\n            </div>\n            <div class=\"form-group\">\n              <label for=\"checkName\">WebApp URL</label>\n              <input type=\"text\" class=\"form-control\" name=\"modelURL\" id=\"modelURL\" placeholder=\"Threat Model URL\" [(ngModel)]=\"model.url\">\n            </div>\n\n            <dl class=\"row\">\n              <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Scan for URL\">Version: </dt>\n              <dd class=\"col-sm-7\">\n                <a> v{{model.version}} rev{{model.review}}</a>\n              </dd>\n            </dl>\n            <dl class=\"row\">\n              <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The creation date for this model\">Creation Date</dt>\n              <dd class=\"col-sm-7\">{{model.create_date}}</dd>\n            </dl>\n            <dl class=\"row\">\n              <dt class=\"col-sm-3\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The ID of the model\">ID</dt>\n              <dd class=\"col-sm-9\">{{model.id}}</dd>\n            </dl>\n            <div class=\"form-group\">\n              <dl class=\"row\">\n                <dt class=\"col-sm-3\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Report Model\">Actual Report:</dt>\n                <dd class=\"col-sm-9 text-truncate\">\n                  <a class=\"text-left text-truncate\" target=\"_blank\" (click)=\"downloadFile(model.threatmodelreport)\">{{model.threatmodelreport}}</a>\n                </dd>\n              </dl>\n              <input type=\"file\" name=\"fileReport\" (change)=\"fileChangeReport($event)\" placeholder=\"Upload file\" accept=\".pdf,.doc,.docx,.htm,.html\">\n            </div>\n            <div class=\"form-group\">\n              <dl class=\"row\">\n                <dt class=\"col-sm-3\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Report Model\">Actual Model:</dt>\n                <dd class=\"col-sm-9 text-truncate\">\n                  <a class=\"text-left text-truncate\" target=\"_blank\" (click)=\"downloadFile(model.threatmodelfile)\">{{model.threatmodelfile}}</a>\n                </dd>\n              </dl>\n              <input type=\"file\" name=\"fileModel\" (change)=\"fileChangeModel($event)\" placeholder=\"Upload file\" accept=\".doc,.docx,.tm7\">\n            </div>\n            <div class=\"btn-group\">\n              <button type=\"submit\" class=\"btn btn-primary\" (click)=\"save()\">Review</button>\n              <button type=\"submit\" class=\"btn btn-secondary\" (click)=\"cancel()\">Cancel</button>\n            </div>\n            <hr/>\n            <div class=\"form-group\">\n              <dl class=\"row\">\n                <dt class=\"col-sm-3\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Report Model\">Actual Tempalte:</dt>\n                <dd class=\"col-sm-9 text-truncate\">\n                  <a class=\"text-left text-truncate\" target=\"_blank\" (click)=\"downloadFile(model.threatmodeltemplate)\">{{model.threatmodeltemplate}}</a>\n                </dd>\n              </dl>\n              <input type=\"file\" name=\"fileTemplate\" (change)=\"fileChangeTemplate($event)\" placeholder=\"Upload file\" accept=\".doc,.docx,.tb7\">\n            </div>\n            <div class=\"btn-group\">\n              <button type=\"submit\" class=\"btn btn-primary\" (click)=\"saveFiles()\">Make new Version</button>\n              <button type=\"submit\" class=\"btn btn-secondary\" (click)=\"cancel()\">Cancel</button>\n            </div>\n          </div>\n        </div>\n      </form>\n      <a #autoDownloadContentReport id=\"autoDownloadContentReport\" style=\"display: none;\"></a>\n    </div>\n    <div class=\"col-md-7\">\n      <threat-model-report [model]=\"model\"></threat-model-report>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/threat-model/edit/edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThreatModelEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__threat_model_service__ = __webpack_require__("./src/app/threat-model/threat-model.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ThreatModelEditComponent = /** @class */ (function () {
    function ThreatModelEditComponent(route, location, alert, thModService) {
        this.route = route;
        this.location = location;
        this.alert = alert;
        this.thModService = thModService;
    }
    ThreatModelEditComponent.prototype.ngOnInit = function () {
        setTimeout(this.fetchData.bind(this), 500);
    };
    ThreatModelEditComponent.prototype.fetchData = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.thModService.getThreatModel(params['id']); })
            .subscribe(function (data) {
            _this.model = data;
        }, function (err) { });
    };
    ThreatModelEditComponent.prototype.save = function () {
        this.saveFiles();
    };
    ThreatModelEditComponent.prototype.saveFiles = function () {
        var _this = this;
        if (this.fileModel || this.fileReport || this.fileTemplate) {
            this.thModService.updateThreatModelWithFiles(this.model, this.fileModel, this.fileReport, this.fileTemplate).subscribe(function (data) {
                _this.alert.success("Threat Model saved");
            }, function (err) {
                console.log(err);
                _this.alert.error("Can´t save Threat Model");
            });
        }
    };
    ThreatModelEditComponent.prototype.fileChangeModel = function (event) {
        var fileList = event.target.files;
        console.log(fileList);
        if (fileList.length > 0) {
            this.fileModel = fileList[0];
        }
    };
    ThreatModelEditComponent.prototype.fileChangeReport = function (event) {
        var fileList = event.target.files;
        if (fileList.length > 0) {
            this.fileReport = fileList[0];
        }
    };
    ThreatModelEditComponent.prototype.fileChangeTemplate = function (event) {
        var fileList = event.target.files;
        if (fileList.length > 0) {
            this.fileTemplate = fileList[0];
        }
    };
    ThreatModelEditComponent.prototype.cancel = function () {
        this.location.back();
    };
    ThreatModelEditComponent.prototype.downloadFile = function (name) {
        var _this = this;
        this.thModService.downloadFile(name).subscribe(function (data) {
            try {
                var url = window.URL.createObjectURL(data);
                var anchor = _this.autoDownload.nativeElement;
                anchor.download = _this.model.name + "_v" + _this.model.version + "r" + _this.model.review + "." + name.split('.').pop();
                anchor.href = url;
                anchor.click();
                //window.open(url, '_blank');
            }
            catch (error) {
            }
        }, function (err) {
            console.log(err);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('autoDownloadContentReport'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], ThreatModelEditComponent.prototype, "autoDownload", void 0);
    ThreatModelEditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'threat-model-edit',
            template: __webpack_require__("./src/app/threat-model/edit/edit.component.html"),
            styles: [__webpack_require__("./src/app/threat-model/edit/edit.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_1__alert_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_2__threat_model_service__["a" /* ThreatModelService */]])
    ], ThreatModelEditComponent);
    return ThreatModelEditComponent;
}());



/***/ }),

/***/ "./src/app/threat-model/new/new.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/threat-model/new/new.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"model\">\n  <form>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <!--HEADER -->\n\n        <div class=\"form-group\">\n          <label for=\"checkName\">Threat Model Name</label>\n          <input type=\"text\" class=\"form-control\" name=\"name\" id=\"modelName\" placeholder=\"Threat Model Name\" [(ngModel)]=\"model.name\">\n        </div>\n      </div>\n      <div class=\"card-body\">\n        <div class=\"form-group\">\n          <label for=\"description\">Description</label>\n          <input type=\"text\" class=\"form-control\" name=\"description\" id=\"description\" placeholder=\"Threat Model Description\" [(ngModel)]=\"model.description\">\n        </div>\n        <div class=\"form-group\">\n            <label for=\"checkName\">WebApp URL</label>\n            <input type=\"text\" class=\"form-control\" name=\"name\" id=\"modelURL\" placeholder=\"Threat Model URL\" [(ngModel)]=\"model.url\">\n          </div>\n        <div class=\"btn-group\">\n          <button type=\"submit\" class=\"btn btn-primary\" (click)=\"save()\">Save</button>\n          <button type=\"submit\" class=\"btn btn-secondary\" (click)=\"cancel()\">Cancel</button>\n        </div>\n      </div>\n    </div>\n  </form>\n\n</div>"

/***/ }),

/***/ "./src/app/threat-model/new/new.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThreatModelNewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__threat_model__ = __webpack_require__("./src/app/threat-model/threat-model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__threat_model_service__ = __webpack_require__("./src/app/threat-model/threat-model.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ThreatModelNewComponent = /** @class */ (function () {
    function ThreatModelNewComponent(alert, thModService) {
        this.alert = alert;
        this.thModService = thModService;
    }
    ThreatModelNewComponent.prototype.ngOnInit = function () {
    };
    ThreatModelNewComponent.prototype.save = function () {
        var _this = this;
        this.thModService.createThreatModel(this.model).subscribe(function (data) {
            _this.alert.clear();
            _this.alert.success("Created");
        }, function (err) {
            _this.alert.clear();
            _this.alert.error('message' in err.error ? err.error.message : "Cannot save Threat Model");
        });
    };
    ThreatModelNewComponent.prototype.cancel = function () {
        this.model = null;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__threat_model__["a" /* ThreatModel */])
    ], ThreatModelNewComponent.prototype, "model", void 0);
    ThreatModelNewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'threat-model-new',
            template: __webpack_require__("./src/app/threat-model/new/new.component.html"),
            styles: [__webpack_require__("./src/app/threat-model/new/new.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__alert_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_3__threat_model_service__["a" /* ThreatModelService */]])
    ], ThreatModelNewComponent);
    return ThreatModelNewComponent;
}());



/***/ }),

/***/ "./src/app/threat-model/report/report.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/threat-model/report/report.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"\" style=\"height:100%;width:100%\">\n  <iframe *ngIf=\"reportBlobURL\" [src]=\"htmlFrame()\" class=\"\" style=\"height:100%;width:100%\">\n  </iframe>\n</div>"

/***/ }),

/***/ "./src/app/threat-model/report/report.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThreatModelReportComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__threat_model__ = __webpack_require__("./src/app/threat-model/threat-model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__threat_model_service__ = __webpack_require__("./src/app/threat-model/threat-model.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ThreatModelReportComponent = /** @class */ (function () {
    function ThreatModelReportComponent(APP_SETTINGS, thModService, sanitizer) {
        this.APP_SETTINGS = APP_SETTINGS;
        this.thModService = thModService;
        this.sanitizer = sanitizer;
    }
    Object.defineProperty(ThreatModelReportComponent.prototype, "model", {
        get: function () {
            return this._model;
        },
        set: function (mod) {
            this._model = mod;
            if (mod.threatmodelreport && (typeof mod.threatmodelreport === 'string')) {
                this.downloadFile(mod.threatmodelreport);
            }
        },
        enumerable: true,
        configurable: true
    });
    ThreatModelReportComponent.prototype.ngOnInit = function () {
    };
    ThreatModelReportComponent.prototype.downloadFile = function (name) {
        var _this = this;
        this.thModService.downloadFile(name).subscribe(function (data) {
            try {
                _this.reportBlobURL = window.URL.createObjectURL(data);
            }
            catch (err) {
            }
        }, function (err) {
        });
    };
    ThreatModelReportComponent.prototype.htmlFrame = function () {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.reportBlobURL);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__threat_model__["a" /* ThreatModel */]),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__threat_model__["a" /* ThreatModel */]])
    ], ThreatModelReportComponent.prototype, "model", null);
    ThreatModelReportComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'threat-model-report',
            template: __webpack_require__("./src/app/threat-model/report/report.component.html"),
            styles: [__webpack_require__("./src/app/threat-model/report/report.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__app_settings_service__["a" /* AppSettingsService */],
            __WEBPACK_IMPORTED_MODULE_3__threat_model_service__["a" /* ThreatModelService */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["DomSanitizer"]])
    ], ThreatModelReportComponent);
    return ThreatModelReportComponent;
}());



/***/ }),

/***/ "./src/app/threat-model/threat-model.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/threat-model/threat-model.component.html":
/***/ (function(module, exports) {

module.exports = "<div class='container'>\n  <div class=\"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom\">\n    <h4>List of Threat Models</h4>\n    <div class=\"btn-toolbar mb-2 mb-md-0\">\n      <div class=\"btn-group mr-2\">\n        <div>\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"reviewThreatModel()\">Review Threat Model</button>\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"newThreatModel()\">Create new Threat Model</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"tempModel\" class=\"row\">\n    <div class=\"col-sm-12 col-xl-12\">\n      <threat-model-new [model]=\"tempModel\"></threat-model-new>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      <div class=\"list-group\">\n        <div *ngFor=\"let mod of models\" (click)=\"onSelect(mod)\">\n          <a [class.active]=\"mod === selectedModel\" class=\"list-group-item list-group-item-action flex-column align-items-start\">\n            <div class=\"d-flex w-100 justify-content-between\">\n              <h5 class=\"mb-1\">{{mod.name}}</h5>\n              <small>{{mod.applicationType}}</small>\n            </div>\n            <p class=\"mb-1\">\n              {{mod.description}}\n            </p>\n            <small *ngIf=\"mod.authors\"> Authors: {{mod.authors.join(',')}}</small>\n          </a>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-8\">\n      <threat-model-view [model]=\"selectedModel\"></threat-model-view>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/threat-model/threat-model.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThreatModelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__threat_model__ = __webpack_require__("./src/app/threat-model/threat-model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__threat_model_service__ = __webpack_require__("./src/app/threat-model/threat-model.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ThreatModelComponent = /** @class */ (function () {
    function ThreatModelComponent(thModService) {
        this.thModService = thModService;
        this.models = [];
    }
    ThreatModelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchData();
        this.thModService.subscribeToThreatModel().subscribe(function (data) {
            _this.fetchData();
        }, function (err) { });
    };
    ThreatModelComponent.prototype.fetchData = function () {
        var _this = this;
        this.thModService.getThreatModels().subscribe(function (data) {
            _this.models = data;
        }, function (err) {
            _this.models = [];
        });
    };
    ThreatModelComponent.prototype.onSelect = function (mod) {
        this.selectedModel = mod;
    };
    ThreatModelComponent.prototype.newThreatModel = function () {
        console.log("New threat model");
        this.tempModel = new __WEBPACK_IMPORTED_MODULE_1__threat_model__["a" /* ThreatModel */]();
        this.tempModel.name = "Threat Model Name";
        this.tempModel.description = "Threat Model Description";
    };
    ThreatModelComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-threat-model',
            template: __webpack_require__("./src/app/threat-model/threat-model.component.html"),
            styles: [__webpack_require__("./src/app/threat-model/threat-model.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__threat_model_service__["a" /* ThreatModelService */]])
    ], ThreatModelComponent);
    return ThreatModelComponent;
}());



/***/ }),

/***/ "./src/app/threat-model/threat-model.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThreatModelService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__web_project_web_project_service__ = __webpack_require__("./src/app/web-project/web-project.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ThreatModelService = /** @class */ (function () {
    function ThreatModelService(http, AppSettings, webProjService) {
        var _this = this;
        this.http = http;
        this.AppSettings = AppSettings;
        this.webProjService = webProjService;
        this.pullerObserver = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.subscriber = observer;
        });
    }
    ThreatModelService.prototype.getThreatModels = function () {
        var webProj = this.webProjService.getActualProject();
        if (webProj && webProj.id) {
            return this.http.get(this.AppSettings.API_ENDPOINT + 'threat-model/' + webProj.id).map(function (data) { return data; });
        }
    };
    ThreatModelService.prototype.getThreatModel = function (id) {
        var webProj = this.webProjService.getActualProject();
        if (webProj && webProj.id) {
            return this.http.get(this.AppSettings.API_ENDPOINT + 'threat-model/' + webProj.id + "/" + id).map(function (data) { return data; });
        }
    };
    ThreatModelService.prototype.deleteThreatModel = function (id) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            var webProj = _this.webProjService.getActualProject();
            if (webProj && webProj.id) {
                _this.http.delete(_this.AppSettings.API_ENDPOINT + 'threat-model/' + webProj.id + "/" + id, { responseType: 'json' })
                    .subscribe(function (data) {
                    _this.notify();
                    observer.next(data);
                }, function (err) {
                    observer.error(err);
                });
            }
            else {
                observer.error(new Error("No valid threat model"));
            }
        });
    };
    ThreatModelService.prototype.createThreatModel = function (thMod) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            var webProj = _this.webProjService.getActualProject();
            if (webProj && webProj.id) {
                _this.http.post(_this.AppSettings.API_ENDPOINT + 'threat-model/' + webProj.id, thMod, { responseType: 'json' })
                    .map(function (data) { return data; })
                    .subscribe(function (data) {
                    _this.notify();
                    observer.next(data);
                }, function (err) {
                    observer.error(err);
                });
            }
            else {
                observer.error(new Error("No valid threat model"));
            }
        });
    };
    ThreatModelService.prototype.updateThreatModel = function (thMod) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.put(_this.AppSettings.API_ENDPOINT + 'threat-model/' + thMod.project + "/" + thMod.id, thMod, { responseType: 'json' })
                .map(function (data) { return data; })
                .subscribe(function (data) {
                _this.notify();
                observer.next(data);
            }, function (err) {
                observer.error(err);
            });
        });
    };
    ThreatModelService.prototype.updateThreatModelWithFiles = function (thMod, fileMod, fileRep, fileTemp) {
        var formData = new FormData();
        if (fileMod)
            formData.append('threatModelFile', fileMod, fileMod.name);
        if (fileRep)
            formData.append('threatModelReport', fileRep, fileRep.name);
        if (fileTemp)
            formData.append('threatModelTemplate', fileTemp, fileTemp.name);
        formData.append('project', thMod.project);
        formData.append('id', thMod.id);
        return this.http.put(this.AppSettings.API_ENDPOINT + "threat-model/" + thMod.project + "/" + thMod.id, formData);
    };
    ThreatModelService.prototype.downloadFile = function (id) {
        return this.http.get(this.AppSettings.API_FILES + id, { headers: { 'Accept': '*/*' }, responseType: 'blob' })
            .map(function (res) {
            try {
                var myBlob = new Blob([res], { type: extractContentType(id.split('.').pop()) });
                return myBlob;
            }
            catch (err) {
                throw err;
            }
        });
    };
    /**
     * Get notified when a object is deleted, update or created.
     * Dont use it in @Input Components
     */
    ThreatModelService.prototype.subscribeToThreatModel = function () {
        return this.pullerObserver;
    };
    /**
     * Use internally
     */
    ThreatModelService.prototype.notify = function () {
        try {
            this.subscriber.next(true);
        }
        catch (err) { }
    };
    ThreatModelService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__app_settings_service__["a" /* AppSettingsService */], __WEBPACK_IMPORTED_MODULE_6__web_project_web_project_service__["a" /* WebProjectService */]])
    ], ThreatModelService);
    return ThreatModelService;
}());

function extractContentType(fileExt) {
    switch (fileExt) {
        case 'htm':
            return 'text/html';
        case 'html':
            return 'text/html';
        case 'doc':
            return 'application/msword';
        case 'pdf':
            return 'application/pdf';
        default:
            return 'application/octet-stream';
    }
}


/***/ }),

/***/ "./src/app/threat-model/threat-model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThreatModel; });
var ThreatModel = /** @class */ (function () {
    function ThreatModel() {
        /**
         * Aplication type: WebPage, WebService, WebApp, eCommerce
         */
        this.applicationtype = "WebPage";
        /**
         * Owner of the Threat Model
         */
        this.owners = [];
        /**
         * Authors
         */
        this.authors = [];
        /**
         * Involved people
         */
        this.stakeholders = [];
        /**
         * Document version
         */
        this.version = 1;
        /**
         * Revision of the version
         */
        this.review = 1;
        /**
         * System dependencies
         */
        this.system = [];
        /**
         * Libraries
         */
        this.platform = [];
    }
    return ThreatModel;
}());



/***/ }),

/***/ "./src/app/threat-model/view/view.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/threat-model/view/view.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"_model\">\n  <form>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <!--HEADER -->\n        <dl class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Name of the Threat Model\">Threat Model Name:</dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">{{_model.name}}</dd>\n        </dl>\n      </div>\n      <div class=\"card-body\">\n        <dl class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Threat Model description\">Description: </dt>\n          <dd class=\"col-sm-8 text-left\">\n            <span>{{_model.description}}</span>\n          </dd>\n        </dl>\n        <hr />\n        <dl class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Scan for URL\">URL: </dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">\n            <a>{{_model.url}}</a>\n          </dd>\n        </dl>\n        <hr/>\n        <dl class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Scan for URL\">Version: </dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">\n            <a> v{{_model.version}} rev{{_model.review}}</a>\n          </dd>\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The creation date for this model\">Creation Date</dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">{{_model.create_date}}</dd>\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The ID of the model\">ID</dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">{{_model.id}}</dd>\n        </dl>\n        <hr />\n        <dl class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Threat Model File\">Threat Model File:</dt>\n          <dd>\n            <a class=\"col-sm-8 text-left text-truncate\" target=\"_blank\"  (click)=\"downloadFile(_model.threatmodelfile)\"> {{_model.threatmodelfile}}</a>\n          </dd>\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Threat Model Report\">Threat Model Report:</dt>\n          <dd>\n            <a class=\"col-sm-8 text-left text-truncate\" target=\"_blank\" (click)=\"downloadFile(_model.threatmodelreport)\">{{_model.threatmodelreport}}</a>\n\n          </dd>\n        </dl>\n        <a #autoDownloadContentReport id=\"autoDownloadContentReport\" style=\"display: none;\"></a>\n        <hr/>\n        <div class=\"btn-group\">\n          <button type=\"submit\" class=\"btn btn-primary\" routerLink=\"/threat-models/{{_model.id}}\">Edit</button>\n        </div>\n      </div>\n    </div>\n  </form>\n\n</div>"

/***/ }),

/***/ "./src/app/threat-model/view/view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThreatModelViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__threat_model__ = __webpack_require__("./src/app/threat-model/threat-model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__threat_model_service__ = __webpack_require__("./src/app/threat-model/threat-model.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ThreatModelViewComponent = /** @class */ (function () {
    function ThreatModelViewComponent(APP_SETTINGS, threatModelServ) {
        this.APP_SETTINGS = APP_SETTINGS;
        this.threatModelServ = threatModelServ;
    }
    Object.defineProperty(ThreatModelViewComponent.prototype, "model", {
        get: function () {
            return this._model;
        },
        set: function (mod) {
            this._model = mod;
            this.fileURL = this.APP_SETTINGS.API_FILES + mod.threatmodelreport;
            this.modelURL = this.APP_SETTINGS.API_FILES + mod.threatmodelfile;
        },
        enumerable: true,
        configurable: true
    });
    ThreatModelViewComponent.prototype.ngOnInit = function () {
    };
    ThreatModelViewComponent.prototype.downloadFile = function (name) {
        var _this = this;
        this.threatModelServ.downloadFile(name).subscribe(function (data) {
            try {
                var url = window.URL.createObjectURL(data);
                var anchor = _this.autoDownload.nativeElement;
                anchor.download = _this.model.name + "_v" + _this.model.version + "r" + _this.model.review + "." + name.split('.').pop();
                anchor.href = url;
                anchor.click();
                //window.open(url, '_blank');
            }
            catch (error) {
            }
        }, function (err) {
            console.log(err);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('autoDownloadContentReport'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], ThreatModelViewComponent.prototype, "autoDownload", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__threat_model__["a" /* ThreatModel */]),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__threat_model__["a" /* ThreatModel */]])
    ], ThreatModelViewComponent.prototype, "model", null);
    ThreatModelViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'threat-model-view',
            template: __webpack_require__("./src/app/threat-model/view/view.component.html"),
            styles: [__webpack_require__("./src/app/threat-model/view/view.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__app_settings_service__["a" /* AppSettingsService */], __WEBPACK_IMPORTED_MODULE_3__threat_model_service__["a" /* ThreatModelService */]])
    ], ThreatModelViewComponent);
    return ThreatModelViewComponent;
}());



/***/ }),

/***/ "./src/app/types/array/array-type.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/types/array/array-type.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div class=\"card-header\">\n    <!--HEADER -->\n    {{param.name}}\n  </div>\n  <div class=\"card-body\">\n    <div class=\"col-sm-12\">\n      <table class=\"table\">\n        <thead>\n          <tr>\n            <th scope=\"col\">#</th>\n            <th scope=\"col\">\n              Value\n              <button type=\"submit\" class=\"btn btn-primary float-right\" (click)=\"addRow()\" title=\"Adds a row to the array\">+</button>\n            </th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let elemento of array_elements; let i = index;trackBy:trackByFn\">\n            <th scope=\"row\">{{i}}</th>\n            <td>\n              <input type=\"text\" [(ngModel)]=\"array_elements[i]\" />\n              <button type=\"submit\" class=\"btn btn-secondary float-right\" (click)=\"removeRow(i)\" title=\"Removes a row in the array\">-</button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n  <div class=\"card-footer\">\n    <div class=\"btn-group row d-flex\">\n      <button type=\"submit\" class=\"btn btn-primary col-sm-6\" (click)=\"save()\" title=\"Creates/Updates a parameter for this node\">Save</button>\n      <button type=\"submit\" class=\"btn btn-warning col-sm-6\" (click)=\"delete()\" title=\"Deletes the parameter for this node\">Delete</button>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/types/array/array-type.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrayTypeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipeline_index__ = __webpack_require__("./src/app/pipeline/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ArrayTypeComponent = /** @class */ (function () {
    function ArrayTypeComponent(pipService, alert) {
        this.pipService = pipService;
        this.alert = alert;
        this.array_elements = [];
    }
    ArrayTypeComponent.prototype.ngOnInit = function () {
        if (this.param.type === 'ARRAY')
            this.array_elements = parseArray(this.param.value);
        if (this.param.type === 'JSON_ARRAY')
            this.array_elements = parseJSONArray(this.param.value);
        this.param.decoratorValue = this.array_elements.join(',');
    };
    ArrayTypeComponent.prototype.save = function () {
        var _this = this;
        this.param.value = this.array_elements.join(',');
        this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
            _this.alert.success("Propertie: " + _this.param.name + " saved");
        }, function (err) {
            _this.alert.error("Cannot save propertie: " + _this.param.name);
        });
    };
    ArrayTypeComponent.prototype.delete = function () {
        var _this = this;
        var found = false;
        for (var i = 0; i < this.node.properties.length && !found; i++) {
            if (this.node.properties[i] === this.param) {
                this.node.properties.splice(i, 1);
                this.param = null;
                found = true;
            }
        }
        for (var i = 0; i < this.node.errorParams.length && !found; i++) {
            if (this.node.errorParams[i] === this.param) {
                this.node.errorParams.splice(i, 1);
                this.param = null;
                found = true;
            }
        }
        for (var i = 0; i < this.node.outputParams.length && !found; i++) {
            if (this.node.outputParams[i] === this.param) {
                this.node.outputParams.splice(i, 1);
                this.param = null;
                found = true;
            }
        }
        if (found) {
            this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
                _this.alert.success("Propertie: " + _this.param.name + " saved");
            }, function (err) {
                _this.alert.error("Cannot save propertie: " + _this.param.name);
            });
        }
    };
    ArrayTypeComponent.prototype.addRow = function () {
        this.array_elements.push("Element " + this.array_elements.length);
    };
    ArrayTypeComponent.prototype.removeRow = function (pos) {
        if (pos === void 0) { pos = 0; }
        this.array_elements.splice(pos, 1);
    };
    ArrayTypeComponent.prototype.trackByFn = function (index, item) {
        return index;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline_index__["k" /* PipelineNode */])
    ], ArrayTypeComponent.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline_index__["l" /* PipelineNodeAtribute */])
    ], ArrayTypeComponent.prototype, "param", void 0);
    ArrayTypeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'type-array',
            template: __webpack_require__("./src/app/types/array/array-type.component.html"),
            styles: [__webpack_require__("./src/app/types/array/array-type.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__pipeline_index__["p" /* PipelineService */], __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__["a" /* AlertService */]])
    ], ArrayTypeComponent);
    return ArrayTypeComponent;
}());

function parseJSONArray(val) {
    if (val.length > 0) {
        return val;
    }
    else if (typeof val === 'string') {
        return val.split(',');
    }
}
function parseArray(val) {
    return val.split(',');
}


/***/ }),

/***/ "./src/app/types/check/check-type.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/types/check/check-type.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div class=\"card-header\">\n    <!--HEADER -->\n    {{param.name}}\n  </div>\n  <div class=\"card-body\">\n    <div class=\"col-sm-12\">\n      <table class=\"table\">\n        <thead>\n          <tr>\n            <th scope=\"col\">#</th>\n            <th scope=\"col\">\n              Value\n              <button type=\"submit\" class=\"btn btn-primary float-right\" (click)=\"addRow()\" title=\"Adds a row to the array\">+</button>\n            </th>\n          </tr>\n        </thead>\n        <tbody *ngIf=\"array_elements\">\n          <tr *ngFor=\"let elemento of array_elements; let i = index;trackBy:trackByFn\">\n            <th scope=\"row\">{{i}}</th>\n            <td>\n              <input type=\"text\" [(ngModel)]=\"array_elements[i]\" />\n              <button type=\"submit\" class=\"btn btn-secondary float-right\" (click)=\"removeRow(i)\" title=\"Removes a row in the array\">-</button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n  <div class=\"card-footer\">\n    <div class=\"btn-group row d-flex\">\n      <button type=\"submit\" class=\"btn btn-primary col-sm-6\" (click)=\"save()\" title=\"Creates/Updates a parameter for this node\">Save</button>\n      <button type=\"submit\" class=\"btn btn-warning col-sm-6\" (click)=\"delete()\" title=\"Deletes the parameter for this node\">Delete</button>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/types/check/check-type.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckTypeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipeline_index__ = __webpack_require__("./src/app/pipeline/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CheckTypeComponent = /** @class */ (function () {
    function CheckTypeComponent(pipService, alert) {
        this.pipService = pipService;
        this.alert = alert;
        this.array_elements = [];
    }
    CheckTypeComponent.prototype.ngOnInit = function () {
        if (this.param.type === 'CHECK_SCAN')
            this.array_elements = parseArray(this.param.value);
        this.param.decoratorValue = this.array_elements.join(',');
    };
    CheckTypeComponent.prototype.save = function () {
        var _this = this;
        if (this.array_elements)
            this.param.value = this.array_elements.join(',');
        this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
            _this.alert.success("Propertie: " + _this.param.name + " saved");
        }, function (err) {
            _this.alert.error("Cannot save propertie: " + _this.param.name);
        });
    };
    CheckTypeComponent.prototype.delete = function () {
        var _this = this;
        var found = false;
        for (var i = 0; i < this.node.properties.length && !found; i++) {
            if (this.node.properties[i] === this.param) {
                this.node.properties.splice(i, 1);
                this.param = null;
                found = true;
            }
        }
        for (var i = 0; i < this.node.errorParams.length && !found; i++) {
            if (this.node.errorParams[i] === this.param) {
                this.node.errorParams.splice(i, 1);
                this.param = null;
                found = true;
            }
        }
        for (var i = 0; i < this.node.outputParams.length && !found; i++) {
            if (this.node.outputParams[i] === this.param) {
                this.node.outputParams.splice(i, 1);
                this.param = null;
                found = true;
            }
        }
        if (found) {
            this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
                _this.alert.success("Propertie: " + _this.param.name + " saved");
            }, function (err) {
                _this.alert.error("Cannot save propertie: " + _this.param.name);
            });
        }
    };
    CheckTypeComponent.prototype.addRow = function () {
        this.array_elements.push("Element " + this.array_elements.length);
    };
    CheckTypeComponent.prototype.removeRow = function (pos) {
        if (pos === void 0) { pos = 0; }
        this.array_elements.splice(pos, 1);
    };
    CheckTypeComponent.prototype.trackByFn = function (index, item) {
        return index;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline_index__["k" /* PipelineNode */])
    ], CheckTypeComponent.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline_index__["l" /* PipelineNodeAtribute */])
    ], CheckTypeComponent.prototype, "param", void 0);
    CheckTypeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'type-check',
            template: __webpack_require__("./src/app/types/check/check-type.component.html"),
            styles: [__webpack_require__("./src/app/types/check/check-type.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__pipeline_index__["p" /* PipelineService */], __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__["a" /* AlertService */]])
    ], CheckTypeComponent);
    return CheckTypeComponent;
}());

function parseJSONArray(val) {
    if (val.length > 0) {
        return val;
    }
    else if (typeof val === 'string') {
        return val.split(',');
    }
}
function parseArray(val) {
    if (typeof val === 'string') {
        return val.split(',').map(function (val, i, arr) {
            return new String(val);
        });
    }
    else if (val.length > 0) {
        return val.map(function (val, i, arr) {
            return new String(val);
        });
    }
    else {
        return [];
    }
}


/***/ }),

/***/ "./src/app/types/days/days-type.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/types/days/days-type.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div class=\"card-header\">\n    <!--HEADER -->\n    {{param.name}}\n  </div>\n  <div class=\"card-body\">\n    <div class=\"col-sm-12\">\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"valName\">Name: </label>\n        <input type=\"text\" class=\"form-control col-sm-8\" name=\"name\" id=\"valName\" placeholder=\"Name\" [(ngModel)]=\"param.name\">\n      </div>\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"valValue\">Monday: </label>\n        <input type=\"checkbox\" class=\"col-sm-8\" [checked]=\"week_days[0]\" (change)=\"week_days[0] = !week_days[0]\" />\n      </div>\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"valValue\">Tuesday: </label>\n        <input type=\"checkbox\" class=\"col-sm-8\" [checked]=\"week_days[1]\" (change)=\"week_days[1] = !week_days[1]\" />\n      </div>\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"valValue\">Wednesday: </label>\n        <input type=\"checkbox\" class=\"col-sm-8\" [checked]=\"week_days[2]\" (change)=\"week_days[2] = !week_days[2]\" />\n      </div>\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"valValue\">Thursday: </label>\n        <input type=\"checkbox\" class=\"col-sm-8\" [checked]=\"week_days[3]\" (change)=\"week_days[3] = !week_days[3]\" />\n      </div>\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"valValue\">Friday: </label>\n        <input type=\"checkbox\" class=\"col-sm-8\" [checked]=\"week_days[4]\" (change)=\"week_days[4] = !week_days[4]\" />\n      </div>\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"valValue\">Saturday: </label>\n        <input type=\"checkbox\" class=\"col-sm-8\" [checked]=\"week_days[5]\" (change)=\"week_days[5] = !week_days[5]\" />\n      </div>\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"valValue\">Sunday: </label>\n        <input type=\"checkbox\" class=\"col-sm-8\" [checked]=\"week_days[6]\" (change)=\"week_days[6] = !week_days[6]\" />\n      </div>\n\n    </div>\n  </div>\n  <div class=\"card-footer\">\n    <div class=\"btn-group row d-flex\">\n      <button type=\"submit\" class=\"btn btn-primary col-sm-6\" (click)=\"save()\" title=\"Creates/Updates a parameter for this node\">Save</button>\n      <button type=\"submit\" class=\"btn btn-warning col-sm-6\" (click)=\"delete()\" title=\"Deletes the parameter for this node\">Delete</button>\n    </div>\n  </div>\n\n</div>"

/***/ }),

/***/ "./src/app/types/days/days-type.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DaysTypeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipeline_index__ = __webpack_require__("./src/app/pipeline/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DaysTypeComponent = /** @class */ (function () {
    function DaysTypeComponent(pipService, alert) {
        this.pipService = pipService;
        this.alert = alert;
        this.week_days = [false, false, false, false, false, false, false];
    }
    DaysTypeComponent.prototype.ngOnInit = function () {
        if (this.param.type === 'DAYS_PICKER') {
            this.week_days = stringToDays(this.param.value);
            this.param.decoratorValue = decoratorValue(this.week_days);
        }
    };
    DaysTypeComponent.prototype.save = function () {
        var _this = this;
        this.param.decoratorValue = decoratorValue(this.week_days);
        this.param.value = this.week_days.join(',');
        this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
            _this.alert.success("Propertie: " + _this.param.name + " saved");
        }, function (err) {
            _this.alert.error("Cannot save propertie: " + _this.param.name);
        });
    };
    DaysTypeComponent.prototype.delete = function () {
        var _this = this;
        this.node.removeParam(this.param);
        this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
            _this.alert.success("Propertie removed");
        }, function (err) {
            _this.alert.error("Cannot remove propertie");
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline_index__["k" /* PipelineNode */])
    ], DaysTypeComponent.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline_index__["l" /* PipelineNodeAtribute */])
    ], DaysTypeComponent.prototype, "param", void 0);
    DaysTypeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'type-days',
            template: __webpack_require__("./src/app/types/days/days-type.component.html"),
            styles: [__webpack_require__("./src/app/types/days/days-type.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__pipeline_index__["p" /* PipelineService */], __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__["a" /* AlertService */]])
    ], DaysTypeComponent);
    return DaysTypeComponent;
}());

function decoratorValue(arr) {
    var retArr = [];
    if (arr.length >= 7) {
        if (arr[0])
            retArr.push('Monday');
        if (arr[1])
            retArr.push('Tuesday');
        if (arr[2])
            retArr.push('Wednesday');
        if (arr[3])
            retArr.push('Thursday');
        if (arr[4])
            retArr.push('Friday');
        if (arr[5])
            retArr.push('Saturday');
        if (arr[6])
            retArr.push('Sunday');
    }
    return retArr.join(',');
}
function stringToDays(days) {
    var week_days = [false, false, false, false, false, false, false];
    var split_days = days.split(',');
    if (split_days.length >= 7) {
        for (var i = 0; i < 7; i++) {
            try {
                week_days[i] = split_days[i] === 'true' ? true : false;
            }
            catch (err) { }
        }
    }
    return week_days;
}


/***/ }),

/***/ "./src/app/types/default/default-type.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/types/default/default-type.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div class=\"card-header\">\n    <!--HEADER -->\n    {{param.name}}\n  </div>\n  <div class=\"card-body\">\n    <div class=\"col-sm-12\">\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"valName\">Name: </label>\n        <input type=\"text\" class=\"form-control col-sm-8\" name=\"name\" id=\"valName\" placeholder=\"Name\" [(ngModel)]=\"param.name\">\n      </div>\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"valNick\">Nickname: </label>\n        <input type=\"text\" class=\"form-control col-sm-8\" name=\"nickname\" id=\"valNick\" placeholder=\"Nickname\" [(ngModel)]=\"param.nickname\">\n      </div>\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"valValue\">Value: </label>\n        <input type=\"text\" class=\"form-control col-sm-8\" name=\"value\" id=\"valValue\" placeholder=\"Value\" [(ngModel)]=\"param.value\">\n      </div>\n      <div class=\"form-group row\">\n          <label class=\"col-sm-4\" for=\"valtype\">Type: </label>\n          <input type=\"text\" class=\"form-control col-sm-8\" name=\"type\" id=\"valtype\" placeholder=\"type\" [(ngModel)]=\"param.type\">\n        </div>\n    </div>\n  </div>\n  <div class=\"card-footer\">\n    <div class=\"btn-group row d-flex\">\n      <button type=\"submit\" class=\"btn btn-primary col-sm-6\" (click)=\"save()\" title=\"Creates/Updates a parameter for this node\">Save</button>\n      <button type=\"submit\" class=\"btn btn-warning col-sm-6\" (click)=\"delete()\" title=\"Deletes the parameter for this node\">Delete</button>\n    </div>\n  </div>\n\n</div>"

/***/ }),

/***/ "./src/app/types/default/default-type.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultTypeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipeline_index__ = __webpack_require__("./src/app/pipeline/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DefaultTypeComponent = /** @class */ (function () {
    function DefaultTypeComponent(pipService, alert) {
        this.pipService = pipService;
        this.alert = alert;
    }
    DefaultTypeComponent.prototype.ngOnInit = function () {
    };
    DefaultTypeComponent.prototype.save = function () {
        var _this = this;
        this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
            _this.alert.success("Propertie: " + _this.param.name + " saved");
        }, function (err) {
            _this.alert.error("Cannot save propertie: " + _this.param.name);
        });
    };
    DefaultTypeComponent.prototype.delete = function () {
        var _this = this;
        this.node.removeParam(this.param);
        this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
            _this.alert.success("Propertie removed");
        }, function (err) {
            _this.alert.error("Cannot remove propertie");
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline_index__["k" /* PipelineNode */])
    ], DefaultTypeComponent.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline_index__["l" /* PipelineNodeAtribute */])
    ], DefaultTypeComponent.prototype, "param", void 0);
    DefaultTypeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'type-default',
            template: __webpack_require__("./src/app/types/default/default-type.component.html"),
            styles: [__webpack_require__("./src/app/types/default/default-type.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__pipeline_index__["p" /* PipelineService */], __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__["a" /* AlertService */]])
    ], DefaultTypeComponent);
    return DefaultTypeComponent;
}());



/***/ }),

/***/ "./src/app/types/hash-object/hash-object-type.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/types/hash-object/hash-object-type.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div class=\"card-header\">\n    <!--HEADER -->\n    {{_param.name}}\n  </div>\n  <div class=\"card-body\">\n    <div class=\"col-sm-12\">\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"valName\">Name: </label>\n        <input type=\"text\" class=\"form-control col-sm-8\" name=\"name\" id=\"valName\" placeholder=\"Name\" [(ngModel)]=\"_param.name\">\n      </div>\n      <div class=\"form-group table-responsive\">\n        <table class=\"table\">\n          <thead>\n            <tr>\n              <th scope=\"col\">#</th>\n              <th scope=\"col\">\n                Value\n              </th>\n              <th scope=\"col\">\n                  <button type=\"submit\" class=\"btn btn-primary float-right\" (click)=\"addRow()\" title=\"Adds a row to the array\">+</button>\n                </th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let elemento of array_names; let i = index;trackBy:trackByFn\">\n              <th scope=\"row\">\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"array_names[i]\" />\n              </th>\n              <td>\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"array_values[i]\" />\n              </td>\n              <td>\n                  <button type=\"submit\" class=\"btn btn-secondary float-right\" (click)=\"removeRow(i)\" title=\"Removes a row in the array\">-</button>\n                </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"valtype\">Type: </label>\n        <input type=\"text\" class=\"form-control col-sm-8\" name=\"type\" id=\"valtype\" placeholder=\"type\" [(ngModel)]=\"_param.type\">\n      </div>\n    </div>\n  </div>\n  <div class=\"card-footer\">\n    <div class=\"btn-group row d-flex\">\n      <button type=\"submit\" class=\"btn btn-primary col-sm-6\" (click)=\"save()\" title=\"Creates/Updates a parameter for this node\">Save</button>\n      <button type=\"submit\" class=\"btn btn-warning col-sm-6\" (click)=\"delete()\" title=\"Deletes the parameter for this node\">Delete</button>\n    </div>\n  </div>\n\n</div>"

/***/ }),

/***/ "./src/app/types/hash-object/hash-object-type.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HashObjectTypeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipeline_index__ = __webpack_require__("./src/app/pipeline/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HashObjectTypeComponent = /** @class */ (function () {
    function HashObjectTypeComponent(pipService, alert) {
        this.pipService = pipService;
        this.alert = alert;
        this._param = new __WEBPACK_IMPORTED_MODULE_1__pipeline_index__["l" /* PipelineNodeAtribute */]();
        this.array_names = [];
        this.array_values = [];
    }
    Object.defineProperty(HashObjectTypeComponent.prototype, "param", {
        get: function () {
            return this._param;
        },
        set: function (prm) {
            this._param = prm;
            var paramObject = {};
            try {
                var keys = [];
                if (typeof prm.value === 'string') {
                    paramObject = JSON.parse(prm.value);
                    keys = Object.keys(paramObject);
                }
                else {
                    paramObject = prm.value;
                    keys = Object.keys(paramObject);
                }
                var val = "";
                for (var i = 0; i < keys.length; i++) {
                    this.addRow(keys[i], paramObject[keys[i]]);
                }
                this._param.decoratorValue = this.getDecoratorValue();
            }
            catch (err) { }
        },
        enumerable: true,
        configurable: true
    });
    ;
    HashObjectTypeComponent.prototype.ngOnInit = function () {
    };
    HashObjectTypeComponent.prototype.save = function () {
        var _this = this;
        this._param.decoratorValue = this.getDecoratorValue();
        this._param.value = JSON.stringify(this.getValue());
        this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
            _this.alert.success("Propertie: " + _this.param.name + " saved");
        }, function (err) {
            _this.alert.error("Cannot save propertie: " + _this.param.name);
        });
    };
    HashObjectTypeComponent.prototype.delete = function () {
        var _this = this;
        this.node.removeParam(this.param);
        this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
            _this.alert.success("Propertie removed");
        }, function (err) {
            _this.alert.error("Cannot remove propertie");
        });
    };
    HashObjectTypeComponent.prototype.addRow = function (name, val) {
        if (name === void 0) { name = "_" + this.array_names.length; }
        if (val === void 0) { val = "_" + this.array_values.length; }
        this.array_names.push(name);
        this.array_values.push(val);
    };
    HashObjectTypeComponent.prototype.removeRow = function (pos) {
        if (pos === void 0) { pos = 0; }
        this.array_names.splice(pos, 1);
        this.array_values.splice(pos, 1);
    };
    HashObjectTypeComponent.prototype.trackByFn = function (index, item) {
        return index;
    };
    HashObjectTypeComponent.prototype.getDecoratorValue = function () {
        var val = "";
        for (var i = 0; i < this.array_names.length; i++) {
            val += this.array_names[i] + " => " + this.array_values[i] + "\n";
        }
        return val;
    };
    HashObjectTypeComponent.prototype.getValue = function () {
        var val = {};
        for (var i = 0; i < this.array_names.length; i++) {
            val[this.array_names[i]] = this.array_values[i];
        }
        return val;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline_index__["k" /* PipelineNode */])
    ], HashObjectTypeComponent.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], HashObjectTypeComponent.prototype, "param", null);
    HashObjectTypeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'type-hash-object',
            template: __webpack_require__("./src/app/types/hash-object/hash-object-type.component.html"),
            styles: [__webpack_require__("./src/app/types/hash-object/hash-object-type.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__pipeline_index__["p" /* PipelineService */], __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__["a" /* AlertService */]])
    ], HashObjectTypeComponent);
    return HashObjectTypeComponent;
}());



/***/ }),

/***/ "./src/app/types/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__webhook_webhook_type_component__ = __webpack_require__("./src/app/types/webhook/webhook-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__object_object_type_component__ = __webpack_require__("./src/app/types/object/object-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hash_object_hash_object_type_component__ = __webpack_require__("./src/app/types/hash-object/hash-object-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__default_default_type_component__ = __webpack_require__("./src/app/types/default/default-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__days_days_type_component__ = __webpack_require__("./src/app/types/days/days-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__array_array_type_component__ = __webpack_require__("./src/app/types/array/array-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__time_time_type_component__ = __webpack_require__("./src/app/types/time/time-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__check_check_type_component__ = __webpack_require__("./src/app/types/check/check-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__scan_profile_scan_profile_type_component__ = __webpack_require__("./src/app/types/scan-profile/scan-profile-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__text_text_type_component__ = __webpack_require__("./src/app/types/text/text-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__types_directive__ = __webpack_require__("./src/app/types/types.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__types_component__ = __webpack_require__("./src/app/types/types.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_0__webhook_webhook_type_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_11__types_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_10__types_directive__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__default_default_type_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__days_days_type_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__array_array_type_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_6__time_time_type_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_1__object_object_type_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_7__check_check_type_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_8__scan_profile_scan_profile_type_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__hash_object_hash_object_type_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_9__text_text_type_component__["a"]; });















/***/ }),

/***/ "./src/app/types/object/object-type.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/types/object/object-type.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div class=\"card-header\">\n    <!--HEADER -->\n    {{_param.name}}\n  </div>\n  <div class=\"card-body\">\n    <div class=\"col-sm-12\">\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"valName\">Name: </label>\n        <input type=\"text\" class=\"form-control col-sm-8\" name=\"name\" id=\"valName\" placeholder=\"Name\" [(ngModel)]=\"_param.name\">\n      </div>\n      <div class=\"form-group\">\n        <label  for=\"valValue\">Value: </label>\n        <textarea name=\"value\" class=\"form-control\" id=\"valValue\" placeholder=\"Value\" [(ngModel)]=\"_param.value\"></textarea>\n      </div>\n      <div class=\"form-group row\">\n          <label class=\"col-sm-4\" for=\"valtype\">Type: </label>\n          <input type=\"text\" class=\"form-control col-sm-8\" name=\"type\" id=\"valtype\" placeholder=\"type\" [(ngModel)]=\"_param.type\">\n        </div>\n    </div>\n  </div>\n  <div class=\"card-footer\">\n    <div class=\"btn-group row d-flex\">\n      <button type=\"submit\" class=\"btn btn-primary col-sm-6\" (click)=\"save()\" title=\"Creates/Updates a parameter for this node\">Save</button>\n      <button type=\"submit\" class=\"btn btn-warning col-sm-6\" (click)=\"delete()\" title=\"Deletes the parameter for this node\">Delete</button>\n    </div>\n  </div>\n\n</div>"

/***/ }),

/***/ "./src/app/types/object/object-type.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectTypeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipeline_index__ = __webpack_require__("./src/app/pipeline/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ObjectTypeComponent = /** @class */ (function () {
    function ObjectTypeComponent(pipService, alert) {
        this.pipService = pipService;
        this.alert = alert;
        this._param = new __WEBPACK_IMPORTED_MODULE_1__pipeline_index__["l" /* PipelineNodeAtribute */]();
    }
    Object.defineProperty(ObjectTypeComponent.prototype, "param", {
        get: function () {
            return this._param;
        },
        set: function (prm) {
            Object.assign(this._param, prm);
            this._param.value = JSON.stringify(prm.value, null, "\t");
            this._param.decoratorValue = this._param.value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ObjectTypeComponent.prototype.ngOnInit = function () {
    };
    ObjectTypeComponent.prototype.save = function () {
        var _this = this;
        this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
            _this.alert.success("Propertie: " + _this.param.name + " saved");
        }, function (err) {
            _this.alert.error("Cannot save propertie: " + _this.param.name);
        });
    };
    ObjectTypeComponent.prototype.delete = function () {
        var _this = this;
        this.node.removeParam(this.param);
        this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
            _this.alert.success("Propertie removed");
        }, function (err) {
            _this.alert.error("Cannot remove propertie");
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline_index__["k" /* PipelineNode */])
    ], ObjectTypeComponent.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ObjectTypeComponent.prototype, "param", null);
    ObjectTypeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'type-object',
            template: __webpack_require__("./src/app/types/object/object-type.component.html"),
            styles: [__webpack_require__("./src/app/types/object/object-type.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__pipeline_index__["p" /* PipelineService */], __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__["a" /* AlertService */]])
    ], ObjectTypeComponent);
    return ObjectTypeComponent;
}());



/***/ }),

/***/ "./src/app/types/scan-profile/scan-profile-type.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/types/scan-profile/scan-profile-type.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div class=\"card-header\">\n    <!--HEADER -->\n    {{param.name}}\n  </div>\n  <div class=\"card-body\">\n    <div class=\"col-sm-12\">\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"profile\">Select Scan Profile:</label>\n        <select class=\"custom-select\" name=\"profile\" id=\"profile\" (change)=\"selectTemplate($event.target.value)\">\n          <option *ngFor=\"let elem of templates; let i = index\" [value]=\"i\">{{elem.name}}</option>\n        </select>\n      </div>\n      <table class=\"table\">\n        <thead>\n          <tr>\n            <th scope=\"col\">#</th>\n            <th scope=\"col\">\n              Scan Profile:\n              <button type=\"submit\" class=\"btn btn-primary float-right\" (click)=\"addRow()\" title=\"Adds a row to the array\">+</button>\n            </th>\n          </tr>\n        </thead>\n        <tbody *ngIf=\"array_elements && array_elements.length > 0\">\n          <tr *ngFor=\"let elemento of array_elements; let i = index;trackBy:trackByFn\">\n            <th scope=\"row\">{{i}}</th>\n            <td>\n              <input type=\"text\" [(ngModel)]=\"array_elements[i]\" />\n              <button type=\"submit\" class=\"btn btn-secondary float-right\" (click)=\"removeRow(i)\" title=\"Removes a row in the array\">-</button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n  <div class=\"card-footer\">\n    <div class=\"btn-group row d-flex\">\n      <button type=\"submit\" class=\"btn btn-primary col-sm-6\" (click)=\"save()\" title=\"Creates/Updates a parameter for this node\">Save</button>\n      <button type=\"submit\" class=\"btn btn-warning col-sm-6\" (click)=\"delete()\" title=\"Deletes the parameter for this node\">Delete</button>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/types/scan-profile/scan-profile-type.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanProfileTypeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipeline_index__ = __webpack_require__("./src/app/pipeline/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scan_profile_scan_profile_service__ = __webpack_require__("./src/app/scan-profile/scan-profile.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ScanProfileTypeComponent = /** @class */ (function () {
    function ScanProfileTypeComponent(pipService, alert, profileService) {
        this.pipService = pipService;
        this.alert = alert;
        this.profileService = profileService;
        this.templates = [];
        this.array_elements = [];
    }
    ScanProfileTypeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.profileService.getProfileTemplates().subscribe(function (data) {
            if (data.length > 0) {
                _this.templates = data;
            }
        }, function (err) {
        });
        if (this.param.type === 'SCAN_PROFILE') {
            this.array_elements = parseJSONArray(this.param.value);
            console.log(this.array_elements);
        }
    };
    ScanProfileTypeComponent.prototype.save = function () {
        var _this = this;
        this.param.value = this.array_elements.join(',');
        this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
            _this.alert.success("Propertie: " + _this.param.name + " saved");
        }, function (err) {
            _this.alert.error("Cannot save propertie: " + _this.param.name);
        });
    };
    ScanProfileTypeComponent.prototype.delete = function () {
        var _this = this;
        var found = false;
        for (var i = 0; i < this.node.properties.length && !found; i++) {
            if (this.node.properties[i] === this.param) {
                this.node.properties.splice(i, 1);
                this.param = null;
                found = true;
            }
        }
        for (var i = 0; i < this.node.errorParams.length && !found; i++) {
            if (this.node.errorParams[i] === this.param) {
                this.node.errorParams.splice(i, 1);
                this.param = null;
                found = true;
            }
        }
        for (var i = 0; i < this.node.outputParams.length && !found; i++) {
            if (this.node.outputParams[i] === this.param) {
                this.node.outputParams.splice(i, 1);
                this.param = null;
                found = true;
            }
        }
        if (found) {
            this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
                _this.alert.success("Propertie: " + _this.param.name + " saved");
            }, function (err) {
                _this.alert.error("Cannot save propertie: " + _this.param.name);
            });
        }
    };
    ScanProfileTypeComponent.prototype.addRow = function () {
        this.array_elements.push("Element " + this.array_elements.length);
    };
    ScanProfileTypeComponent.prototype.removeRow = function (pos) {
        if (pos === void 0) { pos = 0; }
        this.array_elements.splice(pos, 1);
    };
    ScanProfileTypeComponent.prototype.selectTemplate = function (i) {
        console.log("SELECT: " + i);
        this.array_elements = parseJSONArray(this.templates[i].checks);
    };
    ScanProfileTypeComponent.prototype.trackByFn = function (index, item) {
        return index;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline_index__["k" /* PipelineNode */])
    ], ScanProfileTypeComponent.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline_index__["l" /* PipelineNodeAtribute */])
    ], ScanProfileTypeComponent.prototype, "param", void 0);
    ScanProfileTypeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'type-scan-profile',
            template: __webpack_require__("./src/app/types/scan-profile/scan-profile-type.component.html"),
            styles: [__webpack_require__("./src/app/types/scan-profile/scan-profile-type.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__pipeline_index__["p" /* PipelineService */], __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__["a" /* AlertService */], __WEBPACK_IMPORTED_MODULE_3__scan_profile_scan_profile_service__["a" /* ScanProfileService */]])
    ], ScanProfileTypeComponent);
    return ScanProfileTypeComponent;
}());

function parseJSONArray(val) {
    console.log(val);
    if (typeof val === 'string') {
        return val.split(',');
    }
    else if (val.length > 0) {
        return val;
    }
    else {
        return "";
    }
}


/***/ }),

/***/ "./src/app/types/text/text-type.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/types/text/text-type.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div class=\"card-header\">\n    <!--HEADER -->\n    {{param.name}}\n  </div>\n  <div class=\"card-body\">\n    <div class=\"col-sm-12\">\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"valName\">Name: </label>\n        <input type=\"text\" class=\"form-control col-sm-8\" name=\"name\" id=\"valName\" placeholder=\"Name\" [(ngModel)]=\"param.name\">\n      </div>\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"valNick\">Nickname: </label>\n        <input type=\"text\" class=\"form-control col-sm-8\" name=\"nickname\" id=\"valNick\" placeholder=\"Nickname\" [(ngModel)]=\"param.nickname\">\n      </div>\n      <div class=\"form-group row\">\n        <label  for=\"valValue\">Value: </label>\n        <textarea name=\"value\" class=\"form-control\" id=\"valValue\" placeholder=\"Value\" [(ngModel)]=\"param.value\"></textarea>\n      </div>\n      <div class=\"form-group row\">\n          <label class=\"col-sm-4\" for=\"valtype\">Type: </label>\n          <input type=\"text\" class=\"form-control col-sm-8\" name=\"type\" id=\"valtype\" placeholder=\"type\" [(ngModel)]=\"param.type\">\n        </div>\n    </div>\n  </div>\n  <div class=\"card-footer\">\n    <div class=\"btn-group row d-flex\">\n      <button type=\"submit\" class=\"btn btn-primary col-sm-6\" (click)=\"save()\" title=\"Creates/Updates a parameter for this node\">Save</button>\n      <button type=\"submit\" class=\"btn btn-warning col-sm-6\" (click)=\"delete()\" title=\"Deletes the parameter for this node\">Delete</button>\n    </div>\n  </div>\n\n</div>"

/***/ }),

/***/ "./src/app/types/text/text-type.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextTypeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipeline_index__ = __webpack_require__("./src/app/pipeline/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TextTypeComponent = /** @class */ (function () {
    function TextTypeComponent(pipService, alert) {
        this.pipService = pipService;
        this.alert = alert;
    }
    TextTypeComponent.prototype.ngOnInit = function () {
    };
    TextTypeComponent.prototype.save = function () {
        var _this = this;
        this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
            _this.alert.success("Propertie: " + _this.param.name + " saved");
        }, function (err) {
            _this.alert.error("Cannot save propertie: " + _this.param.name);
        });
    };
    TextTypeComponent.prototype.delete = function () {
        var _this = this;
        this.node.removeParam(this.param);
        this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
            _this.alert.success("Propertie removed");
        }, function (err) {
            _this.alert.error("Cannot remove propertie");
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline_index__["k" /* PipelineNode */])
    ], TextTypeComponent.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline_index__["l" /* PipelineNodeAtribute */])
    ], TextTypeComponent.prototype, "param", void 0);
    TextTypeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'type-text',
            template: __webpack_require__("./src/app/types/text/text-type.component.html"),
            styles: [__webpack_require__("./src/app/types/text/text-type.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__pipeline_index__["p" /* PipelineService */], __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__["a" /* AlertService */]])
    ], TextTypeComponent);
    return TextTypeComponent;
}());



/***/ }),

/***/ "./src/app/types/time/time-type.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/types/time/time-type.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div class=\"card-header\">\n    <!--HEADER -->\n    {{param.name}}\n  </div>\n  <div class=\"card-body\">\n    <div class=\"col-sm-12\">\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"valName\">Name: </label>\n        <input type=\"text\" class=\"form-control col-sm-8\" name=\"name\" id=\"valName\" placeholder=\"Name\" [(ngModel)]=\"param.name\">\n      </div>\n      <div class=\"form-group row\">\n        <label class=\"col-sm-4\" for=\"valValue\">Day Time: </label>\n        <input type=\"text\" class=\"form-control col-sm-4\" name=\"valHour\" id=\"valHour\" placeholder=\"Hour\" [(ngModel)]=\"hour\">\n        <input type=\"text\" class=\"form-control col-sm-4\" name=\"valMinute\" id=\"valMinute\" placeholder=\"Minute\" [(ngModel)]=\"minute\">\n      </div>\n    </div>\n  </div>\n  <div class=\"card-footer\">\n    <div class=\"btn-group row d-flex\">\n      <button type=\"submit\" class=\"btn btn-primary col-sm-6\" (click)=\"save()\" title=\"Creates/Updates a parameter for this node\">Save</button>\n      <button type=\"submit\" class=\"btn btn-warning col-sm-6\" (click)=\"delete()\" title=\"Deletes the parameter for this node\">Delete</button>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/types/time/time-type.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeTypeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipeline_index__ = __webpack_require__("./src/app/pipeline/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TimeTypeComponent = /** @class */ (function () {
    function TimeTypeComponent(pipService, alert) {
        this.pipService = pipService;
        this.alert = alert;
        this.hour = '00';
        this.minute = '00';
    }
    TimeTypeComponent.prototype.ngOnInit = function () {
        if (this.param.type === 'TIME') {
            var splited = this.param.value.split(':');
            console.log(splited);
            if (splited.length === 2) {
                this.hour = parseHour(splited[0]);
                this.minute = parseHour(splited[1]);
            }
            else {
                this.hour = '00';
                this.minute = '00';
            }
        }
    };
    TimeTypeComponent.prototype.save = function () {
        var _this = this;
        this.param.value = parseHour(this.hour) + ":" + parseMinute(this.minute);
        this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
            _this.alert.success("Propertie: " + _this.param.name + " saved");
        }, function (err) {
            _this.alert.error("Cannot save propertie: " + _this.param.name);
        });
    };
    TimeTypeComponent.prototype.delete = function () {
        var _this = this;
        this.node.removeParam(this.param);
        this.pipService.updateNodeForPipeline(this.node).subscribe(function (data) {
            _this.alert.success("Propertie removed");
        }, function (err) {
            _this.alert.error("Cannot remove propertie");
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline_index__["k" /* PipelineNode */])
    ], TimeTypeComponent.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline_index__["l" /* PipelineNodeAtribute */])
    ], TimeTypeComponent.prototype, "param", void 0);
    TimeTypeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'type-time',
            template: __webpack_require__("./src/app/types/time/time-type.component.html"),
            styles: [__webpack_require__("./src/app/types/time/time-type.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__pipeline_index__["p" /* PipelineService */], __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__["a" /* AlertService */]])
    ], TimeTypeComponent);
    return TimeTypeComponent;
}());

function parseHour(val) {
    try {
        var num = Number(val);
        if (num > 23) {
            return '00';
        }
        else if (num <= 0) {
            return '00';
        }
        else {
            return num.toString();
        }
    }
    catch (err) {
        return '00';
    }
}
function parseMinute(val) {
    try {
        var num = Number(val);
        if (num > 59) {
            return '00';
        }
        else if (num <= 0) {
            return '00';
        }
        else {
            return num.toString();
        }
    }
    catch (err) {
        return '00';
    }
}


/***/ }),

/***/ "./src/app/types/types.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/types/types.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <h3 class=\"col-sm-4\">Types</h3>\n  <form>\n    <div class=\"form-group row\">\n      <label for=\"selectedProp\" class=\"col-sm-3 col-form-label\">Properties:</label>\n      <div class=\"col-sm-7\">\n        <select class=\"custom-select\" name=\"selectedProp\" id=\"selectedProp\" [(ngModel)]=\"selectedParam\" (ngModelChange)=\"selectParam($event)\">\n          <option *ngFor=\"let param of properties\" [ngValue]=\"param\" [selected]=\"selectedParam.name===param.name\">{{param.nickname || param.name}}</option>\n          \n        </select>\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary col-sm-2\" (click)=\"addPropertie()\" title=\"Adds a new propertie\">+</button>\n    </div>\n    <div class=\"form-group row\">\n      <label for=\"selectedOutParam\" class=\"col-sm-3 col-form-label\">Out Params</label>\n      <div class=\"col-sm-7\">\n        <select class=\"custom-select\" name=\"selectedOutParam\" id=\"selectedOutParam\"  [(ngModel)]=\"selectedParam\" (ngModelChange)=\"selectParam($event)\">\n          <option *ngFor=\"let param of outParams\" [ngValue]=\"param\" [selected]=\"selectedParam.name===param.name\">{{param.name}}</option>\n        </select>\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary col-sm-2\" (click)=\"addOutParameter()\" title=\"Adds a new Output Parameter\">+</button>\n    </div>\n    <div class=\"form-group row\">\n      <label for=\"selectedErrParam\" class=\"col-sm-3 col-form-label\">Err Params</label>\n      <div class=\"col-sm-7\">\n        <select class=\"custom-select\" name=\"selectedErrParam\" id=\"selectedErrParam\"  [(ngModel)]=\"selectedParam\" (ngModelChange)=\"selectParam($event)\">\n          <option *ngFor=\"let param of errParams\" [ngValue]=\"param\" [selected]=\"selectedParam.name===param.name\">{{param.name}}</option>\n        </select>\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary col-sm-2\" (click)=\"addErrParameter()\" title=\"Adds a new Error Parameter\">+</button>\n    </div>\n\n\n  </form>\n  <ng-template node-types></ng-template>\n</div>"

/***/ }),

/***/ "./src/app/types/types.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipeline_node__ = __webpack_require__("./src/app/pipeline/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__types_directive__ = __webpack_require__("./src/app/types/types.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__webhook_webhook_type_component__ = __webpack_require__("./src/app/types/webhook/webhook-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__object_object_type_component__ = __webpack_require__("./src/app/types/object/object-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__hash_object_hash_object_type_component__ = __webpack_require__("./src/app/types/hash-object/hash-object-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__default_default_type_component__ = __webpack_require__("./src/app/types/default/default-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__array_array_type_component__ = __webpack_require__("./src/app/types/array/array-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__days_days_type_component__ = __webpack_require__("./src/app/types/days/days-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__time_time_type_component__ = __webpack_require__("./src/app/types/time/time-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__check_check_type_component__ = __webpack_require__("./src/app/types/check/check-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__scan_profile_scan_profile_type_component__ = __webpack_require__("./src/app/types/scan-profile/scan-profile-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__text_text_type_component__ = __webpack_require__("./src/app/types/text/text-type.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var TypesComponent = /** @class */ (function () {
    function TypesComponent(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.selectedParam = new __WEBPACK_IMPORTED_MODULE_1__pipeline_node__["c" /* PipelineNodeAtribute */]();
    }
    Object.defineProperty(TypesComponent.prototype, "node", {
        get: function () {
            return this._node;
        },
        set: function (node) {
            this._node = node;
            this.properties = node.properties;
            this.errParams = node.errorParams;
            this.outParams = node.outputParams;
            if (this.properties.length > 0) {
                this.selectParam(this.properties[0]);
            }
            else if (this.errParams.length > 0) {
                this.selectParam(this.errParams[0]);
            }
            else if (this.outParams.length > 0) {
                this.selectParam(this.outParams[0]);
            }
        },
        enumerable: true,
        configurable: true
    });
    TypesComponent.prototype.selectParam = function (param) {
        if (param) {
            this.selectedParam = param;
            this.loadComponent();
        }
        else {
            this.loadComponent();
        }
    };
    TypesComponent.prototype.ngOnInit = function () {
    };
    TypesComponent.prototype.addPropertie = function () {
        var propertie = new __WEBPACK_IMPORTED_MODULE_1__pipeline_node__["c" /* PipelineNodeAtribute */]();
        propertie.name = "Propertie n" + this.properties.length;
        propertie.value = "";
        var pos = this.properties.push(propertie);
        this.selectedParam = this.properties[pos - 1];
    };
    TypesComponent.prototype.addErrParameter = function () {
        var propertie = new __WEBPACK_IMPORTED_MODULE_1__pipeline_node__["c" /* PipelineNodeAtribute */]();
        propertie.name = "Error Parameter n" + this.errParams.length;
        propertie.value = "";
        var pos = this.errParams.push(propertie);
        this.selectedParam = this.errParams[pos - 1];
    };
    TypesComponent.prototype.addOutParameter = function () {
        var propertie = new __WEBPACK_IMPORTED_MODULE_1__pipeline_node__["c" /* PipelineNodeAtribute */]();
        propertie.name = "Output Parameter n" + this.outParams.length;
        propertie.value = "";
        var pos = this.outParams.push(propertie);
        this.selectedParam = this.outParams[pos - 1];
    };
    TypesComponent.prototype.loadComponent = function () {
        var comp;
        switch ((this.selectedParam.type).toUpperCase()) {
            case 'WEBHOOK':
                comp = __WEBPACK_IMPORTED_MODULE_3__webhook_webhook_type_component__["a" /* WebhookTypeComponent */];
                break;
            case 'OBJECT':
                comp = __WEBPACK_IMPORTED_MODULE_4__object_object_type_component__["a" /* ObjectTypeComponent */];
                break;
            case 'HASH_OBJECT':
                comp = __WEBPACK_IMPORTED_MODULE_5__hash_object_hash_object_type_component__["a" /* HashObjectTypeComponent */];
                break;
            case 'JSON_OBJECT':
                comp = __WEBPACK_IMPORTED_MODULE_4__object_object_type_component__["a" /* ObjectTypeComponent */];
                break;
            case 'JSON':
                comp = __WEBPACK_IMPORTED_MODULE_4__object_object_type_component__["a" /* ObjectTypeComponent */];
                break;
            case 'DAYS_PICKER':
                comp = __WEBPACK_IMPORTED_MODULE_8__days_days_type_component__["a" /* DaysTypeComponent */];
                break;
            case 'ARRAY':
                comp = __WEBPACK_IMPORTED_MODULE_7__array_array_type_component__["a" /* ArrayTypeComponent */];
                break;
            case 'JSON_ARRAY':
                comp = __WEBPACK_IMPORTED_MODULE_7__array_array_type_component__["a" /* ArrayTypeComponent */];
                break;
            case 'CHECK_SCAN':
                comp = __WEBPACK_IMPORTED_MODULE_10__check_check_type_component__["a" /* CheckTypeComponent */];
                break;
            case 'SCAN_PROFILE':
                comp = __WEBPACK_IMPORTED_MODULE_11__scan_profile_scan_profile_type_component__["a" /* ScanProfileTypeComponent */];
                break;
            case 'TIME':
                comp = __WEBPACK_IMPORTED_MODULE_9__time_time_type_component__["a" /* TimeTypeComponent */];
                break;
            case 'TEXT':
                comp = __WEBPACK_IMPORTED_MODULE_12__text_text_type_component__["a" /* TextTypeComponent */];
                break;
            default:
                comp = __WEBPACK_IMPORTED_MODULE_6__default_default_type_component__["a" /* DefaultTypeComponent */];
                break;
        }
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(comp);
        var viewContainerRef = this.nodeTypes.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        (componentRef.instance).node = this._node;
        (componentRef.instance).param = this.selectedParam;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__pipeline_node__["b" /* PipelineNode */]),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__pipeline_node__["b" /* PipelineNode */]])
    ], TypesComponent.prototype, "node", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2__types_directive__["a" /* TypesDirective */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__types_directive__["a" /* TypesDirective */])
    ], TypesComponent.prototype, "nodeTypes", void 0);
    TypesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'node-types',
            template: __webpack_require__("./src/app/types/types.component.html"),
            styles: [__webpack_require__("./src/app/types/types.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"]])
    ], TypesComponent);
    return TypesComponent;
}());



/***/ }),

/***/ "./src/app/types/types.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypesDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TypesDirective = /** @class */ (function () {
    function TypesDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    TypesDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[node-types]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]])
    ], TypesDirective);
    return TypesDirective;
}());



/***/ }),

/***/ "./src/app/types/types.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index__ = __webpack_require__("./src/app/types/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var TypesModule = /** @class */ (function () {
    function TypesModule() {
    }
    TypesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__index__["c" /* DaysTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["d" /* DefaultTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["l" /* WebhookTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["j" /* TypesComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["k" /* TypesDirective */],
                __WEBPACK_IMPORTED_MODULE_3__index__["a" /* ArrayTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["i" /* TimeTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["f" /* ObjectTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["b" /* CheckTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["g" /* ScanProfileTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["e" /* HashObjectTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["h" /* TextTypeComponent */]
            ],
            bootstrap: [
                __WEBPACK_IMPORTED_MODULE_3__index__["c" /* DaysTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["d" /* DefaultTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["l" /* WebhookTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["a" /* ArrayTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["i" /* TimeTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["f" /* ObjectTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["b" /* CheckTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["g" /* ScanProfileTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["e" /* HashObjectTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["h" /* TextTypeComponent */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__index__["c" /* DaysTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["d" /* DefaultTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["j" /* TypesComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["k" /* TypesDirective */],
                __WEBPACK_IMPORTED_MODULE_3__index__["l" /* WebhookTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["a" /* ArrayTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["i" /* TimeTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["f" /* ObjectTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["b" /* CheckTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["g" /* ScanProfileTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["e" /* HashObjectTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_3__index__["h" /* TextTypeComponent */]
            ]
        })
    ], TypesModule);
    return TypesModule;
}());



/***/ }),

/***/ "./src/app/types/webhook/webhook-type.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/types/webhook/webhook-type.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div class=\"card-header\">\n    Property: {{param.name}}\n  </div>\n  <div class=\"card-body\">\n      <div class=\"form-group row\">\n          <label class=\"col-sm-4\" for=\"paramName\">Name: </label>\n          <input type=\"text\" class=\"form-control col-sm-8\" name=\"name\" id=\"paramName\" placeholder=\"Param Name\" [(ngModel)]=\"param.name\">\n        </div>\n    <div class=\"form-group row\">\n      <label class=\"col-sm-4\" for=\"hookName\">WebHook: </label>\n      <input type=\"text\" class=\"form-control col-sm-8\" name=\"name\" id=\"hookName\" placeholder=\"WebHook Name\" [(ngModel)]=\"hook.name\">\n    </div>\n    <div class=\"btn-group row d-flex\">\n        <button type=\"submit\" class=\"btn btn-primary col-sm-4 w-100\" (click)=\"save()\" title=\"Creates/Updates a webhook for this node\">Save</button>\n        <button type=\"submit\" class=\"btn btn-success col-sm-4 w-100\" (click)=\"activate()\" title=\"Activate this webhook\">Activate</button>\n        <button type=\"submit\" class=\"btn btn-warning col-sm-4 w-100\" (click)=\"delete()\" title=\"Deletes the webhook for this node\">Delete</button>\n      </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/types/webhook/webhook-type.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebhookTypeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webhook_index__ = __webpack_require__("./src/app/webhook/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pipeline_index__ = __webpack_require__("./src/app/pipeline/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WebhookTypeComponent = /** @class */ (function () {
    function WebhookTypeComponent(webhookService, pipService, alert) {
        this.webhookService = webhookService;
        this.pipService = pipService;
        this.alert = alert;
        this.hookSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    WebhookTypeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.hook = new __WEBPACK_IMPORTED_MODULE_1__webhook_index__["a" /* WebHook */]();
        this.webhookService.getWebHookForNode(this.node).subscribe(function (webhook) {
            if (webhook !== null)
                _this.hook = webhook;
            if (_this.param.value === '' || !_this.param.value) {
                _this.param.value = _this.hook.id;
                _this.pipService.updateNodeForPipeline(_this.node).subscribe(function (data) {
                    _this.alert.success("Propertie: " + _this.param.name + " saved");
                }, function (err) {
                    _this.alert.error("Cannot save propertie: " + _this.param.name);
                });
            }
        }, function (err) {
        });
    };
    WebhookTypeComponent.prototype.activate = function () {
        var _this = this;
        if (this.hook.id) {
            this.webhookService.activateWebHook(this.hook).subscribe(function (data) {
                _this.alert.success("Webhook: " + _this.hook.name + " activated");
            }, function (err) {
                _this.alert.error("Cannot activate webhook");
            });
        }
    };
    WebhookTypeComponent.prototype.save = function () {
        var _this = this;
        if (this.hook.id && this.hook.id.length > 3) {
            //Webhook alredy exists
            this.webhookService.updateWebHook(this.hook).subscribe(function (data) {
                _this.hookSelected.emit(_this.hook);
            }, function (err) { });
        }
        else {
            this.hook.node = this.node.id;
            if (this.hook.node && this.hook.node.length > 3) {
                //Node exists but hook not
                this.webhookService.createWebHook(this.hook).subscribe(function (data) {
                    _this.hookSelected.emit(_this.hook);
                }, function (err) { });
            }
            else {
            }
        }
    };
    WebhookTypeComponent.prototype.delete = function () {
        var _this = this;
        this.webhookService.deleteWebHook(this.hook).subscribe(function (data) {
            _this.hookSelected.emit(null);
            _this.hook = null;
        }, function (err) { });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__pipeline_index__["k" /* PipelineNode */])
    ], WebhookTypeComponent.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__pipeline_index__["l" /* PipelineNodeAtribute */])
    ], WebhookTypeComponent.prototype, "param", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], WebhookTypeComponent.prototype, "hookSelected", void 0);
    WebhookTypeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'type-webhook',
            template: __webpack_require__("./src/app/types/webhook/webhook-type.component.html"),
            styles: [__webpack_require__("./src/app/types/webhook/webhook-type.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__webhook_index__["d" /* WebhookService */], __WEBPACK_IMPORTED_MODULE_2__pipeline_index__["p" /* PipelineService */], __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__["a" /* AlertService */]])
    ], WebhookTypeComponent);
    return WebhookTypeComponent;
}());



/***/ }),

/***/ "./src/app/user-management/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user__ = __webpack_require__("./src/app/user-management/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_management_component__ = __webpack_require__("./src/app/user-management/user-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__("./src/app/user-management/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_edit_user_edit_component__ = __webpack_require__("./src/app/user-management/user-edit/user-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_view_user_view_component__ = __webpack_require__("./src/app/user-management/user-view/user-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_new_user_new_component__ = __webpack_require__("./src/app/user-management/user-new/user-new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__user_profile_user_profile_component__ = __webpack_require__("./src/app/user-management/user-profile/user-profile.component.ts");
/* unused harmony reexport User */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_6__user_profile_user_profile_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__user_edit_user_edit_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__user_new_user_new_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_4__user_view_user_view_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__user_management_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__user_service__["a"]; });










/***/ }),

/***/ "./src/app/user-management/my-profile/my-profile.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/user-management/my-profile/my-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <form>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <!--HEADER -->\n        <dl class=\"row\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Name of the usder\">Name:</dt>\n          <dd class=\"col-sm-7\">{{user.name}}</dd>\n        </dl>\n      </div>\n      <div class=\"card-body\">\n        <dl class=\"row\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Theemail of the user\">Email: </dt>\n          <dd class=\"col-sm-7\">\n            <a>{{user.email}}</a>\n          </dd>\n        </dl>\n        <dl class=\"row\" *ngIf=\"user.manager_name !== ''\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The Name of the manager of the user\">Manager: </dt>\n          <dd class=\"col-sm-7\">\n            <a routerLink=\"/users/{{user.manager}}\">{{user.manager_name}}</a>\n          </dd>\n        </dl>\n        <div class=\"input-group mb-3\">\n          <div class=\"input-group-prepend\">\n            <label class=\"input-group-text\" for=\"inputGroupSelect01\">Role</label>\n          </div>\n          <select disabled=\"true\" class=\"custom-select\" id=\"inputGroupSelect01\" name=\"role\" [ngModel]=\"user.role\">\n            <option value=\"0\" [selected]=\"user.role===0\">Dev</option>\n            <option value=\"2\" [selected]=\"user.role===2\">Project Manager</option>\n            <option value=\"1\" [selected]=\"user.role===1\">Responsable</option>\n            <option value=\"3\" [selected]=\"user.role===3\">Admin</option>\n          </select>\n        </div>\n        <dl class=\"row\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The last time the was connected\">Last Connection</dt>\n          <dd class=\"col-sm-7\">{{user.last_update}}</dd>\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The creation date for this user\">Creation Date</dt>\n          <dd class=\"col-sm-7\">{{user.create_date}}</dd>\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-3\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The ID of the user\">ID</dt>\n          <dd class=\"col-sm-9\">{{user.id}}</dd>\n        </dl>\n        <div class=\"form-group\">\n          <label for=\"userName\">Password</label>\n          <input type=\"password\" class=\"form-control\" name=\"password1\" id=\"password1\" placeholder=\"password\" [(ngModel)]=\"password1\">\n        </div>\n        <div class=\"form-group\">\n          <label for=\"userName\">Repeat Password</label>\n          <input type=\"password\" class=\"form-control\" name=\"password2\" id=\"password2\" placeholder=\"password\" [(ngModel)]=\"password2\">\n        </div>\n        <div class=\"btn-group\">\n          <button type=\"submit\" class=\"btn btn-primary\" (click)=\"changePassword()\">Save</button>\n        </div>\n      </div>\n    </div>\n  </form>\n\n</div>"

/***/ }),

/***/ "./src/app/user-management/my-profile/my-profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__("./src/app/user-management/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__("./src/app/user-management/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;
var MyProfileComponent = /** @class */ (function () {
    function MyProfileComponent(auth, userService, route, location, alert, modalService, activeModal) {
        this.auth = auth;
        this.userService = userService;
        this.route = route;
        this.location = location;
        this.alert = alert;
        this.modalService = modalService;
        this.activeModal = activeModal;
        this.user = new __WEBPACK_IMPORTED_MODULE_1__user__["a" /* User */]();
    }
    MyProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        var usr = this.auth.getUser();
        if (usr !== null) {
            this.userService.getUser(usr.id).subscribe(function (user) { return _this.user = user; }, function (err) {
                _this.auth.signOut();
            });
        }
        else {
            this.auth.signOut();
        }
    };
    MyProfileComponent.prototype.edit = function () {
        var _this = this;
        this.userService.updateUser(this.user).subscribe(function (data) {
            _this.alert.success("Updated");
        }, function (err) {
            _this.alert.error('message' in err.error ? err.error.message : "Cannot save User");
        });
    };
    MyProfileComponent.prototype.changePassword = function () {
        var _this = this;
        if (this.password1.length >= 5
            && this.password1 === this.password2) {
            if (!this.isValidPassword(this.user.name, this.password1)) {
                this.alert.error("Password must be at leats 8 characters, contain 1 upper case and 1 lower case letter and cannot contain more than 3 consecutive letters from the user name");
            }
            else {
                var auxUsr = new __WEBPACK_IMPORTED_MODULE_1__user__["a" /* User */]();
                auxUsr.id = this.user.id;
                auxUsr.password = this.password1;
                this.userService.updateUser(auxUsr).subscribe(function (data) {
                    _this.alert.success("Updated");
                }, function (err) {
                    _this.alert.error('message' in err.error ? err.error.message : "Cannot update Password");
                });
            }
        }
        else {
            this.alert.warn("Passwords must match");
        }
    };
    MyProfileComponent.prototype.isValidPassword = function (userName, password) {
        if (!password.match(passwordPattern))
            return false;
        for (var i = 0; (i + 3) < userName.length; i++)
            if (password.indexOf(userName.substring(i, i + 3)) != -1)
                return false;
        return true;
    };
    MyProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-my-profile',
            template: __webpack_require__("./src/app/user-management/my-profile/my-profile.component.html"),
            styles: [__webpack_require__("./src/app/user-management/my-profile/my-profile.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_7__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["a" /* NgbActiveModal */]])
    ], MyProfileComponent);
    return MyProfileComponent;
}());



/***/ }),

/***/ "./src/app/user-management/user-edit/user-edit.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/user-management/user-edit/user-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #content let-c=\"close\" let-d=\"dismiss\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"deleteModalLabel\">Are you sure?</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"c('Close click')\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        Do you want to delet tha user labeled as \"{{user.name}}\"?\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"d('Close click')\">Cancel</button>\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"sureDelete();c('Close click');\">Remove</button>\n      </div>\n    </div>\n  </div>\n</ng-template>\n<div>\n  <form>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <!--HEADER -->\n        <div class=\"form-group\">\n          <label for=\"userName\">User Name</label>\n          <input type=\"text\" class=\"form-control\" name=\"name\" id=\"userName\" placeholder=\"User Name\" [(ngModel)]=\"user.name\">\n        </div>\n\n      </div>\n      <div class=\"card-body\">\n\n        <div class=\"form-group\">\n          <label for=\"userEmail\">User Email</label>\n          <input type=\"email\" class=\"form-control\" name=\"email\" id=\"userEmail\" placeholder=\"user@email.com\" [(ngModel)]=\"user.email\">\n        </div>\n        <dl class=\"row\" *ngIf=\"user.manager_name !== ''\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The Name of the manager of the user\">Manager: </dt>\n          <dd class=\"col-sm-7\">\n            <a routerLink=\"/users/{{user.manager}}\">{{user.manager_name}}</a>\n          </dd>\n        </dl>\n        <div class=\"input-group mb-3\">\n          <div class=\"input-group-prepend\">\n            <label class=\"input-group-text\" for=\"inputGroupSelect01\">Role</label>\n          </div>\n          <select class=\"custom-select\" id=\"inputGroupSelect01\" name=\"role\" [ngModel]=\"user.role\">\n            <option value=\"0\" [selected]=\"user.role===0\">Dev</option>\n            <option value=\"2\" [selected]=\"user.role===2\">Project Manager</option>\n            <option value=\"1\" [selected]=\"user.role===1\">Responsable</option>\n            <option value=\"3\" [selected]=\"user.role===3\">Admin</option>\n          </select>\n        </div>\n        <dl class=\"row\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The last time the was connected\">Last Connection</dt>\n          <dd class=\"col-sm-7\">{{user.last_update}}</dd>\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The creation date for this user\">Creation Date</dt>\n          <dd class=\"col-sm-7\">{{user.create_date}}</dd>\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-3\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The ID of the user\">ID</dt>\n          <dd class=\"col-sm-9\">{{user.id}}</dd>\n        </dl>\n        <div class=\"btn-group\">\n          <button type=\"submit\" class=\"btn btn-primary\" (click)=\"edit()\">Edit</button>\n          <button type=\"submit\" class=\"btn btn-secondary\" (click)=\"cancel()\">Cancel</button>\n          <button type=\"submit\" class=\"btn btn-danger\" data-toggle=\"modal\" data-target=\"#deleteModal\" (click)=\"deleteModal(content)\">Remove</button>\n        </div>\n      </div>\n    </div>\n  </form>\n\n</div>"

/***/ }),

/***/ "./src/app/user-management/user-edit/user-edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__("./src/app/user-management/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__("./src/app/user-management/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UserEditComponent = /** @class */ (function () {
    function UserEditComponent(userService, route, location, alert, modalService, activeModal) {
        this.userService = userService;
        this.route = route;
        this.location = location;
        this.alert = alert;
        this.modalService = modalService;
        this.activeModal = activeModal;
        this.user = new __WEBPACK_IMPORTED_MODULE_1__user__["a" /* User */]();
    }
    UserEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.userService.getUser(params['id']); })
            .subscribe(function (user) { return _this.user = user; });
    };
    UserEditComponent.prototype.edit = function () {
        var _this = this;
        this.userService.updateUser(this.user).subscribe(function (data) {
            _this.alert.success("Updated");
        }, function (err) {
            _this.alert.error('message' in err.error ? err.error.message : "Cannot save User");
        });
    };
    UserEditComponent.prototype.cancel = function () {
        this.user = null;
        this.location.back();
    };
    UserEditComponent.prototype.sureDelete = function () {
        var _this = this;
        this.activeModal.close('Close click');
        this.userService.deleteUser(this.user).subscribe(function (data) {
            _this.alert.success("Deleted");
            _this.user = null;
            _this.location.back();
        }, function (err) {
            _this.alert.error('message' in err.error ? err.error.message : "Cannot delete User");
        });
    };
    UserEditComponent.prototype.deleteModal = function (content) {
        this.modalService.open(content).result.then(function (result) {
            console.log(result);
        }, function (reason) {
            console.error(reason);
        }).catch(function (err) {
            console.error(err);
        });
    };
    UserEditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'user-edit',
            template: __webpack_require__("./src/app/user-management/user-edit/user-edit.component.html"),
            styles: [__webpack_require__("./src/app/user-management/user-edit/user-edit.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_6__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["a" /* NgbActiveModal */]])
    ], UserEditComponent);
    return UserEditComponent;
}());



/***/ }),

/***/ "./src/app/user-management/user-management.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/user-management/user-management.component.html":
/***/ (function(module, exports) {

module.exports = "<div class='container'>\n  <div class=\"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom\">\n    <h4>List of Users</h4>\n    <div class=\"btn-toolbar mb-2 mb-md-0\">\n      <div class=\"btn-group mr-2\">\n        <div>\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"newUser()\">Create new User</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"tempUser\" class=\"row\">\n      <div class=\"col-sm-12 col-xl-12\">\n          <user-new [user]=\"tempUser\"></user-new>\n      </div>\n      \n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-12 col-md-6\">\n      <div class=\"list-group\">\n        <div *ngFor=\"let user of users\" (click)=\"onSelect(user)\">\n            <a  [class.active]=\"user === selectedUser\"  class=\"list-group-item\">\n                <span routerLink=\"/users/{{user.id}}\">{{user.name}} </span>\n              </a>\n        </div>\n        \n      </div>\n      <hr/>\n    </div>\n    <div class=\"col-sm-12 col-md-6\">\n      <user-view [user]=\"selectedUser\"></user-view>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/user-management/user-management.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserManagementComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__("./src/app/user-management/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__("./src/app/user-management/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserManagementComponent = /** @class */ (function () {
    function UserManagementComponent(userService) {
        this.userService = userService;
    }
    UserManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tempUser = null;
        this.fetchData();
        this.userService.subscribeToUsers().subscribe(function (data) {
            _this.fetchData();
        }, function (err) {
        });
    };
    UserManagementComponent.prototype.onSelect = function (user) {
        this.selectedUser = user;
    };
    UserManagementComponent.prototype.fetchData = function () {
        var _this = this;
        this.userService.getUsers().subscribe(function (users) {
            _this.users = users;
            console.log(users);
        });
    };
    UserManagementComponent.prototype.newUser = function () {
        this.tempUser = new __WEBPACK_IMPORTED_MODULE_1__user__["a" /* User */]();
    };
    UserManagementComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'user-management',
            template: __webpack_require__("./src/app/user-management/user-management.component.html"),
            styles: [__webpack_require__("./src/app/user-management/user-management.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */]])
    ], UserManagementComponent);
    return UserManagementComponent;
}());



/***/ }),

/***/ "./src/app/user-management/user-new/user-new.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/user-management/user-new/user-new.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"user\">\n  <form>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <!--HEADER -->\n        <div class=\"form-group\">\n          <label for=\"userName\">User Name</label>\n          <input type=\"text\" class=\"form-control\" name=\"name\" id=\"userName\" placeholder=\"User Name\" [(ngModel)]=\"user.name\">\n        </div>\n      </div>\n      <div class=\"card-body\">\n        <div class=\"form-group\">\n          <label for=\"userEmail\">User Email</label>\n          <input type=\"email\" class=\"form-control\" name=\"email\" id=\"userEmail\" placeholder=\"user@email.com\" [(ngModel)]=\"user.email\">\n        </div>\n        <div class=\"input-group mb-3\">\n          <div class=\"input-group-prepend\">\n            <label class=\"input-group-text\" for=\"selectRole\">Role</label>\n          </div>\n          <select class=\"custom-select\" name=\"role\" id=\"selectRole\" [(ngModel)]=\"user.role\" type=\"number\">\n            <option value=0 [selected]=\"user.role===0\">Dev</option>\n            <option value=2 [selected]=\"user.role===2\">Project Manager</option>\n            <option value=1 [selected]=\"user.role===1\">Responsable</option>\n            <option value=3 [selected]=\"user.role===3\">Admin</option>\n          </select>\n        </div>\n        <div class=\"btn-group\">\n          <button type=\"submit\" class=\"btn btn-primary\" (click)=\"create()\">Create</button>\n          <button type=\"submit\" class=\"btn btn-secondary\" (click)=\"cancel()\">Cancel</button>\n        </div>\n      </div>\n    </div>\n  </form>\n\n</div>"

/***/ }),

/***/ "./src/app/user-management/user-new/user-new.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserNewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_service__ = __webpack_require__("./src/app/user-management/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user__ = __webpack_require__("./src/app/user-management/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserNewComponent = /** @class */ (function () {
    function UserNewComponent(userService, alert) {
        this.userService = userService;
        this.alert = alert;
    }
    UserNewComponent.prototype.ngOnInit = function () {
    };
    UserNewComponent.prototype.create = function () {
        var _this = this;
        this.user.role = parseInt(this.user.role.toString(), 10);
        this.userService.postUser(this.user).subscribe(function (data) {
            _this.alert.success("Updated");
            _this.user = null;
        }, function (err) {
            _this.alert.error('message' in err.error ? err.error.message : "Cannot save User");
        });
    };
    UserNewComponent.prototype.cancel = function () {
        this.user = null;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__user__["a" /* User */])
    ], UserNewComponent.prototype, "user", void 0);
    UserNewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'user-new',
            template: __webpack_require__("./src/app/user-management/user-new/user-new.component.html"),
            styles: [__webpack_require__("./src/app/user-management/user-new/user-new.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__["a" /* AlertService */]])
    ], UserNewComponent);
    return UserNewComponent;
}());



/***/ }),

/***/ "./src/app/user-management/user-profile/user-profile.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/user-management/user-profile/user-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <form>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <!--HEADER -->\n        <dl class=\"row\">\n            <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Name of the usder\">Name:</dt>\n            <dd class=\"col-sm-7\">{{user.name}}</dd>\n          </dl>\n      </div>\n      <div class=\"card-body\">\n        <dl class=\"row\" >\n            <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Theemail of the user\">Email: </dt>\n            <dd class=\"col-sm-7\">\n              <a>{{user.email}}</a>\n            </dd>\n          </dl>\n        <dl class=\"row\" *ngIf=\"user.manager_name !== ''\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The Name of the manager of the user\">Manager: </dt>\n          <dd class=\"col-sm-7\">\n            <a routerLink=\"/users/{{user.manager}}\">{{user.manager_name}}</a>\n          </dd>\n        </dl>\n        <div class=\"input-group mb-3\">\n          <div class=\"input-group-prepend\">\n            <label class=\"input-group-text\" for=\"inputGroupSelect01\">Role</label>\n          </div>\n          <select disabled=\"true\" class=\"custom-select\" id=\"inputGroupSelect01\" name=\"role\" [ngModel]=\"user.role\">\n            <option value=\"0\" [selected]=\"user.role===0\">Dev</option>\n            <option value=\"2\" [selected]=\"user.role===2\">Project Manager</option>\n            <option value=\"1\" [selected]=\"user.role===1\">Responsable</option>\n            <option value=\"3\" [selected]=\"user.role===3\">Admin</option>\n          </select>\n        </div>\n        <dl class=\"row\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The last time the was connected\">Last Connection</dt>\n          <dd class=\"col-sm-7\">{{user.last_update}}</dd>\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The creation date for this user\">Creation Date</dt>\n          <dd class=\"col-sm-7\">{{user.create_date}}</dd>\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-3\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The ID of the user\">ID</dt>\n          <dd class=\"col-sm-9\">{{user.id}}</dd>\n        </dl>\n        <div *ngIf=\"!auth.isDev()\" class=\"btn-group\">\n          <button type=\"submit\" class=\"btn btn-primary\" routerLink=\"/users/edit/{{user.id}}\">Edit</button>\n        </div>\n      </div>\n    </div>\n  </form>\n\n</div>"

/***/ }),

/***/ "./src/app/user-management/user-profile/user-profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__("./src/app/user-management/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__("./src/app/user-management/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__auth_auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UserProfileComponent = /** @class */ (function () {
    function UserProfileComponent(userService, route, location, alert, auth) {
        this.userService = userService;
        this.route = route;
        this.location = location;
        this.alert = alert;
        this.auth = auth;
        this.user = new __WEBPACK_IMPORTED_MODULE_1__user__["a" /* User */]();
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.userService.getUser(params['id']); })
            .subscribe(function (user) { return _this.user = user; });
    };
    UserProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-user-profile',
            template: __webpack_require__("./src/app/user-management/user-profile/user-profile.component.html"),
            styles: [__webpack_require__("./src/app/user-management/user-profile/user-profile.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_7__auth_auth_service__["a" /* AuthService */]])
    ], UserProfileComponent);
    return UserProfileComponent;
}());



/***/ }),

/***/ "./src/app/user-management/user-view/user-view.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/user-management/user-view/user-view.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"user\">\n  <form>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <!--HEADER -->\n        <dl class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Name of the usder\">Name:</dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">{{user.name}}</dd>\n        </dl>\n      </div>\n      <div class=\"card-body\">\n        <dl class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Theemail of the user\">Email: </dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">\n            <a>{{user.email}}</a>\n          </dd>\n        </dl>\n        <dl class=\"row\" *ngIf=\"user.manager_name !== ''\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The Name of the manager of the user\">Manager: </dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">\n            <a routerLink=\"/users/{{user.manager}}\">{{user.manager_name}}</a>\n          </dd>\n        </dl>\n        <div class=\"input-group mb-3\">\n          <div class=\"input-group-prepend\">\n            <label class=\"input-group-text\" for=\"inputGroupSelect01\">Role</label>\n          </div>\n          <select disabled=\"true\" class=\"custom-select\" id=\"inputGroupSelect01\" name=\"role\" [ngModel]=\"user.role\">\n            <option value=\"0\" [selected]=\"user.role===0\">Dev</option>\n            <option value=\"2\" [selected]=\"user.role===2\">Project Manager</option>\n            <option value=\"1\" [selected]=\"user.role===1\">Responsable</option>\n            <option value=\"3\" [selected]=\"user.role===3\">Admin</option>\n          </select>\n        </div>\n        <dl class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The last time the was connected\">Last Connection</dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">{{user.last_update}}</dd>\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The creation date for this user\">Creation Date</dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">{{user.create_date}}</dd>\n        </dl>\n        <dl class=\"row\">\n          <dt class=\"col-sm-4 text-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The ID of the user\">ID</dt>\n          <dd class=\"col-sm-8 text-left text-truncate\">{{user.id}}</dd>\n        </dl>\n        <div *ngIf=\"!auth.isDev()\" class=\"btn-group\">\n          <button type=\"submit\" class=\"btn btn-primary\" routerLink=\"/users/edit/{{user.id}}\">Edit</button>\n        </div>\n      </div>\n    </div>\n  </form>\n\n</div>"

/***/ }),

/***/ "./src/app/user-management/user-view/user-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__("./src/app/user-management/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserViewComponent = /** @class */ (function () {
    function UserViewComponent(auth) {
        this.auth = auth;
    }
    UserViewComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__user__["a" /* User */])
    ], UserViewComponent.prototype, "user", void 0);
    UserViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'user-view',
            template: __webpack_require__("./src/app/user-management/user-view/user-view.component.html"),
            styles: [__webpack_require__("./src/app/user-management/user-view/user-view.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]])
    ], UserViewComponent);
    return UserViewComponent;
}());



/***/ }),

/***/ "./src/app/user-management/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserService = /** @class */ (function () {
    function UserService(http, AppSettings) {
        var _this = this;
        this.http = http;
        this.AppSettings = AppSettings;
        this.pullerObserver = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.subscriber = observer;
        });
    }
    UserService.prototype.getUsers = function () {
        return this.http.get(this.AppSettings.API_ENDPOINT + 'user').map(function (data) {
            return data;
        });
    };
    UserService.prototype.getUser = function (id, fill) {
        if (fill === void 0) { fill = false; }
        return this.http.get(this.AppSettings.API_ENDPOINT + 'user/' + id).map(function (data) { return data; });
    };
    UserService.prototype.postUser = function (user) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.post(_this.AppSettings.API_ENDPOINT + 'user', user, { responseType: 'json' })
                .subscribe(function (data) {
                _this.notify();
                observer.next(data);
            }, function (err) {
                observer.error(err);
            });
        });
    };
    UserService.prototype.updateUser = function (user) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.put(_this.AppSettings.API_ENDPOINT + 'user/' + user.id, user, { responseType: 'json' })
                .subscribe(function (data) {
                _this.notify();
                observer.next(data);
            }, function (err) {
                observer.error(err);
            });
        });
    };
    UserService.prototype.deleteUser = function (user) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.delete(_this.AppSettings.API_ENDPOINT + 'user/' + user.id, { responseType: 'json' })
                .subscribe(function (data) {
                _this.notify();
                observer.next(data);
            }, function (err) {
                observer.error(err);
            });
        });
    };
    /**
     * Get notified when a object is deleted, update or created.
     * Dont use it in @Input Components
     */
    UserService.prototype.subscribeToUsers = function () {
        return this.pullerObserver;
    };
    /**
     * Use internally
     */
    UserService.prototype.notify = function () {
        try {
            this.subscriber.next(true);
        }
        catch (err) { }
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__app_settings_service__["a" /* AppSettingsService */]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/user-management/user.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = /** @class */ (function () {
    function User() {
        this.manager_name = "";
        this.password = "";
    }
    return User;
}());



/***/ }),

/***/ "./src/app/web-project/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__web_project_service__ = __webpack_require__("./src/app/web-project/web-project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__web_project_new_web_project_new_component__ = __webpack_require__("./src/app/web-project/web-project-new/web-project-new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__web_project_component__ = __webpack_require__("./src/app/web-project/web-project.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__web_project__ = __webpack_require__("./src/app/web-project/web-project.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__web_project_view_web_project_view_component__ = __webpack_require__("./src/app/web-project/web-project-view/web-project-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__web_project_edit_web_project_edit_component__ = __webpack_require__("./src/app/web-project/web-project-edit/web-project-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__web_project_page_web_project_page_component__ = __webpack_require__("./src/app/web-project/web-project-page/web-project-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__web_project_user_web_project_user_component__ = __webpack_require__("./src/app/web-project/web-project-user/web-project-user.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__web_project__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_4__web_project_view_web_project_view_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__web_project_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__web_project_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__web_project_new_web_project_new_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__web_project_edit_web_project_edit_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_6__web_project_page_web_project_page_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_7__web_project_user_web_project_user_component__["a"]; });











/***/ }),

/***/ "./src/app/web-project/web-project-edit/web-project-edit.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/web-project/web-project-edit/web-project-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #content let-c=\"close\" let-d=\"dismiss\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"deleteModalLabel\">Are you sure?</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"c('Close click')\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        Do you want to delet tha web project labeled as \"{{project.name}}\"?\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"d('Close click')\">Cancel</button>\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"sureDelete();c('Close click');\">Remove</button>\n      </div>\n    </div>\n  </div>\n</ng-template>\n<div *ngIf=\"project\">\n  <form>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <!--HEADER -->\n\n        <div class=\"form-group\">\n          <label for=\"projectName\">Project Name</label>\n          <input type=\"text\" class=\"form-control\" name=\"name\" id=\"projectName\" placeholder=\"Project Name\" [(ngModel)]=\"project.name\">\n        </div>\n      </div>\n      <div class=\"card-body\">\n        <div class=\"form-group\">\n          <label for=\"projectDescription\">Project Description</label>\n          <textarea class=\"form-control\" id=\"projectDescription\" rows=\"10\" name=\"description\" [(ngModel)]=\"project.description\"></textarea>\n        </div>\n        <dl class=\"row\" *ngIf=\"project.project_manager_name !== ''\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The Name of the manager of the Project\">Manager: </dt>\n          <dd class=\"col-sm-7\">\n            <a routerLink=\"/user/{{project.project_manager}}\">{{project.project_manager_name}}</a>\n          </dd>\n        </dl>\n        <div class=\"form-check row\">\n          <input type=\"checkbox\" name=\"as\" class=\"form-check-input\" id=\"activeProject\" [checked]=\"project.active\" (change)=\"project.active = !project.active\">\n          <label class=\"form-check-label\" for=\"activeProject\">Active</label>\n        </div>\n        <div class=\"btn-group\">\n          <button type=\"submit\" class=\"btn btn-primary\" (click)=\"edit()\">Edit</button>\n          <button type=\"submit\" class=\"btn btn-secondary\" (click)=\"cancel()\">Cancel</button>\n          <button type=\"submit\" class=\"btn btn-danger\" data-toggle=\"modal\" data-target=\"#deleteModal\" (click)=\"deleteModal(content)\">Remove</button>\n        </div>\n      </div>\n    </div>\n  </form>\n\n</div>"

/***/ }),

/***/ "./src/app/web-project/web-project-edit/web-project-edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebProjectEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__web_project__ = __webpack_require__("./src/app/web-project/web-project.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__web_project_service__ = __webpack_require__("./src/app/web-project/web-project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var WebProjectEditComponent = /** @class */ (function () {
    function WebProjectEditComponent(route, location, webProjServ, alert, modalService, activeModal) {
        this.route = route;
        this.location = location;
        this.webProjServ = webProjServ;
        this.alert = alert;
        this.modalService = modalService;
        this.activeModal = activeModal;
        this.project = new __WEBPACK_IMPORTED_MODULE_1__web_project__["a" /* WebProject */]();
    }
    WebProjectEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.webProjServ.getWebProject(params['id']); })
            .subscribe(function (proj) {
            _this.project = proj;
        });
    };
    WebProjectEditComponent.prototype.edit = function () {
        var _this = this;
        this.projectBackup = Object.assign({}, this.project);
        this.webProjServ.updateWebProject(this.project).subscribe(function (data) {
            _this.alert.success("Updated");
        }, function (err) {
            _this.alert.error("Cannot save WebProject");
        });
    };
    WebProjectEditComponent.prototype.cancel = function () {
        this.project = Object.assign(this.project, this.projectBackup);
        this.project = null;
        this.location.back();
    };
    WebProjectEditComponent.prototype.sureDelete = function () {
        var _this = this;
        this.activeModal.close('Close click');
        this.webProjServ.deleteWebProject(this.project).subscribe(function (data) {
            _this.alert.success("Deleted");
            _this.project = null;
            _this.projectBackup = null;
            _this.location.back();
        }, function (err) {
            _this.alert.error("Cannot delete WebProject");
        });
    };
    WebProjectEditComponent.prototype.deleteModal = function (content) {
        this.modalService.open(content).result.then(function (result) {
            console.log(result);
        }, function (reason) {
            console.error(reason);
        }).catch(function (err) {
            console.error(err);
        });
    };
    WebProjectEditComponent.prototype.ngOnChanges = function () {
        this.projectBackup = Object.assign({}, this.project);
    };
    WebProjectEditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'web-project-edit',
            template: __webpack_require__("./src/app/web-project/web-project-edit/web-project-edit.component.html"),
            styles: [__webpack_require__("./src/app/web-project/web-project-edit/web-project-edit.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_6__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_2__web_project_service__["a" /* WebProjectService */],
            __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["a" /* NgbActiveModal */]])
    ], WebProjectEditComponent);
    return WebProjectEditComponent;
}());



/***/ }),

/***/ "./src/app/web-project/web-project-new/web-project-new.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/web-project/web-project-new/web-project-new.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"project\">\n  <form>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <!--HEADER -->\n\n        <div class=\"form-group row\">\n          <label for=\"projectName\" class=\"col-sm-2 col-form-label\">Project Name</label>\n          <div class=\"col-sm-10\">\n            <input type=\"text\" class=\"form-control\" name=\"name\" id=\"projectName\" placeholder=\"Project Name\" [(ngModel)]=\"project.name\">\n          </div>\n        </div>\n      </div>\n      <div class=\"card-body\">\n        <div class=\"form-group\">\n          <label for=\"projectDescription\">Project Description</label>\n          <textarea class=\"form-control\" id=\"projectDescription\" rows=\"3\" name=\"description\" [(ngModel)]=\"project.description\"></textarea>\n        </div>\n        <div class=\"form-check row\">\n          <input type=\"checkbox\" name=\"as\"class=\"form-check-input\" id=\"activeProject\" [checked]=\"project.active\" (change)=\"project.active = !project.active\">\n          <label class=\"form-check-label\" for=\"activeProject\">Active</label>\n        </div>\n        <button type=\"submit\" class=\"btn btn-primary\" (click)=\"save()\">Save</button>\n        <button type=\"submit\" class=\"btn btn-primary\" (click)=\"cancel()\">Cancel</button>\n      </div>\n    </div>\n  </form>\n</div>\n<div *ngIf=\"project===null\">\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"newProject()\">Create new Project</button>\n</div>"

/***/ }),

/***/ "./src/app/web-project/web-project-new/web-project-new.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebProjectNewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__web_project__ = __webpack_require__("./src/app/web-project/web-project.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__web_project_service__ = __webpack_require__("./src/app/web-project/web-project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WebProjectNewComponent = /** @class */ (function () {
    function WebProjectNewComponent(webProjServ, alert) {
        this.webProjServ = webProjServ;
        this.alert = alert;
    }
    WebProjectNewComponent.prototype.ngOnInit = function () {
        this.project = null;
    };
    WebProjectNewComponent.prototype.newProject = function () {
        this.project = new __WEBPACK_IMPORTED_MODULE_1__web_project__["a" /* WebProject */]();
        this.project.name = "aaa";
        this.project.description = "bbb";
    };
    WebProjectNewComponent.prototype.save = function () {
        var _this = this;
        this.webProjServ.postWebProject(this.project).subscribe(function (data) {
            _this.alert.success("WebProject " + _this.project.name + " suscessfully created");
            _this.project = null;
        }, function (err) {
            _this.alert.error("Error creating webproject");
        });
    };
    WebProjectNewComponent.prototype.cancel = function () {
        this.project = null;
    };
    WebProjectNewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'web-project-new',
            template: __webpack_require__("./src/app/web-project/web-project-new/web-project-new.component.html"),
            styles: [__webpack_require__("./src/app/web-project/web-project-new/web-project-new.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__web_project_service__["a" /* WebProjectService */], __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__["a" /* AlertService */]])
    ], WebProjectNewComponent);
    return WebProjectNewComponent;
}());



/***/ }),

/***/ "./src/app/web-project/web-project-page/web-project-page.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/web-project/web-project-page/web-project-page.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      <!--HEADER -->\n      <dl class=\"row\">\n        <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Project Name\">Project Name: </dt>\n        <dd class=\"col-sm-7\">\n          <p class=\"text-left\">{{project.name}}</p>\n          \n        </dd>\n      </dl>\n    </div>\n    <div class=\"card-body\">\n      <dl class=\"row\">\n        <dt class=\"col-sm-12\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The Description for this project\">Description: </dt>\n        <dd class=\"col-sm-12\">\n          <span style=\"white-space: pre-line\">{{project.description}}</span>\n        </dd>\n      </dl>\n      <dl class=\"row\" *ngIf=\"project.project_manager_name !== ''\">\n        <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The Name of the manager of the Project\">Manager: </dt>\n        <dd class=\"col-sm-7\">\n          <a routerLink=\"/user/{{project.project_manager}}\">{{project.project_manager_name}}</a>\n        </dd>\n      </dl>\n      <div *ngIf=\"!auth.isDev()\" class=\"btn-group\">\n        <button type=\"submit\" class=\"btn btn-primary\" routerLink=\"/projects/edit/{{project.id}}\">Edit</button>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/web-project/web-project-page/web-project-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebProjectPageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__web_project__ = __webpack_require__("./src/app/web-project/web-project.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__web_project_service__ = __webpack_require__("./src/app/web-project/web-project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__auth_auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var WebProjectPageComponent = /** @class */ (function () {
    function WebProjectPageComponent(route, location, webProjServ, alert, modalService, activeModal, auth) {
        this.route = route;
        this.location = location;
        this.webProjServ = webProjServ;
        this.alert = alert;
        this.modalService = modalService;
        this.activeModal = activeModal;
        this.auth = auth;
        this.project = new __WEBPACK_IMPORTED_MODULE_1__web_project__["a" /* WebProject */]();
    }
    WebProjectPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.webProjServ.getWebProject(params['id']); })
            .subscribe(function (proj) {
            _this.project = proj;
        });
    };
    WebProjectPageComponent.prototype.cancel = function () {
        this.project = null;
        this.location.back();
    };
    WebProjectPageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'web-project-page',
            template: __webpack_require__("./src/app/web-project/web-project-page/web-project-page.component.html"),
            styles: [__webpack_require__("./src/app/web-project/web-project-page/web-project-page.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_6__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_2__web_project_service__["a" /* WebProjectService */],
            __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["a" /* NgbActiveModal */],
            __WEBPACK_IMPORTED_MODULE_8__auth_auth_service__["a" /* AuthService */]])
    ], WebProjectPageComponent);
    return WebProjectPageComponent;
}());



/***/ }),

/***/ "./src/app/web-project/web-project-user/web-project-user.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/web-project/web-project-user/web-project-user.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"user\">\n  <dl class=\"row\">\n    <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"User Name\">Name:</dt>\n    <dd class=\"col-sm-7\">\n      <a>\n        <span routerLink=\"/users/{{user.id}}\">{{user.name}} </span>\n      </a>\n    </dd>\n  </dl>\n  <dl class=\"row\">\n    <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Role\">role:</dt>\n    <dd *ngIf=\"user.role == 0\" class=\"col-sm-7\">Developer</dd>\n    <dd *ngIf=\"user.role == 1\" class=\"col-sm-7\">Responsible</dd>\n    <dd *ngIf=\"user.role == 2\" class=\"col-sm-7\">Project Manager</dd>\n    <dd *ngIf=\"user.role == 3\" class=\"col-sm-7\">Administrator</dd>\n  </dl>\n</div>"

/***/ }),

/***/ "./src/app/web-project/web-project-user/web-project-user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebProjectUserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_management_user_service__ = __webpack_require__("./src/app/user-management/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WebProjectUserComponent = /** @class */ (function () {
    function WebProjectUserComponent(auth, userService) {
        this.auth = auth;
        this.userService = userService;
    }
    WebProjectUserComponent.prototype.ngOnInit = function () {
    };
    WebProjectUserComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-web-project-user',
            template: __webpack_require__("./src/app/web-project/web-project-user/web-project-user.component.html"),
            styles: [__webpack_require__("./src/app/web-project/web-project-user/web-project-user.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_2__user_management_user_service__["a" /* UserService */]])
    ], WebProjectUserComponent);
    return WebProjectUserComponent;
}());



/***/ }),

/***/ "./src/app/web-project/web-project-view/web-project-view.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/web-project/web-project-view/web-project-view.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"project\">\n  <form>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <!--HEADER -->\n\n        <dl class=\"row\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Project Name\">Project Name: </dt>\n          <dd class=\"col-sm-7 text-left\">\n            {{project.name}}\n          </dd>\n        </dl>\n      </div>\n      <div class=\"card-body\">\n        <dl class=\"row\">\n          <dt class=\"col-sm-12\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The Description for this project\">Description: </dt>\n          <dd class=\"col-sm-12\">\n            <span style=\"white-space: pre-line\">{{project.description}}</span>\n          </dd>\n        </dl>\n        <dl class=\"row\" *ngIf=\"project.project_manager_name !== ''\">\n            <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The Name of the manager of the Project\">Manager: </dt>\n            <dd class=\"col-sm-7\">\n              <a routerLink=\"/user/{{project.project_manager}}\">{{project.project_manager_name}}</a>\n            </dd>\n          </dl>\n        <dl class=\"row\" *ngIf=\"project.system && project.system.length > 0\">\n          <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"List of  Systems\">System: </dt>\n          <dd class=\"col-sm-7\">\n            <span *ngFor=\"let sysm of project.system\" class=\"text-left\">{{sysm}}</span>\n          </dd>\n        </dl>\n        <div  class=\"btn-group\">\n          <button type=\"submit\" class=\"btn btn-primary\" routerLink=\"/projects/{{project.id}}\">Info</button>\n        </div>\n        <div *ngIf=\"!auth.isDev()\" class=\"btn-group\">\n          <button type=\"submit\" class=\"btn btn-primary\" routerLink=\"/projects/edit/{{project.id}}\">Edit</button>\n        </div>\n      </div>\n    </div>\n  </form>\n\n</div>"

/***/ }),

/***/ "./src/app/web-project/web-project-view/web-project-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebProjectViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__web_project__ = __webpack_require__("./src/app/web-project/web-project.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WebProjectViewComponent = /** @class */ (function () {
    function WebProjectViewComponent(auth) {
        this.auth = auth;
    }
    WebProjectViewComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__web_project__["a" /* WebProject */])
    ], WebProjectViewComponent.prototype, "project", void 0);
    WebProjectViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'web-project-view',
            template: __webpack_require__("./src/app/web-project/web-project-view/web-project-view.component.html"),
            styles: [__webpack_require__("./src/app/web-project/web-project-view/web-project-view.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]])
    ], WebProjectViewComponent);
    return WebProjectViewComponent;
}());



/***/ }),

/***/ "./src/app/web-project/web-project.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/web-project/web-project.component.html":
/***/ (function(module, exports) {

module.exports = "<web-project-new *ngIf=\"!auth.isDev()\"></web-project-new>\n<div class=\"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom\">\n</div>\n<div class='container'>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <h4>Web Projects</h4>\n        </div>\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"list-group\" style=\"overflow-y: scroll;line-height: 120%;\">\n                <a *ngFor=\"let project of projects\" [class.active]=\"project === selectedProject\" (click)=\"onSelect(project)\" class=\"list-group-item list-group-item-action flex-column align-items-start\">\n                    <div class=\"d-flex justify-content-between\">\n                        <h5 class=\"mb-1\">{{project.name}}</h5>\n                        <small *ngIf=\"project.status === 0\">Inactive</small>\n                        <small *ngIf=\"project.status != 0\">Active</small>\n                    </div>\n                    <p class=\"mb-1\">\n                        {{project.description}}\n                    </p>\n                    <small *ngIf=\"project.project_manager_name\">Manager: {{project.project_manager_name}}</small>\n                </a>\n            </div>\n            <hr/>\n        </div>\n        <div class=\"col-sm-12 col-md-6\">\n            <web-project-view [project]=\"selectedProject\"></web-project-view>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/web-project/web-project.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebProjectComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__web_project_service__ = __webpack_require__("./src/app/web-project/web-project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WebProjectComponent = /** @class */ (function () {
    function WebProjectComponent(projService, alert, auth) {
        this.projService = projService;
        this.alert = alert;
        this.auth = auth;
    }
    WebProjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchData();
        this.projService.subscribeToWebProjects().subscribe(function (data) {
            _this.fetchData();
        }, function (err) {
        });
    };
    WebProjectComponent.prototype.onSelect = function (project) {
        this.selectedProject = project;
    };
    WebProjectComponent.prototype.fetchData = function () {
        var _this = this;
        this.projService.getWebProjects().subscribe(function (projArray) {
            _this.projects = projArray;
        }, function (err) {
            _this.alert.warn('message' in err.error ? err.error.message : 'Data not found');
        });
    };
    WebProjectComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'web-project',
            template: __webpack_require__("./src/app/web-project/web-project.component.html"),
            styles: [__webpack_require__("./src/app/web-project/web-project.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__web_project_service__["a" /* WebProjectService */], __WEBPACK_IMPORTED_MODULE_2__alert_alert_service__["a" /* AlertService */], __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */]])
    ], WebProjectComponent);
    return WebProjectComponent;
}());



/***/ }),

/***/ "./src/app/web-project/web-project.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebProjectService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__web_project__ = __webpack_require__("./src/app/web-project/web-project.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__environment_environment_service__ = __webpack_require__("./src/app/environment/environment.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var WebProjectService = /** @class */ (function () {
    function WebProjectService(AppSettings, http, alertService, envServ) {
        var _this = this;
        this.AppSettings = AppSettings;
        this.http = http;
        this.alertService = alertService;
        this.envServ = envServ;
        this.actualProject = new __WEBPACK_IMPORTED_MODULE_6__web_project__["a" /* WebProject */]();
        this.pullerObserver = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.subscriber = observer;
        });
    }
    WebProjectService.prototype.getWebProjects = function (fill) {
        var _this = this;
        if (fill === void 0) { fill = false; }
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            if (fill) {
                _this.http.get(_this.AppSettings.API_ENDPOINT + 'webproject')
                    .map(function (data) { return data; })
                    .flatMap(function (projects) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].forkJoin(projects.map(function (project) {
                    return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].forkJoin(project.environments.map(function (env) {
                        return _this.envServ.getEnvironment(env.id);
                    })).map(function (environmnts) {
                        project.environments = environmnts;
                        return project;
                    });
                })); })
                    .subscribe(function (data) {
                    if (data.length > 0 && _this.actualProject.id === '') {
                        var actual_1 = localStorage.getItem('actual_project');
                        if (actual_1) {
                            _this.setActualProject(data.find(function (val, i, arr) {
                                if (val.name === actual_1)
                                    return true;
                                else
                                    return false;
                            }));
                        }
                        else {
                            _this.setActualProject(data[0]);
                        }
                        _this.notify();
                    }
                    observer.next(data);
                }, function (err) {
                    observer.error(err);
                });
            }
            else {
                _this.http.get(_this.AppSettings.API_ENDPOINT + 'webproject').map(function (data) { return data; })
                    .subscribe(function (data) {
                    if (data.length > 0 && _this.actualProject.id === '') {
                        _this.actualProject = data[0];
                        _this.notify();
                    }
                    observer.next(data);
                }, function (err) {
                    observer.error(err);
                });
            }
        });
    };
    WebProjectService.prototype.getWebProject = function (id, fill) {
        var _this = this;
        if (fill === void 0) { fill = false; }
        if (fill) {
            return this.http.get(this.AppSettings.API_ENDPOINT + 'webproject/' + id)
                .map(function (data) { return data; })
                .flatMap(function (project) {
                return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].forkJoin(project.environments.map(function (env) {
                    return _this.envServ.getEnvironment(env.id);
                })).map(function (environmnts) {
                    project.environments = environmnts;
                    return project;
                });
            });
        }
        else {
            return this.http.get(this.AppSettings.API_ENDPOINT + 'webproject/' + id).map(function (data) { return data; });
        }
    };
    WebProjectService.prototype.postWebProject = function (project) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.post(_this.AppSettings.API_ENDPOINT + 'webproject', project, { responseType: 'json' })
                .subscribe(function (data) {
                _this.notify();
                observer.next(data);
            }, function (err) {
                observer.error(err);
            });
        });
    };
    WebProjectService.prototype.updateWebProject = function (project) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.put(_this.AppSettings.API_ENDPOINT + 'webproject/' + project.id, project, { responseType: 'json' })
                .subscribe(function (data) {
                _this.notify();
                observer.next(data);
            }, function (err) {
                observer.error(err);
            });
        });
    };
    WebProjectService.prototype.deleteWebProject = function (project) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.http.delete(_this.AppSettings.API_ENDPOINT + 'webproject/' + project.id, { responseType: 'json' })
                .subscribe(function (data) {
                _this.notify();
                observer.next(data);
            }, function (err) {
                observer.error(err);
            });
        });
    };
    /**
     * Get notified when a object is deleted, update or created.
     * Dont use it in @Input Components
     */
    WebProjectService.prototype.subscribeToWebProjects = function () {
        return this.pullerObserver;
    };
    WebProjectService.prototype.getActualProject = function () {
        return this.actualProject;
    };
    WebProjectService.prototype.setActualProject = function (proj) {
        if (this.actualProject.id !== proj.id) {
            this.actualProject = proj;
            localStorage.setItem('actual_project', proj.name);
            this.notify();
        }
    };
    /**
     * Use internally
     */
    WebProjectService.prototype.notify = function () {
        try {
            this.subscriber.next(true);
        }
        catch (err) { }
    };
    WebProjectService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__app_settings_service__["a" /* AppSettingsService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_7__alert_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_8__environment_environment_service__["a" /* EnvironmentService */]])
    ], WebProjectService);
    return WebProjectService;
}());



/***/ }),

/***/ "./src/app/web-project/web-project.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebProject; });
var WebProject = /** @class */ (function () {
    function WebProject() {
        /**
         * Identification of the project in the db
         */
        this.id = "";
        /**
         * Name of the project
         */
        this.name = "";
        /**
         * Description of the project
         */
        this.description = "";
        /**
         * Web environments for scanning. Save array of database IDs or array of environments
         */
        this.environments = [];
        /**
         * This project is active to perform scans
         */
        this.status = 0;
        /**
         * Name of the project_manager, obtained from a DB JOIN
         */
        this.project_manager_name = "";
        /**
         * List of system dependencies
         */
        this.system = [];
        /**
         * List of platform, libraries, programming lenguages...
         */
        this.platform = [];
    }
    return WebProject;
}());



/***/ }),

/***/ "./src/app/web-ward-console/web-ward-console.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/web-ward-console/web-ward-console.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <textarea #consoleHistory [scrollTop]=\"consoleHistory.scrollHeight\" class=\"form-control\" rows=\"20\" name=\"console\" [(ngModel)]=\"commandHistory\"></textarea>\n</div>\n<div class=\"row\">\n  <input type=\"text\" list=\"consoleList\" autocomplete=\"off\" class=\"col-10 form-control\" (keyup.enter)=\"send()\" name=\"name\" id=\"consoleInput\" placeholder=\"command\" [(ngModel)]=\"actualCommand\">\n  <datalist id=\"consoleList\">\n\n      <option *ngFor=\"let com of lastCommands\" [ngValue]=\"com\" value=\"{{com}}\">\n\n    </datalist>\n  <button type=\"submit\" class=\"col-2 btn btn-principal\" (click)=\"send()\">Send</button>\n\n</div>"

/***/ }),

/***/ "./src/app/web-ward-console/web-ward-console.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebWardConsoleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__ = __webpack_require__("./src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WebWardConsoleComponent = /** @class */ (function () {
    function WebWardConsoleComponent(AppSettings, auth, http, alertService) {
        this.AppSettings = AppSettings;
        this.auth = auth;
        this.http = http;
        this.alertService = alertService;
        this.actualCommand = "";
        this.lastCommands = [];
        this.commandHistory = "";
    }
    WebWardConsoleComponent.prototype.ngOnInit = function () {
    };
    WebWardConsoleComponent.prototype.send = function () {
        var _this = this;
        if (this.actualCommand !== "") {
            this.lastCommands.push(this.actualCommand);
            this.http.post(this.AppSettings.API_ENDPOINT + 'console', { 'command': this.actualCommand }, { responseType: 'text' }).pipe().subscribe(function (data) {
                console.log(data);
                _this.commandHistory = _this.commandHistory + data + "\n";
                _this.actualCommand = "";
            });
        }
    };
    WebWardConsoleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-web-ward-console',
            template: __webpack_require__("./src/app/web-ward-console/web-ward-console.component.html"),
            styles: [__webpack_require__("./src/app/web-ward-console/web-ward-console.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__app_settings_service__["a" /* AppSettingsService */],
            __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__alert_alert_service__["a" /* AlertService */]])
    ], WebWardConsoleComponent);
    return WebWardConsoleComponent;
}());



/***/ }),

/***/ "./src/app/webhook/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__webhook__ = __webpack_require__("./src/app/webhook/webhook.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webhook_component__ = __webpack_require__("./src/app/webhook/webhook.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__webhook_service__ = __webpack_require__("./src/app/webhook/webhook.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__webhook_new_webhook_new_component__ = __webpack_require__("./src/app/webhook/webhook-new/webhook-new.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__webhook__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__webhook_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__webhook_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__webhook_new_webhook_new_component__["a"]; });







/***/ }),

/***/ "./src/app/webhook/webhook-new/webhook-new.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/webhook/webhook-new/webhook-new.component.html":
/***/ (function(module, exports) {

module.exports = "<form>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      <!--HEADER -->\n      <div class=\"form-group\">\n        <label for=\"userName\">WebHook Name</label>\n        <input type=\"text\" class=\"form-control\" name=\"name\" id=\"hookName\" placeholder=\"WebHookName\" [(ngModel)]=\"_hook.name\">\n      </div>\n    </div>\n    <div class=\"card-body\">\n      <div class=\"input-group mb-3\">\n        <select class=\"custom-select\" name=\"selectPipe\" id=\"selectedPipe\" type=\"string\" [ngModel]=\"selectedPipe\" (ngModelChange)=\"selectPipe($event)\">\n          <option *ngFor=\"let pipe of pipes\" [attr.value]=\"pipe\" [selected]=\"selectedPipe.id===pipe.id\">{{pipe.name}}</option>\n        </select>\n        <select class=\"custom-select\" name=\"node\" id=\"selectNode\" [(ngModel)]=\"_hook.node\" type=\"string\">\n          <option *ngFor=\"let node of nodes\" [attr.value]=\"node.id\" [selected]=\"_hook.node===node.id\">{{node.type}}::{{node.name}}</option>\n        </select>\n      </div>\n      <div class=\"btn-group\">\n        <button type=\"submit\" class=\"btn btn-primary\" (click)=\"create()\">Create</button>\n        <button type=\"submit\" class=\"btn btn-secondary\" (click)=\"cancel()\">Cancel</button>\n      </div>\n    </div>\n  </div>\n</form>"

/***/ }),

/***/ "./src/app/webhook/webhook-new/webhook-new.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebhookNewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webhook__ = __webpack_require__("./src/app/webhook/webhook.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__webhook_service__ = __webpack_require__("./src/app/webhook/webhook.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pipeline_pipeline_service__ = __webpack_require__("./src/app/pipeline/pipeline.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WebhookNewComponent = /** @class */ (function () {
    function WebhookNewComponent(webhookService, alert, pipeService) {
        this.webhookService = webhookService;
        this.alert = alert;
        this.pipeService = pipeService;
    }
    Object.defineProperty(WebhookNewComponent.prototype, "hook", {
        get: function () {
            return this._hook;
        },
        set: function (value) {
            this._hook = value;
        },
        enumerable: true,
        configurable: true
    });
    WebhookNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pipeService.findPipelines().subscribe(function (pips) {
            _this.pipes = pips;
            if (pips.length > 0)
                _this.selectPipe(pips[0]);
        }, function (err) { });
    };
    WebhookNewComponent.prototype.selectPipe = function (pipe) {
        var _this = this;
        this.selectedPipe = pipe;
        this.pipeService.getNodesForPipeline(pipe).subscribe(function (nodes) {
            _this.nodes = nodes;
        }, function (err) {
        });
    };
    WebhookNewComponent.prototype.cancel = function () {
        this._hook = null;
    };
    WebhookNewComponent.prototype.create = function () {
        var _this = this;
        this.webhookService.createWebHook(this.hook).subscribe(function (data) {
            _this.alert.success("WebHook Saved");
        }, function (err) {
            _this.alert.error("Cannot save Webhook");
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__webhook__["a" /* WebHook */]),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__webhook__["a" /* WebHook */]])
    ], WebhookNewComponent.prototype, "hook", null);
    WebhookNewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'webhook-new',
            template: __webpack_require__("./src/app/webhook/webhook-new/webhook-new.component.html"),
            styles: [__webpack_require__("./src/app/webhook/webhook-new/webhook-new.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__webhook_service__["a" /* WebhookService */],
            __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_4__pipeline_pipeline_service__["a" /* PipelineService */]])
    ], WebhookNewComponent);
    return WebhookNewComponent;
}());



/***/ }),

/***/ "./src/app/webhook/webhook.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/webhook/webhook.component.html":
/***/ (function(module, exports) {

module.exports = "<div class='container'>\n  <div class=\"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom\">\n    <h4>Web Hooks</h4>\n    <div class=\"btn-toolbar mb-2 mb-md-0\">\n      <div class=\"btn-group mr-2\">\n        <div>\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"newHook()\">Create new WebHook</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"tempHook\" class=\"row\">\n    <div class=\"col-sm-12 col-xl-12\">\n      <webhook-new [hook]=\"tempHook\"></webhook-new>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <div class=\"list-group\">\n        <select class=\"custom-select\" name=\"selectedHook\" id=\"selectedHook\" [ngModel]=\"selectedHook\" (ngModelChange)=\"onSelect($event)\">\n          <option *ngFor=\"let hook of hooks\" [attr.value]=\"hook\" [selected]=\"selectedHook.id===hook.id\">{{hook.name}}</option>\n        </select>\n      </div>\n      <hr/>\n      <div *ngIf=\"selectedHook\" class=\"col-sm-12\">\n        <a href=\"/api/webhook/{{selectedHook.id}}\" target=\"_blank\">Activate Hook</a>\n        {{selectedHook.id}}\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/webhook/webhook.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebhookComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webhook__ = __webpack_require__("./src/app/webhook/webhook.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__webhook_service__ = __webpack_require__("./src/app/webhook/webhook.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WebhookComponent = /** @class */ (function () {
    function WebhookComponent(webhookService) {
        this.webhookService = webhookService;
        this.hooks = [];
        this.selectedHook = new __WEBPACK_IMPORTED_MODULE_1__webhook__["a" /* WebHook */]();
        this.tempHook = null;
    }
    WebhookComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.webhookService.subscribeToWebHooks().subscribe(function (data) {
            _this.fetchWebHooks();
        }, function (err) { });
        this.fetchWebHooks();
    };
    WebhookComponent.prototype.newHook = function () {
        this.tempHook = new __WEBPACK_IMPORTED_MODULE_1__webhook__["a" /* WebHook */]();
    };
    WebhookComponent.prototype.onSelect = function (webhook) {
        this.selectedHook = webhook;
    };
    WebhookComponent.prototype.fetchWebHooks = function () {
        var _this = this;
        console.log("Fetching");
        this.webhookService.getWebHooks().subscribe(function (webhooks) {
            _this.hooks = webhooks;
            if (webhooks.length > 0)
                _this.selectedHook = webhooks[0];
            else
                _this.selectedHook = null;
        }, function (err) {
            _this.hooks = [];
            _this.selectedHook = null;
        });
    };
    WebhookComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'webhook',
            template: __webpack_require__("./src/app/webhook/webhook.component.html"),
            styles: [__webpack_require__("./src/app/webhook/webhook.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__webhook_service__["a" /* WebhookService */]])
    ], WebhookComponent);
    return WebhookComponent;
}());



/***/ }),

/***/ "./src/app/webhook/webhook.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebhookService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__web_project_index__ = __webpack_require__("./src/app/web-project/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var WebhookService = /** @class */ (function () {
    function WebhookService(AppSettings, http, webProjServ) {
        var _this = this;
        this.AppSettings = AppSettings;
        this.http = http;
        this.webProjServ = webProjServ;
        this.pullerObserver = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.subscriber = observer;
        });
        this.webProjServ.subscribeToWebProjects().subscribe(function (data) {
            _this.notify();
        }, function (err) { });
    }
    WebhookService.prototype.getWebHooks = function () {
        var webProjID = this.webProjServ.getActualProject().id;
        return this.http.get(this.AppSettings.API_ENDPOINT + 'webhook' + (webProjID ? "?web_project=" + webProjID : "")).map(function (data) { return data; });
    };
    WebhookService.prototype.activateWebHook = function (webhook) {
        return this.http.get(this.AppSettings.API_ENDPOINT + 'webhook/' + webhook.id);
    };
    WebhookService.prototype.deleteWebHook = function (webhook) {
        return this.http.delete(this.AppSettings.API_ENDPOINT + 'webhook/' + webhook.id);
    };
    WebhookService.prototype.createWebHook = function (webhook) {
        return this.http.post(this.AppSettings.API_ENDPOINT + 'webhook', webhook, { responseType: 'json' });
    };
    WebhookService.prototype.getWebHookForNode = function (node) {
        return this.http.get(this.AppSettings.API_ENDPOINT + 'webhook/node/' + node.id, { responseType: 'json' }).map(function (data) { return data; });
    };
    WebhookService.prototype.updateWebHook = function (webhook) {
        return this.http.put(this.AppSettings.API_ENDPOINT + 'webhook/' + webhook.id, webhook, { responseType: 'json' });
    };
    WebhookService.prototype.subscribeToWebHooks = function () {
        return this.pullerObserver;
    };
    WebhookService.prototype.notify = function () {
        try {
            this.subscriber.next(true);
        }
        catch (err) { }
    };
    WebhookService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__app_settings_service__["a" /* AppSettingsService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_5__web_project_index__["f" /* WebProjectService */]])
    ], WebhookService);
    return WebhookService;
}());



/***/ }),

/***/ "./src/app/webhook/webhook.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebHook; });
var WebHook = /** @class */ (function () {
    function WebHook() {
        this.name = "";
        this.id = "";
        this.node = "";
        this.nodename = "";
    }
    return WebHook;
}());



/***/ }),

/***/ "./src/app/wwmodules/edit-module/edit-module.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/wwmodules/edit-module/edit-module.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #content let-c=\"close\" let-d=\"dismiss\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"deleteModalLabel\">Are you sure?</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"c('Close click')\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        Do you want to delet the module\"{{mod.name}}\"?\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"d('Close click')\">Cancel</button>\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"sureDelete();c('Close click');\">Remove</button>\n      </div>\n    </div>\n  </div>\n</ng-template>\n<div *ngIf=\"mod\">\n  <form>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <!--HEADER -->\n\n        <div class=\"form-group\">\n          <label for=\"checkName\">Mod TAG</label>\n          <input type=\"text\" class=\"form-control\" name=\"name\" id=\"modName\" placeholder=\"Module Name\" [(ngModel)]=\"mod.name\">\n        </div>\n      </div>\n      <div class=\"card-body\">\n        <div class=\"form-group\">\n          <label for=\"description\">Origin</label>\n          <input type=\"text\" class=\"form-control\" name=\"origin\" id=\"origin\" placeholder=\"http://.../...mod.zip\" [(ngModel)]=\"mod.origin\">\n        </div>\n        <div class=\"form-group\">\n            <dl class=\"row\" >\n                <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Lista de librerias que necesita este modulo\">Libraries: </dt>\n                <dd *ngFor=\"let lib of mod.libraries\" class=\"col-sm-7\">\n                  <a>{{lib}}</a>\n                </dd>\n              </dl>\n        </div>\n        <div class=\"form-group\">\n            <dl class=\"row\" >\n                <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Lista de librerias NODEJS que necesita este modulo\">Requires: </dt>\n                <dd *ngFor=\"let lib of mod.requires\" class=\"col-sm-7\">\n                  <a>{{lib}}</a>\n                </dd>\n              </dl>\n        </div>\n        <div class=\"btn-group\">\n          <button type=\"submit\" class=\"btn btn-primary\" (click)=\"edit()\">Edit</button>\n          <button type=\"submit\" class=\"btn btn-secondary\" (click)=\"cancel()\">Cancel</button>\n          <button type=\"submit\" class=\"btn btn-danger\" data-toggle=\"modal\" data-target=\"#deleteModal\" (click)=\"deleteModal(content)\">Remove</button>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>"

/***/ }),

/***/ "./src/app/wwmodules/edit-module/edit-module.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditModuleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wwmodule__ = __webpack_require__("./src/app/wwmodules/wwmodule.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wwmodules_service__ = __webpack_require__("./src/app/wwmodules/wwmodules.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EditModuleComponent = /** @class */ (function () {
    function EditModuleComponent(alert, modalService, activeModal, wwmodService) {
        this.alert = alert;
        this.modalService = modalService;
        this.activeModal = activeModal;
        this.wwmodService = wwmodService;
    }
    EditModuleComponent.prototype.ngOnInit = function () {
    };
    EditModuleComponent.prototype.cancel = function () {
        this.mod = null;
    };
    EditModuleComponent.prototype.sureDelete = function () {
        var _this = this;
        this.activeModal.close('Close click');
        this.wwmodService.deleteWWModules(this.mod).subscribe(function (data) {
            _this.alert.success("Deleted");
            _this.mod = null;
        }, function (err) {
            _this.alert.error('message' in err.error ? err.error.message : "Cannot delete Module");
        });
    };
    EditModuleComponent.prototype.deleteModal = function (content) {
        this.modalService.open(content).result.then(function (result) {
        }, function (reason) {
        }).catch(function (err) {
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__wwmodule__["a" /* WebWardModule */])
    ], EditModuleComponent.prototype, "mod", void 0);
    EditModuleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'edit-module',
            template: __webpack_require__("./src/app/wwmodules/edit-module/edit-module.component.html"),
            styles: [__webpack_require__("./src/app/wwmodules/edit-module/edit-module.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__alert_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["a" /* NgbActiveModal */],
            __WEBPACK_IMPORTED_MODULE_2__wwmodules_service__["a" /* WwmodulesService */]])
    ], EditModuleComponent);
    return EditModuleComponent;
}());



/***/ }),

/***/ "./src/app/wwmodules/new-module/new-module.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/wwmodules/new-module/new-module.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"mod\">\n  <form>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <!--HEADER -->\n\n        <div class=\"form-group\">\n          <label for=\"checkName\">Mod TAG</label>\n          <input type=\"text\" class=\"form-control\" name=\"name\" id=\"modName\" placeholder=\"Module Name\" [(ngModel)]=\"mod.name\">\n        </div>\n      </div>\n      <div class=\"card-body\">\n        <div class=\"form-group\">\n          <label for=\"description\">Origin</label>\n          <input type=\"text\" class=\"form-control\" name=\"origin\" id=\"origin\" placeholder=\"http://.../...mod.zip\" [(ngModel)]=\"mod.origin\">\n        </div>\n        <div class=\"form-group\">\n          <dl class=\"row\">\n            <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Lista de librerias que necesita este modulo\">Libraries: </dt>\n            <dd *ngFor=\"let lib of mod.libraries\" class=\"col-sm-7\">\n              <a>{{lib}}</a>\n            </dd>\n          </dl>\n        </div>\n        <div class=\"form-group\">\n          <dl class=\"row\">\n            <dt class=\"col-sm-5\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Lista de librerias NODEJS que necesita este modulo\">Requires: </dt>\n            <dd *ngFor=\"let lib of mod.requires\" class=\"col-sm-7\">\n              <a>{{lib}}</a>\n            </dd>\n          </dl>\n        </div>\n        <div class=\"btn-group\">\n          <button type=\"submit\" class=\"btn btn-primary\" (click)=\"save()\">Save</button>\n          <button type=\"submit\" class=\"btn btn-secondary\" (click)=\"validate()\">Validate</button>\n          <button type=\"submit\" class=\"btn btn-secondary\" (click)=\"cancel()\">Cancel</button>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>"

/***/ }),

/***/ "./src/app/wwmodules/new-module/new-module.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewModuleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wwmodule__ = __webpack_require__("./src/app/wwmodules/wwmodule.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wwmodules_service__ = __webpack_require__("./src/app/wwmodules/wwmodules.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_alert_service__ = __webpack_require__("./src/app/alert/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NewModuleComponent = /** @class */ (function () {
    function NewModuleComponent(alert, wwmodService) {
        this.alert = alert;
        this.wwmodService = wwmodService;
        this.isValid = false;
    }
    NewModuleComponent.prototype.ngOnInit = function () {
    };
    NewModuleComponent.prototype.validate = function () {
        var _this = this;
        this.wwmodService.checkWWModule(this.mod).subscribe(function (data) {
            _this.alert.success("Valid Module");
            _this.mod = data;
            _this.isValid = true;
        }, function (err) {
            _this.isValid = false;
            _this.alert.error('message' in err.error ? err.error.message : "No valid module");
        });
    };
    NewModuleComponent.prototype.save = function () {
        var _this = this;
        this.validate();
        if (this.isValid) {
            this.wwmodService.createWWModules(this.mod).subscribe(function (data) {
                _this.alert.success("Module " + _this.mod.name + " imported");
                _this.mod = null;
                _this.isValid = false;
            }, function (err) {
                _this.isValid = false;
                _this.alert.error('message' in err.error ? err.error.message : "Cannot import module");
            });
        }
        else {
            this.alert.info("Module needs to be validated first");
        }
    };
    NewModuleComponent.prototype.cancel = function () {
        this.mod = null;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__wwmodule__["a" /* WebWardModule */])
    ], NewModuleComponent.prototype, "mod", void 0);
    NewModuleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'new-module',
            template: __webpack_require__("./src/app/wwmodules/new-module/new-module.component.html"),
            styles: [__webpack_require__("./src/app/wwmodules/new-module/new-module.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__alert_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_2__wwmodules_service__["a" /* WwmodulesService */]])
    ], NewModuleComponent);
    return NewModuleComponent;
}());



/***/ }),

/***/ "./src/app/wwmodules/wwmodule.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebWardModule; });
var WebWardModule = /** @class */ (function () {
    function WebWardModule() {
        this.requires = [];
        this.libraries = [];
    }
    return WebWardModule;
}());



/***/ }),

/***/ "./src/app/wwmodules/wwmodules.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/wwmodules/wwmodules.component.html":
/***/ (function(module, exports) {

module.exports = "<div class='container'>\n  <div class=\"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom\">\n    <h4>List of Web Ward Modules</h4>\n    <div class=\"btn-toolbar mb-2 mb-md-0\">\n      <div class=\"btn-group mr-2\">\n        <div>\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"newModule()\">Import Module</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"tempModule\" class=\"row\">\n    <div class=\"col-sm-12 col-xl-12\">\n      <new-module [mod]=\"tempModule\"></new-module>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-12 col-md-6\">\n      <div class=\"list-group\">\n        <a *ngFor=\"let mod of moduleList\" [class.active]=\"mod === selectedMod\" (click)=\"onSelect(mod)\" class=\"list-group-item\">\n          <span>{{mod.name}}</span>\n        </a>\n      </div>\n      <hr/>\n    </div>\n    <div class=\"col-sm-12 col-md-6\">\n      <edit-module [mod]=\"selectedMod\"></edit-module>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/wwmodules/wwmodules.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WwmodulesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wwmodule__ = __webpack_require__("./src/app/wwmodules/wwmodule.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wwmodules_service__ = __webpack_require__("./src/app/wwmodules/wwmodules.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WwmodulesComponent = /** @class */ (function () {
    function WwmodulesComponent(wwmodService) {
        this.wwmodService = wwmodService;
        this.selectedMod = null;
        this.tempModule = null;
    }
    WwmodulesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchData();
        this.wwmodService.subscribeToWWModules().subscribe(function () {
            _this.fetchData();
        }, function (err) { });
    };
    WwmodulesComponent.prototype.onSelect = function (mod) {
        this.selectedMod = mod;
    };
    WwmodulesComponent.prototype.newModule = function () {
        this.tempModule = new __WEBPACK_IMPORTED_MODULE_1__wwmodule__["a" /* WebWardModule */]();
    };
    WwmodulesComponent.prototype.fetchData = function () {
        var _this = this;
        this.wwmodService.getWWModules().subscribe(function (mods) {
            _this.moduleList = mods;
            console.log(mods);
        }, function (err) {
        });
    };
    WwmodulesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-wwmodules',
            template: __webpack_require__("./src/app/wwmodules/wwmodules.component.html"),
            styles: [__webpack_require__("./src/app/wwmodules/wwmodules.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__wwmodules_service__["a" /* WwmodulesService */]])
    ], WwmodulesComponent);
    return WwmodulesComponent;
}());



/***/ }),

/***/ "./src/app/wwmodules/wwmodules.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WwmodulesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_settings_service__ = __webpack_require__("./src/app/app-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WwmodulesService = /** @class */ (function () {
    function WwmodulesService(AppSettings, http) {
        var _this = this;
        this.AppSettings = AppSettings;
        this.http = http;
        this.pullerObserver = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.subscriber = observer;
        });
    }
    WwmodulesService.prototype.getWWModules = function () {
        return this.http.get(this.AppSettings.API_ENDPOINT + 'ww-module').map(function (data) { return data; });
    };
    WwmodulesService.prototype.deleteWWModules = function (wwmd) {
        return this.http.delete(this.AppSettings.API_ENDPOINT + 'ww-module/' + wwmd.name);
    };
    WwmodulesService.prototype.createWWModules = function (wwmd) {
        return this.http.post(this.AppSettings.API_ENDPOINT + 'ww-module', wwmd, { responseType: 'json' });
    };
    WwmodulesService.prototype.checkWWModule = function (wwmd) {
        return this.http.post(this.AppSettings.API_ENDPOINT + 'ww-module/checkModule', wwmd, { responseType: 'json' }).map(function (data) { return data; });
    };
    WwmodulesService.prototype.subscribeToWWModules = function () {
        return this.pullerObserver;
    };
    WwmodulesService.prototype.notify = function () {
        try {
            this.subscriber.next(true);
        }
        catch (err) { }
    };
    WwmodulesService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__app_settings_service__["a" /* AppSettingsService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */]])
    ], WwmodulesService);
    return WwmodulesService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map