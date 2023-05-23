async function showDetails(kod) {
  const result = await fetch(`./fooldal/${kod}`, { method: 'GET' });
  const bodyJson = await result.json();
  const details = JSON.stringify(bodyJson[0]);
  const mainPage = document.getElementById(`details-${kod}`);
  mainPage.innerHTML = details;
}

async function deleteByName(nev) {
  const result = await fetch(`./allomany/${nev}`, { method: 'DELETE' });
  if (result.status === 200) {
    document.getElementById(`allomany-${nev}`).remove();
    alert('Az allomany sikeresen torolve lett');
  }
}

showDetails();
deleteByName();
