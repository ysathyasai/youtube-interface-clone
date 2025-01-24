document.addEventListener("DOMContentLoaded", () => {
  // Get references to sidebar navigation buttons
  const homeBtn = document.getElementById("home");
  const exploreBtn = document.getElementById("explore");
  const subscriptionsBtn = document.getElementById("subscriptions");
  const libraryBtn = document.getElementById("library");
  const historyBtn = document.getElementById("history");
  const settingsBtn = document.getElementById("settings");

  // Get reference to main content area where content will be updated
  const mainContent = document.getElementById("content");

  // Get reference to menu button for toggling sidebar
  const menuBtn = document.getElementById("menu-btn");

  // Get reference to sidebar
  const sidebar = document.getElementById("sidebar");

  // Function to update the main content area
  const updateContent = (content) => {
    mainContent.innerHTML = content;
  };

  // Function to set the active navigation button
  const setActive = (activeBtn) => {
    // Remove 'active' class from all sidebar buttons
    document.querySelectorAll(".sidebar ul li").forEach(btn => {
      btn.classList.remove("active");
    });
    // Add 'active' class to the clicked button
    activeBtn.classList.add("active");
  };

  // Event listeners for sidebar navigation buttons
  homeBtn.addEventListener("click", () => {
    setActive(homeBtn);
    updateContent(`<h2>Home</h2><p>Welcome to Home!</p>`);
  });

  exploreBtn.addEventListener("click", () => {
    setActive(exploreBtn);
    updateContent(`<h2>Explore</h2><p>Trending and new content!</p>`);
  });

  subscriptionsBtn.addEventListener("click", () => {
    setActive(subscriptionsBtn);
    updateContent(`<h2>Subscriptions</h2><p>Latest videos from channels you follow!</p>`);
  });

  libraryBtn.addEventListener("click", () => {
    setActive(libraryBtn);
    updateContent(`<h2>Library</h2><p>Your saved videos and playlists.</p>`);
  });

  historyBtn.addEventListener("click", () => {
    setActive(historyBtn);
    updateContent(`<h2>History</h2><p>Watch history.</p>`);
  });

  // Event listener for menu button to toggle sidebar
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // Modal handling
  const modal = document.getElementById("settings-modal");
  const closeModal = document.getElementsByClassName("close")[0];

  // Event listener for settings button to open modal
  settingsBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Event listener for close button to close modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Event listener to close modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  // Function to handle menu option click events
  const handleMenuOptionClick = (action) => {
    switch (action) {
      case "watch-later":
        alert("Video saved to Watch Later!");
        break;
      case "playlist":
        alert("Video saved to Playlist!");
        break;
      case "download":
        alert("Video download started!");
        break;
      case "report":
        alert("Video reported!");
        break;
      default:
        console.log("Unknown action");
    }
  };

  // Event listener for menu dots to toggle dropdown menu
  document.querySelectorAll(".menu-dots").forEach(menuDot => {
    menuDot.addEventListener("click", (event) => {
      const menuId = event.target.getAttribute("data-menu-id");
      const dropdownMenu = document.getElementById(menuId);
      dropdownMenu.classList.toggle("show");
    });
  });

  // Event listener for menu options
  document.querySelectorAll(".menu-option").forEach(option => {
    option.addEventListener("click", (event) => {
      const action = event.target.getAttribute("data-action");
      handleMenuOptionClick(action);
    });
  });
});