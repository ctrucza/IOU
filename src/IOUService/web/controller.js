function Controller(view, api) {

    var result;

    view.set_send_button_handler(function () {
        var recipient = view.get_recipient();
        api.send_note(recipient);
    });

    view.set_refresh_button_handler(function () {
        api.load_received_notes();
    });

    view.set_recipient_autocomplete_source(function (request, callback) {
        result.on_users_filtered = callback;
        var search_term = request.term;
        api.filter_users(search_term);
    });

    function refresh_ui() {
        api.load_current_user();
        api.load_sent_notes();
        api.load_received_notes();
    }

    // delegate
    function on_current_user_loaded(current_user_name) {
        view.set_current_username(current_user_name);
    }

    function on_sent_notes_loaded(notes) {
        view.show_sent_notes(notes);
    }

    function on_received_notes_loaded(notes) {
        view.show_received_notes(notes);
    }

    function on_note_sent() {
        api.load_sent_notes();
    }

    result = {
        refresh_ui: refresh_ui,

        on_current_user_loaded: on_current_user_loaded,
        on_sent_notes_loaded: on_sent_notes_loaded,
        on_received_notes_loaded: on_received_notes_loaded,
        on_note_sent: on_note_sent
    };

    api.set_delegate(result);

    return result;
}