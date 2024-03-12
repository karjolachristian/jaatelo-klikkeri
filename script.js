document.addEventListener('DOMContentLoaded', function() {
  const jäätelö = document.getElementById('jäätelö');
  const klikkauspainike = document.getElementById('klikkauspainike');
  const laskurinäyttö = document.getElementById('laskuri');
  const ostaBoosteriPainike = document.getElementById('ostaBoosteriPainike');
  const boosteriValikko = document.getElementById('boosteriValikko');
  const ostaKaksinkertaisetKlikkauksetPainike = document.getElementById('ostaKaksinkertaisetKlikkauksetPainike');
  const ostaAutomaattinenTuotantoPainike = document.getElementById('ostaAutomaattinenTuotantoPainike');

  let jäätelöLaskuri = 0;
  let klikkaukset = 1;
  let onkoBoosteriValikkoAuki = false;
  let automaattisenTuotannonVäli;
  let automaattinenTuotantoOstettu = false;

  klikkauspainike.addEventListener('click', function() {
    jäätelöLaskuri += klikkaukset;
    laskurinäyttö.textContent = jäätelöLaskuri + ' jäätelöä';
    soitaÄäni();
    päivitäOstaBoosteriPainike();
  });

  function soitaÄäni() {
    const ääni = new Audio('assets/click.mp3');
    ääni.play();
  }

  function päivitäOstaBoosteriPainike() {
    if (jäätelöLaskuri >= 10) {
      ostaBoosteriPainike.disabled = false;
    } else {
      ostaBoosteriPainike.disabled = true;
    }
  }

  ostaBoosteriPainike.addEventListener('click', function() {
    if (!onkoBoosteriValikkoAuki) {
      boosteriValikko.style.display = 'block';
      onkoBoosteriValikkoAuki = true;
    } else {
      boosteriValikko.style.display = 'none';
      onkoBoosteriValikkoAuki = false;
    }
  });

  ostaKaksinkertaisetKlikkauksetPainike.addEventListener('click', function() {
    if (jäätelöLaskuri >= 10) {
      klikkaukset *= 2;
      jäätelöLaskuri -= 10;
      laskurinäyttö.textContent = jäätelöLaskuri + ' jäätelöä';
      päivitäOstaBoosteriPainike();
    }
  });

  ostaAutomaattinenTuotantoPainike.addEventListener('click', function() {
    if (jäätelöLaskuri >= 50 && !automaattinenTuotantoOstettu) {
      automaattinenTuotantoOstettu = true;
      jäätelöLaskuri -= 50;
      laskurinäyttö.textContent = jäätelöLaskuri + ' jäätelöä';
      automaattisenTuotannonVäli = setInterval(tuotaJäätelöä, 1000);
      ostaAutomaattinenTuotantoPainike.style.display = 'none';
      päivitäOstaBoosteriPainike();
    }
  });

  function tuotaJäätelöä() {
    jäätelöLaskuri += (klikkaukset * (onkoKaksinkertaisetKlikkauksetOstettu() ? 2 : 1));
    laskurinäyttö.textContent = jäätelöLaskuri + ' jäätelöä';
  }

  function onkoKaksinkertaisetKlikkauksetOstettu() {
    return true;
  }
});
