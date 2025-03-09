document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent form from refreshing
        

        // Collect form data
        const formData = {
            FullName: document.getElementById("full-name").value,
            Address: document.getElementById("address").value,
            City: document.getElementById("city").value,
            Landmark: document.getElementById("landmark").value,
            Colony: document.getElementById("colony").value,
            HouseNumber: document.getElementById("house-number").value,
            PhoneNumber: document.getElementById("phone-number").value,
            Email: document.getElementById("email").value,
            PreferredDateTime: document.getElementById("datetime").value,
            Service: document.getElementById("Service").value
        };

        // Airtable API details
        const AIRTABLE_API_KEY = "patCTkbLogShESO8n.f04223a160ea4d7c0564aefc158f3b447f0ea39959d43c5463d70af3d3aeec66"; // 🔹 Replace with your API Key
        const BASE_ID = "appyw0lonGfoGEJwK"; // 🔹 Replace with your Base ID
        const TABLE_NAME = "bookings";

        const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

        // Prepare data for Airtable
        const airtableData = {
            records: [
                {
                    fields: formData
                }
            ]
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${AIRTABLE_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(airtableData)
            });

            if (response.ok) {
                alert("Booking successfull our team will contact you shortly.");
                form.reset(); // Reset form after successful submission
            } else {
                const errorData = await response.json();
                console.error("Airtable Error:", errorData);
                alert("Error submitting data.");
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("Failed to connect to Airtable.");
        }
    });
});
