document.addEventListener('DOMContentLoaded', () => {
  const showDetails = async (kod) => {
    const result = await fetch(`./fooldal/${kod}`, { method: 'GET' });
    if (result.status === 400) {
      alert('Sikertelen extra informaciok megjelenitese!');
    } else {
      const bodyJson = await result.json();
      let details = '';
      Object.keys(bodyJson[0]).forEach((key) => {
        details += `${key}: ${bodyJson[0][key]}\n`;
      });
      const detailsContainer = document.getElementById(`details-${kod}`);
      detailsContainer.innerText = details;
    }
  };

  const showDetailsOnClick = (kod) =>
    function fgv() {
      showDetails(kod);
    };

  const showDetailsElements = document.getElementsByClassName('show-details');
  for (let i = 0; i < showDetailsElements.length; i++) {
    const element = showDetailsElements[i];
    const kod = element.id.split('-')[1];
    element.addEventListener('click', showDetailsOnClick(kod));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const deleteByName = async (nev) => {
    const result = await fetch(`./allomany/${nev}`, { method: 'DELETE' });
    if (result.status === 200) {
      document.getElementById(`allomany-${nev}`).remove();
      alert('Az állomány sikeresen törölve lett');
    } else {
      alert('Hiba az állomány törlésekor');
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
