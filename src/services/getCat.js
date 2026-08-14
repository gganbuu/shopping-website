import { API_URL } from './config'

export const getCat = async (name) => {
    const url = `${API_URL}/adopt/${name}` 
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`)
        }
        const result = await response.json()
        return result;
    } catch (error) {
        console.error(error)
    }
}

export const getCats = async (names) => {
    const cats = [];
    for (let name of names) {
        let cat = await getCat(name);
        cats.push(cat);
    }
    return cats;
}