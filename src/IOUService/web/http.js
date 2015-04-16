function Http() {
    this.get = function (url, callback, data) {
        $.ajax({
            url: url,
            type: "GET",
            data: data,
            success: callback
        });
    };
}