import express from "express"
import { Creator } from "../models/creator.model.js"

const router = express.Router();
router
    .post('/signin',async(req, res)=>{
        const {emailId, password, creatorName} = req.body;
        
        const existedCreator = await Creator.findOne({
            $or: [{ emailId }]
        })
        if(existedCreator){
            const checkpassword = await Creator.isPasswordCorrect(password);
            if(!checkpassword) {
                res.status(401).send("Incorrect Password ! !")
            }
            const token = jwt.sign({ 
                creatorId: existedCreator.id,
            }, process.env.JWT_SECRET_CREATOR)
            res.status(201).json({token});
        } else {
            const creator = await Creator.create({
                creatorName,
                emailId,
                password
            })
            const token = jwt.sign({
                creatorId: creator.id,
            }, process.env.JWT_SECRET_CREATOR)
            res.status(201).json({token});
        }
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