var api = {
    delegate: undefined,
    
    load_current_user: function () {
        http.get("/api/IOU/GetCurrentUserName", api.delegate.on_current_user_loaded);
    },

    load_sent_notes: function () {
        http.get("/api/IOU/GetNotesSentByMe", api.delegate.on_sent_notes_loaded);
    },

    load_received_notes: function () {
        http.get("/api/IOU/GetMyNotes", api.delegate.on_received_notes_loaded);
    },

    send_note: function (recipient) {
        http.get("/api/IOU/SendThankYouNoteTo", api.delegate.on_note_sent, { recipient: recipient });
    }
};

var http = {
    get: function (url, callback, data) {
        $.ajax({
            url: url,
            type: "GET",
            data: data,
            success: callback
        });

    }
}