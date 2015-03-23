var view = {
    show_current_user: function (user_name) {
        $("#username").text(user_name);
    },
    show_sent_notes: function (notes) {
        display_notes_table("sent_notes_table", notes);
    },
    show_received_notes: function (notes) {
        display_notes_table("received_notes_table", notes);
    }
};
