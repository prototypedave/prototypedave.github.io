function mergeProjCols() {
    const firstProjCol = document.querySelectorAll('.proj-col')[0];
    const secondProjCol = document.querySelectorAll('.proj-col')[1];

    if (secondProjCol) {
      while (secondProjCol.firstChild) {
        firstProjCol.appendChild(secondProjCol.firstChild);
      }
      secondProjCol.remove();
    }
}

function checkScreenSize() {
    if (window.innerWidth <= 1024) {
      mergeProjCols();
    }
}

window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);

let currIndex = {
    carousel1: 0,
    carousel2: 0
};
const intervalTime = 3000;

const carousel1 = document.getElementById('carousel-1');
const carousel2 = document.getElementById('carousel-2');

function showImage(index, carousel) {
    const images = carousel.querySelectorAll('.carousel-images img');
    const imagesCount = images.length;
    if (index < 0) {
        index = imagesCount - 1;
    } else if (index >= imagesCount) {
        index = 0;
    }

    const offset = -index * 100;
    carousel.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;

    if (carousel === carousel1) {
        currIndex.carousel1 = index;
    } else {
        currIndex.carousel2 = index;
    }
}

function move(direction, carouselId) {
    const carousel = document.getElementById(carouselId);
    const indexKey = carouselId === 'carousel-1' ? 'carousel1' : 'carousel2';
    showImage(currIndex[indexKey] + direction, carousel);
}

let interval1 = setInterval(() => {
    showImage(currIndex.carousel1 + 1, carousel1);
}, intervalTime);

let interval2 = setInterval(() => {
    showImage(currIndex.carousel2 + 1, carousel2);
}, intervalTime);

document.querySelectorAll('.carousel-button').forEach(button => {
    button.addEventListener('click', () => {
        clearInterval(interval1);
        clearInterval(interval2);

        const carouselId = button.getAttribute('data-carousel');
        const direction = parseInt(button.getAttribute('data-direction'));
        move(direction, carouselId);

        interval1 = setInterval(() => {
            showImage(currIndex.carousel1 + 1, carousel1);
        }, intervalTime);

        interval2 = setInterval(() => {
            showImage(currIndex.carousel2 + 1, carousel2);
        }, intervalTime);
    });
});

showImage(currIndex.carousel1, carousel1);
showImage(currIndex.carousel2, carousel2);

const boxes = document.querySelectorAll('.conversation-box');
const circles = document.querySelectorAll('.outer-oss');

const handleAnimation = (index, action) => {
    if (action === 'add') {
        circles[index].classList.add('pulsated');
    } else {
        circles[index].classList.remove('pulsated');
    }
};

boxes.forEach((box, index) => {
    box.addEventListener('mouseover', () => handleAnimation(index, 'add'));
    box.addEventListener('mouseout', () => handleAnimation(index, 'remove'));
});

boxes.forEach((box, index) => {
    box.addEventListener('touchstart', () => {
        handleAnimation(index, 'add');
    });

    box.addEventListener('touchend', () => {
        handleAnimation(index, 'remove');
    });
});

const categoryContainer = document.getElementById('all-cat');
categoryContainer.addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
        const currentActive = document.querySelector('.a-active');
        if (currentActive) {
            currentActive.classList.remove('a-active');
        }
        
        event.target.classList.add('a-active');
        const category = event.target.getAttribute('href').substring(1);

        if (category === 'all-cat') {
            showAllItems();
        } else {
            filterItemsByCategory(category);
        }
    }
});

function showAllItems() {
    const items = document.querySelectorAll('.template');
    items.forEach(item => {
        item.style.display = 'block';
    });
}

function filterItemsByCategory(category) {
    const items = document.querySelectorAll('.template');
    items.forEach(item => {
        if (item.id.includes(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const languages = document.querySelectorAll('.language');
    
    languages.forEach(language => {
        const percentage = language.getAttribute('data-percentage');
        const outerCircle = language.querySelector('.outer-circle');

        let currentPercentage = 0;
        const increment = 1;
        const interval = 10; 

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

    var isMobile = window.innerWidth < 1080;
    var isTablet = window.innerWidth > 768 && window.innerWidth < 1080; 

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

        if (isTablet) {
            body.style.opacity = "1"; 
        }
    } else {
        navbar.classList.add('expanded');

        if (!isMobile) {
            body.classList.add('navbar-expanded');
        }

        for (var i = 0; i < navButtons.length; i++) {
            navButtons[i].style.backgroundColor = "#252531"; 
        }

        if (!isTablet) {
            for (var j = 0; j < upnav.length; j++) {
                upnav[j].style.width = "60%"; 
            }
        }

        if (isTablet) {
            for (var k = 0; k < items.length; k++) {
                items[k].style.display = "flex";
                items[k].style.alignItems = "center";
            }
        } else {
            for (var k = 0; k < items.length; k++) {
                items[k].style.display = "block";
            }
        }
   
        if (isTablet) {
            body.style.opacity = "0.3"; 
        }
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const copyrightSpan = document.getElementById("copyright"); 
    const currentYear = new Date().getFullYear();
    copyrightSpan.textContent = currentYear;
});

document.addEventListener("DOMContentLoaded", function() {
    const numbers = document.querySelectorAll('.number');
    const totalItems = numbers.length;

    numbers.forEach((number, index) => {
        const target = +number.getAttribute('data-target');
        let count = 0;
        const increment = target / 200; 

        function updateNumber() {
            count += increment;
            if (count < target) {
                number.innerText = Math.ceil(count) + (index === 0 || index === totalItems - 1 ? ' +' : '');
                requestAnimationFrame(updateNumber);
            } else {
                number.innerText = target + (index === 0 || index === totalItems - 1 ? ' +' : '');
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
    const socialBox = document.querySelector('.social-media-box');
    const leftButton = document.querySelector('.left-toggle');
    const rightButton = document.querySelector('.right-toggle');

    const isVisible = profileBox.classList.toggle('show');
    infoBox.classList.toggle('show');
    socialBox.classList.toggle('show');

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


