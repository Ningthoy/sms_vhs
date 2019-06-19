$(document).on('click', '#add-category-btn', function() {
    $('#list-cat, #add-list-cat').toggle(200);
});
$(document).ready(function() {
    //$('#example tfoot th').each( function () {
        //var title = $(this).text();
        //$(this).html( '<input type="text" placeholder="Search '+title+'" />' );
    //} );
    var table = $('#example').DataTable( {
        dom: "<'row'<'col-md-6'l><'col-md-6'f>><'row'<'col-md-6'B><'col-md-6'p>><'row'<'col-md-12't>><'row'<'col-md-12'i>>",
        searching: true,
        responsive: true,
        "lengthMenu": [[5, 10, 50, -1], [5, 10, 50, "All"]],
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ]
    } );
} );