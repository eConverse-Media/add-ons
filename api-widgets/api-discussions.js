$(function () {

    class discussionList extends HTMLElement {
        constructor() {
            super();

            var url = 'https://api.connectedcommunity.org/api/v2.0/Discussions/GetDiscussionPosts',
                maxResults = this.getAttribute('max-results'),
                discussionKey = this.getAttribute('discussion-key'),
                includeStaff = this.getAttribute('include-staff'),
                hasParams = false;

            if (!!maxResults) {
                url += (hasParams ? '&' : '?') + 'maxToRetrieve=' + maxResults;
                hasParams = true;
            }
            if (!!discussionKey) {
                url += (hasParams ? '&' : '?') + 'discussionKey=' + discussionKey;
                hasParams = true;
            }
            if (!!includeStaff) {
                url += (hasParams ? '&' : '?') + 'includeStaff=' + includeStaff;
                hasParams = true;
            }

            $.ajax({
                url: url,
                type: "GET",
                datatype: 'json',
                success: success,
                headers: {
                    'HLIAMKey': '78e2c103-9b11-4e73-bb3d-5ecb6cf4005c'
                }
            });

            function success(resp) {
                for (var i = 0; i < resp.length; i++) {

                    var currentElem;

                    var date = new Date(resp[i].DatePosted),
                        dateTime = date.toLocaleTimeString(),
                        dateDate;

                    var dateFormat = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

                    dateDate = dateFormat.format(date);
                    var dateText = dateTime + ', ' + dateDate;

                    $('<div class="discussion-post" />').appendTo('discussion-list');
                    currentElem = $('discussion-list .discussion-post:last-child');
                    $(currentElem).append('<h3><a href="' + resp[i].LinkToMessage + '">' + resp[i].DiscussionName + '</a></h3><h5><strong>By: </strong><a href=" ' + resp[i].Author.LinkToProfile + '">' + resp[i].Author.FirstName + ' ' + resp[i].Author.LastName + '</a></h5><h5><strong>Date:</strong> ' + dateText + '</h5><div>' + resp[i].Body + '</div>');
                }
            }

        }
    }
    customElements.define('discussion-list', discussionList);
});