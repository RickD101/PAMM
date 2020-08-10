// package imports
import React, { useEffect } from 'react'

export default function Clients() {
    useEffect(() => {
        document.title = 'PAMM: Client Menu';
    }, []);

    return (
        <h1>Clients</h1>
    )
}