'use client'

import { signOut } from "next-auth/react";

export default function perfil() {
    return (
        <>
            <h1>Perfil</h1>
            <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/login' })}>Log Out</button>
        </>
    )
}