// package imports
import React, { useEffect } from 'react'

export default function Reports() {
    useEffect(() => {
        document.title = 'PAMM: Reports Menu';
    }, []);

    return (
        <h1>Reports</h1>
    )
}