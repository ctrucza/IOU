app.service("IOUFacade", function ($http) {
    return {
        getUsername : function() {
            return $http.get("/api/iou/GetCurrentUserName").then(function(response) {
                return response.data;
            });
        },

        getNotesSentByMe : function() {
            return $http.get("/api/iou/GetNotesSentByMe").then(function (response) {
                return response.data;
            });
        },

        sendThankYouNoteTo: function (recipient) {
            var params = { recipient: recipient };
            return $http.get("/api/iou/SendThankYouNoteTo", { params: params });
        }
    };
});