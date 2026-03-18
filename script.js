const form = document.getElementById('formAtendimento');
const statusBox = document.getElementById('status');

form.addEventListener('submit', async (e)=>{
  e.preventDefault();

  const dados = Object.fromEntries(new FormData(form));

  await fetch('https://n8n.srv1352561.hstgr.cloud/webhook-test/balcao-virtual', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(dados)
  });

  form.classList.add('hidden');
  statusBox.classList.remove('hidden');
});
