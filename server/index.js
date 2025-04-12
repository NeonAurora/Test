import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";
import { buyerRoute } from "./routes/buyerRoute.js";
import { sessionLogger } from "./middlewares/sessionMiddleware.js";
import { qualificationRoute } from "./routes/qualificationRoute.js";
import { buyerListRoute } from "./routes/buyerListRoute.js";
import { authRoute } from "./routes/authRoute.js";

const app = express();
const PORT = process.env.PORT || 8200;

// 1) Create __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2) Middleware setup
app.use(express.json());
app.use(cookieParser());

// CORS configuration for development
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);

// 3) Session middleware
app.use(
  session({
    secret: "strong_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,     // Not using HTTPS in development
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      sameSite: "lax",   // More lenient setting for development
    },
  })
);

// 4) CORS headers setup
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// 5) Middleware for logging session and request information
app.use(sessionLogger);

// 6) Serve static "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 7) API routes - Auth0 routes should come before other routes
app.use("/api/auth", authRoute); // Mount Auth0 routes
app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);
app.use("/api/buyer", buyerRoute);
app.use("/api/qualification", qualificationRoute);
app.use("/api/buyer-lists", buyerListRoute);

// 8) Start the server
app.listen(PORT, () => {
  console.log("Development environment");
  console.log("CORS allowed origin: http://localhost:5173");
  console.log("Uploads folder path:", path.join(__dirname, "uploads"));
  console.log(`Backend is running on port ${PORT}`);
});