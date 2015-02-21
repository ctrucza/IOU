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
            var data = { recipient: recipient };
            return $http.post("/api/iou/SendThankYouNoteTo", data);
        },

        getMyNotes : function() {
            return $http.get("/api/iou/GetMyNotes").then(function(response) {
                return response.data;
            });
        }
    };
});