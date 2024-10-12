const express=require("express")
const router=express.Router()

const controller=require('../../../controllers/taskController')

router.post("/v1/task",controller.taskController)

module.exports=router