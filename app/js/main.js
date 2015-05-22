var gallery = (function() {

    var init = function() {
            _setUpListeners();
        },

        _setUpListeners = function() {
            $('.gallery__link').on('click touchstart', _changeMainPhoto);
            $(document).on('ready', _changeWrapSize);
            $('.gallery__arrow').on('click touchstart', _changeSlideItems);
        },

        _changeMainPhoto = function(e) {
            e.preventDefault();
            var src = $(this).attr('href');
            var mainPhotoSrc = $('.gallery__main-img');
            mainPhotoSrc.attr('src', src);
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
});