const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
musicAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressBar = wrapper.querySelector('.progress-bar'),
progressArea = wrapper.querySelector('.progress-area'),
showMoreBtn = wrapper.querySelector(""),
hideMusicBtn = wrapper.querySelector("")

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

musicAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime/duration)*100;
    progressBar.style.width =  `${progressWidth}%`;
    let musicCurrentTime = wrapper.querySelector(".current-time")
    let musicDuration = wrapper.querySelector(".max-duration")

    musicAudio.addEventListener("loadeddata", ()=>{ 
       
        
        // update total duration
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration/60)
        let totalSec = Math.floor(audioDuration%60)
        if (totalSec < 10){
            totalSec = `0${totalSec}`
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`
    })

    //update current duration
    let currentMin = Math.floor((currentTime)/60)
    let currentSec = Math.floor((currentTime)%60)
    if (currentSec < 10){
        currentSec = `0${currentSec}`
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`
})   

// update song based on progress bar

progressArea.addEventListener("click", (e)=>{
    let progressWidthval = progressArea.clientWidth
    let clickedOffSetX = e.offsetX
    let songDuration = musicAudio.duration

    musicAudio.currentTime = (clickedOffSetX/progressWidthval) * songDuration
    playMusic()

})

//working on repeat button

const repeatBtn = wrapper.querySelector('#repeat-plist')
repeatBtn.addEventListener("click", ()=>{
    let getText = repeatBtn.innerText

    switch(getText){
        case "repeat":
            repeatBtn.innerText = "repeat_one"
            repeatBtn.setAttribute("title", "Song Looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle"
            repeatBtn.setAttribute("title", "Playlist shuffle")
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat"
            repeatBtn.setAttribute("title", "Playlist looped")
            break;
    }
})

//make repeat button work
musicAudio.addEventListener("ended", ()=>{
    let getText = repeatBtn.innerText;

    switch(getText){
        case "repeat":
            nextMusic()
            break;
        case "repeat_one":
            musicAudio.currentTime=0
            loadMusic(indexNumb)
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random()*allMusic.length)+1)
            do{
                randIndex = Math.floor((Math.random()*allMusic.length)+1)
            }while(musicIndex==randIndex)
            musicIndex = randIndex;
            loadMusic(musicIndex)
            playMusic()
            break;
    }
})

