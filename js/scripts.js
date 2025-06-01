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
    const validators = {
        name: function(value) {
            const regex = /^[A-Za-z\s]{2,}$/;
            return {
                valid: regex.test(value),
                message: 'Name must be at least 2 characters long and contain only letters and spaces.'
            };
        },
        organization: function(value) {
            const regex = /^[A-Za-z\s]{2,}$/;
            return {
                valid: regex.test(value),
                message: 'Organization must be at least 2 characters long and contain only letters and spaces.'
            };
        },
        email: function(value) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return {
                valid: regex.test(value),
                message: 'Please enter a valid email address.'
            };
        },
        role: function(value) {
            return {
                valid: value !== '',
                message: 'Please select a role.'
            };
        },
        message: function(value) {
            return {
                valid: value.length >= 10,
                message: 'Message must be at least 10 characters long.'
            };
        }
    };

    function showError($field, message) {
        $field.addClass('is-invalid').removeClass('is-valid');
        let $error = $field.siblings('.invalid-feedback');
        if ($error.length === 0) {
            $error = $('<div class="invalid-feedback"></div>').insertAfter($field);
        }
        $error.text(message);
        $field.attr('aria-invalid', 'true');
    }

    function clearError($field) {
        $field.removeClass('is-invalid').addClass('is-valid');
        $field.siblings('.invalid-feedback').remove();
        $field.removeAttr('aria-invalid');
    }

    function validateField($field) {
        const fieldType = $field.attr('id').replace(/^(volunteer|partner|contact)-/, '');
        const value = $field.val().trim();
        if ($field.prop('required') && !value) {
            showError($field, 'This field is required.');
            return false;
        }
        if (validators[fieldType]) {
            const result = validators[fieldType](value);
            if (!result.valid) {
                showError($field, result.message);
                return false;
            }
        }
        clearError($field);
        return true;
    }

    function validateForm($form) {
        let isValid = true;
        $form.find('input[required], select[required], textarea[required]').each(function() {
            if (!validateField($(this))) {
                isValid = false;
            }
        });
        return isValid;
    }

    $('#volunteer-form, #partner-form, #contact-form').find('input, select, textarea').on('input change', function() {
        validateField($(this));
    });

    $('#volunteer-form, #partner-form, #contact-form').submit(function(e) {
        e.preventDefault();
        const $form = $(this);
        if (validateForm($form)) {
            alert('Form submitted successfully!'); // Placeholder for AJAX
            $form[0].reset();
            $form.find('.is-valid').removeClass('is-valid');
        } else {
            $form.find('input[required], select[required], textarea[required]').each(function() {
                validateField($(this));
            });
            $form.find('.is-invalid').first().focus();
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

    // Carousel Accessibility (optional enhancement)
    $('.carousel').each(function() {
        $(this).attr('role', 'region').attr('aria-label', 'Hero carousel');
        $(this).find('.carousel-control-prev, .carousel-control-next').attr('role', 'button');
    });
});
