import { connectDB } from "../server";
import db from "../config/db";

jest.mock("../config/db");

describe("connectDB", () => {
    it("Should handle database connection error", async() => {
        jest.spyOn(db, "authenticate")
            .mockRejectedValueOnce(new Error("Hubo un error al conectar a la BD"));
        const consoleSpy = jest.spyOn(console, "log");

        await connectDB();

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Hubo un error al conectar a la BD")
        );
    })
});




/*

describe("nuestro primer test", () => {
    test("debe revisar que 1 + 1 sea igual a 2", () => {
        expect(1+1).toBe(2)
    })

    test("debe revisar que 1 + 1 no sea 3", () => {
        expect(1+1).not.toBe(3)
    })
})

*/