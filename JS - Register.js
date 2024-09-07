function showAlert(message, bgColor) {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');

    alertMessage.textContent = message;
    alertBox.style.backgroundColor = bgColor;
    alertBox.style.display = 'block';

    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 7000); // Oculta la alerta después de 4 segundos
}


// Manejador de registro
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const username = document.getElementById('registerUsername').value;
    const dni = document.getElementById('registerDNI').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;

    // Validar longitud de DNI y teléfono
    if (dni.length !== 8 || phone.length !== 9) {
        showAlert('DNI debe tener 8 cifras y Teléfono debe tener 9 cifras', '#f44336'); // Rojo para error
        return;
    }

    // Verificar si el email, DNI o teléfono ya están registrados
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const emailExists = users.some(user => user.email === email);
    const dniExists = users.some(user => user.dni === dni);
    const phoneExists = users.some(user => user.phone === phone);

    if (emailExists || dniExists || phoneExists) {
        showAlert('El email, DNI o teléfono ya están registrados', '#f44336'); // Rojo para error
        return;
    }

    // Crear objeto usuario
    const user = {
        name: name,
        email: email,
        username: username,
        dni: dni,
        phone: phone,
        password: password
    };




    // Agregar usuario al array de usuarios y guardarlo en localStorage
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    showAlert('Registro exitoso, Inicie Sesión', '#4caf50'); // Verde para éxito
        // Ocultar el formulario de registro y mostrar el formulario de inicio de sesión
        const formContainer = document.getElementById('formContainer');
        formContainer.innerHTML = `
            <form id="loginForm" class="formulario__login">
                <!-- Campos de inicio de sesión -->
            </form>
        `;
});




// Manejador de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const identifier = document.getElementById('loginIdentifier').value;
    const password = document.getElementById('loginPassword').value;

    // Obtener datos almacenados en localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const storedUser = users.find(user => 
        (user.email === identifier || user.username === identifier || user.dni === identifier)
    );

    // Validar credenciales
    if (storedUser && password === storedUser.password) {
        showAlert('Inicio de sesión exitoso', '#4caf50'); // Verde para éxito

        // Guardar estado de sesión
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(storedUser));

        window.location.href = "Inicio.html"; // Redirige a la página de perfil
    } else {
        showAlert('Identificador o contraseña incorrectos', '#f44336'); // Rojo para error
    }
});






/* ----------------------------------------TRANSICIÓN------------------------------------------------------------ */






document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const links = document.querySelectorAll('.transition-link');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            loader.classList.remove('hidden'); // Mostrar la animación de carga

            const targetUrl = this.href;

            // Usar setTimeout para dar tiempo a que la animación se muestre antes de la redirección
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 100);
        });
    });

    window.addEventListener('load', function() {
        loader.classList.add('hidden'); // Ocultar la animación de carga cuando la página esté completamente cargada
    });
});

