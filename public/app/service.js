(function () {
    angular.module("thirstee")
        .service("Svc", Svc);

    Svc.$inject = ["$http", "$q","$state"];

    function Svc($http, $q, $state) {
        var self = this;
        self.currentUser = "";
        self.isLoggedIn = false;

        //PUT METHOD FOR UPDATING USER PROFILE
        self.updateUser = function (userProfile) {
            var defer = $q.defer();
            $http.put("/api/users/:id", userProfile)
                .then(function (result) {
                    defer.resolve(result);
                }).catch(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        };

        //RETRIEVE USER PROFILE
        self.getUserProfile = function () {
            var defer = $q.defer();
            if (self.currentUser) {
                self.isLoggedIn = true;
                defer.resolve(self.currentUser);
            } else {
                $http.get("/api/user")
                    .then(function (result) {
                        self.currentUser = result.data;
                        if (self.currentUser) {
                            // console.log("CURRENT USER in service" + self.currentUser);
                            self.isLoggedIn = true;
                        }
                        defer.resolve(self.currentUser);
                    }).catch(function (err) {
                    defer.reject(err);
                });
            }
            return defer.promise;
        };

        //GET METHOD FOR SEARCH
        self.search = function (search) {
            var defer = $q.defer();
            $http.get("/api/vendors/search", {params: search})
                .then(function (result) {
                    console.log("SEARCH SUCCESS SVC SIDE>>"+result);
                    self.searchResults = result.data;
                    defer.resolve(result);
                }).catch(function (err) {
                console.log("SEARCH ERR SVC SIDE>>" + JSON.stringify(err));
            });

            return defer.promise;
        };


        //POST METHOD FOR CREATING NEW USERS
        // self.createUser = function (user) {
        //     var defer = $q.defer();
        //     $http.post("/user/create", user)
        //         .then(function (result) {
        //             defer.resolve(result);
        //         })
        //         .catch(function (err) {
        //             defer.reject(err);
        //         });
        //     return defer.promise;
        // };

        //POST METHOD FOR LOGGING IN
        // self.login = function (loginUser) {
        //     var defer = $q.defer();
        //     $http.post("/login", loginUser)
        //         .then(function (result) {
        //             // console.log("LOGIN SUCCESS!!!!!");
        //             defer.resolve(result);
        //         })
        //         .catch(function (err) {
        //             defer.reject(err);
        //         });
        //     return defer.promise;
        // };

        //USER FACTORY
        // self.userObj = function () {
        //     var user = {};
        //     user.username = "";
        //     user.password = "";
        //     user.firstName = "";
        //     user.lastName = "";
        //     user.email = "";
        //     user.dob = "";
        //     return user;
        // };

        //LOGIN USER FACTORY
        // self.loginUserObj = function () {
        //     var loginUser = {};
        //     loginUser.username = "";
        //     loginUser.password = "";
        // };
    }

})();
