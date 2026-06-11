// js/modules/library.js
export async function initLibrary() {
  const openBtn = document.getElementById('openLibrary');
  if (!openBtn) return;

  openBtn.addEventListener('click', async () => {
    const modal = document.getElementById('libraryModal');
    if (!modal) return;

    if (!modal.dataset.loaded) {
      try {
        // Caminho relativo à raiz do site (ajuste se necessário)
        const response = await fetch('/data/books.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const books = await response.json();

        const grid = modal.querySelector('.book-cards');
        if (grid) {
          grid.innerHTML = books.map(book => `
            <div class="book-card">
              <img src="${book.cover}" alt="${book.title}" loading="lazy">
              <h3>${book.title}</h3>
              <p>${book.author}</p>
              <a href="${book.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn-ver-pdf">Ver livro completo</a>
            </div>
          `).join('');
        }
        modal.dataset.loaded = 'true';
      } catch (err) {
        console.error('[library] Erro ao carregar livros:', err);
        const grid = modal.querySelector('.book-cards');
        if (grid) grid.innerHTML = '<p style="color: var(--text-muted);">Erro ao carregar biblioteca. Tente novamente mais tarde.</p>';
      }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}