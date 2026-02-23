import express, { Application } from 'express';

import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/error.middleware';
import routes from './routes/route';
import { swaggerSpec } from './config/swagger';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use("/", routes);

// Swagger Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api-docs-json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

/**
 * @openapi
 * /:
 *   get:
 *     summary: API Status Check
 *     tags:
 *       - General
 *     description: Returns a simple status message indicating that the API is working correctly.
 *     responses:
 *       200:
 *         description: API is working correctly.
 */
app.get("/", (req, res) => {
  res.send("Hello, World! API is working correctly.");
});

app.use(errorMiddleware);

export default app;