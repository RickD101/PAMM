const generateWorkOrders = async (period)=>{
    try{
        const response = await fetch('/work/generate', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({period: period})
        });
        const data = await response.json();
        return data;
    }
    catch(err){
        console.log(err);
    }
}

export default generateWorkOrders;