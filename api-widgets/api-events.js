$(function () {

    class eventList extends HTMLElement {
        constructor() {
            super();

            var url = 'https://api.connectedcommunity.org/api/v2.0/Events/GetUpcoming',
                showImage = this.getAttribute('show-image'),
                maxResults = this.getAttribute('max-results'),
                showCommunity = this.getAttribute('show-community'),
                showEventType = this.getAttribute('show-event-type');

            if (!!maxResults) {
                url += '?maxRecords=' + maxResults;
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
                    $('<div class="event-elem" />').appendTo('event-list');
                    currentElem = $('event-list .event-elem:last-child');

                    if (!!resp[i].PictureUrl && showImage) {
                        $(currentElem).append('<img class="img-responsive" src="' + resp[i].PictureUrl + '"/>');
                    }
                    $(currentElem).append('<div class="text-container"><h3><a href="' + resp[i].LinkToEventDetails + '">' + resp[i].EventTitle + '</a></h3><h5><strong>Date:</strong> ' + resp[i].FormatedDateRange + '</h5><div>' + resp[i].EventDescription + '</div></div>');

                    if (!!showCommunity) {
                        $(currentElem).append('<h4 class="community-name">' + resp[i].Community.CommunityName + '</h4>');
                    }

                    if (!!showEventType) {
                        $(currentElem).find('.text-container').append('<h4 class="event-type">' + resp[i].EventType.EventTypeName + '</h4>');
                    }
                }
            }

        }
    }
    customElements.define('event-list', eventList);
});