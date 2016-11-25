<script>
jQuery(function($) {
  	$(document).on('click','.spr-pagination a',time);                                            
 	$('.review_tab').click(reviews);     
   	$(document).on('click', '.reviewImgs', function(){
    	$(this).closest('.spr-review-content').find('.closeRv').show();                                          
		$(this).closest('.spr-review-content').find('.bigImg').html('<img width="400" src="'+$(this).attr('data-src')+'" />');
    }); 
	$(document).on('click', '.closeRv', function(){
		$(this).hide();
	  $(this).closest('.spr-review-content').find('.bigImg').html('');
	})                                            
});

function reviews(){     
	$('.spr-review').each(function(){
	var content = $(this).find('.spr-review-content-body').text();
	var needCt = content.split('@');
	var urls = findUrls(content);
	var imageHtml = '<ul>';
	for(var i = 0; i < urls.length; i++){                                      
		imageHtml += '<li style="height:40px; width:40px; overflow:hidden;float:left; margin-right: 5px;"><a class="reviewImgs" href="javascript:void(0)" data-src="'+urls[i]+'"><img width="40" src="'+urls[i]+'" /></a></li>';
	}
	  	imageHtml += '</ul><p style="cursor: pointer;display:none" class="closeRv" style="clear:both;">Close</p><p style="clear:both;" class="bigImg"></p>'; 
	  	if(needCt.indexOf("@") > 0)
	  	$(this).find('.spr-review-content-body').html('');
	  	$(this).find('.spr-review-content').append('<p>'+needCt[0]+'</p>'+imageHtml);
	});
	$('.spr-review-content-body').remove();  
}

function time() {
    $('.spr-review-content-body').hide();
    myVar = setTimeout(reviews, 1500);
}
function findUrls( text )
{
    var source = (text || '').toString();
    var urlArray = [];
    var url;
    var matchArray;

    // Regular expression to find FTP, HTTP(S) and email URLs.
    var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;

    // Iterate through any URLs in the text.
    while( (matchArray = regexToken.exec( source )) !== null )
    {
        var token = matchArray[0];
        urlArray.push( token );
    }
    return urlArray;
}
</script> 