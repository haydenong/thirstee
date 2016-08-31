//UI ROUTES
(function () {
    angular
        .module("thirstee")
        .config(ThirsteeConfig);
    function ThirsteeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "/views/home.html",
                controller: "NavBarCtrl as ctrl"
            })
            .state("search", {
                url: "/search",
                templateUrl: "/views/protected/search.html",
                controller: "SearchCtrl as ctrl"
            })
            .state("results", {
                url: "/results",
                templateUrl: "/views/protected/results.html",
                controller: "ResultsCtrl as ctrl"
            })
            .state("verify", {
                url: "/verify",
                templateUrl: "/views/protected/verify.html",
                controller: "RegCtrl as ctrl"
            });

        $urlRouterProvider.otherwise("/home");
    }

    ThirsteeConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

})();
