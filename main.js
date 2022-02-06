Webcam.set({
    width:350,
    height:300,
    Image_format:'png',
    png_quality:99
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture" src="'+data_uri+'">';
    });

}
prediction1="";
prediction2="";
console.log('ml5 version: ',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/_2E2NtrHC/model.json',modelLoaded);
function modelLoaded(){
    console.log('modelLoaded!!');  
}
function speak(){
    var synth=window.speechSynthesis;
    speak1="The first prediction is "+prediction1;
    speak2="Tha second prediction is "+prediction2;
    var utterThis=new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(utterThis);
}
function check(){
    IMG=document.getElementById("capture");
    classifier.classify(IMG,gotresult);
}
function gotresult(error,results){
    if (error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result-1").innerHTML=results[0].label;
        document.getElementById("result-2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(results[0].label=="happy"){
            document.getElementById("emoji-1").innerHTML="&#128522;";
        }
        if(results[0].label=="sad"){
            document.getElementById("emoji-1").innerHTML="&#128532;";
        }
        if(results[0].label=="angry"){
            document.getElementById("emoji-1").innerHTML="&#128548;";
        }
        if(results[0].label=="disgust"){
            document.getElementById("emoji-1").innerHTML="&#129314;";
        }
        if(results[1].label=="happy"){
            document.getElementById("emoji-2").innerHTML="&#128522;";
        }
        if(results[1].label=="sad"){
            document.getElementById("emoji-2").innerHTML="&#128532;";
        }
        if(results[1].label=="angry"){
            document.getElementById("emoji-2").innerHTML="&#128548;";
        }
        if(results[1].label=="disgust"){
            document.getElementById("emoji-2").innerHTML="&#129314;";
        }
    }
}