const express = require("express")
const cors = require("cors")
const connectToMongo = require("./db")
const app = express();
const port = 5000;
connectToMongo()
app.use(express.json())
app.use(cors())
app.use("/api/auth", cors(), require("./routes/auth"));
app.use("/api/blog", cors(), require("./routes/blogs"));
// Redirect to the starting endpoint when the website is loaded
app.get('/', (req, res) => {
    res.redirect('/');
});
app.listen(port, () => {
    console.log(`Backend Running At Port http://localhost:${port}`)
})
