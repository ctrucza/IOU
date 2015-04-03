var real_http = {
    get: function (url, callback, data) {
        $.ajax({
            url: url,
            type: "GET",
            data: data,
            success: callback
        });

    }
}

var fake_http = {
    sent_notes: [],
    received_notes:[],
    get: function(url, callback, data) {
        if (url === "/api/IOU/GetCurrentUserName") {
            callback("John Doe");
        } else if (url === "/api/IOU/GetNotesSentByMe") {
            callback(fake_http.sent_notes);
        } else if (url === "/api/IOU/GetMyNotes") {
            callback(fake_http.received_notes);
        } else if (url === "/api/IOU/SendThankYouNoteTo") {
            fake_http.sent_notes.push({ Sender: "John Doe", Recipient: data.recipient, Text: "Thank you, Jane Doe! Sincerely, John Doe" });
            fake_http.received_notes.push({ Sender: data.recipient, Recipient: "John Doe", Text: "Thank you, John Doe! Sincerely, Jane Doe" });
            callback();
        }
    }
}

var http = fake_http;

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
