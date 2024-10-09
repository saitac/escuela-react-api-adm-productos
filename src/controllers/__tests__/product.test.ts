import request from "supertest";
import { server } from "../../server";

describe("POST /api/products", () => {   
    it("should display validation errors", async () => {
        const response = await request(server).post("/api/products").send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
    });

    it("should create a new product", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Mouse - Testing",
            price: 50
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("data");
        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("errors");
    });

    it("should validate that the price is greater than 0", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Mouse - Testing",
            price: 0
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);
        expect(response.status).not.toBe(404);
    });

    it("should validate that the price is greater than 0", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Mouse - Testing",
            price: "hola"
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(2);
        expect(response.status).not.toBe(404);
    })
});

describe("GET /api/products", () => {
    
    it("Should check if api/products url exists", async () => {
        const response = await request(server).get("/api/products").send();
        expect(response.status).not.toBe(404);
    });

    it("GET a JSON response with products", async () => {
        const response = await request(server).get("/api/products").send();
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch("/json");
        expect(response.body).toHaveProperty("data");
        expect(response.body).not.toHaveProperty("errors");
    });
});

describe("GET /api/products/:id", () => {
    it("Should return a 404 response for a non-existent product", async () => {
        const productId = 2000;
        const response = await request(server).get(`/api/products/${productId}`).send();
        expect(response.status).toBe(404);
    });
})