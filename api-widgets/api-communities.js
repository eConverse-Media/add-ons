$(function () {

    class communitiesList extends HTMLElement {
        constructor() {
            super();

            var url = 'https://api.connectedcommunity.org/api/v2.0/Communities/GetViewableCommunities',
                includeStats = this.getAttribute('include-statistics');

            if (!!includeStats){
                url += '?includeStatistics=' + includeStats;
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
                    $('<div class="community-elem" />').appendTo('communities-list');
                    currentElem = $('communities-list .community-elem:last-child');
                    $(currentElem).append('<h3><a href="' + resp[i].LinkToCommunity + '">' + resp[i].CommunityName + '</a></h3><div class="community-stats"><span>Blog entries: ' + resp[i].Statistics.BlogCount + ' </span><span>Library entries: ' + resp[i].Statistics.DocumentCount + ' </span><span>Members: ' + resp[i].Statistics.MemberCount + ' </span><span>Discussion posts: ' + resp[i].Statistics.DiscussionPostCount + '</span></community-stats><div>' + resp[i].Description + '</div>');
                }
            }

        }
    }
    customElements.define('communities-list', communitiesList);
});