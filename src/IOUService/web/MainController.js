app.controller("MainController", function ($scope, IOUFacade) {

    $scope.username = "...";
    $scope.sentNotes = [];
    $scope.receivedNotes = [];

    refreshUsername();
    refreshSentNotes();
    refreshReceivedNotes();

    function refreshUsername() {
        IOUFacade.getUsername().then(function (username) {
            $scope.username = username;
        });
    }
    
    function refreshSentNotes() {
        IOUFacade.getNotesSentByMe().then(function (notes) {
            $scope.sentNotes = notes;
        });
    }

    $scope.thankYou = function () {
        var recipient = $scope.recipient;
        IOUFacade.sendThankYouNote(recipient).then(refreshSentNotes).then(clearRecipient);
    };

    function clearRecipient() {
        $scope.recipient = null;
    }

    $scope.refreshReceivedNotes = refreshReceivedNotes;

    function refreshReceivedNotes() {
        IOUFacade.getMyNotes().then(function (notes) {
            $scope.receivedNotes = notes;
        });
    }
});