const sidebarToggleBtns = document.querySelectorAll(".sidebar-toggle");
const sidebar = document.querySelector(".sidebar");
const searchForm = document.querySelector(".search-form");
const themeToggleBtn = document.querySelector(".theme-toggle");
const themeIcon = themeToggleBtn.querySelector(".theme-icon");
const menuLinks = document.querySelectorAll(".menu-link");

// Memory card game variables
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

// Memory card game functions
function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return cardOne = clickedCard;
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img")?.src,
        cardTwoImg = cardTwo.querySelector(".back-view img")?.src;
    if (cardOneImg && cardTwoImg) {
      matchCards(cardOneImg, cardTwoImg);
    } else {
      console.error("Hình ảnh không tải được!");
      cardOne.classList.remove("flip");
      cardTwo.classList.remove("flip");
      cardOne = cardTwo = "";
      disableDeck = false;
    }
  }
}
function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched === 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return disableDeck = false;
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function shuffleCard() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]; 
  arr.sort(() => Math.random() > 0.5 ? 1 : -1);
  const cards = document.querySelectorAll("#analytics .card");
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

// Theme handling
const updateThemeIcon = () => {
  const isDark = document.body.classList.contains("dark-theme");
  themeIcon.textContent = sidebar.classList.contains("collapsed") ? (isDark ? "light_mode" : "dark_mode") : "dark_mode";
};
const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.body.classList.toggle("dark-theme", savedTheme === "dark" || (!savedTheme && systemPrefersDark));
updateThemeIcon();

themeToggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon();
});

sidebarToggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    updateThemeIcon();
  });
});

searchForm.addEventListener("click", () => {
  if (sidebar.classList.contains("collapsed")) {
    sidebar.classList.remove("collapsed");
    searchForm.querySelector("input").focus();
  }
});

// Handle page switching with memory game initialization
document.querySelectorAll(".menu-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const page = link.getAttribute("data-page");

    document.querySelectorAll('.page-section').forEach(section => {
      section.style.display = 'none';
    });

    if (page) {
      document.getElementById(page).style.display = 'block';
      // Initialize memory card game when analytics section is shown
   if (page === "analytics") {
  console.log("Hiển thị Analytics và khởi động game");
  document.getElementById(page).style.display = 'block';
  shuffleCard();
}
    }

    document.querySelectorAll(".menu-link").forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Swiper initialization
document.addEventListener('DOMContentLoaded', () => {
  new Swiper('.swiper', {
    loop: true,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
});

// Expand sidebar on large screens
if (window.innerWidth > 768) sidebar.classList.remove("collapsed");