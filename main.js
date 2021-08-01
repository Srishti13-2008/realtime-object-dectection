img="";
status="";
object=[];
function setup(){
    canvas= createCanvas(640,420);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide()
    object_detector= ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelloaded(){
    console.log("modelloaded");
    status=true;
}
function gotresults(error,results){
if(error){
console.log(error)
}
else{
    console.log(results)
    object=results
}
}
function draw(){
    image(video,0,0,650,420)
if(status!=""){
    r=random(255)
    g=random(255)
    b=random(255)
    object_detector.detect(video,gotresults)
    for(i=0;i<object.length;i++){
        document.getElementById("status").innerHTML="status:Object detected";
        document.getElementById("number_of_objects").innerHTML="Number of objects detected are: "+object.length;
        fill(r,g,b)
        percent=floor(object[i].confidence*100);
        text(object[i].label+""+percent+"%",object[i].x+15,object[i].y+15);
        noFill();
        stroke(r,g,b)
        rect(object[i].x, object[i].y, object[i].width, object[i].height)
    }
}
}