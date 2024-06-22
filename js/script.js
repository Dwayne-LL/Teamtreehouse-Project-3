document.addEventListener('DOMContentLoaded', function() {
    //  Setting Focus on the "Name" Field
    const nameInput = document.getElementById('name');
    nameInput.focus(); // Set focus on page load
  
    //  "Job Role" Section
    const jobRoleSelect = document.getElementById('title');
    const otherJobRoleInput = document.getElementById('other-job-role');
    otherJobRoleInput.style.display = 'none'; // Hide by default
  
    jobRoleSelect.addEventListener('change', function(event) {
      // Show/hide "Other job role" based on selection
      if (event.target.value === 'other') {
        otherJobRoleInput.style.display = '';
      } else {
        otherJobRoleInput.style.display = 'none';
      }
    });
  
    //  "T-Shirt Info" Section
    const designSelect = document.getElementById('design');
    const colorSelect = document.getElementById('color');
    const colorOptions = colorSelect.children;
    colorSelect.disabled = true; // Disable color select by default
  
    designSelect.addEventListener('change', function(event) {
      // Enable color select and filter options based on design selection
      colorSelect.disabled = false;
      
      for (let i = 0; i < colorOptions.length; i++) {
        const option = colorOptions[i];
        const optionTheme = option.getAttribute('data-theme');
        
        if (event.target.value === optionTheme) {
          option.hidden = false;
          option.selected = true;
        } else {
          option.hidden = true;
          option.selected = false;
        }
      }
    });
  
    // "Register for Activities" Section
    const activitiesFieldset = document.getElementById('activities');
    const totalCostElement = document.getElementById('activities-cost');
    let totalCost = 0;
  
    activitiesFieldset.addEventListener('change', function(event) {
      // Calculate and display total cost based on selected activities
      const clickedCheckbox = event.target;
      const cost = +clickedCheckbox.getAttribute('data-cost');
      
      if (clickedCheckbox.checked) {
        totalCost += cost;
      } else {
        totalCost -= cost;
      }
      
      totalCostElement.textContent = `Total: $${totalCost}`;
    });
  
    //"Payment Info" Section
    const paymentSelect = document.getElementById('payment');
    const paymentMethods = {
      'credit-card': document.getElementById('credit-card'),
      'paypal': document.getElementById('paypal'),
      'bitcoin': document.getElementById('bitcoin')
    };
  
    // Hide all payment method divs except for the selected one
    function togglePaymentMethod(displayMethod) {
      Object.keys(paymentMethods).forEach(method => {
        if (method === displayMethod) {
          paymentMethods[method].style.display = '';
        } else {
          paymentMethods[method].style.display = 'none';
        }
      });
    }
  
    // Set default payment method and toggle display on change
    paymentSelect.value = 'credit-card'; // Set default payment method
    togglePaymentMethod(paymentSelect.value);
  
    paymentSelect.addEventListener('change', function(event) {
      // Toggle payment method divs based on selection
      togglePaymentMethod(event.target.value);
    });
  
    //Form Validation
    const form = document.querySelector('form');
  
    // Validate form on submit
    form.addEventListener('submit', function(event) {
      // Validation functions for different fields
      const isValidName = validateName();
      const isValidEmail = validateEmail();
      const isValidActivities = validateActivities();
      let isValidCreditCard = true; // Assume credit card is valid unless payment is not credit card
  
      if (paymentSelect.value === 'credit-card') {
        isValidCreditCard = validateCreditCard();
      }
  
      // Prevent form submission if any validation fails
      if (!isValidName || !isValidEmail || !isValidActivities || !isValidCreditCard) {
        event.preventDefault();
      }
    });
  
    // Validation function for name field
    function validateName() {
      const nameInput = document.getElementById('name');
      const nameValue = nameInput.value.trim();
      const nameParent = nameInput.parentElement;
      
      if (nameValue === '') {
        showError(nameParent, 'Name cannot be blank');
        return false;
      } else {
        showValid(nameParent);
        return true;
      }
    }
  
    // Validation function for email field
    function validateEmail() {
      const emailInput = document.getElementById('email');
      const emailValue = emailInput.value.trim();
      const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
      const emailParent = emailInput.parentElement;
      
      if (!emailRegex.test(emailValue)) {
        showError(emailParent, 'Invalid email format');
        return false;
      } else {
        showValid(emailParent);
        return true;
      }
    }
  
    // Validation function for activities checkboxes
    function validateActivities() {
      const checkedActivities = activitiesFieldset.querySelectorAll('input[type="checkbox"]:checked');
      const activitiesParent = activitiesFieldset;
      
      if (checkedActivities.length === 0) {
        showError(activitiesParent, 'Please select at least one activity');
        return false;
      } else {
        showValid(activitiesParent);
        return true;
      }
    }
  
    // Validation function for credit card fields
    function validateCreditCard() {
      const creditCardInput = document.getElementById('cc-num');
      const zipInput = document.getElementById('zip');
      const cvvInput = document.getElementById('cvv');
      const creditCardValue = creditCardInput.value.trim();
      const zipValue = zipInput.value.trim();
      const cvvValue = cvvInput.value.trim();
      const creditCardParent = creditCardInput.parentElement;
  
      // Regular expressions for validation
      const creditCardRegex = /^\d{13,16}$/;
      const zipRegex = /^\d{5}$/;
      const cvvRegex = /^\d{3}$/;
  
      // Perform validations
      if (!creditCardRegex.test(creditCardValue)) {
        showError(creditCardParent, 'Invalid credit card number');
        return false;
      } else if (!zipRegex.test(zipValue)) {
        showError(creditCardParent, 'Invalid ZIP code');
        return false;
      } else if (!cvvRegex.test(cvvValue)) {
        showError(creditCardParent, 'Invalid CVV');
        return false;
      } else {
        showValid(creditCardParent);
        return true;
      }
    }
  
    // Helper function to show error message
    function showError(element, message) {
      element.classList.add('not-valid');
      element.classList.remove('valid');
      element.lastElementChild.style.display = 'block';
      element.lastElementChild.textContent = message;
    }
  
    // Helper function to show valid state
    function showValid(element) {
      element.classList.add('valid');
      element.classList.remove('not-valid');
      element.lastElementChild.style.display = 'none';
    }
  
    //Accessibility Enhancements
    const activitiesCheckboxes = document.querySelectorAll('#activities input[type="checkbox"]');
    
    activitiesCheckboxes.forEach(checkbox => {
      // Add focus and blur event listeners for accessibility
      checkbox.addEventListener('focus', function(event) {
        event.target.parentElement.classList.add('focus');
      });
  
      checkbox.addEventListener('blur', function(event) {
        event.target.parentElement.classList.remove('focus');
      });
    });
  });
  