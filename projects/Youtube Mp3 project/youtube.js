
document.querySelector(".form").addEventListener("submit",async function(e){
    e.preventDefault();


    const query = document.querySelector("#input").value;
    const url = `https://youtube-v3-alternative.p.rapidapi.com/search?query=${query}&type=video`;

    const options = {
        method:"GET",
        headers:{
            "x-rapidapi-key": "7fda873889msh19464de9555d5f1p1443d7jsn82b0ae898f5d",
		    "x-rapidapi-host": "youtube-v3-alternative.p.rapidapi.com"
        }
    }


    try{
        const response = await fetch(url,options);
        const result = await response.json();
        
        displayVideo(result.data);
    }
    catch(err){
        console.error("invaid Request",err)
    }
})

function displayVideo(videos){
    const videoList = document.querySelector(".video-List");
    videoList.innerHTML = "";

    videos.forEach(video =>{
    const videoItem = document.createElement("div");
    videoItem.className = "video-item";
    videoItem.innerHTML = `
            <div class="video-thumbnail" 
                style = "
                    background-image: url(${video.thumbnail[0].url}); 
                    " >
                <div class="video-player-icon"><i class="fa-solid fa-play"></i></div>
            </div>
            <div class="video-info">
                <div class="video-title">${video.title}</div>
            </div>
            <div class="channel-title">${video.channelTitle}</div>
            <div class="post-info">
               <span>${formatNumber(video.viewCount)} Views</span> . 
                <span>${video.publishedText} </span>
            </diV>`;
    videoList.appendChild(videoItem)
    // adding videos click function;
    videoItem.addEventListener("click", ()=>openModal(video.videoId));

    })
}   
 
// displays video popup after been clicked;
function openModal(videoId){
    //  VideoId = videoId;
    const modal = document.querySelector("#video-modal");
    const videoPlayer = document.querySelector("#video-player");
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;

    videoPlayer.src = videoUrl;
    modal.style.display = "block";

    document.querySelector("#download-mp3").addEventListener("click", async function(){
    const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`;

    const options = {
        method:"GET",
        headers: {
        "x-rapidapi-key": "9452172446msh620b23d249c353fp16dad9jsn7b983901f89b",
        "x-rapidapi-host": "youtube-mp36.p.rapidapi.com"
        }
    }


        try{

        const response = await fetch(url,options);
        const result = await response.json();

        if(result.status === "ok"){
            window.location.href = result.link;
        }else{
            alert("Failed downloading video")
        }

    }catch(error){
        console.error("Failed downloading video",error)
    }
})

}

document.querySelector("#close-modal").addEventListener("click",closeModal);

function closeModal(){
    const modal = document.querySelector("#video-modal");
    const videoPlayer = document.querySelector("#video-player");

    videoPlayer.src = "";
    modal.style.display = "none" 
}


window.onclick = function(){
    const modal = document.querySelector("#video-modal");

    if(event.target === modal){
        closeModal()
    }
}



function formatNumber(num) {
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
        return num.toString();
    }
}
