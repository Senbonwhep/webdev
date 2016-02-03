app = angular.module('app', ['ui.bootstrap', 'ngResource', 'ui.router']);

app.config(function($httpProvider){
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';


});

app.config(function($stateProvider, $urlRouterProvider){


    //$urlRouterProvider.otherwise("/");

    $stateProvider
        .state('task', {
            url: "/",
            templateUrl: "/static/partials/task.html"
        })

        .state('user', {
            url: '/user',
            templateUrl: "static/partials/users.html",
            controller: ['$scope', '$http',
                function( $scope,   $http) {

                    $scope.users = [];
                    $http.get('/api/v1/user/').success(function(data) {
                        $scope.users = data.objects;
                    }).error(function(data, status, headers, config) {
                            if(status=401){
                                window.location = '/admin'
                            }
                    })
                }
            ]
        })

        .state('user.view', {
            url: '/:userId',
            views: {
                '': {
                    templateUrl: "static/partials/users.view.html",
                    controller: ['$scope', '$http', '$stateParams',
                        function( $scope,   $http,   $stateParams) {
                            $scope.selectedUser = {};
                            $http.get('/api/v1/user/'+$stateParams.userId+'/').success(function(data) {
                                $scope.selectedUser = data;
                            }).error(function(data, status, headers, config) {
                            if(status=401){
                                window.location = '/admin'
                            }
                    })
                        }
                    ]
                }
            }
        })

        .state('auto_model', {
            url: '/auto_model',
            templateUrl: "static/partials/auto_models.html",
            controller: ['$scope', '$http',
                function( $scope,   $http) {

                    $scope.auto_models = [];
                    $http.get('/api/v1/auto_model/').success(function(data) {
                        $scope.auto_models = data.objects;
                    }).error(function(data, status, headers, config) {
                            if(status=401){
                                window.location = '/admin'
                            }
                    })
                }
            ]
        })
});

app.controller("postText", function($scope,$http,$window) {
   $scope.testmodel={name: "BMW"};
   $scope.newtestModel=[];
   $scope.sendPost =  function() {
   $scope.testmodel = {name: $scope.newtestModel};

  var data = $.param({
               json: JSON.stringify({
               name: $scope.newtestModel
            })
   });

   $http.post('/api/v1/auto_model/',data).success(function(data,status)
   {
   $window.alert("Success!");
   })
   .error(function(data,status,headers,config)
   {
   $window.alert("Error");
   })
   }




 });

app.run(['$rootScope', function($rootScope) {

}]);
