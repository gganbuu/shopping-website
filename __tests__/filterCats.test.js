import { filterCats } from "../src/Shop/filterCats";

const milo   = { name: 'Milo',   breed: 'Tabby',             colour: 'Orange', price: 50, age: 2 };
const luna   = { name: 'Luna',   breed: 'Siamese',           colour: 'Grey',   price: 75, age: 4 };
const oliver = { name: 'Oliver', breed: 'British Shorthair', colour: 'Grey',   price: 90, age: 7 };

const cats = [milo, luna, oliver];

describe("test individual categories", () => {
    test("no filters", () => {
        const filters = {}
        const names = filterCats(cats, filters).map(cat => cat.name)
        expect(names).ToStrictEqual(["Milo", "Luna", "Oliver"])
    })
    test("test one breed - Siamese cats", () => {
        const filters = {
            breeds: ['Siamese']
        }
        const names = filterCats(cats, filters).map(cat => cat.name)
        expect(names).toStrictEqual(["Luna"])
    })
    test("test two breeds - Siamese OR Tabby cats", () => {
        const filters = {
            breeds: ['Siamese', 'Tabby']
        }
        const names = filterCats(cats, filters).map(cat => cat.name)
        expect(names).toStrictEqual(["Milo","Luna"])
    })
    test("test one colour - Grey cats", () => {
        const filters = {
            colours: ['Grey']
        }
        const names = filterCats(cats, filters).map(cat => cat.name)
        expect(names).toStrictEqual(["Luna", "Oliver"])
    })

    test("test price lowerbound", () => {
        const filters = { 
            price: {min: 89, max: null}
        }
        const names = filterCats(cats, filters).map(cat => cat.name)
        expect(names).toStrictEqual(['Oliver'])
    })

    test("test price upperbound", () => {
        const filters = { 
            price: {min: null, max: 50}
        }
        const names = filterCats(cats, filters).map(cat => cat.name)
        expect(names).toStrictEqual(['Milo'])
    })

    test("test price both bounds", () => {
        const filters = { 
            price: {min: 60, max: 80}
        }
        const names = filterCats(cats, filters).map(cat => cat.name)
        expect(names).toStrictEqual(['Luna'])
    })

    test("test age lowerbound", () => {
        const filters = { 
            age: {min: 7, max: null}
        }
        const names = filterCats(cats, filters).map(cat => cat.name)
        expect(names).toStrictEqual(['Oliver'])
    })

    test("test age upperbound", () => {
        const filters = { 
            age: {min: null, max: 2}
        }
        const names = filterCats(cats, filters).map(cat => cat.name)
        expect(names).toStrictEqual(['Milo'])
    })

    test("test age both bounds", () => {
        const filters = { 
            age: {min: 3, max: 6}
        }
        const names = filterCats(cats, filters).map(cat => cat.name)
        expect(names).toStrictEqual(['Luna'])
    })
})

describe("test multiple categories", () => {
    test("one breed, one colour -> Siamese AND Orange cats", () => {
        const filters = { 
            breeds: ['Siamese'],
            colours: ['Orange']
        }
        const names = filterCats(cats, filters).map(cat => cat.name)
        expect(names).toStrictEqual([])
    })

    test("two breed, one colour -> (Tabby OR Siamese) AND Grey cats", () => {
        const filters = {
            breeds: ["Tabby", "Siamese"],
            colours: ["Grey"]
        }
        const names = filterCats(cats, filters).map(cat => cat.name)
        expect(names).toStrictEqual(['Milo', 'Luna', 'Oliver'])
    })

    test("price upperbound, one colour -> max $80 AND Grey cats", () => {
        const filters = {
            price: {min: null, max: 80},
            colours: ["Grey"]
        }
        const names = filterCats(cats, filters).map(cat => cat.name)
        expect(names).toStrictEqual(['Luna'])
    })

    test("price upperbound, age lowerbound -> max $80 AND min 3 y/o cats", () => {
        const filters = {
            price: {min: null, max: 80},
            age: {min: 3, max: null},
        }
        const names = filterCats(cats, filters).map(cat => cat.name)
        expect(names).toStrictEqual(['Luna', 'Oliver'])
    })
})