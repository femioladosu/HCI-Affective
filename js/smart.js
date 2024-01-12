$(document).ready(function () {
  $("#start").click(function () {
    document.getElementById("load").innerHTML = "Setting up camera. This may take some time. Please wait."
    async function face() {

      const MODEL_URL = '/models'
      //load models
      await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
      await faceapi.loadTinyFaceDetectorModel(MODEL_URL)
      await faceapi.loadFaceLandmarkModel(MODEL_URL)
      await faceapi.loadFaceRecognitionModel(MODEL_URL)
      await faceapi.loadFaceExpressionModel(MODEL_URL)
      await faceapi.loadAgeGenderModel(MODEL_URL)

      const video = document.getElementById("video");
      var playTime = 0;
      var endTime = 300;
      var counter = 0;

      let exp = [0,0,0,0,0,0,0];
      let maxexp = 0;

      //play video
      navigator.mediaDevices.getUserMedia({
        video: {},
      }).then((stream) => {
        video.srcObject = stream;
      });

      video.addEventListener("playing", () => {
        setInterval(async () => {

          document.getElementById("load").innerHTML = "Detecting Age and Gender....";
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
            .withAgeAndGender();
          let age = detections[0].age;
          let gender = detections[0].gender;  
          let expressions = detections[0].expressions;

          exp[0] = expressions.angry;
          exp[1] = expressions.disgusted;        
          exp[2] = expressions.fearful;
          exp[3] = expressions.happy;
          exp[4] = expressions.neutral;
          exp[5] = expressions.sad;
          exp[6] = expressions.surprised;
          maxexp = Math.max(...exp);
          
          settime();


          if (detections || (playTime >= 0) ) {
            
            
            settime();

            console.log("Less than endTime: ", playTime);

            if ( ( playTime%60 ) == 0) {

              console.log("Call emotionms: ");
              counter = 0;

              showage(age, gender);
              displayadd(age, gender);
            }
          }
        }, 500);
      });


      function settime(){
        var newVideo= document.getElementById("myvideo");
        newVideo.play();
        playTime = Math.round(newVideo.currentTime);

        setInterval(function(){
          console.log(newVideo.currentTime);
          playTime = Math.round(newVideo.currentTime);
          var unit= "seconds gone";
          document.getElementById("time").innerHTML= playTime+unit;
        },1000);
      }

      function whichExp(exp, maxexp) {
        let expressions = ["angry", "disgusted", "fearful", "happy", "neutral", "sad", "surprised"];
        let maxIndex = exp.indexOf(maxexp);
        return expressions[maxIndex];
      }



      //show age and gender
      function showage(age, gender) {
        document.getElementById("age").innerHTML = age
        document.getElementById("gender").innerHTML = gender
        document.getElementById("emotion").innerHTML = whichExp(exp,maxexp)
      }
      //display ads


      function displayadd(age, gender, expressions) {

        if ( (whichExp(exp,maxexp) == "angry") || (whichExp(exp,maxexp) == "disgusted") || (whichExp(exp,maxexp) == "fearful") || (whichExp(exp,maxexp) == "sad") ){
          if ( (age >= 20 && age <= 40) && (gender == "female") )
            document.getElementById("display").src = "../images/20to30m.jpg";

          else if ( (age >= 20 && age <= 40) && (gender == "male") )
            document.getElementById("display").src = "../images/mensale.jpg";

          else if ( (age > 40 && age <= 60) && (gender == "female") )
            document.getElementById("display").src = "../images/40to60.jpg";

          else if ( (age > 40 && age <= 60) && (gender == "male") )
            document.getElementById("display").src = "../images/40to60.jpg";

          else if ( (age > 60) && (gender == "male") )
            document.getElementById("display").src = "../images/60above.jpg";

          else if ( (age > 60) && (gender == "female") )
            document.getElementById("display").src = "../images/10to20f.jpg";

          else
            document.getElementById("display").src = "../images/below10.jpg";
        }


        if ( (whichExp(exp,maxexp) == "happy") || (whichExp(exp,maxexp) == "surprised") || (whichExp(exp,maxexp) == "neutral") ){
          if ( (age >= 20 && age <= 40) && (gender == "female") )
            document.getElementById("display").src = "../images/womenufc.png";

          else if ( (age >= 20 && age <= 40) && (gender == "male") )
            document.getElementById("display").src = "../images/10to20m.jpg";

          else if ( (age > 40 && age <= 60) && (gender == "female") )
            document.getElementById("display").src = "../images/30to40f.png";

          else if ( (age > 40 && age <= 60) && (gender == "male") )
            document.getElementById("display").src = "../images/ufc.jpg";

          else if ( (age > 60) && (gender == "male") )
            document.getElementById("display").src = "../images/harleyd.jpg";

          else if ( (age > 60) && (gender == "female") )
            document.getElementById("display").src = "../images/below10.jpg";

          else
            document.getElementById("display").src = "../images/digitalboard.png";

        }


      }

    }
    face()
  });
})
