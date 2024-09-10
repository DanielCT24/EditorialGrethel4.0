document.addEventListener('DOMContentLoaded', function() {
    const checkoutContent = document.querySelector('.checkout-content');
    const totalElem = document.querySelector('.checkout-footer .total');
    const emptyCartButton = document.querySelector('.empty-cart-button');
    const payButton = document.querySelector('.pay-button');

    function updateCheckout() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        checkoutContent.innerHTML = '';

        let grandTotal = 0;

        cart.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('item-card');
            itemCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <h2>${item.name}</h2>
                    <p class="price">S/ ${item.price.toFixed(2)}</p>
                    <p>Cantidad: <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}"></p>
                    <p class="total">Total: S/ ${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="remove-button" data-id="${item.id}">
                    </button>
                </div>
            `;
            checkoutContent.appendChild(itemCard);

            grandTotal += item.price * item.quantity;
        });

        totalElem.textContent = `Total: S/ ${grandTotal.toFixed(2)}`;
    }

    function handleCartUpdates(event) {
        if (event.target.classList.contains('quantity-input')) {
            const id = event.target.getAttribute('data-id');
            const newQuantity = parseInt(event.target.value, 10);
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const product = cart.find(item => item.id === id);
            if (product) {
                product.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCheckout();
            }
        }

        if (event.target.closest('.remove-button')) {
            const id = event.target.closest('.remove-button').getAttribute('data-id');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCheckout();
        }
    }

    function handleButtonActions(event) {
        if (event.target === emptyCartButton) {
            localStorage.removeItem('cart');
            updateCheckout();
        }

        if (event.target === payButton) {
            // Aquí iría el código para manejar el pago
            alert('Proceso de pago en desarrollo.');
        }
    }

    checkoutContent.addEventListener('input', handleCartUpdates);
    checkoutContent.addEventListener('click', handleCartUpdates);
    document.addEventListener('click', handleButtonActions);

    updateCheckout();
});




document.getElementById('validateCoupon').addEventListener('click', function() {
    var coupon = document.getElementById('coupon').value;
    if (coupon === "") {
        alert('Cupón no ingresado. Continuar sin descuento.');
    } else {
        alert('Cupón inválido. Intente con otro.');
    }
});

document.getElementById('paymentForm').addEventListener('submit', function(event) {
    var terms = document.getElementById('terms').checked;
    var privacy = document.getElementById('privacy').checked;

    if (!terms || !privacy) {
        event.preventDefault();
        alert('Debe aceptar los términos y condiciones y la política de privacidad.');
    }
});







document.addEventListener('DOMContentLoaded', function() {
    const summaryItemsElement = document.getElementById('summaryItems');
    const summaryTotalElem1 = document.getElementById('summaryTotal1');
    const summaryTotalElem2 = document.getElementById('summaryTotal2');
    const summaryTotalElem3 = document.getElementById('summaryTotal3');
    const summaryTotalElem4 = document.getElementById('summaryTotal4');

    function updateCheckout() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        summaryItemsElement.innerHTML = '';

        let grandTotal = 0;

        cart.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('summary-item');
            itemCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h4 class="item-name">${item.name}</h4>
                    <p class="item-price">Precio: S/ ${item.price.toFixed(2)}</p>
                    <p class="item-quantity">Cantidad: <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input"></p>
                    <p class="item-total">Total: S/ ${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="delete-button" data-id="${item.id}"><img src="trash-icon.png" alt="Eliminar" class="delete-button remove-icon"></button>
                </div>
            `;
            summaryItemsElement.appendChild(itemCard);

            grandTotal += item.price * item.quantity;
        });



        
        // Actualizar los 5 summaryTotal con el mismo valor
        summaryTotalElem1.textContent = `S/ ${grandTotal.toFixed(2)}`;
        summaryTotalElem2.textContent = `Total:  S/ ${grandTotal.toFixed(2)}`;
        summaryTotalElem3.textContent = `S/ ${grandTotal.toFixed(2)}`;
        summaryTotalElem4.textContent = `Total: S/ ${grandTotal.toFixed(2)}`;

        // Guardar el total en localStorage
        localStorage.setItem('grandTotal', grandTotal.toFixed(2));
    }

    function handleCartUpdates(event) {
        if (event.target.classList.contains('quantity-input')) {
            const id = event.target.getAttribute('data-id');
            const newQuantity = parseInt(event.target.value, 10);
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const product = cart.find(item => item.id === id);
            if (product) {
                product.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCheckout();
            }
        } else if (event.target.classList.contains('delete-button')) {
            const id = event.target.getAttribute('data-id');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCheckout();
        }
    }

    // Escuchar cambios en el input de cantidad y clics en el botón de eliminar
    document.querySelector('.order-summary').addEventListener('input', handleCartUpdates);
    document.querySelector('.order-summary').addEventListener('click', handleCartUpdates);

    // Escuchar cambios en el localStorage (para actualización automática desde otras partes de la app)
    window.addEventListener('storage', function(event) {
        if (event.key === 'cart') {
            updateCheckout();
        }
    });

    // Inicializar
    updateCheckout();
});










/* -----DESHABILITA EL BOTON CONTINUAR ---------------- */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('paymentForm');
    const btnDetalles = document.getElementById('btn-detalles');
    
    const checkFormValidity = () => {
        btnDetalles.disabled = !form.checkValidity();
    };
    
    // Monitorizar cambios en el formulario
    form.addEventListener('input', checkFormValidity);
    
    // Verificar la validez inicial del formulario al cargar la página
    checkFormValidity();
});








/* VENTANA EMERGENTE */


document.querySelector('.btn-detalles').addEventListener('click', function() {
    // Obtén el valor seleccionado
    var selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    
    // Cierra todas las ventanas emergentes primero
    closeAllPopups();
    
    // Abre la ventana emergente correspondiente
    if (selectedPayment === 'paypal') {
        document.getElementById('paypal-popup').style.display = 'block';
    } else if (selectedPayment === 'culqi') {
        document.getElementById('culqi-popup').style.display = 'block';
    } else if (selectedPayment === 'yape') {
        document.getElementById('yape-popup').style.display = 'block';
    }
});

function closeAllPopups() {
    document.getElementById('paypal-popup').style.display = 'none';
    document.getElementById('culqi-popup').style.display = 'none';
    document.getElementById('yape-popup').style.display = 'none';
}

function closePopup(id) {
    document.getElementById(id).style.display = 'none';
}




/* -----------------YAPE--------------------- */


function validateForm() {
    const operacion = document.getElementById('operacion').value;
    const confirmaOperacion = document.getElementById('confirma-operacion').value;
    const fechaHora = document.getElementById('fecha-hora').value;
    const comprobante = document.getElementById('comprobante').files.length > 0;

    if (operacion && confirmaOperacion && fechaHora && comprobante) {
        document.getElementById('finalize-btn').disabled = false;
    } else {
        document.getElementById('finalize-btn').disabled = true;
    }
}

function handleFileUpload() {
    const fileInput = document.getElementById('comprobante');
    const label = document.getElementById('upload-label');

    if (fileInput.files.length > 0) {
        label.textContent = fileInput.files[0].name;
        label.classList.add('active');
        validateForm();  // Revalidar el formulario cuando se sube un archivo
    }
}

function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'flex';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}





/* --------NO PERMITE NUMEROS EN NOMBRES Y APELLIDOS --------------*/

document.addEventListener('DOMContentLoaded', () => {
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');

    function validateTextInput(event) {
        const value = event.target.value;
        // Remove any character that is not a letter or space
        event.target.value = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúñÑ\s]/g, '');
    }

    firstNameInput.addEventListener('input', validateTextInput);
    lastNameInput.addEventListener('input', validateTextInput);
});


/* --------NO PERMITE OTRO FORMATO AL GMAIL --------------*/


document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const emailFeedback = document.getElementById('email-feedback');

    function validateEmail(email) {
        // Regex para validar formato de email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return emailRegex.test(email);
    }

    function validateEmailInput(event) {
        const emailValue = event.target.value;

        if (validateEmail(emailValue)) {
            emailInput.classList.remove('invalid');
            emailInput.classList.add('valid');
            emailFeedback.textContent = 'Formato válido de correo electrónico';
            emailFeedback.classList.add('valid-feedback');
            emailFeedback.classList.remove('feedback');
        } else {
            emailInput.classList.remove('valid');
            emailInput.classList.add('invalid');
            emailFeedback.textContent = 'Formato de correo electrónico inválido. Debe ser de Gmail.';
            emailFeedback.classList.add('feedback');
            emailFeedback.classList.remove('valid-feedback');
        }
    }

    emailInput.addEventListener('input', validateEmailInput);
});


/* --------NO PERMITE OTRO FORMATO AL NUMERO Y DNI  --------------*/
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone');
    const dniInput = document.getElementById('dni');

    phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, ''); // Elimina caracteres no numéricos
    });

    dniInput.addEventListener('input', () => {
        dniInput.value = dniInput.value.replace(/\D/g, ''); // Elimina caracteres no numéricos
    });
});






/* VERIFICA QUE EL NUMERO EMPIECE EN 9 */


document.getElementById('phone').addEventListener('input', function() {
    const phoneInput = document.getElementById('phone');
    const phoneValue = phoneInput.value;

    // Verificamos que el primer carácter sea '9' solo si hay al menos un carácter
    if (phoneValue.length > 0 && phoneValue[0] !== '9') {
        alert('El número de teléfono es inválido');
        phoneInput.value = ''; // Limpiamos el campo si el primer carácter no es 9
    }
});









/* ------------------GUARDA LOS DATOS PARA LA BOLETA----------------- */



    document.getElementById('btn-detalles').addEventListener('click', function() {
        // Obtén los datos de los elementos del resumen
        const summaryItems = document.getElementById('summary-items').innerHTML;
        const summaryTotal = document.getElementById('summary-total').innerHTML;
        
        // Crea un objeto con los datos
        const data = {
            summaryItems: summaryItems,
            summaryTotal: summaryTotal,
            shippingAddress: {
                district: document.getElementById('district').value,
                street: document.getElementById('street').value,
                apartment: document.getElementById('apartment').value,
                postalCode: document.getElementById('postal-code').value,
                alias: document.getElementById('alias').value
            },
            deliveryOption: document.querySelector('input[name="delivery"]:checked') ? document.querySelector('input[name="delivery"]:checked').value : null
        };

        // Guarda el objeto en localStorage como una cadena JSON
        localStorage.setItem('purchaseData', JSON.stringify(data));

        // Muestra una confirmación si deseas
        alert('Datos guardados exitosamente!');
    });











// Validación de formulario y habilitación del botón
document.getElementById('operacion').addEventListener('input', validateForm);
document.getElementById('confirma-operacion').addEventListener('input', validateForm);
document.getElementById('fecha-hora').addEventListener('change', validateForm);




/* ---------------------DATOS DE COMPRA-------------------- */

function generarID() {
    return 'ID-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function obtenerFechaActual() {
    const ahora = new Date();
    const dia = String(ahora.getDate()).padStart(2, '0');
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const año = ahora.getFullYear();
    return `${año}-${mes}-${dia}`;
}

function obtenerPrecio() {
    return document.getElementById('summaryTotal1').textContent;
}





/* mensaje personalizado */


function finalizePurchase(mensajePersonalizado) {
    const nuevoID = generarID();
    const fechaActual = obtenerFechaActual();
    const precio = obtenerPrecio();
    let datosGenerados = JSON.parse(localStorage.getItem('datosGenerados')) || [];
    datosGenerados.push({ id: nuevoID, fecha: fechaActual, precio: precio });
    localStorage.setItem('datosGenerados', JSON.stringify(datosGenerados));
    showModal(mensajePersonalizado || `¡Felicidades por tu compra!`);


    function showModal(message) {
        document.getElementById('modalMessage').textContent = message;
        document.getElementById('customModal').style.display = 'block';
    
        // Cerrar el modal después de 5 segundos
        setTimeout(() => {
            closeModal();
        }, 11000); // 5000 milisegundos = 5 segundos
    }
    
    function closeModal() {
        document.getElementById('customModal').style.display = 'none';
    }
    
}




/* DÍAS DE PEDIDOS */
function setDeliveryDates(startId, endId) {
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

    const startDate = today.toLocaleDateString('es-ES', options).replace(/\//g, '-');
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 3);
    const endDate = futureDate.toLocaleDateString('es-ES', options).replace(/\//g, '-');

    document.getElementById(startId).textContent = startDate;
    document.getElementById(endId).textContent = endDate;
}

// Llamar la función para cada conjunto de fechas
setDeliveryDates('start-date-1', 'end-date-1');
setDeliveryDates('start-date-2', 'end-date-2');
setDeliveryDates('start-date-3', 'end-date-3');
