import express from "express"
import "dotenv/config"
import { connectMongo } from "./DB/mongoDBconnect.js"
import { userRoute } from "./routers/userRoutes.js"
import { messagesRoute } from "./routers/messagesRoutes.js"

const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.use("/users", userRoute)
app.use("/messages", messagesRoute)



app.listen(PORT, () => {
    console.log(`Server running on http:localhost:${PORT}`);
});
