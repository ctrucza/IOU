var URL = "http://localhost:4242/web/index.html"

casper.test.begin("current user shown correctly", 2, function(test) {
    casper.start(URL).
        then(function () {
            test.assertExists("#username");
            test.assertSelectorHasText("#username", "John Doe");
        }).
        run(function() {
            test.done();
    });
});

function get_number_of_rows(table_selector) {
    var result = casper.evaluate(function (selector) {
        return $(selector).find("tr").length;
    }, table_selector);
    return result;
}

function get_cell_from_last_row(table_selector, cell_index) {
    return casper.evaluate(function(selector, index) {
        return $(selector).find("tr").last().find("td")[index].innerHTML;
    }, table_selector, cell_index);
}

casper.test.begin("new message appears in the sent messages list", 6, function (test) {
    var initial_sent_notes_count;
    var initial_received_notes_count;

    casper.start(URL);

    casper.then(function() {
        this.sendKeys("#recipient", "Jane Doe");

        initial_sent_notes_count = get_number_of_rows("#sent_notes_table");
        initial_received_notes_count = get_number_of_rows("#received_notes_table");

        // send note
        this.click("#thank_you_button");
    });

    casper.wait(100);

    casper.then(function() {
        var count_after = get_number_of_rows("#sent_notes_table");
        test.assertEquals(count_after, initial_sent_notes_count + 1);

        var recipient = get_cell_from_last_row("#sent_notes_table", 0);
        test.assertEquals(recipient, "Jane Doe");

        var message = get_cell_from_last_row("#sent_notes_table", 1);
        test.assertEquals(message, "Thank you, Jane Doe! Sincerely, John Doe");
    });

    casper.then(function() {
        this.click("#refresh_button");
    });

    casper.wait(100);

    casper.then(function (){
        // count the rows in the received notes table
        var count_after = get_number_of_rows("#received_notes_table");
        test.assertEquals(count_after, initial_received_notes_count + 1);

        var sender = get_cell_from_last_row("#received_notes_table", 0);
        test.assertEquals(sender, "Jane Doe");

        var message = get_cell_from_last_row("#received_notes_table", 1);
        test.assertEquals(message, "Thank you, John Doe! Sincerely, Jane Doe");
    });
    casper.run(function () {
        test.done();
    });
});


