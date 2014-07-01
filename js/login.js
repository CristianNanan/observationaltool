

onload = function() {
    $('#forgotpass').click(function(){
         editmode = 'edit';
         $('#modal #deleteform').css('display', 'none');
         $('#modal #editform').css('display', 'block');
         $('#modal #editform .temp_label').text('Enter item name:');
         $('#modal').css('visibility', 'visible');
    });
};
