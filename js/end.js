const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;
console.log(highScores);
console.log(JSON.parse(localStorage.getItem("highScores")));

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    // console.log(username.value);

    saveScoreBtn.disabled = !username.value;

});

saveHighScore = e =>{
    console.log('click to save button');
    e.preventDefault();

const score = {
    // score: mostRecentScore,
    score: Math.floor(Math.random() * 100),
    name: username.value
};

highScores.push(score);

highScores.sort((a,b) => b.score - a.score );
    // if b is higher than a put b before a (up here) --> arrow function inline because we have just one parameter
  
highScores.splice(5); // after the fifth record they will be cutted off the array

localStorage.setItem('highScores', JSON.stringify(highScores));

window.location.assign("/");

console.log(score);

};