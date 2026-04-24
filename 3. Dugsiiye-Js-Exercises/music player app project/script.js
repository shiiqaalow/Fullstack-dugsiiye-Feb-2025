// Create audio element
const audioElement = document.createElement('audio');
document.body.appendChild(audioElement);

// Select DOM elements
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-bar');
const volumeSlider = document.getElementById('volume');
const speedSelect = document.getElementById('speed');

// Song data
const songs = [
    // https://soundcloud.com/soundhelix/sets/soundhelix-examples?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing
    { title: 'Song One', artist: 'Artist fake', cover: 'https://via.placeholder.com/250/4CAF50/FFFFFF?text=1', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { title: 'Song One', artist: 'Artist One', cover: 'https://via.placeholder.com/250/4CAF50/FFFFFF?text=1', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { title: 'Song Two', artisxt: 'Artist Two', cover: 'https://via.placeholder.com/250/2196F3/FFFFFF?text=2', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { title: 'Song Three', artist: 'Artist Three', cover: 'https://via.placeholder.com/250/FFC107/FFFFFF?text=3', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { title: 'Song Four', artist: 'Artist Four', cover: 'https://via.placeholder.com/250/FFC107/FFFFFF?text=3', src: './Somewhere Only We Know (Lofi)_nZ8jMVmLM-Q.mp3' }
];

// Keep track of songs
let songIndex = 0;
let isPlaying = false;
let speed = 1;

// Update song details
function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audioElement.src = song.src;
}

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Play song
function playSong() {
    playBtn.querySelector('i').classList.remove('fa-play');
    playBtn.querySelector('i').classList.add('fa-pause');
    audioElement.play().catch(e => console.error("Error playing audio:", e));
    isPlaying = true;

}

// Pause song
function pauseSong() {
    playBtn.querySelector('i').classList.remove('fa-pause');
    playBtn.querySelector('i').classList.add('fa-play');
    audioElement.pause();
    isPlaying = false;
}

// Previous song
function prevSong() {
    pauseSong();
    setTimeout(() => {
        songIndex--;
        if (songIndex < 0) {
            songIndex = songs.length - 1;
        }
        loadSong(songs[songIndex]);
        playSong();
    }, 300);
}

// Next song
function nextSong() {
    pauseSong();
    setTimeout(() => {
        songIndex++;
        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }
        loadSong(songs[songIndex]);
        playSong();
    }, 300);
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (isNaN(duration)) return;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    
    // Update duration Element
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    
    // Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    audioElement.playbackRate = speed;
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioElement.duration;
    if (isNaN(duration)) return;
    const newTime = (clickX / width) * duration;

  // isFinite() is a JavaScript function that determines whether a value is a finite number. It returns true if the value is a number that is not positive infinity, negative infinity, or NaN (Not-a-Number).

    if (isFinite(newTime)) {
        audioElement.currentTime = newTime;
    }
}

// Event listeners
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audioElement.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audioElement.addEventListener('ended', nextSong);

// Change volume
volumeSlider.addEventListener('input', (e) => {
    audioElement.volume = e.target.value;
});

// Change speed
speedSelect.addEventListener('change', (e) => {
    speed =  parseFloat(e.target.value);
    audioElement.playbackRate = speed;
});

// Load metadata
audioElement.addEventListener('loadedmetadata', updateProgress);