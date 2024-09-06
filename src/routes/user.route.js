import express from "express"

const router = express.Router();
router
    .post('/signin',async(req, res)=>{
        
    })
router
    .post('/register',async(req, res)=>{
//  
    })
router
    .post('/verifyMCQ',async(req, res)=>{
//  
    })
router
    .post('/verifyExcercise',async(req, res)=>{
//  
    })
router
    .post('/verifyTask',async(req, res)=>{
//  
    })
router
    .get('/allChallenge',async(req, res)=>{
//  
    })
router
    .get('/allTask/:challengeId',async(req, res)=>{
//  
    })
router
    .get('/userData',async(req, res)=>{
//  
    })


export default router;