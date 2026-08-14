// A cat is kept only if it satisfies every filter. Within a single filter the
// selections are OR'd (Siamese *or* Tabby); across filters they are AND'd
// (Siamese *and* grey *and* under £80).

// An empty selection means "no preference", not "match nothing".
const matchesSelection = (value, selected) =>
    selected.size === 0 || selected.has(value)

// A null bound means "no preference". It has to be null rather than 0,
// because 0 is a real price and a real age.
const withinRange = (value, { min, max }) =>
    (min == null || value >= min) &&
    (max == null || value <= max)

export const filterCats = (cats, filters) =>
    cats.filter(cat =>
        matchesSelection(cat.breed, filters.breeds) &&
        matchesSelection(cat.colour, filters.colours) &&
        withinRange(cat.price, filters.price) &&
        withinRange(cat.age, filters.age)
    )
