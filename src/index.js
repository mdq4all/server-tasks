import app from "./app";
import connectDB from "./database";

connectDB();
app.listen(app.get("port"));
console.log("Server on port:", app.get("port"));
