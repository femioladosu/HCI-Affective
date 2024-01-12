/*$(document).ready(function () {

  window.addEventListener('DOMContentLoaded', (event) => {
    const videoPlayer = document.getElementById('videoPlayer');

    // Set the video source
    const videoSource = "../Videos/20170415_100302.mp4";
    videoPlayer.src = videoSource;

    // Play the video
    videoPlayer.play();
  });

})    */



 function settime(){
      var newVideo= document.getElementById("myvideo");
      newVideo.play();
      console.log(newVideo.currentTime);
      setInterval(function(){
        console.log(newVideo.currentTime);
        var unit= "seconds";
        document.getElementById("time").innerHTML= Math.round(newVideo.currentTime)+unit;
        },1000);
    }