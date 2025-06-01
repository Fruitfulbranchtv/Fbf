$(document).ready(function() {
    // Dark Mode Toggle
    $('#dark-mode-toggle').click(function() {
        $('body').toggleClass('dark-mode');
        $(this).find('i').toggleClass('fa-moon fa-sun');
        localStorage.setItem('darkMode', $('body').hasClass('dark-mode'));
    });

    if (localStorage.getItem('darkMode') === 'true') {
        $('body').addClass('dark-mode');
        $('#dark-mode-toggle i').removeClass('fa-moon').addClass('fa-sun');
    }

    // Form Validation
    $('#volunteer-form, #partner-form, #contact-form').submit(function(e) {
        e.preventDefault();
        let valid = true;
        $(this).find('input[required], textarea[required], select[required]').each(function() {
            if (!$(this).val()) {
                valid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        if (valid) {
            alert('Form submitted successfully!');
            this.reset();
        } else {
            alert('Please fill all required fields.');
        }
    });

    // Paystack Donation
    $('#donate-btn').click(function() {
        try {
            let handler = PaystackPop.setup({
                key: 'pk_test_XXXXXXXXXX', // Replace with your Paystack public key
                email: 'donor@example.com',
                amount: 5000 * 100, // ₦5,000
                ref: 'FBF_' + Math.floor((Math.random() * 1000000000) + 1),
                callback: function(response) {
                    alert('Payment successful! Reference: ' + response.reference);
                },
                onClose: function() {
                    alert('Payment window closed.');
                }
            });
            handler.openIframe();
        } catch (e) {
            alert('Error loading Paystack. Please try again.');
        }
    });
});
