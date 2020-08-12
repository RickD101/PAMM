const readCRUD = async (req) => {
    try {
        const response = await fetch('/crud/read', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        });
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export default readCRUD;