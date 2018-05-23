/**
 * Created by wayne on 17/5/18.
 */


$(".animes").click(function(){
    $(".content1").show();
    $(".content2").hide();
    $(".content3").hide();
    $(".content4").hide();
});

$(".movie").click(function(){
    $(".content2").show();
    $(".content1").hide();
    $(".content3").hide();
    $(".content4").hide();
});

$(".books").click(function(){
    $(".content3").show();
    $(".content1").hide();
    $(".content2").hide();
    $(".content4").hide();
});

$(".combination").click(function(){
    console.log("4");

    $(".content4").show();
    $(".content1").hide();
    $(".content3").hide();
    $(".content2").hide();
});











$("#animes_search").click(function(){/* table1_Animes*/

    var table1 = document.getElementById('table1_tbody');
    console.log("1");
    var k;
    if(document.getElementsByClassName("table1tr").length!=0){
            table1tr = document.getElementsByClassName("table1tr");
            console.log(table1tr.length)
            var data_length = table1tr.length
            var i = 0;
            while (i < data_length){
                console.log(k);
                table1.removeChild(table1tr[0]);
                console.log(table1tr);
                i++;
            }
    }
    var numtoshow =$("#number_of_animes").val();
    var genretoshow =$("#genre_of_animes").val();
    var typetoshow =$("#type_of_animes").val();
    var start_rate =$("#rate_start").val();
    var end_rate =$("#rate_end").val();
    var up_down =$("#up_down").val();
    console.log(numtoshow);

    // if (numtoshow == "number_of_result"){
    //     numtoshow = 'None'
    // }
    // if (genretoshow == "all_genres"){
    //     genretoshow = 'None'
    // }
    // if (typetoshow == "all type"){
    //     typetoshow = 'None'
    // }
    // if (start_rate == "rate_start"){
    //     start_rate = 'None'
    // }
    // if (end_rate == "rate_end"){
    //     end_rate = 'None'
    // }
    //
    // console.log("pppppppppppppppp")
    // console.log(genretoshow)
    //
    // var url = 'http://127.0.0.1:5000/show/animes?count='+numtoshow+'&genre='+genretoshow+'&title='+typetoshow+'&rate_start='+start_rate + '&rate_end='+end_rate+'&order='+up_down;
    var url = 'http://127.0.0.1:5000/show/animes?'
    if (numtoshow){
        url = url + 'count='+numtoshow
    }
    if (genretoshow){
        url = url + '&genre='+genretoshow
    }
    if (typetoshow){
        url = url + '&title='+typetoshow
    }
    if (start_rate){
        url = url + '&rate_start='+start_rate
    }
    if (end_rate){
        url = url + '&rate_end='+end_rate
    }
    if (up_down){
        url = url + '&order='+up_down
    }
    fetch(url, {
        method: 'get'
    }).then((response)=> response.json())
      .then(function(data){
        console.log("uuuuuuuuuu")
        console.log(data)
        if (data.length!=0){
            var i;
            var animes_td;
            var animes_tr
            for (i = 0; i < data.length; i++) {
                // text += data[i] + "<br>";
                console.log(data[i])
                animes_tr = document.createElement('tr');
                animes_tr.setAttribute('class',"table1tr");
                animes_td1 = document.createElement('td');
                animes_td2 = document.createElement('td');
                animes_td3 = document.createElement('td');
                animes_td4 = document.createElement('td');
                animes_td5 = document.createElement('td');
                animes_td6 = document.createElement('td');

                animes_td1.innerHTML = data[i]['title'];
                animes_td2.innerHTML = data[i]['genre'];
                animes_td3.innerHTML = data[i]['type'];
                animes_td4.innerHTML = data[i]['rating'];
                animes_td5.innerHTML = data[i]['episodes'];
                animes_td6.innerHTML = data[i]['start_date'].substring(12,16);

                animes_tr.appendChild(animes_td1)
                animes_tr.appendChild(animes_td2)
                animes_tr.appendChild(animes_td3)
                animes_tr.appendChild(animes_td4)
                animes_tr.appendChild(animes_td5)
                animes_tr.appendChild(animes_td6)
                table1.appendChild(animes_tr)
            }

        }else{
            alert("no data!!!!");
        }

        

        console.log(table1)
    });

    // $(".content1").show();
    // $(".content2").hide();
    // $(".content3").hide();
    // $(".content4").hide();
});

$("#movies_search").click(function(){
    console.log("22222")
    var table2 = document.getElementById('table2_tbody');
    console.log("1");
    var k;
    if(document.getElementsByClassName("table2tr").length!=0){
            table2tr = document.getElementsByClassName("table2tr");
            console.log(table2tr.length)
            var data_length = table2tr.length
            // for (k = 0; k < table2tr.length; k++) {
            //     console.log(k);
            //     table2.removeChild(table2tr[k]);
            //     console.log(table2tr);
            // }

            var i = 0;
            while (i < data_length){
                console.log(k);
                table2.removeChild(table2tr[0]);
                console.log(table2tr);
                i++;
            }

    }

    var numtoshow =$("#number_of_movie").val();
    var genretoshow =$("#genre_of_movie").val();
//    var typetoshow =$("#type_of_movie").val();
    var start_rate =$("#rate_start_movie").val();
    var end_rate =$("#rate_end_movie").val();
    var up_down =$("#up_down_movie").val();
    var year =$("#year_movie").val();
//    var revenue_start =$("#revenue_start_movie").val();
//    var revenue_rate =$("#revenue_end_movie").val();

    console.log(numtoshow);
    // const url = 'http://127.0.0.1:5000/show/movies?count='+numtoshow+'&genre='+genretoshow+'&rate_start='+start_rate + '&rate_end='+end_rate+'&order='+up_down+'&year='+year;

    var url = 'http://127.0.0.1:5000/show/movies?'
    if (numtoshow){
        url = url + 'count='+numtoshow
    }
    if (genretoshow){
        url = url + '&genre='+genretoshow
    }
    // if (typetoshow){
    //     url = url + '&title='+typetoshow
    // }
    if (start_rate){
        url = url + '&rate_start='+start_rate
    }
    if (end_rate){
        url = url + '&rate_end='+end_rate
    }
    if (up_down){
        url = url + '&order='+up_down
    }
    if (year){
        url = url + '&year='+year
    }



    fetch(url, {
        method: 'get'
    }).then((response)=> response.json())
      .then(function(data){
        console.log(data)
        var i;

        var animes_td;
        var animes_tr
        for (i = 0; i < data.length; i++) {
            // text += data[i] + "<br>";
            console.log(data[i])
            animes_tr = document.createElement('tr');
            animes_tr.setAttribute('class',"table2tr");
            animes_td1 = document.createElement('td');
            animes_td2 = document.createElement('td');
            animes_td3 = document.createElement('td');
            animes_td4 = document.createElement('td');
            animes_td5 = document.createElement('td');
            animes_td6 = document.createElement('td');
            animes_td7 = document.createElement('td');
            animes_td8 = document.createElement('td');
            animes_td9 = document.createElement('td');
            animes_td10 = document.createElement('td');

            animes_td1.innerHTML = data[i]['title'];
            animes_td2.innerHTML = data[i]['genre'];
            animes_td3.innerHTML = data[i]['description'];
            animes_td4.innerHTML = data[i]['director'];
            animes_td5.innerHTML = data[i]['actors'];
            animes_td6.innerHTML = data[i]['year'];
            animes_td7.innerHTML = data[i]['runtime'];
            animes_td8.innerHTML = data[i]['rating'];
            animes_td9.innerHTML = data[i]['revenue'];
            animes_td10.innerHTML = data[i]['metascore'];

            animes_tr.appendChild(animes_td1)
            animes_tr.appendChild(animes_td2)
            animes_tr.appendChild(animes_td3)
            animes_tr.appendChild(animes_td4)
            animes_tr.appendChild(animes_td5)
            animes_tr.appendChild(animes_td6)
            animes_tr.appendChild(animes_td7)
            animes_tr.appendChild(animes_td8)
            animes_tr.appendChild(animes_td9)
            animes_tr.appendChild(animes_td10)
            table2.appendChild(animes_tr)
        }


        console.log(table2)
    });
    // $(".content2").show();
    // $(".content1").hide();
    // $(".content3").hide();
    // $(".content4").hide();
});

$("#books_search").click(function(){
    console.log("3");
    var table3 = document.getElementById('table3_tbody');
    var k;
    if(document.getElementsByClassName("table3tr").length!=0){
            table3tr = document.getElementsByClassName("table3tr");
            console.log(table3tr.length)
            var data_length = table3tr.length
            // for (k = 0; k < table3tr.length; k++) {
            //     console.log(k);
            //     table3.removeChild(table3tr[k]);
            //     console.log(table3tr);
            // }

            var i = 0;
            while (i < data_length){
                console.log(k);
                table3.removeChild(table3tr[0]);
                console.log(table3tr);
                i++;
            }

    }

    var numtoshow =$("#number_of_book").val();
    var genretoshow =$("#genre_of_book").val();
//    var typetoshow =$("#type_of_book").val();
    var start_rate =$("#rate_start_book").val();
    var end_rate =$("#rate_end_book").val();
    var up_down =$("#up_down_book").val();
    var year =$("#year_book").val();
    console.log(numtoshow);
    // const url = 'http://127.0.0.1:5000/show/books?count='+numtoshow+'&rate_start='+start_rate + '&genre='+genretoshow+'&rate_end='+end_rate+'&order='+up_down+'&year='+year;


    var url = 'http://127.0.0.1:5000/show/books?'
    if (numtoshow){
        url = url + 'count='+numtoshow
    }
    if (genretoshow){
        url = url + '&genre='+genretoshow
    }
    // if (typetoshow){
    //     url = url + '&title='+typetoshow
    // }
    if (start_rate){
        url = url + '&rate_start='+start_rate
    }
    if (end_rate){
        url = url + '&rate_end='+end_rate
    }
    if (up_down){
        url = url + '&order='+up_down
    }
    if (year){
        url = url + '&year='+year
    }

    fetch(url, {
        method: 'get'
    }).then((response)=> response.json())
      .then(function(data){
        console.log(data)
        var i;

        var animes_td;
        var animes_tr
        for (i = 0; i < data.length; i++) {
            // text += data[i] + "<br>";
            console.log(data[i])
            animes_tr = document.createElement('tr');
            animes_tr.setAttribute('class',"table3tr");
            animes_td1 = document.createElement('td');
            animes_td2 = document.createElement('td');
            animes_td3 = document.createElement('td');
            animes_td4 = document.createElement('td');
            animes_td5 = document.createElement('td');
            animes_td6 = document.createElement('td');

            animes_td1.innerHTML = data[i]['title'];
            animes_td2.innerHTML = data[i]['genre'];
            animes_td3.innerHTML = data[i]['isbn'];
            animes_td4.innerHTML = data[i]['author'];
            animes_td5.innerHTML = data[i]['year'];
            animes_td6.innerHTML = data[i]['rating'];

            animes_tr.appendChild(animes_td1)
            animes_tr.appendChild(animes_td2)
            animes_tr.appendChild(animes_td3)
            animes_tr.appendChild(animes_td4)
            animes_tr.appendChild(animes_td5)
            animes_tr.appendChild(animes_td6)
            table3.appendChild(animes_tr)
        }

        console.log(table3)
    });
    // $(".content3").show();
    // $(".content1").hide();
    // $(".content2").hide();
    // $(".content4").hide();
});

$(".combination").click(function(){
    console.log("4");

    // $(".content4").show();
    // $(".content1").hide();
    // $(".content3").hide();
    // $(".content2").hide();
});