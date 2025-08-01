// Enhanced script.js for JS Hub
document.addEventListener('DOMContentLoaded', function() {
  // Typewriter effect with multiple phrases
  const phrases = [
    "Master JavaScript, Step-by-Step",
    "Learn by Doing with Real Code",
    "From Beginner to Advanced",
    "Interactive Learning Experience",
    "Build Projects, Not Just Theory"
  ];
  
  const typingElement = document.querySelector('.typing-text');
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;
  
  function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      isEnd = true;
      isDeleting = true;
      setTimeout(typeWriter, 1500); // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeWriter, 500); // Pause before typing next phrase
    } else {
      const typingSpeed = isDeleting ? 50 : 100;
      setTimeout(typeWriter, typingSpeed);
    }
  }
  
  // Start the typewriter effect after a short delay
  setTimeout(typeWriter, 1000);
  
  // Mode toggle functionality
  const modeToggle = document.querySelector('.mode-toggle');
  const body = document.body;
  
  // Check for saved mode preference
  const savedMode = localStorage.getItem('mode');
  if (savedMode === 'light') {
    body.classList.add('light');
    modeToggle.innerHTML = '<img src="image/light-mode.svg" class="mode" alt="Light mode toggle">';
  }
  
  // Toggle mode function
  window.toggleMode = function() {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    
    if (isLight) {
      modeToggle.innerHTML = '<img src="image/light-mode.svg" class="mode" alt="Light mode toggle">';
      localStorage.setItem('mode', 'light');
    } else {
      modeToggle.innerHTML = '<img src="image/dark-mode.svg" class="mode" alt="Dark mode toggle">';
      localStorage.setItem('mode', 'dark');
    }
  };
  
  // Music toggle functionality
  const musicToggle = document.querySelector('.music-toggle');
  let audio = new Audio('audio/background.mp3');
  audio.loop = true;
  
  // Check for saved music preference
  const savedMusic = localStorage.getItem('music');
  if (savedMusic === 'on') {
    audio.play();
    musicToggle.innerHTML = '<img src="image/music-on.svg" class="mode" alt="Music toggle">';
  } else {
    musicToggle.innerHTML = '<img src="image/music-off.svg" class="mode" alt="Music toggle">';
  }
  
  // Toggle music function
  window.toggleMusic = function() {
    if (audio.paused) {
      audio.play();
      musicToggle.innerHTML = '<img src="image/music-on.svg" class="mode" alt="Music toggle">';
      localStorage.setItem('music', 'on');
    } else {
      audio.pause();
      musicToggle.innerHTML = '<img src="image/music-off.svg" class="mode" alt="Music toggle">';
      localStorage.setItem('music', 'off');
    }
  };
  
  // Greet me functionality
  window.askName = function() {
    const name = prompt("What's your name?", "Coder");
    const popup = document.getElementById('greet-popup');
    const userNameElement = document.getElementById('user-name');
    
    if (name) {
      userNameElement.textContent = name;
      popup.classList.add('active');
    }
  };
  
  window.closePopup = function() {
    const popup = document.getElementById('greet-popup');
    popup.classList.remove('active');
  };
  
  // Close popup when clicking outside
  document.addEventListener('click', function(e) {
    const popup = document.getElementById('greet-popup');
    if (e.target === popup) {
      closePopup();
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add animation class when elements come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.feature-card, .developer-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for animated elements
  document.querySelectorAll('.feature-card, .developer-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Run once on load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
});


// Additional script for notes page
document.addEventListener('DOMContentLoaded', function() {
  // Animate note cards in sequence
  const noteCards = document.querySelectorAll('.note-card');
  
  noteCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('show');
    }, 100 * index);
  });
  
  // Search functionality
  const searchInput = document.querySelector('.search-box input');
  const searchBtn = document.querySelector('.search-btn');
  
  searchBtn.addEventListener('click', function() {
    filterNotes(searchInput.value.toLowerCase());
  });
  
  searchInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
      filterNotes(searchInput.value.toLowerCase());
    }
  });
  
  function filterNotes(searchTerm) {
    noteCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const desc = card.querySelector('p').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || desc.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
});
    

const cards = Array.from(document.querySelectorAll('.card-data')).map(card => ({
  front: card.dataset.front,
  back: card.dataset.back
}));

let current = 0;
const flipCardEl = document.querySelector('.flip-card');
const frontDiv = document.querySelector('.flip-card-front');
const backDiv = document.querySelector('.flip-card-back');

function showCard(index) {
  frontDiv.textContent = cards[index].front;
  backDiv.textContent = cards[index].back;
  flipCardEl.classList.remove('flipped');
}

function nextCard() {
  current = (current + 1) % cards.length;
  showCard(current);
}

function prevCard() {
  current = (current - 1 + cards.length) % cards.length;
  showCard(current);
}

function flipCard() {
  flipCardEl.classList.toggle('flipped');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextCard();
  if (e.key === 'ArrowLeft') prevCard();
  if (e.key === ' ') {
    e.preventDefault();
    flipCard();
  }
});


showCard(current);

function calculateScore() {
  // Correct answers key
  const correctAnswers = {
    q1: "A", q2: "B", q3: "B", q4: "A", q5: "C",
    q6: "B", q7: "A", q8: "A", q9: "D", q10: "C",
    q11: "B", q12: "B", q13: "A", q14: "A", q15: "A",
    q16: "A", q17: "A", q18: "A", q19: "A", q20: "B"
  };

  let score = 0;
  const totalQuestions = Object.keys(correctAnswers).length;
  
  // Check each question
  for (let i = 1; i <= totalQuestions; i++) {
    const questionName = `q${i}`;
    const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
    
    if (selectedOption) {
      // Show immediate feedback for each question
      const questionDiv = selectedOption.closest('.question');
      const resultDiv = document.createElement('div');
      resultDiv.className = 'result';
      
      if (selectedOption.value === correctAnswers[questionName]) {
        score++;
        resultDiv.textContent = '✓ Correct!';
        resultDiv.classList.add('correct');
      } else {
        resultDiv.textContent = `✗ Incorrect! The correct answer is ${correctAnswers[questionName]}`;
        resultDiv.classList.add('incorrect');
      }
      
      questionDiv.appendChild(resultDiv);
    }
  }
  
  // Calculate and display final score
  const percentage = Math.round((score / totalQuestions) * 100);
  const resultDiv = document.getElementById('result');
  resultDiv.className = 'result final-score';
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    <h3>Quiz Completed!</h3>
    <p>Your score: ${score}/${totalQuestions} (${percentage}%)</p>
    ${percentage >= 80 ? '🎉 Excellent job!' : 
      percentage >= 60 ? '👍 Good effort!' : 
      'Keep practicing!'}
  `;
  
  // Scroll to results
  resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// Update progress bar as user answers questions
document.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', function() {
    const totalQuestions = 20;
    const answered = document.querySelectorAll('input[type="radio"]:checked').length;
    const progress = (answered / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
  });
});

  const htmlInput = document.getElementById('html');
    const cssInput = document.getElementById('css');
    const jsInput = document.getElementById('js');
    const preview = document.getElementById('preview');

    function updatePreview() {
      const html = htmlInput.value;
      const css = `<style>${cssInput.value}</style>`;
      const js = `<script>${jsInput.value}<\/script>`;
      const output = html + css + js;
      preview.srcdoc = output;
    }

    htmlInput.addEventListener('input', updatePreview);
    cssInput.addEventListener('input', updatePreview);
    jsInput.addEventListener('input', updatePreview);

    
