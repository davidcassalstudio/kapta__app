'use client'

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function perfil() {
    return (
        <>
            <h1>Perfil</h1>
            <button onClick={() => signOut()}>Log Out</button>
        </>
    )
}