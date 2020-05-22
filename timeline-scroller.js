$(function () {
	$('.panel.timeline').wrap('<li class="timeline-item clearfix" />');
	$('.timeline-item').wrapAll('<ul class="timeline-container" />');
	$('.timeline-container').append('<div style="clear: both;" />');
	$('.timeline h2').wrap('<div class="timeline-button" />');
	$(window).on('scroll resize', checkIfInView);
	$(window).trigger('scroll');
});

function showPanel(item) {
	$('.timeline-button', item).addClass('active');
	$('.HtmlContent', item).addClass('in-view');
}

function hidePanel(item) {
	$('.timeline-button', item).removeClass('active');
	$('.HtmlContent', item).removeClass('in-view');
}
function checkIfInView(val) {
	var windowHeight = $(window).height(),
		windowWidth = $(window).width(),
		windowTopPosition = $(window).scrollTop(),
		windowBottomPosition = windowTopPosition + windowHeight;
		
	$('.timeline-item').each(function () {
		var timelineElement = $(this),
			elementHeight = timelineElement.outerHeight(),
			elementTopPosition = timelineElement.offset().top + 100,
			elementBottomPosition = timelineElement.offset().top;
			
		if (windowWidth < 768) {
			showPanel(timelineElement);
		} else if ((elementBottomPosition >= windowTopPosition) &&
		(elementTopPosition <= windowBottomPosition)) {
			showPanel(timelineElement);
		} else {
			hidePanel(timelineElement);
		}
	});
}