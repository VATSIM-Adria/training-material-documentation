window.addEventListener("DOMContentLoaded", () => {
  const toggleIcon = document.getElementById("color-toggle-icon");

  const updateIcon = () => {
    const isDark = document.documentElement.getAttribute("data-md-color-scheme") === "slate";
    toggleIcon.src = isDark ? "/assets/dark-mode.png" : "/assets/light-mode.png";
  };

  // Initial check
  updateIcon();

  // Watch for changes
  document.querySelector('[data-md-toggle="palette"]')?.addEventListener("click", () => {
    setTimeout(updateIcon, 150);  // delay allows the theme to apply
  });
});
