import express from "express"
import { Admin } from "../models/admin.model.js"
import { Challenge } from "../models/challenge.model.js"

const router = express.Router();
router
    .post('/signin',async(req, res)=>{
        const {emailId, password, adminName} = req.body;
        
        const existedAdmin = await Admin.findOne({
            $or: [{ emailId }]
        })
        if(existedAdmin){
            const checkpassword = await Admin.isPasswordCorrect(password);
            if(!checkpassword) {
                res.status(401).send("Incorrect Password ! !")
            }
            const token = jwt.sign({ 
                adminId: existedAdmin.id,
            }, process.env.JWT_SECRET_ADMIN)
            res.status(201).json({token});
        } else {
            const admin = await Admin.create({
                adminName,
                emailId,
                password
            })
            const token = jwt.sign({
                adminId: admin.id,
            }, process.env.JWT_SECRET_ADMIN)
            res.status(201).json({token});
        }
    })
router
    .post('/newChallenge',async(req, res)=>{
        
    })
router
    .post('/addTask/:challengeID',async(req, res)=>{
             
    })
router
    .get('/adminData',async(req, res)=>{
        const adminId = req.adminId;
        const admin = await Admin.findOne({
            $or: [{ _id: adminId }]
        })
        if(!admin){
            res.status(401).send("No Admin Found ! !")
        }
        res.status(201).json({admin})
    })
router
    .get('/alltask/:challenge',async(req, res)=>{
        const challengeId = req.params.challenge;
        const challenge = await Challenge.findOne({
            $or: [{ _id: challengeId }]
        })
        if(!challengeId){
            res.status(201).json({challenge})
        }
    })


export default router;