document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('inputMessage').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const input = document.getElementById('inputMessage');
    const messageText = input.value;

    if (messageText.trim() === '') return;

    const messagesContainer = document.getElementById('messages');
    const newMessage = document.createElement('div');
    newMessage.textContent = `Você: ${messageText}`;
    messagesContainer.appendChild(newMessage);

    // Enviar a mensagem para a IA
    const aiResponse = await getAIResponse(messageText);
    const aiMessage = document.createElement('div');
    aiMessage.textContent = `IA: ${aiResponse}`;
    messagesContainer.appendChild(aiMessage);

    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Rolagem automática
}

async function getAIResponse(userMessage) {
    const maxRetries = 3;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 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`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: userMessage }]
                })
            });

            const data = await response.json();
            console.log('Resposta da API:', data);

            if (!response.ok) {
                if (response.status === 429) {
                    console.warn('Limite de requisições excedido. Tentando novamente...');
                    continue; // Tenta novamente
                }
                console.error('Erro da API:', data);
                throw new Error('Erro na resposta da API');
            }

            return data.choices[0].message.content;
        } catch (error) {
            console.error('Erro ao obter resposta da IA:', error);
            return 'Desculpe, houve um erro ao tentar conversar com a IA.';
        }
    }
}
