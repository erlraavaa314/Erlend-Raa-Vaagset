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
    // Toggle visibility of content under each section when the h2 header is clicked
    $("section h2").click(function() {
        console.log("H2 content visibility toggled");
        $(this).next(".content").slideToggle('slow');
        var isExpanded = $(this).attr("aria-expanded") === "true";
        $(this).attr("aria-expanded", !isExpanded);
    });

    // Toggle visibility of content under each section when the h3 header is clicked
    $("section h3").click(function() {
        console.log("H3 content visibility toggled");
        $(this).next(".content-box").slideToggle('slow');
        var isExpanded = $(this).attr("aria-expanded") === "true";
        $(this).attr("aria-expanded", !isExpanded);
    });

    // Ensure that all menu items are always visible in the mobile menu, removing hover dependency
    if ($(window).width() <= 768) {
        $('.menu nav').show();  // Always show submenus on mobile
    }

    $(document).ready(function() {
        $('.menu-btn').click(function() {
            $('.menu').toggleClass('active');
        });
    });

    
});