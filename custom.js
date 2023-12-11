import $ from 'https://code.jquery.com/jquery-3.3.1.min.js';

$(document).ready(function () {
   console.log('hha')
    $('select[multiple]').each(function () {
      var select = $(this);
      var options = select.find('option');

      var div = $('<div />').addClass('selectMultiple');
      var active = $('<div />');
      var list = $('<ul />');
      var placeholder = select.data('placeholder');

      var span = $('<span />').text(placeholder).appendTo(active);

      options.each(function () {
        var text = $(this).text();
        if ($(this).is(':selected')) {
          active.append($('<a />').html('<em>' + text + '</em><i></i>'));
          span.addClass('hide');
        } else {
          list.append($('<li />').html(text));
        }
      });

      active.append($('<div />').addClass('arrow'));
      div.append(active).append(list);

      select.wrap(div);

      // Click event for options
      $(document).on('click', '.selectMultiple ul li', function (e) {
        var select = $(this).closest('.selectMultiple').find('select');
        var li = $(this);
        if (!select.hasClass('clicked')) {
          select.addClass('clicked');
          li.prev().addClass('beforeRemove');
          li.next().addClass('afterRemove');
          li.addClass('remove');
          var a = $('<a />').addClass('notShown').html('<em>' + li.text() + '</em><i></i>').hide().appendTo(select.closest('.selectMultiple').children('div'));
          a.slideDown(400, function () {
            setTimeout(function () {
              a.addClass('shown');
              select.closest('.selectMultiple').children('div').children('span').addClass('hide');
              select.find('option:contains(' + li.text() + ')').prop('selected', true);
            }, 500);
          });
          setTimeout(function () {
            if (li.prev().is(':last-child')) {
              li.prev().removeClass('beforeRemove');
            }
            if (li.next().is(':first-child')) {
              li.next().removeClass('afterRemove');
            }
            setTimeout(function () {
              li.prev().removeClass('beforeRemove');
              li.next().removeClass('afterRemove');

            }, 200);

            li.slideUp(400, function () {

              li.remove();
              select.removeClass('clicked');
            });
          }, 600);
        }
      });


      ///***Here
      $(document).on('click', '.selectMultiple ul li', function (e) {
        // Add the line here:
        $(this).css('list-style', 'georgian inside url("assets/public/checkedBox.svg")');

        var select = $(this).parent().parent();
        var li = $(this);
        if (!select.hasClass('clicked')) {
          // ... (rest of your existing click event logic)
        }
      });

      // Click event for selected options
      $(document).on('click', '.selectMultiple > div a', function (e) {
        var select = $(this).closest('.selectMultiple').find('select');
        var self = $(this);

        self.removeClass().addClass('remove');
        select.addClass('open');
        setTimeout(function () {
          self.addClass('disappear');
          setTimeout(function () {
            self.animate({
              width: 0,
              height: 0,
              padding: 0,
              margin: 0
            }, 100, function () {
              var li = $('<li />').text(self.children('em').text()).addClass('notShown').appendTo(select.closest('.selectMultiple').find('ul'));
              //$(this).css('list-style', 'georgian inside url("assets/public/checkedBox.svg")');

              li.slideDown(400, function () {
                li.addClass('show');
                setTimeout(function () {
                  select.find('option:contains(' + self.children('em').text() + ')').prop('selected', false);
                  if (!select.find('option:selected').length) {
                    select.closest('.selectMultiple').children('div').children('span').removeClass('hide');
                  }
                  li.removeClass();
                }, 400);
              });
              self.remove();
            })
          }, 300);
        }, 400);
      });

      // Click event for dropdown toggle
      $(document).on('click', '.selectMultiple > div .arrow, .selectMultiple > div span', function (e) {
        $(this).parent().parent().toggleClass('open');
      });
    });


  });

