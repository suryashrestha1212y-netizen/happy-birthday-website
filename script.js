const $ = (id) => document.getElementById(id);

// Mobile navigation opens and closes properly.
const menuToggle = $("menuToggle");
const nav = $("nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

// Scroll progress indicator.
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  $("progress").style.width = `${progress}%`;
});

// Birthday cake controls.
const cake = document.querySelector(".cake");
const flames = document.querySelectorAll(".flame");
const blowBtn = $("blowBtn");
const cutBtn = $("cutBtn");
const cakeStatus = $("cakeStatus");
let candlesOut = false;

blowBtn.addEventListener("click", () => {
  if (candlesOut) return;
  flames.forEach(flame => flame.classList.add("out"));
  candlesOut = true;
  cutBtn.disabled = false;
  blowBtn.disabled = true;
  blowBtn.textContent = "Wish made! ♡";
  cakeStatus.textContent = "Your wish is on its way. Now it's time for cake!";
  celebrate(34);
});

cutBtn.addEventListener("click", () => {
  if (!candlesOut || cake.classList.contains("cut")) return;
  cake.classList.add("cut");
  cutBtn.disabled = true;
  cutBtn.textContent = "Enjoy your slice ♡";
  cakeStatus.textContent = "A little slice of birthday happiness, just for you!";
  celebrate(24);
});

$("resetCake").addEventListener("click", () => {
  cake.classList.remove("cut");
  flames.forEach(flame => flame.classList.remove("out"));
  candlesOut = false;
  blowBtn.disabled = false;
  blowBtn.textContent = "Blow out candles ✨";
  cutBtn.disabled = true;
  cutBtn.textContent = "Cut the cake 🍰";
  cakeStatus.textContent = "First, make a wish and blow out the candles.";
});

// Reveal the final message once, then allow the button to hide it.
$("surpriseBtn").addEventListener("click", () => {
  const message = $("surpriseMessage");
  const willShow = message.hidden;
  message.hidden = !willShow;
  $("surpriseBtn").textContent = willShow ? "That's so sweet ♡" : "One last little surprise ♡";
  if (willShow) {
    message.scrollIntoView({ behavior: "smooth", block: "center" });
    celebrate(18);
  }
});

function celebrate(amount) {
  const layer = $("confettiLayer");
  const pieces = ["#e8a7b7", "#f2c9a8", "#c7a9d8", "#e8d58f", "#ffffff"];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = pieces[Math.floor(Math.random() * pieces.length)];
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    layer.appendChild(piece);
    window.setTimeout(() => piece.remove(), 4000);
  }
}

// Close the mobile menu if the user resizes back to desktop.
window.addEventListener("resize", () => {
  if (window.innerWidth > 800) {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }
});
