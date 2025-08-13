function addScore(team, points) {
    const scoreEl = document.getElementById(`score-${team}`);
    let currentScore = parseInt(scoreEl.textContent, 10);
    scoreEl.textContent = currentScore + points;
}
