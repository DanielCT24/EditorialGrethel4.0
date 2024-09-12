document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está logueado
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    if (!loggedIn) {
        // Redirigir a la página de login si no está logueado
        window.location.href = '/Login';
        return; // Detener la ejecución del código si no está logueado
    }

    if (loggedIn) {
        // Recuperar el objeto del usuario desde localStorage
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.name) {
            // Mostrar el nombre en ambas secciones si está logueado
            document.getElementById('userName1').textContent = user.name;
            document.getElementById('userName2').textContent = user.name;
        }
    } else {
        // Si no está logueado, no mostrar ningún nombre
        document.getElementById('userName1').textContent = '';
        document.getElementById('userName2').textContent = '';
    }
});

function showAlert(message, bgColor) {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');

    alertMessage.textContent = message;
    alertBox.style.backgroundColor = bgColor;
    alertBox.style.display = 'block';

    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000); // Oculta la alerta después de 3 segundos
}



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


























document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos del usuario
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
        document.getElementById('userName').textContent = storedUser.name;
        document.getElementById('userEmail').textContent = storedUser.email;
        document.getElementById('userPhone').textContent = storedUser.phone;
        document.getElementById('userDNI').textContent = storedUser.dni;

        // Cargar imagen de avatar si existe
        const avatarImage = document.getElementById('avatarImage');
        const avatar = localStorage.getItem('avatar');
        if (avatar) {
            avatarImage.src = avatar;
        }
    }

    // Manejar carga de imagen de avatar
    document.getElementById('avatarInput').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const avatarURL = e.target.result;
                document.getElementById('avatarImage').src = avatarURL;
                localStorage.setItem('avatar', avatarURL);
            };
            reader.readAsDataURL(file);
        }
    });
});





/* CERRAR SESION */

document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    window.location.href = '/Login'; // Redirige a la página de inicio de sesión
});




/* VERIFICAR SI ESTA LOGEADO */
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginButton').addEventListener('click', function(e) {
        e.preventDefault();

        // Verificar si el usuario está logueado
        const loggedIn = localStorage.getItem('loggedIn') === 'true';

        if (loggedIn) {
            window.location.href = '/Usuario'; // Redirige a la página de usuario si está logueado
        } else {
            window.location.href = '/Login'; // Redirige a la página de login si no está logueado
        }
    });
});
