import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import User from "@/models/user";

export async function POST(req) {
    try {
        const {
            username,
            nome,
            email,
            senha
        } = await req.json();

        const hashedPassword = await bcrypt.hash(senha, 20);

        await connectToDB();
        await User.create({
            username,
            nome,
            email,
            senha: hashedPassword
        });

        console.log('Username', username);
        console.log('Nome', nome);
        console.log('Email', email);
        console.log('Senha', senha);
        // console.log('Tipo de usuário', tipo);

        return NextResponse.json({ message: 'Usuário registrado' }, { status:201 })
    } catch (error) {
        return NextResponse.json({ message: 'Ocorreu algum erro' }, { status:500 })
    }
}