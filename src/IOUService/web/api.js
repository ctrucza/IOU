var api = {
    // interface
    delegate: undefined,

    // smell: duplicate code
    // the four methods there look very similar to each other.
    // ExtractSomething?
    load_current_user: function () {
        $.ajax({
            url: "/api/IOU/GetCurrentUserName",
            type: "GET",
            success: function (result) {
                api.delegate.on_current_user_loaded(result);
            }
        });
    },
    load_sent_notes: function () {
        $.ajax({
            url: "/api/IOU/GetNotesSentByMe",
            type: "GET",
            success: function (result) {
                api.delegate.on_sent_notes_loaded(result);
            }
        });
    },
    load_received_notes: function () {
        $.ajax({
            url: "/api/IOU/GetMyNotes",
            type: "GET",
            success: function (result) {
                api.delegate.on_received_notes_loaded(result);
            }
        });
    },
    send_note: function (recipient) {
        $.ajax({
            url: "/api/IOU/SendThankYouNoteTo",
            type: "GET",
            data: { recipient: recipient },
            success: function () {
                api.load_sent_notes();
            }
        });
    }
};