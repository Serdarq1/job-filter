const filterButtons = document.querySelectorAll('.btn');
const jobListings = document.querySelectorAll('.row');
const filterSelect = document.getElementById('filter');
const newFilter = document.querySelector(".new-filter")
const newFilterContainer = document.querySelector(".new-filter-container")
const clear = document.querySelector(".clear")

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.textContent.toLowerCase();

        // Create a button inside #area for the selected filter
        const filterButton = document.createElement('div');
        filterButton.classList.add('selected-filter');
        filterButton.innerHTML = `<button class="btn rounded-2 text-light fw-bold me-3 " style="background-color: hsl(180, 29%, 50%);;">${filterValue}</button>`;
        newFilter.appendChild(filterButton)
        filterButton.addEventListener('click', () => removeFilter(filterButton));

        // Check if newFilterContainer should be displayed
        if(newFilter.contains(filterButton)) {
            newFilterContainer.classList.remove("d-none")
        }else{
            newFilterContainer.classList.add("d-none")
        }

        // Update job listings based on the selected filter
        filterListings(filterValue);
    });
});

clear.addEventListener("click", () => {
    // Clear all filters
    newFilter.innerHTML = '';

    // Update job listings to show all
    filterListings('all');

    // Hide the newFilter container
    newFilterContainer.classList.add("d-none");
});

filterSelect.addEventListener('change', () => {
    const selectedFilter = filterSelect.value.toLowerCase();
    filterListings(selectedFilter);
});

function filterListings(filter) {
    jobListings.forEach(listing => {
        const listingTags = Array.from(listing.querySelectorAll('.btn'));
        if (listingTags.some(tag => tag.textContent.toLowerCase() === filter) || filter === 'all') {
            listing.style.display = 'flex';
        } else {
            listing.style.display = 'none';
        }
    });
}

function removeFilter(filterButton) {
    const filterValue = filterButton.textContent.toLowerCase();

    // Remove the filter button from #area
    newFilter.removeChild(filterButton);

    // Update job listings based on the remaining filters
    const activeFilters = Array.from(newFilter.querySelectorAll('.selected-filter')).map(btn => btn.textContent.toLowerCase());
    if (activeFilters.length > 0) {
        filterListings(activeFilters[0]); // Only consider the first active filter for simplicity
    } else {
        filterListings('all');
        newFilter.style.display = 'none'; // Hide #newFilter if there are no active filters
    }
}
