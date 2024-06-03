$(document).ready(function() {
    
    $('.menu-btn').click(function() {
        $('.menu nav').toggleClass('active');  // Only toggle the visibility of the <nav>
        console.log("Navigation menu toggled");
    });
    
    // Load navigation content
    $("#nav-placeholder").load("../components/nav.html", function() {
        // Once the navigation is loaded, bind the click event to the menu button
        console.log("Navigation loaded");
        $('.menu-btn').click(function() {
            $('.menu').toggleClass('active');
            console.log("Menu toggled");
        });
    });
    
    console.log("Script is running!");

    // Toggle visibility of content under each section when the header is clicked
    $("section h2").click(function() {
        console.log("Content visible");
        $(this).next(".content").slideToggle('slow');
        var isExpanded = $(this).attr("aria-expanded") === "true";
        $(this).attr("aria-expanded", !isExpanded);
    });

    // Hide content when it is clicked, unless the click is on a link
    $("section .content").click(function(event) {
        if ($(event.target).is('a')) {
            // If the click is on a link, do not hide the content
            return;
        }
        console.log("Content hidden");
        $(this).slideUp('slow');
        $(this).prev("h2").attr("aria-expanded", "false");
        event.stopPropagation(); // Prevents the event from bubbling up to the h2 click event
    });

    // Hover event for all list items that have nested ul elements
    $('.menu nav ul li').hover(function() {
        var parentTop = $(this).position().top;
        $(this).children('ul').css({
            top: parentTop + 'px',
            display: "block"
        });
    }, function() {
        $(this).children('ul').css('display', 'none');
    });
});
