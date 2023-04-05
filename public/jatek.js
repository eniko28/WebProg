let gepPenz;

// lementem a form-ba beirt jatekos nevet es penzet, illetve a gep generalt penzet is, majd atvaltok a masik html oldalra
function masikOldal() {
  const becenev = document.getElementById('becenev').value;
  const penz = document.getElementById('penz').value;
  localStorage.setItem('becenev', becenev);
  localStorage.setItem('penz', penz);
  gepPenz = (Math.floor(Math.random() * 100) + 1).toString();
  localStorage.setItem('gepPenz', gepPenz);
  window.location.href = './game.html';
}

// megnezem, hogy lettek-e beirva adatok a formba, ha igen, megjelenitem oket a masik html oldalon
// a gep penzet is megjelenitem az oldalon
function betolt() {
  if (localStorage.becenev && localStorage.penz) {
    const becenev = localStorage.getItem('becenev');
    const penz = localStorage.getItem('penz');
    gepPenz = localStorage.getItem('gepPenz');
    document.getElementById('becenevjs').textContent = `Játékos neve: ${becenev}`;
    document.getElementById('penzjs').textContent = `Játékos pénze: ${penz}`;
    document.getElementById('penz2js').textContent = `Gép pénze: ${gepPenz}`;
  }
}

// a jatekos kivalaszt egy kepet, a gep general egy kepet, csak ez a kep ket latszik a kepernyon, majd megnezem ki nyert
function jatekIndul() {
  let jatekosPenz = parseInt(localStorage.getItem('penz'), 10);

  gepPenz = parseInt(localStorage.getItem('gepPenz'), 10);

  const kepek = document.querySelectorAll('.kepek img');

  kepek.forEach((kep) => {
    kep.addEventListener('click', function eltunik() {
      kepek.forEach((kep2) => {
        kep2.style.display = 'none';
      });

      const valasztottIndex = Math.floor(Math.random() * kepek.length);
      const eredmenyElem = document.getElementById('eredmeny');
      const eredmeny = `<img src="${this.src}"> <img src="${kepek[valasztottIndex].src}">}`;

      eredmenyElem.innerHTML = eredmeny;

      if (this.alt === kepek[valasztottIndex].alt) {
        setTimeout(() => {
          window.location.href = './dontetlen.html';
        }, 1000);
      } else if (
        (this.alt === 'Ko' && kepek[valasztottIndex].alt === 'Papir') ||
        (this.alt === 'Ollo' && kepek[valasztottIndex].alt === 'Ko') ||
        (this.alt === 'Papir' && kepek[valasztottIndex].alt === 'Ollo')
      ) {
        gepPenz -= 10;
        setTimeout(() => {
          window.location.href = './gep.html';
        }, 1000);
      } else {
        jatekosPenz -= 10;
        setTimeout(() => {
          window.location.href = './jatekos.html';
        }, 1000);
      }

      localStorage.setItem('penz', jatekosPenz);
      localStorage.setItem('gepPenz', gepPenz);
    });
  });
}

// a jatek ujraindul, ha meg lett nyomva a Jatek Ujrkezdes gomb es van eleg penzuk a jatekosoknak
function jatekUjrakezd() {
  const tovabb = localStorage.getItem('penz');
  const tovabb2 = localStorage.getItem('gepPenz');
  if (tovabb >= 0 && tovabb2 >= 0) {
    window.location.href = './game.html';
  } else {
    window.location.href = './gameover.html';
  }
}

window.onload = () => {
  const indulGomb = document.getElementById('indul');
  if (indulGomb !== null) {
    indulGomb.addEventListener('click', masikOldal);
  }
  const fooldal = document.getElementById('fooldal');
  if (fooldal !== null) {
    betolt();
    jatekIndul();
  }
  const ujraGomb = document.getElementById('jatekUj');
  if (ujraGomb !== null) {
    ujraGomb.addEventListener('click', jatekUjrakezd);
  }
};
