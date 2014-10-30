sessionStorage.setItem("questionNumber", -1);
var recAnswer=0;
var checked="";
var userName="";
var password="";
var JSON2;
var flickrJSON;
var urlList= new Array();
var users={};
var scores=new Array();
var questions=[{
        "question": "This is a TEST",
        "answers": ["Test", "Test123", "TEST", "Tesssst"],
        "correct": "b",
        "givenAns": 0
}];
var title="A";

function generateNamePage(){//generate name page
    if (JSON2.recentUser === undefined){
            JSON2.recentUser = "";
    }
    $("#questions").append('<form><h>Username: </h><input type="text" name="Name" value="'+JSON2.recentUser+'"/><br><h>Password: </h><input type="password" name="Pass"/><br><br><input type="button" value="Login" onClick = "login(this.form)"/><input type="button" value="Sign Up" onClick = "signup(this.form)"/></form>');
}


jQuery(document).ready(function () {
         JSON2=$.getJSON("quiz.json", function( data ) {

                JSON2 = data;
                questions=JSON2.questions;
                title=JSON2.title;
                $("#numCorrect").text(title);
                for (var i = 0; i<JSON2.questions.length; i++){
                        flickrJSON=$.getJSON("https://api.flickr.com/services/rest/?\u0026method=flickr.photos.search\u0026api_key=929b35554adaeba34d52745f880a6a66\u0026sort=relevance\u0026format=json\u0026nojsoncallback=1\u0026per_page=1\u0026tags="+JSON2.questions[i].tag, function(data){
                                flickrJSON=data;
                                var photo = flickrJSON.photos.photo[0];
                                urlList[i] = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+".jpg";
                                console.log(urlList[i]);
                        
                        });
              }
        });
         
       
        JSON2.recentUser = localStorage["recentUser"];
        generateNamePage();
        if (localStorage.getItem("users") != null && localStorage.getItem("users")!=undefined){
                users=$.parseJSON(localStorage.getItem("users"));//get users
        }
        if (localStorage.getItem("scores") != null && localStorage.getItem("scores")!=undefined){
            scores=$.parseJSON(localStorage.getItem("scores"));//get scores
        }
       
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
    if (userName in users){
            if (users[userName] === password){
                if (JSON2.recentUser != userName){
                            for (var i =0; i<JSON2.questions.length; i++){
                                    sessionStorage.removeItem("Q"+i+" Answer");//remove stored answers if different user
                            }
                }
                JSON2.recentUser = userName;//save new user as recent one
                localStorage["recentUser"]=userName;
                $("#questions").remove();//remove name area
                sessionStorage.setItem("questionNumber", Number(sessionStorage.getItem("questionNumber"))+1);//go to next (first) question
                $("#numCorrect").after("<br/><div id='image' class='Question'><img src='"+urlList[Number(sessionStorage.getItem("questionNumber"))]+"'></div>");
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
    if (users!=undefined && users!=null && userName in users){
        $(".wrongPW").remove();
        $("#questions").prepend('<h class="wrongPW"><i><center>Username already taken!</center></i></h>');
    }
    else{
        users[userName]=password;
        localStorage.setItem("users", JSON.stringify(users));
        login(form);
    }
}//signup


function submitQuiz(form){
    $(".Question").hide();
    for (var i=0; i<form.Answer.length; i++){
        if (form.Answer[i].checked){
            recAnswer=form.Answer[i].value;
        }//save answer to variable
    }
    questions[Number(sessionStorage.getItem("questionNumber"))].givenAns=recAnswer;//save answer to JSON
    sessionStorage.setItem("Q"+sessionStorage.getItem("questionNumber")+" Answer", recAnswer);//save last answer to sessionstorage
    sessionStorage.setItem("questionNumber", Number(sessionStorage.getItem("questionNumber"))+1);
    $("#questions").remove();
    
    outputScore();

    
    
}//submitQuiz

function outputScore() {
    var correctNumbers = [];
    var incorrectNumbers = [];
    for (var j=0; j<questions.length; j++){
        if (questions[j].givenAns == questions[j].correct){
            correctNumbers[correctNumbers.length]=j;//array of correct
        }
        else{
            incorrectNumbers[incorrectNumbers.length]=j;//array of incorrect
        }
    }
    var i=0;
    if (scores!=null && scores!= undefined && scores.length>0){
            var k=scores.length;
            for (i=0; i<scores.length; i++){//place score in order
                    if (correctNumbers.length>=scores[i][0]){
                            for (k = scores.length; k>=i; k--){
                                    scores[k]=scores[k-1];//move all lower scores down 1
                            }
                            break;
                    }
            }
            if (k==scores.length){//score not greater than any on leaderboard
                    scores[scores.length]=[correctNumbers.length, userName];
            }
            else{
                    scores[i]=[correctNumbers.length, userName];
            }
    }
    else{ //if nothing placed yet
            scores.push([correctNumbers.length, userName]);
    }
    localStorage.setItem("scores", JSON.stringify(scores));
    
    var scoreReport = '';
    var place = 1+i;
    scoreReport += " Your score was " + correctNumbers.length + "/"+questions.length+". That means you are ranked #"+place+" of users who took this quiz on this browser, out of "+scores.length+" total browser attempts.";
    var moreDetails='';//generate table with comparisons
    for (var j=0; j<scores.length; j++){
            moreDetails+="<tr><td>"+Number(j+1)+"</td><td>"+scores[j][1]+"</td><td>"+scores[j][0]+"</td></tr>";
    }
    var correctNums = '';
    for (var j=0; j<correctNumbers.length; j++){
        correctNums+="<a title='Question: "+questions[correctNumbers[j]].question + "\nAnswer: "  +questions[correctNumbers[j]].correct+"'>#"+Number(correctNumbers[j]+1)+"</a> ";//create tooltip correct
    }
    var incorrectNums = '';
    for (var j=0; j<incorrectNumbers.length; j++){
        incorrectNums+="<a title='Question: "+questions[incorrectNumbers[j]].question + "\nYour Answer: " +questions[incorrectNumbers[j]].givenAns + "\nCorrect Answer: "  +questions[incorrectNumbers[j]].correct+"'>#"+Number(incorrectNumbers[j]+1)+"</a>  ";//create tooltip incorrect
    }
    //inject HTML
    $("#numCorrect").after("<h4>Great job, "+userName+"!" + scoreReport+"</h4><input type='button' id='details' value='Show/Hide Details'><br><table class='hidden'><tr><th>Rank</th><th>Username</th><th>Score</th></tr>"+moreDetails+"</table><br><p><i>(Hover over question number to see the question, your answer, and the correct answer...</i></p><font color='#11EE11'><h3>Questions Answered Correctly ("+correctNumbers.length+" total, " + Math.round(correctNumbers.length/(correctNumbers.length+incorrectNumbers.length)*100) + "%):<br/> "+correctNums +"</h3></font><font color='#D95B43'><h3>Questions Answered Incorrectly ("+incorrectNumbers.length+" total, " + Math.round(incorrectNumbers.length/(correctNumbers.length+incorrectNumbers.length)*100) + "%):<br/> "+incorrectNums +"</h3></font>");//display correct and incorrect answers
    $("#details").on('click', function(){
        $(".hidden").slideToggle("slow");
});
    outputGraph(correctNumbers.length, incorrectNumbers.length);
}



function outputGraph(numCorrect, numIncorrect){
    var myColor = ["#11EE11","#D95B43"];
    var myData = [numCorrect, numIncorrect];
    plotData(myColor, myData);
    $(".Question").fadeIn();
}


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
    questionNumber = Number(sessionStorage.getItem("questionNumber"));
    for (var i=0; i<form.Answer.length; i++){
        if (form.Answer[i].checked){
            recAnswer=form.Answer[i].value;
        }//save answer to variable
    }
    questions[questionNumber].givenAns=recAnswer;//save answer to JSON
    sessionStorage.setItem("Q"+questionNumber+" Answer", recAnswer);//save answer to sessionStorage
    if (recAnswer!=0 || isNext!=true){//if answer was submitted or previous question accessed, switch questions
        $("#questions").remove();
        $("#image").remove();
        if (isNext==true){//if next
                 sessionStorage.setItem("questionNumber", Number(sessionStorage.getItem("questionNumber"))+1);
        }
        else{//if previous
                sessionStorage.setItem("questionNumber", Number(sessionStorage.getItem("questionNumber"))-1);
        }
        $("#numCorrect").after("<br/><div id='image' class='Question'><img src='"+urlList[questionNumber]+"'></div>");
        $("#numCorrect").after("<br/><div id='questions' class='Question'>"+generateQ()+"</div>");
        $(".Question").fadeIn();
    }
    recAnswer=0;
}//getAnswerNext


