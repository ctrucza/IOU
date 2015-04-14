window.onload = function () {
    refresh_view();
}

function Controller(view, api) {
    this.api = api;
    this.view = view;
    var that = this;

    this.get_recipient = function () {
        return that.view.recipient_edit.val();
    }

    this.send_note = function () {
        that.api.send_note(that.get_recipient());
    }

    this.reload_notes = function () {
        that.api.load_received_notes();
    }

    this.view.send_button.click(this.send_note);
    this.view.refresh_button.click(this.reload_notes);
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

var api = new Api(delegate, new FakeHttp());
var controller = new Controller(view, api);
