app.controller("MainController", function ($scope, IOUFacade) {

    $scope.username = "...";
    $scope.sentNotes = [];

    refreshUsername();
    refreshNotes();

    function refreshUsername() {
        IOUFacade.getUsername().then(function (username) {
            $scope.username = username;
        });
    }
    
    function refreshNotes() {
        IOUFacade.getNotesSentByMe().then(function (notes) {
            $scope.sentNotes = notes;
        });
    }

    $scope.thankYou = function () {
        var recipient = $scope.recipient;
        IOUFacade.sendThankYouNoteTo(recipient).then(refreshNotes).then(clearRecipient);
    };

    function clearRecipient() {
        $scope.recipient = null;
    }
});