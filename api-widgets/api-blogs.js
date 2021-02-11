$(function () {

    class blogList extends HTMLElement {
        constructor() {
            super();

            var url = 'https://api.connectedcommunity.org/api/v2.0/Blogs/GetLatestEntries',
                maxResults = this.getAttribute('max-results'),
                communityKey = this.getAttribute('community-key'),
                ignoreStaff = this.getAttribute('ignore-staff'),
                descriptionLength = this.getAttribute('description-length'),
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
                }
            });

            function success(resp) {
                for (var i = 0; i < resp.length; i++) {
                    var currentElem,
                        text = $(resp[i].BlogText).text()

                    text = $.trim(text);
                    if (!!descriptionLength) {
                        text = text.substring(0, descriptionLength);
                        text += '...';
                    }

                    var date = new Date(resp[i].PublishedOn),
                        dateTime = date.toLocaleTimeString(),
                        dateDate;

                    var dateFormat = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

                    dateDate = dateFormat.format(date);
                    
                    var dateText = dateTime + ', ' + dateDate;
                    $('<div class="blog-elem" />').appendTo('blog-list');
                    currentElem = $('blog-list .blog-elem:last-child');
                    $(currentElem).append('<h3><a href="' + resp[i].LinkToReadBlog + '">' + resp[i].BlogTitle + '</a></h3><h5><strong>By: </strong><a href=" ' + resp[i].Author.LinkToProfile + '">' + resp[i].Author.FirstName + ' ' + resp[i].Author.LastName + '</a></h5><h5><strong>Date:</strong> ' + dateText + '</h5>' + text);
                }
            }

        }
    }
    customElements.define('blog-list', blogList);
});