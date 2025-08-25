import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management Platform API",
      version: "1.0.0",
      description: "API documentation for Task Management Platform",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js", "./controllers/*.js", "./swagger/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
