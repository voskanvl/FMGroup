import IMask from "imask";
function showError(el) {
    if (el.validity.valueMissing) {
        // Если поле пустое,
        // отображаем следующее сообщение об ошибке
        emailError.textContent = "You need to enter an e-mail address.";
    } else if (email.validity.typeMismatch) {
        // Если поле содержит не email-адрес,
        // отображаем следующее сообщение об ошибке
        emailError.textContent = "Entered value needs to be an e-mail address.";
    } else if (email.validity.tooShort) {
        // Если содержимое слишком короткое,
        // отображаем следующее сообщение об ошибке
        emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
    }

    // Задаём соответствующую стилизацию
    emailError.className = "error active";
}
function validateField(el, type) {
    console.log("🚀 ~ el, type", el.validity, el.validationMessage);
}
export default function validate(form) {
    const textInput = form.querySelectorAll('input[type="text"]');
    const phoneInput = form.querySelectorAll('input[type="phone"]');
    const emailInput = form.querySelectorAll('input[type="email"]');

    textInput.forEach(el =>
        el.addEventListener("input", () => validateField(el, "text")),
    );
    const maskedPhoneInput = [...phoneInput].map(el => {
        // el.addEventListener("input", () => validateField(el, "phone"));
        return new IMask(el, {
            mask: "+{7}(000)000-00-00",
            validate(value, masked) {
                console.log("phone (value, masked)", value, masked);
                masked.rawInputValue.length === 10
                    ? el.classList.add("validated")
                    : el.classList.remove("validated");
            },
        });
    });
    const maskedEmailInput = [...emailInput].map(el => {
        // el.addEventListener("input", () => validateField(el, "phone"));
        return new IMask(el, {
            mask: /.+/,
            doValidate() {
                console.log("email (value, masked)", el.value);
                const isValid = /\w\w*@.+\.\w+/.test(el.value);
                isValid
                    ? el.classList.add("validated")
                    : el.classList.remove("validated");
                return true;
            },
        });
    });
    console.log("🚀 ~ maskedEmailInput", maskedEmailInput);
    // console.log("🚀 ~ maskedPhoneInput", maskedPhoneInput);
}
