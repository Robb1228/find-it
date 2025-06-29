document.addEventListener('DOMContentLoaded', () => {
    const lostItemForm = document.getElementById('lostItemForm');
    const foundItemForm = document.getElementById('foundItemForm');
    const foundItemsList = document.getElementById('foundItemsList');
    const itemSearch = document.getElementById('itemSearch');
    const sortItems = document.getElementById('sortItems');
    const scrollToReportBtn = document.getElementById('scrollToReport');

    // Dummy data for demonstration purposes
    let foundItems = [
        { id: 1, name: "Blue Water Bottle", location: "Library Entrance", description: "Standard blue Hydro Flask, slight dent on bottom.", contact: "jane.doe@example.com", date: new Date('2025-05-19T10:00:00') },
        { id: 2, name: "Keys with Lanyard", location: "Cafeteria Table 3", description: "Keys with a red university lanyard and a small dog tag.", contact: "john.smith@example.com", date: new Date('2025-05-18T14:30:00') },
        { id: 3, name: "Black Backpack", location: "Gym Locker Room", description: "Nike backpack, small rip near the top zipper. Contains some textbooks.", contact: "alex.g@example.com", date: new Date('2025-05-20T09:00:00') },
        { id: 4, name: "Glasses (prescription)", location: "Lecture Hall 101", description: "Black framed prescription glasses, left arm slightly bent.", contact: "sara.k@example.com", date: new Date('2025-05-17T11:45:00') },
    ];

    // Function to render found items
    const renderFoundItems = (itemsToRender) => {
        foundItemsList.innerHTML = ''; // Clear previous items

        if (itemsToRender.length === 0) {
            foundItemsList.innerHTML = '<p>No items match your criteria.</p>';
            return;
        }

        itemsToRender.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('item-card');
            itemCard.innerHTML = `
                <h3>${item.name}</h3>
                <p><strong>Found At:</strong> ${item.location}</p>
                <p><strong>Description:</strong> ${item.description}</p>
                <p><strong>Date Found:</strong> ${item.date.toLocaleDateString()}</p>
                <p class="contact-info">Contact: ${item.contact}</p>
            `;
            foundItemsList.appendChild(itemCard);
        });
    };


    const initialSort = [...foundItems].sort((a, b) => b.date - a.date);
    renderFoundItems(initialSort);

    // Handle Lost Item Form Submission
    if (lostItemForm) {
        lostItemForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const itemName = document.getElementById('itemNameLost').value;
            const location = document.getElementById('locationLost').value;
            const description = document.getElementById('descriptionLost').value;
            const contact = document.getElementById('contactLost').value;

            // In a real application, you would send this data to a backend server.
            console.log('Lost Item Reported:', { itemName, location, description, contact });

            alert('Your lost item report has been submitted! We hope you find it soon.');
            lostItemForm.reset(); // Clear the form
        });
    }


    if (foundItemForm) {
        foundItemForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const itemName = document.getElementById('itemNameFound').value;
            const location = document.getElementById('locationFound').value;
            const description = document.getElementById('descriptionFound').value;
            const contact = document.getElementById('contactFound').value;

            const newItem = {
                id: foundItems.length + 1, // Simple ID generation
                name: itemName,
                location: location,
                description: description,
                contact: contact,
                date: new Date() // Current date/time
            };

            // In a real application, you would send this to a backend and then fetch updated list.
            foundItems.unshift(newItem); // Add new item to the beginning
            alert('Thank you for reporting a found item! It will now appear on the list.');
            foundItemForm.reset(); // Clear the form
            applyFiltersAndSort(); // Re-render with the new item and current filters/sort
        });
    }


    const applyFiltersAndSort = () => {
        let filteredItems = [...foundItems]; // Create a copy to manipulate

        const searchTerm = itemSearch.value.toLowerCase();
        if (searchTerm) {
            filteredItems = filteredItems.filter(item =>
                item.name.toLowerCase().includes(searchTerm) ||
                item.location.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm)
            );
        }

        const sortOrder = sortItems.value;
        if (sortOrder === 'newest') {
            filteredItems.sort((a, b) => b.date - a.date);
        } else if (sortOrder === 'oldest') {
            filteredItems.sort((a, b) => a.date - b.date);
        }

        renderFoundItems(filteredItems);
    };

    if (itemSearch) {
        itemSearch.addEventListener('input', applyFiltersAndSort);
    }
    if (sortItems) {
        sortItems.addEventListener('change', applyFiltersAndSort);
    }

    // Scroll to Report Section Button
    if (scrollToReportBtn) {
        scrollToReportBtn.addEventListener('click', () => {
            document.getElementById('report-lost').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Dummy Load More Functionality (for demonstration, won't actually load more without backend)
    const loadMoreFoundBtn = document.getElementById('loadMoreFound');
    if (loadMoreFoundBtn) {
        loadMoreFoundBtn.addEventListener('click', () => {
            alert('In a real application, more items would load from the server!');
            // You would typically make an API call here to fetch more items.
        });
    }
});