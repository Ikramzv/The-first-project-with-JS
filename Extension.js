// let cards = []
// let sum = 0;
// let hasBlackJack = false;
// let isAlive = true;
// let player = {
//     name: 'Ikram',
//     chips: ''
// }

// let sumEl = document.getElementById('sum-el');
// let cardsEl = document.getElementById('cards-el');
// let mainEl = document.getElementById('main-el');
// let playerEl = document.getElementById('player-el');

// function startGameBtn() {
//     let firstCard = getRandomCard();
//     let secondCard = getRandomCard();
//     cards = [firstCard , secondCard]
//     sum = cards[0] + cards[1];
//     renderGame()
//     getChips()
// }

// function getRandomCard() {

//     let randomNumber = Math.floor(Math.random() * 13) + 1;
//     if ( randomNumber > 10){
//         return 10
//     } else if ( randomNumber === 1 ) {
//         return 11;
//     } else {
//         return randomNumber;
//     }
// }

// function renderGame() {

//     cardsEl.textContent = 'Cards : '

//     for(let i = 0; i < cards.length; i++) {
//         cardsEl.textContent += cards[i] + ' ';
//     }
//     sumEl.textContent = 'Sum : ' + sum;

//     if(sum < 21) {
//         message = 'Do you want to draw a new card ?'
//     } else if (sum === 21) {
//         message = 'Wohoo! You have gotten a Blackjack !'
//         hasBlackJack = true;
//     } else {
//         message = 'You are out of the game !';
//         isAlive = false;
//     }

//     mainEl.textContent = message;
// }

// function newCardBtn() {
//     if(isAlive === true && hasBlackJack === false) {
//         let newCard = getRandomCard();
//         cards.push(newCard);
//         sum += newCard
//         renderGame();
//     }
// }

let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    render(myLeads);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
  });
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
        <li>
            <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
        </li>
                `;
    ulEl.innerHTML = listItems;
  }
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [""];
  render(myLeads);
});
