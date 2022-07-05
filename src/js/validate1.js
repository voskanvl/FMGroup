import Inputmask from "inputmask";

const accocValidators = {
    phone: () => new Inputmask("+7(999) 999-99-99"),
    mail: () => new Inputmask({ regex: "\\w+@\\w+\\.\\w+" }),
    text: () => new Inputmask({ regex: "[a-zA-Zа-яёА-ЯЁ0-9]{3,}" }),
};
window.accocValidators = accocValidators;

const disableUntouched = input => input.removeAttribute("untouched");
const enableUntouched = input => input.setAttribute("untouched", true);

const toDisable = ({ target }) => {
    disableUntouched(target);
    target.removeEventListener("click", toDisable);
};

const initFirstTouchHandler = arr => {
    [...arr].forEach(e => {
        e.addEventListener("click", toDisable);
    });
};

export function Validate1(form) {
    const inputs = [...form.querySelectorAll("input")]
        .filter(e => e.type !== "submit")
        .map(e => {
            const type = e.getAttribute("type");
            const untouched = e.getAttribute("untouched");
            const validator = accocValidators[type]();
            validator.mask(e);
            return {
                input: e,
                type,
                validator,
                untouched,
            };
        });
    window.inputsApp = inputs;
    initFirstTouchHandler(inputs.map(e => e.input));
}
