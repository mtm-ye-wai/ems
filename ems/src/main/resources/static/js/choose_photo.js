/**
 * short function of Get Element by id
 */
 function _id(id){
	return document.getElementById(id);
}

 $(function(){
	$('#display-img').off('click').on('click',function(e){
		e.preventDefault();
		_id('choose-file').click();
		_id('choose-file').addEventListener('change',choosePhoto);
	})
	//ferry page switch btn
	$('#activeFlg1').on('change',function(){
		if($(this).is(":checked")){
			$("#edit-page-lab").text("Active");
		}else{
			$("#edit-page-lab").text("Inactive");
		}
	})
})

/**
 * Choose Photo
 */
function choosePhoto(e){
	e.preventDefault();
	var reader = new FileReader();
	var files = e.target.files;
	if(files.length<0){
		console.log("Please choose a file!");
		return ;
	}
    var img = document.createElement('img');
    reader.onload = function(){
        img.src = reader.result;
    }
    reader.readAsDataURL(files[0]);
   	
    $('#display-img').removeClass('dashed border-red');
    $('#display-img').addClass('shadow');
    $('#display-img').children().remove();
    _id('display-img').appendChild(img);
}