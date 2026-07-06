document.addEventListener("DOMContentLoaded", () => {
    fetchInventory();
    initializeInventorySearch();
});

function initializeInventorySearch() {
    const searchInput = document.getElementById("inventorySearch");
    if (!searchInput) return;

    searchInput.addEventListener("keyup", function () {
        const keyword = this.value.toLowerCase();
        const rows = document.querySelectorAll("#inventoryTable tr");
        rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            row.style.display = text.includes(keyword) ? "" : "none";
        });
    });
}

function initializeRowAnimation() {
    const rows = document.querySelectorAll("#inventoryTable tr");
    rows.forEach(row => {
        row.addEventListener("mouseenter", () => { row.style.transition = ".25s"; row.style.transform = "scale(1.01)"; });
        row.addEventListener("mouseleave", () => { row.style.transform = "scale(1)"; });
    });
}

function statusBadge(currentStock, threshold) {
    if (currentStock <= 0) return '<span class="badge bg-danger">Out of Stock</span>';
    if (currentStock <= threshold) return '<span class="badge bg-warning">Low</span>';
    return '<span class="badge bg-success">Available</span>';
}

async function fetchInventory() {
    const tbody = document.getElementById("inventoryTable");
    if (!tbody) return;

    try {
        const response = await fetch("http://localhost:8080/inventory");
        const result = await response.json();
        const items = result.data;

        tbody.innerHTML = "";

        items.forEach(item => {
            const product = item.product || {};
            tbody.innerHTML += `
                <tr data-inventory-id="${item.id}">
                    <td>${item.id}</td>
                    <td>${product.name || "N/A"}</td>
                    <td>${product.brand || "N/A"}</td>
                    <td>${product.category || "N/A"}</td>
                    <td>${item.currentStock}</td>
                    <td>${statusBadge(item.currentStock, item.threshold)}</td>
                    <td>
                        <button class="btn btn-primary btn-sm update-btn"
                            data-id="${item.id}"
                            data-product-id="${product.id}"
                            data-current-stock="${item.currentStock}"
                            data-threshold="${item.threshold}">
                            Update
                        </button>
                    </td>
                </tr>
            `;
        });

        initializeUpdateButtons();
        initializeRowAnimation();

    } catch (error) {
        console.log("Inventory API not connected:", error);
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Failed to load inventory. Is the backend running?</td></tr>`;
    }
}

function initializeUpdateButtons() {
    const buttons = document.querySelectorAll(".update-btn");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const currentStock = this.dataset.currentStock;
            const newStock = prompt("Enter new stock quantity:", currentStock);
            if (newStock === null || newStock.trim() === "" || isNaN(newStock)) return;

            updateInventory({
                id: Number(this.dataset.id),
                product: { id: Number(this.dataset.productId) },
                currentStock: Number(newStock),
                threshold: Number(this.dataset.threshold)
            });
        });
    });
}

async function updateInventory(inventoryPayload) {
    try {
        const response = await fetch("http://localhost:8080/inventory", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inventoryPayload)
        });

        if (!response.ok) throw new Error("Update failed");

        alert("Stock updated successfully.");
        fetchInventory();

    } catch (error) {
        console.log("Inventory Update Failed:", error);
        alert("Failed to update inventory. Check backend logs.");
    }
}

console.log("Retail Astra Inventory Loaded Successfully.");