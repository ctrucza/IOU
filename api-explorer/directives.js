app.directive('linkify', function () {
    var directive = {
        restrict: "A",

        link: function (scope, element, attrs) {
            element.bind('click', function () {
                var href = element.text();
                scope.$emit('hrefClicked', href);
            });
        }
    };

    return directive;
});

app.directive('node', function (RecursionHelper) {
    var directive = {
        restrict: "A",
        replace: true,
        scope: {
            nodeValue: '=',
        },
        transclude: true,
        templateUrl: 'node-directive.html',

        compile: function (element) {
            return RecursionHelper.compile(element, function (scope) {
                scope.type = getType(scope.nodeValue);

                scope.notSorted = function (obj) {
                    if (!obj) {
                        return [];
                    }

                    // We do not want the "$$hashKey" property (added by angular js)
                    return _.filter(Object.keys(obj), function (key) {
                        return key != "$$hashKey";
                    });
                };
            });
        }
    };

    function getType(value) {
        var type = jQuery.type(value);
        return (type === "string" && isHref(value)) ? "href" : type;
    }

    function isHref(input) {
        return input.indexOf("http") == 0 || input.indexOf("/") == 0;
    }

    return directive;
});


app.directive('jsonInput', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            ngModel.$parsers.push(parseJson);
            ngModel.$formatters.push(toJson);

            function parseJson(json) {
                try {
                    return JSON.parse(json);
                } catch (error) {
                    // TODO: Change background to red to signal error.
                    return {};
                }
            }

            function toJson(obj) {
                return JSON.stringify(obj, null, 4);
            }
        }
    };
});
