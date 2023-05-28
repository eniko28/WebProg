document.addEventListener('DOMContentLoaded', () => {
  const showDetails = async (kod) => {
    try {
      const result = await fetch(`./fooldal/${kod}`, { method: 'GET' });
      if (result.status === 400) {
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
    function fgv() {
      showDetails(kod);
    };

  const showMore = document.getElementsByClassName('show-details');
  for (let i = 0; i < showMore.length; i++) {
    const element = showMore[i];
    const kod = element.id.split('-')[1];
    element.addEventListener('click', showDetailsOnClick(kod));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const deleteByName = async (nev) => {
    try {
      const result = await fetch(`./allomany/${nev}`, { method: 'DELETE' });
      if (result.status === 200) {
        document.getElementById(`allomany-${nev}`).remove();
        alert('Az állomány sikeresen törölve lett!');
      } else {
        alert('Hiba az állomány törlésekor!');
      }
    } catch (error) {
      console.error('Hiba történt az állomány törlése során:', error);
      alert('Hiba történt az állomány törlése során. Kérlek, próbáld újra később!');
    }
  };

  const deleteButtons = document.getElementsByClassName('delete-button');
  for (let i = 0; i < deleteButtons.length; i++) {
    const button = deleteButtons[i];
    const nev = button.getAttribute('data-nev');
    button.addEventListener('click', () => {
      deleteByName(nev);
    });
  }
});
