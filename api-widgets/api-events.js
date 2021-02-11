$(function () {

    class eventList extends HTMLElement {
        constructor() {
            super();

            var url = 'https://api.connectedcommunity.org/api/v2.0/Events/GetUpcoming',
                showImage = this.getAttribute('show-image'),
                maxResults = this.getAttribute('max-results');

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
                    $(currentElem).append('<h3><a href="' + resp[i].LinkToEventDetails + '">' + resp[i].EventTitle + '</a></h3><h5><strong>Date:</strong> ' + resp[i].FormatedDateRange + '</h5><div>' + resp[i].EventDescription + '</div>');
                }
            }

        }
    }
    customElements.define('event-list', eventList);
});