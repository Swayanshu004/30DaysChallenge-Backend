import express from "express"
import { User } from "../models/user.model.js"
import { Challenge } from "../models/challenge.model.js"
import { upload } from "../middlewares/multer.middleware.js"
import { Enrollment } from "../models/enrollment.model.js";
import { Task } from "../models/task.model.js"

const router = express.Router();
router
    .post('/signin', upload.single('coverImage'), async(req, res)=>{
        let imageLocalPath;
        try {
            imageLocalPath = req.file.path;
        } catch (error) {
            console.error("no image found in req - ",error);
        }
        const cloudinaryLink = await uploadOnCloudinary(imageLocalPath);
        const profileImage = cloudinaryLink.url;
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
                profileImage,
                password
            })
            const token = jwt.sign({
                userId: user.id,
            }, process.env.JWT_SECRET_USER)
            res.status(201).json({token});
        }
    })
router
    .post('/register/:challengeId',async(req, res)=>{
        const enrollment = await Enrollment.create({
            challengeId: req.query.challengeId,
        })
        const updateUser = await User.updateOne(
            { _id: req.userId },
            { $push: { enrollments: enrollment._id } 
        })
        if(!updateUser){
            res.status(401).send("Error in updating User ! !")
        }
        res.status(201).json({updateUser})
    })
router
    .post('/verifyMCQ/:taskId',async(req, res)=>{
        const questions = req.body
        const task = await Task.findOne({
            $or: [{ _id: adminId }]
        })
        const mark = {}
        questions.map(async (item, index)=>{
            const taskQuestion = await task.questions.findOne({
                $or: [{ question: item.question }]
            })
            if(taskQuestion.options[taskQuestion.answer] === item.answer){
                mark = {...mark, index: 'True'}
            } else {
                mark = {...mark, index: 'False'}
            }
        })
        res.status(201).json({mark})
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