import { userModel } from "~/models/userModel"
import ApiError from "~/utils/apiError"
import { StatusCodes } from "http-status-codes"
import bcryptjs from "bcryptjs"
import {v4 as uuidv4} from "uuid"
import { pickUser } from "~/utils/formatter"

const createNew = async (reqBody) => {
    try {
        // Kiem tra email da ton tai trong he thong chua
        const existUser = await userModel.findOneByEmail(reqBody.email)
        if (existUser){
            throw new ApiError(StatusCodes.CONFLICT, 'Email already exist!')
        }
        // Tao data de luu vao db
        // Neu email abc@gmail.com thi se lay duoc la abc
        const nameFromEmail = reqBody.email.split('@')[0]
        const newUser = {
            email: reqBody.email,
            password: bcryptjs.hashSync(reqBody.password, 8),
            username: nameFromEmail,
            displayName: nameFromEmail,
            verifyToken: uuidv4()
        }
        const createdUser = await userModel.createNew(newUser)
        const getNewUser = await userModel.findOneById(createdUser.insertedId)

        // Gui email xac thuc
        const verifycationLink = `http://localhost:5173/account/verifycation?email=${getNewUser.email}&token=${getNewUser.verifyToken}`
        const customSubject = 'Please verify your email before using our services!'
        const htmlContent = `
        <h3>Here is your verifycation link:</h3>
        <h3>${verifycationLink}</h3>
        <h3>Sincerely,<br/> Minh Thieu </h3>
        `
        // return tra ve du lieu phia controller
        return pickUser(getNewUser)
    } catch (error) { throw error }
}

export const userService = {
    createNew
}