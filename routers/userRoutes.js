import express from "express"
import { supabase } from "../DB/supabadeConnect.js"

export const userRoute = express.Router()

userRoute.post("/register", async (req, res) => {
    if (req.body && Object.keys(req.body).every(key => ["username", "password"].includes(key)) && Object.keys(req.body).length === 2 && typeof req.body.username === "string" && typeof req.body.password === "string"){
        const {error} = await supabase
            .from("users")
            .insert(req.body)
        if (!error){
            res.status(201).json({status:201, statusText:"Created"})
        } else {
            res.status(400).json(error)
        }
    } else {
        res.status(400).send("missind data")
    }
})

userRoute.post("/login", async (req, res) => {
    if (req.body && Object.keys(req.body).every(key => ["username", "password"].includes(key)) && Object.keys(req.body).length === 2 && typeof req.body.username === "string" && typeof req.body.password === "string"){
        const {username, password} = req.body
        const data = await supabase.from("users").select("*").eq("username", username).eq("password", password)
        const user = data.data        
        if (user.length > 0){
            res.status(200).send("You have successfully connected.")
        } else {
            res.status(404).send(`Username [${username}] not found.`)
        }
    } else {
        res.status(400).send("missing data")
    }
})