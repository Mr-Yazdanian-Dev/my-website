
(function ($) {

    "use strict";

    $(document).ready(function () {

        // ## Header Style and Scroll to Top
        function headerStyle() {
            if ($('.main-header').length) {
                var windowpos = $(window).scrollTop();
                var siteHeader = $('.main-header');
                var scrollLink = $('.scroll-top');
                if (windowpos >= 250) {
                    siteHeader.addClass('fixed-header');
                    scrollLink.fadeIn(300);
                } else {
                    siteHeader.removeClass('fixed-header');
                    scrollLink.fadeOut(300);
                }
            }
        }
        headerStyle();
        
        
        // ## Dropdown menu
        var mobileWidth = 992;
        var navcollapse = $('.navigation li.dropdown');

        navcollapse.hover(function () {
            if ($(window).innerWidth() >= mobileWidth) {
                $(this).children('ul').stop(true, false, true).slideToggle(300);
                $(this).children('.megamenu').stop(true, false, true).slideToggle(300);
            }
        });
        
        // ## Submenu Dropdown Toggle
        if ($('.main-header .navigation li.dropdown ul').length) {
            $('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fas fa-chevron-down"></span></div>');

            //Dropdown Button
            $(' .navigation li.dropdown .dropdown-btn').on('click', function () {
                $(this).prev('ul').slideToggle(500);
                $(this).prev('.megamenu').slideToggle(800);
            });

            //Disable dropdown parent link
            $('.navigation li.dropdown > a').on('click', function (e) {
                e.preventDefault();
                var dropdown = $(this).next('ul');
                dropdown.slideToggle(500);
                dropdown.next('.megamenu').slideToggle(800);
            });
        }
        
        // Submenu Dropdown Toggle
        if ($('.main-header .main-menu').length) {
            $('.main-header .main-menu .navbar-toggle').click(function () {
                $(this).prev().prev().next().next().children('li.dropdown').hide();
            });
        }
        
        
         
        // ## Menu Hidden Sidebar Content Toggle
        if($('#section_message').length){
            //Show Form
            $('#message_btn').on('click', function(e) {
                e.preventDefault();
                $('body').toggleClass('side-content-visible');
            });

            $('#message_btn_mobile').on('click', function(e) {
                e.preventDefault();
                $('body').toggleClass('side-content-visible');
            });

            //Hide Form
            $('.hidden-bar .inner-box .cross-icon,.form-back-drop,.close-menu').on('click', function(e) {
                e.preventDefault();
                $('body').removeClass('side-content-visible');
            });
            //Dropdown Menu
            $('.fullscreen-menu .navigation li.dropdown > a').on('click', function() {
                $(this).next('ul').slideToggle(500);
            });
        }

        // ## Menu Sidebar Content Toggle
        if($('#section_nav').length){
            //Show Form
            $('#nav_btn').on('click', function(e) {
                e.preventDefault();
                $('body').toggleClass('nav-content-visible');
            });
            //Hide Form
            $('.nav-bar .inner-box .cross-icon,.nav-back-drop,.close-menu').on('click', function(e) {
                e.preventDefault();
                $('body').removeClass('nav-content-visible');
            });
            //Dropdown Menu
            $('.fullscreen-menu .navigation li.dropdown > a').on('click', function() {
                $(this).next('ul').slideToggle(500);
            });

        }
        
        // ## OnePage Nav Scroll
        $(".onepage a").on('click', function(e){
            $('body').removeClass('nav-content-visible');

            e.preventDefault();
            var hash = this.hash;
            var position = $(hash).offset().top;
            $("html").animate({
                scrollTop : position - 100
            },1000);
        });
        
        
        // ## Testimonials Active
        if ($('.testimonials-wrap').length) {
            $('.testimonials-wrap').slick({
                dots: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 2000,
                arrows: true,
                speed: 1000,
                focusOnSelect: false,
                prevArrow: '.testimonial-prev',
                nextArrow: '.testimonial-next',
                slidesToShow: 2,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });
        }
        
        
        
        // ## Project Filter
        $(".project-filter li").on('click', function () {
            $(".project-filter li").removeClass("current");
            $(this).addClass("current");

            var selector = $(this).attr('data-filter');
            $('.project-masonry-active').imagesLoaded(function () {
                $(".project-masonry-active").isotope({
                    itemSelector: '.item',
                    filter: selector,
                    masonry: {
                        columnWidth: '.item'
                    }
                });
            });

        });
        
        
        
         /* ## Fact Counter + Text Count - Our Success */
        if ($('.counter-text-wrap').length) {
            $('.counter-text-wrap').appear(function () {
                
                var $t = $(this),
                    n = $t.find(".count-text").attr("data-stop"),
                    r = parseInt($t.find(".count-text").attr("data-speed"), 10);

                if (!$t.hasClass("counted")) {
                    $t.addClass("counted");
                    $({
                        countNum: $t.find(".count-text").text()
                    }).animate({
                        countNum: n
                    }, {
                        duration: r,
                        easing: "linear",
                        step: function () {
                            $t.find(".count-text").text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $t.find(".count-text").text(this.countNum);
                        }
                    });
                }

            }, {
                accY: 0
            });
        }
        

        
        // ## Scroll to Top
        if ($('.scroll-to-target').length) {
            $(".scroll-to-target").on('click', function () {
                var target = $(this).attr('data-target');
                // animate
                $('html, body').animate({
                    scrollTop: $(target).offset().top
                }, 1000);

            });
        }
        
        
        // ## Nice Select
        $('select').niceSelect();
        
        
        // ## WOW Animation
        if ($('.wow').length) {
            var wow = new WOW({
                boxClass: 'wow', // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 0, // distance to the element when triggering the animation (default is 0)
                mobile: false, // trigger animations on mobile devices (default is true)
                live: true // act on asynchronously loaded content (default is true)
            });
            wow.init();
        }

        // ## cursor
        function cursor() {
            var myCursor = jQuery(".nox-mouse");
            if (myCursor.length) {
                if ($("body")) {
                    const e = document.querySelector(".nox-mouse-inner"),
                        t = document.querySelector(".nox-mouse-outer");
                    let n,
                        i = 0,
                        o = !1;
                    (window.onmousemove = function (s) {
                        o ||
                        (t.style.transform =
                            "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                            (e.style.transform =
                                "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                            (n = s.clientY),
                            (i = s.clientX);
                    }),
                        $("body").on(
                            "mouseenter",
                            "a, .nav-menu, .choose-themes",
                            function () {
                                e.classList.add("mouse-hover"), t.classList.add("mouse-hover");
                            }
                        ),
                        $("body").on(
                            "mouseleave",
                            "a, .nav-menu, .choose-themes",
                            function () {
                                ($(this).is("a") && $(this).closest(".nav-menu").length) ||
                                (e.classList.remove("mouse-hover"),
                                    t.classList.remove("mouse-hover"));
                            }
                        ),
                        (e.style.visibility = "visible"),
                        (t.style.visibility = "visible");
                }
            }
        }
        if ($('.nox-mouse').length) {
                let isMobile = false;
                (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) isMobile = true;})(navigator.userAgent||navigator.vendor||window.opera);
                if(isMobile){
                    $('.nox-mouse-outer').css('display' , 'none');
                    $('.nox-mouse-inner').css('display' , 'none');
                }else {
                    cursor()
                }
        }



    });
    
    
    /* ==========================================================================
       When document is resize, do
       ========================================================================== */

    $(window).on('resize', function () {
        var mobileWidth = 992;
        var navcollapse = $('.navigation li.dropdown');
        navcollapse.children('ul').hide();
        navcollapse.children('.megamenu').hide();

    });

    $(window).on('scroll', function () {

        // ## Header Style and Scroll to Top
        function headerStyle() {
            if ($('.main-header').length) {
                var windowpos = $(window).scrollTop();
                var siteHeader = $('.main-header');
                var scrollLink = $('.scroll-top');
                if (windowpos >= 100) {
                    siteHeader.addClass('fixed-header');
                    scrollLink.fadeIn(300);
                } else {
                    siteHeader.removeClass('fixed-header');
                    scrollLink.fadeOut(300);
                }
            }
        }

        headerStyle();

    });

    /* ==========================================================================
       When document is loaded, do
       ========================================================================== */

    $(window).on('load', function () {

        // ## Preloader
        function handlePreloader() {
            if ($('.preloader').length) {
                $('.preloader').delay(200).fadeOut(500);
            }
        }
        handlePreloader();

        function typedJS() {

            "use strict";

            var options = {
                strings: $(".element").attr('data-elements').split(','),
                typeSpeed: 100,
                backDelay: 3000,
                backSpeed: 50,
                loop: true
            };
            var typed = new Typed(".element", options);
        }
        if ($('.element').length) {
            typedJS()
        }


        // ## Project Filtering
        if ($('.project-masonry-active').length) {
            $(this).imagesLoaded(function () {
                $('.project-masonry-active').isotope({
                    // options
                    itemSelector: '.item',
                });
            });
        }
          
        
        // ## Blog Standard
        if ($('.blog-standard-wrap').length) {
            $(this).imagesLoaded(function () {
                $('.blog-standard-wrap').isotope({
                    // options
                    itemSelector: '.item',
                });
            });
        }
          
        
    });


})(window.jQuery);
$(document).ready(function() {
    $('form').submit(function(e) {
        e.preventDefault();
        
        // نمایش اسپینر
        $('.send-btn').html('<i class="fas fa-spinner fa-spin"></i> در حال ارسال...');
        
        // ارسال داده با AJAX
        $.ajax({
            url: 'contact.php',
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    // نمایش پیام موفقیت
                    Swal.fire({
                        icon: 'success',
                        title: 'موفقیت آمیز',
                        text: response.message,
                        confirmButtonText: 'باشه'
                    });
                    
                    // ریست فرم
                    $('form')[0].reset();
                } else {
                    // نمایش خطاها
                    let errorText = response.message + '\n\n';
                    response.errors.forEach(error => {
                        errorText += '• ' + error + '\n';
                    });
                    
                    Swal.fire({
                        icon: 'error',
                        title: 'خطا',
                        text: errorText,
                        confirmButtonText: 'متوجه شدم'
                    });
                }
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'خطا',
                    text: 'خطایی در ارتباط با سرور رخ داد',
                    confirmButtonText: 'باشه'
                });
            },
            complete: function() {
                $('.send-btn').html('ارسال پیام');
            }
        });
    });
});

const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

document.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;

  dot.style.top = clientY + "px";
  dot.style.left = clientX + "px";

  ring.style.top = clientY + "px";
  ring.style.left = clientX + "px";
});
