app.service('Storage', function($window){
  var store = $window.localStorage;
      
      return{
            getUsername: getUsername,
            setUsername: setUsername,
            getEmail: getEmail,
            setEmail: setEmail,
            getToken: getToken,
            getToken: getToken,
            remove:remove,
            save:save
      };

    function getUsername() {
      return store.getItem('username');
    }
    function setUsername(username) {
      return store.setItem('username', username);
    }
    function getEmail() {
      return store.getItem('email');
    }
    function setEmail(email) {
      return store.setItem('email', email);
    }
    function getToken() {
    	console.log(store.getItem('email'));
      return store.getItem('auth-token');
    }
    function setToken(token) {
      return store.setItem('token', token);
    }
    function remove(key){
      return store.removeItem(key);
    }
    function save(key,value){
      return store.setItem(key, value);
    }

});

app.service('AuthService',function($window){
     return{
       isLoggedIn:isLoggedIn
     };
     function isLoggedIn(){
       if($window.localStorage.getItem('loggedIn')){
         return true;
       }else{
         console.log("User is not logged in");
         return false;
       }
     }
});

app.service('UserService',function($http, API_URL, Storage){

      this.signup = function(user){
        return $http.post(API_URL+'/signup',user,{headers:{'Content-Type': 'application/json'}});
      };

      this.login = function(user){
        return $http.post(API_URL+'/login',user,{headers:{'Content-Type': 'application/json'}});
      };

      this.logout = function(){
         Storage.remove('auth-token');
         Storage.remove('username');
         Storage.remove('email');
         Storage.remove('loggedIn');
      };
});