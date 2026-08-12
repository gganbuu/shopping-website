import { describe, it, expect } from "vitest";
import { filterCats } from "../src/Shop/filterCats";

const milo   = { name: 'Milo',   breed: 'Tabby',             colour: 'Orange', price: 50, age: 2 };
const luna   = { name: 'Luna',   breed: 'Siamese',           colour: 'Grey',   price: 75, age: 4 };
const oliver = { name: 'Oliver', breed: 'British Shorthair', colour: 'Grey',   price: 90, age: 7 };

const cats = [milo, luna, oliver];

// A fresh object every time — Sets are mutable, so a shared fixture
// would let one test leak into the next.
const noFilters = () => ({
  breeds:  new Set(),
  colours: new Set(),
  price:   { min: null, max: null },
  age:     { min: null, max: null },
});

const withFilters = (overrides) => ({ ...noFilters(), ...overrides });

const names = (result) => result.map(cat => cat.name);


describe("filterCats", () => {

  describe("with nothing selected", () => {
    it("returns every cat", () => {
      expect(filterCats(cats, noFilters())).toEqual(cats);
    });

    it("returns an empty array for an empty list", () => {
      expect(filterCats([], noFilters())).toEqual([]);
    });
  });


  describe("category filters (breed, colour)", () => {
    it("keeps only the selected breed", () => {
      const filters = withFilters({ breeds: new Set(['Siamese']) });
      expect(names(filterCats(cats, filters))).toEqual(['Luna']);
    });

    it("treats multiple selections within a category as OR", () => {
      const filters = withFilters({ breeds: new Set(['Siamese', 'Tabby']) });
      expect(names(filterCats(cats, filters))).toEqual(['Milo', 'Luna']);
    });

    it("keeps only the selected colour", () => {
      const filters = withFilters({ colours: new Set(['Grey']) });
      expect(names(filterCats(cats, filters))).toEqual(['Luna', 'Oliver']);
    });

    it("treats separate categories as AND", () => {
      const filters = withFilters({
        breeds:  new Set(['Siamese', 'British Shorthair']),
        colours: new Set(['Grey']),
      });
      expect(names(filterCats(cats, filters))).toEqual(['Luna', 'Oliver']);
    });

    it("returns nothing when the categories cannot both be satisfied", () => {
      const filters = withFilters({
        breeds:  new Set(['Tabby']),   // Milo
        colours: new Set(['Grey']),    // Luna, Oliver
      });
      expect(filterCats(cats, filters)).toEqual([]);
    });
  });


  describe("range filters (price, age)", () => {
    it("applies a lower bound on its own", () => {
      const filters = withFilters({ price: { min: 70, max: null } });
      expect(names(filterCats(cats, filters))).toEqual(['Luna', 'Oliver']);
    });

    it("applies an upper bound on its own", () => {
      const filters = withFilters({ price: { min: null, max: 80 } });
      expect(names(filterCats(cats, filters))).toEqual(['Milo', 'Luna']);
    });

    it("applies both bounds together", () => {
      const filters = withFilters({ price: { min: 60, max: 80 } });
      expect(names(filterCats(cats, filters))).toEqual(['Luna']);
    });

    it("includes cats sitting exactly on a bound", () => {
      const filters = withFilters({ price: { min: 50, max: 90 } });
      expect(names(filterCats(cats, filters))).toEqual(['Milo', 'Luna', 'Oliver']);
    });

    it("filters on age the same way", () => {
      const filters = withFilters({ age: { min: 3, max: 5 } });
      expect(names(filterCats(cats, filters))).toEqual(['Luna']);
    });

    it("distinguishes an unset bound from a bound of zero", () => {
      const free = { name: 'Free', breed: 'Tabby', colour: 'Orange', price: 0, age: 1 };
      const filters = withFilters({ price: { min: null, max: 0 } });
      expect(names(filterCats([...cats, free], filters))).toEqual(['Free']);
    });
  });


  describe("range and category filters combined", () => {
    it("requires a cat to satisfy all of them", () => {
      const filters = withFilters({
        colours: new Set(['Grey']),        // Luna, Oliver
        price:   { min: null, max: 80 },   // Milo, Luna
      });
      expect(names(filterCats(cats, filters))).toEqual(['Luna']);
    });
  });


  describe("purity", () => {
    it("does not mutate the cats it was given", () => {
      const before = JSON.stringify(cats);
      filterCats(cats, withFilters({ breeds: new Set(['Tabby']) }));
      expect(JSON.stringify(cats)).toBe(before);
    });

    it("returns a new array rather than the original", () => {
      const result = filterCats(cats, noFilters());
      expect(result).not.toBe(cats);
    });
  });

});
