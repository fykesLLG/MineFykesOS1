const introQuests = [
    { name: "Дерево", count: 32, desc: "Дерево — довольно важный ресурс." },
    { name: "Железо", count: 6, desc: "Очень хорошо для брони." },
    { name: "Уголь", count: 10, desc: "Научит тебя ценить факелы." },
    { name: "Редстоун", count: 64, desc: "Бро, а этот механизм крутой!" },
    { name: "Лазурит", count: 128, desc: "Добыть легко, но полезно." },
    { name: "Изумруд", count: 5, desc: "Нужно для экономики." }
];
const storyQuests = [
    { id: "s1", num: 1, title: "Первые деньги на шахте", target: "Пропиши /spawn, подойди к путеводителю -> работа -> шахта. Продай ресурсы шахтеру на ПКМ прямо там." },
    { id: "s2", num: 2, title: "В доме живешь, а смысл не приносишь?", target: "Добудь 20 кусков сырого мяса и положу в общий сундук." },
    { id: "s3", num: 3, title: "Киллер", target: "Убей не менее 10 игроков, заманив их в нашу трапку." },
    { id: "s4", num: 4, title: "Добытчик", target: "Добудь 2 стака досок (используй /kit start)." },
    { id: "s5", num: 5, title: "Черный", target: "Добудь 40 угля для печей нашей базы." },
    { id: "s6", num: 6, title: "Кровать", target: "Поставь личную кровать в доме." },
    { id: "s7", num: 7, title: "Бизнес фермы", target: "Заработай 300$ монет на работе Фермера." },
    { id: "s8", num: 8, title: "Жизнь", target: "Создай одиночный сундук в секретном месте и складывай ресурсы для базы общие." }
];
const baseQuests = [
    { id: "b1", num: 1, title: "Второй этаж", target: "Построй 2-й этаж нашей базы высотой в 3 блока, чтобы можно было прыгнуть на крыше." },
    { id: "b2", num: 2, title: "Оборонительная башня", target: "Построй 3-й этаж башню для поста и выстрелов." },
    { id: "b3", num: 3, title: "Строительный запас", target: "Скинь в общий сундук 100 блоков любых строительных." },
    { id: "b4", num: 4, title: "Контракт", target: "Возьми работу у главного AlexFykes." },
    { id: "b5", num: 5, title: "Налог лидеру", target: "Переведи 200 монет игроку AlexFykes через /pay." }
];
const factionQuests = [
    { id: "f1", num: 1, title: "Караул", target: "Простоять на посту самообороны ровно 15 минут." },
    { id: "f2", num: 2, title: "Разведка", target: "Проследить за окружающими зданиями и среды." },
    { id: "f3", num: 3, title: "Милитаризация", target: "Пополнить боевой арсенал (зелья силы, стрелы, щиты)." },
    { id: "f4", num: 4, title: "Военный склад", target: "Построить хранилище военных ресурсов." },
    { id: "f5", num: 5, title: "ПВО защита", target: "Создать лучшую защиту сверху от элитр или перлов." }
];
const rwCommands = [
    { cmd: "/rtp", desc: "Случайный телепорт." }, { cmd: "/spawn", desc: "Главный спавн." },
    { cmd: "/sethome [имя]", desc: "Точка дома." }, { cmd: "/home [имя]", desc: "Телепорт домой." },
    { cmd: "/pay [ник] [сумма]", desc: "Перевод денег." }, { cmd: "/ah", desc: "Аукцион." },
    { cmd: "/clan", desc: "Меню клана." }, { cmd: "/m zone", desc: "Меню приватов." },
    { cmd: "/rg claim [имя]", desc: "Создать приват." }, { cmd: "/rg addmember [рг] [ник]", desc: "Добавить друга в регион." },
    { cmd: "/kit", desc: "Бесплатные наборы." }, { cmd: "/feed", desc: "Утолить голод." },
    { cmd: "/pv [1-3]", desc: "Виртуальный сундук." }, { cmd: "/trade [ник]", desc: "Безопасный обмен." },
    { cmd: "/warp [имя]", desc: "Публичные варпы." }, { cmd: "/ignore [ник]", desc: "Мут игрока для себя." },
    { cmd: "/bal", desc: "Проверить баланс." }, { cmd: "/msg [ник] [текст]", desc: "ЛС сообщение." },
    { cmd: "/contract", desc: "Контракты на деньги." }, { cmd: "/fix", desc: "Починить вещь." }
];

function initData() {
    const testPassed = localStorage.getItem('rw_intro_test') === 'true';
    if (testPassed) {
        if (document.getElementById('welcome-screen')) document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('main-hub').classList.remove('hidden-right');
        document.getElementById('main-hub').classList.add('slide-center');
        loadAllHubContents();
    } else { renderIntroTasks(); }
}
function renderIntroTasks() {
    const container = document.getElementById('intro-tasks-container'); if (!container) return; container.innerHTML = ''; let allDone = true;
    introQuests.forEach((q, index) => {
        const key = `intro_task_${index}`; const checked = localStorage.getItem(key) === 'true'; if (!checked) allDone = false;
        const row = document.createElement('div'); row.className = 'table-row';
        row.innerHTML = `<strong>${q.name}</strong><span>${q.count} шт.</span><span style="color:#8b8ba7; font-size:13px;">${q.desc}</span><div><button class="chk-btn ${checked ? 'checked' : ''}" onclick="toggleIntroTask(${index})">✔</button></div>`;
        container.appendChild(row);
    });
    if (allDone) {
        localStorage.setItem('rw_intro_test', 'true');
        setTimeout(() => {
            document.getElementById('welcome-screen').classList.add('slide-left');
            document.getElementById('main-hub').classList.remove('hidden-right');
            document.getElementById('main-hub').classList.add('slide-center');
            loadAllHubContents();
        }, 500);
    }
}
window.toggleIntroTask = function(index) { const key = `intro_task_${index}`; localStorage.setItem(key, localStorage.getItem(key) !== 'true'); renderIntroTasks(); }
function loadAllHubContents() { renderQuestList('story-quests-list', storyQuests, 'story'); renderQuestList('base-quests-list', baseQuests, 'base'); renderQuestList('faction-quests-list', factionQuests, 'faction'); renderCommands(); updateProfileData(); }
function renderQuestList(containerId, data, type) {
    const container = document.getElementById(containerId); if (!container) return; container.innerHTML = '';
    const storyAllDone = storyQuests.every(q => localStorage.getItem(`quest_${q.id}`) === 'true');
    const baseAllDone = baseQuests.every(q => localStorage.getItem(`quest_${q.id}`) === 'true');
    if (type === 'faction') {
        const fBtn = document.getElementById('nav-btn-faction');
        if (storyAllDone && baseAllDone) { if (fBtn) fBtn.removeAttribute('disabled'); if(document.getElementById('faction-lock-msg')) document.getElementById('faction-lock-msg').style.display = 'none'; } else { return; }
    }
    data.forEach(q => {
        const checked = localStorage.getItem(`quest_${q.id}`) === 'true'; const row = document.createElement('div'); row.className = 'table-row';
        row.innerHTML = `<strong>${q.num}. ${q.title}</strong><span style="color:var(--accent-orange); font-weight:bold;">Цель:</span><span style="color:#aaa; font-size:13.5px;">${q.target}</span><div><button class="chk-btn ${checked ? 'checked' : ''}" onclick="toggleMainQuest('${q.id}', '${type}')">✔</button></div>`;
        container.appendChild(row);
    });
}
window.toggleMainQuest = function(id, type) {
    localStorage.setItem(`quest_${id}`, localStorage.getItem(`quest_${id}`) !== 'true');
    if (id === 'b5') {
        const currentDeposit = parseInt(localStorage.getItem('clan_deposit') || 0);
        localStorage.setItem('clan_deposit', localStorage.getItem('quest_b5') === 'true' ? currentDeposit + 200 : Math.max(0, currentDeposit - 200));
    }
    loadAllHubContents();
}
function renderCommands() {
    const container = document.getElementById('commands-container'); if (!container) return; container.innerHTML = '';
    rwCommands.forEach(c => {
        const card = document.createElement('div'); card.className = 'cmd-card'; card.innerHTML = `<code>${c.cmd}</code><p>${c.desc}</p>`;
        card.onclick = () => { navigator.clipboard.writeText(c.cmd); alert(`Команда ${c.cmd} скопирована!`); }; container.appendChild(card);
    });
}
function updateProfileData() {
    const totalStory = storyQuests.length; const completedStory = storyQuests.filter(q => localStorage.getItem(`quest_${q.id}`) === 'true').length;
    const percent = totalStory > 0 ? Math.round((completedStory / totalStory) * 100) : 0;
    if (document.getElementById('story-progress-percent')) document.getElementById('story-progress-percent').innerText = `${percent}%`;
    if (document.getElementById('clan-deposit-amount')) document.getElementById('clan-deposit-amount').innerText = `${localStorage.getItem('clan_deposit') || 0} $`;
}
window.addEventListener('DOMContentLoaded', initData);
          
