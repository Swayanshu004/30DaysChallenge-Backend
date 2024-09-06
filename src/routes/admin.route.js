import express from "express"

const router = express.Router();
router
    .post('/signin',async(req, res)=>{
        
    })
router
    .post('/newChallenge',async(req, res)=>{
        
    })
router
    .post('/addTask/:challengeID',async(req, res)=>{
// query over collection model, add new task to the tasks Array       
    })
router
    .get('/adminData',async(req, res)=>{

    })
router
    .get('/alltask/:challenge',async(req, res)=>{

    })


export default router;