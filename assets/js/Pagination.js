var Pagination = new (function(data={}) {
    this.itemsPerPage = 10;
    this.length = 0;
    this.current = 1;

    var _callback = {
        onSetLength: []
    }

    this.getParam = function(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    this.setLength = function() {
        this.length = Math.ceil(Catalog.countProducts() / this.itemsPerPage)

        for (let idx in _callback.onSetLength) {
            _callback.onSetLength[idx](this.length);
        }
    };

    this.getPageRange = function() {
        let range = {
            start: 0,
            end: this.itemsPerPage
        };
        range.start = this.current * this.itemsPerPage - this.itemsPerPage + 1;
        range.end = range.start + this.itemsPerPage - 1;
        return range;
    };
});