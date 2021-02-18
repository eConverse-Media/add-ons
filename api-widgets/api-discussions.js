$(function () {

    class discussionList extends HTMLElement {
        constructor() {
            super();

            var url = 'https://api.connectedcommunity.org/api/v2.0/Discussions/GetDiscussionPosts',
                maxResults = this.getAttribute('max-results'),
                discussionKey = this.getAttribute('discussion-key'),
                includeStaff = this.getAttribute('include-staff'),
                descriptionLength = this.getAttribute('description-length'),
                showAuthorImg = this.getAttribute('author-img'),
                showDiscussionName = this.getAttribute('show-community'),
                body = {};

            if (!!maxResults) {
                body['MaxNumberToRetrieve'] = parseInt(maxResults);
            }
            if (!!discussionKey) {
                body['DiscussionKeyFilter']= discussionKey;
            }
            if (!!includeStaff) {
                body['IncludeStaffPosts'] = includeStaff;
            }
            if (!!descriptionLength) {
                body['MaxContentLength'] = parseInt(descriptionLength);
            }


            $.ajax({
                url: url,
                type: "POST",
                datatype: 'json',
                contentType: "application/json; charset=utf-8",
                success: success,
                headers: {
                    'HLIAMKey': '78e2c103-9b11-4e73-bb3d-5ecb6cf4005c'
                },
                data: $.isEmptyObject(body) ? null : JSON.stringify(body)
            });

            function success(resp) {
                for (var i = 0; i < resp.length; i++) {

                    var currentElem;

                    var date = new Date(resp[i].CreatedOn),
                        dateTime = date.toLocaleTimeString(),
                        dateDate;

                    var dateFormat = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

                    dateDate = dateFormat.format(date);
                    var dateText = dateTime + ', ' + dateDate;

                    $('<div class="discussion-post" />').appendTo('discussion-list');
                    currentElem = $('discussion-list .discussion-post:last-child');
                    $(currentElem).append('<h3><a href="' + resp[i].LinkToReadPosts + '">' + resp[i].Subject + '</a></h3><div class="byline-date-block"><div class="byline-date"><h5 class="author-details"><strong>By: </strong><a href=" ' + resp[i].LinkToAuthorProfile + '">' + resp[i].FirstLast + '</a></h5><h5 class="byline-date"><strong>Date:</strong> ' + dateText + '</h5></div></div><div>' + resp[i].Content + '</div>');

                    if (!!showAuthorImg && 
                        !!resp[i].IsImageExist) {
                        $(currentElem).find('.byline-date-block').prepend('<img src="' + resp[i].PictureUrl + '" />');
                    }

                    if (!!showDiscussionName) {
                        $(currentElem).append('<h4 class="community-name">' + resp[i].DiscussionName + '</h4>');
                    }
                }
            }

        }
    }
    customElements.define('discussion-list', discussionList);
});