//lementem a form-ba beirt jatekos nevet es penzet, majd atvaltok a masik html oldalra
function masikOldal() {
  const becenev = document.getElementById("becenev").value;
  const penz = document.getElementById("penz").value;
  localStorage.setItem("becenev", becenev);
  localStorage.setItem("penz", penz);
  
  window.location.href = "./game.html";
}

//megnezem, hogy lettek-e beirva adatok a formba, ha igen, megjelenitem oket a masik html oldalon
function betolt() {
  if (localStorage.becenev && localStorage.penz) {
    const becenev = localStorage.getItem("becenev");
    const penz = localStorage.getItem("penz");
    document.getElementById("becenevjs").textContent = `Játékos neve: ${becenev}`;
    document.getElementById("penzjs").textContent = `Játékos pénze: ${penz}`;
  }
}