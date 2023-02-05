$(document).ready(function() {
    /* sum function */
    var total = 0;
    function sum () {
      total = 0;
      var prices = $('.item-price');
      var quantity = $('.quantity');
      /* turn quantity into an integer, multiply by price, add to sum */
      for (i = 0; i < quantity.length; i++) {
        var price = Number($(prices[i]).text().replace(/\$/,""));
        var subtotal = (Number($(quantity[i]).val())) * price;
        if (subtotal != 0) {
          $($('.item-subtotal')[i]).text("$" + subtotal + ".00");
        } else {
          $($('.item-subtotal')[i]).text("$0.00");
        }
        total += subtotal;
      };
      $('#cart-subtotal').text("$" + total + ".00");
      return total;
    };
  
    /* tax & cart total functions */
    function calcTax () {
      var gst = Math.round((total * 0.05) * 1000) / 1000;
      $('#gst').text("$ " + gst);
      return gst;
    };
  
    function cartTotal () {
      var gst = calcTax();
      var totalWithTax = total + gst;
      $('#cart-total').text("$ " + totalWithTax);
    };
  
    /* add new item */
    function addItem (name, cost) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
      $('.new').prev().after('<div class="row item"> \
        <div class="item-name col-5"> \ '
        +  name + '\
        </div> \
        <div class="item-price col"> \
          $' + cost + '.00 \
        </div> \
        <div class="item-qty col-2"> \
          <label>QTY</label> \
          <input class="quantity" type="number"> \
        </div> \
        <div class="item-subtotal col"> \
        $0.00 \
        </div> \
        <div class="col"> \
          <button class="remove btn btn-link"> \
            <i class="fas fa-trash"></i> \
          </button> \
        </div> \
      </div>');
    };
  
    /* event handlers */
    /* add new item */
    $(document).on('click', '#add', function() {
      addItem($('#name').val(), $('#cost').val());
    });
    /* delete an item */
    $(document).on('click', '.remove', function() {
      $(this).parents('.row').remove();
      sum();
      cartTotal();
    });
    /* update cart subtotal */
    $(document).on('keyup', '.quantity', function() {
      sum();
      cartTotal();
    });
    /* update item subtotal */
    $(document).on('keydown', '#cost', function(e) {
      if (e.which == 13) { // when user presses enter key
        addItem($('#name').val(), $('#cost').val());
        cartTotal();
      };
    });
  
  });
  