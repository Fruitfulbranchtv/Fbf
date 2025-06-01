// scripts.js - Hamburger menu, dark mode, form validation, Paystack integration
$(document).ready(function() {
    // Hamburger Menu Toggle
    $('#hamburger-toggle').click(function() {
        $('#mobile-menu').toggleClass('active');
        $(this).find('i').toggleClass('fa-bars fa-times');
        $(this).attr('aria-expanded', $('#mobile-menu').hasClass('active'));
    });

    $('#hamburger-close').click(function() {
        $('#mobile-menu').removeClass('active');
        $('#hamburger-toggle').find('i').removeClass('fa-times').addClass('fa-bars');
        $('#hamburger-toggle').attr('aria-expanded', 'false');
    });

    // Dark Mode Toggle
    $('#dark-mode-toggle').click(function() {
        $('body').toggleClass('dark-mode');
        const isDark = $('body').hasClass('dark-mode');
        $(this).find('i').toggleClass('fa-moon fa-sun');
        $(this).attr('aria-label', isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Load Theme Preference
    if (localStorage.getItem('theme') === 'dark') {
        $('body').addClass('dark-mode');
        $('#dark-mode-toggle').find('i').removeClass('fa-moon').addClass('fa-sun');
        $('#dark-mode-toggle').attr('aria-label', 'Toggle Light Mode');
    }

    // Form Validation (Volunteer, Partner, Contact)
    $('#volunteer-form, #partner-form, #contact-form').on('submit', function(e) {
        e.preventDefault();
        const form = $(this);
        const formData = form.serializeArray();
        let isValid = true;

        form.find('input[required], textarea[required], select[required]').each(function() {
            if (!$(this).val()) {
                isValid = false;
                $(this).addClass('border-red-500');
            } else {
                $(this).removeClass('border-red-500');
            }
        });

        if (isValid) {
            alert('Form submitted successfully! We will contact you soon.');
            form[0].reset();
            // TODO: Integrate with WordPress Contact Form 7 or EmailJS for actual submission
        } else {
            alert('Please fill all required fields.');
        }
    });

    // Paystack Donation
    $('#donate-btn').click(function() {
        const handler = PaystackPop.setup({
            key: 'pk_test_f6ca4f024292b2305de634e54a115ff5f445250c', // Replace with your Paystack public key
            email: 'donor@example.com', // Replace with dynamic user email if available
            amount: 1000 * 100, // Default ₦1,000 (kobo)
            currency: 'NGN',
            ref: 'FBF_' + Math.floor((Math.random() * 1000000000) + 1),
            callback: function(response) {
                alert('Donation successful! Reference: ' + response.reference);
                // TODO: Log donation to WordPress or backend
            },
            onClose: function() {
                alert('Donation cancelled.');
            }
        });
        handler.openIframe();
    });

    // Dynamic CTA Text Animation
    $('.dynamic-cta').hover(
        function() { $(this).text($(this).text().replace('Now', 'Today')); },
        function() { $(this).text($(this).text().replace('Today', 'Now')); }
    );

    // Lazy Load Images (Native)
    $('img[loading="lazy"]').each(function() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        observer.unobserve(img);
                    }
                });
            });
            observer.observe(this);
        }
    });
});
