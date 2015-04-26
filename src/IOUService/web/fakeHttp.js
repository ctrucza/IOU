// Until we find a way to run the integration tests without including fakehttp in the index.html, we keep it next to the Api.

//function FakeHttp() {
//    this.sent_notes = [];
//    this.received_notes = [];
//    this.get = function (url, callback, data) {
//        if (url === "/api/IOU/GetCurrentUserName") {
//            callback("John Doe");
//        } else if (url === "/api/IOU/GetNotesSentByMe") {
//            callback(this.sent_notes);
//        } else if (url === "/api/IOU/GetMyNotes") {
//            callback(this.received_notes);
//        } else if (url === "/api/IOU/SendThankYouNoteTo") {
//            this.sent_notes.push({ Sender: "John Doe", Recipient: data.recipient, Text: "Thank you, Jane Doe! Sincerely, John Doe" });
//            this.received_notes.push({ Sender: data.recipient, Recipient: "John Doe", Text: "Thank you, John Doe! Sincerely, Jane Doe" });
//            callback();
//        }
//    }
//}