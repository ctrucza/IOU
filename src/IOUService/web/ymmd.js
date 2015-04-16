window.onload = function () {
    var api = new Api(new FakeHttp());
    var controller = new Controller(new View(), api);

    controller.refresh_ui();
};