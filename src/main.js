document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".step");
  const circleSteps = document.querySelectorAll(".circle");
  const plans = document.querySelectorAll(".plan-card");
  let currentStep = 1;
  let currentCircle = 1;

  let time;
  const obj = {
    plan: null,
    kind: null,
    price: null,
  };

  function showStep(stepNumber) {
    steps.forEach((step) => {
      step.style.display = "none";
    });

    steps[stepNumber - 1].style.display = "flex";
  }

  function updateProgress() {
    circleSteps.forEach((circle, index) => {
      if (index < currentCircle) {
        circle.classList.add("active");
      } else {
        circle.classList.remove("active");
      }
    });
  }

  document.querySelectorAll(".next-step").forEach((nextBtn, index) => {
    nextBtn.addEventListener("click", function () {
      if (currentStep < steps.length) {
        currentStep++;
        currentCircle++;
        showStep(currentStep);
        updateProgress();
        setTotal();
      }
      summary(obj);
    });
  });

  document.querySelectorAll(".prev-step").forEach((prevBtn) => {
    prevBtn.addEventListener("click", function () {
      if (currentStep > 1) {
        currentStep--;
        currentCircle--;
        showStep(currentStep);
        updateProgress();
      }
    });
  });

  plans.forEach((plan) => {
    plan.addEventListener("click", () => {
      document.querySelector(".selected").classList.remove("selected");
      plan.classList.add("selected");
      const planName = plan.querySelector("b");
      const planPrice = plan.querySelector(".plan-priced");
      obj.plan = planName;
      obj.price = planPrice;
    });
  });

  const switcher = document.querySelectorAll(".switch");
  const addons = document.querySelectorAll(".box");
  const total = document.querySelectorAll(".total b");
  const planPrice = document.querySelectorAll(".plan-price");

  function summary(obj) {
    const planName = document.querySelector(".plan-name");
    const planPrice = document.querySelector(".plan-price");
    planPrice.innerHTML = `${obj.price.innerText}`;
    planName.innerHTML = `${obj.plan.innerText} (${
      obj.kind ? "yearly" : "monthly"
    })`;
  }

  switcher.addEventListener("click", () => {
    const val = switcher.querySelector("input").checked;
    if (val) {
      document.querySelector(".monthly").classList.remove("sw-active");
      document.querySelector(".yearly").classList.add("sw-active");
    } else {
      document.querySelector(".monthly").classList.add("sw-active");
      document.querySelector(".yearly").classList.remove("sw-active");
    }
    switchPrice(val);
    obj.kind = val;
  });

  addons.forEach((addon) => {
    addon.addEventListener("click", (e) => {
      const addonSelect = addon.querySelector("input");
      const ID = addon.getAttribute("data-id");
      if (addonSelect.checked) {
        addonSelect.checked = false;
        addon.classList.remove("ad-selected");
        showAddon(ID, false);
      } else {
        addonSelect.checked = true;
        addon.classList.add("ad-selected");
        showAddon(addon, true);
        e.preventDefault();
      }
    });
  });

  function switchPrice(checked) {
    const yearlyPrice = [90, 120, 150];
    const monthlyPrice = [9, 12, 15];
    const prices = document.querySelectorAll(".plan-priced");
    if (checked) {
      prices[0].innerHTML = `$${yearlyPrice[0]}/yr`;
      prices[1].innerHTML = `$${yearlyPrice[1]}/yr`;
      prices[2].innerHTML = `$${yearlyPrice[2]}/yr`;
      setTimeout(true);
    } else {
      prices[0].innerHTML = `$${monthlyPrice[0]}/mo`;
      prices[1].innerHTML = `$${monthlyPrice[1]}/mo`;
      prices[2].innerHTML = `$${monthlyPrice[2]}/mo`;
      setTimeout(false);
    }
  }

  function showAddon(ad, val) {
    const temp = document.getElementsByTagName("template")[0];
    const clone = temp.content.cloneNode(true);
    const serviceName = clone.querySelector(".service-name");
    const servicePrice = clone.querySelector(".service-price");
    const serviceID = clone.querySelector(".selected-addon");
    if (ad && val) {
      serviceName.innerHTML = ad.querySelector("label").innerText;
      servicePrice.innerHTML = ad.querySelector(".price").innerText;
      serviceID.setAttribute("data-id", ad.dataset.id);
      document.querySelectorAll(".addons").appendChild(clone);
    } else {
      const addons = document.querySelectorAll(".selected-addon");
      addons.forEach((addon) => {
        const attr = addon.getAttribute("data-id");
        if (attr == ad) {
          addon.remove();
        }
      });
    }
  }

  function setTotal() {
    const str = planPrice.innerHTML;
    const res = str.replace(/\D/g, "");
    const addonPrices = document.querySelectorAll(
      ".selected-addon .service-price"
    );
    let val = 0;
    for (let i = 0; i < addonPrices.length; i++) {
      const str = addonPrices[i].innerHTML;
      const res = str.replace(/\D/g, "");
      val += Number(res);
    }
    total.innerHTML = `$${(val = Number(res))}/${time ? "yr" : "mo"}`;
  }

  function setTimeout(t) {
    return (time = t);
  }

  // Prevent form submission on "Enter" key press
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
});
