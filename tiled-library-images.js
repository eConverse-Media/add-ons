$(function () {
    $('.library-list').each(function () {
        var self = $(this),
            content = $(self).find('.margin-bottom-medium > .col-md-12'),
            img = $(content).find('img:first-of-type');

        $(self).prepend('<div class="img-container" />');
        $(self).find('.img-container').css('background-image', 'url("' + $(img).attr('src') + '")');
    });
});