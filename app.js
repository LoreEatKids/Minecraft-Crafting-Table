"use strict";

class CraftingTable {
  constructor() {
    this.CRAFTING_TABLE = 4;
    this.WOOD_PLANK = 5;
    this.STICK = 30;
    this.WOOD = 17;
    this.WOOD_PICKAXE = 40;
    this.STONE_PICKAXE = 41;
    this.COBBLESTONE = 6;

    this.inventoryContainerEl = document.querySelector(".items-container");
    this.dataCellsAll = document.querySelectorAll(".grid-element");
    this.resultEl = document.querySelector(".result");

    this.currentCraftingTable = [];
    this.inventory = [this.WOOD_PLANK, this.COBBLESTONE].sort((x) => x > 0);

    this.crafting = [
      [[0, 0, 0, 0, this.WOOD_PLANK, 0, 0, 0, 0], this.WOOD],
      [[0, 0, 0, 0, this.WOOD, 0, 0, this.WOOD, 0], this.STICK],
      [[this.WOOD, this.WOOD, this.WOOD, 0, this.STICK, 0, 0, this.STICK, 0], this.WOOD_PICKAXE],
      [[this.COBBLESTONE, this.COBBLESTONE, this.COBBLESTONE, 0, this.STICK, 0, 0, this.STICK, 0], this.STONE_PICKAXE],
      [[0, 0, 0, this.WOOD, this.WOOD, 0, this.WOOD, this.WOOD, 0], this.CRAFTING_TABLE]
    ];

    this.selectedItems = 0;

    this.loadInventory();
    this.setupEventListeners();
  }

  loadInventory() {
    this.inventoryContainerEl.innerHTML = ""; // Refreshing inventory items
    this.inventory.forEach((item) => {
      const html =
        item > 0
          ? `<div class="items-element"><img src="static/${item}.png" class="inventory-img" data-id="${item}"></div>`
          : `<div class="items-element" data-id="0">0</div>`;

      this.inventoryContainerEl.insertAdjacentHTML("afterbegin", html);
    });

    // Refresh event
    document.querySelectorAll(".inventory-img").forEach((cell) =>
      cell.addEventListener("click", () => { if (cell) this.selectedItems = Number(cell.dataset.id); })
    );
  }

  createItemImg(cell, path) {
    cell.innerHTML = "";
    const img = document.createElement("img");
    img.classList.add("img-class");
    img.src = `static/${path}.png`;
    img.dataset.id = path;
    cell.appendChild(img);
  }

  updateCrafting(craft) {
    this.currentCraftingTable = Array.from(craft, (x) => Number(x.dataset.id));
    this.checkAndHandleCrafting();
  }

  checkAndHandleCrafting() {
    const matchedCraft = this.crafting.find( (craft) => this.currentCraftingTable.join() === craft[0].join() );
    if (matchedCraft) this.displayCraftingResult(matchedCraft[1]);
    else this.resultEl.innerHTML = "";
  }

  displayCraftingResult(newCraft) {
    this.resultEl.innerHTML = "";
    this.createItemImg(this.resultEl, newCraft);

    const img = this.resultEl.querySelector("img");

    img.addEventListener("click", () => {
      if (this.inventory.includes(newCraft)) {
        alert("You already have this item");
        return;
      }

      this.inventory.push(newCraft);
      this.loadInventory();
    });
  }

  setupEventListeners() {
    this.dataCellsAll.forEach((cell) => cell.addEventListener("click", this.handleCellClick.bind(this, cell)) );
  }

  handleCellClick(cell) {
    if (this.selectedItems === 0) {
        alert("Pick an item before");
        return;
    };

    cell.dataset.id = this.selectedItems;

    this.updateCrafting(this.dataCellsAll);
    this.createItemImg(cell, cell.dataset.id);
  }
}

const MinecraftCraftingTable = new CraftingTable();