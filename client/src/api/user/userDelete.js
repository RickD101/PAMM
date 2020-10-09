// get user status backend API call
const userDelete = async () => {
    try {
        const response = await fetch('/user/delete', {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'same-origin'
        });
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export default userDelete;