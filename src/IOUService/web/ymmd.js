window.onload = function () {
    set_up_send_button();
    set_up_refresh_button();

    api.on_current_user_loaded = view.show_current_user;
    api.on_sent_notes_loaded = view.show_sent_notes;
    api.on_received_notes_loaded = view.show_received_notes;

    api.load_current_user();
    api.load_sent_notes();
    api.load_received_notes();
}

function set_up_send_button() {
    $("#thank_you_button").click(function() {
        api.send_note();
    });
}

function set_up_refresh_button() {
    $("#refresh_button").click(api.load_received_notes);
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