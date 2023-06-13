document.addEventListener('DOMContentLoaded', () => {
  const mutasdKisFormot = () => {
    const kisForm = document.getElementById('kisForm');
    kisForm.style.display = 'block';
  };

  // Gombra kattintáskor hívódik meg a függvény
  const gomb = document.querySelector('button');
  gomb.addEventListener('click', mutasdKisFormot);
});
