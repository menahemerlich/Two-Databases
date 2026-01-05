import express from "express"
import { authentication } from "../middleware/authentication.js"
import { db } from "../DB/mongoDBconnect.js"
import { ObjectId } from "mongodb"


export const messagesRoute = express.Router()

messagesRoute.post("/", authentication, async (req, res) => {
    if (req.body && Object.keys(req.body).every(key => ["username", "password", "content"].includes(key)) && Object.keys(req.body).length === 3 && typeof req.body.username === "string" && typeof req.body.password === "string" && typeof req.body.content === "string"){
        req.body.createdAt = new Date().toISOString()
        req.body.updatedAt = new Date().toISOString()
        const result  = await db.collection("messages").insertOne(req.body)
        res.status(200).json({id: result.insertedId})
    } else {
        res.status(400).send("missind data")
    }
})

messagesRoute.get("/", authentication, async (req, res) => {
    const data = await db.collection("messages").find().sort({"createdAt": 1}).toArray()
    res.status(200).json(data)
})

messagesRoute.get("/user/:username", authentication, async (req, res) => {
    const {username} = req.params
    if (req.headers.username === username){
        const data = await db.collection("messages").find({username: {$eq: username}}).toArray()
        res.status(200).json(data)
    } else {
        res.status(400).send("You do not have access to this information.")
    }
})

messagesRoute.put("/:id", authentication, async (req, res) => {
    if (req.body && req.body.content && typeof req.body.content === "string"){
        const {id} = req.params
        const {username} = req.headers
        await db.collection("messages").updateOne({ $and: [{_id: new ObjectId(id)}, {username: {$eq: username}}]}, {$set: {content: req.body.content, updatedAt: new Date().toISOString()}})
        res.status(200).json({message: "Message updated successfully"})
    } else {
        res.status(400).send("missind data")
    }
})
