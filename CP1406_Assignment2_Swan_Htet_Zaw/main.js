// main.js

document.addEventListener("DOMContentLoaded", function() {
  // Form validation & confirmation
  document.querySelectorAll("form").forEach(function(form) {
    form.addEventListener("submit", function(e) {
      let valid = true;
      let firstInvalid = null;

      // Validate required fields
      form.querySelectorAll("[required]").forEach(function(input){
        if (!input.value.trim()) {
          valid = false;
          input.classList.add("error");
          if (!firstInvalid) firstInvalid = input;
        } else {
          input.classList.remove("error");
        }
      });

      // Email format validation (if field exists)
      let email = form.querySelector("input[type='email']");
      if (email && !/^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value.trim())) {
        valid = false;
        email.classList.add("error");
        firstInvalid = email;
      }

      // Date validation (for booking)
      let dateInput = form.querySelector("input[type='date']");
      if (dateInput) {
        let chosen = new Date(dateInput.value);
        let today = new Date();
        today.setHours(0,0,0,0);
        if (!dateInput.value || chosen < today) {
          valid = false;
          dateInput.classList.add("error");
          firstInvalid = dateInput;
        }
      }

      if (!valid) {
        e.preventDefault();
        if (firstInvalid) firstInvalid.focus();
        // Optional: Show error message here
        return false;
      }

      // Success: prevent real submit, show confirmation message
      e.preventDefault();
      let confirm = document.createElement("div");
      confirm.className = "form-confirmation";
      confirm.innerHTML = "<h3>Thank you!<br>Your submission was received.</h3><p>We’ll contact you shortly to confirm your request.</p>";
      form.style.display = "none";
      form.parentNode.appendChild(confirm);
      return false;
    });
  });

  // Scroll-to-top button
  const toTopBtn = document.getElementById('toTopBtn');
  if (toTopBtn) {
    window.addEventListener('scroll', ()=> {
      toTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
    });
    toTopBtn.addEventListener('click', ()=>{ window.scrollTo({top:0,behavior:'smooth'}); });
  }
});
