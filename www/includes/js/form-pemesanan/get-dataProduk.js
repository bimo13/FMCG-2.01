function getDataProduk(id_produk){
	
	if(id_produk != ""){
		
		$("#pleasewait").modal();
		$("#product_price").val("");
		$("#product_stock").val("");
		$(".product_unit").html("-");
		$("#order_subtotal").val("");
		$("#order_qty").val("");
		
		$("#order_qty").attr("disabled",true);
		$("#btn-dataPesanan").attr("disabled",true);
		
		$.post(
			
			"http://pbf.totalit.co.id/web-service/get-dataProduk.php",
			{
				id_produk: id_produk
			},
			function(data){
				
				if(data['status'] != 1){
					
					$("#myDialogs").empty();
					$("#myDialogs").html("<div class=\"text-danger\">Terjadi Kesalahan !</div>");
					
					$("#myDialogsText").removeClass("alert-success alert-info alert-warning alert-danger");
					$("#myDialogsText").addClass("alert-danger");
					$("#myDialogsText").html(data['message']);
					
					$("#button-DialogYes").removeClass("btn-info btn-danger btn-warning btn-primary hide");
					$("#button-DialogNo").removeClass("hide");
					$("#button-DialogClose").removeClass("hide");
					
					$("#button-DialogYes").unbind();
					$("#button-DialogNo").unbind();
					$("#button-DialogClose").unbind();
					
					$("#button-DialogClose").bind("click", function(){
						$("#FMCGDialogs").modal("hide");
						$("#store_id").focus();
					});
					
					$("#button-DialogYes").addClass("hide");
					$("#button-DialogNo").addClass("hide");
					
					$("#pleasewait").modal("hide");
					$("#FMCGDialogs").modal();
					
				}else{
					
					$("#product_price").val(data['return_data'][4]);
					$("#product_stock").val(data['return_data'][9]);
					$(".product_unit").html(data['return_data'][14]);
					
					$("#order_qty").attr("disabled",false);
					$("#btn-dataPesanan").attr("disabled",false);
					$("#order_qty").focus();
					
					$("#pleasewait").modal("hide");
					
				}
				
			},
			"json"
			
		);
		
	}else{
		
		$("#product_price").val("");
		$("#product_stock").val("");
		$(".product_unit").html("-");
		$("#order_subtotal").val("");
		$("#order_qty").val("");
		
		$("#order_qty").attr("disabled",true);
		$("#btn-dataPesanan").attr("disabled",true);
		
	}
	
}