/**
 * Created by wayne on 17/5/18.
 */

$(".home").click(function(){
    $(".content_home").show();
    $(".content1").hide();
    $(".content2").hide();
    $(".content3").hide();
    $(".content4").hide();
});

$(".animes").click(function(){
    $(".content1").show();
    $(".content2").hide();
    $(".content3").hide();
    $(".content4").hide();
    $(".content_home").hide();
});

$(".movie").click(function(){
    $(".content2").show();
    $(".content1").hide();
    $(".content3").hide();
    $(".content4").hide();
    $(".content_home").hide();
});

$(".books").click(function(){
    $(".content3").show();
    $(".content1").hide();
    $(".content2").hide();
    $(".content4").hide();
    $(".content_home").hide();
});

$(".combination").click(function(){
    console.log("4");

    $(".content4").show();
    $(".content1").hide();
    $(".content3").hide();
    $(".content2").hide();
    $(".content_home").hide();
});

$("#animes_search").click(function(){/* table1_Animes*/

    var loading = document.getElementById('loading1');
    loading.style.display = "block";

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
        loading.style.display = "none";
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
                animes_td7 = document.createElement('td');

                animes_td1.innerHTML = data[i]['title'];
                animes_td2.innerHTML = data[i]['genre'];
                animes_td3.innerHTML = data[i]['type'];
                animes_td4.innerHTML = data[i]['rating'];
                animes_td5.innerHTML = data[i]['revenue'];
                animes_td6.innerHTML = data[i]['episodes'];
                animes_td7.innerHTML = data[i]['start_date'].substring(12,16);

                animes_tr.appendChild(animes_td1)
                animes_tr.appendChild(animes_td2)
                animes_tr.appendChild(animes_td3)
                animes_tr.appendChild(animes_td4)
                animes_tr.appendChild(animes_td5)
                animes_tr.appendChild(animes_td6)
                animes_tr.appendChild(animes_td7)
                table1.appendChild(animes_tr)
            }

        }else{
            alert("no data!!!!");
        }

        

        console.log(table1)
    });
});

$("#movies_search").click(function(){
    var loading = document.getElementById('loading2');
    loading.style.display = "block";
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
        loading.style.display = "none";

        if (data.length!=0){
            var i;

        var animes_td;
        var movies_tr;
        for (i = 0; i < data.length; i++) {
            // text += data[i] + "<br>";
            console.log(data[i])
            movies_tr = document.createElement('tr');
            movies_tr.setAttribute('class',"table2tr");
            movies_td1 = document.createElement('td');
            movies_td2 = document.createElement('td');
            movies_td3 = document.createElement('td');
            movies_td4 = document.createElement('td');
            movies_td5 = document.createElement('td');
            movies_td6 = document.createElement('td');
            movies_td7 = document.createElement('td');
            movies_td8 = document.createElement('td');
            movies_td9 = document.createElement('td');
            movies_td10 = document.createElement('td');
            movies_td11 = document.createElement('td');

            movies_td1.innerHTML = data[i]['title'];
            movies_td2.innerHTML = data[i]['genre'];
            movies_td3.innerHTML = data[i]['description'];
            movies_td4.innerHTML = data[i]['director'];
            movies_td5.innerHTML = data[i]['actors'];
            movies_td6.innerHTML = data[i]['year'];
            movies_td7.innerHTML = data[i]['runtime'];
            movies_td8.innerHTML = data[i]['rating'];
            movies_td9.innerHTML = data[i]['revenue'];
            movies_td10.innerHTML = data[i]['metascore'];
            movies_td11.innerHTML = data[i]['revenue'];

            movies_tr.appendChild(movies_td1)
            movies_tr.appendChild(movies_td2)
            movies_tr.appendChild(movies_td3)
            movies_tr.appendChild(movies_td4)
            movies_tr.appendChild(movies_td5)
            movies_tr.appendChild(movies_td6)
            movies_tr.appendChild(movies_td7)
            movies_tr.appendChild(movies_td8)
            movies_tr.appendChild(movies_td9)
            movies_tr.appendChild(movies_td10)
            movies_tr.appendChild(movies_td11)
            table2.appendChild(movies_tr)
        }

        }else{
            alert("no data")
        }



        console.log(table2)
    });
});

$("#books_search").click(function(){
    var loading = document.getElementById('loading3');
    loading.style.display = "block";
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
        loading.style.display = "none";
        console.log(data)

        if (data.length!=0){
            var i;
            var animes_td;
            var books_tr
            for (i = 0; i < data.length; i++) {
                // text += data[i] + "<br>";
                console.log(data[i])
                books_tr = document.createElement('tr');
                books_tr.setAttribute('class',"table3tr");
                books_td1 = document.createElement('td');
                books_td2 = document.createElement('td');
                books_td3 = document.createElement('td');
                books_td4 = document.createElement('td');
                books_td5 = document.createElement('td');
                books_td6 = document.createElement('td');
                books_td7 = document.createElement('td');

                books_td1.innerHTML = data[i]['title'];
                books_td2.innerHTML = data[i]['genre'];
                books_td3.innerHTML = data[i]['isbn'];
                books_td4.innerHTML = data[i]['author'];
                books_td5.innerHTML = data[i]['year'];
                books_td6.innerHTML = data[i]['rating'];
                books_td7.innerHTML = data[i]['revenue'];

                books_tr.appendChild(books_td1)
                books_tr.appendChild(books_td2)
                books_tr.appendChild(books_td3)
                books_tr.appendChild(books_td4)
                books_tr.appendChild(books_td5)
                books_tr.appendChild(books_td6)
                books_tr.appendChild(books_td7)
                table3.appendChild(books_tr)
            }
        }else{
            alert("Sorry, we do not have data!!")
        }


        console.log(table3)
    });
});

$(".combination").click(function(){
    console.log("4");
});