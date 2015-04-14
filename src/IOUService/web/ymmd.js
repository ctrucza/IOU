window.onload = function () {
    var api = new Api(new FakeHttp());
    var controller = new Controller(view, api);

    controller.refresh_ui();
}


