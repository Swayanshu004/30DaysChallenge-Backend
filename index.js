import 'dotenv/config'
import express from "express"
import userRoute from './routes/creator.route.js'
import adminRoute from './routes/brand.route.js'

const app = express()

app.use("/v0/creator", userRoute)
app.use("/v0/brand", adminRoute)