export function submitHandler(form) {
    const submitButton = form.querySelector("[type='submit']");
    submitButton.addEventListener("click", async e => {
        e.preventDefault();
        form.reportValidity();

        if (form.checkValidity()) {
            try {
                const formDate = new FormData(form);
                submitButton.setAttribute("disabled", true);
                const res = await fetch("/mail.php", {
                    method: "POST",
                    body: formDate,
                });
                if (res.ok) {
                    submitButton.textContent = "Ваша заявка отправлена";
                } else {
                    submitButton.textContent = "Ошибка при отправки заявки";
                }
                setTimeout(() => (submitButton.textContent = "ОТПРАВИТЬ"));
            } catch (error) {
                throw Error(error);
            }
        }
    });
}
