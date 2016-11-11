angular.module('DARE', [])
    .controller('DareController', dareController);

dareController.$inject = ['$http'];

function dareController($http) {
    var dare = this;
    dare.greeting = 'Whats up Ho!';
    console.log("TEST");
    $http.get("/api/characters", (req, res) => {
      
    })
}
