"use strict";
const navs = document.querySelectorAll('nav ul li a');
async function buscarDados() {
    try {
        let req = await fetch("./src/data.json");
        let texto = await req.text();
        let json = JSON.parse(texto);
        return json;
    }
    catch (e) {
        console.log(e);
    }
}
function cardF(title, current, previous) {
    const c = document.querySelector(`#${title} .card-hours`);
    const l = document.querySelector(`#${title} .card-previous span`);
    console.log(c);
    c.innerHTML = String(current) + "hrs";
    l.innerHTML = String(previous);
}
function percorrerCard(cards, obj, objD) {
    let previous;
    let current = 0;
    cards.forEach(card => {
        let cardId = card;
        let c = String(cardId.id) === String(obj.title);
        if (c) {
            current = objD.current;
            previous = objD.previous;
            cardF(obj.title, current, previous);
        }
    });
}
function montaDash(anchor, json) {
    let cards = document.querySelectorAll(".card");
    const dataIdentific = anchor.getAttribute("data-indetific");
    switch (dataIdentific) {
        case "daily":
            let objD = {};
            json.forEach(item => {
                objD = item;
                let o = objD.timeframes.daily;
                console.log("o", o);
                percorrerCard(cards, objD, o);
            });
            break;
        case "weekly":
            let objW = {};
            json.forEach(item => {
                objW = item;
                let o = objW.timeframes.weekly;
                percorrerCard(cards, objW, o);
            });
            break;
        case "monthly":
            let objM = {};
            json.forEach(item => {
                objM = item;
                let o = objM.timeframes.monthly;
                percorrerCard(cards, objM, o);
            });
            break;
    }
}
async function peopleDados(event) {
    let json = await buscarDados();
    let anchorCheck = event.target;
    if (!anchorCheck.classList.contains("active")) {
        anchorCheck.classList.add('active');
        montaDash(anchorCheck, json);
    }
}
navs.forEach(anchor => anchor.addEventListener('click', peopleDados));
