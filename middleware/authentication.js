import { supabase } from "../DB/supabadeConnect.js";

export async function authentication(req, res, next) {
    if (req.headers.username && req.headers.password){
        const {username, password} = req.headers
        const data = await supabase.from("users").select("*").eq("username", username).eq("password", password)
        const user = data.data        
        if (user.length > 0){
            next()
        } else {
            res.status(404).send(`Access blocked.`)
        }
    } else {
        res.status(400).send("missing data")
    }
}