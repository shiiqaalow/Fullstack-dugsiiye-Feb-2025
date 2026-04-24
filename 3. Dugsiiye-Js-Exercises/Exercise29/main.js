
async function fetchdata() {
    console.log(`start fetching data`);
    
    const response =await fetch("data.json");

    const data = await response.json();

    console.log(data);

}

fetchdata()