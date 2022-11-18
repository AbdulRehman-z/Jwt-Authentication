import { app } from "./app.js";
import { connectDB } from "./config/mongoose.service.js";

const PORT = 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log("Server listening on port " + PORT);
});
