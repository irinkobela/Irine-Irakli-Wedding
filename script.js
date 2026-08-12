// ============================================================
// IRINE & IRAKLI — WEDDING RSVP
// Paste your deployed Google Apps Script /exec URL below.
// ============================================================
const SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

const translations = {
  en: {
    navDetails:"Details", rsvpNav:"RSVP",
    invite:"WE WHOLEHEARTEDLY INVITE YOU TO CELEBRATE OUR WEDDING WITH US.",
    irine:"Irine", irakli:"Irakli", date:"29 SEPTEMBER 2026",
    days:"DAYS", hours:"HOURS", minutes:"MINUTES", seconds:"SECONDS",
    rsvpButton:"RSVP", ourDay:"OUR DAY", celebrate:"Celebrate With Us",
    ceremony:"CHURCH CEREMONY", monastery:"Samtavro Monastery, Mtskheta",
    reception:"RECEPTION", lisi:"Lisi Event Hall, Tbilisi", map:"VIEW ON MAP",
    calendar:"ADD TO CALENDAR", dress:"DRESS CODE", whiteBride:"White is reserved for the bride.",
    joining:"Will you be celebrating with us?",
    replyIntro:"Please let us know if you'll be joining us on our special day.",
    yes:"YES, WITH PLEASURE ♡", no:"UNFORTUNATELY, NO",
    nameLabel:"Your full name", namePlaceholder:"Name and surname",
    namesHint:"If replying for a couple or family, you can enter all names here.",
    confirm:"CONFIRM RSVP",
    thanksYes:"Thank you! ♡ Your RSVP has been received. We can't wait to celebrate with you!",
    thanksNo:"Thank you for letting us know. You will be missed. ♡",
    sending:"Sending…", error:"Something went wrong. Please try again.",
    metaTitle:"Irine & Irakli — 29 September 2026",
    metaDescription:"We wholeheartedly invite you to celebrate our wedding with us."
  },
  ka: {
    navDetails:"დეტალები", rsvpNav:"RSVP",
    invite:"დიდი სიყვარულითა და სიხარულით გეპატიჟებით ჩვენი ქორწილის აღსანიშნავად!",
    irine:"ირინე", irakli:"ირაკლი", date:"29 სექტემბერი 2026",
    days:"დღე", hours:"საათი", minutes:"წუთი", seconds:"წამი",
    rsvpButton:"დასწრების დადასტურება", ourDay:"ჩვენი დღე", celebrate:"გაიზიარეთ ჩვენი სიხარული",
    ceremony:"ჯვრისწერა", monastery:"სამთავროს მონასტერი, მცხეთა",
    reception:"წვეულება", lisi:"ლისი ივენთ ჰოლი, თბილისი", map:"რუკაზე ნახვა",
    calendar:"კალენდარში დამატება", dress:"დრეს კოდი", whiteBride:"თეთრი ფერი მხოლოდ პატარძლისთვის.",
    joining:"შემოგვიერთდებით?",
    replyIntro:"გთხოვთ, დაგვიდასტუროთ შეძლებთ თუ არა ჩვენს განსაკუთრებულ დღეს ჩვენთან ერთად ყოფნას.",
    yes:"დიახ, სიამოვნებით ♡", no:"სამწუხაროდ, ვერ მოვალ",
    nameLabel:"სახელი და გვარი", namePlaceholder:"სახელი და გვარი",
    namesHint:"თუ პასუხობთ წყვილის ან ოჯახის სახელით, შეგიძლიათ ყველა სახელი აქ ჩაწეროთ.",
    confirm:"დადასტურება",
    thanksYes:"გმადლობთ! ♡ თქვენი პასუხი მიღებულია. მოუთმენლად ველით თქვენთან ერთად აღნიშვნას!",
    thanksNo:"გმადლობთ, რომ შეგვატყობინეთ. დაგვაკლდებით. ♡",
    sending:"იგზავნება…", error:"დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ თავიდან.",
    metaTitle:"ირინე & ირაკლი — 29 სექტემბერი 2026",
    metaDescription:"დიდი სიყვარულითა და სიხარულით გეპატიჟებით ჩვენი ქორწილის აღსანიშნავად!"
  }
};

let language = "ka";
const langToggle = document.getElementById("langToggle");
const ogTitle = document.getElementById("ogTitle");
const ogDescription = document.getElementById("ogDescription");
const metaDescription = document.querySelector('meta[name="description"]');
const heroImage = document.getElementById("heroImage");

function setLanguage(lang){
  language = lang;
  document.documentElement.lang = lang;
  langToggle.textContent = lang === "en" ? "ქარ" : "ENG";
  if (heroImage) heroImage.src = `assets/invitation-${lang}.jpg`;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = translations[lang][key] || "";
  });

  document.title = translations[lang].metaTitle;
  if (ogTitle) ogTitle.setAttribute("content", translations[lang].metaTitle);
  if (ogDescription) ogDescription.setAttribute("content", translations[lang].metaDescription);
  if (metaDescription) metaDescription.setAttribute("content", translations[lang].metaDescription);
}

langToggle.addEventListener("click", () => setLanguage(language === "en" ? "ka" : "en"));

// Wedding countdown — Georgia time (UTC+4).
const weddingDate = new Date("2026-09-29T14:00:00+04:00");
function updateCountdown(){
  const diff = Math.max(0, weddingDate - new Date());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;
  document.getElementById("days").textContent = String(d).padStart(2,"0");
  document.getElementById("hours").textContent = String(h).padStart(2,"0");
  document.getElementById("minutes").textContent = String(m).padStart(2,"0");
  document.getElementById("seconds").textContent = String(s).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Gentle scroll reveal.
const revealSections = document.querySelectorAll(".paper-section");
revealSections.forEach(section => section.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealSections.forEach(section => observer.observe(section));
} else {
  revealSections.forEach(section => section.classList.add("visible"));
}

// Add-to-calendar (.ics) generator.
function formatICSDate(date){
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escapeICS(text){
  return text.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function downloadCalendarInvite(){
  // Full wedding-day calendar entry, from church ceremony through the reception start.
  const start = new Date("2026-09-29T14:00:00+04:00");
  const end = new Date("2026-09-29T23:30:00+04:00");
  const uid = "irine-irakli-20260929@wedding";
  const description = language === "ka"
    ? "ჯვრისწერა — სამთავროს მონასტერი, მცხეთა, 14:00. წვეულება — ლისი ივენთ ჰოლი, თბილისი, 17:00."
    : "Church ceremony — Samtavro Monastery, Mtskheta, 14:00. Reception — Lisi Event Hall, Tbilisi, 17:00.";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Irine & Irakli//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(start)}`,
    `DTEND:${formatICSDate(end)}`,
    `SUMMARY:${escapeICS(language === "ka" ? "ირინე & ირაკლი — ქორწილი" : "Irine & Irakli — Wedding")}`,
    `LOCATION:${escapeICS("Samtavro Monastery, Mtskheta / Lisi Event Hall, Tbilisi")}`,
    `DESCRIPTION:${escapeICS(description)}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "irine-irakli-wedding.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

document.getElementById("addToCalendar")?.addEventListener("click", downloadCalendarInvite);

// RSVP form.
const form = document.getElementById("rsvpForm");
const nameBlock = document.getElementById("nameBlock");
const guestName = document.getElementById("guestName");
const status = document.getElementById("formStatus");
const submit = document.getElementById("submitButton");

document.querySelectorAll('input[name="attending"]').forEach(r => r.addEventListener("change", () => {
  nameBlock.classList.remove("hidden");
  guestName.required = true;
  setTimeout(() => guestName.focus(), 100);
}));

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const attending = form.elements.attending.value;
  const name = guestName.value.trim();
  if (!attending || !name) return;

  if (SCRIPT_URL.includes("PASTE_YOUR")) {
    status.className = "form-status error";
    status.textContent = "Add your Google Apps Script URL in script.js first.";
    return;
  }

  submit.disabled = true;
  submit.textContent = translations[language].sending;
  status.textContent = "";

  try {
    // text/plain avoids a CORS preflight with Apps Script web apps.
    await fetch(SCRIPT_URL, {
      method:"POST",
      mode:"no-cors",
      headers:{"Content-Type":"text/plain;charset=utf-8"},
      body:JSON.stringify({name,attending})
    });
    status.className = "form-status success";
    status.textContent = attending === "YES" ? translations[language].thanksYes : translations[language].thanksNo;
    form.querySelectorAll("input").forEach(i => i.disabled = true);
    submit.style.display = "none";
  } catch (err) {
    status.className = "form-status error";
    status.textContent = translations[language].error;
    submit.disabled = false;
    submit.textContent = translations[language].confirm;
  }
});
