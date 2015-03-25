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

casper.test.begin("new message appears in the sent messages list", 3, function (test) {
    var count_before;
    casper.start(URL).
        then(function () {
            this.sendKeys("#recipient", "Jane Doe");
 
            // count the rows in the sent notes table
            count_before = this.evaluate(function () {
                return __utils__.getElementsByXPath("//table[@id='sent_notes_table']//tr");
            }).length;

            // send note
            this.click("#thank_you_button");
            this.wait(10);
        }).
        then(function() {
            // count the rows in the sent notes table
            var count_after = this.evaluate(function () {
                return __utils__.getElementsByXPath("//table[@id='sent_notes_table']//tr");
            }).length;
            test.assertEquals(count_after, count_before + 1);

            var recipient = this.evaluate(function() {
                return __utils__.getElementsByXPath("//table[@id='sent_notes_table']//tr[last()]//td[1]");
            })[0];
            test.assertEquals(recipient.innerHTML, "Jane Doe");

            var message = this.evaluate(function () {
                return __utils__.getElementsByXPath("//table[@id='sent_notes_table']//tr[last()]//td[2]");
            })[0];
            test.assertEquals(message.innerHTML, "Thank you, Jane Doe! Sincerely, John Doe");
        }).
        run(function () {
            test.done();
        });
});


