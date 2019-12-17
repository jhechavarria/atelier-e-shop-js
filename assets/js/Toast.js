var Toast = new (function() {
    var toast =
    '<div class="toast">'+
        '<div class="toast-header">'+
            '<strong class="mr-auto text-primary"></strong>'+
            '<small class="text-muted"></small>'+
            '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast">&times;</button>'+
        '</div>'+
        '<div class="toast-body"></div>'+
    '</div>';

    this.add = function({ title, info, body, duration, color }) {
        $toast = $(toast);
        $('.text-primary', $toast).text(title);
        $('.text-muted', $toast).text(info);
        $('.toast-body', $toast).text(body);
        $toast.addClass('bg-' + color)
        $toast.toast({
            animation: true,
            autohide: true,
            delay: duration
        })
        .appendTo('.toasts')
        .toast('show');
    };
});