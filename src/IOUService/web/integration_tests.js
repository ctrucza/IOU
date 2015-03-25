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

casper.test.begin("new message appears in the sent messages list", 6, function (test) {
    var initial_sent_notes_count;
    var initial_received_notes_count;

    casper.start(URL);

    casper.then(function() {
        this.sendKeys("#recipient", "Jane Doe");

        // count the rows in the sent notes table
        initial_sent_notes_count = this.evaluate(function() {
            return __utils__.getElementsByXPath("//table[@id='sent_notes_table']//tr");
        }).length;

        // count the rows in the received notes table
        initial_received_notes_count = this.evaluate(function() {
            return __utils__.getElementsByXPath("//table[@id='received_notes_table']//tr");
        }).length;

        // send note
        this.click("#thank_you_button");
    });

    casper.wait(1000);

    casper.then(function() {
        // count the rows in the sent notes table
        var count_after = this.evaluate(function() {
            return __utils__.getElementsByXPath("//table[@id='sent_notes_table']//tr");
        }).length;
        test.assertEquals(count_after, initial_sent_notes_count + 1);

        var recipient = this.evaluate(function() {
            return __utils__.getElementsByXPath("//table[@id='sent_notes_table']//tr[last()]//td[1]");
        })[0];
        test.assertEquals(recipient.innerHTML, "Jane Doe");

        var message = this.evaluate(function() {
            return __utils__.getElementsByXPath("//table[@id='sent_notes_table']//tr[last()]//td[2]");
        })[0];
        test.assertEquals(message.innerHTML, "Thank you, Jane Doe! Sincerely, John Doe");
    });

    casper.then(function() {
        this.click("#refresh_button");
    });

    casper.wait(1000);

    casper.then(function (){
        // count the rows in the received notes table
        var count_after = this.evaluate(function() {
            return __utils__.getElementsByXPath("//table[@id='received_notes_table']//tr");
        }).length;
        test.assertEquals(count_after, initial_received_notes_count + 1);

        var sender = this.evaluate(function() {
            return __utils__.getElementsByXPath("//table[@id='received_notes_table']//tr[last()]//td[1]");
        })[0];
        test.assertEquals(sender.innerHTML, "Jane Doe");

        var message = this.evaluate(function() {
            return __utils__.getElementsByXPath("//table[@id='received_notes_table']//tr[last()]//td[2]");
        })[0];
        test.assertEquals(message.innerHTML, "Thank you, John Doe! Sincerely, Jane Doe");
    });
    casper.run(function () {
        test.done();
    });
});


