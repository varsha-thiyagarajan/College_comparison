let selected = [];
let allColleges = [];

fetch("https://college-comparison.onrender.com/colleges")
  .then(res => res.json())
  .then(data => {
    allColleges = data;
    showColleges(data);
  });

function showColleges(data, rank = null) {
  const container = document.getElementById("college-list");
  container.innerHTML = "";

  data.forEach((college, index) => {
    let category = "";

    if (rank && college.cutoff) {
      const cutoff = Object.values(college.cutoff)[0];

      if (rank <= cutoff * 0.5) category = "🟢 Safe";
      else if (rank <= cutoff) category = "🟡 Match";
      else category = "🔴 Dream";
    }

    const isSelected = selected.find(c => c.id === college.id);

    const div = document.createElement("div");
    div.className = "card";

    if (isSelected) {
      div.style.border = "2px solid green";
    }

    div.innerHTML = `
      <h3 onclick="viewCollege(${index})" style="cursor:pointer; color:#4f46e5;">
        ${college.name}
      </h3>

      ${college.rating > 4.6 ? "<p style='color:green'>🏆 Top College</p>" : ""}

      <p>Fees: ₹${college.fees}</p>
      <p>Location: ${college.location}</p>
      <p>Rating: ⭐ ${college.rating}</p>
      <p>${category}</p>

      <button onclick="selectCollege(${index})">
        ${isSelected ? "Deselect" : "Select"}
      </button>
    `;

    container.appendChild(div);
  });
}

function selectCollege(index) {
  const college = allColleges[index];

  const existsIndex = selected.findIndex(c => c.id === college.id);

  if (existsIndex !== -1) {
    selected.splice(existsIndex, 1);
  } else {
    if (selected.length < 3) {
      selected.push(college);
    } else {
      alert("Max 3 colleges");
      return;
    }
  }

  showColleges(allColleges);
}

function searchColleges() {
  const course = document.getElementById("course").value;
  const location = document.getElementById("location").value;
  const budget = document.getElementById("budget").value;
  const rank = document.getElementById("rank").value;

  let filtered = allColleges.filter(c => {
    return (
      (!course || c.courses?.includes(course)) &&
      (!location || c.location.toLowerCase().includes(location.toLowerCase())) &&
      (!budget || c.fees <= budget)
    );
  });

  showColleges(filtered, rank);
}

function compareColleges() {
  const container = document.getElementById("comparison");

  if (selected.length < 2) {
    alert("Select at least 2 colleges");
    return;
  }

  let table = `
    <table>
      <tr>
        <th>Feature</th>
        ${selected.map(c => `<th>${c.name}</th>`).join("")}
      </tr>

      <tr>
        <td>Fees</td>
        ${selected.map(c => `<td>₹${c.fees}</td>`).join("")}
      </tr>

      <tr>
        <td>Location</td>
        ${selected.map(c => `<td>${c.location}</td>`).join("")}
      </tr>

      <tr>
        <td>Rating</td>
        ${selected.map(c => `<td>${c.rating}</td>`).join("")}
      </tr>

      <tr>
        <td>Avg Placement</td>
        ${selected.map(c => `<td>₹${c.placements?.average || "N/A"}</td>`).join("")}
      </tr>

      <tr>
        <td>Highest Placement</td>
        ${selected.map(c => `<td>₹${c.placements?.highest || "N/A"}</td>`).join("")}
      </tr>

      <tr>
        <td>ROI</td>
        ${selected.map(c => `
          <td>
            ${
              c.placements?.average && c.fees
                ? (c.placements.average / c.fees).toFixed(2) + "x"
                : "N/A"
            }
          </td>
        `).join("")}
      </tr>
    </table>
  `;

  container.innerHTML = table;
}

function viewCollege(index) {
  const college = allColleges[index];
  const container = document.getElementById("college-list");

  document.querySelector(".search-box").style.display = "none";
  document.querySelector("h1").style.display = "none";
  document.getElementById("comparison").innerHTML = "";

  container.innerHTML = `
    <div class="profile-card">

      <h1>${college.name}</h1>
      <p>📍 ${college.location} | ⭐ ${college.rating}</p>

      <div class="section">
        <h2>💡 Quick Highlights</h2>
        <p>💰 Fees: ₹${college.fees}</p>
        <p>📈 Avg Package: ₹${college.placements?.average || "N/A"}</p>
        <p>🔥 ROI: ${
          college.placements?.average && college.fees
            ? (college.placements.average / college.fees).toFixed(2) + "x"
            : "N/A"
        }</p>
      </div>

      <div class="section">
        <h2>💰 Fees Breakdown</h2>
        <p>Tuition: ₹${college.feesBreakdown?.tuition || "N/A"}</p>
        <p>Hostel: ₹${college.feesBreakdown?.hostel || "N/A"}</p>
        <p>Other: ₹${college.feesBreakdown?.other || "N/A"}</p>
      </div>

      <div class="section">
        <h2>📊 Placements</h2>
        <p>Average: ₹${college.placements?.average || "N/A"}</p>
        <p>Highest: ₹${college.placements?.highest || "N/A"}</p>
        <p>Median: ₹${college.placements?.median || "N/A"}</p>
      </div>

      <div class="section">
        <h2>🏫 Infrastructure</h2>
        <p>${college.infrastructure || "N/A"}</p>
      </div>

      <div class="section">
        <h2>👨‍🏫 Faculty Quality</h2>
        <p>${college.facultyQuality || "N/A"}</p>
      </div>

      <div class="section">
        <h2>🏅 Accreditation</h2>
        <p>${college.accreditation?.join(", ") || "N/A"}</p>
      </div>

      <button onclick="goBack()">⬅ Back</button>
    </div>
  `;
}

function goBack() {
  showColleges(allColleges);
  document.querySelector(".search-box").style.display = "flex";
  document.querySelector("h1").style.display = "block";
}

function predictColleges() {
  const rank = document.getElementById("predict-rank").value;
  const container = document.getElementById("prediction-result");

  if (!rank) {
    alert("Enter rank");
    return;
  }

  let safe = [];
  let match = [];
  let dream = [];

  allColleges.forEach(college => {
    if (!college.cutoff) return;

    const cutoff = Object.values(college.cutoff)[0];

    if (rank <= cutoff * 0.5) safe.push(college);
    else if (rank <= cutoff) match.push(college);
    else dream.push(college);
  });

  container.innerHTML = `
    <h3>🟢 Safe Colleges</h3>
    ${safe.map(c => `<p>${c.name}</p>`).join("") || "None"}

    <h3>🟡 Match Colleges</h3>
    ${match.map(c => `<p>${c.name}</p>`).join("") || "None"}

    <h3>🔴 Dream Colleges</h3>
    ${dream.map(c => `<p>${c.name}</p>`).join("") || "None"}
  `;
}