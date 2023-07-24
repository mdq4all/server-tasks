import express from "express";
import taskRoutes from "./routes/tasks.routes";
import morgan from 'morgan';
import cors from 'cors';

const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
//routes
app.get("/", (req, res) => {
  res.json({ message: "Walcome tyo my application" });
});

app.use("/api/tasks", taskRoutes);

export default app;
