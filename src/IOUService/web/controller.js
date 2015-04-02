var controller = {
    view: undefined,
    api: undefined,
    setup: function (view, api) {
        controller.view = view;
        controller.api = api;

        controller.setup_view();
        controller.setup_api();
        controller.refresh_view();
    },
    setup_view: function () {
        controller.view.send_button.click(function () {
            controller.send_note();
        });

        controller.view.refresh_button.click(function () {
            controller.load_received_notes();
        });
    },
    setup_api: function () {
        controller.api.delegate = controller;
    },
    refresh_view: function () {
        // is our api coherent enough? This three lines look like they could go into the api.
        // but that would create ugliness there. Maybe we miss something?
        controller.api.load_current_user();
        controller.api.load_sent_notes();
        controller.api.load_received_notes();
    },
    // private actions
    send_note: function() {
        controller.api.send_note(controller.view.recipient_label.val());
    },
    load_received_notes: function() {
        controller.api.load_received_notes();
    },

    // api delegate functions
    on_current_user_loaded: function (current_user_name) {
        controller.view.username_label.text(current_user_name);
    },
    on_sent_notes_loaded: function(notes) {
        controller.view.show_sent_notes(notes);
    },
    on_received_notes_loaded: function(notes) {
        controller.view.show_received_notes(notes);
    },
    on_note_sent: function() {
        controller.api.load_sent_notes();
    }
}
