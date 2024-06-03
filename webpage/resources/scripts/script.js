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

    // Ensure that all menu items are always visible in the mobile menu, removing hover dependency
    if ($(window).width() <= 768) {
        $('.menu nav').show();  // Always show submenus on mobile
    }
});
