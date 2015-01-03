
app.factory("history", function (response) {
    return {
        prev: [response.data],
        next: [],

        add: function (x) {
            this.prev.push(x);
            this.next = [];
            response.data = x;
        },

        goBack: function () {
            var a = this.prev.pop();
            this.next.push(a);
            response.data = this.getCurrent();
        },

        goForward: function () {
            var a = this.next.pop();
            this.prev.push(a);
            response.data = this.getCurrent();
        },

        getCurrent: function () {
            return this.prev[this.prev.length - 1];
        },

        clear :function() {
            this.prev = [{}];
            response.data = this.getCurrent();
        }
    };
});

app.controller("HistoryController", function ($scope, history) {
    $scope.history = history;

    $scope.goBack = function () {
        history.goBack();
    };

    $scope.goForward = function() {
        history.goForward();
    };
});
