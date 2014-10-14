if (sessionStorage.getItem("questionNumber")===null || sessionStorage.getItem("questionNumber")===undefined){
        sessionStorage.setItem("questionNumber", -1);
}
var recAnswer=0;
var checked="";
var userName="";
var password="";
var JSON;
var questions=[{
        "question": "This is a TEST",
        "answers": ["Miranda v. Arizona", "Roe v. Wade", "Gonzalez v. Carhart", "Planned Parenthood v. Casey"],
        "correct": "b",
        "givenAns": 0
}];
var title="A";

function generateNamePage(){//generate name page
    if (JSON.recentUser === undefined){
            JSON.recentUser = "";
    }
    $("#questions").append('<form><h>Username: </h><input type="text" name="Name" value="'+JSON.recentUser+'"/><br><h>Password: </h><input type="text" name="Pass"/><br><br><input type="button" value="Login" onClick = "login(this.form)"/><input type="button" value="Sign Up" onClick = "signup(this.form)"/></form>');
}


jQuery(document).ready(function () {
         $.getJSON("quiz.json", function( data ) {

               JSON = data;
                questions=JSON.questions;
                title=JSON.title;
             $("#numCorrect").text(title);
         });
       
        JSON.recentUser = localStorage["recentUser"];
        if (sessionStorage.getItem("questionNumber")>-1){
                $("#questions").remove();
                $("#numCorrect").after("<br/><div id='questions' class='Question'>"+generateQ()+"</div>");
                $(".Question").fadeIn();
        }
        else {
                generateNamePage();//generate name page on page load)
        }
       
       //JSON.users=JSON.parse(localStorage["users"]);
       //JSON.scores=JSON.parse(localStorage["scores"]);
        
});


function generateQ() {//generates next question
    var questionNumber = Number(sessionStorage.getItem("questionNumber"));
    var inputs ='';
    var j=0;
    givenAns = sessionStorage.getItem("Q"+questionNumber+" Answer");
    while(j<questions[questionNumber].answers.length){
        if (questions[questionNumber].answers[j]==givenAns) {
            checked="checked";
        }//check box if user already answered
        else {
            checked="";
        }
        inputs += '<input type="radio" name="Answer" value="' + questions[questionNumber].answers[j]+'" '+checked+'/><label>' + questions[questionNumber].answers[j] + '</label><br/>';
        j++;
    }//generate inputs
    var stdForm = '<form><h>' + questions[questionNumber].question+'</h></center><br/><br/>' + inputs+'<center><br/>';//generate question + inputs
    if (questionNumber>0){
        stdForm+='<input type="button" value="Prev" id = "Prev" onClick="getAnswerNext(this.form, false)">';
    }//generate prev button
    if(questionNumber<questions.length-1){
        stdForm+='<input type="button" value="Next" id = "Next" onClick="getAnswerNext(this.form, true)"></form>';
    }//generate next button
    else{
        stdForm+='<input type="button" value="Submit Quiz" id = "Submit Quiz" onClick="submitQuiz(this.form)"></form>';
    }//generate submit quiz button
    return stdForm;
}//generateQ



function login(form){//user submits name
    userName=form.elements[0].value;//get name, store it in var
    password=form.elements[1].value;
    if (JSON.users.hasOwnProperty(userName)){
            if (JSON.users[userName] === password){
                if (JSON.recentUser != userName){
                            for (var i =0; i<JSON.questions.length; i++){
                                    sessionStorage.removeItem("Q"+i+" Answer");//remove stored answers if different user
                            }
                }
                JSON.recentUser = userName;//save new user as recent one
                localStorage["recentUser"]=userName;
                $("#questions").remove();//remove name area
                sessionStorage.setItem("questionNumber", Number(sessionStorage.getItem("questionNumber"))+1);//go to next (first) question
                $("#numCorrect").after("<br/><div id='questions' class='Question'>"+generateQ()+"</div>");//add question to HTML
                $(".Question").fadeIn();//fade question in    
            }//rigght pw
            else{//wrong pw
                $(".wrongPW").remove();
                $("#questions").prepend('<h class="wrongPW"><i><center>Incorrect username/password combination!</center></i></h>')
            }
    }
    else{//user doesn't exist in system
        $(".wrongPW").remove();
        $("#questions").prepend('<h class="wrongPW"><i><center>Cannot find username in database. Please sign up before attempting to log in.</center></i></h>')
    }
            
   
}//login           

function signup(form){
    userName=form.elements[0].value;//get name, store it in var
    password=form.elements[1].value; 
    if (JSON.users.hasOwnProperty(userName)){
            $(".wrongPW").remove();
            $("#questions").prepend('<h class="wrongPW"><i><center>Username already taken!</center></i></h>');
    }
    else{
            JSON.users[userName]=password;
            localStorage.users=(JSON.users);
    }
}


function submitQuiz(form){
    $(".Question").hide();
    var correctNumbers = [];
    var incorrectNumbers = [];
    for (var i=0; i<form.Answer.length; i++){
        if (form.Answer[i].checked){
            recAnswer=form.Answer[i].value;
        }//save answer to variable
    }
    //questions[questionNumber].givenAns=recAnswer;//save answer to JSON
    sessionStorage.setItem("Q"+sessionStorage.getItem("questionNumber")+" Answer", recAnswer);//save last answer to sessionstorage
    sessionStorage.setItem("questionNumber", Number(sessionStorage.getItem("questionNumber"))+1);
    $("#questions").remove();
    
    for (var j=0; j<questions.length; j++){
        if (questions[j].givenAns == questions[j].correct){
            correctNumbers[correctNumbers.length]=j;//array of correct
        }
        else{
            incorrectNumbers[incorrectNumbers.length]=j;//array of incorrect
        }
    }
    
    var correctNums = '';
    for (var j=0; j<correctNumbers.length; j++){
        correctNums+="<a title='Question: "+questions[correctNumbers[j]].question + "\nAnswer: "  +questions[correctNumbers[j]].correct+"'>#"+correctNumbers[j]+1+"</a> ";//create tooltip correct
    }
    var incorrectNums = '';
    for (var j=0; j<incorrectNumbers.length; j++){
        incorrectNums+="<a title='Question: "+questions[incorrectNumbers[j]].question + "\nYour Answer: " +questions[incorrectNumbers[j]].givenAns + "\nCorrect Answer: "  +questions[incorrectNumbers[j]].correct+"'>#"+incorrectNumbers[j]+1+"</a>  ";//create tooltip incorrect
    }
    
    $("#numCorrect").after("<div id='questions'><h4>Great job, "+userName+"!</h4><p><i>(Hover over question number to see the question, your answer, and the correct answer...</i></p><font color='#11EE11'><h3>Questions Answered Correctly ("+correctNumbers.length+" total, " + Math.round(correctNumbers.length/(correctNumbers.length+incorrectNumbers.length)*100) + "%):<br/> "+correctNums +"</h3></font><font color='#D95B43'><h3>Questions Answered Incorrectly ("+incorrectNumbers.length+" total, " + Math.round(incorrectNumbers.length/(correctNumbers.length+incorrectNumbers.length)*100) + "%):<br/> "+incorrectNums +"</h3></font></div>");//display correct and incorrect answers
    var myColor = ["#11EE11","#D95B43"];
    var myData = [correctNumbers.length,incorrectNumbers.length];
    plotData(myColor, myData);
    $(".Question").fadeIn();

    
    
}//submitQuiz


//adapted form http://html5.litten.com/graphing-data-in-the-html5-canvas-element-part-iv-simple-pie-charts/
function getTotal(myData){
    var myTotal = 0;
    for (var j = 0; j < myData.length; j++) {
    myTotal += (typeof myData[j] == 'number') ? myData[j] : 0;
    }
    return myTotal;
}

function plotData(myColor, myData) {
    var canvas;
    var ctx;
    var lastend = 0;
    var myTotal = getTotal(myData);

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < myData.length; i++) {
        ctx.fillStyle = myColor[i];
        ctx.beginPath();
        ctx.moveTo(200,150);
        ctx.arc(200,150,150,lastend,lastend+
          (Math.PI*2*(myData[i]/myTotal)),false);
        ctx.lineTo(200,150);
        ctx.fill();
        lastend += Math.PI*2*(myData[i]/myTotal);
    }
}
/////////////





function getAnswerNext(form, isNext) {//record answer, get next Q
    for (var i=0; i<form.Answer.length; i++){
        if (form.Answer[i].checked){
            recAnswer=form.Answer[i].value;
        }//save answer to variable
    }
    //questions[questionNumber].givenAns=recAnswer;//save answer to JSON
    sessionStorage.setItem("Q"+Number(sessionStorage.getItem("questionNumber"))+" Answer", recAnswer);//save answer to sessionStorage
    if (recAnswer!=0 || isNext!=true){//if answer was submitted or previous question accessed, switch questions
        $("#questions").remove();
        if (isNext==true){//if next
                 sessionStorage.setItem("questionNumber", Number(sessionStorage.getItem("questionNumber"))+1);
        }
        else{//if previous
                sessionStorage.setItem("questionNumber", Number(sessionStorage.getItem("questionNumber"))-1);
        }
        $("#numCorrect").after("<br/><div id='questions' class='Question'>"+generateQ()+"</div>");
        $(".Question").fadeIn();
    }
    recAnswer=0;
}//getAnswerNext


