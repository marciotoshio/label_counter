function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

function createNewItem(text, uuid = uuidv4(), count = 1) {
  if(text == '') { return; }

  var a = $('<a href="' + uuid + '" class="label-link list-group-item d-flex justify-content-between align-items-center" />')
  a.html('<span class="text">' + text + '</span>' + '<span class="value badge badge-primary badge-pill">'+ count + '</span>');
  $('#label-list').append(a);
}

function updateLabelCount(span) {
  var val = span.text();
  var newValue = parseInt(val) + 1;
  span.text(newValue);
}

function getObject() {
  var result = [];
  $('#label-list a').each(function() {
    var item = $(this);
    result.push({
      'uuid': item.attr('href'),
      'text': item.find('.text').text(),
      'value': item.find('.value').text()
    });
  });

  return result;
}

function save() {
  window.localStorage.setItem('user-labels', JSON.stringify(getObject()));
}

function load() {
  var userLabels = JSON.parse(window.localStorage.getItem('user-labels'));
  if(userLabels) {
    userLabels.forEach(function(userLabel) {
      createNewItem(userLabel.text, userLabel.uuid, userLabel.value);
    });
  }
}

function clear() {
  if (window.confirm("Do you really want to clear the list?")) {
    $('#label-list').empty();
    window.localStorage.clear();
  }
}

$(function() {
  $('#add-new-label').on('click', function(e) {
    e.preventDefault();

    createNewItem($('#label-text').val());
    save();
    $('#label-text').val('');
  });

  $('#label-list').on('click', '.label-link ', function(e) {
    e.preventDefault();

    updateLabelCount($(this).find('.value'));
    save();
  });

  $('#clear-list').on('click', function(e) {
    e.preventDefault();

    clear();
  });

  load();
})
