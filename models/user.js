import {model} from "mongoose"
import { stringify } from "querystring"

const User = model('User', {
    email:{
        type: string,
        required: true,
        unique: true,
        minLength: 3
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }

})

export default User