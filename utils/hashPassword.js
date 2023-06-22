import bcrypt from "bcryptjs";

export const hashPass = async (password) => {
try{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
} catch(e){
    console.log(e)
}
}

export const comparePassWithDBPass = async (passFromFront, passFromDB) => {
    try{
        return await bcrypt.compare(passFromFront, passFromDB)
    } catch(e){
        console.log(e)
    }
}
