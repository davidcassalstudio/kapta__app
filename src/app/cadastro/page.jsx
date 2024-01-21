'use client'

import { useState } from "react"
import { useRouter } from "next/navigation";

export default function cadastro() {

    const [username, setUsername] = useState();
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const [error, setError] = useState('');

    const router = useRouter();

    const sendRegister = async (e) => {
        e.preventDefault();

        if (!username) {
            setError('Todos os campos são obrigatórios');
            return;
        }

        try {

            const resUserExists = await fetch('api/userExists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email
                }),
            })

            const { user } = await resUserExists.json();

            if (user) {
                setError('Este usuário já existe.');
                return;
            }

            const res = await fetch('api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    nome,
                    email,
                    senha
                }),
            })

            if (res.ok) {
                const form = e.target;
                form.reset;
                router.push('/login')
                console.log('Usuário criado')
            } else {
                console.log('Falha no registro do usuário')
            }
        } catch (error) {
            console.log('Erro durante o registro', error)
        }
    }

    return (
        <>
            <h1>Cadastro</h1>

            <form onSubmit={sendRegister}>
                <input type='text' name='username' id='username' placeholder='username' onChange={e => setUsername(e.target.value)}/>
                <input type='text' name='nome' id='nome' placeholder='nome' onChange={e => setNome(e.target.value)}/>
                <input type='email' name='email' id='email' placeholder='email' onChange={e => setEmail(e.target.value)}/>
                <input type='text' name='senha' id='senha' placeholder='senha' onChange={e => setSenha(e.target.value)}/>
                <button type='submit'>Cadastrar</button>
                { error && (
                    <p>{ error }</p>
                )}
            </form>
        </>
    )
}