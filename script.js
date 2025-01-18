let video = document.querySelector("video");
let player = document.querySelector(".player");
let playPauseBtn = document.querySelector(".media-controls .play");
let currentTimeDisplay = document.querySelector(".current-time");
let totalTimeDisplay = document.querySelector(".total-time");
let progress = document.querySelector(".progress-area");
let progressBar = document.querySelector(".progress-bar");
let volume = document.querySelector(".volume-area");
let volumeBar = document.querySelector(".volume-bar");
let volumeText = document.querySelector(".volume-media span");
let rewindBtn = document.querySelector(".controls .rewind");
let forwardBtn = document.querySelector(".controls .forward");
let fullScreenBtn = document.querySelector(".full-screen");
let settingBtn = document.querySelector(".setting");
let preferences = document.querySelector(".preferences");
let volumeBtn = document.querySelector("#vol");
let volumeMedia = document.querySelector(".volume-media");
let speedBtn = document.querySelector(".speed-btn");
let speedBackBtn = document.querySelector(".back");
let speedOptions = document.querySelector(".speed-options");
let playbackMedia= document.querySelector(".playback-media");
let volumeIconBtn = document.querySelector(".volume-media .volume-icon");
let uploadBtn = document.querySelector("#upload");
let uploadInput = document.querySelector("#uploadInput");
let picInPicBtn = document.querySelector("#picInPic");

// keyboard shortcuts
document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
        playPause();
    } else if (e.key === "ArrowLeft") {
        video.currentTime -= 5;
    } else if (e.key === "ArrowRight") {
        video.currentTime += 5;
    } else if (e.key === "f") {
        fullScreenBtn.click();
    } else if (e.key === "m") {
        volumeIconBtn.click();
    } else if (e.key === "Escape") {
        if (fullscreen) {
            fullScreenBtn.click();
        }
    }
});

// Info: Play & Pause Button Functionality

playPauseBtn.addEventListener("click", () => {
    if (video.paused) {
        video.play();
        playPauseBtn
            .querySelector("i")
            .classList.replace("fa-play", "fa-pause");
    } else {
        video.pause();
        playPauseBtn
            .querySelector("i")
            .classList.replace("fa-pause", "fa-play");
    }
});

function playPause() {
    if (video.paused) {
        video.play();
        playPauseBtn
            .querySelector("i")
            .classList.replace("fa-play", "fa-pause");
    } else {
        video.pause();
        playPauseBtn
            .querySelector("i")
            .classList.replace("fa-pause", "fa-play");
    }
}
// Info: Time Formatting Functionality

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
    return `0${minutes}:${seconds}`;
}

// Info: Video Loaded Functionality

window.addEventListener("load", () => {
    totalTimeDisplay.textContent = formatTime(video.duration);
});

// Info: Video Rewind & Forward Functionality

rewindBtn.addEventListener("click", () => {
    video.currentTime -= 5;
});

forwardBtn.addEventListener("click", () => {
    video.currentTime += 5;
});

// Info: Video Time Update Functionality

video.addEventListener("timeupdate", () => {
    currentTimeDisplay.textContent = formatTime(video.currentTime);
    let value = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${value}%`;
});

function timeLoad(){
    totalTimeDisplay.textContent = formatTime(video.duration);
}

// Info: Progress Bar Click Functionality

progress.addEventListener("click", (e) => {
    let width = e.target.clientWidth;
    video.currentTime = (e.offsetX / width) * video.duration;
});

// Info: Progress Bar Drag Functionality

let mousedown = false;
progress.addEventListener("mousedown", () => {
    mousedown = true;
});
progress.addEventListener("mouseup", () => {
    mousedown = false;
});
progress.addEventListener("mousemove", (e) => {
    if (mousedown) {
        let width = e.target.clientWidth;
        video.currentTime = (e.offsetX / width) * video.duration;
    }
});

// Info: Full Screen Button Functionality

let fullscreen = false;
fullScreenBtn.addEventListener("click", () => {
    let icon = fullScreenBtn.querySelector("i");
    if (!fullscreen) {
        player.requestFullscreen();
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="minimize" class="lucide lucide-minimize"><path d="M8 3v3a2 2 0 0 1-2 2H3"></path><path d="M21 8h-3a2 2 0 0 1-2-2V3"></path><path d="M3 16h3a2 2 0 0 1 2 2v3"></path><path d="M16 21v-3a2 2 0 0 1 2-2h3"></path></svg>`;
    } else {
        document.exitFullscreen();
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="Maximize" id="full-screenID" class="lucide lucide-Maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3"></path><path d="M21 8V5a2 2 0 0 0-2-2h-3"></path><path d="M3 16v3a2 2 0 0 0 2 2h3"></path><path d="M16 21h3a2 2 0 0 0 2-2v-3"></path></svg>`;
    }
    fullscreen = !fullscreen;
});

// Info: Preferences Button Functionality

settingBtn.addEventListener("click", () => {
    preferences.classList.toggle("active");
    if (volumeMedia.classList.contains("active")) {
        volumeMedia.classList.remove("active");
    }
});

// Info: Volume Medias Functionality

volumeBtn.addEventListener("click", () => {
    volumeMedia.classList.toggle("active");
    if (preferences.classList.contains("active")) {
        preferences.classList.remove("active");
    }
    volumeMediaTimeout = setTimeout(() => {
        volumeMedia.classList.remove("active");
    }, 4000);
});



volume.addEventListener("click", (e) => {
    let value = e.offsetX / volume.clientWidth;
    video.volume = value;
    volumeText.textContent = `${Math.floor(value * 100)}%`;
    volumeBar.style.width = `${value * 100}%`;
});


// Video muted functionality

let muted = false;
let prevVolume = 1;
volumeIconBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="Volume2" id="vol" class="lucide lucide-Volume2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><path d="M16 9a5 5 0 0 1 0 6"></path><path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path></svg>`;
volumeIconBtn.addEventListener("click", () => {
    if (!muted) {
        prevVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = "0%";
        volumeText.textContent = "0%";
        volumeIconBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="volume-x" id="vol" class="lucide lucide-volume-x"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><line x1="22" x2="16" y1="9" y2="15"></line><line x1="16" x2="22" y1="9" y2="15"></line></svg>`;
    } else {
        video.volume = prevVolume;
        volumeBar.style.width = `${prevVolume * 100}%`;
        volumeText.textContent = `${Math.floor(prevVolume * 100)}%`;
        volumeIconBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="Volume2" id="vol" class="lucide lucide-Volume2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><path d="M16 9a5 5 0 0 1 0 6"></path><path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path></svg>`;
    }
    muted = !muted;
});

uploadInput.addEventListener("change", () => {
    let file = uploadInput.files[0];
    let reader = new FileReader();
    reader.onload = () => ((video.src = reader.result), playPause(),
    video.addEventListener('loadedmetadata', () => {
        timeLoad();
      })
);
    reader.readAsDataURL(file);
    settingBtn.click();
});

// picture in picture functionality
picInPicBtn.addEventListener("click", () => {
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    } else {
        video.requestPictureInPicture();
    }
});

// Info: Volume Medias Functionality

let isHoveringVolume = false;

volume.addEventListener("mouseenter", () => {
    isHoveringVolume = true;
});

volume.addEventListener("mouseleave", () => {
    isHoveringVolume = false;
});

volume.addEventListener("click", (e) => {
    let value = e.offsetX / volume.clientWidth;
    updateVolume(value);
});

let volumeMousedown = false;
volume.addEventListener("mousedown", () => {
    volumeMousedown = true;
});
volume.addEventListener("mouseup", () => {
    volumeMousedown = false;
});
volume.addEventListener("mousemove", (e) => {
    if (volumeMousedown) {
        let value = e.offsetX / volume.clientWidth;
        updateVolume(value);
    }
});

// Scroll functionality for volume bar
document.addEventListener("wheel", (e) => {
    if (isHoveringVolume) {
        e.preventDefault(); // Prevent page scrolling
        const delta = e.deltaY;
        const currentVolume = video.volume;
        let newVolume = currentVolume - (delta * 0.001); // Adjust 0.001 for sensitivity

        // Ensure volume stays within 0-1 range
        newVolume = Math.max(0, Math.min(1, newVolume));
        
        updateVolume(newVolume);
    }
});

function updateVolume(value) {
    video.volume = value;
    volumeText.textContent = `${Math.floor(value * 100)}%`;
    volumeBar.style.width = `${value * 100}%`;

    // Update mute button icon based on volume
    if (value === 0) {
        volumeIconBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="volume-x" id="vol" class="lucide lucide-volume-x"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><line x1="22" x2="16" y1="9" y2="15"></line><line x1="16" x2="22" y1="9" y2="15"></line></svg>`;
        muted = true;
    } else {
        volumeIconBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="Volume2" id="vol" class="lucide lucide-Volume2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><path d="M16 9a5 5 0 0 1 0 6"></path><path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path></svg>`;
        muted = false;

    }
}

// Info: Playback Speed Functionality

speedBtn.addEventListener('click', ()=>{
    playbackMedia.classList.add('active');
})
speedBackBtn.addEventListener('click', ()=>{
    playbackMedia.classList.remove('active');
})

speedOptions.querySelectorAll('li').forEach(option=>{
    option.addEventListener('click', ()=>{
        video.playbackRate = parseFloat(option.dataset.speed);
        speedOptions.querySelector(".active").classList.remove('active');
        option.classList.add('active');
    })
})
