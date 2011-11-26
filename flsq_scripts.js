var sideDetail = false;

 $(document).ready(function(){
    
    $('#checkedinList').isotope({
      itemSelector : '.studentBox',
      layoutMode : 'cellsByRow',
      rowHeight: 100
    });
    
    $("#searcher").live('focus', function() {
        $(this).val("");
        $(this).css({'background-color' : '#ddd'});
        return false;
    });
    $("#searcher").live('blur', function() {
        $(this).css({'background-color' : '#888'});
        return false;
    });
    $("#searcher").keypress(function(e){
      if(e.which == 13){
        q = $('#searcher').val();
         dosearch(q);
        e.preventDefault();
        return false;
       }
    });
    
    $(".searchButton").click(function(e){
        q = $('#searcher').val();
        dosearch(q);
        e.preventDefault();
        return false;
    });
    
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
 
 
    var  rightShift = (-($(document).width())/2)-60;
    $('#cirlceCanvas1').css("margin-left", rightShift);
     $(window).resize(function() {
        var rightSh = (-($(document).width())/2)-60;
        $('#cirlceCanvas1').css("margin-left", rightSh);
    });
});
