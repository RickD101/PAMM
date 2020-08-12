// create new user backend API call
const updateCRUD = async (req)=>{
    try{
        const response = await fetch('/crud/update', {
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
    catch(err){
        console.log(err);
    }
}

export default updateCRUD;