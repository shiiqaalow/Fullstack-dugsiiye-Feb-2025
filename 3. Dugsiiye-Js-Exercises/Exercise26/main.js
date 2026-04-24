

// synchronous (blocking)


console.log(`===synchronous (blocking)===`);

function customerOrders() {
    alert("fetching the customer's order");
    return {name:`rice`,plate:`2plates`,table:5};
}

console.log(`starting the customer's order`);

const order = customerOrders();

console.log(`first oder`, order);

console.log(`the reception is closed untill the customer's order is fetched`);



//Asynchronous (non-blocking) 


console.log(`===Asynchronous (non-blocking)===`); 

function getCustomerOrders(callback) {
    setTimeout (() => {
        const order = {name:`piza`,size:`XL`, amount:4}
        callback(order)
    }, 2000)
}

getCustomerOrders (function(order) {
    console.log(`second order`, order);
})