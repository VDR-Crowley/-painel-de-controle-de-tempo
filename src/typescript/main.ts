interface timeframe {
  title: string
  timeframes: {
    daily: {
      current: number,
      previous: number
    },
    weekly: {
      current: number,
      previous: number
    },
    monthly: {
      current: number,
      previous: number
    },
  };
}

interface times {current: number, previous: number}

const navs = document.querySelectorAll('nav ul li a');

async function fetchData() {
  try {
    const req = await fetch("./src/data.json")
    const texto = await req.text();
    const json = JSON.parse(texto);
    return json;
  } catch (e) {
    console.log(e);
  }
}

// mostra nos cars do dash
function showCard( title: string, current: number, previous: number) {
  const hour = document.querySelector(`#${title} .card-hours`) as Element;
  const lastWeek = document.querySelector(`#${title} .card-previous span`) as Element;
  hour.innerHTML = String(current)+"hrs";
  lastWeek.innerHTML = String(previous);
}

function traverseObject(cards: NodeList, obj: timeframe, times: times ) {
  let previous: timeframe | number;
  let current: timeframe | number = 0;

  cards.forEach( card => {
    const cardId = card as HTMLDivElement;
    const checkIdTitle = String(cardId.id) === String(obj.title);

    if(checkIdTitle) {
      current = times.current;
      previous = times.previous;
      showCard(obj.title, current, previous);     
    }
  });
}

function anchorsCheck(anchor: HTMLAnchorElement) {
  const achors = document.querySelectorAll('nav ul li a');
  achors.forEach(a => {
    if(a === anchor) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  }) 
}

// monta o dash
function rideDash(anchor: HTMLAnchorElement, json: []) {
  const cards: NodeList = document.querySelectorAll(".card");
  const dataCheck = anchor.getAttribute("data-indetific");
 
  switch (dataCheck) {
    case "daily":
      anchorsCheck(anchor);
      let objDaily: timeframe = {} as timeframe;
      json.forEach(item => {
        objDaily = item as timeframe;
        const daily: times = objDaily.timeframes.daily;
        traverseObject(cards, objDaily, daily);
      });
    break;
    
    case "weekly":
      anchorsCheck(anchor);
      let objWeekly: timeframe = {} as timeframe;
      json.forEach(item => {
        objWeekly = item as timeframe;
        const weekly: times = objWeekly.timeframes.weekly;
        traverseObject(cards, objWeekly, weekly);
      });
    break;

    case "monthly":
      anchorsCheck(anchor);
      let objMonthly: timeframe = {} as timeframe;
      json.forEach(item => {
        objMonthly = item as timeframe;
        const monthly: times = objMonthly.timeframes.monthly;
        traverseObject(cards, objMonthly, monthly);
      });
    break;
  }
}

async function peopleHours(event: Event) {
  const json: [] = await fetchData();
  const anchorCheck = event.target as HTMLAnchorElement;
  
  if(!anchorCheck.classList.contains("active")) {
    rideDash(anchorCheck, json);
  } else {
    window.location.reload();
  }
}
navs.forEach( anchor => anchor.addEventListener('click', peopleHours) );