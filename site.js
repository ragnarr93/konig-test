const toneButtons = [...document.querySelectorAll('.swatch')];
const toneStatus = document.querySelector('#tone-status');
const summary = document.querySelector('#summary');
let selectedTone = toneButtons[0].dataset.tone;

function updateSummary(form) {
  const values = new FormData(form);
  const details = values.get('küsimus').trim() || '—';
  summary.textContent = [
    'PESA 65 · ' + selectedTone,
    values.get('nimi') + ' · ' + values.get('email'),
    details
  ].join('\n');
}

toneButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedTone = button.dataset.tone;
    toneButtons.forEach((choice) => choice.setAttribute('aria-pressed', String(choice === button)));
    toneStatus.textContent = 'Valitud toon on ' + selectedTone.toLocaleLowerCase('et') + '. Tootepildil on hallikaspruun kavand.';
    if (!summary.hidden) updateSummary(document.querySelector('#request-form'));
  });
});

document.querySelector('#request-form').addEventListener('submit', (event) => {
  event.preventDefault();
  updateSummary(event.currentTarget);
  summary.hidden = false;
});
