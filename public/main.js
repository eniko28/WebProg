async function showDetails(kod) {
  try {
    const result = await fetch(`./fooldal/${kod}`, { method: 'GET' });
    const bodyJson = await result.json();
    const details = JSON.stringify(bodyJson[0]);
    const mainPage = document.getElementById(`details-${kod}`);
    mainPage.innerHTML = details;
  } catch (error) {
    console.error('Hiba tortent a reszletek lekerese kozben:', error);
  }
}

async function deleteByName(nev) {
  try {
    const result = await fetch(`./allomany/${nev}`, { method: 'DELETE' });
    if (result.status === 200) {
      document.getElementById(`allomany-${nev}`).remove();
      alert('Az allomany sikeresen torolve lett');
    }
  } catch (error) {
    console.error('Hiba tortent az allomany torlesekor:', error);
  }
}

showDetails();
deleteByName();
