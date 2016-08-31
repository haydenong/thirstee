(function () {
    angular.module("thirstee")
        .controller("RegCtrl", RegCtrl);

    RegCtrl.$inject = ["Svc", "$state"];

    function RegCtrl(Svc, $state) {
        var vm = this;
        //STATUS CODE & MSG OBJECT
        vm.status = {
            message: "",
            code: 0
        };

        Svc.getUserProfile()
            .then(function (currentUser) {
                if (currentUser.dob){
                    $state.go("search");
                }
                vm.userProfile = currentUser;
                if(vm.userProfile.dob){
                    vm.userProfile.dob = new Date(vm.userProfile.dob).toLocaleDateString();
                }
            });

        vm.updateUser = function () {
            Svc.updateUser(vm.userProfile)
                .then(function (result) {
                    vm.status.message = "User account updated successfully";
                    vm.status.code = 202;
                    $state.go("loginsuccess");
                }).catch(function (err) {
                console.log("UPDATE USER ERROR>>"+err);
                vm.status.message = "An error occurred while updating user account";
                vm.status.code = 400;
            })
        };

        //FUNCTION FOR CREATING NEW USER ACCOUNTS
        // vm.createUser = function () {
        //     Svc.createUser(vm.user)
        //         .then(function (result) {
        //             console.log(result);
        //             vm.status.message = "User account created successfully";
        //             vm.status.code = 202;
        //             $state.go("regsuccess");
        //         }).catch(function (err) {
        //         console.log(err);
        //         vm.status.message = "An error occurred while creating user account";
        //         vm.status.code = 400;
        //     })
        // };




    }

})();

