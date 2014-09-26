function getSearchKeyword(){
	
	$("#pleasewait").modal();
	var product_keyword	=	$("#product_keyword").val();
	if(product_keyword != ""){
		
		$.post(
			
			"http://pbf.totalit.co.id/web-service/get-searchKeyword.php",
			{
				product_keyword: product_keyword
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
					
					$("#product_name").empty();
					$("#product_name").append("<option value=\"\"></option>");
					for(var x=0; x<data['return_data'].length; x++){
						$("#product_name").append($("<option></option>").val(data['return_data'][x].id).text(data['return_data'][x].product_name));
					}
					
					$('#product_name').attr("disabled",false);
					
					$("#myDialogs").empty();
					$("#myDialogs").html("<div class=\"text-success\">Pencarian Berhasil</div>");
					
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
	
}