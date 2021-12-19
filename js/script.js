const thePlaylist = document.querySelector(`#playlist`)
const theAudio = new Audio()

const songs = [
    `audio/Baby Boy .mp3`,
    `audio/Say my name.mp3`,
    `audio/Listen.mp3`
]
songs.forEach(function(song){
thePlaylist.innerHTML +=`<li>${song}</li>`
})