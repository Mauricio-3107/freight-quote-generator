function calculateQuote() {
  const origin = document.getElementById("origin").value.trim();
  const destination = document.getElementById("destination").value.trim();
  const cargoType = document.getElementById("cargoType").value;
  const weight = parseFloat(document.getElementById("weight").value);

  if (!origin || !destination || !cargoType || isNaN(weight) || weight <= 0) {
    alert("Please fill out all fields with valid data.");
    return;
  }

  const baseRate = 1.5; // Bs per kg
  const distanceFactor = origin !== destination ? 1.3 : 1;
  const cargoMultiplier = cargoType === "container" ? 1.5 : 1;

  const cost = weight * baseRate * distanceFactor * cargoMultiplier;

  document.getElementById("result").textContent = `Estimated Freight Cost: Bs ${cost.toFixed(2)}`;
}

async function downloadPDF() {
  const { jsPDF } = window.jspdf;

  const origin = document.getElementById("origin").value.trim();
  const destination = document.getElementById("destination").value.trim();
  const cargoType = document.getElementById("cargoType").value;
  const weight = document.getElementById("weight").value;
  const quote = document.getElementById("result").textContent;

  if (!origin || !destination || !cargoType || !weight || !quote) {
    alert("Please calculate a quote first.");
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Freight Quote Summary", 20, 20);
  doc.setFontSize(12);
  doc.text(`Origin: ${origin}`, 20, 40);
  doc.text(`Destination: ${destination}`, 20, 50);
  doc.text(`Cargo Type: ${cargoType}`, 20, 60);
  doc.text(`Weight: ${weight} kg`, 20, 70);
  doc.text(quote, 20, 90);

  doc.save("freight-quote.pdf");
}

function sendWhatsApp() {
  const origin = document.getElementById("origin").value.trim();
  const destination = document.getElementById("destination").value.trim();
  const cargoType = document.getElementById("cargoType").value;
  const weight = document.getElementById("weight").value;
  const quote = document.getElementById("result").textContent;

  if (!origin || !destination || !cargoType || !weight || !quote) {
    alert("Please calculate a quote first.");
    return;
  }

  const message = `
🧾 *Freight Quote Summary*:
- Origin: ${origin}
- Destination: ${destination}
- Cargo Type: ${cargoType}
- Weight: ${weight} kg
- ${quote}
  `.trim();

  const encodedMessage = encodeURIComponent(message);
  const phone = "59175181154"; // your number, no + or spaces
  const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;


  window.open(whatsappURL, "_blank");
}
