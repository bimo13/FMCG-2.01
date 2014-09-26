$(document).ready(function(){
	$('#order_qty').keyup(function(){
		var thisVal = parseInt($(this).val(), 10);
		$('#order_subtotal').val($('#order_qty').val() * $('#product_price').val());
	});   
});