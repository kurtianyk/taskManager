app.controller('LogoutController',function(Storage,$scope,toaster,$state){

  $scope.logout=function(){
    Storage.remove('auth-token');
    Storage.remove('username');
    Storage.remove('email');
    Storage.remove('loggedIn');

    $state.go('index');
    toaster.pop('success',"Yup! you are logged out");
  }

});