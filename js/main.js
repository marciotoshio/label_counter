function createNewItem(text) {
  var a = $('<a href="" class="label-link list-group-item d-flex justify-content-between align-items-center" />')
  a.html(text + '<span class="badge badge-primary badge-pill">1</span>');
  $('#label-list').append(a);
}

$(function() {
  $('#add-new-label').on('click', function(e) {
    e.preventDefault();

    createNewItem($('#label-text').val());
  });

  $('#label-list').on('click', '.label-link ', function(e) {
    e.preventDefault();
    var span = $(this).find('span')
    var val = span.text();
    span.text(parseInt(val) + 1);
  });
})
