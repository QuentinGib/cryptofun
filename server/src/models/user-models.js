import { MongoServerSelectionError } from 'mongodb'
import mongoos, {mongo} from 'mongoose'
const { Schema } = moongose
const UserSchema = new Schema(
    {
        firstname: {
            type: String,
            required: [true,'Le prénom est manquant'],
            trim= true
        },
        lastname: {
            type: String,
            required: [true,'Le nom est manquant'],
            trim= true
        },
        email:{
            type: String,
            required: [true,"L'adresse email est manquante"],
            trim= true,
            lowercase: true,
            unique: true
        },
        login: {
            type: String,
            required: [true,"Le nom d'utilisateur est manquant"],
            trim= true
        },
        password: {
            type: String,
            required: [true,"Le mot de passe est manquant"],
            trim= true
        }
    }
)
export default MongoServerSelectionError.model('User',UserSchema)