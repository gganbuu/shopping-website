export const getCat = async (name) => {
    const url = `http://localhost:3001/adopt/${name}` 
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response Status: ${response.stauts}`)
        }
        const reuslt = await response.json()
        return reuslt;
    } catch (error) {
        console.error(error)
    }
}