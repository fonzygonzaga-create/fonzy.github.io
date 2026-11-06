// Create the button
const button = document.createElement("button");
button.textContent = "Don't click me";
button.style.cssText = `
  margin-top: 24px;
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: #e74c3c;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
document.body.appendChild(button);

// Explosion effect
function explode(btn) {
  const rect = btn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const colors = ["#e74c3c", "#f39c12", "#f1c40f", "#ffffff"];
  const particleCount = 40;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    const size = 6 + Math.random() * 8;

    particle.style.cssText = `
      position: fixed;
      left: ${centerX}px;
      top: ${centerY}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 140;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    const animation = particle.animate(
      [
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 },
      ],
      { duration: 600 + Math.random() * 400, easing: "ease-out" }
    );

    animation.onfinish = () => particle.remove();
  }
}

button.addEventListener("click", () => {
  explode(button);

  // Hide the button, then bring it back
  button.style.visibility = "hidden";
  setTimeout(() => {
    button.style.visibility = "visible";
  }, 1200);
});