(function () {
    angular.module("thirstee")
        .controller("SearchCtrl", SearchCtrl);

    SearchCtrl.$inject = ["Svc", "$state"];

    function SearchCtrl(Svc, $state) {
        var vm = this;

        //STATUS CODE & MSG OBJECT
        vm.status = {
            message: "",
            code: 0
        };

        vm.searchBar = function () {
            Svc.search(vm.search)
                .then(function (result) {
                    console.log("RESULTS!");
                    $state.go("results");
                    vm.status.message="Search executed successfully";
                    vm.status.code = 202;
                }).catch(function (err) {
                console.log("SEARCH ERROR CTRL SIDE" + err);
                vm.status.message = "Err occured when searching";
                vm.status.code = 400;
            })
        }



    }

})();

