window.onload = function() {
    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
        const content = document.getElementById('content');
        content.classList.add('fade-in'); // Adiciona a classe de animação
        content.style.display = 'block';
    }, 2000); // 2000 ms = 2 seconds

    const form = document.querySelector('.form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita o envio padrão do formulário

        const email = form.querySelector('.input[type="email"]').value;
        const password = form.querySelector('.input[type="password"]').value;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message); // Exibe mensagem de sucesso
            } else {
                alert(data.message); // Exibe mensagem de erro
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Houve um erro ao tentar fazer login.');
        }
    });
};
