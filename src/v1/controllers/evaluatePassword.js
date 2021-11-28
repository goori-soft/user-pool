const parseBool = require('../utils/parseBool')
const requiresSpecials = parseBool(process.env.PASSWORD_REQUIRES_SPECIALS)
const requiresNumber = parseBool(process.env.PASSWORD_REQUIRES_NUMBER)
const requiresUpperCase = parseBool(process.env.PASSWORD_REQUIRES_UPPSERCASE)
const requiresLowerCase = parseBool(process.env.PASSWORD_REQUIRES_LOWERCASE)
const requiresStrength = process.env.PASSWORD_REQUIRES_STRENGTH || 0

const hasLowerCase = (txt)=> txt.toUpperCase() != txt
const hasUpperCase = (txt)=> txt.toLowerCase() != txt
const hasNumber = (txt)=> /\d/.test(txt)
const hasSpecials = (txt)=> txt.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) ? true : false
const countUniqueChars = (txt)=>{
    txt = txt.split('')
    txt = new Set(txt)
    return txt.size
}

module.exports = (password)=>{
    let strength = 0
    let errors = []
    let success = false
    if(password){
        const passHasSpecials = hasSpecials(password)
        const passHasNumber = hasNumber(password)
        const passHasUpperCase = hasUpperCase(password)
        const passHasLowerCase = hasLowerCase(password)
        const length = password.length
        const uniques = countUniqueChars(password)

        if (requiresSpecials && !passHasSpecials) errors.push(`Password requires special characters`)
        if (requiresNumber && !passHasNumber) errors.push(`Password requires number`)
        if (requiresUpperCase && !passHasUpperCase) errors.push(`Password requires upper case characters`)
        if (requiresLowerCase && !passHasLowerCase) errors.push(`Password requires lower case characters`)

        if(passHasSpecials) strength++
        if(passHasNumber) strength++
        if(passHasUpperCase) strength++
        if(passHasLowerCase) strength++
        if(length >= 6) strength++
        if(length >= 8) strength++
        if(length >= 10) strength++
        if(length >= 14) strength++
        if(length >= 20) strength++
        if(uniques/length > 0.5) strength++
        if(uniques/length > 0.8 && length >= 8) strength++
        if(uniques/length > 0.6 && length >= 10) strength++
        if(uniques/length > 0.5 && length >= 14) strength++
        if(uniques/length > 0.4 && length >= 20) strength++
        strength -= 2
        if(strength < 0) strength = 0
        if(strength > 10) strength = 10

        if(strength < requiresStrength) errors.push(`Password requires strength level ${requiresStrength}, but ${strength} was reached`)
    }
    else{
        errors.push(`Password is not defined`)
    }

    if (errors.length <= 0) success = true

    return {
        strength,
        errors,
        success
    }
}