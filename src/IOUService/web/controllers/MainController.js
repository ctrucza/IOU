app.controller("MainController", function ($scope) {
    $scope.counter = 1;

    $scope.increment = function () {
        $scope.counter++;
    };
});