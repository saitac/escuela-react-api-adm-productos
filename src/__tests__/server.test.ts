
describe("nuestro primer test", () => {
    test("debe revisar que 1 + 1 sea igual a 2", () => {
        expect(1+1).toBe(2)
    })

    test("debe revisar que 1 + 1 no sea 3", () => {
        expect(1+1).not.toBe(3)
    })
})