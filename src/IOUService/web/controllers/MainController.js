app.controller("MainController", function ($scope) {
    $scope.username = "Somebody";

    $scope.sentNotes = [
        { text: "Thanks, test1", date: new Date() },
        { text: "Thanks, test2", date: new Date() },
        { text: "Thanks, test3", date: new Date() },
        { text: "Thanks, test4", date: new Date() },
        { text: "Thanks, test5", date: new Date() }
    ];

    $scope.thankYou = function () {
        var text = "Thank you, " + $scope.recipient;
        var note = { text: text, date: new Date() };
        $scope.sentNotes.unshift(note);
    };
});