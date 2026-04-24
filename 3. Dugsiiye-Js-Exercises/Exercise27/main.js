
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

examResult()

.then((result) => console.log( result))
.catch((result) =>console.log(result))