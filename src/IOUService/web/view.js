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

    delegate: undefined,
    set_delegate: function (delegate) {
        view.delegate = delegate;
        delegate.on_current_user_loaded = view.show_current_user;
        delegate.on_sent_notes_loaded = view.show_sent_notes;
        delegate.on_received_notes_loaded = view.show_received_notes;

        set_up_send_button(delegate);
        set_up_refresh_button(delegate);
    },

    refresh: function() {
        view.delegate.load_current_user();
        view.delegate.load_sent_notes();
        view.delegate.load_received_notes();
    }
};

function set_up_send_button(delegate) {
    $("#thank_you_button").click(function () {
        delegate.send_note();
    });
}

function set_up_refresh_button(delegate) {
    $("#refresh_button").click(delegate.load_received_notes);
};

function display_notes_table(table_id, notes) {
    clear_table(table_id);

    var table = document.getElementById(table_id);
    $.each(notes, function (index, value) {
        var row = table.insertRow(-1);
        var recipientCell = row.insertCell(-1);
        var messageCell = row.insertCell(-1);
        recipientCell.innerText = value.Recipient;
        messageCell.innerText = value.Text;
    });
}

function clear_table(table_id) {
    $("#" + table_id + " tr").not(":first").remove();
}