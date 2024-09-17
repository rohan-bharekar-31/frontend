const translations = {
  en: {
    title: "Water Footprint Calculator",
    placeholder: "Enter product name",
    availableProductsTitle: "Available Products:",
    searchButton: "Search"
  },
  hi: {
    title: "जल पदचिन्ह कैलकुलेटर",
    placeholder: "उत्पाद का नाम दर्ज करें",
    availableProductsTitle: "उपलब्ध उत्पाद:",
    searchButton: "खोज"
  },
  ta: {
    title: "தண்ணீர் தடம் கணக்கீட்டாளர்",
    placeholder: "பொருள் பெயரை உள்ளிடவும்",
    availableProductsTitle: "கிடைக்கக்கூடிய தயாரிப்புகள்:",
    searchButton: "தேடல்"
  }
  // Add more languages here
};
function displayChart() {
  fetch('https://backend-i94k.onrender.com/api/products')


    .then(response => response.json())
    .then(data => {
      const productNames = data.map(product => product.name);
      const waterFootprints = data.map(product => product.water_footprint);

      const ctx = document.getElementById('productChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: productNames,
          datasets: [{
            label: 'Water Footprint (liters/kg)',
            data: waterFootprints,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    .catch(err => console.error('Error:', err));
}

function changeLanguage() {
  const selectedLanguage = document.getElementById("languageSelect").value;
  
  // Change the content based on the selected language
  document.querySelector('h1').innerText = translations[selectedLanguage].title;
  document.getElementById('productInput').placeholder = translations[selectedLanguage].placeholder;
  document.querySelector('h3').innerText = translations[selectedLanguage].availableProductsTitle;
  document.querySelector('button').innerText = translations[selectedLanguage].searchButton;
}

function searchProduct() {
  const productName = document.getElementById('productInput').value;

  fetch(`https://backend-i94k.onrender.com/api/products/${productName}`)
    .then(response => response.json())
    .then(data => {
      const resultDiv = document.getElementById('result');
      if (data.message) {
        resultDiv.innerHTML = `<p>Product not found</p>`;
      } else {
        resultDiv.innerHTML = `<p>Product: ${data.name} <br> Water Footprint: ${data.water_footprint} ${data.unit}</p>`;
      }
    })
    .catch(err => console.error('Error:', err));
}
