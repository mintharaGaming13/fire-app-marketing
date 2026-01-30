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
      window.gtag("event", "interest_list_click", {
        event_category: "engagement",
        event_label: "Join the interest list",
      });
    }
  });
});
