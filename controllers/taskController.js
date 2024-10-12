async function task(user_id){ 
    console.log(`${user_id}-task completed at-${Date.now()}`) 
    // this should be stored in a log file 
} 

exports.taskController=(req,res)=>{
    const user_id=req.body.user_id
    task(user_id);
    res.send("Controller logic executed.")
}

