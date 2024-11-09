document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const backToTopButton = document.getElementById('back-to-top');

    function toggleModal(imageSrc, altText, event) {
        event.stopPropagation();
        modal.style.display = 'flex';
        modalImg.src = imageSrc;
        modalCaption.textContent = altText;
        document.addEventListener('keydown', handleModalKeydown);
        modal.addEventListener('click', closeModal);
    }

    function closeModal() {
        modal.style.display = 'none';
        document.removeEventListener('keydown', handleModalKeydown);
        modal.removeEventListener('click', closeModal);
    }

    function handleModalKeydown(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }

    // Allow modal opening via Enter key for images with onclick event
    document.querySelectorAll('img[onclick]').forEach((img) => {
        img.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                const onClickAttr = img.getAttribute('onclick');
                if (onClickAttr) {
                    const matches = onClickAttr.match(/toggleModal\('(.*)', '(.*)', event\)/);
                    if (matches) {
                        const [_, src, alt] = matches;
                        toggleModal(src, alt, event);
                    }
                }
            }
        });
    });

    // Show or hide the back-to-top button based on scroll
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300 && modal.style.display !== 'block') {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function () {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            window.scrollTo({ top: 0 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    window.toggleModal = toggleModal;
});
