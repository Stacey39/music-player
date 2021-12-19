const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)
const secondsToMinutes = (sec) => {
  return `${Math.floor(sec / 60)}:${Math.round(sec % 60).toString().padStart(2, `0`)}`
}

const thePlaylist = $(`#playlist`)
const playOrPause = $(`#playOrPause`)
const playPrev = $(`#playPrev`)
const playNext = $(`#playNext`)
const trackVolume = $(`#trackVolume`)
const trackTime = $(`#trackTime`)
const trackProgress = $(`#trackProgress`)
const trackDuration = $(`#trackDuration`)



const theAudio = new Audio()
// const theSongname = document.querySelector(`#songname`)

const songs = [
    `audio/Baby Boy .mp3` ,
    `audio/Say my name.mp3` ,
    `audio/Countdown.mp3`,
    `audio/Best Thing I Never Had.mp3`,
    `audio/Heaven.mp3`,
    `audio/Single Ladies.mp3`,
    `audio/Love On Top.mp3`,
    `audio/Halo.mp3`,
    `audio/Me Myself and I .mp3`,
    `audio/Easy On Me .mp3`


    

]

let indexToPlay = 0
const loadUpSongByIndex = function(index){
    let wasPlaying = !theAudio.paused
    indexToPlay = index


    
    theAudio.src = songs[indexToPlay]
    $$(`.loaded`).forEach(ele => ele.classList.remove(`loaded`))

    
    $(`[data-index="${indexToPlay}"]`).classList.add(`loaded`)

    if (wasPlaying) {
        theAudio.play()
        playOrPause.textContent = `⏸`
      }
    }

const setVolume = function(vol) {
        theAudio.volume = vol
        trackVolume.value = theAudio.volume
      }
    
window.addEventListener(`load`,function(event){
   
    
playOrPause.addEventListener(`click`,(event) =>{
 
    if (theAudio.paused) {
        theAudio.play()
        playOrPause.textContent = `⏸`
        
    } else{
        theAudio.pause()
        playOrPause.textContent = `▶`
    }
})



const playNextSong = function(direction = 1) {
    let nextIndex = ((indexToPlay + direction) < 0) ? songs.length - 1
                  : ((indexToPlay + direction) > (songs.length - 1)) ? 0
                  : indexToPlay + direction
    
    loadUpSongByIndex(nextIndex)
  }

playPrev.addEventListener(`click`, (event) => {
    playNextSong(-1)
  })

  playNext.addEventListener(`click`, (event) => {
    playNextSong(1)
  })

  trackVolume.addEventListener(`input`, (event) => {
    setVolume(trackVolume.value)
  })

  theAudio.addEventListener(`canplaythrough`, (event) => {
    trackTime.textContent = secondsToMinutes(theAudio.currentTime)
    trackDuration.textContent = secondsToMinutes(theAudio.duration)
    trackProgress.value = 0
  })

  theAudio.addEventListener(`timeupdate`, (event) => {
    trackTime.textContent = secondsToMinutes(theAudio.currentTime)
    trackProgress.value = theAudio.currentTime / theAudio.duration
  })

  theAudio.addEventListener(`durationchange`, (event) => {
    trackDuration.textContent = secondsToMinutes(theAudio.duration)
    trackProgress.value = 0
  })



songs.forEach(function(song,index){
thePlaylist.innerHTML +=`<li class="song" data-index="${index}">${song}</li>`
})

thePlaylist.addEventListener(`click`, function(event) {
    
    
    const songClicked = event.target.closest(`.song`)

    
    if (!songClicked.matches(`.song`)) return 

 
    loadUpSongByIndex(songClicked.dataset.index)
})




loadUpSongByIndex(indexToPlay)

 setVolume(10)
})