document.addEventListener('DOMContentLoaded', () => {
  function deleteDiv(divId) {
    const div = document.getElementById(`tanarokKeresei-${divId}`);
    if (div) {
      fetch(`/keresek/${divId}`, { method: 'DELETE' })
        .then((response) => {
          if (response.ok) {
            div.remove();
          } else {
            alert('Hiba a válasz elküldésekor!');
          }
        })
        .catch((error) => {
          console.error('Hiba történt:', error);
          alert('Hiba történt. Kérlek, próbáld újra később!');
        });
    }
  }

  const buttons = document.querySelectorAll('.submit-gomb-keres');
  buttons.forEach((button) => {
    button.addEventListener('click', function fgv() {
      const divId = this.parentElement.id.split('-')[1];
      deleteDiv(divId);
    });
  });
});
