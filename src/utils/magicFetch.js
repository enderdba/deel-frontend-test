export const magicFetch = async (match, type) => new Promise((resolve) => {
    const arr = ["Sandwich", "Fried Egg", "Cheetos", "Beer", "Bananas", "Apple", "Curry", "Arepas", "Tacos"]

    const filtered = arr.filter(
        suggestion =>
            suggestion.toLowerCase().indexOf(match.toLowerCase()) > -1
    )
    console.log("Ficticious fetch running!", filtered)
    setTimeout(() => { resolve(filtered) }, 230)

})

export const realFetch = async () => {
    const users = await fetch('https://jsonplaceholder.typicode.com/users')
    const names = await users.json()

    return names.map(name => name.name)
}
