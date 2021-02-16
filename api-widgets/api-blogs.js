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
                data: JSON.stringify(body)
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
        
                    $(currentElem).append('<h3><a href="' + resp[i].LinkToReadBlog + '">' + title + '</a></h3><h5><strong>By: </strong><a href=" ' + resp[i].Author.LinkToProfile + '">' + resp[i].Author.FirstName + ' ' + resp[i].Author.LastName + '</a></h5><h5><strong>Date:</strong> ' + dateText + '</h5>');

                    $(currentElem).append('<div class="description-text" />');

                    var descriptionText = $(currentElem).find('.description-text');

                    for (var j = 0; j < text.length; j++) {
                        if ($(text[j]).is('img')) {
                            $(currentElem).prepend(text[j]);
                            text.splice(j, 1);
                            j--;
                        } else if ($(text[j]).is('figure') &&
                        $(text[j]).hasClass('image')) {
                            var image = $(text[j]).find('img');
                            $(currentElem).prepend(image);
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

                }
            }

        }
    }
    customElements.define('blog-list', blogList);
});