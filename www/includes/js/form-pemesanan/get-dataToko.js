function getDataToko(){
	
	$("#pleasewait").modal();
	var sales_id	=	$("#sid").val();
	var store_id	=	$("#store_id").val();
	if(store_id != ""){
		
		$.post(
			"http://pbf.totalit.co.id/web-service/get-dataToko.php",
			{
				sales_id: sales_id,
				store_id: store_id
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
					
					$("#store_name").html(data['return_data'][2]);
					$("#store_addr").html(data['return_data'][3]);
					$("#store_telp").html(data['return_data'][4]);
					$("#store_mail").html(data['return_data'][5]);
					$("#store_ownr_name").html(data['return_data'][6]);
					$("#store_ownr_addr").html(data['return_data'][7]);
					$("#store_ownr_telp").html(data['return_data'][8]);
					$("#trx_id").val(data['return_data']['trx_id']);
					
					$("#store_id").attr("readonly",true);
					$(".row_data").removeClass("hidden");
					$("#pleasewait").modal('hide');
					
				}
				
			},
			"json"
		);
		
	}
	
}