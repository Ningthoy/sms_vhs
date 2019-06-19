    $('#list-cat').hide();
    $(document).on('click','#add-category-btn',function(){
        $('#list-cat, #add-list-cat').toggle(200);
    });
    $(document).on('click','#save-category',function(){
        //client side validation
        if($('#catTitle').val().trim().length<1){
            //toaster alert
            showToaster(3,'Please provide a valid title','Category Title');
            return false;
        }
        if($('#catDesc').val().trim().length<1){
            //toaster alert
            showToaster(3,'Please provide a valid description','Category Description');
            return false;
        }

                var HTML = "<div class=\"d-flex justify-content-between align-items-start align-items-sm-center mb-4 flex-column flex-sm-row\">"+
            "<div class=\"left d-flex align-items-center\">"+
            "<div class=\"icon icon-lg shadow mr-3 text-gray\"><i class=\"fas fa-shopping-basket\"></i></div>"+
            "<div class=\"text\">"+
            "<h6 class=\"mb-0 d-flex align-items-center\"> <span>"+
            $('#catTitle').val() +
            "</span><span class=\"dot dot-sm ml-2 bg-blue\"></span></h6><small class=\"text-gray\">"+$('#catDesc').val().trim()+" </small></div></div>"+
            "<div class=\"right ml-5 ml-sm-0 pl-3 pl-sm-0 text-blue\">"+
             "<div class=\"btn-group\" role=\"group\" aria-label=\"Button group with nested dropdown\">"+
                "<button type=\"button\" class=\"btn btn-outline-primary\"><i class=\"fas fa-edit\"></i> Edit</button>"+
                "<button type=\"button\" class=\"btn btn-outline-primary\"><i class=\"fas fa-trash-alt\"></i> Delete</button></div></div></div>";

       console.log($('#catId').val().trim());

        $.ajax({
            type: "POST",
            url: "/user/saveSubCat",
            dataType:"json",
            data: {title : $('#catTitle').val().trim(), description: $('#catDesc').val().trim(),catId:$('#categoryId').val().trim(), id: $('#catId').val().trim(),_csrf: $('#csrfValue').val()},	  	
            success: function(result){
                    console.log("abc");
                    if(result.success){
                        showToaster(1,result.msg,'Category');
                        
                        setTimeout("location.reload(true);",5000);
                    }else{
                        showToaster(3,result.msg,'Category');
                        setTimeout("location.reload(true);",5000);
                    }
              }
        });
    });

    function getdata(e)
    {   
        $('#list-cat, #add-list-cat').toggle(200);
        $.ajax({
            type: "GET",
            url: "/user/getSub/"+e.dataset.id+"/"+$('#categoryId').val().trim(),
            dataType:"json",  	
            success: function(result){
                        document.getElementById('catTitle').value=result.docs.title;
                        console.log("dddddd",result.docs._id);
                        document.getElementById('catDesc').value=result.docs.description;
                        document.getElementById('catId').value=result.docs._id;
              }
        });
    }

    $('#add-list-cat').on('click', '#delete-category-btn', function(event) {
        event.preventDefault();
        const id = $(this).attr('data-id');
        $.ajax({
            url: '/user/delete/' + id,
            method: 'DELETE',
            data: { id: id, _csrf: $('#csrfValue').val() }
            }).done(function(res) {
                if (res.success) {
                console.log('id from ajax call is', res);
                window.location.reload();
            } else {
                console.log('error...ajax');
                }
            });           
    });