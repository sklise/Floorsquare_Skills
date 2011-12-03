var sideDetail = false;

 $(document).ready(function(){
    
    $('.updater').click(function(){
        $('.checkinpage').animate({opacity: "0"},200,'swing',function() {
            $('.formpage').show();
            $('.formpage').animate({opacity: "1"},250,'swing',function() {});
         });
    });
    
    $('.gotoMain').click(function(){
        $('.formpage').animate({opacity: "0"},200,'swing',function() {
            $('.mainpage').show();
            $('.mainpage').animate({opacity: "1"},250,'swing',function() {});
         });
    });
 
    var studentImages = $(".studentBox img");
    $(studentImages).each(function(index) {
        if ($(this).hasClass('unavail')) {
            $(this).parent('li').css({'background-color' : 'rgba(20,20,20,0.8)', 'opacity' : '0.5', 'color' : '#aaa'});
        }
     });

    $('#checkedinList').isotope({
      itemSelector : '.studentBox',
      layoutMode : 'masonry',
      rowHeight: 100
    });
    
    $('.mainpage').hide();
    
    $("#searcher").live('focus', function() {
        if ($(this).val()=="search"){
            $(this).val("");
        }
        $(this).css({'background-color' : '#fff'});
        return false;
    });
    $("#searcher").live('blur', function() {
        $(this).css({'background-color' : 'rgb(245,245,187)'});
        return false;
    });  
      
    $('#content').isotope({
      getSortData : {
        skill : function ( $elem ) {
            console.log($elem.find('.skill').text());
          return $elem.find('.skill').text();
        },
        name : function ( $elem ) {
            console.log($elem.find('.nameDisplay').text());
          return $elem.find('.nameDisplay').text();
        }
      }
    })
    
    $("#searcher").keypress(function(e){
      if(e.which == 13){
        e.preventDefault();
        q = $('#searcher').val();
        $('#checkedinList').isotope({ sortBy : q });
        //$('#checkedinList').isotope({ filter: '.'+q });
        console.log("q = "+q);
        $(this).css({'background-color' : 'rgb(245,245,187)'});
        return false;
       }
    });
    
/*
    $(".searchButton").click(function(e){
        q = $('#searcher').val();
        dosearch(q);
        e.preventDefault();
        return false;
    });
*/

    var dosearch = function(q) {
    $('#searcher').addClass('searchLoading');
    $.ajax({
            type: "GET",
            url: "{% url search_site_search_ajax %}",
            dataType: "text",
            data: "q="+q,
            success: function(results) {
                if (results) {
                   $('#searcher').removeClass('searchLoading');
                    $('#quickResults').html(results);
                    $('#quickResults').show();
                    $("#searchBar").bind( "clickoutside", function(e) {
                        $('#quickResults').delay(100).fadeOut();
                    });
                }
            }
        });
    }    
});


/* ///////////////// CHECKIN SCRIPTS /////////////////*/
$(document).ready(function(){
    var url = "http://www.itpirl.com";
    $('#skillshow').tagsInput({
		width: 'auto',
		height:' 40px',
		interactive: false,
	});
	$('a').each(function(index) {
	   if($(this).text() == "x"){
	       $(this).hide();
	   }
	});
	
    	$(".avail").click(function(){ 
    		$.ajax({
    			url: url+"/swipes/new",
    			data: { user_nnumber: "123", app_id: '1', device_id: '1', app_key: "82ac7bdb2e8ef44b5a2124f43ee05479",  extra: {checkin: true, }},
    			type: 'POST',
    			crossDomain: true,
    			success: function(data){
/*     				odata = jQuery.parseJSON(data); */
    				console.log(data);
/*                 				swipeid= odata.swipeid; */
    			} 
    		});
    		console.log("post");
    	});
    	
    	$(".getStuff").click(function(){ 
    		console.log('gggetting json');
    		$.getJSON(url+"/swipes", { app_id: '1', app_key: "db30ad56947d8521acd0870e765a553077bd6b17" , device_id: '1', extra: {checkin: true, available: false}},
    		function(data){
    			console.log(data);
    		});
    		return false;
    	});	
	 
});

