var resumeButton = document.getElementById("resume");
var pdfViewer = document.getElementById("pdfViewer");

document.getElementById("resume").addEventListener("click", function () {
    const resumePdf = document.getElementById("resumePdf");
    if (resumePdf.style.display === "none") {
        resumePdf.style.display = "block";
        this.textContent = "Hide Resume"; // Update button text
    } else {
        resumePdf.style.display = "none";
        this.textContent = "Show Resume";
    }
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