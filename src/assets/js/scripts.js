(function($) {
    // function handlePreloader() {
    //     if ($('.preloader').length) {
    //         $('.preloader').delay(200).fadeOut(500);
    //     }
    // }

    
    headerStyle();
    if ($('.main-header li.dropdown ul').length) {
        $('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><i class="fa fa-angle-down"></i></div>');
    }
    if ($('.hidden-bar').length) {
        $('.toggle-hidden-bar').on('click', function() {
            $('body').addClass('active-hidden-bar');
        });
        $('.hidden-bar-back-drop, .hidden-bar .close-btn').on('click', function() {
            $('body').removeClass('active-hidden-bar');
        });
    }
    if ($('.mobile-menu').length) {
        var mobileMenuContent = $('.main-header .main-menu .navigation').html();
        $('.mobile-menu .navigation').append(mobileMenuContent);
        $('.sticky-header .navigation').append(mobileMenuContent);
        $('.mobile-menu .close-btn').on('click', function() {
            $('body').removeClass('mobile-menu-visible');
        });
        $('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
            $(this).prev('ul').slideToggle(500);
            $(this).toggleClass('active');
        });
        $('.mobile-nav-toggler').on('click', function() {
            $('body').addClass('mobile-menu-visible');
        });
        $('.mobile-menu .menu-backdrop, .mobile-menu .close-btn').on('click', function() {
            $('body').removeClass('mobile-menu-visible');
        });
    }
    
    $(window).on('scroll', function() {
        headerStyle();
        TM_activateMenuItemOnReach();
    });
    $(window).on('load', function() {
        handlePreloader();
    });


    // Owl Carousel
	// if ($(".highlights-carousel").length) {
	// 	var owl = $(".highlights-carousel");
	// 	owl.owlCarousel({
	// 		items: 3,
	// 		nav:true,
	// 		navText: ['<i class="fa-solid fa-arrow-left-long"></i>','<i class="fa-solid fa-arrow-right-long"></i>'],
	// 		margin:30,
	// 		loop: true,
    //         dots:false,
	// 		autoplay:true,
	// 		smartSpeed:2000,
	// 		responsive:{
	// 			0:{
	// 					items:1,
	// 			},
	// 			575:{
	// 					items:2,
	// 			},
	// 			767:{
	// 					items:3,
	// 			},
	// 			991: {
	// 				items:3,
	// 			}
	// 		}
	// 	});
	// }

    // Owl Carousel
	if ($(".sponsors-carousel").length) {
		var owl = $(".sponsors-carousel");
		owl.owlCarousel({
			items: 3,
			nav:true,
			navText: ['<i class="fa-solid fa-arrow-left-long"></i>','<i class="fa-solid fa-arrow-right-long"></i>'],
			margin:30,
			loop: true,
            dots:false,
			autoplay:true,
			smartSpeed:2000,
			responsive:{
				0:{
						items:1,
				},
				575:{
						items:2,
				},
				767:{
						items:3,
				},
				991: {
					items:5,
				}
			}
		});
	}


    $(function() {
        $('#carousel1').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 0,
            speed: 1000,
            //cssEase:'linear',
            vertical: true,
            verticalScrolling: true,
        });
    });

    $(function() {
        $('.upcoming').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 0,
            speed: 1000,
            //cssEase:'linear',
            vertical: true,
            verticalScrolling: true,
        });
    });

    $(function() {
        $('.press').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 0,
            speed: 2000,
            cssEase:'linear',
            vertical: true,
            verticalScrolling: true,
        });
    });

    $(function() {
        $('.latest-scroll').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 0,
            speed: 1000,
            cssEase:'linear',
            vertical: true,
            verticalScrolling: true,
        });
    });

    $(document).ready(function(){
        $('.counter-value').each(function(){
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            },{
                duration: 3500,
                easing: 'swing',
                step: function (now){
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });



})(window.jQuery);
