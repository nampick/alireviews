var url = $(location).attr('href');
var urlPath = url.split('@');
var urlNeed = urlPath[1];

var download = function(content, fileName, mimeType) {
  var a = document.createElement('a');
  mimeType = mimeType || 'application/octet-stream';

  if (navigator.msSaveBlob) { // IE10
    return navigator.msSaveBlob(new Blob([content], { type: mimeType }), fileName);
  } else if ('download' in a) { //html5 A[download]
    a.href = 'data:' + mimeType + ',' + encodeURIComponent(content);
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return true;
  } else { //do iframe dataURL download (old ch+FF):
    var f = document.createElement('iframe');
    document.body.appendChild(f);
    f.src = 'data:' + mimeType + ',' + encodeURIComponent(content);

    setTimeout(function() {
      document.body.removeChild(f);
    }, 333);
    return true;
  }
}

if(urlNeed){
	var csv = 'product_handle,rating,title,author,email,body,created_at\n';
	jQuery('.feedback-item').each(function(){ 
		var date = new Date(jQuery('.buyer-review > .r-time',this).text()); 
		var review = jQuery('.star-view span',this)[0].style.width;
		var star = review.replace('%','')/20;
		var img = '';	
		var content = jQuery.trim(jQuery('.buyer-feedback',this).text().replace(/[\t\n]+/g,' '));	
		jQuery('.r-photo-list .pic-view-item',this).each(function(){ 
			img += '{'+$(this).attr('data-src')+'};';
		});
		if(star > 3 && contentl.length > 3){
			csv += urlNeed+','+star+','+jQuery.trim(jQuery('.user-order-info .first',this).text().replace(/(<([^>]+)>)/ig,"")).replace(/\s/g,'')+','+jQuery.trim(jQuery('.user-name',this).text())+',sale@mobilecase.store,"'+jQuery.trim(jQuery('.buyer-feedback',this).text().replace(/[\t\n]+/g,' '))+'@'+img+'",'+date.toString('MM/dd/yy')+'\n';		
		}
	
	});
	download(csv, 'csv file.csv', 'text/csv');	
	$('#l-refresh-form').attr('action',$('#l-refresh-form').attr('action')+'@'+urlNeed);
}


