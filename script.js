const nav = document.querySelector("nav");
const menu = document.querySelector(".menu");

if (menu && nav) {
  menu.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(isOpen));
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.querySelectorAll(".js-interest-cta").forEach((cta) => {
  cta.addEventListener("click", () => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "cta_click", {
        event_category: "engagement",
        event_label: "View real screenshots",
      });
    }
  });
});

const trackGaEvent = (name, params) => {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
};

document.querySelectorAll(".js-view-demo").forEach((link) => {
  link.addEventListener("click", () => {
    trackGaEvent("view_demo_click", {
      event_category: "engagement",
      event_label: "Live demo",
      link_url: link.getAttribute("href") || "",
    });
  });
});

document.querySelectorAll(".js-early-access").forEach((link) => {
  link.addEventListener("click", () => {
    trackGaEvent("early_access_open", {
      event_category: "conversion",
      event_label: "Request early access",
      link_url: link.getAttribute("href") || "",
    });
  });
});
