const form = document.querySelector("form");
// Aside
const aside = document.querySelector(".steps");

const plans = {
  monthly: {
    arcade: 9,
    advanced: 12,
    pro: 15,
  },
  yearly: {
    arcade: 90,
    advanced: 120,
    pro: 150,
  },
};

const addOnsData = {
  monthly: {
    onlineService: 1,
    largerStorage: 2,
    customizableProfile: 2,
  },
  yearly: {
    onlineService: 10,
    largerStorage: 20,
    customizableProfile: 20,
  },
};

const changeStepBg = (step) => {
  // Remove all active classes from li>div
  const allSteps = document.querySelectorAll(".steps li > div");
  allSteps.forEach((stepDiv) => {
    stepDiv.classList.remove("active");
  });

  // Add active class to the current step
  const currentStep = document.querySelector(
    `.steps li:nth-child(${step}) > div`
  );
  currentStep.classList.add("active");
};

const prevBtn = document.querySelectorAll("section #prev");

prevBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const currentSection = e.target.closest("section");
    const currentStep = parseInt(currentSection.classList[0].split("-")[1]);

    // Change background step
    changeStepBg(currentStep - 1);

    // Hide current section and show previous section
    currentSection.classList.remove("show");
    document
      .querySelector(`section.step-${currentStep - 1}`)
      .classList.add("show");
  });
});

// Step 1
const stepOneInputs = document.querySelectorAll("section.step-1 input");
const stepOneButton = document.querySelector("section.step-1 #next");

stepOneButton.addEventListener("click", (e) => {
  e.preventDefault();
  let allValid = true;

  stepOneInputs.forEach((input) => {
    // Previous sibling to show error message
    const errorMessage = input.previousElementSibling;
    if (!input.value) {
      input.classList.add("show-error");

      errorMessage.classList.add("show-error");

      allValid = false;
    } else {
      input.classList.remove("show-error");
      errorMessage.classList.remove("show-error");
    }
  });

  if (allValid) {
    changeStepBg(2);
    document.querySelector("section.step-1").classList.remove("show");
    document.querySelector("section.step-2").classList.add("show");
  }
});

// Step 2
const step2 = document.querySelector("section.step-2");
const planPrices = step2.querySelectorAll(".plan-price");
const bonus = step2.querySelectorAll(".bonus");

const step2Inputs = document.querySelectorAll("section.step-2 input");
const step2Button = document.querySelector("section.step-2 #next");
const planBtn = document.querySelector("section.step-2 .togglePlan");

planBtn.addEventListener("click", (e) => {
  // If checked yearly else monthly
  const isYearly = e.target.checked;
  const plan = isYearly ? "yearly" : "monthly";

  // Change prices based on the plan
  planPrices.forEach((price) => {
    const priceValue = price.parentElement.parentElement.getAttribute(
      `data-${plan}`
    );
    price.textContent = `$${priceValue}${isYearly ? "/yr" : "/mo"}`;
  });

  if (isYearly) {
    bonus.forEach((b) => {
      b.style.display = "block";
    });

    document.querySelector(".monthly").style.fontWeight = "normal";
    document.querySelector(".yearly").style.fontWeight = "bold";
  } else {
    bonus.forEach((b) => {
      b.style.display = "none";
    });

    document.querySelector(".yearly").style.fontWeight = "normal";
    document.querySelector(".monthly").style.fontWeight = "bold";
  }
});

step2Button.addEventListener("click", (e) => {
  e.preventDefault();
  let allValid = true;

  // Check if any radio input is selected else show error
  const radioInputs = step2.querySelectorAll("input[type='radio']");

  if (![...radioInputs].some((input) => input.checked)) {
    radioInputs.forEach((input) => {
      input.nextElementSibling.classList.add("show-error");
    });
    allValid = false;
  } else {
    radioInputs.forEach((input) => {
      input.nextElementSibling.classList.remove("show-error");
    });
  }

  if (allValid) {
    changeStepBg(3);
    step2.classList.remove("show");
    document.querySelector("section.step-3").classList.add("show");
  }
});

// If user select a plan then remove errors
const planInputs = step2.querySelectorAll("input[type='radio']");
planInputs.forEach((input) => {
  input.addEventListener("change", (e) => {
    planInputs.forEach((input) => {
      input.nextElementSibling.classList.remove("show-error");
    });
  });
});

// Step 3
const step3Labels = document.querySelectorAll("section.step-3 label");
const step3Button = document.querySelector("section.step-3 #next");
let isYearly = false; // Default to yearly

planBtn.addEventListener("click", (e) => {
  // If checked yearly else monthly
  isYearly = e.target.checked;

  step3Labels.forEach((label) => {
    const price = label.querySelector(".price");
    const plan = isYearly ? "yearly" : "monthly";
    const priceValue = label.getAttribute(`data-${plan}`);
    price.textContent = `$${priceValue}${isYearly ? "/yr" : "/mo"}`;
    // // Input values
    // label.querySelector("input").value = priceValue;
  });
});

step3Button.addEventListener("click", (e) => {
  e.preventDefault();

  changeStepBg(4);
  document.querySelector("section.step-3").classList.remove("show");
  document.querySelector("section.step-4").classList.add("show");
});

// Step 4
const step4Button = document.querySelector("section.step-4 #next");
const plan = document.querySelector("section.step-4 .plan");
const addOns = document.querySelector("section.step-4 .add-ons-list");
const total = document.querySelector("section.step-4 .total");

step3Button.addEventListener("click", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const selectedAddOns = formData.getAll("addons");
  const data = Object.fromEntries(formData.entries());
  const planSubscription =
    data["plan-toggler"] === "yearly" ? "yearly" : "monthly";

  // Render selected plan
  const planH3 = plan.querySelector("h3");
  const planPrice = plan.querySelector(".plan-price");
  planH3.textContent = `${data.plan.toLocaleUpperCase()} (${
    isYearly ? "Yearly" : "Monthly"
  })`;

  planPrice.textContent = `$${plans[planSubscription][data.plan]}${
    isYearly ? "/yr" : "/mo"
  }`;

  // Render selected add-ons
  addOns.innerHTML = ""; // Clear previous add-ons
  let totalAddOnsPrice = 0;
  selectedAddOns.forEach((addOn) => {
    const addOnDiv = document.createElement("div");
    addOnDiv.classList.add("add-on");
    // Convert addOn name to camelCase to match object keys
    const formatAddOnKey = (name) =>
      name
        .toLowerCase()
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        )
        .replace(/\s+/g, "");

    const addOnKey = formatAddOnKey(addOn);
    const addOnPrice = addOnsData[planSubscription][addOnKey];
    totalAddOnsPrice += addOnPrice;

    addOnDiv.innerHTML = `
      <div>
        <p>${addOn}</p>
        <span class="price">$${addOnPrice}${isYearly ? "/yr" : "/mo"}</span>
      </div>
    `;
    addOns.appendChild(addOnDiv);
  });

  total.querySelector("p").textContent = `Total (per ${
    isYearly ? "year" : "month"
  })`;

  // Update total (outside the loop)
  total.querySelector(".total-price").textContent = `$${(
    plans[planSubscription][data.plan] + totalAddOnsPrice
  ).toFixed(2)}${isYearly ? "/yr" : "/mo"}`;
});

step4Button.addEventListener("click", (e) => {
  e.preventDefault();
  // Show thank you message
  document.querySelector("section.step-4").classList.remove("show");
  document.querySelector("section.thank-you").classList.add("show");

  // Change background step
  changeStepBg(5);
});

const changePlan = document.querySelector("#change-plan");

changePlan.addEventListener("click", (e) => {
  e.preventDefault();
  // Show step 2
  document.querySelector("section.step-2").classList.add("show");

  // Remove show class from step 4
  document.querySelector("section.step-4").classList.remove("show");

  // Change background step
  changeStepBg(2);
});
