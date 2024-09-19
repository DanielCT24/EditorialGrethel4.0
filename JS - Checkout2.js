function generateUniqueId() {
    const existingIds = JSON.parse(localStorage.getItem('existingIds')) || [];
    let newId;

    do {
        newId = `#${Math.floor(100000 + Math.random() * 900000).toString()}`; // Generar ID de 6 dígitos
    } while (existingIds.includes(newId));

    existingIds.push(newId);
    localStorage.setItem('existingIds', JSON.stringify(existingIds));

    return newId;
}

document.getElementById('finalize-btn').addEventListener('click', function() {
    // Recolectar datos del formulario
    const district = document.getElementById('district').value;
    const street = document.getElementById('street').value;
    const apartment = document.getElementById('apartment').value;
    const postalCode = document.getElementById('postal-code').value;
    const alias = document.getElementById('alias').value;
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phone = document.getElementById('phone').value;
    const dni = document.getElementById('dni').value;
    const coupon = document.getElementById('coupon').value;
    const delivery = document.querySelector('input[name="delivery"]:checked')?.value;
    const payment = document.querySelector('input[name="payment"]:checked')?.value;

    // Verificar si todos los campos requeridos están llenos
    if (!email || !firstName || !lastName || !phone || !dni || !delivery || !payment) {
        alert("Por favor, complete todos los campos requeridos.");
        return;
    }

    // Generar un nuevo ID de compra
    const purchaseId = generateUniqueId();

    // Guardar datos en localStorage
    const formData = {
        purchaseId, // Añadir el ID de compra a los datos
        district,
        street,
        apartment,
        postalCode,
        alias,
        email,
        firstName,
        lastName,
        phone,
        dni,
        coupon,
        delivery,
        payment
    };

    localStorage.setItem('formData', JSON.stringify(formData));












});


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







/* COSTO DE ENVIOS */


function actualizarResumen() {
    const totalElement = document.getElementById("summaryTotal2");
    let total = parseFloat(totalElement.textContent.replace("Total: S/ ", "")) || 0;

    const costoEnvio = 5;
    let textoEnvio;

    // Comprobar si el total es igual o mayor a 30
    if (total >= 30) {
        textoEnvio = "Gratis";
    } else {
        total += costoEnvio; // Sumar costo de envío
        textoEnvio = `S/ ${costoEnvio.toFixed(2)}`; // Mostrar costo de envío
    }

    totalElement.textContent = `Total: S/ ${total.toFixed(2)}`;
    document.getElementById("costoEnvio").textContent = `Costo de envío: ${textoEnvio}`;
}

// Función para agregar producto (llamar esta función al agregar un producto)
function agregarProducto(precio) {
    const totalElement = document.getElementById("summaryTotal2");
    let total = parseFloat(totalElement.textContent.replace("Total: S/ ", "")) || 0;

    total += precio;
    totalElement.textContent = `Total: S/ ${total.toFixed(2)}`;

    actualizarResumen(); // Actualiza el resumen
}

// Ejemplo de uso
// agregarProducto(25); // Llama a esta función con el precio del producto
