
app.factory("config", function () {
    return {
        home: window.location.origin + "/api/root"
    };
});

app.controller("ConfigController", function ($scope, config) {
	$scope.config = config; 
});

app.controller('WorkspaceController', function ($scope, response, history, config, client) {
	$scope.response = response;
	$scope.request = new Request();
	
    $scope.goHome = function () {
        history.clear();
        client.execute(new Request(config.home));
    };
    
    $scope.$on("hrefClicked", function (event, href) {
		$scope.request.url = href;
        client.execute($scope.request);
    });
});

app.factory("response", function () { 
	return { 
		data: { } 
	}; 
});

function Request(url, method, data) {
	this.url = url;
	this.method = method || "get";
	this.data = data || {};
	
	// Not implemented yet.
	this.headers = null;
	
	this.isGet = function() {
		return this.method.toLowerCase() == "get";
	};
}

// TODO: Remove dependency on history. 
// TODO: Raise 'onResponse' event, handle it in WorkspaceController?
app.service("client", function ($http, history) {
    return {
        execute: function (request) {
            // http://stackoverflow.com/questions/13760070/angularjs-passing-data-to-http-get-request
            request.params = request.isGet() ? request.data : {};
            
            $http(request).success(function (responseData) {
                history.add(responseData);
            });
        }
    };
});
