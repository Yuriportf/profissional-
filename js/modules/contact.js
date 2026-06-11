// js/modules/contact.js
export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const mensagem = document.getElementById('contactMessage')?.value.trim();
    const botao = form.querySelector('button[type="submit"]');
    const textoOriginal = botao?.innerHTML || 'Enviar';

    if (!nome || !email || !mensagem) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (!email.includes('@')) {
      alert('E-mail inválido.');
      return;
    }

    // Desabilita botão e mostra loading
    if (botao) {
      botao.disabled = true;
      botao.innerHTML = 'ENVIANDO...';
    }

    try {
      // Aqui você pode conectar com EmailJS (recomendado)
      // Ou chamar uma API própria. Vou deixar um exemplo com EmailJS.

      // ====== SE FOR USAR EMAILJS ======
      // 1. Cadastre-se em https://www.emailjs.com/
      // 2. Crie um service (Gmail, Outlook, etc) e um template
      // 3. Instale via CDN no index.html ou use o pacote npm
      // 4. Substitua os IDs abaixo pelos seus

      /*
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: nome,
          reply_to: email,
          message: mensagem,
        },
        'YOUR_PUBLIC_KEY'
      );
      */

      // Fallback: apenas simula o envio (remove depois que configurar EmailJS)
      console.log({ nome, email, mensagem });
      await new Promise(resolve => setTimeout(resolve, 800));

      alert('Mensagem enviada com sucesso! Em breve retornarei o contato.');
      form.reset();
    } catch (error) {
      console.error('[contact] Erro ao enviar:', error);
      alert('Erro ao enviar. Tente novamente mais tarde.');
    } finally {
      if (botao) {
        botao.disabled = false;
        botao.innerHTML = textoOriginal;
      }
    }
  });
}