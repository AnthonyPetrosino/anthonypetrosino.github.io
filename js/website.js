// Open resume pdf in a new tab
document.getElementById("resume").addEventListener("click", function () {
    window.open("static/Anthony-Petrosino-Resume.pdf", "_blank");
    // Alter button text after opening resume
    this.textContent = "Enjoy reviewing my resume, please contact me with any questions.";
});

$(document).ready(function() {
    $('ul li a').hover(function() {
        $(this).toggleClass('active');
    });
});

$(document).ready(function() {
    // Add hover event listener to list items
    $('ul li').hover(function() {
        // Add 'hovered' class to the hovered list item
        $(this).addClass('hovered');
    }, function() {
        // Remove 'hovered' class when mouse leaves
        $(this).removeClass('hovered');
    });
});

// JavaScript to add 'active' class to the current menu item
document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname;
    var page = path.split("/").pop(); // Get the current page filename
    
    // Remove 'active' class from all menu items
    document.querySelectorAll('nav ul li a').forEach(function(element) {
        element.classList.remove('active');
    });

    // Add 'active' class to the current menu item
    document.getElementById(page.split(".")[0]).classList.add('active');
});

// Smooth Scrolling
document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});