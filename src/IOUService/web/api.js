var api = {
    load_current_user: function (callback) {
        $.ajax({
            url: "/api/IOU/GetCurrentUserName",
            type: "GET",
            success: function (result) {
                callback(result);
            }
        });
    },

    send_note: function (recipient, callback) {
        $.ajax({
            url: "/api/IOU/SendThankYouNoteTo",
            type: "GET",
            data: { recipient: recipient },
            success: function (result) {
                callback(result);
            }
        });
    },

    load_sent_notes: function (callback) {
        $.ajax({
            url: "/api/IOU/GetNotesSentByMe",
            type: "GET",
            success: function (result) {
                callback(result);
            }
        });
    },

    load_received_notes: function (callback) {
        $.ajax({
            url: "/api/IOU/GetMyNotes",
            type: "GET",
            success: function (result) {
                callback(result);
            }
        });
    }
}
