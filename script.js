document.addEventListener("DOMContentLoaded", () => {
  // Get references to navigation buttons
  const homeBtn = document.getElementById("home");
  const trendingBtn = document.getElementById("trending");
  const subscriptionsBtn = document.getElementById("subscriptions");
  const libraryBtn = document.getElementById("library");
  const historyBtn = document.getElementById("history");
  const settingsBtn = document.getElementById("settings");
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");

  // Get references to main content and sidebar
  const mainContent = document.getElementById("content");
  const menuBtn = document.getElementById("menu-btn");
  const sidebar = document.getElementById("sidebar");

  // Get references to tab content sections
  const homeContent = document.getElementById("home-content");
  const trendingContent = document.getElementById("trending-content");
  const subscriptionsContent = document.getElementById("subscriptions-content");
  const libraryContent = document.getElementById("library-content");
  const historyContent = document.getElementById("history-content");

  // Map tab ids to their corresponding content elements
  const tabContents = {
    home: homeContent,
    trending: trendingContent,
    subscriptions: subscriptionsContent,
    library: libraryContent,
    history: historyContent
  };

  // YouTube API key
  const apiKey = "USE_YOUR_API_KEY";

  // Function to fetch YouTube videos and display them
  const fetchYouTubeVideos = (url, contentElement) => {
    fetch(url)
      .then(response => response.json())
      .then(data => displayVideos(data.items, contentElement))
      .catch(error => console.error('Error fetching YouTube videos:', error));
  };

  // Function to display videos in the content element
  const displayVideos = (videos, contentElement) => {
    const videoGrid = document.createElement('div');
    videoGrid.classList.add('video-grid');
    contentElement.innerHTML = '';

    // Loop through videos and create video cards
    videos.forEach(video => {
      const videoCard = document.createElement('div');
      videoCard.classList.add('video-card');

      const videoLink = `https://www.youtube.com/watch?v=${video.id.videoId}`;
      videoCard.innerHTML = `
        <a href="${videoLink}" target="_blank">
          <div class="video-thumbnail">
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}" />
          </div>
          <div class="video-info">
            <div class="channel-icon">
              <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.channelTitle}" />
            </div>
            <div>
              <h3>${video.snippet.title}</h3>
              <p>${video.snippet.channelTitle}</p>
              <p>${new Date(video.snippet.publishedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </a>
      `;

      videoGrid.appendChild(videoCard);
    });

    contentElement.appendChild(videoGrid);
  };

  // Function to set active tab and display corresponding content
  const setActiveTab = (activeBtnId) => {
    document.querySelectorAll(".sidebar ul li").forEach(btn => {
      btn.classList.remove("active");
    });
    document.getElementById(activeBtnId).classList.add("active");

    document.querySelectorAll(".tab-pane").forEach(tab => {
      tab.classList.remove("active");
    });
    tabContents[activeBtnId].classList.add("active");
  };

  // Event listeners for navigation buttons
  homeBtn.addEventListener("click", () => {
    setActiveTab("home");
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=technology&key=${apiKey}`;
    fetchYouTubeVideos(url, homeContent);
  });

  trendingBtn.addEventListener("click", () => {
    setActiveTab("trending");
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&regionCode=US&key=${apiKey}`;
    fetchYouTubeVideos(url, trendingContent);
  });

  subscriptionsBtn.addEventListener("click", () => {
    setActiveTab("subscriptions");
    // Dummy content for subscriptions as actual API requires OAuth for user-specific data
    subscriptionsContent.innerHTML = `<div class="center-content"><h2>Subscriptions</h2><p>Latest videos from channels you follow!</p></div>`;
  });

  libraryBtn.addEventListener("click", () => {
    setActiveTab("library");
    // Dummy content for library as actual API requires OAuth for user-specific data
    libraryContent.innerHTML = `<div class="center-content"><h2>Library</h2><p>Your saved videos and playlists.</p></div>`;
  });

  historyBtn.addEventListener("click", () => {
    setActiveTab("history");
    // Dummy content for history as actual API requires OAuth for user-specific data
    historyContent.innerHTML = `<div class="center-content"><h2>History</h2><p>Your history</p></div>`;
  });

  // Event listener for menu button to toggle sidebar
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // Get references to modal and close button
  const modal = document.getElementById("settings-modal");
  const closeModal = document.getElementsByClassName("close")[0];

  // Event listener for settings button to display modal
  settingsBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Event listener for close button to hide modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Event listener to hide modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  // Event listener for search button to perform search
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      setActiveTab("home");
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${apiKey}`;
      fetchYouTubeVideos(url, homeContent);
    }
  });

  // Trigger home button click event to load home content on page load
  homeBtn.click();
});
