$(document).ready(function(){
    $('.slider__slider').slick({
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow-left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow-right.svg"></button>',
        responsive: [
            {
              breakpoint: 767,
              settings: {
                arrows: false,
                centerMode: true

              }
            }
          ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__main-content').eq(i).toggleClass('catalog-item__main-content_active');
                $('.catalog-item__list-content').eq(i).toggleClass('catalog-item__list-content_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__link_back');

    // Modals

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal-consultation__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    $('.button_min').each(function(i) {
      $(this).on('click', function() {
        // $('#oder, .modal-consultation__descr').text($('.catalog-item__descr').eg(i).text());
        $('.overlay, #order').fadeIn('slow');
      })
    });

    // Validation

    function validateForms(form) {
      $(form).validate({
        rules: {
          name: "required",
          phone: {
            required: true,
            minlength: 11
          },
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: "Введите имя",
          phone: {
            required: "Введите телефон",
            minlength: "Некорректный номер телефона"
          },
          email: {
            required: "Введите e-mail",
            email: "Некорректный формат"
          }
        }
      });
    };

    validateForms('#form-black');
    validateForms('#order form');
    validateForms('#consultation form');

    // Mask for phones

    $('input[name=phone]').mask("+7(999)999-99-99");

    $('form').submit(function(e){
      e.preventDefault();
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');
        $('form').trigger('reset');
    });

    // Smooth scroll and page up

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1300) {
        $('.page-up').fadeIn();
      } else {
        $('.page-up').fadeOut();
      }
    });

    $("a[href^='#']").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });

    new WOW().init();
});