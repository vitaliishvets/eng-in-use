var SLOW_SCROLL_URLS = ['/price.html', '/']
// Проба настройки закрытия меню по клику вне элемента. Не настроено.
// function menuTrigger(e) { // событие клика по веб-документу
//     var menuButton = $("#menu-button")

//     if ($(menuButton).hasClass('menu-opened')) {
//       $(menuButton).click();
//     }
// }

// jQuery(function($) {
//   $('#mainmenu').on('mouseover', function(e) {
//     $(document).off('click', menuTrigger);
//   });

//   $('#mainmenu').on('mouseout', function(e) {
//     $(document).on('click', menuTrigger);
//   });

//   $(document).on('touchend', function(e) {
//     console.log(e.target, $(e.target).parent().hasClass('has-sub'));

//     if ($(e.target).parents('.header-menu').length === 0
//       || !$(e.target).parent().hasClass('has-sub')) {
//       menuTrigger(e);
//       $('#mainmenu').parent().click();
//       console.log('trigger');
//     }
//   });

// });

jQuery(function ($) {
    'use strict';

    /* Back Top Link acive
    ========================================================*/
    var offset = 200;
    var duration = 500;
    $(window).scroll(function() {
      if ($(this).scrollTop() > offset) {
        $('.back-to-top').fadeIn(400);
      } else {
        $('.back-to-top').fadeOut(400);
      }
    });

    $('.back-to-top').on('click',function(event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 600);
      return false;
    });

    /*============================================
      Page Preloader // вроде не используется
      ==============================================*/
    $(window).on('load', function () {
        $('#page-loader').fadeOut(500);
    });

    /*============================================
      jQueryValidator
      ==============================================*/
      // $("#ContactForm2").validate({
      //   rules: {
      //     user_name: {
      //       required: true
      //     },
      //     user_phone: {
      //       required: true
      //       // number: true
      //     },
      //     user_email: {
      //       required: true,
      //       email: true
      //     }
      //   },
      // });

    /*============================================
      MENU MAKER
      ==============================================*/
    $("#mainmenu").menumaker({
        // title: "МЕНЮ",
        // выводит меню при размере экрана
        // шириной менее 1024px
        breakpoint: 768,
        format: "multitoggle"
    });

    /*============================================
      SEARCH
      ==============================================*/
    $('.search-icon a').on('click', function(){ 
        $('.search-container').slideToggle('fast');
        $(".search-icon a span").toggleClass("ion-search ion-close");
        return false;
    });

    /*============================================
      ПЛАВНЫЙ СКРОЛЛ ПО СТРАНИЦЕ К ФОРМЕ ЗАЯВКИ
      ==============================================*/
    //// настройка плавного скролла с учитыванием высоты навигации вверху страницы
    // var navHeight = $('a').outerHeight();
    // Плавная перемотка по странице ссылок на id
    if (SLOW_SCROLL_URLS.includes(window.location.pathname)) {

        $('.main-section').on('click','a', function (event) {
              //отменяем стандартную обработку нажатия по ссылке
              event.preventDefault();
          //забираем идентификатор блока с атрибута href
          var id  = $(this).attr('href'),
              //узнаем высоту от начала страницы до блока на который ссылается якорь
              // top = $(id).offset().top - navHeight;
              top = $(id).offset().top;

        //анимируем переход на расстояние - top за 900 мс
        $('body,html').animate({
          scrollTop: top}, 1300);
        });


        $('.contact-item__btn').on('click','a', function (event) {
            //отменяем стандартную обработку нажатия по ссылке
            event.preventDefault();
        //забираем идентификатор блока с атрибута href
        var id  = $(this).attr('href'),
            //узнаем высоту от начала страницы до блока на который ссылается якорь
            // top = $(id).offset().top - navHeight;
            top = $(id).offset().top;

        //анимируем переход на расстояние - top за 900 мс
        $('body,html').animate({
          scrollTop: top}, 1300);
        });


        $('.price').on('click','a', function (event) {
            //отменяем стандартную обработку нажатия по ссылке
            event.preventDefault();
        //забираем идентификатор блока с атрибута href
        var id  = $(this).attr('href'),
            //узнаем высоту от начала страницы до блока на который ссылается якорь
            // top = $(id).offset().top - navHeight;
            top = $(id).offset().top;

        //анимируем переход на расстояние - top за 900 мс
        $('body,html').animate({
          scrollTop: top}, 900);
        });
           
    }

    /*============================================
      Counter // счетчик использовался в блоке со счетчиком, а он отключен
      ==============================================*/
    // if ($('.count').length)
    // {
    //     $('.count').counterUp({
    //         delay: 10,
    //         time: 1000
    //     });
    // }

    /*============================================ 
      Partners Slider
      ==============================================*/
    if ($('.t-slider').length)
    {
        $(".t-slider").owlCarousel({
            autoPlay: 13000, //Set AutoPlay to 13 seconds
            pagination: false,
            lazyLoad: true,
            items: 1
          });
    }

    /*============================================ 
      Portfolio Slider // вроде не используется
      ==============================================*/
    if ($('.portfolio-home-items').length)
    {
        $(".portfolio-home-items").owlCarousel({
        autoPlay: 5000, //Set AutoPlay to 3 seconds
        pagination:false,
        navigation:false,
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]
      });
    }

    /*============================================
      Project Filter
      ==============================================*/
    var isotopeContainer = $('.isotopeContainer');
    if( !isotopeContainer.length || !jQuery().isotope ) return;
    $(window).on('load', function () {
        isotopeContainer.isotope({
            itemSelector: '.isotopeSelector'
        });
        $('.isotopeFilters').on( 'click', 'a', function(e) {
            $('.isotopeFilters').find('.active').removeClass('active');
            $(this).parent().addClass('active');
            var filterValue = $(this).attr('data-filter');
            isotopeContainer.isotope({
                filter: filterValue
            });
            e.preventDefault();
        });
    });
    
    /*============================================
      Flex Slider //не используется. Для работы необходимо подключение flexslider.min.js
      ==============================================*/
    // if ($('.flexslider').length)
    // {
    //     $('.flexslider').flexslider({
    //         animation: "slide",
    //         controlNav: false,
    //         slideshowSpeed:5000
    //     }); 
    //     $('.flex-next').on('click', function(e){ 
    //         e.preventDefault();
    //         $('.flexslider').flexslider("play");
    //     });
    //     $('.flex-next').on('click', function(e){ 
    //         e.preventDefault();
    //         $('.flex-prev').flexslider("play");
    //     });
    // }

    /*============================================ 
      Parallax // не используется
      ==============================================*/
    // if ($('.parallax').length)
    // {
    //     $('.parallax').parallaxScroll({
    //         friction: 0.2
    //     });
    // }
    
    /*============================================
        Disqus Comments Blog
    =============================================*/
    // (function() { // DON'T EDIT BELOW THIS LINE
    // var d = document, s = d.createElement('script');
    // s.src = 'https://english-in-use-site.disqus.com/embed.js';
    // s.setAttribute('data-timestamp', +new Date());
    // (d.head || d.body).appendChild(s);
    // })();
});