$(function () {
    var start = 0,
        end = $('.fundraising-goal .HtmlContent').text(),
        current = $('.funds-raised .HtmlContent').text();

    end = end.replace(/[^0-9\.]+/g, '');
    current = current.replace(/[^0-9\.]+/g, '');

    end = parseInt(end);
    current = parseInt(current);

    var progressSoFar = Math.floor((current / end) * 288);
    
    if (progressSoFar > 288) {
        progressSoFar = 288;
    }

    var progressBar = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 24"><defs><style>.cls-1{fill:#f9f9f9;}.cls-2{fill:#db2638;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="prog-full"><circle class="cls-1" cx="12" cy="12" r="12"/><rect class="cls-1" x="12" y="4" width="288" height="16" rx="8"/><g id="prog-circle"><circle class="cls-2" cx="12" cy="12" r="12"/></g><g id="prog-bar"><rect class="cls-2" x="12" y="4" width="0" height="16" rx="8"><animate attributeType="XML" attributeName="width" to="' + progressSoFar + '" dur="3s" fill="freeze" /></rect></g></g></g></svg>'

    $('.fundraising-progress .HtmlContent').append(progressBar);
   

});