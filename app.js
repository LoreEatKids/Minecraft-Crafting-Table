"use strict";

let CRAFTING_TABLE = 4;
let WOOD_PLANK = 5;
let STICK = 30;
let WOOD = 17;
let WOOD_PICKAXE = 40;
let STONE_PICKAXE = 41;
let COBBLESTONE = 6;

const inventoryContailerEl = document.querySelector(".items-container");
const dataCellsAll = document.querySelectorAll(".grid-element");
const invContainerEl = document.querySelector(".items-container");
const resultEl = document.querySelector(".result");

const currentCraftingTable = [];
const inventory = [WOOD_PLANK, COBBLESTONE, 0, 0, 0, 0, 0].sort(x => x > 0);

const crafting = [
    [[0, 0, 0, 0, WOOD_PLANK, 0, 0, 0 ,0], WOOD],  // TODO multiple wood crafting: [[WOOD_PLANK, 0, 0, 0, 0, 0, 0, 0, 0], WOOD], [[0, WOOD_PLANK, 0, 0, 0, 0, 0, 0, 0], WOOD], [[0, 0, WOOD_PLANK, 0, 0, 0, 0, 0, 0], WOOD],
    [[0, 0, 0, 0, WOOD, 0, 0, WOOD ,0], STICK],
    [[WOOD, WOOD, WOOD, 0, STICK, 0, 0, STICK, 0], WOOD_PICKAXE],
    [[COBBLESTONE, COBBLESTONE, COBBLESTONE, 0, STICK, 0, 0, STICK, 0], STONE_PICKAXE],
    [[0, 0, 0, WOOD, WOOD, 0, WOOD, WOOD, 0], CRAFTING_TABLE]
];

let selectedItems = 0;

const loadInv = inv => {
    invContainerEl.innerHTML = ""; // refreshing inv items

    inv.forEach(item => {
        const html = item > 0 ? 
        `<div class="items-element"><img src="static/${item + ".png"}" class="inventory-img" data-id="${item}"></div>` :
        `<div class="items-element" data-id="0">0</div>`;
        inventoryContailerEl.insertAdjacentHTML("afterbegin", html);

        // refresh event
        document.querySelectorAll(".inventory-img").forEach(cell => cell.addEventListener("click", ()=> {if (cell) selectedItems = Number(cell.dataset.id)}));
    });
}
loadInv(inventory)

const updateCrafting = craft => {
    currentCraftingTable.length = 0; // reset the crafting each time you click

    craft.forEach(x => currentCraftingTable.push(Number(x.dataset.id)));
    checkMatch(currentCraftingTable);
}

const checkMatch = recipe => {
    crafting.forEach(craft => {
        if (currentCraftingTable.join() == craft[0]) {
            const newCraft = craft[1];
            resultEl.innerHTML = "";

            const img = document.createElement("img");
            img.classList.add("img-class");
            img.src = `static/${newCraft}.png`;
            resultEl.appendChild(img);

            img.addEventListener("click", () => {
                inventory.push(newCraft);            
                loadInv(inventory);
            })
        }
    })
}

dataCellsAll.forEach(x => {
    x.addEventListener("click", () => {
        if (selectedItems != 0) {
            x.dataset.id = selectedItems;
            
            updateCrafting(document.querySelectorAll('.grid-element'));
                
            x.innerHTML = "";
            const img = document.createElement("img");
            img.classList.add("img-class");
            img.dataset.id = x.dataset.id;
            img.src = `static/${x.dataset.id}.png`;
            x.appendChild(img);
        } else alert("select an item before");
    })
});