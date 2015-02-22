/**
 * Created by apushpan on 20/02/2015.
 */

angular.module('demo', ['ionic', 'demo.controllers'])
    //, 'demo.services'

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            setTimeout(function() {
                //navigator.splashscreen.hide();
            }, 100);
        });
    })

    .directive('ionSearch', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                getData: '&source',
                model: '=?',
                search: '=?filter'
            },
            link: function(scope, element, attrs) {
                attrs.minLength = attrs.minLength || 0;
                scope.placeholder = attrs.placeholder || '';
                scope.search = {value: ''};

                if (attrs.class)
                    element.addClass(attrs.class);

                if (attrs.source) {
                    scope.$watch('search.value', function (newValue, oldValue) {
                        if (newValue.length > attrs.minLength) {
                            scope.getData({str: newValue}).then(function (results) {
                                scope.model = results;
                            });
                        } else {
                            scope.model = [];
                        }
                    });
                }

                scope.clearSearch = function() {
                    scope.search.value = '';
                };
            },
            template: '<div class="item-input-wrapper">' +
            '<i class="icon ion-android-search"></i>' +
            '<input type="search" placeholder="{{placeholder}}" ng-model="search.value">' +
            '<i ng-if="search.value.length > 0" ng-click="clearSearch()" class="icon ion-close"></i>' +
            '</div>'
        };
    })

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        // odh1 = opendata h1 controller
        $stateProvider
            .state('odh1', {
                url : '/odh1',
                templateUrl : 'templates/odh1/odh1-abstract.html',
                abstract : true,
                controller : 'Odh1Controller'
            })
            .state('odh1.home', {
                url: '/home',
                views: {
                    'odh1': {
                        templateUrl: 'templates/odh1/odh1-home.html',
                        controller : 'odh1HomePageController'
                    }
                }
            })
            .state('odh1.childcare', {
                url: '/childcare',
                views: {
                    'odh1': {
                        templateUrl: 'templates/odh1/odh1-childcare.html',
                        controller : 'odh1ChildCarePageController'
                    }
                }
            })

            .state('odh1.childcareDetails', {
                url: "/childcareDetails/:ccId",
                views: {
                    'odh1' :{
                        templateUrl: "templates/odh1/odh1-childcareDetails.html",
                        controller:'odh1ChildCareDetailsPageController'
                    }
                }
            })

            .state('odh1.bmi', {
                url: '/bmi',
                views: {
                    'odh1': {
                        templateUrl: 'templates/odh1/odh1-bmi.html',
                        controller : 'odh1BmiPageController'
                    }
                }
            })
            .state('odh1.nutrient', {
                url: '/nutrient',
                views: {
                    'odh1': {
                        templateUrl: 'templates/odh1/odh1-nutrient.html',
                        controller : 'odh1NutrientPageController'
                    }
                }
            })

            .state('odh1.nutrientDetails', {
                url: "/nutrientDetails/:nvId",
                views: {
                    'odh1' :{
                        templateUrl: "templates/odh1/odh1-nutrientDetails.html",
                        controller:'odh1NutrientDetailsPageController'
                    }
                }
            })

            .state('odh1.help', {
                url: '/help',
                views: {
                    'odh1': {
                        templateUrl: 'templates/odh1/odh1-help.html',
                        controller : 'odh1HelpPageController'
                    }
                }
            })
            .state('odh1.settings1', {
                url: '/settings1',
                views: {
                    'odh1': {
                        templateUrl: 'templates/odh1/odh1-settings1.html',
                        controller : 'odh1HelpPageController'
                    }
                }
            })
            .state('odh1.datasource', {
                url: '/datasource',
                views: {
                    'odh1': {
                        templateUrl: 'templates/odh1/odh1-datasource.html',
                        controller : 'odh1HelpPageController'
                    }
                }
            })
        //akp1 ends

        // default route
        //$urlRouterProvider.otherwise('/odh1/home');

        //dev defaults
        $urlRouterProvider.otherwise('/odh1/home');
        //$urlRouterProvider.otherwise('/odh1/bmi');
        //$urlRouterProvider.otherwise('/odh1/childcare');

    }])
