import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import routes from "./routes.js";
import cookieParser from "cookie-parser";
import { auth } from "./middlewares/authMiddleware.js";
import { tempData } from "./middlewares/tempDataMiddlewares.js";
import expressSession from "express-session";

const app = express();

// DB set up
try {
  const uri = "mongodb://localhost:27017/Petstagram";
  await mongoose.connect(uri);

  console.log("DB connected!");
} catch (err) {
  console.log("Cannot connect to DB!");
  console.log(err.message);
}

// handlebars setup
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    runtimeOptions: {
      allowProtoMethodsByDefault: true,
    },
    helpers: {
      setTitle(title) {
        this.pageTitle = title;
      },
    },
  })
);

app.set("view engine", "hbs");
app.set("views", "./src/views");

// express setup
app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: "asdafsdsgfgf",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
  })
);
app.use(auth);
app.use(tempData);
app.use(routes);

app.listen(3000, () =>
  console.log("Server is listening on http://localhost:3000...")
);
