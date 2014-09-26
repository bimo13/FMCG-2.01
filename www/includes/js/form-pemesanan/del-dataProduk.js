function conDelDataProduk(row_id){
	
	$("#myDialogs").empty();
	$("#myDialogs").html("<div class=\"text-warning\">Konfirmasi</div>");
	
	$("#myDialogsText").removeClass("alert-success alert-info alert-warning alert-danger");
	$("#myDialogsText").addClass("alert-warning");
	$("#myDialogsText").html("Anda yakin ingin menghapus data pesanan ?");
	
	$("#button-DialogYes").removeClass("btn-info btn-danger btn-warning btn-primary hide");
	$("#button-DialogNo").removeClass("hide");
	$("#button-DialogClose").removeClass("hide");
	
	$("#button-DialogYes").unbind();
	$("#button-DialogNo").unbind();
	$("#button-DialogClose").unbind();
	
	$("#button-DialogYes").addClass("btn-warning");
	$("#button-DialogYes").bind("click", function(){
		$("#FMCGDialogs").modal("hide");
		delDataProduk(row_id);
	});
	
	$("#button-DialogNo").bind("click", function(){
		$("#FMCGDialogs").modal("hide");
	});
	
	$("#button-DialogClose").addClass("hide");
	
	$("#FMCGDialogs").modal();
	
}

function delDataProduk(row_id){
	
	$("#pleasewait").modal();
	
	var row_id					=	row_id;
	var trx_id					=	$("#trx_id").val();
	
	$.post(
		
		"http://pbf.totalit.co.id/web-service/del-dataProduk.php",
		{
			row_id		:	row_id,
			trx_id		:	trx_id
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
				
				var trx_total		=	parseInt($("#trx_total").val()) - 1;
				$("#trx_total").val(trx_total);
				
				if(trx_total > 0){
					$("#btn-dataTrx").attr("disabled",false);
				}else{
					$("#btn-dataTrx").attr("disabled",true);
				}
				
				$("#rekap-"+row_id).remove();
				$("#pleasewait").modal("hide");
				
			}
			
		},
		"json"
		
	);
	
}