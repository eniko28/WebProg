const form1 = document.getElementById('ujtantargy');
const submitBtn1 = document.getElementById('ujtantargy').querySelector('input[type="submit"]');
submitBtn1.disabled = true;

function validateForm1() {
  const kod = document.getElementById('kod').value;
  const nev = document.getElementById('nev').value;
  const evfolyam = document.getElementById('evfolyam').value;
  const kurzus = document.getElementById('kurzus').value;
  const szemi = document.getElementById('szemi').value;
  const labor = document.getElementById('labor').value;

  if (kod === '' || nev === '' || evfolyam === '' || kurzus === '' || szemi === '' || labor === '') {
    submitBtn1.disabled = true;
    return false;
  }
  submitBtn1.disabled = false;
  return true;
}

form1.addEventListener('input', () => {
  validateForm1();
});

form1.addEventListener('submit', (event) => {
  if (!validateForm1()) {
    event.preventDefault();
  }
});

const form2 = document.getElementById('ujallomany');
const submitBtn2 = document.getElementById('ujallomany').querySelector('input[type="submit"]');
submitBtn2.disabled = true;

function validateForm2() {
  const kod = document.getElementById('kod').value;
  const filefeltolt = document.getElementById('feltoltendofile').value;
  const fileInput = document.getElementById('feltoltendofile');
  const maxFileSize = 3 * 1024 * 1024;
  if (kod === '' || filefeltolt === '' || fileInput.files[0].size > maxFileSize) {
    submitBtn2.disabled = true;
    return false;
  }
  submitBtn2.disabled = false;
  return true;
}

form2.addEventListener('input', () => {
  validateForm2();
});

form2.addEventListener('submit', (event) => {
  if (!validateForm2()) {
    event.preventDefault();
  }
});

const form3 = document.getElementById('csatlakozas');
const submitBtn3 = document.getElementById('csatlakozas').querySelector('input[type="submit"]');
submitBtn3.disabled = true;

function validateForm3() {
  const kod = document.getElementById('kod').value;
  const usr = document.getElementById('usr').value;

  if (kod === '' || usr === '') {
    submitBtn3.disabled = true;
    return false;
  }
  submitBtn3.disabled = false;
  return true;
}

form3.addEventListener('input', () => {
  validateForm3();
});

form3.addEventListener('submit', (event) => {
  if (!validateForm3()) {
    event.preventDefault();
  }
});
