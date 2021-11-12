"use strict";
const navs = document.querySelectorAll('nav ul li a');
async function fetchData() {
    try {
        const req = await fetch("./src/data.json");
        const texto = await req.text();
        const json = JSON.parse(texto);
        return json;
    }
    catch (e) {
        console.log(e);
    }
}
function showCard(title, current, previous) {
    const hour = document.querySelector(`#${title} .card-hours`);
    const lastWeek = document.querySelector(`#${title} .card-previous span`);
    hour.innerHTML = String(current) + "hrs";
    lastWeek.innerHTML = String(previous);
}
function traverseObject(cards, obj, times) {
    let previous;
    let current = 0;
    cards.forEach(card => {
        const cardId = card;
        const checkIdTitle = String(cardId.id) === String(obj.title);
        if (checkIdTitle) {
            current = times.current;
            previous = times.previous;
            showCard(obj.title, current, previous);
        }
    });
}
function anchorsCheck(anchor) {
    const achors = document.querySelectorAll('nav ul li a');
    achors.forEach(a => {
        if (a === anchor) {
            a.classList.add('active');
        }
        else {
            a.classList.remove('active');
        }
    });
}
function rideDash(anchor, json) {
    const cards = document.querySelectorAll(".card");
    const dataCheck = anchor.getAttribute("data-indetific");
    switch (dataCheck) {
        case "daily":
            anchorsCheck(anchor);
            let objDaily = {};
            json.forEach(item => {
                objDaily = item;
                const daily = objDaily.timeframes.daily;
                traverseObject(cards, objDaily, daily);
            });
            break;
        case "weekly":
            anchorsCheck(anchor);
            let objWeekly = {};
            json.forEach(item => {
                objWeekly = item;
                const weekly = objWeekly.timeframes.weekly;
                traverseObject(cards, objWeekly, weekly);
            });
            break;
        case "monthly":
            anchorsCheck(anchor);
            let objMonthly = {};
            json.forEach(item => {
                objMonthly = item;
                const monthly = objMonthly.timeframes.monthly;
                traverseObject(cards, objMonthly, monthly);
            });
            break;
    }
}
async function peopleHours(event) {
    const json = await fetchData();
    const anchorCheck = event.target;
    if (!anchorCheck.classList.contains("active")) {
        rideDash(anchorCheck, json);
    }
    else {
        window.location.reload();
    }
}
navs.forEach(anchor => anchor.addEventListener('click', peopleHours));
