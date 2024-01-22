'use client'

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function login() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const [error, setError] = useState();

    const router = useRouter();

    const sendLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn('credentials', {
                email,
                senha,
                redirect: false,
            });

            if (res.error) {
                setError('Dados inválidos');
                return;
            }

            router.replace('perfil');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={sendLogin}>
                <input type='email' name='email' id='email' placeholder='email' onChange={e => setEmail(e.target.value)}/>
                <input type='text' name='password' id='password' placeholder='password' onChange={e => setSenha(e.target.value)}/>
                <button type='submit'>Entrar</button>

                { error && (
                    <p>{ error }</p>
                )}
            </form>
        </>
    )
}