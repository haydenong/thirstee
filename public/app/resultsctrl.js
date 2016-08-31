(function () {
    angular.module("thirstee")
        .controller("ResultsCtrl", ResultsCtrl);

    ResultsCtrl.$inject = ["Svc"];

    function ResultsCtrl(Svc) {
        var vm = this;

        //STATUS CODE & MSG OBJECT
        vm.status = {
            message: "",
            code: 0
        };

        vm.searchResults = Svc.searchResults;
        console.log("SEARCH RESULTSCTRL" + vm.searchResults);


    }

})();


