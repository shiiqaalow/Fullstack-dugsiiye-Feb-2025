
// promises

function examResult () {
    return new Promise ((resolve , reject) => {
        setTimeout(()=> {

            const success = false;
            if (success) {

                resolve(`Mr X is passed the Exam!`);
            }
            else {
                reject(`Mr X is failed the Exam!`);
            }
        },2000)
    })
}


async function displayUserData() {
    try {
        const user = await examResult();
        console.log(user);
    }
    catch(error) {
        console.log(error)
    }
   
}

displayUserData ();