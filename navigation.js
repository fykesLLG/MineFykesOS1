document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.hasAttribute('disabled')) return;
            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active-tab'));
            button.classList.add('active');
            const targetTabId = button.getAttribute('data-tab');
            const targetTab = document.getElementById(targetTabId);
            if (targetTab) targetTab.classList.add('active-tab');
        });
    });
});
