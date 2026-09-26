// Premium page script
// Handles billing toggle and plan selection

const billingBtns = document.querySelectorAll(".billing-btn");
const planCards = document.querySelectorAll(".plan-card");
const planAmounts = document.querySelectorAll(".plan-amount");
const planBarName = document.getElementById("planBarName");
const planBarPrice = document.getElementById("planBarPrice");
const planBarNote = document.getElementById("planBarNote");

let currentBilling = "monthly";
let currentPlan = "premium";

// Plan renewal prices per billing period
const renewalPrices = {
  premium: { monthly: "EGP 244.99 billed monthly", annual: "EGP 204.99 billed monthly, billed annually" },
  plus: { monthly: "EGP 2,025.00 billed monthly", annual: "EGP 1,689.00 billed monthly, billed annually" }
};

const planNames = {
  premium: "Premium",
  plus: "Premium+"
};

function updateBottomBar() {
  if (planBarName) planBarName.textContent = planNames[currentPlan];
  const activeAmount = document.querySelector(`.plan-card[data-plan="${currentPlan}"] .plan-amount`);
  if (planBarPrice && activeAmount) planBarPrice.textContent = activeAmount.textContent;
  if (planBarNote) {
    planBarNote.textContent = `For first 2 months, then ${renewalPrices[currentPlan][currentBilling]}`;
  }
}

billingBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    billingBtns.forEach((b) => {
      b.classList.remove("is-active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("is-active");
    btn.setAttribute("aria-selected", "true");
    currentBilling = btn.getAttribute("data-billing");

    planAmounts.forEach((amount) => {
      amount.textContent = amount.getAttribute(`data-${currentBilling}`);
    });

    updateBottomBar();
  });
});

planCards.forEach((card) => {
  card.addEventListener("click", () => {
    planCards.forEach((c) => {
      c.classList.remove("is-selected");
      c.setAttribute("aria-pressed", "false");
    });
    card.classList.add("is-selected");
    card.setAttribute("aria-pressed", "true");
    currentPlan = card.getAttribute("data-plan");
    updateBottomBar();
  });
});

updateBottomBar();
