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
 document.getElementById(id).innerHTML=rH+":"+rM+":"+rS;
}

var attributes=sessionStorage.getItem("attributes");
if (attributes==null) { var attributes=[null,null,null,null]; }
attributes=attributes.split(",")
function select(row, column){
 var z = document.getElementsByTagName("tr");
 for(x=0;x<z.length;x++){
  var a=z[x].getElementsByTagName("td");
  for(y=0;y<a.length;y++){
   if (a[y].id.match(column)){
    a[y].style.backgroundColor="#000000";}}}

document.getElementById("Z").rows[row].cells[column].style.backgroundColor="#33819e";

attributes[column]=document.getElementById("Z").rows[row].cells[column].innerHTML;}

function saveEvent()
{
 addList=""
 for(x=0;x<attributes.length;x++){
  if(attributes[x]==null || attributes[x]==""){ return }
  else { addList+=attributes[x]+"," }}
 var startTime=sessionStorage.getItem("startTime");
 addList+=startTime+","

 var eCount=parseInt(sessionStorage.getItem("eCount"));
 if (isNaN(eCount)) { var eCount=0 }
 eCount+=1
 addList+=eCount+";"
 sessionStorage.setItem("eCount", eCount);
 
 var addedList=sessionStorage.getItem("addedList");
 if (addedList==null) { var addedList="" }
 addedList+=addList
 sessionStorage.setItem("addedList", addedList);
 sessionStorage.removeItem("attributes");
 sessionStorage.removeItem("rEvent");
 sessionStorage.removeItem("startTime");
 location.href="event_list.html"
}

function backEvent()
{
 sessionStorage.setItem("attributes", attributes)
 var rEvent=document.getElementById("Z").innerHTML;
 sessionStorage.setItem("rEvent", rEvent);
 location.href="event_list.html"
}
var rEvent=sessionStorage.getItem("rEvent")
if (!(rEvent==null)){
 document.getElementById("Z").innerHTML=rEvent;
}

function deleteEvent()
{
 sessionStorage.removeItem("attributes");
 sessionStorage.removeItem("rEvent");
 sessionStorage.removeItem("startTime");
 location.href="event_list.html"
}