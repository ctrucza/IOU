function Http() {
    this.get = function (url, callback, data) {
        $.ajax({
            url: url,
            type: "GET",
            data: data,
            success: callback
        });
    } 
};

function FakeHttp() {
    this.sent_notes = [];
    this.received_notes = [];
    this.get = function(url, callback, data) {
        if (url === "/api/IOU/GetCurrentUserName") {
            callback("John Doe");
        } else if (url === "/api/IOU/GetNotesSentByMe") {
            callback(this.sent_notes);
        } else if (url === "/api/IOU/GetMyNotes") {
            callback(this.received_notes);
        } else if (url === "/api/IOU/SendThankYouNoteTo") {
            this.sent_notes.push({ Sender: "John Doe", Recipient: data.recipient, Text: "Thank you, Jane Doe! Sincerely, John Doe" });
            this.received_notes.push({ Sender: data.recipient, Recipient: "John Doe", Text: "Thank you, John Doe! Sincerely, Jane Doe" });
            callback();
        }
    }   
}

function Api(delegate, http) {
    this.delegate = delegate;
    this.http = http;

    this.load_current_user = function() {
        this.http.get("/api/IOU/GetCurrentUserName", this.delegate.on_current_user_loaded);
    };

    this.load_sent_notes = function() {
        this.http.get("/api/IOU/GetNotesSentByMe", this.delegate.on_sent_notes_loaded);
    };

    this.load_received_notes = function () {
        this.http.get("/api/IOU/GetMyNotes", this.delegate.on_received_notes_loaded);
    };

    this.send_note = function (recipient) {
        this.http.get("/api/IOU/SendThankYouNoteTo", this.delegate.on_note_sent, { recipient: recipient });
    }
}
