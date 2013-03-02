(function ($) {

    "use strict";

    $.fn._yp = function (options) {

        if (!options.data) throw new Error("Invalid Data");

        var container = this;

        container.empty();
        container.addClass("_yp");

        container.append(menu());

        function menu() {
            var categories = $("<ul class='col menu'></ul>");
            for (var label in options.data) categories.append(menu_item(label, options.data[label]));
            return categories;
        }

        function menu_item(label, data) {
            var item = $("<li class='item'>" + label + "</li>");
            item.click(function () {
                container.find(".menu .selected").removeClass("selected");
                item.addClass("selected");
                playlist(data);
            });
            return item;
        }

        function playlist(data) {
            container.find(".playlist").remove();
            container.find(".stage").remove();
            var stage = $("<ul class='col playlist'></ul>");
            container.append(stage);
            $(data).each(function (index, row) {
                stage.append(list_item(row));
            });
        }

        function list_item(data) {
            var item = $("<li class='item'>" + data.caption + "</li>");
            var timeout = (data.end - data.start + 1) * 1000;
            var url = "http://www.youtube.com/embed/" + data.id + "?start=" + data.start + "&end=" + data.end + "&autoplay=1";
            item.click(function (e) {
                container.find(".playlist .selected").removeClass("selected");
                item.addClass("selected");
                e.preventDefault();
                stage(url, timeout);
            });
            return item;
        }

        function stage(url, timeout) {
            container.find(".stage").remove();
            var element = $("<div class='col stage'></div>");
            element.append("<iframe width='480' height='360' src='" + url + "' frameborder='0' allowfullscreen></iframe>");
            container.append(element);
            if (timeout) setTimeout(function () {
                element.remove();
            }, timeout);
        }

    };

})(window.jQuery);
