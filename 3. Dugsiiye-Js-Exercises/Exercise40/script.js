const video = document.querySelector("#video");
const videoName = document.querySelector(".video-name");
const artistName = document.querySelector(".artist-name");
const controlsContainer = document.querySelector(".controls-container");
const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress-bar");
const controls = document.querySelector(".controls");
const progress = document.querySelector(".progress");
const currentTimer = document.querySelector(".current-time");
const durationTime = document.querySelector(".duration-time");
const lockBtn = document.querySelector("#lockBtn");
const prevBtn = document.querySelector(".fa.solid.fa-step-backward");
const nextBtn = document.querySelector(".fa.solid.fa-step-forward");
const seekLeft = document.querySelector(".fa.solid.fa-backward");
const seekRight = document.querySelector(".fa.solid.fa-forward");
const playBtn = document.querySelector(".fa.solid.fa-play");
const pauseBtn = document.querySelector(".fa.solid.fa-pause");
const volumeSlider = document.querySelector("#volume");
const speedSelect = document.querySelector("#speed");



const videos = [
    { video: "./videos/1.mp4", surah: "1-Yuunis-a 📖", qari: "aburahman-mossad 🗣️"},
    { video: "./videos/2.mp4", surah: "2-Muzammil 📖", qari: "aburahman-mossad 🗣️"},
    { video: "./videos/3.mp4", surah: "3-Muzammil 📖", qari: "aburahman-mossad 🗣️"},
    { video: "./videos/4.mp4", surah: "4-Yuunis-b 📖", qari: "aburahman-mossad 🗣️"},
    { video: "./videos/5.mp4", surah: "5-Yuunis-c 📖", qari: "aburahman-mossad 🗣️"},
    { video: "./videos/6.mp4", surah: "6-Amma     📖", qari: "aburahman-mossad 🗣️"},
    { video: "./videos/7.mp4", surah: "7-Baqarah  📖", qari: "aburahman-mossad "},
    { video: "./videos/8.mp4", surah: "8-Ankabuut 📖", qari: "aburahman-mossad 🗣️"},
];


let videoIndex = 0;
let isPlaying = false;
let speed = 1;

let isLocked = false;

// Lock/unlock toggle
lockBtn.addEventListener("click", () => {
  isLocked = !isLocked;

  if (isLocked) {
    controlsContainer.classList.add("active");
    lockBtn.classList.add("locked");
    video.style.pointerEvents = "none"; // disable click on video
  } else {
    // Unlock: remove "active" class and re-enable video click
    controlsContainer.classList.remove("active");
    lockBtn.classList.remove("locked");
    video.style.pointerEvents = "auto";
  }
    //switching lock icons
  if(!controlsContainer.classList.contains("active")){
      lockBtn.classList.remove("fa-lock-open");
    lockBtn.classList.add("fa-lock");
  } else {
    lockBtn.classList.remove("fa-lock");
    lockBtn.classList.add("fa-lock-open");
  }
  
});


// hides the controls when ever you click on the video
video.addEventListener("click",hideControls)

function hideControls(){
    controlsContainer.classList.toggle("active");
    lockBtn .classList.toggle("active");
}

// autoplay next-video
video.addEventListener("ended",()=>{
    nextVideo()
})


function loadVideos(videos) {
    video.src = videos.video;
    videoName.textContent = videos.surah;
    artistName.textContent = videos.qari;
}

loadVideos(videos[videoIndex]);

playBtn.addEventListener("click",()=>{
    if(!isPlaying){
        playVideo()
    }else{
        pauseVideo()
    }
});

function playVideo(){
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
    isPlaying = true;
    video.play();
}

function pauseVideo(){
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
    isPlaying = false;
    video.pause();
}

nextBtn.addEventListener("click",nextVideo);

function nextVideo(){
    pauseVideo();
    setTimeout(() => {
        videoIndex ++;
        if(videoIndex > videos.length -1){
            videoIndex = 0;
        }
    loadVideos(videos[videoIndex]);    
    playVideo()
    }, 400);
}

prevBtn.addEventListener("click",prevVideo);

function prevVideo(){
    pauseVideo();
    setTimeout(() => {
        videoIndex --;
        if(videoIndex < 0 ){
            videoIndex = videos.length -1
        }  
    loadVideos(videos[videoIndex]);
    playVideo()
    }, 400);
}

video.addEventListener("timeupdate",updateProgress);

function updateProgress(e){
    const{duration,currentTime}= e.srcElement
    if(isNaN(duration)) return
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`

    // duration-Time
    const durationM = Math.floor(duration/60);
    const durationS = Math.floor(duration%60);

    if(durationS < 10){
        durationS = `0${durationS}`
    }

    durationTime.textContent = `${durationM}:${durationS}`;

    // current-Time
    const currentM = Math.floor(currentTime/60)
    let currentS = Math.floor(currentTime%60);

    if(currentS < 10){
        currentS = `0${currentS}`
    }

    currentTimer.textContent = `${currentM}:${currentS}`;
    
}

progressContainer.addEventListener("click",setProgress);

function setProgress(e){
    const width = this.clientWidth;
    const progressX = e.offsetX; // horizental progess 
    const duration = video.duration;
    if(isNaN(duration)) return;
    const newTime = (progressX / width) * duration;

    // isFinite() is a JavaScript function that determines whether a value is a finite number. It returns true if the value is a number that is not positive infinity, negative infinity, or NaN (Not-a-Number).

    if (isFinite(newTime)) {
        video.currentTime = newTime;
    }

}

seekRight.addEventListener("click",seekingRight);

function seekingRight(){
    // this allows to seek forward 5 seconds
    video.currentTime = Math.min(video.duration,video.currentTime + 5);
    updateProgress()
}

seekLeft.addEventListener("click",seekingLeft);

function seekingLeft(){
    // this allows to seek backward 5  till current time = 0 function stops
    video.currentTime = Math.max(0,video.currentTime - 5);
    updateProgress()
}

// Change volume
volumeSlider.addEventListener('input', (e) => {
    video.volume = e.target.value;
});

// Change speed
speedSelect.addEventListener('change', (e) => {
    speed =  parseFloat(e.target.value);
    video.playbackRate = speed;
});








// pauseBtn.addEventListener("click",pauseVideo);