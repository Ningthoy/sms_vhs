toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  function showToaster(type, message, title){
        switch(type){
            case 1: toastr.success(message,title);
                    break;
            case 2: toastr.warning(message,title);
                    break;
            case 3: toastr.error(message,title);
                    break;
        }
  }