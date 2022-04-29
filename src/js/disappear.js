const DELAY = 400;
export function disappear(control) {
    // setTimeout(() => (control.style.opacity = 0), DELAY);
    control.style.opacity = 0;
    setTimeout(() => (control.style.display = "none"), DELAY);
}
export function appear(control) {
    control.style.display = "";
    setTimeout(() => (control.style.opacity = 1), DELAY);
}
