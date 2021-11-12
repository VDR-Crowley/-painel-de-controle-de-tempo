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

const navs = document.querySelectorAll('nav ul li a');

async function buscarDados() {
  try {
    let req = await fetch("./src/data.json")
    let texto = await req.text();
    let json = JSON.parse(texto);
    return json;
  } catch (e) {
    console.log(e);
  }
}

function cardF( title: string, current: number, previous: number) {
  const c = document.querySelector(`#${title} .card-hours`) as Element;
  const l = document.querySelector(`#${title} .card-previous span`) as Element;
  //console.log(c)
  c.innerHTML = String(current)+"hrs";
  l.innerHTML = String(previous);
}

function percorrerCard(cards: NodeList, obj: timeframe, objD: {current: number, previous: number}) {
  let previous: timeframe | number;
  let current: timeframe | number = 0;
  //let car: Node | HTMLElement ;
  //let id = document.getElementById(`${obj.title}`);
  cards.forEach( card => {
    let cardId = card as HTMLDivElement;
    let c = String(cardId.id) === String(obj.title);

    if(c) {
      current = objD.current;
      previous = objD.previous;
      cardF(obj.title, current, previous)
      
    }
      //console.log(c, cardId.id, obj.timeframes);
    
  })


}

function anchorCheck(anchor: HTMLAnchorElement, data: string) {
  //let daily = document.getElementById('daily');
  const achors = document.querySelectorAll('nav ul li a');
  console.log(data)
  achors.forEach(a => {
    if(a === anchor) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  }) 
  
}

function montaDash(anchor: HTMLAnchorElement, json: []) {
  let cards: NodeList = document.querySelectorAll(".card");
  const dataIdentific = anchor.getAttribute("data-indetific");
  //console.log(cards);
  //console.log(dataIdentific);
 
  switch (dataIdentific) {
    case "daily":
      anchorCheck(anchor, dataIdentific);
      //anchor.nextElementSibling?.removeAttribute('class');
      let objD: timeframe = {} as timeframe;
      json.forEach(item => {
        objD = item as timeframe;
        let o: { current: number, previous: number} = objD.timeframes.daily;
        //console.log("o",o);
        percorrerCard(cards, objD, o);
      });
      break;
    
    case "weekly":
      anchorCheck(anchor, dataIdentific);
      let objW: timeframe = {} as timeframe;
      json.forEach(item => {
        objW = item as timeframe;
        //console.log(obj.timeframes.daily);
        let o: { current: number, previous: number} = objW.timeframes.weekly;
        percorrerCard(cards, objW, o);
      })
      break;

    case "monthly":
      anchorCheck(anchor, dataIdentific);
      let objM: timeframe = {} as timeframe;
      json.forEach(item => {
        objM = item as timeframe;
        //console.log(obj.timeframes.daily);
        let o: { current: number, previous: number} = objM.timeframes.monthly;
        percorrerCard(cards, objM, o);
      })
      break;
  }
}

async function peopleDados(event: Event) {
  let json: [] = await buscarDados();
  let anchorCheck = event.target as HTMLAnchorElement;
  
  if(!anchorCheck.classList.contains("active")) {
    montaDash(anchorCheck, json);
  } else {
    window.location.reload();
  }
}


navs.forEach( anchor =>   anchor.addEventListener('click', peopleDados) );