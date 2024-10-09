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

document.getElementById('nav-toggle').addEventListener('click', function () {
    var navbar = document.getElementById('navbar');
    var body = document.body;
    var navButtons = document.getElementsByClassName('nav-button');
    var upnav = document.getElementsByClassName('upnav');
    var items = document.getElementsByClassName("list-items");

    // Check if the screen size is for mobile
    var isMobile = window.innerWidth < 768; // Adjust the threshold as needed

    if (navbar.classList.contains('expanded')) {
        navbar.classList.remove('expanded');
        
        if (!isMobile) {
            body.classList.remove('navbar-expanded');
        }

        for (var i = 0; i < navButtons.length; i++) {
            navButtons[i].style.backgroundColor = "#191923"; 
        }

        for (var j = 0; j < upnav.length; j++) {
            upnav[j].style.width = "80%"; 
        }

        for (var k = 0; k < items.length; k++) {
            items[k].style.display = "none";
        }
    } else {
        navbar.classList.add('expanded');
        if (!isMobile) {
            body.classList.add('navbar-expanded');
        }

        for (var i = 0; i < navButtons.length; i++) {
            navButtons[i].style.backgroundColor = "#252531"; 
        }

        for (var j = 0; j < upnav.length; j++) {
            upnav[j].style.width = "50%"; 
        }

        for (var k = 0; k < items.length; k++) {
            items[k].style.display = "block";
        }
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach((number, index) => {
        const target = +number.getAttribute('data-target');
        let count = 0;
        const increment = target / 200; 

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

document.addEventListener('DOMContentLoaded', function() {
    const words = document.querySelectorAll('.changing-words .word');
    let currentWord = 0;

    function changeWord() {
        words[currentWord].style.opacity = 0;
        currentWord = (currentWord + 1) % words.length;
        words[currentWord].style.opacity = 1;
    }

    setInterval(changeWord, 2000); 
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

let currentIndex = {};

function moveSlide(direction, carouselId) {
    const carouselContainer = document.querySelector(`#${carouselId}`);
    const images = carouselContainer.querySelectorAll('.carousel-images img');
    const totalImages = images.length;

    if (!currentIndex[carouselId]) {
        currentIndex[carouselId] = 0;
    }

    const imagesPerSlide = 2; 
    const containerWidth = carouselContainer.clientWidth; 

    currentIndex[carouselId] += direction;

    if (currentIndex[carouselId] < 0) {
        currentIndex[carouselId] = 0;
    } else if (currentIndex[carouselId] > totalImages - imagesPerSlide) {
        currentIndex[carouselId] = totalImages - imagesPerSlide;
    }

    const offset = -(currentIndex[carouselId] * (containerWidth / imagesPerSlide));
    carouselContainer.querySelector('.carousel-images').style.transform = `translateX(${offset}px)`;

    updateButtonStates(totalImages, imagesPerSlide, carouselId);
}

function updateButtonStates(totalImages, imagesPerSlide, carouselId) {
    const carouselContainer = document.querySelector(`#${carouselId}`);
    const prevButton = carouselContainer.parentNode.querySelector('.prev');
    const nextButton = carouselContainer.parentNode.querySelector('.next');

    if (currentIndex[carouselId] === 0) {
        prevButton.style.pointerEvents = 'none';
        prevButton.style.color = 'gray';
    } else {
        prevButton.style.pointerEvents = 'auto';
        prevButton.style.color = 'white';
    }

    if (currentIndex[carouselId] >= totalImages - imagesPerSlide) {
        nextButton.style.pointerEvents = 'none';
        nextButton.style.color = 'gray';
    } else {
        nextButton.style.pointerEvents = 'auto';
        nextButton.style.color = 'white';
    }
}

updateButtonStates(document.querySelectorAll('#carousel-1 .carousel-images img').length, 2, 'carousel-1');
updateButtonStates(document.querySelectorAll('#carousel-2 .carousel-images img').length, 2, 'carousel-2');

function toggleBoxes() {
    const profileBox = document.querySelector('.profile-box');
    const infoBox = document.querySelector('.info-box');
    const leftButton = document.querySelector('.left-toggle');
    const rightButton = document.querySelector('.right-toggle');

    const isVisible = profileBox.classList.toggle('show');
    infoBox.classList.toggle('show');

    if (isVisible) {
        leftButton.classList.add('disabled');
        rightButton.classList.add('disabled');
    } else {
        leftButton.classList.remove('disabled');
        rightButton.classList.remove('disabled');
    }
}

document.getElementById('nav-toggle').addEventListener('click', () => {
    navbar.classList.add('hide');
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

function sendMail(event) {
    event.preventDefault();

    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        showAlert('Please fill in all fields.');
        return;
    }

    var mailtoLink = `mailto:davidisumba@gmail.com?subject=Message from ${name}&body=Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;

    window.location.href = mailtoLink;

    document.getElementById('getcontact').reset();
};

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

