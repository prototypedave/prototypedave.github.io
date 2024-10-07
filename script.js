let currentIndex = 0;

function moveSlide(direction) {
    const images = document.querySelectorAll('.carousel-images img');
    const totalImages = images.length;

    // Determine how many slides can fit (2 images at a time in this case)
    const imagesPerSlide = 2;

    // Update the current index
    currentIndex += direction;

    // Ensure index loops correctly
    if (currentIndex < 0) {
        currentIndex = 0; // Stay at the first slide
    } else if (currentIndex >= totalImages - imagesPerSlide + 1) {
        currentIndex = totalImages - imagesPerSlide; // Stay at the last possible slide
    }

    // Move the carousel
    const containerWidth = document.querySelector('.carousel-container').clientWidth;
    const offset = -(currentIndex * (containerWidth / imagesPerSlide)); // Calculate the total offset
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}px)`;

    // Update button states
    updateButtonStates(totalImages, imagesPerSlide);
}

function updateButtonStates(totalImages, imagesPerSlide) {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    // Disable the previous button if at the start
    if (currentIndex === 0) {
        prevButton.style.pointerEvents = 'none';
        prevButton.style.color = 'gray'; // Optional: Change color to indicate disabled
    } else {
        prevButton.style.pointerEvents = 'auto';
        prevButton.style.color = 'white'; // Reset color
    }

    // Disable the next button if at the end
    if (currentIndex >= totalImages - imagesPerSlide) {
        nextButton.style.pointerEvents = 'none';
        nextButton.style.color = 'gray'; // Optional: Change color to indicate disabled
    } else {
        nextButton.style.pointerEvents = 'auto';
        nextButton.style.color = 'white'; // Reset color
    }
}

// Initial call to set button states
updateButtonStates(document.querySelectorAll('.carousel-images img').length, 2);




document.addEventListener("DOMContentLoaded", function() {
    const languages = document.querySelectorAll('.language');
    
    languages.forEach(language => {
        const percentage = language.getAttribute('data-percentage');
        const outerCircle = language.querySelector('.outer-circle');

        let currentPercentage = 0;
        const increment = 1;
        const interval = 10; // milliseconds

        const animateProgress = setInterval(() => {
            if (currentPercentage >= percentage) {
                clearInterval(animateProgress);
            } else {
                currentPercentage += increment;
                outerCircle.style.background = `conic-gradient(#ffd700 0% ${currentPercentage}%, #ffffff ${currentPercentage}% 100%)`;
            }
        }, interval);
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach((number, index) => {
        const target = +number.getAttribute('data-target');
        let count = 0;
        const increment = target / 200; // Adjust the increment speed

        function updateNumber() {
            count += increment;
            if (count < target) {
                number.innerText = Math.ceil(count) + (index === 0 ? ' +' : '');
                requestAnimationFrame(updateNumber);
            } else {
                number.innerText = target + (index === 0 ? ' +' : '');
            }
        }
        updateNumber();
    });
});


document.getElementById('nav-toggle').addEventListener('click', function () {
    var navbar = document.getElementById('navbar');
    var body = document.body;

    if (navbar.classList.contains('expanded')) {
        navbar.classList.remove('expanded');
        body.classList.remove('navbar-expanded');
    } else {
        navbar.classList.add('expanded');
        body.classList.add('navbar-expanded');
    }
});


document.querySelectorAll('.input').forEach(input => {
    const label = input.previousElementSibling;

    input.addEventListener('focus', function () {
        label.classList.add('highlighted');
    });

    input.addEventListener('blur', function () {
        label.classList.remove('highlighted');
    });
});

document.getElementById('getcontact').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        showAlert('Please fill in all fields.');
        return;
    }

    var mailtoLink = `mailto:example@example.com?subject=${email}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;

    window.location.href = mailtoLink;
});

const boxes = document.querySelectorAll('.conversation-box');
const circles = document.querySelectorAll('.outer-oss');

boxes.forEach((box, index) => {
    box.addEventListener('mouseover', () => {
        circles[index].classList.add('pulsated');
    });

    box.addEventListener('mouseout', () => {
        circles[index].classList.remove('pulsated');
    });
});

function showAlert(message) {
    var modal = document.getElementById('alertModal');
    var span = document.getElementsByClassName('close')[0];
    document.getElementById('alertMessage').textContent = message;
    modal.style.display = 'block';

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

function showContent(contentId) {
    const sections = document.querySelectorAll('.main-body');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const activeSection = document.getElementById(contentId);
    activeSection.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const words = document.querySelectorAll('.changing-words .word');
    let currentWord = 0;

    function changeWord() {
        words[currentWord].style.opacity = 0;
        currentWord = (currentWord + 1) % words.length;
        words[currentWord].style.opacity = 1;
    }

    setInterval(changeWord, 2000); // Change word every 2 seconds
});

consoleText(
    [
        'network protocols.', 
        'design mockups.', 
        'web applications.', 
        'deep learning models.', 
        'automation tools'
    ], 'text',
    ['white']
);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
        waiting = true;
        target.innerHTML = words[0].substring(0, letterCount)
        window.setTimeout(function() {
          var usedColor = colors.shift();
          colors.push(usedColor);
          var usedWord = words.shift();
          words.push(usedWord);
          x = 1;
          target.setAttribute('style', 'color:' + colors[0])
          letterCount += x;
          waiting = false;
        }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
        waiting = true;
        window.setTimeout(function() {
          x = -1;
          letterCount += x;
          waiting = false;
        }, 1000)
    } else if (waiting === false) {
        target.innerHTML = words[0].substring(0, letterCount)
        letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
      if (visible === true) {
          con.className = 'text-underscore hidden'
          visible = false;

      } else {
          con.className = 'text-underscore'
          visible = true;
      }
    }, 400)
}
