export function disappear(control) {
    control.style.opacity = 0;
    setTimeout(() => (control.style.display = "none"), 800);
}
export function appear(control) {
    control.style.display = "";
    control.style.opacity = 1;
}
