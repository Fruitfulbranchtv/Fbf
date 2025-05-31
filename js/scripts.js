$(document).ready(function () {
    // Mobile Menu Toggle
    $('#menu-toggle').click(function () {
        $('#nav-menu').toggleClass('show');
    });

    // Form Validation and Submission (Volunteer, Partner, Contact)
    function validateForm(formId) {
        const form = $(`#${formId}`);
        form.on('submit', function (e) {
            e.preventDefault();
            const name = form.find('input[name="name"]').val() || form.find('input[name="organization"]').val();
            const email = form.find('input[name="email"]').val();
            const message = form.find('textarea[name="message"]').val() || form.find('select[name="role"]').val();

            if (!name || !email || !message) {
                alert('Please fill all required fields.');
                return;
            }

            if (!/\S+@\S+\.\S+/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission (replace with actual backend, e.g., WordPress Contact Form 7)
            console.log(`Form ${formId} submitted:`, { name, email, message });
            alert('Thank you for your submission! We will get back to you soon.');
            form[0].reset();
        });
    }

    validateForm('volunteer-form');
    validateForm('partner-form');
    validateForm('contact-form');

    // Paystack Donation
    $('#donate-btn').click(function () {
        const handler = PaystackPop.setup({
            key: 'pk_test_XXXXXXXXXX', // Replace with your Paystack public key
            email: 'donor@fruitfulbranchfamily.org', // Replace with donor email or collect from form
            amount: 100000, // ₦1,000 (in kobo, adjust as needed)
            currency: 'NGN',
            ref: 'FBF_' + Math.floor((Math.random() * 1000000000) + 1),
            callback: function (response) {
                alert('Thank you for your donation! Reference: ' + response.reference);
            },
            onClose: function () {
                alert('Donation window closed.');
            }
        });
        handler.openIframe();
    });

    // Lazy Load Images
    $('img[loading="lazy"]').each(function () {
        $(this).on('load', function () {
            $(this).addClass('loaded');
        });
    });
});
