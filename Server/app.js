import express from "express";
import translate from "./routes/translateRoute.js";
import cors from "cors";

const app = express();
const port = 7000;

app.use(express.json());
app.use(cors());

app.use('/api/', translate);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})