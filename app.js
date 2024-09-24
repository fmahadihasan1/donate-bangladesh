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
