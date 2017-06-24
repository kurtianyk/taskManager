app.controller('LoginController',function(Storage, API_URL, $http, $scope,$state, AuthTokenFactory){
    $scope.user={};

    $scope.login=function(email,password){
      $scope.loginError = null;
      var request_body = {"email":email,"password":password};
      $http.post(API_URL+'/login', request_body, {headers:{'Content-Type': 'application/json'}})
      .then(function(response){
              AuthTokenFactory.setToken(response.data.token);
              Storage.save('username',response.data.username);
              Storage.save('email',response.data.email);
              Storage.save('loggedIn',true);
              $state.go('tasks');
            },
            function(error){ $scope.loginError="Oops! Invalid email or password";});
    }
});