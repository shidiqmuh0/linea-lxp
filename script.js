function checkPoints() {
    var walletAddressesInput = document.getElementById("walletAddresses").value;

    // Pastikan input tidak kosong
    if (walletAddressesInput.trim() === "") {
        alert("Please enter one or more wallet addresses separated by line breaks.");
        return;
    }

    var walletAddresses = walletAddressesInput.split(/\r?\n/);

    // Bersihkan hasil sebelum menampilkan yang baru
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    walletAddresses.forEach(address => {
        // Buat request ke API untuk setiap alamat
        var apiUrl = "https://kx58j6x5me.execute-api.us-east-1.amazonaws.com/starknet/getUserPointsSearch?user=" + address;
        fetch(apiUrl, {
            method: "GET",
            mode: "cors",
            credentials: "omit",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            referrer: "https://www.openblocklabs.com/",
            referrerPolicy: "strict-origin-when-cross-origin",
        })
        .then(response => {
            // Periksa apakah respons sukses (kode status 200)
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            // Parse respons JSON
            return response.json();
        })
        .then(data => {
            // Ambil data Linea Point dari response
            var pointsData = data.Items[0];

            // Tampilkan hasil
            var addressResult = document.createElement("div");
            addressResult.innerHTML = `
                <h2>Points for Wallet Address: ${pointsData.user_address}</h2>
                <p>Rank XP: ${pointsData.rank_xp}</p>
                <p>XP: ${pointsData.xp}</p>
                <p>ALP: ${pointsData.alp}</p>
                <p>PLP: ${pointsData.plp}</p>
                <p>EP: ${pointsData.ep}</p>
                <p>RP: ${pointsData.rp}</p>
                <p>VP: ${pointsData.vp}</p>
                <p>EA Flag: ${pointsData.ea_flag}</p>
            `;
            resultDiv.appendChild(addressResult);
        })
        .catch(error => {
            // Tangani kesalahan
            console.error("There was a problem with the fetch operation:", error);
            alert("An error occurred while fetching data. Please try again later.");
        });
    });
}
