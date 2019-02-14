/* globals lang */
const Application = require("sf-core/application");
Application.onUnhandledError = function(e) {
    const error = {
        title: lang.applicationError,
        message: e.message + "\n\n*" + e.sourceURL + "\n*" + e.line + "\n*" + e.stack
    };

    alert(error);
    console.log(`error`);
    console.log(error);
};

require("i18n/i18n.js");
require("sf-extension-utils");
require("./context/pageContext");
require("./theme");

const isTablet = require("./lib/isTablet");
const Router = require("@smartface/router/src/native/NativeRouter");
const StackRouter = require("@smartface/router/src/native/NativeStackRouter");
const Route = require("@smartface/router/src/router/Route");
const sliderDrawerWrapper = require('./sliderdrawerwrapper');


const router = Router.of({
    path: "/",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/pages",
            headerBarParams: () => { ios: { translucent: false } },
            routes: [
                Route.of({
                    path: "/pages/pgDashboard",
                    routeDidEnter: (router, route) => {
                        sliderDrawerWrapper.enabled = true;
                        sliderDrawerWrapper.hide();
                    },
                    routeDidExit: (router, route) => {},
                    build: (router, route) => {
                        const { routeData, view } = route.getState();
                        let pgDashboard = require("./pages/pgDashboard");
                        return new pgDashboard(routeData, router, sliderDrawerWrapper);
                    }
                }),
                Route.of({
                    path: "/pages/pgSignupPhone",
                    build: (router, route) => {
                        const { routeData, view } = route.getState();
                        let pgSignupPhone = require("./pages/pgSignupPhone");
                        return new pgSignupPhone(routeData, router);
                    }
                }),
                Route.of({
                    path: "/pages/pgSignupTablet",
                    build: (router, route) => {
                        const { routeData, view } = route.getState();
                        let pgSignupTablet = require("./pages/pgSignupTablet");
                        return new pgSignupTablet(routeData, router);
                    }
                }),
                Route.of({
                    path: "/pages/pgMainLookbook",
                    build: (router, route) => {
                        const { routeData, view } = route.getState();
                        let pgMainLookbook = require("./pages/pgMainLookbook");
                        return new pgMainLookbook(routeData, router);
                    }
                }),
                Route.of({
                    path: "/pages/pgLookbook",
                    build: (router, route) => {
                        const { routeData, view } = route.getState();
                        let pgLookbook = require("./pages/pgLookbook");
                        return new pgLookbook(routeData, router);
                    }
                }),
                Route.of({
                    path: "/pages/pgWomen",
                    build: (router, route) => {
                        const { routeData, view } = route.getState();
                        let pgWomen = require("./pages/pgWomen");
                        return new pgWomen(routeData, router);
                    }
                }),
                Route.of({
                    path: "/pages/pgCustomerProfile",
                    build: (router, route) => {
                        const { routeData, view } = route.getState();
                        let pgCustomerProfile = require("./pages/pgCustomerProfile");
                        return new pgCustomerProfile(routeData, router);
                    }
                }),
                Route.of({
                    path: "/pages/pgShoppingBag",
                    build: (router, route) => {
                        const { routeData, view } = route.getState();
                        let pgShoppingBag = require("./pages/pgShoppingBag");
                        return new pgShoppingBag(routeData, router);
                    }
                })
            ]
        })
    ]
});

const routerSuffix = isTablet ? 'pgSignupTablet' : 'pgSignupPhone';
router.push(`/pages/${routerSuffix}`, { appStart: true });

//isTablet ? router.push("/pages/pgSignupTablet", {appStart: true}) : router.push("/pages/pgSignupPhone", {appStart: true});
// mcs.launch().then(() => {
//   console.log("mcs launch sucess");
// }).catch((err) => {
//   err = err ? JSON.stringify(err) : "unknown";
//   console.log(`mcs launch error! Reason: ${err}`);
// });
