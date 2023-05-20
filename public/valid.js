const form1 = document.getElementById('ujtantargy');

if (form1) {
  const submitBtn1 = form1.querySelector('input[type="submit"]');
  submitBtn1.disabled = true;

  const validateForm1 = () => {
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
  };

  form1.addEventListener('input', () => {
    validateForm1();
  });

  form1.addEventListener('submit', (event) => {
    if (!validateForm1()) {
      event.preventDefault();
    }
  });
}

const form2 = document.getElementById('ujallomany');
if (form2) {
  const submitBtn2 = form2.querySelector('input[type="submit"]');
  submitBtn2.disabled = true;

  const validateForm2 = () => {
    const filefeltolt = document.getElementById('feltoltendofile').value;
    const fileInput = document.getElementById('feltoltendofile');
    const maxFileSize = 3 * 1024 * 1024;

    if (filefeltolt === '' || fileInput.files[0].size > maxFileSize) {
      submitBtn2.disabled = true;
      return false;
    }

    submitBtn2.disabled = false;
    return true;
  };
  form2.addEventListener('input', () => {
    validateForm2();
  });

  form2.addEventListener('submit', (event) => {
    if (!validateForm2()) {
      event.preventDefault();
    }
  });
}

const form3 = document.getElementById('ujfelhasznalo');
if (form3) {
  const submitBtn3 = form3.querySelector('input[type="submit"]');
  submitBtn3.disabled = true;

  const validateForm3 = () => {
    const kod = document.getElementById('kod').value;
    const usr = document.getElementById('usr').value;

    if (kod === '' || usr === '') {
      submitBtn3.disabled = true;
      return false;
    }

    submitBtn3.disabled = false;
    return true;
  };
  form3.addEventListener('input', () => {
    validateForm3();
  });

  form3.addEventListener('submit', (event) => {
    if (!validateForm3()) {
      event.preventDefault();
    }
  });
}
