function money(n) {
  if (!isFinite(n)) return "—";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(n);
}

function clampServings(n) {
  if (!isFinite(n)) return 0;
  return Math.max(0, Math.floor(n));
}

function calc() {
  const totalEl = document.getElementById("totalCost");
  const servingsEl = document.getElementById("servings");
  const costPerMealEl = document.getElementById("costPerMeal");
  const costPerPersonEl = document.getElementById("costPerPerson");

  // If calculator UI isn't on this page, bail safely.
  if (!totalEl || !servingsEl || !costPerMealEl || !costPerPersonEl) return;

  const total = parseFloat(totalEl.value);
  const servingsRaw = parseFloat(servingsEl.value);
  const servings = clampServings(servingsRaw);

  const costPerMeal = total;
  const costPerPerson = servings > 0 ? total / servings : NaN;

  costPerMealEl.textContent = money(costPerMeal);
  costPerPersonEl.textContent = money(costPerPerson);
}

document.addEventListener("DOMContentLoaded", () => {
  // Footer year (safe)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Calculator wiring (safe if calculator section removed)
  const btn = document.getElementById("calcBtn");
  if (btn) btn.addEventListener("click", calc);

  ["totalCost", "servings"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") calc();
    });
  });
});
