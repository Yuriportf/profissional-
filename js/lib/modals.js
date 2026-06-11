export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('active');
  if (!document.querySelector('.modal-overlay.active')) {
    document.body.style.overflow = '';
  }
}

// Fechar ao clicar no overlay
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('active')) {
    const id = e.target.id;
    if (id) closeModal(id);
    else {
      e.target.classList.remove('active');
      if (!document.querySelector('.modal-overlay.active')) document.body.style.overflow = '';
    }
  }
});

// Fechar com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    if (!document.querySelector('.modal-overlay.active')) document.body.style.overflow = '';
  }
});