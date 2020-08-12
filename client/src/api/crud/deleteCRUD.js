const deleteCRUD = async (req)=>{
    try{
        const response = await fetch('/crud/delete', {
            method: 'DELETE',
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

export default deleteCRUD;