﻿window.onload = function () {
    set_up_send_button();
    set_up_refresh_button();

    api.on_current_user_loaded = show_current_user_name;
    api.on_sent_notes_loaded = view.show_sent_notes;
    api.on_received_notes_loaded = view.show_received_notes;

    api.load_current_user();
    api.load_sent_notes();
    api.load_received_notes();
}

function show_current_user_name(current_user_name) {
}

function set_up_send_button() {
    view.send_button.click(function () {
        api.send_note(view.recipient_edit.val());
    });
}

function set_up_refresh_button() {
    view.refresh_button.click(function () {
        api.load_received_notes();
    });
}

