"use strict";

var WOOD_PLANK = 5;
var STICK = 30;
var WOOD = 17;
var WOOD_PICKAXE = 40;
var STONE_PICKAXE = 41;
var COBBLESTONE = 6;

const inventoryContailerEl = document.querySelector(".items-container");
const dataCellsAll = document.querySelectorAll(".grid-element");
const invContainerEl = document.querySelector(".items-container");
const resultEl = document.querySelector(".result");

let currentCraftingTable = [];
let inventory = [WOOD_PLANK, COBBLESTONE, 0, 0, 0, 0, 0].sort(x => x > 0);

const crafting = [];
crafting.push([[0, 0, 0, 0, WOOD_PLANK, 0, 0, 0 ,0], WOOD]);
crafting.push([[0, 0, 0, 0, WOOD, 0, 0, WOOD ,0], STICK]);
crafting.push([[WOOD, WOOD, WOOD, 0, STICK, 0, 0, STICK, 0], WOOD_PICKAXE])
crafting.push([[COBBLESTONE, COBBLESTONE, COBBLESTONE, 0, STICK, 0, 0, STICK, 0], STONE_PICKAXE])

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

                
            // img.style = 
            // `
            // border: 2px solid black;
            // padding: 5px;
            // max-width: 50px;
            // margin: 0;
            // max-height: 25px;
            // min-height: 25px;
            // max-width: 25px;
            // min-width: 25px;
            // display: flex;
            // justify-content: center;
            // align-items: center;
            // cursor: pointer;
            // `
            x.appendChild(img);
        } else alert("select an item before");
    })
});