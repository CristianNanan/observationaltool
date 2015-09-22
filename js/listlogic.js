var s = parseInt(sessionStorage.getItem("sa"));
var m = parseInt(sessionStorage.getItem("ma"));
var h = parseInt(sessionStorage.getItem("ha"));
if (isNaN(s)) { var s=0 }
if (isNaN(m)) { var m=0 }
if (isNaN(h)) { var h=0 }

rS=s
rM=m
rH=h

if (s < 10) { rS="0"+s }
if (m < 10) { rM="0"+m }
if (h < 10) { rH="0"+h }

document.getElementById("timer").innerHTML=rH+":"+rM+":"+rS;

var varVar=setInterval(function(){studyTimer()},1000);

function studyTimer()
{
 s=s+1

 if (s > 59) { s=0; m=m+1 }
 if (m > 59) { m=0; h=h+1 }

 rS=s
 rM=m
 rH=h
 sessionStorage.setItem("sa", s);
 sessionStorage.setItem("ma", m);
 sessionStorage.setItem("ha", h);

 if (s < 10) { rS="0"+s }
 if (m < 10) { rM="0"+m }
 if (h < 10) { rH="0"+h }

 document.getElementById("timer").innerHTML=rH+":"+rM+":"+rS;
}

function stopEvent(id)
{
 var stopTime=rH+":"+rM+":"+rS;
 document.getElementById(id).innerHTML=stopTime;
 var stopList=sessionStorage.getItem("stopList");
 if (stopList==null) { var stopList="" }
 stopList+=id+";"+stopTime+","
 sessionStorage.setItem("stopList", stopList);
}

function addEvent()
{
 var startTime=sessionStorage.getItem("startTime");
 if (startTime==null) { var startTime=rH+":"+rM+":"+rS; }
 sessionStorage.setItem("startTime", startTime);
 location.href="event_new.html"
}

var addedList=sessionStorage.getItem("addedList")
if (!(addedList==null)){
 var z=addedList.split(";")
 for(x=0;x<z.length-1;x++){
  var a=z[x].split(",")
  var table=document.getElementById("E");
  var row=table.insertRow(-1);
  row.className="clickable"
  var cell0 = row.insertCell(0).innerHTML=a[4];
  var cell1 = row.insertCell(1).innerHTML='<fake id="'+a[5]+'"><button id="'+a[5]+'" onclick="stopEvent(this.id)" style="width:90%; height:90%;">STOP</button></fake>';
  var cell2 = row.insertCell(2).innerHTML=a[0];
  var cell3 = row.insertCell(3).innerHTML=a[1];
  var cell4 = row.insertCell(4).innerHTML=a[2];
  var cell5 = row.insertCell(5).innerHTML=a[3];}}

var stopList=sessionStorage.getItem("stopList")
if (!(stopList==null)){
 var z=stopList.split(",")
 for(x=0;x<z.length-1;x++){
  document.getElementById(z[x].split(";")[0]).innerHTML=z[x].split(";")[1];}}