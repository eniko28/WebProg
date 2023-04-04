var gepPenz;

//lementem a form-ba beirt jatekos nevet es penzet, illetve a gep generalt penzet is, majd atvaltok a masik html oldalra
function masikOldal() {
  const becenev = document.getElementById("becenev").value;
  const penz = document.getElementById("penz").value;
  localStorage.setItem("becenev", becenev);
  localStorage.setItem("penz", penz);
  gepPenz = (Math.floor(Math.random() * 100) + 1).toString();
  localStorage.setItem("gepPenz", gepPenz);
  window.location.href = "./game.html";
}

//megnezem, hogy lettek-e beirva adatok a formba, ha igen, megjelenitem oket a masik html oldalon
//a gep penzet is megjelenitem az oldalon
function betolt() {
  if (localStorage.becenev && localStorage.penz) {
    const becenev = localStorage.getItem("becenev");
    const penz = localStorage.getItem("penz");
    const gepPenz = localStorage.getItem("gepPenz");
    document.getElementById("becenevjs").textContent = `Játékos neve: ${becenev}`;
    document.getElementById("penzjs").textContent = `Játékos pénze: ${penz}`;
    document.getElementById("penz2js").textContent = `Gép pénze: ${gepPenz}`;
  }
}

//a jatekos kivalaszt egy kepet, a gep general egy kepet, csak ez a kep ket latszik a kepernyon, majd megnezem ki nyert
function jatekIndul() {

  var jatekosPenz = parseInt(localStorage.getItem("penz"));

  gepPenz = parseInt(localStorage.getItem("gepPenz"));

  var kepek = document.querySelectorAll(".kepek img");

  kepek.forEach(function(kep) {
  kep.addEventListener("click", function() {

  kepek.forEach(function(kep) {
    kep.style.display = "none";
  });

  var valasztottIndex = Math.floor(Math.random() * kepek.length);
  var eredmenyElem = document.getElementById("eredmeny");
  var eredmeny = '<img src="' + this.src + '"><img src="' + kepek[valasztottIndex].src + '">';

  eredmenyElem.innerHTML = eredmeny;

  if(this.alt === kepek[valasztottIndex].alt){
    setTimeout(function() {
    window.location.href = "./dontetlen.html";
    }, 1000);
  }
  else
  if(this.alt === "Ko" && kepek[valasztottIndex].alt === "Papir"){
    gepPenz -= 10;
    setTimeout(function() {
    window.location.href = "./gep.html";
   }, 1000);
  }
  else
    if(this.alt === "Papir" && kepek[valasztottIndex].alt === "Ko"){
      jatekosPenz -= 10;
      setTimeout(function() {
        window.location.href = "./jatekos.html";
      }, 1000);
    }
    else
      if(this.alt === "Ko" && kepek[valasztottIndex].alt === "Ollo"){
        jatekosPenz -= 10;
        setTimeout(function() {
         window.location.href = "./jatekos.html";
        }, 1000);
     }
     else
       if(this.alt === "Ollo" && kepek[valasztottIndex].alt === "Ko"){
        gepPenz -= 10;
        setTimeout(function() {
        window.location.href = "./gep.html";
       }, 1000);
      }
      else
        if(this.alt === "Ollo" && kepek[valasztottIndex].alt === "Papir"){
          jatekosPenz -= 10;
          setTimeout(function() {
           window.location.href = "./jatekos.html";
          }, 1000);
       }
       else
       if(this.alt === "Papir" && kepek[valasztottIndex].alt === "Ollo"){
        gepPenz -= 10;
        setTimeout(function() {
          window.location.href = "./gep.html";
        }, 1000);
      }
      localStorage.setItem("penz", jatekosPenz);
      localStorage.setItem("gepPenz", gepPenz);
});
});
}

//a jatek ujraindul, ha meg lett nyomva a Jatek Ujrkezdes gomb es van eleg penzuk a jatekosoknak
function jatekUjrakezd() {
  var tovabb = localStorage.getItem("penz");
  var tovabb2 = localStorage.getItem("gepPenz");
  if(tovabb >= 0 && tovabb2 >= 0){
    window.location.href = "./game.html";
  }
  else{
    window.location.href = "./gameover.html"
  }
}