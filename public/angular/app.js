var app = angular.module('taskManagerApp', ['ui.router','toaster']).constant('API_URL', 'http://localhost:8000');

app.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
});

app.run(function($rootScope, AuthService, $state){
      $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
         if(toState.authenticate && toState.name !== 'login' && !AuthService.isLoggedIn()){
           event.preventDefault();
           $state.transitionTo('login');
         }
      });
});

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'templates/index.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller:'LoginController'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'templates/signup.html',
            controller:'SignupController'
        })
        .state('tasks', {
            url: '/tasks',
            templateUrl: 'templates/tasks.html',
            controller:'TaskController',
            authenticate: true
        })
      
});