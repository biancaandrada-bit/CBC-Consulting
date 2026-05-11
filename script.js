const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  const message = contactForm.querySelector(".form-message");
  const validationMessages = {
    "Nume si prenume": "Te rugăm să introduci numele și prenumele.",
    "Companie sau institutie": "Te rugăm să introduci compania sau instituția.",
    Telefon: "Te rugăm să introduci un număr de telefon valid.",
    Email: "Te rugăm să introduci o adresă de e-mail validă.",
    Mesaj: "Te rugăm să scrii un mesaj de cel puțin 10 caractere.",
  };

  contactForm.querySelectorAll("input, textarea, select").forEach((field) => {
    field.addEventListener("invalid", () => {
      field.setCustomValidity("");

      if (field.validity.valueMissing) {
        field.setCustomValidity(validationMessages[field.name] || "Te rugăm să completezi acest câmp.");
      } else if (field.validity.typeMismatch) {
        field.setCustomValidity("Te rugăm să introduci o valoare validă.");
      } else if (field.validity.patternMismatch) {
        field.setCustomValidity(validationMessages[field.name] || "Te rugăm să verifici formatul introdus.");
      } else if (field.validity.tooShort) {
        field.setCustomValidity(validationMessages[field.name] || "Textul introdus este prea scurt.");
      }
    });

    field.addEventListener("input", () => {
      field.setCustomValidity("");
    });
  });

  contactForm.addEventListener("submit", (event) => {
    if (contactForm.checkValidity()) {
      if (message) message.textContent = "";
      return;
    }

    event.preventDefault();
    const firstInvalid = contactForm.querySelector(":invalid");

    if (message) {
      message.textContent = "Te rugăm să completezi corect câmpurile obligatorii înainte de trimitere.";
    }

    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.reportValidity();
    }
  });
}
