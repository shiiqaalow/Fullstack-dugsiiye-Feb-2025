// Ask user for inputs

function setYourOwnStyle(){
    const img = document.querySelector("#img")
    const url = prompt("Enter the image URL:");
    img.setAttribute("src",url)


   
    const borderColor= prompt("Enter the border color in pixels:");
    const imgWidth = prompt("Enter the image width in pixels:");
    const imgHeight = prompt("Enter the image height in pixels:");
    const borderRadius = prompt("Enter the border radius in pixels:");

    img.style.border = `${borderColor}px`;
    img.style.width = `${imgWidth}px`;
    img.style.height = `${imgHeight}px`;
    img.style.borderRadius = `${borderRadius}px`;

}

