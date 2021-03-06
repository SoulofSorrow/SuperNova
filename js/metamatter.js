jQuery(document).ready(function() {
  // Натягиваем скины на элементы ввода
  jQuery('.payment_block_item:not(.payment_mm_method_nobutton)').button().addClass('ui-textfield');

  jQuery(document)
    .on('keyup change', "#metamatter", function(event, ui) {
      value = (value = parseInt(jQuery(this).val())) ? value : 0;
      jQuery(this).val(value);

      current_discount = 1;
      for(i in mm_discounts) {
        if(value >= mm_discounts[i]['sum']) {
          current_discount = mm_discounts[i]['discount'];
        }
      }
      jQuery("#metamatter_total").html(sn_format_number(Math.floor(value * current_discount)));
      if(current_discount > 1) {
        jQuery("#metamatter_undiscounted").show().html(sn_format_number(value));
        jQuery("#metamatter_bonus_percent").show().find('span').html(Math.round(current_discount * 100 - 100));
      } else {
        jQuery("#metamatter_undiscounted").hide();
        jQuery("#metamatter_bonus_percent").hide();
      }

      jQuery("#metamatter_price").html(sn_format_number(Math.ceil(value / exchange_mm_default * 100) / 100, 2));
    })
    .on('focus', "#metamatter", function(event, ui) {
      this.value == '0' ? this.value='' : false;
      this.select();
    })
    .on('blur', "#metamatter", function(event, ui) {
      that = jQuery(this);
      that.val(parseInt(that.val()) ? that.val() : 0);
    })

    .on('change', '#player_currency',function(){
      sn_redirect('metamatter.php?player_currency=' + $(this).val());
    })

    .on("click", ".js_payment_mm_amount", function(){
      jQuery("#metamatter").val(jQuery(this).attr("value")).change();
      jQuery("#payment_form").submit();
    })
    .on("click", '.js_payment_mm_method', function(){
      jQuery("#payment_method").val(jQuery(this).attr("value"));
      jQuery("#payment_form").submit();
    })
    .on("click", '.js_payment_mm_module', function(){
      jQuery("#payment_module").val(jQuery(this).attr("value"));
      jQuery("#payment_form").submit();
    })

    .on('click', '.js_show_hidden_methods', function () {
      sn_show_hide2(this, '.js_hidden_payments_' + $(this).attr('method_id'), 1);
      return false;
    })
    .on('click', '.js_show_dm_info', function () {
      sn_show_hide2(this, '#dark_matter_what_it_is, #metamatter_what_description');
      return false;
    })
  ;
});
