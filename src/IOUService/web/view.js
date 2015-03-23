var view = {
    show_current_user: function (user_name) {
        $("#username").text(user_name);
    },
    show_sent_notes: function (notes) {
        display_notes_table("sent_notes_table", notes);
    },
    show_received_notes: function (notes) {
        display_notes_table("received_notes_table", notes);
    },
    set_delegate: function(delegate) {
        delegate.on_current_user_loaded = view.show_current_user;
        delegate.on_sent_notes_loaded = view.show_sent_notes;
        delegate.on_received_notes_loaded = view.show_received_notes;
    }
};
