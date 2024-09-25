function getElmnt(elmId) {
  return document.getElementById(elmId);
}

function classRemoveAndAdd(
  removingClassFrom,
  removingClassName,
  newClassItem,
  addingClassName
) {
  document
    .getElementById(removingClassFrom)
    .classList.remove(removingClassName);
  getElmnt(newClassItem).classList.add(addingClassName);
}

getElmnt("btn-history").addEventListener("click", function (e) {
  classRemoveAndAdd(
    "donation-histories",
    "hidden",
    "donation-cards-container",
    "hidden"
  );

  classRemoveAndAdd(
    "btn-donation-cards",
    "bg-[rgba(255,153,116,0.72)]",
    "btn-donation-cards",
    "btn-outline"
  );
  classRemoveAndAdd(
    "btn-history",
    "btn-outline",
    "btn-history",
    "bg-[rgba(255,153,116,0.72)]"
  );
});

document
  .getElementById("btn-donation-cards")
  .addEventListener("click", function (e) {
    classRemoveAndAdd(
      "donation-cards-container",
      "hidden",
      "donation-histories",
      "hidden"
    );

    classRemoveAndAdd(
      "btn-donation-cards",
      "btn-outline",
      "btn-donation-cards",
      "bg-[rgba(255,153,116,0.72)]"
    );

    classRemoveAndAdd(
      "btn-history",
      "bg-[rgba(255,153,116,0.72)]",
      "btn-history",
      "btn-outline"
    );
  });

let currentBalanceText = getElmnt("current-balance");
let currentBalance = parseFloat(currentBalanceText.innerText);

let transactionNumber = 0;

// donation calculation formula

function donatation(inputId, donatedProjectMoney, projectTitle) {
  const donationAmount = getElmnt(inputId);
  const projectName = getElmnt(projectTitle);

  if (
    !/^-?\d+(\.\d+)?$/.test(donationAmount.value) ||
    parseFloat(donationAmount.value) <= 0
  ) {
    my_modal_2.showModal();
  } else if (parseFloat(donationAmount.value) > currentBalance) {
    my_modal_3.showModal();
  }

  // checkup done. now calculation
  else {
    currentBalance = currentBalance - parseFloat(donationAmount.value);
    currentBalanceText.innerText = currentBalance.toFixed(2);

    const donatedByOthersString = getElmnt(donatedProjectMoney);
    const othersPlusMyDonation =
      parseFloat(donatedByOthersString.innerText) +
      parseFloat(donationAmount.value);

    donatedByOthersString.innerText = othersPlusMyDonation.toFixed(2);

    const div = document.createElement("div");

    div.innerHTML = `
    
          <div class = 'border border-gray-400 rounded-md mb-5 p-5'>

            <h1 class="text-2xl font-bold text-justify" > 
            ${parseFloat(donationAmount.value).toFixed(2)} is donated for ${
      projectName.innerText
    }
            </h1>
            <p>Date: ${new Date().toString()}</p>

          </div>
    `;

    getElmnt("transaction-list").appendChild(div);

    getElmnt("transaction-default").classList.add("hidden");

    getElmnt("donated").innerText = parseFloat(donationAmount.value).toFixed(2);
    getElmnt("project-title").innerText = projectName.innerText;

    my_modal.showModal();

    donationAmount.value = "";
  }
}

document
  .getElementById("first-card-donate-btn")
  .addEventListener("click", function (e) {
    donatation("first-card-input", "donated-by-others", "project-name");
  });

document
  .getElementById("second-card-donate-btn")
  .addEventListener("click", function (e) {
    donatation(
      "second-card-input",
      "donated-by-others-second-card",
      "second-project-name"
    );
  });
document
  .getElementById("third-card-donate-btn")
  .addEventListener("click", function (e) {
    donatation(
      "third-card-input",
      "donated-by-others-third-card",
      "third-project-name"
    );
  });
