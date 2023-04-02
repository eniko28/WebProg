//generalom a gep penzet
var gepPenz;

//lementem a form-ba beirt jatekos nevet es penzet, majd atvaltok a masik html oldalra
//lementem  a gep penzet is
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

//a jatekos kivalaszt egy kepet, a gep general egy kepet, masik kep eltunik
//majd megnezem hogy ki nyert
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

  if(this.src === kepek[valasztottIndex].src){
    jatekosPenz -= 10;
    gepPenz -= 10;
    setTimeout(function() {
    window.location.href = "./dontetlen.html";
    }, 500);
  }
  else
  if(this.src === "ko.jpeg" && kepek[valasztottIndex].src === "papir.jpeg"){
    gepPenz -= 10;
    setTimeout(function() {
    window.location.href = "./gep.html";
   }, 500);
  }
  else
    if(this.src === "papir.jpeg" && kepek[valasztottIndex].src === "ko.jpeg"){
      jatekosPenz -= 10;
      setTimeout(function() {
        window.location.href = "./jatekos.html";
      }, 500);
    }
    else
      if(this.src === "ko.jpeg" && kepek[valasztottIndex].src === "ollo.jpg"){
        jatekosPenz -= 10;
        setTimeout(function() {
         window.location.href = "./jatekos.html";
        }, 500);
     }
     else
       if(this.src === "ollo.jpg" && kepek[valasztottIndex].src === "ko.jpeg"){
        gepPenz -= 10;
        setTimeout(function() {
        window.location.href = "./gep.html";
       }, 500);
      }
      else
        if(this.src === "ollo.jpg" && kepek[valasztottIndex].src === "papir.jpeg"){
          jatekosPenz -= 10;
          setTimeout(function() {
           window.location.href = "./jatekos.html";
          }, 500);
       }
       else
       if(this.src === "papir.jpeg" && kepek[valasztottIndex].src === "ollo.jpg"){
        gepPenz -= 10;
        setTimeout(function() {
          window.location.href = "./gep.html";
        }, 500);
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
  console.log(tovabb);
  console.log(tovabb2);
  if(tovabb >= 10 && tovabb2 >= 10)
  {
    window.location.href = "./game.html";
  }
  else
  {
    window.location.href = "./gameover.html"
  }
}