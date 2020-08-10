// user login backend API call
const userLogin = async (req) => {
    try {
        const response = await fetch('/user/login', {
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
        return {
            status: false,
            msg: 'An error occured while calling the API.'
        }
    }
}

export default userLogin;