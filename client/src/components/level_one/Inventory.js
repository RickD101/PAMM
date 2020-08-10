// package imports
import React, { useEffect } from 'react'

export default function Inventory() {
    useEffect(() => {
        document.title = 'PAMM: Inventory Menu';
    }, []);

    return (
        <h1>Inventory</h1>
    )
}