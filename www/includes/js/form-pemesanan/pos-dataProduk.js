function posDataProduk(){
	
	$("#pleasewait").modal();
	
	var trx_id					=	$("#trx_id").val();
	var product_id				=	$("#product_name").val();
	var product_price			=	$("#product_price").val();
	var order_qty				=	$("#order_qty").val();
	var order_subtotal			=	$("#order_subtotal").val();
	
	$.post(
		
		"http://pbf.totalit.co.id/web-service/pos-dataProduk.php",
		{
			trx_id				:	trx_id,
			product_id			:	product_id,
			product_price		:	product_price,
			order_qty			:	order_qty,
			order_subtotal		:	order_subtotal
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
				});
				
				$("#button-DialogYes").addClass("hide");
				$("#button-DialogNo").addClass("hide");
				
				$("#pleasewait").modal("hide");
				$("#FMCGDialogs").modal();
				
			}else{
				
				if(data['mtd'] == "Add"){
					var trx_total		=	parseInt($("#trx_total").val()) + 1;
					$("#trx_total").val(trx_total);
					
					var row_rekap		=	"<tr id=\"rekap-"+data['row_id']+"\">";
					var row_rekap		=	row_rekap+"<td id=\"num-"+data['row_id']+"\">"+trx_total+"</td>";
					var row_rekap		=	row_rekap+"<td>"+data['return_data']['product_name']+"</td>";
					var row_rekap		=	row_rekap+"<td>"+data['return_data']['order_qty']+"</td>";
					var row_rekap		=	row_rekap+"<td>Rp.</td>";
					var row_rekap		=	row_rekap+"<td align=\"right\">"+data['return_data']['order_subtotal']+"</td>";
					var row_rekap		=	row_rekap+"<td align=\"center\">";
					var row_rekap		=	row_rekap+"<a href=\"javascript:void(0);\" onclick=\"conDelDataProduk("+data['row_id']+");\"><span class=\"glyphicon glyphicon-remove\"></span> HAPUS</a>";
					var row_rekap		=	row_rekap+"</td>";
					var row_rekap		=	row_rekap+"</tr>";
					
					$("#rekap_pesanan").append(row_rekap);
					
				}else if(data['mtd'] == "Upd"){
					
					var num_trx			=	parseInt($("#num-"+data['row_id']).text());
					
					var row_rekap		=	"<td class=\"num-trx\" id=\"num-"+data['row_id']+"\">"+num_trx+"</td>";
					var row_rekap		=	row_rekap+"<td>"+data['return_data']['product_name']+"</td>";
					var row_rekap		=	row_rekap+"<td>"+data['return_data']['order_qty']+"</td>";
					var row_rekap		=	row_rekap+"<td>Rp.</td>";
					var row_rekap		=	row_rekap+"<td align=\"right\">"+data['return_data']['order_subtotal']+"</td>";
					var row_rekap		=	row_rekap+"<td align=\"center\">";
					var row_rekap		=	row_rekap+"<a href=\"javascript:void(0);\" onclick=\"conDelDataProduk("+data['row_id']+");\"><span class=\"glyphicon glyphicon-remove\"></span> HAPUS</a>";
					var row_rekap		=	row_rekap+"</td>";
					
					$("#rekap-"+data['row_id']).empty();
					$("#rekap-"+data['row_id']).append(row_rekap);
					
				}
				
				if(trx_total > 0){
					$("#btn-dataTrx").attr("disabled",false);
				}else{
					$("#btn-dataTrx").attr("disabled",true);
				}
				
				$("#pleasewait").modal("hide");
				
			}
			
		},
		"json"
		
	);
	
}