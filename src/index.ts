import * as express from "express";
import router from "./adapters/http/routes/user.routes";
import { AppDataSource } from "./adapters/database/data-source";
import * as dotenv from "dotenv";
import * as cors from "cors";
import "reflect-metadata";
import { Middleware } from "./adapters/http/middleware/Middleware";
import { carRoutes } from "./adapters/http/routes/car.routes";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(Middleware.errorHandler);
app.use("/auth", router);
app.use("/api", carRoutes);
app.get("*", (req: express.Request, res: express.Response) => {
  res.status(404).json({ message: "Page not found" });
});
AppDataSource.initialize()
  .then(() => {
    console.log("database started!!!!!!!!!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
