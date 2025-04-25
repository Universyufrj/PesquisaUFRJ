// Inicializa o EmailJS com seu User ID
emailjs.init('TKuZ7CAuQh-zObb_5')
  .then(() => {
    console.log('EmailJS inicializado com sucesso');
  })
  .catch(error => {
    console.error('Falha na inicialização do EmailJS:', error);
    alert('Erro na configuração do sistema. Por favor, recarregue a página.');
  });

// Elementos da interface
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

// Alterna entre os formulários
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
    console.log('Alternado para formulário de registro');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
    console.log('Alternado para formulário de login');
});

// Configurações do EmailJS
const SERVICE_IDS = {
    signup: "service_9gwivaw",
    login: "service_ltzh3pv"
};

const TEMPLATE_IDS = {
    signup: "template_1b5eb6a",
    login: "template_q5hzjq5"
};

// Função para enviar e-mails
async function sendFormData(formType, formData) {
    try {
        const serviceId = SERVICE_IDS[formType];
        const templateId = TEMPLATE_IDS[formType];
        
        if (!serviceId || !templateId) {
            throw new Error('Configuração de serviço/template não encontrada');
        }

        const response = await emailjs.send(serviceId, templateId, formData);
        
        console.log(`E-mail de ${formType} enviado:`, response);
        return {
            success: true,
            message: 'Operação realizada com sucesso!'
        };
    } catch (error) {
        console.error(`Erro no envio de ${formType}:`, error);
        return {
            success: false,
            message: 'Erro ao processar sua solicitação. Tente novamente.'
        };
    }
}

// Manipulador de formulário de registro
signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    const formData = {
        name: document.getElementById('signup-name').value,
        email: document.getElementById('signup-email').value,
        password: document.getElementById('signup-password').value,
        type: 'cadastro',
        timestamp: new Date().toLocaleString('pt-BR')
    };

    const result = await sendFormData('signup', formData);

    if (result.success) {
        alert('Cadastro realizado com sucesso! Redirecionando...');
        window.location.href = 'formulario2.html';
    } else {
        alert(result.message);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Criar conta';
    }
});

// Manipulador de formulário de login
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Entrando...';

    const formData = {
        email: document.getElementById('login-email').value,
        password: document.getElementById('login-password').value,
        type: 'login',
        timestamp: new Date().toLocaleString('pt-BR')
    };

    const result = await sendFormData('login', formData);

    if (result.success) {
        alert('Login realizado com sucesso!');
    } else {
        alert(result.message);
    }
    
    submitBtn.disabled = false;
    submitBtn.textContent = 'Entrar';
});
