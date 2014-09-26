function conSavDataPesanan(){
	
	$("#myDialogs").empty();
	$("#myDialogs").html("<div class=\"text-success\">Konfirmasi</div>");
	
	$("#myDialogsText").removeClass("alert-success alert-info alert-warning alert-danger");
	$("#myDialogsText").addClass("alert-success");
	$("#myDialogsText").html("Simpan data pesanan dan selesaikan transaksi ?");
	
	$("#button-DialogYes").removeClass("btn-info btn-danger btn-warning btn-primary hide");
	$("#button-DialogNo").removeClass("hide");
	$("#button-DialogClose").removeClass("hide");
	
	$("#button-DialogYes").unbind();
	$("#button-DialogNo").unbind();
	$("#button-DialogClose").unbind();
	
	$("#button-DialogYes").addClass("btn-success");
	$("#button-DialogYes").bind("click", function(){
		$("#FMCGDialogs").modal("hide");
		savDataPesanan();
	});
	
	$("#button-DialogNo").bind("click", function(){
		$("#FMCGDialogs").modal("hide");
	});
	
	$("#button-DialogClose").addClass("hide");
	
	$("#FMCGDialogs").modal();
	
}

function savDataPesanan(){
	
	$("#pleasewait").modal();
	var trx_id					=	$("#trx_id").val();
	
	$.post(
		
		"http://pbf.totalit.co.id/web-service/sav-dataPesanan.php",
		{
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
				
				$("#myDialogs").empty();
				$("#myDialogs").html("<div class=\"text-success\">Terjadi Kesalahan !</div>");
				
				$("#myDialogsText").removeClass("alert-success alert-info alert-warning alert-danger");
				$("#myDialogsText").addClass("alert-success");
				$("#myDialogsText").html(data['message']);
				
				$("#button-DialogYes").removeClass("btn-info btn-danger btn-warning btn-primary hide");
				$("#button-DialogNo").removeClass("hide");
				$("#button-DialogClose").removeClass("hide");
				
				$("#button-DialogYes").unbind();
				$("#button-DialogNo").unbind();
				$("#button-DialogClose").unbind();
				
				$("#button-DialogClose").bind("click", function(){
					$("#FMCGDialogs").modal("hide");
					window.location.href = "main-page.html";
				});
				
				$("#button-DialogYes").addClass("hide");
				$("#button-DialogNo").addClass("hide");
				
				$("#pleasewait").modal("hide");
				$("#FMCGDialogs").modal();
				
			}
			
		},
		"json"
		
	);
	
}