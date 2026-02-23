import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'University Group Enrollment API Documentation',
      version: '1.0.0',
      description: 'API documentation for the University Group Enrollment system, allowing students to enroll in groups for subjects. This documentation provides details on available endpoints, request/response formats, and error handling.',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/app.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);