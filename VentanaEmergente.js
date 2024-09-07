document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('close-popup');

    setTimeout(function() {
        popup.classList.add('show');
    }, 600); // Retraso de 3 segundos

    closeBtn.addEventListener('click', function() {
        popup.classList.remove('show');
    });
});
