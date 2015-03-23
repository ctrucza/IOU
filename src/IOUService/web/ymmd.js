var api = {
    on_current_user_loaded: undefined,
    load_current_user: function() {
        $.ajax({
            url: "/api/IOU/GetCurrentUserName",
            type: "GET",
            success: function (result) {
                api.on_current_user_loaded(result);
            }
        });
    },

    on_sent_notes_loaded: undefined,
    load_sent_notes: function() {
        $.ajax({
            url: "/api/IOU/GetNotesSentByMe",
            type: "GET",
            success: function (result) {
                api.on_sent_notes_loaded(result);
            }
        });
    },

    on_received_notes_loaded: undefined,
    load_received_notes: function() {
        $.ajax({
            url: "/api/IOU/GetMyNotes",
            type: "GET",
            success: function (result) {
                api.on_received_notes_loaded(result);
            }
        });
    },

    send_note: function() {
        $.ajax({
            url: "/api/IOU/SendThankYouNoteTo",
            type: "GET",
            data: { recipient: $("#recipient").val() },
            success: function () {
                api.load_sent_notes();
            }
        });
    }
};

var view = {
    show_current_user: function(user_name) {
        $("#username").text(user_name);
    },
    show_sent_notes: function(notes) {
        display_notes_table("sent_notes_table", notes);
    },
    show_received_notes: function(notes) {
        display_notes_table("received_notes_table", notes);
    }
};

window.onload = function () {
    set_up_send_button();
    set_up_refresh_button();

    api.on_current_user_loaded = view.show_current_user;
    api.load_current_user();

    api.on_sent_notes_loaded = view.show_sent_notes;
    api.load_sent_notes();

    api.on_received_notes_loaded = view.show_received_notes;
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