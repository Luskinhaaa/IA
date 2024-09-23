document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Validação simples (você pode adicionar regras mais complexas aqui)
    if (username === 'admin' && password === '12345') {
        alert('Login bem-sucedido!');
        // Aqui você pode redirecionar o usuário para outra página, por exemplo
        window.location.href = 'dashboard.html';
    } else {
        errorMessage.textContent = 'Usuário ou senha incorretos.';
    }
});
