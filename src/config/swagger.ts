import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    definition:{
        openapi: "3.0.0",
        info:{
            version:"1.0.0",
            title:"REST API Node.js / Express / TypeScript",
            description: "API Docs for Products"
        },
        tags:[
            {
                name: "Products",
                description: "API operations related to products"
            }
        ]
    },
    apis: [
        "./src/routers/general.ts"
    ]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;