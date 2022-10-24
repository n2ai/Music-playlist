const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
musicAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressBar = wrapper.querySelector('.progress-bar')

let musicIndex = 1;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
})

const loadMusic = (indexNumb)=>{
    musicName.innerHTML = allMusic[indexNumb-1].name
    musicArtist.innerHTML = allMusic[indexNumb-1].artist
    musicImg.src = `${allMusic[indexNumb-1].img}.jpg`
    musicAudio.src = `${allMusic[indexNumb-1].src}.mp3`

}

//Play Music
const playMusic = ()=>{
    wrapper.classList.add('pause');
    playPauseBtn.querySelector("i").innerText="pause"
    musicAudio.play()

}

const pauseMusic = ()=>{
    wrapper.classList.remove('pause')
    playPauseBtn.querySelector("i").innerText="play_arrow"
    musicAudio.pause()
}

const nextMusic = ()=>{
    musicIndex++;
    if(musicIndex>allMusic.length){
        musicIndex=1
    }else{
        musicIndex = musicIndex
    }
    loadMusic(musicIndex)
    playMusic() 
}

const prevMusic = ()=>{
    musicIndex--;
    if(musicIndex<1){
        musicIndex = allMusic.length-1
    }else{
        musicIndex = musicIndex
    }
    loadMusic(musicIndex)
    playMusic()
}

playPauseBtn.addEventListener("click", ()=>{
    const isMusicPlay = wrapper.classList.contains("pause")
    isMusicPlay ? pauseMusic() : playMusic()
})

nextBtn.addEventListener("click",nextMusic)

prevBtn.addEventListener("click", prevMusic)

progressBar.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime/duration)*100;
    progressBar.style.width =  `${progressWidth}%`;

    musicAudio.addEventListener("loadeddata", ()=>{
        let musicCurrentTime = wrapper.querySelector(".current-time")
        let musicDuration = wrapper.querySelector(".max-duration")
        
        
    })
})  