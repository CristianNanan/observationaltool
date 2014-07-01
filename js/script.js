onload = function() {
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/i)) {
        var button = document.querySelector("*");
        new FastClick(button);
    }

    $(document).hammer({ drag_lock_to_axis: true }).on("swipe drag", function(event) {
            if (event.gesture.direction == Hammer.DIRECTION_UP || event.gesture.direction == Hammer.DIRECTION_DOWN){
                 event.gesture.preventDefault();
            }
     });
    
};
