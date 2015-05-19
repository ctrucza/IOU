function Controller(view, api) {

    function get_recipient() {
        return view.get_recipient();
    }

    function send_note() {
        api.send_note(get_recipient());
    }

    function reload_notes() {
        api.load_received_notes();
    }


    var autocomplete_callback;
    function filter_users(request, callback) {
        autocomplete_callback = callback;
        var search_term = request.term;
        api.get_all_users(search_term);
    }

    view.set_send_button_handler(send_note);
    view.set_refresh_button_handler(reload_notes);
    view.init_autocomplete(filter_users);

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

    function on_users_filtered(users) {
        autocomplete_callback(users);
    }

    var result = {
        refresh_ui: refresh_ui,

        on_current_user_loaded: on_current_user_loaded,
        on_sent_notes_loaded: on_sent_notes_loaded,
        on_received_notes_loaded: on_received_notes_loaded,
        on_note_sent: on_note_sent,

        on_users_filtered: on_users_filtered
    };

    api.set_delegate(result);

    return result;
}