var mongoose = require('mongoose');
var Task = mongoose.model('Task');

exports.getTask = function(req, res){
	Task.findOne({"_id" : req.params.id}, function(err, task){
		res.status(200).send(task);
	});
}

exports.addTask = function(req, res){
	var newTask = new Task();
  newTask._id = req.body.id;
	newTask.taskname = req.body.taskname;
	newTask.description = req.body.description;
	newTask.owner_email = req.body.email;
	
	newTask.save(function(err,savedTask){
       if(err){
         res.status(400).send('Error occurred while creating task');
       }else{
         res.status(200).send('Task created successfully');
       }
   });
}

exports.shareTask = function(req, res){
	var newTask = new Task();
	newTask.taskname = req.body.taskname;
	newTask.description = req.body.description;
	newTask.owner_email = req.body.email;
	newTask.created_by = req.body.username;
	
	newTask.save(function(err,savedTask){
       if(err){
         res.status(400).send('Error occurred while sharing task');
       }else{
         res.status(200).send('Task shared successfully');
       }
   });
}

exports.getTasks = function(req, res){
   Task.find({"owner_email":req.query.email},function(err, tasks){
     res.status(200).send(tasks);
   });
}

exports.updateTask = function(req, res){
	var id = req.params.id;
        Task.findOne({"_id":id}, function(err,task){
            if(err){
                res.status(404).send("Error Occurred");
            }
            else{
                if(!task){
                    res.status(404).send("No task found with id "+id);
                }
                else{
                  	task.taskname = req.body.taskname;
                    task.description = req.body.description;
				          	task.owner_email = req.body.email;

                    task.save(function(err, updatedTask){
                        if(err){
                            res.status(500).send("Error Occurred while updating record");
                        }
                        else{
                            res.status(200).send(updatedTask);
                        }
                    });
                }
            }
        });
}

exports.deleteTask = function(req,res){
    var id=req.params.id;
    Task.findOneAndRemove({"_id":id}, function(err){
        if(err){
            console.log("Error : "+err);
            return res.status(404).send("Task not found");
        }
        return res.status(200).send("Task deleted Successfully");
    });
}