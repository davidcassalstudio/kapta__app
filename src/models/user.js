import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: [true, 'O nome de usuário é obrigatório'],
            unique: true,
            minLength: [3, 'Deve ter no mínimo 3 caracteres'],
            maxLength: [30, 'Deve ter no máximo 30 caracteres']
        },
        nome:{
            type: String,
            required: [true, 'O nome é obrigatório'],
            minLength: [5, 'Deve ter no mínimo 5 caracteres'],
            maxLength: [80, 'Deve ter no máximo 80 caracteres']
        },
        email:{
            type: String,
            required: [true, 'O e-mail é obrigatório'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Endereço de e-mail inválido'],
            unique: true,
            maxLength: [50, 'Deve ter no máximo 50 caracteres']
        },
        senha:{
            type: String,
            required: [true, 'A senha é obrigatória'],
            select: false
        },
        tipo:{
            type: String,
            enum: {
                values: ['free', 'pro']
            },
            default: 'free',
            required: [true, 'O tipo de usuário é obrigatório']
        }
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;