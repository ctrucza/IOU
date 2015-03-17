window.onload = function () {
    set_up_send_button();
    load_current_user();
    load_sent_notes();
}

function set_up_send_button() {
    $("#thank_you_button").click(function () {
        $.ajax({
            url: "/api/IOU/SendThankYouNoteTo",
            type: "GET",
            data: { recipient: $("#recipient").val() },
            success: function (result) {
                load_sent_notes();
            }
        });
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

function show_sent_notes(notes) {
    clear_table();

    var table = document.getElementById("sent_notes_table");
    $.each(notes, function(index, value) {
        var row = table.insertRow(-1);
        var recipientCell = row.insertCell(-1);
        var messageCell = row.insertCell(-1);
        recipientCell.innerText = value.Recipient;
        messageCell.innerText = value.Text;
    });
}

function clear_table() {
    $("#sent_notes_table tr").not(":first").remove();
}