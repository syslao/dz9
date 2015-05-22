var gallery = (function() {

    var init = function() {
            _setUpListeners();
        },

        _setUpListeners = function() {
            $('.gallery__link').on('click', _changeMainPhoto);
            $(document).on('ready', _changeWrapSize);
            $('.gallery__arrow').on('click', _changeSlideItems);
        },

        _changeMainPhoto = function(e) {
            e.preventDefault();
            var src = $(this).attr('href');
            $('.gallery__main-img').attr('src', src);
        },
        _changeWrapSize = function() {
            var wrap = $('.gallery__list-wrap');
            var width = 0;


            wrap.children().each(function(){
               width += $(this).width() + parseInt($(this).css('margin-right'));
            });
            wrap.css('width', width);
        },
        _changeSlideItems = function(e) {
            e.preventDefault();
            if($(this).hasClass('gallery__arrow-right')) {
                var wrap = $('.gallery__list-wrap');
                var firstChild = wrap.children('.gallery__item:first-child');
                var firstChildClone = firstChild.clone(true);
                firstChild.remove();
                wrap.append(firstChildClone);
            } else if($(this).hasClass('gallery__arrow-left')){
                var wrap = $('.gallery__list-wrap');
                var lastChild = wrap.children('.gallery__item:last-child');
                var lastChildClone = lastChild.clone(true);
                lastChild.remove();
                wrap.prepend(lastChildClone);
            }
        };

    return {
        init: init
    };

})();

$(document).ready(function(){
    gallery.init();

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.up').fadeIn();
        } else {
            $('.up').fadeOut();
        }
    });
    $('.up').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });
});
