var myApp = angular.module('demo.controllers', []);


myApp.controller('RootPageController', function($scope, $ionicSideMenuDelegate) {
    })

myApp.controller('NavController', function($scope, $ionicSideMenuDelegate,$state) {

        console.log('from NavController');
        console.log($state.current.name);
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.showRightMenu = function () {
            $ionicSideMenuDelegate.toggleRight();
        };

        $scope.toggleRight = function() {
            $ionicSideMenuDelegate.toggleRight();
        };

    })

    .controller('Odh1Controller', function($scope, $ionicSideMenuDelegate, $location, $rootScope) {

        $scope.isItemActive = function(shortUrl) {
            var tempURL = '/app/' + shortUrl;
            console.log(tempURL);
            return (tempURL == $location.$$path.substring(0,9));
        };

        // TODO: change for production)
        $rootScope.urlapi = "http://104.131.87.66:9191"
        //$rootScope.urlapi = "http://127.0.0.1:9191";
    })


    .controller('odh1HomePageController',function($scope,$ionicPopup,$ionicPlatform,$state,$http,$location){
        /*set up the popup message for registration*/
        console.log($state.current.name);
    })

    .controller('odh1ChildCarePageController', function($scope, $ionicSideMenuDelegate, $http, $ionicLoading, $rootScope) {

        $scope.showCCGraph = true;

        $ionicLoading.show({
            template: 'loading'
        })
        //get data only if null
        if  ($rootScope.flagLocationData)
        {
            $ionicLoading.hide();
        }
        else
        {
            $http.get($rootScope.urlapi + "/api/childcare_mun_api").success(function(data) {
                    $rootScope.apiDataLoction = data.objects;
                }
            )

            $http.get($rootScope.urlapi + "/api/childcare_api").success(function(data) {
                    $ionicLoading.hide();
                    $rootScope.flagLocationData = true;
                    $rootScope.apiDataDayCares = data.objects;
                }
            )
        }

    })


    .controller('odh1ChildCareDetailsPageController', function($scope,$stateParams,$rootScope, $ionicLoading) {

        for(var i=0; i<$rootScope.apiDataDayCares.length; i++) {
            loop: { // label
                if ($rootScope.apiDataDayCares[i].ccid === parseInt($stateParams.ccId)) {
                    $scope.ccLocation = $rootScope.apiDataDayCares[i];
                    break loop;
                }
            }
        }
        console.log($scope.ccLocation);

    })

    .controller('MyController', function($scope, $http) {
        $scope.items = [1,2,3];
    })

    .controller('odh1HelpPageController', function($scope, $ionicSideMenuDelegate, $http, $ionicLoading, $rootScope) {
    })

    .controller('odh1NutrientPageController', function($scope, $ionicSideMenuDelegate, $http, $ionicLoading, $rootScope) {
        $ionicLoading.show({
            template: 'loading'
        })
        //get data only if null
        if  ($rootScope.flagNutrientData)
        {
            $ionicLoading.hide();
        }
        else
        {
            $http.get($rootScope.urlapi + "/api/nutrient_value_api").success(function(data) {
                    $ionicLoading.hide();
                    $rootScope.flagNutrientData = true;
                    $rootScope.apiNutrientValues = data.objects;
                }
            )
        }
    })

    .controller('odh1NutrientDetailsPageController', function($scope,$stateParams,$rootScope, $ionicLoading) {

        for(var i=0; i<$rootScope.apiNutrientValues.length; i++) {
            loop: { // label
                if ($rootScope.apiNutrientValues[i].nvid === parseInt($stateParams.nvId)) {
                    $scope.detNutrient = $rootScope.apiNutrientValues[i];
                    break loop;
                }
            }
        }
        console.log($scope.detNutrient);
    })

    .controller('odh1BmiPageController', function($scope, $ionicSideMenuDelegate, $http, $ionicLoading, $rootScope) {
    })


// for akp1 app





// end for akp1 app
;



