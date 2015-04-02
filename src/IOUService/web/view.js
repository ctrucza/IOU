var view = {
    show_current_user_name: function (username) {
        $("#username").text(username);
    },
    show_sent_notes: function (notes) {
        view.display_notes_table("sent_notes_table", notes);
    },
    show_received_notes: function (notes) {
        // this hack should be fixed
        var hacked = notes.map(function (note) {
            return { Recipient: note.Sender, Text: note.Text };
        });

        view.display_notes_table("received_notes_table", hacked);
    },
    recipient_label: $("#recipient"),
    send_button: $("#thank_you_button"),
    get_refresh_button: function () {
        return $("#refresh_button");
    },

    // the code below is too complex.
    display_notes_table: function (table_id, notes) {
        var table = document.getElementById(table_id);
        view.clear_table(table);

        $.each(notes, function (index, value) {
            var row = table.insertRow(-1);
            var recipientCell = row.insertCell(-1);
            var messageCell = row.insertCell(-1);
            recipientCell.innerText = value.Recipient;
            messageCell.innerText = value.Text;
        });
    },

    clear_table: function (table) {
        $(table).find("tr").not(":first").remove();
    }
}