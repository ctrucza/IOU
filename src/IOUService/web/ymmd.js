window.onload = function () {
    $("#thank_you_button").click(function () {
        $.ajax({
            url: "/api/IOU/SendThankYouNoteTo",
            type: "GET",
            data: { recipient: $("#recipient").val()},
            success: function (result) {
                reload_sent_notes();
            }
        });
    });

    $.ajax({
        url: "/api/IOU/GetCurrentUserName",
        type: "GET",
        success: function (result) {
            $("#username").text(result);
        }
    });

    reload_sent_notes();
}

function reload_sent_notes() {
    $.ajax({
        url: "/api/IOU/GetNotesSentByMe",
        type: "GET",
        success: function (result) {
            console.log(result);
            var table = document.getElementById("sent_notes_table"); // $("#sent_notes_table");
            $("#sent_notes_table > tbody > tr").remove();

            $.each(result, function (index, value) {
                console.log(value);
                var row = table.insertRow(-1);
                var recipientCell = row.insertCell(-1);
                var messageCell = row.insertCell(-1);
                recipientCell.innerText = value.Recipient;
                messageCell.innerText = value.Text;
            });
        }
    });
}