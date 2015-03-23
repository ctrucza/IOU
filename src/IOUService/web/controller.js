var controller = {
    view: undefined,

    setup: function (view) {
        controller.view = view;

        view.send_button.click(controller.send_note);
        view.refresh_button.click(controller.load_received_notes);

        controller.load_current_user();
        controller.load_sent_notes();
        controller.load_received_notes();
    },

    load_current_user: function () {
        api.load_current_user(function (current_user_name) {
            view.current_user_label.text(current_user_name);
        });
    },

    send_note: function () {
        api.send_note(view.recipient.val(), controller.load_sent_notes);
    },

    load_sent_notes: function () {
        api.load_sent_notes(controller.show_sent_notes);
    },

    load_received_notes: function () {
        api.load_received_notes(controller.show_received_notes);
    },

    show_sent_notes: function (notes) {
        display_notes_table(view.sent_notes_table_element, notes);
    },

    show_received_notes: function (notes) {
        display_notes_table(view.received_notes_table_element, notes);
    }
}


function display_notes_table(table, notes) {
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
    $("#" + table.id + " tr").not(":first").remove();
}