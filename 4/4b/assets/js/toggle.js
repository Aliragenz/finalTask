function toggleHamburger() {
    const hamburger = document.querySelector(".hamburger-container");
  
    hamburger.classList.toggle("hide");
  }

  function checkWindowSize() {
    const hamburger = document.querySelector(".hamburger-container");
    if (window.innerWidth > 600) {
        hamburger.classList.add("hide");
    }
}

// Initial check when the page loads
checkWindowSize();

// Listen for resize events
window.addEventListener('resize', checkWindowSize);