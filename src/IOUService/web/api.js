function FakeHttp() {
    var sent_notes = [];
    var received_notes = [];

    function get(url, callback, data) {
        if (url === "/api/IOU/GetCurrentUserName") {
            callback("John Doe");
        } else if (url === "/api/IOU/GetNotesSentByMe") {
            callback(sent_notes);
        } else if (url === "/api/IOU/GetMyNotes") {
            callback(received_notes);
        } else if (url === "/api/IOU/SendThankYouNoteTo") {
            sent_notes.push({ Sender: "John Doe", Recipient: data.recipient, Text: "Thank you, Jane Doe! Sincerely, John Doe" });
            received_notes.push({ Sender: data.recipient, Recipient: "John Doe", Text: "Thank you, John Doe! Sincerely, Jane Doe" });
            callback();
        }
    }

    return {
        get: get
    };
}

function Api() {
    var delegate;
    var http = new FakeHttp();
    function set_delegate(new_delegate) {
        delegate = new_delegate;
    }

    function load_current_user() {
        http.get("/api/IOU/GetCurrentUserName", delegate.on_current_user_loaded);
    }

    function load_sent_notes() {
        http.get("/api/IOU/GetNotesSentByMe", delegate.on_sent_notes_loaded);
    }

    function load_received_notes() {
        http.get("/api/IOU/GetMyNotes", delegate.on_received_notes_loaded);
    }

    function send_note(recipient) {
        http.get("/api/IOU/SendThankYouNoteTo", delegate.on_note_sent, { recipient: recipient });
    }

    return {
        set_delegate: set_delegate,
        load_current_user: load_current_user,
        load_sent_notes: load_sent_notes,
        load_received_notes: load_received_notes,
        send_note: send_note
    };
}
