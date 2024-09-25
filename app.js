function classRemoveAndAdd(
  removingClassFrom,
  removingClassName,
  newClassItem,
  addingClassName
) {
  document
    .getElementById(removingClassFrom)
    .classList.remove(removingClassName);
  document.getElementById(newClassItem).classList.add(addingClassName);
}

document.getElementById("btn-history").addEventListener("click", function (e) {
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

let currentBalanceText = document.getElementById("current-balance");
let currentBalance = parseFloat(currentBalanceText.innerText);

let transactionNumber = 0;

// donation calculation formula

function donatation(inputId, donatedProjectMoney, projectTitle) {
  const donationAmount = document.getElementById(inputId);
  const projectName = document.getElementById(projectTitle);

  if (!/^-?\d+(\.\d+)?$/.test(donationAmount.value)) {
    alert(donationAmount.value + " Wrong Input");
  } else if (parseFloat(donationAmount.value) < 0) {
    alert("you can not donate negative money");
  } else if (parseFloat(donationAmount.value) > currentBalance) {
    alert("please topup your account");
  }

  // checkup done. now calculation
  else {
    currentBalance = currentBalance - parseFloat(donationAmount.value);
    currentBalanceText.innerText = currentBalance.toFixed(2);

    const donatedByOthersString = document.getElementById(donatedProjectMoney);
    const othersPlusMyDonation =
      parseFloat(donatedByOthersString.innerText) +
      parseFloat(donationAmount.value);

    donatedByOthersString.innerText = othersPlusMyDonation.toFixed(2);

    const tr = document.createElement("tr");

    tr.innerHTML = `<tr>
                <th>${(transactionNumber += 1)}</th>
                <td>${parseFloat(donationAmount.value).toFixed(2)}</td>
                <td>${projectName.innerText}</td>
                <td>${new Date().toString()}</td>
              </tr>`;

    document.getElementById("transaction-list").appendChild(tr);

    document.getElementById("donated").innerText = parseFloat(
      donationAmount.value
    ).toFixed(2);
    document.getElementById("project-title").innerText = projectName.innerText;

    my_modal.showModal();

    donationAmount.value = "";
  }
}

document
  .getElementById("first-card-donate-btn")
  .addEventListener("click", function (e) {
    donatation("first-card-input", "donated-by-others", "project-name");
  });
