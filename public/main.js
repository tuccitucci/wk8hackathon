angular.module('DARE', [])
    .controller('DareController', dareController);

dareController.$inject = ['$http'];

function dareController($http) {
    var dare = this;
    dare.greeting = 'Whats up Ho!';
    console.log("TEST 123");

    dare.getInfo = function() {
        $http.get("/api/characters")
            .then(function(res) {
                console.log("Show ", res.data);
                dare.newCharacter = res.data;
                $http.get("/api/tasks")
                    .then(function(res) {
                        console.log("Task: ", res.data);
                        dare.newTask = res.data;
                    })
                    .catch((err) => {
                        console.log("Get task failed: ", err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };
}
