function Controller(view, api) {
    this.view = view;
    this.api = api;
    this.api.delegate = this;

    var that = this;

    //function get_recipient() {
    //    return view.recipient_edit.val();
    //}

    this.get_recipient = function() {
        return that.view.recipient_edit.val();
    };

    //function send_note() {
    //    api.send_note(get_recipient());

    //}

    this.send_note = function () {
        that.api.send_note(that.get_recipient());
    };

    this.reload_notes = function() {
        that.api.load_received_notes();
    };

    this.view.send_button.click(this.send_note);
    this.view.refresh_button.click(this.reload_notes);

    this.refresh_ui = function() {
        that.api.load_current_user();
        that.api.load_sent_notes();
        that.api.load_received_notes();
    };

    // delegate
    this.on_current_user_loaded = function (current_user_name) {
        that.view.current_username_label.text(current_user_name);
    };

    this.on_sent_notes_loaded = function (notes) {
        that.view.show_sent_notes(notes);
    };
    this.on_received_notes_loaded = function (notes) {
        that.view.show_received_notes(notes);
    };

    this.on_note_sent = function() {
        that.api.load_sent_notes();
    };
}