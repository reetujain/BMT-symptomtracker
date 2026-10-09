/* =====================================================================
   SETTINGS YOU (THE DOCTOR) CAN CHANGE
   ---------------------------------------------------------------------
   - Change the text inside the quotes " " only.
   - Triage level for each symptom:
       "red"   = Call the BMT team NOW and come to hospital
       "amber" = Call the BMT team TODAY
       "green" = Watch at home, tell the team at the next visit
   ===================================================================== */

const HOSPITAL_NAME = "Bone Marrow Transplant Unit";

// Numbers filled in automatically on the setup screen (patient can change them).
const DEFAULT_TEAM_PHONE = "";
const DEFAULT_TEAM_WHATSAPP = "";
const DEFAULT_EMERGENCY_PHONE = "112";

// Temperature limits (in °C). Fahrenheit is converted automatically.
const FEVER_C = 38.0;        // at or above this = RED
const LOW_GRADE_C = 37.5;    // 37.5 to 37.9 = AMBER
const LOW_TEMP_C = 36.0;     // below this = AMBER (RED if also feeling very unwell)

const QUESTIONS = [
  {
    title: "2. Infection signs",
    items: [
      { id: "chills", level: "red", text: "Shivering or shaking chills", hint: "Especially soon after your line (catheter) is flushed" },
      { id: "veryUnwell", level: "red", text: "I feel very unwell or very weak", hint: "For example, too weak to get out of bed" },
      { id: "lineSite", level: "amber", text: "My line (catheter) area is red, swollen, painful or has pus" },
      { id: "cough", level: "amber", text: "New cough, cold, runny nose or sore throat" },
      { id: "urineBurn", level: "amber", text: "Burning or pain when passing urine" },
      { id: "blisters", level: "amber", text: "Painful blisters or rash in a strip on one side of the body", hint: "This may be shingles" },
      { id: "contact", level: "amber", text: "I was near someone with chickenpox, measles, flu or COVID" }
    ]
  },
  {
    title: "3. Breathing and chest",
    items: [
      { id: "breath", level: "red", text: "Difficulty breathing or short of breath while resting" },
      { id: "chestPain", level: "red", text: "Chest pain or chest tightness" },
      { id: "heartRace", level: "amber", text: "My heart is beating very fast or irregularly" }
    ]
  },
  {
    title: "4. Head and brain",
    items: [
      { id: "confused", level: "red", text: "Confused, very sleepy or hard to wake up", hint: "A family member may notice this first" },
      { id: "seizure", level: "red", text: "A fit (seizure)" },
      { id: "headache", level: "red", text: "Very bad headache or sudden change in eyesight" },
      { id: "faint", level: "red", text: "Fainted or nearly fainted" },
      { id: "tremor", level: "amber", text: "New shaking of the hands" }
    ]
  },
  {
    title: "5. Bleeding",
    items: [
      { id: "bleedNoStop", level: "red", text: "Bleeding that does not stop after 10 minutes of pressing" },
      { id: "bloodVomitStool", level: "red", text: "Blood in vomit, blood in stool, or black sticky stool" },
      { id: "urineClots", level: "red", text: "Blood clots in urine, or I cannot pass urine" },
      { id: "bloodUrine", level: "amber", text: "Blood in urine (red or pink urine)" },
      { id: "bruises", level: "amber", text: "New bruises or tiny red dots on the skin" },
      { id: "nosebleed", level: "amber", text: "Nose or gum bleeding that stopped by itself" }
    ]
  },
  {
    title: "6. Stomach, eating and toilet",
    items: [
      {
        id: "diarrhoea", type: "choice",
        text: "How many times did you have loose or watery stools in the last 24 hours?",
        options: [
          { value: "0", label: "None", level: "none" },
          { value: "1-3", label: "1 to 3 times", level: "amber" },
          { value: "4-6", label: "4 to 6 times", level: "amber" },
          { value: "7+", label: "7 or more times", level: "red" }
        ]
      },
      { id: "vomitMeds", level: "red", text: "Vomiting – I cannot keep down water, food or my medicines" },
      { id: "nausea", level: "amber", text: "Feeling sick or vomiting, but I can still drink and take medicines" },
      { id: "severePain", level: "red", text: "Severe stomach pain" },
      { id: "mildPain", level: "amber", text: "Mild or moderate stomach pain or cramps" },
      { id: "noEat", level: "amber", text: "I am eating or drinking much less than normal" },
      { id: "jaundice", level: "amber", text: "Yellow eyes or yellow skin" },
      { id: "swelling", level: "amber", text: "Swollen tummy or legs, or quick weight gain (2 kg or more in a few days)" },
      { id: "lessUrine", level: "amber", text: "Passing much less urine than normal" }
    ]
  },
  {
    title: "7. Skin, mouth and eyes",
    items: [
      { id: "rashBig", level: "red", text: "Rash over a large part of the body, or skin blistering or peeling" },
      { id: "rashNew", level: "amber", text: "New rash or itching", hint: "Often starts on palms, soles, face or ears" },
      { id: "mouthSores", level: "amber", text: "Mouth sores so painful I cannot eat or drink" },
      { id: "dryEyes", level: "green", text: "Dry, gritty or painful eyes, or a dry mouth" }
    ]
  },
  {
    title: "8. Medicines",
    items: [
      { id: "missedDose", level: "amber", text: "I missed a dose of my anti-rejection medicine", hint: "For example tacrolimus or cyclosporine" },
      { id: "outOfMeds", level: "amber", text: "I have run out of, or will soon run out of, a medicine" }
    ]
  },
  {
    title: "9. General",
    items: [
      { id: "tired", level: "green", text: "More tired than usual" },
      { id: "mood", level: "green", text: "Feeling low, worried or not sleeping well" }
    ]
  }
];

const ADVICE = {
  red: {
    label: "RED – URGENT",
    title: "Call the BMT team NOW and come to the hospital.",
    text:
      "<ul>" +
      "<li>Do not wait to see if it gets better.</li>" +
      "<li>If you cannot reach the team, go to the nearest Emergency Department and tell them you had a bone marrow transplant.</li>" +
      "<li>If you are very breathless, confused or have fainted, call an ambulance.</li>" +
      "<li>Do not take paracetamol or fever medicine before you speak to the team, unless they told you to.</li>" +
      "<li>Bring all your medicines and this report with you.</li>" +
      "</ul>"
  },
  amber: {
    label: "AMBER – CALL TODAY",
    title: "Call the BMT team today, within the next few hours.",
    text:
      "<ul>" +
      "<li>The team will tell you if you need to come to the hospital.</li>" +
      "<li>Keep taking your medicines as usual unless the team tells you otherwise.</li>" +
      "<li>Check your temperature again in 1 hour.</li>" +
      "<li>If you get worse, or get any RED sign, call at once.</li>" +
      "</ul>"
  },
  green: {
    label: "GREEN – OK TODAY",
    title: "No warning signs today.",
    text:
      "<ul>" +
      "<li>Keep taking your medicines on time.</li>" +
      "<li>Check your temperature twice a day.</li>" +
      "<li>Do this check again tomorrow, or sooner if you feel different.</li>" +
      "<li>Tell the team about any small problems at your next clinic visit.</li>" +
      "</ul>"
  }
};

/* =====================================================================
   APP CODE – no need to change below this line
   ===================================================================== */

const STORE_PROFILE = "bmt_profile";
const STORE_REPORTS = "bmt_reports";
const LEVEL_RANK = { none: 0, green: 1, amber: 2, red: 3 };

let lastReport = null;

const $ = (id) => document.getElementById(id);

function getProfile() {
  try { return JSON.parse(localStorage.getItem(STORE_PROFILE)); } catch (e) { return null; }
}
function getReports() {
  try { return JSON.parse(localStorage.getItem(STORE_REPORTS)) || []; } catch (e) { return []; }
}
function saveReports(list) {
  localStorage.setItem(STORE_REPORTS, JSON.stringify(list));
}

function showScreen(name) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.add("hidden"));
  $("screen-" + name).classList.remove("hidden");
  window.scrollTo(0, 0);

  if (name === "home") renderHome();
  if (name === "check") resetCheckForm();
  if (name === "history") renderHistory();
  if (name === "setup") fillSetupForm();
}

function daysSinceTransplant(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  const day0 = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((today - day0) / 86400000);
}

function dayLabel(n) {
  if (n === null) return "";
  return n >= 0 ? "Day +" + n : "Day " + n;
}

function cleanPhone(p) {
  return (p || "").replace(/[^\d+]/g, "");
}

function updateCallLinks() {
  const p = getProfile();
  const tel = p ? cleanPhone(p.teamPhone) : "";
  [$("topCallBtn"), $("homeCallBtn")].forEach((a) => {
    a.href = tel ? "tel:" + tel : "#";
  });
}

function feverText(unit) {
  return unit === "F" ? toF(FEVER_C).toFixed(1) + " °F" : FEVER_C.toFixed(1) + " °C";
}
function toF(c) { return c * 9 / 5 + 32; }
function toC(f) { return (f - 32) * 5 / 9; }

/* ---------- Setup ---------- */
function fillSetupForm() {
  const p = getProfile() || {};
  $("patientName").value = p.name || "";
  $("transplantDate").value = p.transplantDate || "";
  $("teamPhone").value = p.teamPhone || DEFAULT_TEAM_PHONE;
  $("teamWhatsapp").value = p.teamWhatsapp || DEFAULT_TEAM_WHATSAPP;
  $("emergencyPhone").value = p.emergencyPhone || DEFAULT_EMERGENCY_PHONE;
  $("tempUnit").value = p.tempUnit || "C";
}

$("setupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const profile = {
    name: $("patientName").value.trim(),
    transplantDate: $("transplantDate").value,
    teamPhone: $("teamPhone").value.trim(),
    teamWhatsapp: $("teamWhatsapp").value.trim(),
    emergencyPhone: $("emergencyPhone").value.trim(),
    tempUnit: $("tempUnit").value
  };
  localStorage.setItem(STORE_PROFILE, JSON.stringify(profile));
  updateCallLinks();
  showScreen("home");
});

/* ---------- Home ---------- */
function renderHome() {
  const p = getProfile();
  const n = daysSinceTransplant(p.transplantDate);
  $("helloText").textContent = "Hello, " + (p.name || "");
  $("dayNumber").textContent = dayLabel(n);
  if (n !== null && n > 100) {
    $("dayNote").textContent = "after your transplant. You have passed Day +100 – keep following your team's advice.";
  } else if (n !== null && n >= 0) {
    $("dayNote").textContent = "after your transplant (" + (100 - n) + " days to Day +100)";
  } else {
    $("dayNote").textContent = "before your transplant";
  }
  document.querySelectorAll(".fever-text").forEach((el) => (el.textContent = feverText(p.tempUnit)));
}

/* ---------- Symptom check ---------- */
function buildQuestions() {
  const area = $("questionArea");
  area.innerHTML = "";
  QUESTIONS.forEach((group) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = "<h2>" + group.title + "</h2>";

    group.items.forEach((q) => {
      if (q.type === "choice") {
        const wrap = document.createElement("div");
        wrap.innerHTML = "<label>" + q.text + "</label>";
        q.options.forEach((opt, i) => {
          const line = document.createElement("label");
          line.className = "check-line";
          line.innerHTML =
            '<input type="radio" name="' + q.id + '" value="' + opt.value + '"' + (i === 0 ? " checked" : "") + ">" +
            "<span>" + opt.label + "</span>";
          wrap.appendChild(line);
        });
        card.appendChild(wrap);
      } else {
        const line = document.createElement("label");
        line.className = "check-line";
        line.innerHTML =
          '<input type="checkbox" name="' + q.id + '">' +
          "<span>" + q.text + (q.hint ? '<span class="check-hint">' + q.hint + "</span>" : "") + "</span>";
        card.appendChild(line);
      }
    });
    area.appendChild(card);
  });
}

function resetCheckForm() {
  $("checkForm").reset();
  const unit = getProfile().tempUnit;
  $("tempUnitLabel").textContent = unit === "F" ? "°F" : "°C";
  $("tempValue").placeholder = unit === "F" ? "98.6" : "37.0";
  $("tempValue").disabled = false;
}

$("noThermometer").addEventListener("change", (e) => {
  $("tempValue").disabled = e.target.checked;
  if (e.target.checked) $("tempValue").value = "";
});

$("checkForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const profile = getProfile();
  const unit = profile.tempUnit;
  const findings = [];

  // Temperature
  const raw = $("tempValue").value;
  const noThermo = $("noThermometer").checked;
  let tempText = "Not measured";
  if (!noThermo && raw === "") {
    alert("Please write your temperature, or tick the box if you could not measure it.");
    $("tempValue").focus();
    return;
  }
  if (!noThermo && raw !== "") {
    const t = parseFloat(raw);
    const tC = unit === "F" ? toC(t) : t;
    if (tC < 30 || tC > 45) {
      alert("This temperature looks wrong. Please check the number again.");
      $("tempValue").focus();
      return;
    }
    tempText = t.toFixed(1) + (unit === "F" ? " °F" : " °C");
    if (tC >= FEVER_C) findings.push({ level: "red", text: "Fever: " + tempText });
    else if (tC >= LOW_GRADE_C) findings.push({ level: "amber", text: "Slightly high temperature: " + tempText });
    else if (tC < LOW_TEMP_C) {
      const veryUnwell = document.querySelector('input[name="veryUnwell"]').checked;
      findings.push({ level: veryUnwell ? "red" : "amber", text: "Low temperature: " + tempText });
    }
  }

  // Symptoms
  QUESTIONS.forEach((group) => {
    group.items.forEach((q) => {
      if (q.type === "choice") {
        const picked = document.querySelector('input[name="' + q.id + '"]:checked');
        const opt = q.options.find((o) => o.value === (picked && picked.value));
        if (opt && opt.level !== "none") {
          findings.push({ level: opt.level, text: "Loose stools: " + opt.label + " in 24 hours" });
        }
      } else if (document.querySelector('input[name="' + q.id + '"]').checked) {
        findings.push({ level: q.level, text: q.text });
      }
    });
  });

  let level = "green";
  findings.forEach((f) => {
    if (LEVEL_RANK[f.level] > LEVEL_RANK[level]) level = f.level;
  });
  findings.sort((a, b) => LEVEL_RANK[b.level] - LEVEL_RANK[a.level]);

  const report = {
    date: new Date().toISOString(),
    day: daysSinceTransplant(profile.transplantDate),
    temp: tempText,
    level: level,
    findings: findings,
    notes: $("notes").value.trim()
  };

  const reports = getReports();
  reports.unshift(report);
  saveReports(reports);

  lastReport = report;
  renderResult(report);
  showScreen("result");
});

/* ---------- Result ---------- */
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) +
    ", " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function reportAsText(r) {
  const p = getProfile();
  let lines = [
    "BMT symptom report",
    "Name: " + p.name,
    dayLabel(r.day) + " after transplant",
    "Date: " + formatDate(r.date),
    "Result: " + ADVICE[r.level].label,
    "Temperature: " + r.temp,
    "Symptoms:"
  ];
  if (r.findings.length === 0) lines.push("- No symptoms ticked");
  r.findings.forEach((f) => lines.push("- " + f.text + " [" + f.level.toUpperCase() + "]"));
  if (r.notes) lines.push("Notes: " + r.notes);
  return lines.join("\n");
}

function renderResult(r) {
  const p = getProfile();
  const a = ADVICE[r.level];
  $("resultCard").className = "result-card " + r.level;
  $("resultLabel").textContent = a.label;
  $("resultTitle").textContent = a.title;
  $("resultText").innerHTML = a.text;

  const tel = cleanPhone(p.teamPhone);
  const emerg = cleanPhone(p.emergencyPhone);
  let actions = "";
  if (r.level === "red") {
    actions += '<a class="btn btn-red btn-big" href="tel:' + tel + '">Call BMT Team Now</a>';
    if (emerg) actions += '<a class="btn btn-light" href="tel:' + emerg + '">Call Ambulance (' + p.emergencyPhone + ")</a>";
  } else if (r.level === "amber") {
    actions += '<a class="btn btn-amber btn-big" href="tel:' + tel + '">Call BMT Team</a>';
  }
  $("resultActions").innerHTML = actions;

  const list = $("resultList");
  list.innerHTML = "";
  const tempLi = document.createElement("li");
  tempLi.textContent = "Temperature: " + r.temp;
  list.appendChild(tempLi);
  if (r.findings.length === 0) {
    const li = document.createElement("li");
    li.className = "green";
    li.textContent = "No symptoms ticked";
    list.appendChild(li);
  }
  r.findings.forEach((f) => {
    const li = document.createElement("li");
    li.className = f.level;
    li.textContent = f.text;
    list.appendChild(li);
  });

  const text = reportAsText(r);
  $("reportText").textContent = text;
  $("smsBtn").href = "sms:" + tel + "?&body=" + encodeURIComponent(text);

  const wa = cleanPhone(p.teamWhatsapp).replace("+", "");
  if (wa) {
    $("whatsappBtn").href = "https://wa.me/" + wa + "?text=" + encodeURIComponent(text);
    $("whatsappBtn").classList.remove("hidden");
  } else {
    $("whatsappBtn").classList.add("hidden");
  }
}

$("copyBtn").addEventListener("click", () => {
  const text = $("reportText").textContent;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(
      () => alert("Report copied. You can now paste it in a message."),
      () => alert("Could not copy. Please select the text and copy it by hand.")
    );
  } else {
    alert("Could not copy. Please select the text and copy it by hand.");
  }
});

/* ---------- History ---------- */
function renderHistory() {
  const reports = getReports();
  const box = $("historyList");
  box.innerHTML = "";
  if (reports.length === 0) {
    box.innerHTML = '<div class="card">No reports yet.</div>';
    return;
  }
  reports.forEach((r) => {
    const card = document.createElement("div");
    card.className = "card history-item " + r.level;
    let html =
      '<div class="history-head"><span>' + dayLabel(r.day) + " – " + formatDate(r.date) + "</span>" +
      '<span class="badge ' + r.level + '">' + r.level.toUpperCase() + "</span></div>" +
      "<ul><li>Temperature: " + r.temp + "</li>";
    if (r.findings.length === 0) html += "<li>No symptoms</li>";
    r.findings.forEach((f) => { html += "<li>" + escapeHtml(f.text) + "</li>"; });
    if (r.notes) html += "<li>Notes: " + escapeHtml(r.notes) + "</li>";
    html += "</ul>";
    card.innerHTML = html;
    box.appendChild(card);
  });
}

function escapeHtml(s) {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

$("printBtn").addEventListener("click", () => window.print());
$("clearBtn").addEventListener("click", () => {
  if (confirm("Delete all your saved reports from this device? This cannot be undone.")) {
    saveReports([]);
    renderHistory();
  }
});

/* ---------- Navigation ---------- */
document.querySelectorAll("[data-go]").forEach((btn) => {
  btn.addEventListener("click", () => showScreen(btn.dataset.go));
});

[$("topCallBtn"), $("homeCallBtn")].forEach((a) => {
  a.addEventListener("click", (e) => {
    if (a.getAttribute("href") === "#") {
      e.preventDefault();
      alert("Please add the BMT team phone number first (Change my details).");
    }
  });
});

/* ---------- Start ---------- */
$("hospitalName").textContent = HOSPITAL_NAME;
buildQuestions();
updateCallLinks();
showScreen(getProfile() ? "home" : "setup");
