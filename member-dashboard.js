$(function () {
    var name = $('.HLWelcomeHeader .panel-body h4').text(),
        greeting = '<div class="greeting"><span>Welcome back, </span><a href="profile">' + name + '</a></div>',
        linkToInbox = '/network/members/profile/myaccount/inbox/',
		unreadEmailCount = $('a[id^="Welcome_Details_MessagesCount"]').length !== 0 ? parseInt($('a[id^="Welcome_Details_MessagesCount"]').text()) : 0,
        emailContent = '<div class="email-content"><a href ="' + linkToInbox + '"><i class="ft ft-envelope"></i>' + unreadEmailCount + ' unread messages</a></div>',
        progressBar = $('#Welcome_Content div[id*="CompleteBarProgress"]').clone(),
        progressText = '<span class="progress-text">Profile Completion</span>';
        
    // create the first column
    $('.member-dashboard-img').wrap('<div class="user-details" />')
    $('.user-details').wrap('<div class="dashboard-col-1 col-md-4" />');
    $('.user-details').append(greeting);
    $('.greeting').append(emailContent);
    if (!!($.trim($(progressBar).html()))) {
        $('.dashboard-col-1').append(progressText);
        $('.dashboard-col-1').append(progressBar);
    }
    $('.dashboard-col-1').append($('.collapsed-message'));

    $('.dashboard-link').each(function () {
        $(this).appendTo('.dashboard-col-1');
    });

    // make the second column
    $('.get-started, .dashboard-btn').wrapAll('<div class="dashboard-col-2 col-md-4" />');
    $('.dashboard-btn').wrapAll('<div class="dashboard-btns" />');

    // make the dashboard
    $('div[class*="dashboard-col-"]').wrapAll('<div class="member-dashboard clearfix" />');
    $('.member-dashboard').wrapInner('<div class="row row-wide dashboard-inner clearfix" />');

    // handleToggle
    $('.dashboard-toggle').appendTo('.member-dashboard');
    checkForDesktop();
    $(window).on('resize orientationChange', function () {
        if ($(window).width() < 992 &&
        !($('.dashboard-inner .slick-track').html())) {
            slickify();
        }
    });

});

function slickify() {
    $('.dashboard-inner').slick({
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: false,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 992,
                settings: 'unslick'
            }
        ]
    });
}

function toggleDashboard() {
    var isOpen = !!($('.member-dashboard').hasClass('open'));

    if (isOpen) {
        handleClose();
    } else {
        handleOpen();
    }
}

function handleOpen() {
	$('.member-dashboard').addClass('open');
	$('.dashboard-toggle').addClass('open');
	$('.dashboard-toggle button').text('Collapse');
}

function handleClose() {
	$('.member-dashboard').removeClass('open');
    $('.dashboard-toggle').removeClass('open');
	$('.dashboard-toggle button').text('Expand');
	if ($(window).width() < 992) {
		$('.member-dashboard .slick-initialized').slick('slickGoTo', 0, false);
	}
	$('.member-dashboard > .row-wide').animate({
		scrollTop: 0
	});
}

function checkForDesktop() {
	if ($(window).width() > 991) {
		handleOpen();
		$('.toggle-content').hide();
	} else {
        handleClose();
        slickify();
	}
}