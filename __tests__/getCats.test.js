import { getCats } from "../src/CardsContainer/getCat";

describe("getCats fn", () => {
    test("getCats fn returns milo correctly", async () => {
        const cats = ["Milo"]
        const result = await getCats(cats)
        expect(result[0].name).toBe("Milo")
    })
})