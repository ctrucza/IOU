window.onload = function () {
    setup_view();
    setup_api();
    refresh_view();
}

function setup_view() {
    view.send_button.click(function () {
        api.send_note(view.recipient_edit.val());
    });
    view.refresh_button.click(function () {
        api.load_received_notes();
    });
}

function setup_api() {
    api.delegate = delegate;
}

function refresh_view() {
    api.load_current_user();
    api.load_sent_notes();
    api.load_received_notes();
}

var delegate = {
    on_current_user_loaded: function (current_user_name) {
        view.current_username_label.text(current_user_name);
    },
    on_sent_notes_loaded: function (notes) {
        view.show_sent_notes(notes);
    },
    on_received_notes_loaded: function (notes) {
        view.show_received_notes(notes);
    },
    on_note_sent: function() {
        api.load_sent_notes();
    }
}