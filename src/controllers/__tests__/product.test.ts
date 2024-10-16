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
        expect(response.body).toHaveProperty("status");
        expect(response.body["status"]).toBe("error");
    });

    it("Should check a valid ID in the URL", async () => {
        const response = await request(server).get('/api/products/not-valid-url').send();
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body["errors"]).toHaveLength(1);
        expect(response.body["errors"][0]["msg"]).toBe("ID no válido");
    });

    it("get a JSON response for a single product", async () => {
        const response = await request(server).get('/api/products/1').send();
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
    });
});

describe("PUT /api/products/:id", () => {

    it("Should check a valid ID in the URL", async () => {
        const response = await request(server).get('/api/products/not-valid-url').send(
            {
                "name": "Monitor Curvo Actualizado 5",
                "price": 300,
                "availability": true
            }
        );
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body["errors"]).toHaveLength(1);
        expect(response.body["errors"][0]["msg"]).toBe("ID no válido");
    });

    it("Should display validation error messages when updating a product", async () => {
        const response = await request(server).put('/api/products/1').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body["errors"]).toBeTruthy();
        expect(response.body["errors"]).toHaveLength(5);

        expect(response.status).not.toBe(200);
        expect(response.status).not.toHaveProperty("data");
    });

    it("Should validate that the price is greater than 0", async () => {
        const response = await request(server).put('/api/products/1').send(
            {
                "name": "Monitor Curvo Actualizado 5",
                "price": -450,
                "availability": true
              }
        );
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body["errors"]).toBeTruthy();
        expect(response.body["errors"]).toHaveLength(1);

        expect(response.status).not.toBe(200);
        expect(response.status).not.toHaveProperty("data");
    });

    it("Should return a 404 for a non-existent product", async () => {
        const productId = 2000;
        const response = await request(server).put(`/api/products/${productId}`).send(
            {
                "name": "Monitor Curvo",
                "price": 300,
                "availability": true
              }
        );
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("status");
        expect(response.body["status"]).toBe("error");

        expect(response.status).not.toBe(200);
        expect(response.status).not.toHaveProperty("data");
    });

    it("Should update an existing product with valid data", async () => {
        const productId = 1;
        const response = await request(server).put(`/api/products/${productId}`).send(
            {
                "name": "Monitor Curvo updated",
                "price": 300,
                "availability": true
              }
        );
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        
        expect(response.status).not.toBe(400);
    });

});

describe("PATCH /api/products/:id", () => {
    it("Should return a 404 response for a non-existing product", async () => {
        const productId = 2000;
        const response = await request(server).patch(`/api/products/${productId}`).send();
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("status");
        expect(response.body["status"]).toBe("error");

        expect(response.status).not.toBe(200);
        expect(response.status).not.toHaveProperty("data");
    });

    it("Should update the product availability", async () => {
        const response = await request(server).patch('/api/products/1').send();
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body["data"]["availability"]).toBe(false);

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(400);

    });
})


describe("DELETE /api/products/:id", () => {

    it("Should check a valid ID", async () => {
        const response = await request(server).delete('/api/products/not-valid-url').send();
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body["errors"][0]["msg"]).toBe("ID no válido");
    });

    it("Should return a 404 response for a non-exist id", async () => {
        const productId = 2000
        const response = await request(server).delete(`/api/products/${productId}`).send();
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("status");
        expect(response.body["status"]).toBe("error");
        expect(response.status).not.toBe(200);
    });

    it("Should delete a product", async () => {
        const response = await request(server).delete('/api/products/1').send();
        expect(response.status).toBe(200);
        expect(response.status).not.toBe(400);
        expect(response.status).not.toBe(404);
    });
});