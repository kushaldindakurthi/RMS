document.addEventListener('DOMContentLoaded', () => {
    const reservationGrid = document.querySelector('.reservation-grid');
    const generateFloorBtn = document.getElementById('generateFloor');
    const numTablesInput = document.getElementById('numTables');
    const bookingForm = document.getElementById('bookingForm');
    const tableSelection = document.getElementById('tableSelection');
    const floorPlan = document.getElementById('floorPlan');
    const submitBookingFormBtn = document.getElementById('submitBookingForm');
    const tablesLeftDisplay = document.getElementById('tablesLeft');

    let numTablesToSelect;
    let selectedTablesCount = 0;

    submitBookingFormBtn.addEventListener('click', (event) => {
        event.preventDefault();
        bookingForm.style.display = 'none';
        tableSelection.style.display = 'block';
    });

    generateFloorBtn.addEventListener('click', () => {
        // Clear previous tables
        reservationGrid.innerHTML = '';

        // Get the number of tables to select
        numTablesToSelect = parseInt(numTablesInput.value);
        selectedTablesCount = 0;

        // Create a 4x4 grid of tables
        for (let i = 1; i <= 16; i++) {
            const table = document.createElement('div');
            table.className = 'table';
            table.textContent = `Table ${i}`;
            table.addEventListener('click', () => reserveTable(table));
            reservationGrid.appendChild(table);
        }

        floorPlan.style.display = 'block';
        tablesLeftDisplay.style.display = 'block';
        updateTablesLeftDisplay();
    });

    function reserveTable(table) {
        if (!table.classList.contains('reserved') && selectedTablesCount < numTablesToSelect) {
            table.classList.add('reserved');
            selectedTablesCount++;
            updateTablesLeftDisplay();
            if (selectedTablesCount === numTablesToSelect) {
                alert('You have selected all required tables.');
            }
        } else if (table.classList.contains('reserved')) {
            table.classList.remove('reserved');
            selectedTablesCount--;
            updateTablesLeftDisplay();
        } else {
            alert(`You can only select ${numTablesToSelect} tables.`);
        }
    }

    function updateTablesLeftDisplay() {
        const tablesLeft = numTablesToSelect - selectedTablesCount;
        tablesLeftDisplay.textContent = `${tablesLeft} table(s) left to select.`;
    }
});
