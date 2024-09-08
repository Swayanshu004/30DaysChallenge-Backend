import express from "express"
import { Admin } from "../models/admin.model.js"
import { Challenge } from "../models/challenge.model.js"
import { Task } from "../models/task.model.js"
import { Question } from "../models/question.model.js"
import { Resource } from "../models/resource.model.js"
import { Exercise } from "../models/exercise.model.js"
import { upload } from "../middlewares/multer.middlewares.js"; 


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
                profileImage,
                password
            })
            const token = jwt.sign({
                adminId: admin.id,
            }, process.env.JWT_SECRET_ADMIN)
            res.status(201).json({token});
        }
    })
router
    .post('/newChallenge', upload.single('coverImage'), async(req, res)=>{
        let imageLocalPath;
        try {
            imageLocalPath = req.file.path;
        } catch (error) {
            console.error("no image found in req - ",error);
        }
        const cloudinaryLink = await uploadOnCloudinary(imageLocalPath);
        const coverImage = cloudinaryLink.url;
        const { title, duration } = req.body;
        const adminId = req.adminId;
        const challenge = await Challenge.create({
            title,
            duration,
            coverImage,
            tasks: [],
            enrolledUserCount: 0,
            adminId
        })
        if(!challenge){
            res.status(401).send('some error while creating challenge ! !')
        }
        res.status(201).json({challenge})
    })
router
    .post('/addTask/:challengeId',  async(req, res)=>{
        const { title, questions, exercises, resources } = req.body;
        const questionObj = [];
        questions.map(async (item, index)=>{
            const newQuestion = await Question.create({
                question: item.question,
                option: [...item.options],
                answer: item.answer
            })
            questionObj = [...questionObj, newQuestion._id]
        })
        const exerciseObj = [];
        exercises.map(async (item, index)=>{
            const newExercise = await Exercise.create({
                question: item.question,
                answer: item.answer
            })
            exerciseObj = [...exerciseObj, newExercise._id]
        })

        const resourceObj = [];
        resources.map(async (item, index)=>{
            const newResource = await Resource.create({
                link: item.link,
                type: item.type
            })
            resourceObj = [...resourceObj, newResource._id]
        })
        const task = await Task.create({
            title,
            questions: [...questionObj],
            exercises: [...exerciseObj],
            resources: [...resourceObj],
            completed: []
        })
        if(!task) {
            res.status(401).send("Some Error in Creating Task ! !")
        }

        const challenge = await Challenge.updateOne(
            { _id: req.query.challengeId },
            { $push: { tasks: task._id } }
        )
        res.status(201).json({challenge})
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
            res.status(401).send("No Challenge Found ! !")
        }
        res.status(201).json({challenge})
    })


export default router;