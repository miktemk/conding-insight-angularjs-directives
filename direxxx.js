angular.module('ng').directive('testElem', function () {
    return {
        restrict: 'A',
        scope: 'isolate',
        template: '<div class="mydirectiveclass"><h3>hello...</h3>{{arr}}<p ng-repeat="obj in arr">{{obj}}</p></div>',
        link: function ($scope, iterStartElement, attr) {
            $(".mydirectiveclass").css({'background-color' : 'yellow'});
            $scope.arr = ["mikhail", "is", "the", "best"];
        }
    };
});
angular.module('ng').directive('testElemTemplate', function () {
    return {
        restrict: 'A',
        templateUrl: 'template.html',
        scope: 'isolate',
        link: function ($scope, iterStartElement, attr) {
            $scope.obj = [{name:"john", age:"12"},{name:"jing hua shi", age:"123"},{name:"pu naw kim", age:"124"}];
        }
    };
});
angular.module('ng').directive('testElemTransclude', function () {
    return {
        restrict: 'EA',
        transclude: true,
        scope: 'isolate',
        template: '<h3>heading 3</h3><p>preface... blah blah</p><div ng-transclude></div>',
    };
});
function my_custom_parsing(text) {
    var result = "";
    for (var i = 0; i < text.length; i++) {
        result += text[i] + "*";
    }
    return result;
}
angular.module('ng').directive('testElemCompile', function () {
    return {
        restrict: 'A',
        transclude: true,
        scope: 'isolate',
        template: '<div>gonna parse this: {{orig}} <br/>... and get this: {{obj}}</div>',
        //templateUrl: 'template.html',
        compile:function (element, attr, transclusionFunc) {
            return function ($scope, iterStartElement, attr) {
                var origElem = transclusionFunc($scope);
                var content = origElem.text();
                $scope.orig = content;
                $scope.obj = my_custom_parsing(content);
            };
        }
    };
});
angular.module('ng').directive('myControl', function () {
    return {
        restrict: 'E',
        scope: {
            paramStr: '@', // pass as a string
            paramCallback: '&', // pass as a function and call with brackets ()
            paramVar: '=' // double binding!
        },
        template: '<div class="str">{{paramStr}}</div>'
            + '<div class="callback"><button class="btn" ng-click="paramCallback()">clickame</button></div>'
            + '<div class="var"><input type="text" class="form-control" ng-model="paramVar" /></div><hr/>'
        //link function ($scope, iterStartElement, attr) {}
    };
});

function MyController($scope) {
    $scope.somevar = "somevar...rrrr";
    $scope.somevar2 = "somevar...2!";
    $scope.titleControl2 = "Control 2 you beeches!";
    $scope.callback = function () {
        alert('callback called');
    }
    $scope.callback2 = function () {
        alert('callback2 called');
    }
}

angular.module('ng').directive('replaceTest', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="parent">'
            + '<div>AAAAA</div>'
            + '<div>BBBBB</div>'
            + '</div>'
    };
});