// js/modules/library.js
export function initLibrary() {
  const openBtn = document.getElementById('openLibrary');
  if (!openBtn) return;

  // Dados dos livros direto no código
  const books = [
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      cover: "assets/livros/cleancode.jpg",
      pdfUrl: "https://drive.google.com/file/d/1vFbtpo3JdocFU-XPDLPLH4WN7j56QiPr/view?usp=sharing"
    },
    {
      title: "Entendendo Algoritmos",
      author: "Aditya Y. Bhargava",
      cover: "assets/livros/entendendoalgoritimos.jpg",
      pdfUrl: "https://drive.google.com/file/d/1Ru9K7DrhAtEiX-eKbi8WyrZUOphgvhh5/view?usp=sharing"
    },
    {
      title: "Amazon AWS: Descomplicando a computação na nuvem",
      author: "Jonathan Lamim Antunes",
      cover: "assets/livros/aws.png",
      pdfUrl: "https://drive.google.com/file/d/1BPwWlPTQUKwmg8PoOR8OeFZ_qx8OGXxZ/view?usp=sharing"
    },
    {
      title: "Design Patterns",
      author: "Erich Gamma",
      cover: "assets/livros/paroesdeprojetos.jpg",
      pdfUrl: "https://drive.google.com/file/d/10fElZDk2SryUF7sS-8dZ9ZCEmE8lx4fk/view?usp=sharing"
    },
    {
      title: "PMBOK",
      author: "Project Management Institute",
      cover: "assets/livros/pmbok.png",
      pdfUrl: "https://drive.google.com/file/d/1JmsxBU9y-adgOzSWJd6QEp_5KRyLvbhX/view?usp=sharing"
    }
  ];

  openBtn.addEventListener('click', () => {
    const modal = document.getElementById('libraryModal');
    if (!modal) return;

    const grid = modal.querySelector('.book-cards');
    if (grid && !modal.dataset.loaded) {
      grid.innerHTML = books.map(book => `
        <div class="book-card">
          <img src="${book.cover}" alt="${book.title}" loading="lazy" onerror="this.src='https://placehold.co/116x155?text=Sem+Capa'">
          <h3>${book.title}</h3>
          <p>${book.author}</p>
          <a href="${book.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn-ver-pdf">Ver livro completo</a>
        </div>
      `).join('');
      modal.dataset.loaded = 'true';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}