$(document).ready(function(){
    var search;
    $('#get').click(function(){
        search = $('#search').val();

        getPic()
    });
    $('#search').keydown(function(e){
        if(e.keyCode == 13){
            search = $(this).val();

            getPic()
        }
    });

    function getPic(){

        var flickrURL =  "http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags="+
        search +"&jsoncallback=?"
        $.ajax (
            {
                dataType: 'json',
                method:'GET',
                url: flickrURL,
                success: verFotos
            }
        )
    }
    function verFotos(data){
        console.log(data);
        $('#pics').html("");
        for(var i = 0; i < data.items.length; i++){
            var pic = data.items[i];
            var htmlCode = "<div class='container'><div class='picture'> <a href='"+ pic.link +"' target='_blank'><img src='"+ pic.media.m + "' alt='"+ pic.title +"'></a></div><h4>"+ pic.title +"</h4></div>";
            $('#pics').append(htmlCode);
        }
        $("#source a").attr("href", data.link).text(data.title + " door Flickr");
    }
})


