window.onload = function () {
    setup_view();
    setup_api();
    refresh_view();
}

function setup_view() {
    // wow! such complex!
    view.send_button.click(function () {
        api.send_note(view.recipient_label.val());
    });

    view.get_refresh_button().click(function () {
        api.load_received_notes();
    });
}

function setup_api() {
    api.on_current_user_loaded = view.show_current_user_name;
    api.on_sent_notes_loaded = view.show_sent_notes;
    api.on_received_notes_loaded = view.show_received_notes;
}

function refresh_view() {
    // is our api coherent enough? This three lines look like they could go into the api.
    // but that would create ugliness there. Maybe we miss something?
    api.load_current_user();
    api.load_sent_notes();
    api.load_received_notes();
}