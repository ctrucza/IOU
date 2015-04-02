var view = {
    send_button: $("#thank_you_button"),
    refresh_button: $("#refresh_button"),

    show_current_user_name: function (username) {
        $("#username").text(username);
    },
    show_sent_notes: function (notes) {
        view.display_notes_table("sent_notes_table", notes);
    },
    show_received_notes: function (notes) {
        var hacked = notes.map(function (note) {
            return { Recipient: note.Sender, Text: note.Text };
        });

        view.display_notes_table("received_notes_table", hacked);
    },
    get_recipient: function () {
        return $("#recipient").val();
    },

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