const MAX_VALUE= 500;
const random1Dom=document.getElementById('random-number-1');
const random2Dom=document.getElementById('random-number-2');
const random3Dom=document.getElementById('random-number-3');
const randomSum1Dom=document.getElementById('random-sum-1');
const randomSum2Dom=document.getElementById('random-sum-2');
const randomSum3Dom=document.getElementById('random-sum-3');
const alertOkDom=document.getElementById('alert-ok');
const alertBoxDom=document.getElementById('alert-box');
const alertBodyDom=document.getElementById('alert-body');
const timeOutBodyDom=document.getElementById('time-out-body');
const timeOutOkDom=document.getElementById('time-out-ok');
const randomSumPositions=[randomSum1Dom, randomSum2Dom, randomSum3Dom]
let correctButton;
let timeOut;
startGame();

randomSumPositions.forEach(button => {
    button.addEventListener('click', () => {
        alertBoxDom.classList.remove('display-none');
        alertBodyDom.classList.remove('display-none');
        const IS_CORRECT = (button === correctButton);
        const CLASS_TO_ADD = IS_CORRECT ? 'correct-answer' : 'wrong-answer';
        alertBodyDom.classList.add(CLASS_TO_ADD);
        clearTimeout(timeOut);
    });
});

function startGame(){
    timeOut=setTimeout(()=>{
        alertBoxDom.classList.remove('display-none');
        timeOutBodyDom.classList.remove('display-none');
        alertBodyDom.classList.add('display-none');
    }, 10000);
    timeOutOkDom.addEventListener('click', ()=>{
        startGame();
        alertBoxDom.classList.add('display-none');
        timeOutBodyDom.classList.add('display-none');
    })
    const random1=generateRandomNum();
    const random2=generateRandomNum();
    const random3=generateRandomNum();
    random1Dom.innerText=random1;
    random2Dom.innerText=random2;
    random3Dom.innerText=random3;
    const sums=findSum(random1, random2, random3);
    let sumPositions=chooseResultPosition();
    correctButton = randomSumPositions[sumPositions[0]];
    sumPositions.forEach((position, index) => {
        randomSumPositions[position].innerText = sums[index];
    });
    if(location.hash.includes('show-solution')) {
        console.log(sumPositions[0]);
    } 
}

function generateRandomNum() {
    const random=Math.random() * MAX_VALUE;
    const IntegerRandom=(Math.trunc(random));
    return IntegerRandom;
}

function findSum(num1, num2, num3) {
    const sum= num1+num2+num3;
    const randomDelta1= generateRandomDelta(11);
    let randomDelta2= generateRandomDelta(12);
    while (randomDelta2===randomDelta1){
        randomDelta2=generateRandomDelta(13)
    }
    return[sum, randomDelta1+sum, randomDelta2+sum];
}

function generateRandomDelta(maxDelta){
    const randomNum=Math.random()*maxDelta;
    const randomInt = Math.trunc(randomNum)+1;
    return Math.random()<0.5?-randomInt:randomInt;
}

function chooseResultPosition (){
    const randomNum1=Math.random()*3;
    const randomInt1=Math.trunc(randomNum1);
    const randomNum2=Math.random()*3;
    let randomInt2=Math.trunc(randomNum2);
    while(randomInt2===randomInt1){
        randomInt2=Math.trunc(Math.random()*3)
    }
    const randomNum3=Math.random()*3;
    let randomInt3=Math.trunc(randomNum3)
    while(randomInt3===randomInt1 || randomInt3===randomInt2){
        randomInt3=Math.trunc(Math.random()*3)
    }
    return [randomInt1, randomInt2, randomInt3]
}

alertOkDom.addEventListener('click',()=>{
    startGame();
    alertBoxDom.classList.add('display-none');
    alertBodyDom.classList.remove('correct-answer');
    alertBodyDom.classList.remove('wrong-answer');
})