function ExpandViewOPenCLose() {
    var elements = document.querySelectorAll('.elems');
    var Expand = document.querySelectorAll('.elem_exp_view');
    var backButton = document.querySelectorAll('.back');

    elements.forEach(function (element, index) {
        element.addEventListener('click', function () {
            Expand[index].style.display = 'block';
        })
    })

    backButton.forEach(function (button, index) {
        button.addEventListener('click', function () {
            Expand[index].style.display = 'none';
        })
    })
}

ExpandViewOPenCLose();