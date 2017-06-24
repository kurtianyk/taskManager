app.controller('TaskController',function($http, Storage, $scope, toaster, $state, API_URL){
  $http.get(API_URL + "/tasks?email=" + Storage.getEmail()).then(function(response){
              $scope.tasks = response.data;
            },
            function(error){ $scope.tasksListEmpty = "You haven't tasks";
        });

  $scope.toggle = function(modalstate, id){
    $scope.modalstate = modalstate;
    switch (modalstate) {
      case 'add':
        $scope.form_title = "Add New Task";
        break;
      case 'edit':
        $scope.form_title = "Contact Detail";
        $scope.id = id;
        $http.get(API_URL + '/task/' + id).then(function(response){
              $scope.task = response.data;
            });
        break;
      default:
      break;
    }

    $('#myModal').modal('show');
  }

  $scope.share = function(id){
        $scope.form_title = "Share Your Task";
        $http.get(API_URL + '/task/' + id).then(function(response){
              $scope.task = response.data;
              
            });
    $('#myModal2').modal('show');
    }
    
    $scope.shareSave = function(){
    var url = API_URL + '/task/share';
    var method = 'POST';
    $scope.task.username = Storage.getUsername();
     
    $http({
      method: method,
      url: url,
      data: $scope.task,
      headers: {'Content-Type': 'application/json'}
    }).then(function(response){
      		location.reload();
        },function(error){
      		alert('This is embarassing. An error has occured. Please check the log for details');
        });
  }
  $scope.save = function(modalstate, id){
    var url = API_URL + '/add';
    var method = 'POST';
    if (modalstate === 'edit') {
      url = API_URL + "/update/" + id;
      method = 'PUT';
    }
    $scope.task.email = Storage.getEmail();
    $scope.task.token = Storage.getToken();
    $http({
      method: method,
      url: url,
      data: $scope.task,
      headers: {'Content-Type': 'application/json'}
    }).then(function(response){
      		location.reload();
        },function(error){
      		alert('This is embarassing. An error has occured. Please check the log for details');
        });
  }

  $scope.confirmDelete = function(id){
    var isConfirmDelete = confirm('Are you sure want this record?');
    if (isConfirmDelete) {
      $http({
        method: 'DELETE',
        url: API_URL + '/delete/' + id
      }).then(function(response){
      		location.reload();
        },function(error){ 
      		alert('Unable to delete');
        });

    }else{
      return false;
    }
  }



 });

