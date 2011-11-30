var sideDetail = false;

 $(document).ready(function(){
    var studentImages = $(".studentBox img");
    $(studentImages).each(function(index) {
        if ($(this).hasClass('unavail')) {
            console.log("un");
            $(this).parent('li').css({'background-color' : 'rgba(0,0,0,0.8)', 'opacity' : '0.5', 'color' : '#aaa'});
        }
     });

    $('#checkedinList').isotope({
      itemSelector : '.studentBox',
      layoutMode : 'masonry',
      rowHeight: 100
    });
    
    $("#searcher").live('focus', function() {
        if ($(this).val()=="search"){
            $(this).val("");
        }
        $(this).css({'background-color' : 'rgb(245,245,187)'});
        return false;
    });
    $("#searcher").live('blur', function() {
        $(this).css({'background-color' : '#FFF'});
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
