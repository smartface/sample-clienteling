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

//const Router = require("sf-core/ui/router");
const System = require("sf-core/device/system");
const isTablet = require("./lib/isTablet");

// const {
//     NativeRouter: Router,
//     Router: RouterBase,
//     NativeStackRouter: StackRouter,
//     BottomTabBarRouter,
//     Route
// } = require("@smartface/router");

const Router = require("@smartface/router/src/native/NativeRouter");
const StackRouter = require("@smartface/router/src/native/NativeStackRouter");
const BottomTabBarRouter = require("@smartface/router/src/native/BottomTabBarRouter");
const Route = require("@smartface/router/src/router/Route");


/*if (System.OS === "iOS") {
  Router.sliderDrawer = require("./sliderDrawer");
}

Router.add("pgDashboard", "pages/pgDashboard", true);
Router.add("pgSignupPhone", "pages/pgSignupPhone", true);
Router.add("pgSignupTablet", "pages/pgSignupTablet", true);
Router.add("pgMainLookbook", "pages/pgMainLookbook", true);
Router.add("pgLookbook", "pages/pgLookbook", true);
Router.add("pgWomen", "pages/pgWomen", true);
Router.add("pgCustomerProfile", "pages/pgCustomerProfile", true);
Router.add("pgShoppingBag", "pages/pgShoppingBag", true);
Router.go("pgSignup" + (isTablet ? "Tablet" : "Phone"), {
  appStart: true
});

if (System.OS === "Android") {
  Router.sliderDrawer = require("./sliderDrawer");
}*/

const router = Router.of({
    path: "/",
    //to: "/pages/pgDashboard",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/pages",
            //to: "/pages/pgDashboard",
            headerBarParams: () => { ios: { translucent: false } },
            routes: [
                Route.of({
                    path: "/pages/pgDashboard",
                    build: (router, route) => {
                        const { routeData, view } = route.getState();
                        let pgDashboard = require("./pages/pgDashboard");
                        return new pgDashboard(routeData, router);
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



isTablet ? router.push("/pages/pgSignupTablet", {appStart: true}) : router.push("/pages/pgSignupPhone", {appStart: true});
//const routerSuffix = isTablet ? 'pgSignupTablet' : 'pgSignupPhone';
//router.push(`/pages/${routerSuffix}`, { appStart: true });

// mcs.launch().then(() => {
//   console.log("mcs launch sucess");
// }).catch((err) => {
//   err = err ? JSON.stringify(err) : "unknown";
//   console.log(`mcs launch error! Reason: ${err}`);
// });
