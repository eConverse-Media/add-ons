$(function () {

    class libraryEntryList extends HTMLElement {
        constructor() {
            super();

            var url = 'https://api.connectedcommunity.org/api/v2.0/ResourceLibrary/GetLibraryDocuments',
                maxResults = this.getAttribute('max-results'),
                libraryKey = this.getAttribute('library-key'),
                body = {};

                

            $.ajax({
                url: url,
                type: "POST",
                datatype: 'json',
                success: success,
                headers: {
                    'HLIAMKey': '78e2c103-9b11-4e73-bb3d-5ecb6cf4005c'
                },
                body: body
            });

            function success(resp) {
                for (var i = 0; i < resp.length; i++) {
                    var currentElem;
                    $('<div class="library-entry" />').appendTo('library-entry-list');
                    currentElem = $('library-entry-list .library-entry:last-child');

                    var date = new Date(resp[i].CreatedOn),
                        dateTime = date.toLocaleTimeString(),
                        dateDate;

                    var dateFormat = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

                    dateDate = dateFormat.format(date);
                    var dateText = dateTime + ', ' + dateDate;

                    $(currentElem).append('<h3><a href="' + resp[i].LinkToLibraryDocument + '">' + resp[i].DocumentTitle + '</a></h3><h5><strong>By: </strong><a href=" ' + resp[i].CreatedByContact.LinkToProfile + '">' + resp[i].CreatedByContact.FirstName + ' ' + resp[i].CreatedByContact.LastName + '</a></h5><h5><strong>Date:</strong> ' + dateText + '</h5><div>' + resp[i].Description + '</div>');
                }
            }

        }
    }
    customElements.define('library-entry-list', libraryEntryList);
});