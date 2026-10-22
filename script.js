// Animações ao rolar a página
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal, .line-draw").forEach((el) => io.observe(el));

// Cabeçalho com fundo ao rolar
const header = document.querySelector("header");
const onScroll = () => {
  const s = window.scrollY > 30;
  ["border-b", "border-border", "bg-background/70", "backdrop-blur-xl"].forEach((c) => header.classList.toggle(c, s));
};
onScroll(); window.addEventListener("scroll", onScroll);

// Acordeão da trajetória
const buttons = [...document.querySelectorAll("#trajetoria button")];
function setOpen(btn, open) {
  const title = btn.children[1].children[0];
  const body = btn.children[1].children[1];
  const icon = btn.children[2];
  title.classList.toggle("text-primary", open);
  ["mt-2", "grid-rows-[1fr]", "opacity-100"].forEach((c) => body.classList.toggle(c, open));
  ["grid-rows-[0fr]", "opacity-0"].forEach((c) => body.classList.toggle(c, !open));
  icon.classList.toggle("rotate-45", open);
  btn.dataset.open = open ? "1" : "";
}
buttons.forEach((btn, i) => {
  setOpen(btn, i === 0);
  btn.addEventListener("click", () => {
    const wasOpen = btn.dataset.open === "1";
    buttons.forEach((b) => setOpen(b, false));
    if (!wasOpen) setOpen(btn, true);
  });
});
