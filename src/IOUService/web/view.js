function View() {
    var send_button = $("#thank_you_button");
    function set_send_button_handler(handler){
        send_button.click(handler);
    }

    var refresh_button = $("#refresh_button");
    function set_refresh_button_handler(handler){
        refresh_button.click(handler);
    }

    var current_username_label = $("#username");
    function set_current_username(current_user_name) {
        current_username_label.text(current_user_name);
    }

    var recipient_edit = $("#recipient");
    function get_recipient(){
        return recipient_edit.val();
    }

    function show_sent_notes(notes) {
        display_notes_table("sent_notes_table", notes);
    }

    function show_received_notes(notes) {
        var hacked = notes.map(function (note) {
            return { Recipient: note.Sender, Text: note.Text };
        });

        display_notes_table("received_notes_table", hacked);
    }

    function display_notes_table (table_id, notes) {
        var table = document.getElementById(table_id);
        clear_table(table);

        $.each(notes, function (index, value) {
            var row = table.insertRow(-1);
            var recipientCell = row.insertCell(-1);
            var messageCell = row.insertCell(-1);
            recipientCell.innerText = value.Recipient;
            messageCell.innerText = value.Text;
        });
    }

    function clear_table(table) {
        $(table).find("tr").not(":first").remove();
    }

    return {
        set_send_button_handler: set_send_button_handler,
        set_refresh_button_handler: set_refresh_button_handler,
        set_current_username: set_current_username,
        get_recipient: get_recipient,
        show_sent_notes: show_sent_notes,
        show_received_notes: show_received_notes
    };
}
