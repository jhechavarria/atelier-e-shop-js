var Toast = new (function() {
    var toast =
    '<div class="toast fixed-top">'+
        '<div class="toast-header">'+
            '<strong class="mr-auto text-primary"></strong>'+
            '<small class="text-muted"></small>'+
            '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast">&times;</button>'+
        '</div>'+
        '<div class="toast-body"></div>'+
    '</div>';

    /**
     * Ajoute un toast à la liste de ceux affichés
     * 
     * @param object Eléments de configuration du Toast
     * @returns void
     */
    this.add = function(config) {
        $toast = $(toast);
        $('.text-primary', $toast).text(config.title);
        $('.text-muted', $toast).text(config.info);
        $('.toast-body', $toast).text(config.body);
        $toast.addClass('bg-' + config.color)
        $toast.toast({
            animation: true,
            autohide: true,
            delay: config.duration
        })
        .appendTo('.toasts')
        .toast('show');
    };
});