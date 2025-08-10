// Basit interaktivite: nav toggle, modal, not kaydetme (localStorage), şiir modal
document.addEventListener('DOMContentLoaded', () => {
    // yıl
    document.getElementById('year').textContent = new Date().getFullYear();

    // nav toggle
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    navToggle && navToggle.addEventListener('click', () => {
        const shown = nav.style.display === 'flex';
        nav.style.display = shown ? 'none' : 'flex';
    });

    // modal işlemleri
    const letterModal = document.getElementById('letterModal');
    const openLetter = document.getElementById('openLetter');
    const closeLetter = document.getElementById('closeLetter');
    const hideLetter = document.getElementById('hideLetter');
    const saveLetter = document.getElementById('saveLetter');
    const letterText = document.getElementById('letterText');

    openLetter && openLetter.addEventListener('click', () => {
        letterModal.setAttribute('aria-hidden', 'false');
    });
    closeLetter && closeLetter.addEventListener('click', () => {
        letterModal.setAttribute('aria-hidden', 'true');
    });
    hideLetter && hideLetter.addEventListener('click', () => {
        letterModal.setAttribute('aria-hidden', 'true');
    });
    saveLetter && saveLetter.addEventListener('click', () => {
        localStorage.setItem('secretLetter', letterText.value || '');
        alert('Mektup kaydedildi — sadece sen görebilirsin.');
        letterModal.setAttribute('aria-hidden', 'true');
    });

    // şiir modal
    const poemModal = document.getElementById('poemModal');
    const openPoem = document.getElementById('openPoem');
    const closePoem = document.getElementById('closePoem');
    openPoem && openPoem.addEventListener('click', () => {
        poemModal.setAttribute('aria-hidden', 'false');
    });
    closePoem && closePoem.addEventListener('click', () => {
        poemModal.setAttribute('aria-hidden', 'true');
    });

    // notlar: localStorage
    const noteForm = document.getElementById('noteForm');
    const noteText = document.getElementById('noteText');
    const saveNote = document.getElementById('saveNote');
    const clearNotes = document.getElementById('clearNotes');
    const notesList = document.getElementById('notesList');

    function renderNotes() {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        notesList.innerHTML = '';
        notes.slice().reverse().forEach(n => {
            const li = document.createElement('li');
            li.textContent = n;
            notesList.appendChild(li);
        });
    }
    renderNotes();

    saveNote && saveNote.addEventListener('click', () => {
        const val = noteText.value.trim();
        if (!val) return alert('Boş not kaydetme!');
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        notes.push(val);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteText.value = '';
        renderNotes();
    });

    clearNotes && clearNotes.addEventListener('click', () => {
        if (!confirm('Tüm notları silmek istediğine emin misin?')) return;
        localStorage.removeItem('notes');
        renderNotes();
    });

    // sayfa yüklendiğinde varsa gizli mektubu geri getir
    const stored = localStorage.getItem('secretLetter');
    if (stored) letterText.value = stored;
});
