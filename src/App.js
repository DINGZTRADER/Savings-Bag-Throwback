import React, { useState } from "react";
import "./App.css";

const initialContributors = [
  { name: "Samuel Kiranda (HD Concepts)", payments: [{ amount: 20000, date: "2025-07-01", method: "MTN" }] },
  { name: "George Matovu", payments: [{ amount: 20000, date: "2025-07-01", method: "Airtel" }] },
  { name: "Herman Kasujja", payments: [{ amount: 20000, date: "2025-07-01", method: "MTN" }] },
  { name: "Bruce (Life Beach)", payments: [{ amount: 20000, date: "2025-07-01", method: "Airtel" }] },
  { name: "Paul Sents", payments: [{ amount: 21000, date: "2025-07-01", method: "MTN" }] },
  { name: "David Kayemba", payments: [{ amount: 20000, date: "2025-07-01", method: "Airtel" }] },
  { name: "Jimgo (Gaucho grill)", payments: [{ amount: 23000, date: "2025-07-01", method: "MTN" }] },
  { name: "Dj Kato (Twin dj)", payments: [{ amount: 20000, date: "2025-07-01", method: "Airtel" }] },
  { name: "Mr Mukwaya (Hanny B)", payments: [{ amount: 21000, date: "2025-07-01", method: "MTN" }] },
  { name: "Tendo Nicktah Musoke", payments: [{ amount: 22000, date: "2025-07-01", method: "Airtel" }] },
  { name: "Dj Alberto (Amsta)", payments: [{ amount: 20000, date: "2025-07-01", method: "MTN" }] },
  { name: "Jean Byanjeru (Mrs Dr. Patricko)", payments: [{ amount: 21000, date: "2025-07-01", method: "Airtel" }] },
  { name: "Edgar Mugenyi", payments: [{ amount: 20000, date: "2025-07-01", method: "MTN" }] },
  { name: "Mr Ojay Jonathan", payments: [{ amount: 20000, date: "2025-07-01", method: "Airtel" }] },
  { name: "Mr. Kaddu (scadd)", payments: [{ amount: 20000, date: "2025-07-01", method: "MTN" }] },
  { name: "Dj KK (Kisakye)", payments: [{ amount: 21000, date: "2025-07-01", method: "Airtel" }] },
  { name: "Mohammed Bagwell", payments: [{ amount: 20000, date: "2025-07-01", method: "MTN" }] },
  { name: "Cosby Leo", payments: [{ amount: 22000, date: "2025-07-01", method: "Airtel" }] },
  { name: "Peter Tumuhairwe", payments: [{ amount: 20000, date: "2025-07-01", method: "MTN" }] },
  { name: "Jude Ssempebwa (Legacy Events)", payments: [{ amount: 21000, date: "2025-07-01", method: "Airtel" }] },
  { name: "Dj Kask", payments: [{ amount: 22000, date: "2025-07-01", method: "MTN" }] },
  { name: "Lemi Paul", payments: [{ amount: 21000, date: "2025-07-01", method: "Airtel" }] },
  { name: "Charlie Ssentongo", payments: [{ amount: 20000, date: "2025-07-01", method: "MTN" }] },
  { name: "Peter Dings Wacha", payments: [{ amount: 25000, date: "2025-07-01", method: "Airtel" }] },
  { name: "Edgar Rukundo (Mr. Creme)", payments: [{ amount: 21000, date: "2025-07-01", method: "MTN" }] },
  { name: "Phillip Kiiza", payments: [{ amount: 20000, date: "2025-07-01", method: "Airtel" }] },
  { name: "Dj Bonny", payments: [{ amount: 20000, date: "2025-07-01", method: "MTN" }] },
  { name: "Rude Boy Devoh Bazanye", payments: [{ amount: 22000, date: "2025-07-01", method: "Airtel" }] },
  { name: "David K. Wasswa", payments: [{ amount: 22000, date: "2025-07-01", method: "MTN" }] },
  { name: "Richard Luggya Kibuuka", payments: [{ amount: 22000, date: "2025-07-01", method: "Airtel" }] },
  { name: "Joseph K (JAMBACK)", payments: [{ amount: 22000, date: "2025-07-01", method: "MTN" }] }
];

function App() {
  const [contributors] = useState(initialContributors);
  const [selectedMonth, setSelectedMonth] = useState("2025-07");
  const [searchTerm, setSearchTerm] = useState("");
  const [adminMode, setAdminMode] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const correctPassword = "admin2025";

  const fee = selectedMonth >= "2025-08" ? 500 : 0;
  const deadlineDay = 15;

  const filteredContributors = contributors.map((c) => {
    const filteredPayments = c.payments.filter((p) => p.date.startsWith(selectedMonth));
    return { ...c, payments: filteredPayments };
  }).filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const hasPaid = (c) => c.payments.length > 0;

  const overdueContributors = filteredContributors.filter(c => {
    const hasPaidThisMonth = c.payments.some(p => p.date.startsWith(selectedMonth));
    const today = new Date();
    const currentMonth = today.toISOString().slice(0, 7);
    const currentDay = today.getDate();
    return !hasPaidThisMonth && selectedMonth === currentMonth && currentDay > deadlineDay;
  });

  const total = filteredContributors.reduce((sum, c) => sum + c.payments.reduce((s, p) => s + p.amount, 0), 0);
  const totalFees = fee > 0
	? filteredContributors.reduce((count, c) => count + c.payments.length * fee, 0)
	: 0;
  const net = total - totalFees;

  const handleMTNPay = () => {
    window.location.href = "tel:*165*1*1#";
  };

  const handleAirtelPay = () => {
    window.location.href = "tel:*185*1*1#";
  };

  return (
    <div className="App" style={{ fontFamily: "Segoe UI, sans-serif", padding: "20px", background: "#f9f9fb", minHeight: "100vh" }}>
      <div style={{ background: "white", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h1 style={{ textAlign: "center", color: "#333" }}>Savings Bag Throwback 💰</h1>

        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
          <div>
            <label>📆 Month: </label>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              <option value="2025-07">July 2025</option>
              <option value="2025-08">August 2025</option>
              <option value="2025-09">September 2025</option>
			  <option value="2025-10">October 2025</option>
			  <option value="2025-11">November 2025</option>
			  <option value="2025-12">December 2025</option>
			  <option value="2026-01">January 2026</option>
			  <option value="2026-02">February 2026</option>
			  <option value="2026-03">March 2026</option>
			  <option value="2026-04">April 2026</option>
			  <option value="2026-05">May 2026</option>
			  <option value="2026-06">June 2026</option>
			  <option value="2026-07">July 2026</option>
			  <option value="2026-08">August 2026</option>
			  <option value="2026-09">September 2026</option>
			  <option value="2026-10">October 2026</option>
			  <option value="2026-11">November 2026</option>
			  <option value="2026-12">December 2026</option>
			  
            </select>
          </div>

          <div>
            <button style={{ background: "#FFCC00", padding: "6px 12px", border: "none", borderRadius: "8px" }} onClick={handleMTNPay}>MTN Pay</button>
            <button style={{ background: "#D90000", color: "white", padding: "6px 12px", border: "none", borderRadius: "8px", marginLeft: "5px" }} onClick={handleAirtelPay}>Airtel Pay</button>
          </div>

          <div>
            <label>
              Admin Mode:
              <input type="checkbox" checked={adminMode} onChange={() => {
                if (!adminAuthenticated) {
                  const input = prompt("Enter admin password:");
                  if (input === correctPassword) {
                    setAdminAuthenticated(true);
                    setAdminMode(true);
                  } else {
                    alert("Incorrect password");
                  }
                } else {
                  setAdminMode(!adminMode);
                }
              }} />
            </label>
          </div>
        </div>

        <h3>Total: UGX {total.toLocaleString()} | Net After Fees: UGX {net.toLocaleString()}</h3>

        <input
          type="text"
          placeholder="Search contributor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc" }}
        />

        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredContributors.map((c, idx) => (
            <li key={idx} style={{ marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fefefe", padding: "8px 12px", borderRadius: "6px", border: "1px solid #eee" }}>
              <span>{c.name}</span>
              <span>{hasPaid(c) ? "✅" : "❌"}</span>
            </li>
          ))}
        </ul>

        {overdueContributors.length > 0 && (
         <div className="scrolling-text" style={{ color: "red", marginTop: "20px", fontWeight: "bold" }}>
		   The following people should have their payments made by 15th {selectedMonth.split("-")[1]}/{selectedMonth.split("-")[0]}: {overdueContributors.map(c => c.name).join(", ")}.
		</div>
        )}
      </div>
    </div>
  );
}

export default App;
