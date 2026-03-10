function atbash(char) {
    const alphabetLowercase = "abcdefghijklmnopqrstuvwxyz"
    const alphabetUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    return char.split("").map(char => {
        if (alphabetLowercase.includes(char)) {
            const index = alphabetLowercase.indexOf(char)
            return alphabetLowercase[25 - index]
        }

        if (alphabetUppercase.includes(char)) {
            const index = alphabetUppercase.indexOf(char)
            return alphabetUppercase[25 - index]
        }

        return char
    }).join("");
}


export default atbash;