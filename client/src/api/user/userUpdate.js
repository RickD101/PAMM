// user update backend API call
const userUpdate = async (req) => {
    try {
        const response = await fetch('/user/update', {
            method: 'PATCH',
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
        return {
            status: false,
            msg: 'The server failed to respond.'
        }
    }
}

export default userUpdate;