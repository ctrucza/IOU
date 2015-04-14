window.onload = function () {
    refresh_view();
}


function refresh_view() {
    api.load_current_user();
    api.load_sent_notes();
    api.load_received_notes();
}

var api = new Api(new FakeHttp());
var controller = new Controller(view, api);
