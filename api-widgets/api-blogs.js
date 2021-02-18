$(function () {

    class blogList extends HTMLElement {
        constructor() {
            super();

            var url = 'https://api.connectedcommunity.org/api/v2.0/Blogs/GetLatestEntries',
                maxResults = this.getAttribute('max-results'),
                communityKey = this.getAttribute('community-key'),
                ignoreStaff = this.getAttribute('ignore-staff'),
                descriptionLength = this.getAttribute('description-length'),
                titleLength = this.getAttribute('title-length'),
                includeAuthorImg = this.getAttribute('author-img'),
                includeCommunity = this.getAttribute('include-community'),
                includeRating = this.getAttribute('show-rating'),
                includeComments = this.getAttribute('show-comments'),
                body = {};

                if (!!maxResults) {
                    body["MaxRecords"] = parseInt(maxResults);
                }
                if (!!communityKey) {
                    body["CommunityKeyFilter"] = communityKey;
                }
                if (!!ignoreStaff) {
                    body["IgnoreStaffBlogs"] = ignoreStaff;
                }

            $.ajax({
                url: url,
                type: "POST",
                datatype: "json",
                contentType: "application/json; charset=utf-8",
                success: success,
                headers: {
                    "HLIAMKey": "78e2c103-9b11-4e73-bb3d-5ecb6cf4005c"
                },
                data: $.isEmptyObject(body) ? null : JSON.stringify(body)
            });

            function success(resp) {
                for (var i = 0; i < resp.length; i++) {
                    var currentElem,
                        text = $.parseHTML(resp[i].BlogText);

                    $('<div class="blog-elem" />').appendTo('blog-list');
                    currentElem = $('blog-list .blog-elem:last-child');

                    var date = new Date(resp[i].PublishedOn),
                        dateTime = date.toLocaleTimeString(),
                        dateDate;

                    var dateFormat = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

                    dateDate = dateFormat.format(date);
                    
                    var dateText = dateTime + ', ' + dateDate;

                    var title = resp[i].BlogTitle;

                    if (!!titleLength) {

                        title = title.substring(0, titleLength);
                    }
        
                    $(currentElem).append('<div class="text-container"><h3><a href="' + resp[i].LinkToReadBlog + '">' + title + '</a></h3><div class="byline-date-block"></div>');

                    if (!!includeAuthorImg) {
                        $(currentElem).find('.byline-date-block').append('<img src="' + resp[i].Author.PictureUrl + '" class="img-responsive" />');
                    }

                    $(currentElem).find('.byline-date-block').append('<div class="byline-date"><h5 class="author-details"><strong>By:</strong>&nbsp;<a href=" ' + resp[i].Author.LinkToProfile + '">' + resp[i].Author.FirstName + ' ' + resp[i].Author.LastName + '</a></h5></div>');

                    $(currentElem).find('.byline-date-block .byline-date').append('<h5 class="entry-date"><strong>Date:</strong>&nbsp;' + dateText + '</h5>');

                    if (!!includeCommunity &&
                        resp[i].Community.CommunityName != null) {
                        $(currentElem).find('.text-container').append('<h4 class="community-name">' + resp[i].Community.CommunityName + '</h4>');
                    }

                    $(currentElem).find('.text-container').append('<div class="description-text" />');

                    var descriptionText = $(currentElem).find('.description-text');

                    for (var j = 0; j < text.length; j++) {
                        if ($(text[j]).is('img')) {
                            $(currentElem).prepend(text[j]);
                            $(currentElem).find('> img:first-child').wrap('<div class="img-container" />');
                            text.splice(j, 1);
                            j--;
                        } else if ($(text[j]).is('figure') &&
                        $(text[j]).hasClass('image')) {
                            var image = $(text[j]).find('img');
                            $(currentElem).prepend(image);
                            $(currentElem).find('> img:first-child').wrap('<div class="img-container" />');
                            text.splice(j, 1);
                            j--;
                        } else {
                            $(descriptionText).append(text[j]);
                        }
                    }

                    if (!!descriptionLength) {
                        var plainText = $(descriptionText).text();

                        plainText = plainText.substring(0, descriptionLength);
                    

                        $(descriptionText).text(plainText);
                    }

                    if (!!includeRating) {
                        $(currentElem).find('.text-container').append('<h6 class="blog-rating">Rating: ' + resp[i].RatingCount + '</h6>')
                    }

                    if (!!includeComments) {
                        $(currentElem).find('.text-container').append('<h6 class="blog-comments">Comments: ' + resp[i].CommentCount + '</h6>')
                    }
                }
            }

        }
    }
    customElements.define('blog-list', blogList);
});