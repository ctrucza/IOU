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
        // wow! such complex!
        controller.view.send_button.click(function () {
            controller.api.send_note(controller.view.recipient_label.val());
        });

        controller.view.refresh_button.click(function () {
            controller.api.load_received_notes();
        });
    },
    setup_api: function () {
        controller.api.on_current_user_loaded = controller.view.show_current_user_name;
        controller.api.on_sent_notes_loaded = controller.view.show_sent_notes;
        controller.api.on_received_notes_loaded = controller.view.show_received_notes;
    },
    refresh_view: function () {
        // is our api coherent enough? This three lines look like they could go into the api.
        // but that would create ugliness there. Maybe we miss something?
        controller.api.load_current_user();
        controller.api.load_sent_notes();
        controller.api.load_received_notes();
    }
}
