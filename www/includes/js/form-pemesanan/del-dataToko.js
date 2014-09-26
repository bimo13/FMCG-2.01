function conDelDataToko(){
	
	$("#myDialogs").empty();
	$("#myDialogs").html("<div class=\"text-warning\">Konfirmasi</div>");
	
	$("#myDialogsText").removeClass("alert-success alert-info alert-warning alert-danger");
	$("#myDialogsText").addClass("alert-warning");
	$("#myDialogsText").html("Anda yakin ingin menghapus / mengganti data apotek ?<br />Semua produk yang sudah masuk dalam rekap transaksi akan dihapus.");
	
	$("#button-DialogYes").removeClass("btn-info btn-danger btn-warning btn-primary hide");
	$("#button-DialogNo").removeClass("hide");
	$("#button-DialogClose").removeClass("hide");
	
	$("#button-DialogYes").unbind();
	$("#button-DialogNo").unbind();
	$("#button-DialogClose").unbind();
	
	$("#button-DialogYes").addClass("btn-warning");
	$("#button-DialogYes").bind("click", function(){
		$("#FMCGDialogs").modal("hide");
		delDataToko();
	});
	
	$("#button-DialogNo").bind("click", function(){
		$("#FMCGDialogs").modal("hide");
	});
	
	$("#button-DialogClose").addClass("hide");
	
	$("#FMCGDialogs").modal();
	
}

function delDataToko(){
	
	$("#pleasewait").modal();
	var trx_id		=	$("#trx_id").val();
	var sales_id	=	$("#sid").val();
	
	if(trx_id != ""){
		
		$.post(
			
			"http://pbf.totalit.co.id/web-service/del-dataToko.php",
			{
				trx_id:	trx_id,
				sales_id: sales_id
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
						setTimeout(
							function(){
								window.location.href="main-page.html";
							},500
						);
					});
					
					$("#button-DialogYes").addClass("hide");
					$("#button-DialogNo").addClass("hide");
					
					$("#pleasewait").modal("hide");
					$("#FMCGDialogs").modal();
					
				}else{
					
					$("#store_name").empty();
					$("#store_addr").empty();
					$("#store_telp").empty();
					$("#store_mail").empty();
					$("#store_ownr_name").empty();
					$("#store_ownr_addr").empty();
					$("#store_ownr_telp").empty();
					
					$("#trx_id").val("");
					$("#rekap_pesanan").empty();
					
					$("#store_id").val("");
					$("#store_id").attr("readonly",false);
					
					$(".row_data").addClass("hidden");
					$("#pleasewait").modal('hide');
					$("#store_id").focus();
					
				}
				
			},
			"json"
			
		);
		
	}else{
		
		$("#store_name").empty();
		$("#store_addr").empty();
		$("#store_telp").empty();
		$("#store_mail").empty();
		$("#store_ownr_name").empty();
		$("#store_ownr_addr").empty();
		$("#store_ownr_telp").empty();
		
		$("#trx_id").val("");
		$("#rekap_pesanan").empty();
		
		$("#store_id").val("");
		$("#store_id").attr("readonly",false);
		
		$(".row_data").addClass("hidden");
		$("#pleasewait").modal('hide');
		$("#store_id").focus();
		
	}
	
}