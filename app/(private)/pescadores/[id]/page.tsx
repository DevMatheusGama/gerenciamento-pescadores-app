'use client'

import { useParams } from "next/navigation"

export default async function pescadorId() {
    const params = useParams()
    
    const id = params.id;

    return (
        <div>
            Pescador com id: {id}
        </div>
    )
}