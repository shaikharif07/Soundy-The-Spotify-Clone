console.log("Welcome to Soundy");

//import sound from '../assets/sound.mp3'

//initialize the variable
let songIndex =0;
let audioElement = new Audio('../songs/5.mp3');
let masterplay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:"Let her go", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName:"Gumaan", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName:"Night Changes", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName:"Attention", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName:"Khanabadosh", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName:"We don't Talk Anymore", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName:"No Love", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},

]

songItems.forEach((element, i)=>{
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})

// audioElement.play()

//Handle play, pause
masterplay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove("fa-play-circle");
        masterplay.classList.add("fa-pause-circle");
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove("fa-pause-circle");
        masterplay.classList.add("fa-play-circle");
        gif.style.opacity=0;
    }
})

//listen to event
audioElement.addEventListener('timeupdate', ()=>{
    // console.log("timeupdate");
    //update seekbar
    progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    // e.target.classList.add('fa-pause-circle');
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click' ,(e)=>{
        // console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`songs/${songIndex+1}.mp3`; 
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterplay.classList.remove("fa-play-circle");
        masterplay.classList.add("fa-pause-circle");
    })   
})

document.getElementById("next").addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`; 
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterplay.classList.remove("fa-play-circle");
    masterplay.classList.add("fa-pause-circle");
})

document.getElementById("prev").addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`; 
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterplay.classList.remove("fa-play-circle");
    masterplay.classList.add("fa-pause-circle");
})