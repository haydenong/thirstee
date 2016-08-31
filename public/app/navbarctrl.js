(function () {
    angular.module("thirstee")
        .controller("NavBarCtrl", NavBarCtrl);

    NavBarCtrl.$inject = ["Svc", "$state"];

    function NavBarCtrl(Svc, $state) {
        var vm = this;

        //This will hide the DIV by default.
        vm.IsVisible = false;
        vm.ShowHide = function () {
            //If DIV is visible it will be hidden and vice versa.
            vm.IsVisible = vm.IsVisible ? false : true;
        };

        Svc.getUserProfile()
            .then(function (currentUser) {
                console.log("SERVICE LOADED");
                vm.userProfile = currentUser;
                console.log("CURRENT USER in ctrl"+ JSON.stringify(vm.userProfile));
                vm.isLoggedIn = Svc.isLoggedIn;
                console.log("ISLOGGED IN"+ vm.isLoggedIn);
            });

        // vm.loginUser = Svc.loginUserObj();
        // vm.login = function () {
        //     Svc.login(vm.loginUser)
        //         .then(function (result) {
        //             console.log(result);
        //             vm.status.message = "User login successfully";
        //             vm.status.code = 202;
        //             $state.go("loginsuccess");
        //         }).catch(function (err) {
        //         console.log(err);
        //         vm.status.message = "An error occurred while logging in";
        //         vm.status.code = 400;
        //     })
        // };


    }
})();
