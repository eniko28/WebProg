document.addEventListener('DOMContentLoaded', () => {
  const showDetails = async (kod) => {
    try {
      const result = await fetch(`./fooldal/${kod}`, { method: 'GET' });
      if (result.status === 500) {
        alert('Sikertelen extra információk megjelenítése!');
      } else {
        const bodyJson = await result.json();
        let details = '';
        Object.keys(bodyJson[0]).forEach((key) => {
          const firstLetter = key.charAt(0).toUpperCase();
          const restOfLetters = key.slice(1);
          const formattedKey = firstLetter + restOfLetters;
          details += `${formattedKey}: ${bodyJson[0][key]}\n\n`;
        });

        const detailsContainer = document.getElementById(`details-${kod}`);
        detailsContainer.innerText = details;
      }
    } catch (error) {
      console.error('Hiba történt a lekérdezés során:', error);
      alert('Hiba történt a lekérdezés során. Kérlek, próbáld újra később!');
    }
  };

  const showDetailsOnClick = (kod) =>
    async function fgv() {
      await showDetails(kod);
    };

  const showMore = document.getElementsByClassName('show-details');
  for (let i = 0; i < showMore.length; i++) {
    const element = showMore[i];
    const kod = element.id.split('-')[1];
    element.addEventListener('click', showDetailsOnClick(kod));
  }

  function logout() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/';
  }
  const logoutButton = document.getElementById('kijelentkezes');
  logoutButton.addEventListener('click', logout);
});
