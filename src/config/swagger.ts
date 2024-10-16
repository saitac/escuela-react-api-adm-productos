import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    openapi: "6.2.8",
    swaggerDefinition:{
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