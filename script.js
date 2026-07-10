/* ═══════════════════════════════════════════════════════
   AGENDA + CANCELAMENTO — script.js
═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ════════════════════════════════════════════════════
    // ABAS — NAVEGAÇÃO
    // ════════════════════════════════════════════════════
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.view-panel');

    function switchTab(targetTab) {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => {
            p.classList.remove('active');
            p.style.display = 'none';
        });

        const activeTab = document.querySelector(`.tab[data-tab="${targetTab}"]`);
        const activePanel = document.getElementById(`panel${capitalize(targetTab)}`);

        activeTab.classList.add('active');
        activePanel.style.display = 'block';

        void activePanel.offsetWidth;
        activePanel.classList.add('active');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    panels.forEach(p => {
        if (!p.classList.contains('active')) {
            p.style.display = 'none';
        }
    });

    // ════════════════════════════════════════════════════
    // CONSTANTES COMPARTILHADAS
    // ════════════════════════════════════════════════════
    const BASE_URL = 'https://n8n.srv1352561.hstgr.cloud/webhook-test';

    const FERIADOS = [
        '2026-01-01', '2026-04-21', '2026-04-23', '2026-04-24',
        '2026-05-01', '2026-06-04', '2026-06-05', '2026-09-07',
        '2026-10-12', '2026-11-02', '2026-11-13', '2026-11-20', '2026-12-25'
    ];

    const DIAS_BLOQUEADOS = [0, 6]; // Dom, Sáb

    function toISO(d) {
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    function isDiaUtil(d) {
        return !DIAS_BLOQUEADOS.includes(d.getDay()) && !FERIADOS.includes(toISO(d));
    }

    function proximoDiaUtil(base = new Date()) {
        const d = new Date(base);
        do {
            d.setDate(d.getDate() + 1);
        } while (!isDiaUtil(d));
        return d;
    }

    function addDiasUteis(base, n) {
        const d = new Date(base);
        let c = 0;

        while (c < n) {
            d.setDate(d.getDate() + 1);
            if (isDiaUtil(d)) c++;
        }

        return d;
    }

    // ════════════════════════════════════════════════════
    // 
    // ════════════════════════════════════════════════════
    const formAtendimento = document.getElementById('formAtendimento');
    const successAgenda = document.getElementById('successAgenda');
    const selectHor = document.getElementById('horarios');
    const inputData = document.getElementById('data');
    const btnAgendar = document.getElementById('btnAgendar');
   // ESCOLA → E-MAIL
const selectEscola = document.getElementById('nome_escola');
const emailEscola = document.getElementById('email');

const emailsEscolas = {
    "ACHILLES ALMEIDA BARRETO (E. M. Prof.)": "empachillesbarreto@semecabofrio.rj.gov.br",
    "AGRISA (E. M.)": "emagrisa@semecabofrio.rj.gov.br",
    "ALFREDINA OLIVEIRA FRANCESCONI (E. M. Prof.ª)": "empalfredinafrancesconi@semecabofrio.rj.gov.br",
    "ALFREDO CASTRO (E. M.)": "emalfredocastro@semecabofrio.rj.gov.br",
    "ALITTA MARIA DO VALLE (E. M. Prof.ª)": "empalittadovalle@semecabofrio.rj.gov.br",
    "AMÉLIA FERREIRA (E. M. Prof.ª)": "empameliaferreira@semecabofrio.rj.gov.br",
    "AMENA MAYALL (E.M. Prof.ª)": "empamenamayall@semecabofrio.rj.gov.br",
    "AMÉRICA DOS ANJOS MONICA (E. M.)": "emamericadosanjos@semecabofrio.rj.gov.br",
    "ANA PEREIRA GONÇALVES (E. M. E. I. Prof.ª)": "empanapereira@semecabofrio.rj.gov.br",
    "ANGELIM (E. E. Mz.)": "eemangelim@semecabofrio.rj.gov.br",
    "ANITA TEIXEIRA DA SILVA (E.M. E.I. Prof.ª)": "emeipanitateixeira@semecabofrio.rj.gov.br",
    "ANTONIO DA CUNHA AZEVEDO (E. M.)": "emantoniodacunha@semecabofrio.rj.gov.br",
    "ARAÇÁ (E. M.)": "emaraca@semecabofrio.rj.gov.br",
    "ARLETE ROSA CASTANHO (E. M.)": "emarleterosa@semecabofrio.rj.gov.br",
    "Associação de Pais e Amigos dos Excepcionais (APAE)": "apae@semecabofrio.rj.gov.br",
    "CARLOS ALBERTO GOMES DE CARVALHO (E. M. Prof.)": "empcarlosalberto@semecabofrio.rj.gov.br",
    "CATHARINA DA SILVEIRA CORDEIRO (E. M . Prof.ª)": "empcatharinadasilveira@semecabofrio.rj.gov.br",
    "CECILIA NOGUEIRA MACHADO GUIA (E. M. Prof.ª)": "empcecilianogueira@semecabofrio.rj.gov.br",
    "CILÉA MARIA BARRETO (E. M. Prof.ª)": "empcileabarreto@semecabofrio.rj.gov.br",
    "CLADYR DA ROCHA MENDES (E. M.E.I.)": "emeicladyrmendes@semecabofrio.rj.gov.br",
    "CLÁUDIA MUZIO FREITAS DE OLIVEIRA (E. M. Prof.ª)": "empclaudiamuzio@semecabofrio.rj.gov.br",
    "CLEUSA GUIMARÃES FARIA BRAGA (E.M. E. I. Prof.ª)": "emeipcleusaguimaraes@semecabofrio.rj.gov.br",
    "DALCY BARROSO PILLAR (E. M. E. I. Prof.ª)": "emeipdalcypillar@semecabofrio.rj.gov.br",
    "DEMERVAL ALVES RANGEL (E. M.)": "emeidemervalrangel@semecabofrio.rj.gov.br",
    "DEODORO AZEVEDO (E. M.)": "emdeodoroazevedo@semecabofrio.rj.gov.br",
    "DOMINGOS GOUVÊA (E. M.)": "emdomingosgouvea@semecabofrio.rj.gov.br",
    "EDILSON DUARTE (E. M. Prof.)": "empedilsonduarte@semecabofrio.rj.gov.br",
    "EDITH CASTRO DOS SANTOS (E. M.)": "emedithcastro@semecabofrio.rj.gov.br",
    "ELENICE MARTINS (Creche E. M. Prof.ª)": "cempelenicemartins@semecabofrio.rj.gov.br",
    "ELENITA FERREIRA DOS SANTOS ABREU (E. M. E.I. Prof.ª)": "emeipelenitaferreira@semecabofrio.rj.gov.br",
    "ELICÉA DA SILVEIRA (E. M. Prof.ª)": "empeliceadasilveira@semecabofrio.rj.gov.br",
    "ELZA MARIA SANTA ROSA BERNARDO (Colégio M. Prof.ª)": "cmpelzabernardo@semecabofrio.rj.gov.br",
    "ETELVINA SANTANA DA FONSECA (E. M.)": "emetelvinafonseca@semecabofrio.rj.gov.br",
    "EVALDO SALLES (E. M.)": "emevaldosalles@semecabofrio.rj.gov.br",
    "FRANCISCA NAZARETH DE SOUZA (E. E. Mz.)": "eemfranciscanazareth@semecabofrio.rj.gov.br",
    "FRANCISCO FRANCO (E.M.)": "emfranciscofranco@semecabofrio.rj.gov.br",
    "IZABEL DOS SANTOS MACHADO (E.M.Prof.ª)": "empizabelmachado@semecabofrio.rj.gov.br",
    "JANAÍNA TELES MARTINS (E.M.E.I. Profª)": "emjanainateles@semecabofrio.rj.gov.br",
    "JOÃO BESSA TEIXEIRA (E. M.)": "emjoaobessa@semecabofrio.rj.gov.br",
    "JOÃO EVANGELISTA DOS SANTOS (E. M.)": "emjoaoevangelista@semecabofrio.rj.gov.br",
    "JOÃO ROCHA (E. M.)": "emjoaorocha@semecabofrio.rj.gov.br",
    "JOÃO TRAJANO BANDEIRA CAIXEIRO (E. M. E. I. Prof.)": "emeipjoaotrajano@semecabofrio.rj.gov.br",
    "JOSÉ BONIFÁCIO FERREIRA NOVELLINO (E. M.)": "emjosebonifacio@semecabofrio.rj.gov.br",
    "JOSÉ FRANCISCO DA SILVEIRA JÚNIOR (E. M. Prof.)": "empjosefrancisco@semecabofrio.rj.gov.br",
    "JUSTINIANO DE SOUZA (E. M.)": "emjustinianodesouza@semecabofrio.rj.gov.br",
    "LAIR DIAS GAGO PEREIRA (E. M. Prof.ª)": "emplairgago@semecabofrio.rj.gov.br",
    "LEAQUIM SCHUINDT (E. M. Vereador)": "emvleaquimschuindt@semecabofrio.rj.gov.br",
    "LEOMARI GARCIA BARRETO (E. M. Prof.ª)": "empleomaribarreto@semecabofrio.rj.gov.br",
    "LERINÉA FIGUEIREDO (E. M. Prof.ª)": "emplerineafigueiredo@semecabofrio.rj.gov.br",
    "LUCELÉA RODRIGUES DA COSTA (E. M. Prof.ª)": "emplucelearodrigues@semecabofrio.rj.gov.br",
    "MANOEL MENDES DE SOUZA (E. M.)": "emmanoelmendes@semecabofrio.rj.gov.br",
    "MÁRCIA FRANCESCONI PEREIRA (E. M. Prof.ª)": "empmarciafrancesconi@semecabofrio.rj.gov.br",
    "MARIA AMÁLIA DOS SANTOS SILVEIRA (C. E. M. Prof.ª)": "cempmariaamalia@semecabofrio.rj.gov.br",
    "MARIA APARECIDA DE AZEVEDO GALVÃO (CENAP Profª)": "cenapemariaaparecida@semecabofrio.rj.gov.br",
    "MARIA DARIA SALDANHA (E. M.)": "emmariadaria@semecabofrio.rj.gov.br",
    "MARIA DUTRA DA SILVEIRA (E.M.E.I)": "emeimariadutra@semecabofrio.rj.gov.br",
    "MARIA EMILIA DOS SANTOS CASTRO (Creche E. M.)": "cemmariaemilia@semecabofrio.rj.gov.br",
    "MARIA HELENA BELLO DA COSTA (E.M.)": "emmariahelenabello@semecabofrio.rj.gov.br",
    "MARIA JOSÉ BARROSO (E. M. Prof.ª)": "empmariajosebarroso@semecabofrio.rj.gov.br",
    "MARIA LEONÍDIA PARENTES FORTES MARTINS PINHEIRO (Creche Municipal)": "cmmarialeonidia@semecabofrio.rj.gov.br",
    "MARIA QUITÉRIA DA COSTA RIBEIRO (Creche M. Prof.ª)": "cmpmariaquiteria@semecabofrio.rj.gov.br",
    "MARIA SALVADORA SILVA (E. M. Prof.ª)": "empmariasalvadora@semecabofrio.rj.gov.br",
    "MARÍLIA DE TEVES MORENO (Creche E. M. Prof.ª)": "cempmariliadeteves@semecabofrio.rj.gov.br",
    "MARÍLIA PLAISANT (E. M. Prof.ª)": "empmariliaplaisant@semecabofrio.rj.gov.br",
    "MARLI CAPP (Centro Educacional M. Prof.ª)": "cempmarlicapp@semecabofrio.rj.gov.br",
    "NEUSA AGUALUSA DA COSTA (E.M.E.I)": "emeineusaagualuza@semecabofrio.rj.gov.br",
    "NILO BATISTA (Escola Agrícola Municipal)": "eamnilobatista@semecabofrio.rj.gov.br",
    "OSWALDO SANTA ROSA (E. M. Prof.)": "emposwaldosantarosa@semecabofrio.rj.gov.br",
    "PALMIRA BESSA DE FIGUEIREDO (E. M.)": "empalmirabessa@semecabofrio.rj.gov.br",
    "PATRÍCIA AZEVEDO DE ALMEIDA (E. M. Profª.)": "emppatriciaazevedo@semecabofrio.rj.gov.br",
    "PAULO BURLE (E. M.)": "empauloburle@semecabofrio.rj.gov.br",
    "PEDRO JOTHA (E. M.)": "empedrojotha@semecabofrio.rj.gov.br",
    "POMAR (E.M.E. I. do)": "emeidopomar@semecabofrio.rj.gov.br",
    "RENATO AZEVEDO (E. M. Prof.)": "emrenatoazevedo@semecabofrio.rj.gov.br",
    "ROBINSON CARVALHO DE AZEVEDO (E. M.)": "emrobinsoncarvalho@semecabofrio.rj.gov.br",
    "RUI BARBOSA (Colégio Municipal)": "cmruibarbosa@semecabofrio.rj.gov.br",
    "RUI CAPDEVILLE (E. M. Maestro)": "emmruicapdeville@semecabofrio.rj.gov.br",
    "TALITA HERNANDES PERELLÓ (E. M.)": "emtalitaperello@semecabofrio.rj.gov.br",
    "TEIXEIRA E SOUZA (E. E. Mz.)": "eemteixeiraesouza@semecabofrio.rj.gov.br",
    "THEMIRA PALMER (E. M.)": "emthemirapalmer@semecabofrio.rj.gov.br",
    "TIO COTIAS (E. M. E.I.)": "emtiocotias@semecabofrio.rj.gov.br",
    "TOSANA (E. E. Mz.)": "eemtosana@semecabofrio.rj.gov.br",
    "VOVO CINHA (E. M.E.I)": "emeivovocinha@semecabofrio.rj.gov.br",
    "VOVO OLIVIA (E. M.E. I.)": "emeivovoolivia@semecabofrio.rj.gov.br",
    "WALDEMIRA TERESA DE JESUS (E. M.)": "emwaldemirateresadejesus@semecabofrio.rj.gov.br",
    "WANDA M.ª NOGUEIRA GONÇALVES (Creche E. M. Prof.ª)": "cempwandagoncalves@semecabofrio.rj.gov.br",
    "WANDA PEREIRA ROQUE (E. M. Prof.ª)": "empwandaroque@semecabofrio.rj.gov.br",
    "WARLEY STUDART (CENAP)": "cmiswarlystudart@semecabofrio.rj.gov.br",
    "YONE NOGUEIRA (E. M.E. I. Prof.ª)": "emeipyonenogueira@semecabofrio.rj.gov.br",
    "ZÉLIO JOTHA (E. M. Prof.)": "empzeliojotha@semecabofrio.rj.gov.br"
};

selectEscola.addEventListener('change', () => {
    emailEscola.value = emailsEscolas[selectEscola.value] || '';
    validarFormularioAgenda();
});

    // CAMPOS OBRIGATÓRIOS
    const camposObrigatoriosAgenda = formAtendimento.querySelectorAll('[required]');

    // BOTÃO COMEÇA DESABILITADO
    btnAgendar.disabled = true;

    function validarFormularioAgenda() {

       if (emailEscola) {
                         emailEscola.value = emailsEscolas[selectEscola.value] || '';
                        }
        const preenchidos = [...camposObrigatoriosAgenda].every(campo => {

            if (campo.type === 'checkbox' || campo.type === 'radio') {
                return campo.checked;
            }

            return campo.value.trim() !== '';
        });

        btnAgendar.disabled = !(preenchidos && selectHor.value);
    }

    camposObrigatoriosAgenda.forEach(campo => {
        campo.addEventListener('input', validarFormularioAgenda);
        campo.addEventListener('change', validarFormularioAgenda);
    });

    function configurarCalendario() {

        let hoje = new Date();

        if (hoje.getHours() >= 16) {
            hoje.setDate(hoje.getDate() + 1);
        }

        hoje.setHours(0, 0, 0, 0);

        const minDate = proximoDiaUtil(hoje);
        const maxDate = addDiasUteis(hoje, 5);

        inputData.min = toISO(minDate);
        inputData.max = toISO(maxDate);
        inputData.value = toISO(minDate);
    }

    async function carregarHorarios() {

        const dataSel = inputData.value;

        if (!dataSel) return;

        selectHor.innerHTML = '<option value="">Carregando...</option>';
        btnAgendar.disabled = true;

        try {

            const res = await fetch(`${BASE_URL}/disponibilidadeonline?data=${dataSel}`);

            if (!res.ok) {
                throw new Error();
            }

            const data = await res.json();
            const slots = data.slots || data;

            if (!slots || slots.length === 0) {

                selectHor.innerHTML =
                    '<option value="">Sem horários disponíveis</option>';

                validarFormularioAgenda();
                return;
            }

            selectHor.innerHTML =
                '<option value="">Selecione o horário</option>';

            slots.forEach(slot => {

                const o = document.createElement('option');

                o.value = slot.inicio;
                o.textContent = slot.hora;

                selectHor.appendChild(o);
            });

            validarFormularioAgenda();

        } catch {

            selectHor.innerHTML =
                '<option value="">Erro ao carregar horários</option>';

            validarFormularioAgenda();
        }
    }

    selectHor.addEventListener('change', validarFormularioAgenda);

    inputData.addEventListener('change', () => {

        const d = new Date(inputData.value + 'T00:00:00');

        if (!isDiaUtil(d)) {

            alert('Não há atendimento nesse dia. Selecione um dia útil.');

            inputData.value = toISO(proximoDiaUtil(d));
        }

        carregarHorarios();
        validarFormularioAgenda();
    });

    formAtendimento.addEventListener('submit', async (e) => {

        e.preventDefault();

        const dados = Object.fromEntries(new FormData(formAtendimento));
        const inicio = selectHor.value;

        if (!inicio) {
            alert('Selecione um horário.');
            return;
        }

        btnAgendar.disabled = true;
        btnAgendar.innerHTML = 'Agendando...';

        try {

            const res = await fetch(`${BASE_URL}/agendamentoonline`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...dados,
                    inicio
                })
            });

            if (!res.ok) {
                throw new Error();
            }

            formAtendimento.style.display = 'none';
            successAgenda.classList.remove('hidden');

        } catch {

            alert('Erro ao agendar. Tente novamente.');

            btnAgendar.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Agendar Atendimento
            `;

            validarFormularioAgenda();
        }
    });

    // RESET PARA NOVO 
    window.resetAgenda = function () {

        formAtendimento.reset();

        formAtendimento.style.display = '';
        successAgenda.classList.add('hidden');

        btnAgendar.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Agendar Atendimento
        `;

        configurarCalendario();
        carregarHorarios();

        setTimeout(validarFormularioAgenda, 300);
    };

    // INICIALIZAÇÃO 
    configurarCalendario();
    carregarHorarios();
    validarFormularioAgenda();

    // ════════════════════════════════════════════════════
    // CANCELAMENTO
    // ════════════════════════════════════════════════════
    const formCancel = document.getElementById('formCancel');
    const protocoloEl = document.getElementById('protocolo');
    const feedbackEl = document.getElementById('feedbackCancel');
    const WEBHOOK_CANCEL = `${BASE_URL}/cancelar`;

    protocoloEl.addEventListener('input', () => {
        protocoloEl.value = protocoloEl.value.replace(/[^0-9]/g, '');
    });

    formCancel.addEventListener('submit', async (e) => {

        e.preventDefault();

        const protocolo = protocoloEl.value.trim();

        if (!protocolo) {
            alert('Informe o número do protocolo.');
            return;
        }

        const btnCancelar = document.getElementById('btnCancelar');

        btnCancelar.disabled = true;
        btnCancelar.innerHTML = 'Processando...';

        feedbackEl.classList.add('hidden');
        feedbackEl.className = 'feedback-cancel hidden';

        try {

            const res = await fetch(WEBHOOK_CANCEL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    protocolo
                })
            });

            if (!res.ok) {
                throw new Error();
            }

            feedbackEl.textContent =
                '✅ Cancelamento realizado com sucesso!';

            feedbackEl.className =
                'feedback-cancel success';

            feedbackEl.classList.remove('hidden');

            formCancel.reset();

        } catch {

            feedbackEl.textContent =
                '❌ Não foi possível cancelar. Verifique o protocolo ou tente novamente.';

            feedbackEl.className =
                'feedback-cancel error';

            feedbackEl.classList.remove('hidden');

        } finally {

            btnCancelar.disabled = false;

            btnCancelar.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                Cancelar 
            `;
        }
    });

});
