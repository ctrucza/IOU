﻿var api = {
    load_current_user: function() {
        load_current_user();
    },
    load_sent_notes: function() {
        load_sent_notes();
    },
    load_received_notes: function() {
        load_received_notes();
    },
    send_note: function() {
        $.ajax({
            url: "/api/IOU/SendThankYouNoteTo",
            type: "GET",
            data: { recipient: $("#recipient").val() },
            success: function (result) {
                load_sent_notes();
            }
        });
    }
};

window.onload = function () {
    set_up_send_button();
    set_up_refresh_button();

    api.load_current_user();
    api.load_sent_notes();
    api.load_received_notes();
}

function set_up_send_button() {
    $("#thank_you_button").click(api.send_note);
}

function set_up_refresh_button() {
    $("#refresh_button").click(function () {
        load_received_notes();
    });
}

function load_current_user() {
    $.ajax({
        url: "/api/IOU/GetCurrentUserName",
        type: "GET",
        success: function (result) {
            $("#username").text(result);
        }
    });
}

function load_sent_notes() {
    $.ajax({
        url: "/api/IOU/GetNotesSentByMe",
        type: "GET",
        success: function (result) {
            show_sent_notes(result);
        }
    });
}

function load_received_notes() {
    $.ajax({
        url: "/api/IOU/GetMyNotes",
        type: "GET",
        success: function (result) {
            show_received_notes(result);
        }
    });
}

function show_sent_notes(notes) {

    display_notes_table("sent_notes_table", notes);
}

function show_received_notes(notes) {
    display_notes_table("received_notes_table", notes);
}

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