$(function () {


    $('div[id*="ResultPanel"].SearchResults.HLLandingControl').parent().prepend('<div class="dropdown-group"><div class="HtmlContent"></div></div>');


    $(".SearchResults.HLLandingControl ul li").each(function () {
        var self = $(this),
            tags = $(self)
                .find('a.label-search-tag')
                .toArray();
        var title = $(self).find('h3');
        var href = $(title).find('a').attr('href');
        var contentTag = $(self).find('a.label-search-tag[aria-label*="Content Type"]');
        var contentHref = $(contentTag).attr('href');
        var nameBlock = $(self).find('div[id*="NameBlock"]');
        $(nameBlock).append($('<a href="' + contentHref + '" class="content-type-tags ' + $(contentTag).text().trim() + '">' + $(contentTag).text().trim() + '</a>'));
        var fileType = $(self).find('.HLMListDocType:first-of-type');
        $(title).parent().parent().prepend('<a href="' + href + '"><div class="img-container"/></a>');

        //   Set Image for img-container if ther is an image in description
        var entryImg = $(self).find('.row.margin-bottom-medium > .col-md-12 img');

        //Set Image for img-container if there is an image in the attachments section and no image is present in the description 
        if ($(entryImg).length === 0) {
            var entryImg = $(self).find('div[id*="fileListInlineWrapper"] .listIconContainer div[id*="pnlImages"] a img');
        }

        var entryImgSrc = $(entryImg).attr('src');
        var imgContainer = $(self).find('.img-container');
        $(imgContainer).css('background-image', 'url("' + entryImgSrc + '")');

        if ($(imgContainer).css('background-image') === 'url("https://baldrigefoundation.connectedcommunity.org/communities/community-home/undefined")') {
            $(fileType).clone().appendTo(imgContainer);
        }

        var entryAttachementList = $(self).find('.libListReptEntAttchLble');
        $(entryAttachementList).parent().addClass('attachment-wrap');

        $(self).addClass("iso");

        if (tags.length) {
            for (var i = 0; i < tags.length; i++) {
                var tag = $(tags[i])
                    .attr("data-tag")
                    .toLowerCase();
                tag = tag.replace(/\\|\//, "");
                tag = tag.replace(/\s+/g, "-");
                $(self).addClass(tag);
            }
        }
    });

    makinFilters();

    // $('.dropdown-group:not(.top-dropdown-groups)').addClass('col-md-3');

    $(".filter-label").click(function () {
        $(this)
            .parent()
            .toggleClass("open");
    });

    $(".SearchResults.HLLandingControl .Content > ul ").isotope({
        itemSelector: "li"
    });

    var groupFilterButtons = $('.filter-button-group')

    $(groupFilterButtons).each(function (i) {

        w = window;

        var filterButtonGroupEach = groupFilterButtons[i];

        firstFilterClass = filterButtonGroupEach.className.split(" ")[0];


        w['arr_' + firstFilterClass] = [];

    });


    // Update Filters When Drop down input clicked
    $(".checkbox-filter input").click(function () {
        var self = $(this),
            parent = $(self).parents(".filter-button-group"),
            selectors = $(parent)
                .find(".checkbox-filter input")
                .toArray(),
            parentGroup = $(parent)
                .attr("class")
                .split(/\s+/)[0],
            label = $(parent).find(".filter-label"),
            text = $(self)
                .attr("id")
                .toLowerCase(),
            labelText,
            defaultText = "Filter by";

        //toggle active class
        $(self).toggleClass("active");

        //check for show all
        var dataFilter = $(self).attr("data-filter");
        if (!dataFilter && $(self).hasClass("active")) {
            for (var i = 1; i < selectors.length; i++) {
                var checkbox = selectors[i];
                $(checkbox).removeClass("active");
                checkbox.checked = false;
            }
        } else {
            $(selectors[0]).removeClass("active");
            selectors[0].checked = false;
        }

        // set dropdown label text
        text = text.replace("-", " ");

        filterButtonGroup = $('.filter-button-group');

        $(filterButtonGroup).each(function (i) {

            var filterButtonFirstElement = filterButtonGroup[i];
            var elementFirstClass = filterButtonFirstElement.className.split(" ")[0];
            var classConversion = elementFirstClass.replace(/-/g, ' ');

            switch (parentGroup) {

                case elementFirstClass:
                    if (!dataFilter) {
                        w['arr_' + elementFirstClass] = [];
                    }
                    labelText = w['arr_' + elementFirstClass];
                    defaultText += " " + classConversion;
                    break;
            }

        });

        if ($(self).hasClass("active") && !!text && text !== "all") {
            labelText.push(text);
        } else {
            var index = labelText.indexOf(text);
            if (index !== -1) {
                labelText.splice(index, 1);
            }
        }

        if (labelText.length) {
            labelText = labelText.join(", ");
            $(label).text(labelText);
            $(parent)
                .find(".filter-content")
                .addClass("has-selection");
        } else {
            $(label).text(defaultText);
            $(parent)
                .find(".filter-content")
                .removeClass("has-selection");
        }

        updateFilters();

    });

    $(document).click(function (e) {
        var target = e.target,
            selector;

        if ($(target).parents(".filter-content").length) {
            var parent = $(target).parents(".filter-content"),
                klass = $(parent)
                    .parent()
                    .attr("class")
                    .split(/\s+/)[0];
            selector = ".filter-button-group:not(." + klass + ") .filter-content";
        } else {
            selector = ".filter-content";
        }
        $(selector).removeClass("open");
    });



});

function updateSelection(val, klass, filters) {
    var checkboxes = $(val)
        .find(".active")
        .toArray(),
        localFilters = [];

    $(checkboxes).each(function () {
        var dataFilter = $(this).attr("data-filter");
        localFilters.push(dataFilter);
    });

    if (klass.indexOf("-") > -1) {
        klass = klass.substring(0, klass.indexOf("-"));
    }

    filters[klass] = localFilters;
}

function updateFilters() {
    var groups = $(".filter-button-group").toArray(),
        filters = {};

    $(groups).each(function () {
        var self = $(this),
            klass = $(self)
                .attr("class")
                .split(/\s+/)[0],
            selector = "." + klass;

        updateSelection(selector, klass, filters);
    });

    var filterVal = concatFilters(filters);

    $(".SearchResults.HLLandingControl .Content > ul ").isotope({
        filter: filterVal
    });
}

function concatFilters(obj) {
    var allFilters = [];

    for (var prop in obj) {
        var group = obj[prop];
        if (!group.length) {
            continue;
        }

        if (!allFilters.length) {
            allFilters = group.slice(0);
            continue;
        }

        var nextFilterList = [];

        for (var i = 0; i < allFilters.length; i++) {
            for (var j = 0; j < group.length; j++) {
                var item = allFilters[i] + group[j];
                nextFilterList.push(item);
            }
        }

        allFilters = nextFilterList;
    }

    allFilters = allFilters.join(", ");

    return allFilters;
}

function makinFilters() {

    categoryList = [];

    $('.label-search-tag').each(function () {
        var self = $(this);
        categoriesMaster = {};
        var ariaLabels = $(self).attr('aria-label');
        var filterCategory = ariaLabels.indexOf(':');
        var categoryValue = ariaLabels.slice(6, filterCategory);
        var tagValueStart = ariaLabels.indexOf('tag=') + 4;
        var tagValue = ariaLabels.slice(tagValueStart, ariaLabels.length);
        categoriesMaster.categoryType = categoryValue;
        categoriesMaster.tag = tagValue;
        categoryList.push(categoriesMaster);

    });

    categoryList.forEach(function (category) {

        var categoryTypeClassConversion = category.categoryType;
        categoryTypeClassConversion = categoryTypeClassConversion.replace(/\s+/g, '-').toLowerCase();

        var categoryTagClassConversion = category.tag;
        categoryTagClassConversion = categoryTagClassConversion.replace(/\\|\//, "").replace(/\s+/g, '-').toLowerCase();

        if ($('.dropdown-group .HtmlContent > div.' + categoryTypeClassConversion + '.filter-button-group').length === 0) {
            $('.dropdown-group .HtmlContent').append('<div class="' + categoryTypeClassConversion + ' filter-button-group "><div class="filter-content"><span class="filter-label">Filter by ' + category.categoryType + '</span><ul class="multiple-select"></ul></div></div>');
        }

        if ($('.filter-button-group').hasClass(categoryTypeClassConversion)) {
            if ($('ul.multiple-select > li.checkbox-filter label input[data-filter=".' + categoryTagClassConversion + '"]').length === 0) {
                $('div.' + categoryTypeClassConversion + '.filter-button-group ul.multiple-select').append('<li class="checkbox-filter"><label class="container"><input type="checkbox" id="' + category.tag + '" data-filter=".' + categoryTagClassConversion + '">' + category.tag + '<span class="checkmark"></span></label></li>');
            }
        }

    });

    $('.filter-button-group').wrapAll('<div class="row "/>');

    $('.filter-button-group .filter-content .multiple-select').prepend('<li class="checkbox-filter"><label class="container"><input type="checkbox" id="all" data-filter="">Show All Types<span class="checkmark"></span></label></li>');

}