/// <reference path="scripts/qunit-1.18.0.js"/>
/// <reference path="api.js"/>
/// <reference path="view.js"/>
/// <reference path="controller.js"/>
/// <reference path="scripts/jquery-2.1.3.js"/>

test("current user is set in the view", function () {
    var fakeView = new View();

    fakeView.set_current_username = function (current_user_name) {
        this.user_name = current_user_name;
    };

    var controller = new Controller(fakeView, new Api());
    controller.refresh_ui();
    equal("John Doe", fakeView.user_name, "user name was set correctly");
});