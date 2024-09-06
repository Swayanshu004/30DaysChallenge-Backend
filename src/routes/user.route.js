import express from "express"
import { User } from "../models/user.model.js"
import { Challenge } from "../models/challenge.model.js"

const router = express.Router();
router
    .post('/signin',async(req, res)=>{
        const {emailId, password, userName} = req.body;
        
        const existedUser = await User.findOne({
            $or: [{ emailId }]
        })
        if(existedUser){
            const checkpassword = await User.isPasswordCorrect(password);
            if(!checkpassword) {
                res.status(401).send("Incorrect Password ! !")
            }
            const token = jwt.sign({
                userId: existedUser.id,
            }, process.env.JWT_SECRET_USER)
            res.status(201).json({token});
        } else {
            const user = await User.create({
                userName,
                emailId,
                password
            })
            const token = jwt.sign({
                userId: user.id,
            }, process.env.JWT_SECRET_USER)
            res.status(201).json({token});
        }
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
        const challenge = await Challenge.find()
        if(!challenge){
            res.status(401).send("No Challenge Found ! !")
        }
        res.status(201).json({challenge})
    })
router
    .get('/userData',async(req, res)=>{
        const userId = req.userId;
        const user = await User.findOne({
            $or: [{ _id: userId }]
        })
        if(!user){
            res.status(401).send("No User Found ! !")
        }
        res.status(201).json({user})
    })
router
    .get('/allTask/:challengeId',async(req, res)=>{
        const challengeId = req.params.challengeId;
        const challenge = await Challenge.findOne({
            $or: [{ _id: challengeId }]
        })
        if(!challenge){
            res.status(401).send("No Challenge Found ! !")
        }
        res.status(201).json({challenge})
    })


export default router;