
async function getData() {
    console.log("before fetching data")   
    
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    const resultHolder = await response.json();

    console.log(resultHolder)
}

getData()