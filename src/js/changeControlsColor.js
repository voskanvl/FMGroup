export default function changeControlsColor(controls, colors, state) {
    controls.forEach(el => {
        if (el && el.__proto__.constructor.name.includes("HTML"))
            el.style.color = colors[state];
    });
}
