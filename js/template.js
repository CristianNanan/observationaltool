var editmode = '';
var target = '';
var selected = '';
var custom = navigator.userAgent.match(/(iPod|iPhone|iPad)/i);

(function($) {
    $.fn.customclick = function(func) {
        if(custom){
            $(this).bind('touchstart', func);
        }else{
            $(this).click(func);
        }
    }
})(jQuery);

var selectItem = function(item){
    $('.categorybox .category li.selected').removeClass('selected');
    $('.categorybox .category li.sub_selected').removeClass('sub_selected');
    if($(item).hasClass('header')){
        $(item).parent().children().addClass('sub_selected');
        $(item).removeClass('sub_selected').addClass('selected');
        selected = 'header';
    }else{
        $(item).addClass('selected');
        selected = 'normal';
    }
}

var addItemTo = function(cat){
    var myclass = $(cat).attr("class");
    target = myclass.split(' ')[0];
    editmode = 'add';
    $('#modal #deleteform').css('display', 'none');
    $('#modal #editform').css('display', 'block');
    $('#modal #editform .temp_label').text('Enter item name:');
    $('#modal').css('visibility', 'visible');
    
    console.log('class: ' + myclass);
    console.log('want to add item to ' + target);
}

var editItem = function(item){
    selectItem(item);
         editmode = 'edit';
         $('#modal #deleteform').css('display', 'none');
         $('#modal #editform').css('display', 'block');
         $('#modal #editform .temp_label').text('Enter item name:');
         $('#modal').css('visibility', 'visible');
}

onload = function() {
    
    $('.categorybox .category li').customclick(function(){
         selectItem(this);
    });
    
    $('.categorybox .category li').hammer().on('doubletap', function(event){
         editItem(this);
    });
    
    $('.opsbox .ops .add').customclick(function(){
         addItemTo(this);
    });
    
    $('.cancelform').customclick(function(){
         $('#modal').css('visibility', 'hidden');
         return false;
    });
    
    $('.okform').customclick(function(){
         if(editmode == 'delete'){
            if(selected == 'header'){
                var cat = $('.categorybox .category li.selected').filter('.header').parent();
                var neww = $('.categorybox').width() - $(cat).width();
                var id = $(cat).attr('id');
                $('#'+id).remove();
                $('.' + id.substring(4)).parent().remove();
                $('.categorybox').css('width', neww);
                $('.opsbox').css('width', neww);
            }else{
                $('.categorybox .category li.selected').remove();
            }
         }else if(editmode == 'edit'){
            var text = $('#modal #editform #temp_input').val();
            if(text){
                if(selected == 'header'){
                    $('.categorybox .category li.selected').filter('.header').text(text);
                }else{
                    $('.categorybox .category li.selected').text(text);
                }
            }
         }else if(editmode =='add'){
            var text = $('#modal #editform #temp_input').val();
            if(text){
                var item = document.createElement('li');
                $(item).customclick(function(){ selectItem(this); });
                $(item).hammer().on('doubletap', function(event){
                     editItem(this);
                });
                console.log('#cat_'+target);
                
                $(item).text(text).appendTo('#cat_'+target);
                selectItem(item);
            }
         }else if(editmode =='addcat'){
            var text = $('#modal #editform #temp_input').val();
            if(text){
                var classname = text.toLowerCase();
                classname = classname.replace(/\s+/g, "_");
                //category
                var cat = document.createElement('ul');
                $(cat).addClass('category').attr('id', 'cat_ops_' + classname);
                //header
                var head = document.createElement('li');
                $(head).text(text).addClass('header').customclick(function(){ selectItem(this); });
                $(head).hammer().on('doubletap', function(event){
                     editItem(this);
                });
                $(head).appendTo(cat);
                //'add' button
                var add = document.createElement('button');
                $(add).text('Add').addClass('ops_' + classname).addClass('add');
                $(add).customclick(function(){ addItemTo(this); });
                var addcont = document.createElement('div');
                $(addcont).addClass('ops').append(add);
                //add to current document
                $('.opsbox').append(addcont);
                $('#addcategory').before(cat);
                var neww = $('.categorybox').width() + $(cat).width();
                $('.categorybox').css('width', neww);
                $('.opsbox').css('width', neww);
                selectItem(head);
            }
         }
            
         $('#modal #editform #temp_input').val('');
         $('#modal').css('visibility', 'hidden');
         return false;
    });
    
    $('#edititem').customclick(function(){
         editmode = 'edit';
         $('#modal #deleteform').css('display', 'none');
         $('#modal #editform').css('display', 'block');
         $('#modal #editform .temp_label').text('Enter item name:');
         $('#modal').css('visibility', 'visible');
    });
    
    $('#deleteitem').customclick(function(){
         editmode = 'delete';
         $('#modal #deleteform').css('display', 'block');
         $('#modal #editform').css('display', 'none');
         $('#modal').css('visibility', 'visible');
    });
    
    $('#addcategory').customclick(function(){
         editmode = 'addcat';
         $('#modal #deleteform').css('display', 'none');
         $('#modal #editform').css('display', 'block');
         $('#modal #editform .temp_label').text('Enter category name:');
         $('#modal').css('visibility', 'visible');
    });
};
