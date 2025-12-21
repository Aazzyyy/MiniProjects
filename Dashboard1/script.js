var elements = document.querySelectorAll('.elems');
var Expand = document.querySelectorAll('.elem_exp_view');

elements.forEach(function(element, index){
    element.addEventListener('click', function(){
        Expand[index].style.display = 'block';
    })
})