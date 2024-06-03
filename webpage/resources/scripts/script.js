$(document).ready(function(){
    
    // Load navigation content
    $("#nav-placeholder").load("../components/nav.html");
    
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
        // Update aria-expanded to false when the content is hidden by clicking on it
        $(this).prev("h2").attr("aria-expanded", "false");
        event.stopPropagation(); // Prevents the event from bubbling up to the h2 click event
    });

    // Hover event for all list items that have nested ul elements
    $('.menu nav ul li').hover(function() {
        // Get the top position of this li relative to its offset parent
        var parentTop = $(this).position().top;

        
        console.log("Script is still running!");

        // Apply this top position to the direct child ul (dropdown)
        $(this).children('ul').css({
            top: parentTop + 'px', // Aligns the top of the dropdown with the top of the li
            display: "block"
        });
    }, function() {
        // Hide the dropdown when not hovering
        $(this).children('ul').css('display', 'none');

    });
});

document.querySelector('.menu-btn').addEventListener('click', function() {
    document.querySelector('.menu').classList.toggle('active');
});