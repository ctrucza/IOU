window.onload = function () {
    setup_view();
    setup_api();
    refresh_view();
}

function show_current_user_name(current_user_name) {
    view.current_username_label.text(current_user_name);
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
    api.on_current_user_loaded = show_current_user_name;
    api.on_sent_notes_loaded = view.show_sent_notes;
    api.on_received_notes_loaded = view.show_received_notes;
}

function refresh_view() {
    api.load_current_user();
    api.load_sent_notes();
    api.load_received_notes();
}