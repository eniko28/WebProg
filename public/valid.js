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

const form4 = document.getElementById('login');
if (form4) {
  const submitBtn4 = form4.querySelector('input[type="submit"]');
  submitBtn4.disabled = true;

  const validateForm4 = () => {
    const nev = document.getElementById('nev').value;
    const password = document.getElementById('jelszo').value;

    if (nev === '' || password === '') {
      submitBtn4.disabled = true;
      return false;
    }

    submitBtn4.disabled = false;
    return true;
  };
  form4.addEventListener('input', () => {
    validateForm4();
  });

  form4.addEventListener('submit', (event) => {
    if (!validateForm4()) {
      event.preventDefault();
    }
  });
}

const form5 = document.getElementById('register');
if (form5) {
  const submitBtn5 = form5.querySelector('input[type="submit"]');
  submitBtn5.disabled = true;

  const validateForm5 = () => {
    const nev = document.getElementById('nev').value;
    const password = document.getElementById('jelszo').value;

    if (nev === '' || password === '') {
      submitBtn5.disabled = true;
      return false;
    }

    submitBtn5.disabled = false;
    return true;
  };
  form5.addEventListener('input', () => {
    validateForm5();
  });

  form5.addEventListener('submit', (event) => {
    if (!validateForm5()) {
      event.preventDefault();
    }
  });
}

const form6 = document.getElementById('ujorarend');
if (form6) {
  const submitBtn6 = form6.querySelector('input[type="submit"]');
  submitBtn6.disabled = true;

  const validateForm6 = () => {
    const nev = document.getElementById('kod').value;
    const password = document.getElementById('nev').value;
    const mikor = document.getElementById('mikor').value;
    const mettol = document.getElementById('mettol').value;
    const meddig = document.getElementById('meddig').value;

    if (nev === '' || password === '' || mikor === '' || mettol === '' || meddig === '') {
      submitBtn6.disabled = true;
      return false;
    }

    submitBtn6.disabled = false;
    return true;
  };
  form6.addEventListener('input', () => {
    validateForm6();
  });

  form6.addEventListener('submit', (event) => {
    if (!validateForm6()) {
      event.preventDefault();
    }
  });
}
