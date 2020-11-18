// challange 1 
// Your age in days 
function ageInDays(){
    var birthyear = prompt('What is your birth year?');
    var ageInDayss = (2020 - birthyear) * 365;
    console.log(ageInDayss);
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are '+ ageInDayss + ' days old');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);

}

function reset(){
    document.getElementById('ageInDays').remove();

}

function ageInMonths(){
    var birthYear2 = prompt('What is your birth year?');
    var ageInMonthss = (2020 - birthYear2)*12;
    console.log(ageInMonthss);
    var h1 = document.createElement('h1');
    var ageInMonthsAnswer = document.createTextNode('You are ' + ageInMonthss + ' Months Old');
    h1.setAttribute('id','ageInMonths');
    h1.appendChild(ageInMonthsAnswer);
    document.getElementById('flex-box-result-2').appendChild(h1);
}

function reset(){
    document.getElementById('ageInMonths').remove();
}
function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}
// Challange 3: Rock Paper Scissors

function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice= numberToChoice(ranToRpsInt());
    console.log('Computer Choice:',botChoice);
    results = decideWinner(humanChoice, botChoice); //(0,1) human lost \ bot won

    console.log(results);
    message = finalMessage(results); //Your Won
    console.log(message);
    
    rpsFrontEnd(yourChoice.id,botChoice, message);    
}
function ranToRpsInt(){
    return Math.floor(Math.random() * 3);
}
function numberToChoice(number){
    return['rock','paper','scissors'][number];
}
function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        'rock': {'scissors':1,'rock':0.5,'paper':0},
        'paper': {'rock':1,'paper':0.5,'scissors':0},
        'scissors': {'paper':1,'scissors':0.5,'rock':0}
    };
    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];
    return [yourScore, computerScore];
}
function finalMessage([yourScore, computerScore]){
    if(yourScore === 0){

        return{'message': 'You Lost!','color':'red'};
    } else if (yourScore === 0.5){

        return{'message': 'Game Tied!','color':'yellow'};
    } else{

        return{'message':'You Won!','color':'green'};
        }
}
function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase ={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }
    //lets remove all the images 
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] +"' height=150 width = 150 style= 'box-shadow: 0px 10px 50px rgba(37,50,233,1); '>"
    messageDiv.innerHTML = "<h1 style='color:"+ finalMessage['color']+ ";font-size: 60px; padding: 30px;'>" + finalMessage['message']+ "</h1>"
    botDiv.innerHTML = "<img src='"+ imagesDatabase[botImageChoice] + "' height= 150 width = 150 style= 'box-shadow: 0px 10px 50px rgba(243,38,233,1); '>" 

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    

}
function reset(){
    document.getElementById('finalMessage').remove();
}
// Challange 4: Change the color of buttons

var all_buttons = document.getElementsByTagName('button','select');
var copyAllButtons = [];

for ( let i = 0; i< all_buttons.length; i++ ){
    copyAllButtons.push(all_buttons[i].classList[1]);
}
//console.log(copyAllButtons);

function buttonColorChange(buttonThingy){
    if (buttonThingy.value === 'red'){
        buttonsRed();
    } else if (buttonThingy.value === 'green'){
        buttonsGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    } else if (buttonThingy.value === 'random') {
        randomColors();
    }

}
function buttonsRed(){
    for(let i =0; i< all_buttons.length; i++){
        all_buttons [i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}
function buttonsGreen(){
    for(let i =0; i< all_buttons.length; i++){
        all_buttons [i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}
function buttonColorReset(){
    for (let i =0; i< all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}
function randomColors(){
    var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning','btn-info','btn-dark']
    for(i=0; i< all_buttons.length; i++){
        var randomNumber = Math.floor(Math.random() *6);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }

    
}
// Challange 5: Black Jack Game 
let blackJackGame ={
    'you': {'scoreSpan': '#your-blackjack-result','div': '#your-box','score':0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardsMap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1,11]},

};
const YOU = blackJackGame['you']
const DEALER =  blackJackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const standSound = new Audio ('static/sounds/aww.mp3');
document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',blackjackStand);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit(){
    let card = randomCard();
    console.log(card);
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    console.log(YOU['score']);
}
    
    //showCard(DEALER);
function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackJackGame['cards'][randomIndex];
}
    
function blackjackStand(){
    showCard(DEALER);
    
}

function showCard(card,activePlayer){
    if(activePlayer['score']<= 21){
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}
    
}
function blackjackDeal(){
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for(i=0; i < yourImages.length; i++){
        yourImages[i].remove();
    }
    for(i=0; i < dealerImages.length; i++){
        dealerImages[i].remove();
    }
    YOU['score'] =0;
    DEALER['score'] =0;
    document.querySelector('#your-blackjack-result').textContent =0;
    document.querySelector('#dealer-blackjack-result').textContent =0;

    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';


}

function updateScore (card, activePlayer, black){
    // If adding 11 keps me below 21, add 11. otherwise add 1
    if(card === 'A'){
        if(activePlayer['score'] + blackJackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        }else{
            activePlayer['score'] += blackJackGame['cardsMap'][card][0];
        }
    }else{
    activePlayer['score'] += blackJackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}
