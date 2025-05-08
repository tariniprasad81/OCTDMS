//main banner
$(document).ready(function() {

    $("#owl-enco").owlCarousel({

        navigation : false, // Show next and prev buttons
        pagination: true,
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true,
        autoPlay: true,
        stopOnHover: true

    // "singleItem:true" is a shortcut for:
    // items : 1,
    // itemsDesktop : false,
    // itemsDesktopSmall : false,
    // itemsTablet: false,
    // itemsMobile : false

    });

    $("#owl-pltSpon").owlCarousel({

        navigation : false, // Show next and prev buttons
        pagination: true,
        slideSpeed : 300,
        paginationSpeed : 400,
        items : 4,
        singleItem:false,
        autoPlay: true

    // "singleItem:true" is a shortcut for:
    // itemsDesktop : false,
    // itemsDesktopSmall : false,
    // itemsTablet: false,
    // itemsMobile : false

    });
});

//Owl speaker
$(document).ready(function() {

    $("#owl-speaker").owlCarousel({

        autoPlay: 3000, //Set AutoPlay to 3 seconds
        items : 5,
        stopOnHover: true,
        pagination: false,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]

    });

    $("#new-speaker").owlCarousel({

        autoPlay: 3000, //Set AutoPlay to 3 seconds
        items : 5,
        stopOnHover: true,
        pagination: false,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]

    });
    
    $(".latest-news-slider").bootstrapNews({
                    newsPerPage: 4,
                    autoplay: true,
                    pauseOnHover: true,
                    navigation: false,
                    direction: 'down',
                    newsTickerInterval: 2500,
                    onToDo: function () {
                        //console.log(this);
                    }
                });

});
/**dropdown hover**/
$(document).ready(function() {
$('ul.nav li.dropdown').hover(function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(500);
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(500);
});


/**anmation js**/
var wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
    callback:     function(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null // optional scroll container selector, otherwise use window
  }
);
wow.init();

/**anmation js**/

});
/**dropdown hover**/
//**/count down js
$(document).ready(function() {
var d = new Date(new Date().getTime() + 48 * 120 * 120 * 2000);

    

    //jQuery example
    $('#simply-countdown-losange').simplyCountdown({
        year: 2019, // required
            month: 2, // required
            day: 20, // required
            hours: 0, // Default is 0 [0-23] integer
            minutes: 0, // Default is 0 [0-59] integer
            seconds: 0, // Default is 0 [0-59] integer
            words: { //words displayed into the countdown
                days: 'day',
                hours: 'hour',
                minutes: 'minute',
                seconds: 'second',
                pluralLetter: 's'
            },
            plural: true, //use plurals
            inline: false, //set to true to get an inline basic countdown like : 24 days, 4 hours, 2 minutes, 5 seconds
            inlineClass: 'simply-countdown-inline', //inline css span class in case of inline = true
            // in case of inline set to false
            enableUtc: true,
            onEnd: function () {
                // your code
                return;
            },
            refresh: 1000, //default refresh every 1s
            sectionClass: 'simply-section', //section css class
            amountClass: 'simply-amount', // amount css class
            wordClass: 'simply-word', // word css class
            zeroPad: false
    });


    });
//**/count down js end
