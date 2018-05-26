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
	    document.getElementById("search_help_msg_anime").innerHTML= "";
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
            var data_length = table2tr.length;

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
            // movies_td9 = document.createElement('td');
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
            // movies_td9.innerHTML = data[i]['revenue'];
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
            // movies_tr.appendChild(movies_td9)
            movies_tr.appendChild(movies_td10)
            movies_tr.appendChild(movies_td11)
            table2.appendChild(movies_tr)
        }
	document.getElementById("search_help_msg_movies").innerHTML= "";
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
            var data_length = table3tr.length;

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
	    document.getElementById("search_help_msg_books").innerHTML= "";
        }else{
            alert("Sorry, we do not have data!!")
        }


        console.log(table3)
    });
});

// $(".combination").click(function(){
//     console.log("4");
// });



function pie_chart(){
    var loading = document.getElementById('loading4');
    loading.style.display = "block";

      $(function(){
      url = "http://127.0.0.1:5000/analytics/productionquality?",
      genre = $('#genre_of_combine').val(),
      year = $('#year_combine').val(),
      year_start = $('#year_start_combine').val(),
      year_end = $('#year_end_combine').val()
      // <!--var genre = $(this).attr('genre_of_combine');-->
      // <!--var year = $(this).attr('year_combine');-->
      console.log(genre);
      console.log(year);
      console.log("2222222");
      console.log(year_start);
      var name_items = [];
      var name_value = [];
      test = "22222";
      var url = "http://127.0.0.1:5000/analytics/productionquality?genre="+genre;
      if (year){
        url = url + "&year="+year
      }
      if (year_start){
        url = url + "&year_start=" + year_start
      }
      if (year_end){
        url = url + "&year_end=" + year_end
      }
      var data = [];
      $.ajax({

        url:url,
        type:'get',
        dataType:"json",
        async:false,
        success: function(result) {
            loading.style.display = "none";
          console.log("yyyyyyyyy")
          name_value.push(result.Number_of_animes);
          name_value.push(result.Number_of_movies);
          name_value.push(result.Number_of_books);

          console.log(name_items);
          for (let key in result){
            name_items.push(key);
          }
        }
      });
      loading.style.display = "none";
      console.log("Number_of_animes");
      console.log(name_value);

      for (let key = 0; key < 3; key++){
            console.log(name_items[key]);
      }
      google.charts.load("current", {packages:['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data1 = google.visualization.arrayToDataTable([['Entertainment', 'length of results'],
        ['Animes', name_value[0]],
        ['Movies', name_value[1]],
        ['Books', name_value[2]]]);

        // Optional; add a title and set the width and height of the chart
        var option = {'title':'The analysis of entertainment', 'width':550, 'height':500};

        // Display the chart inside the <div> element with id="piechart"
        var pie = new google.visualization.PieChart(document.getElementById('piechart'));
        pie.draw(data1, option);


        var data = google.visualization.arrayToDataTable([
          ["Element", "Number", { role: "style" } ],
          ["Animes", name_value[0], "#b87333"],
          ["Movies", name_value[1], "silver"],
          ["Books", name_value[2], "gold"]
        ]);

        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
                         { calc: "stringify",
                           sourceColumn: 1,
                           type: "string",
                           role: "annotation" },
                         2]);

        var options = {
          title: "Number of each category",
          width: 600,
          height: 200,
          bar: {groupWidth: "95%"},
          legend: { position: "none" },
        };
        var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
        chart.draw(view, options);
    }
    })
}


var dataset = [];
$("#combine_trend").click(function(){
    console.log("666");
    var loading = document.getElementById('loading4');
    loading.style.display = "block";

    $(function(){
      url = "http://127.0.0.1:5000/analytics/productiontrend?",
      genre = $('#genre_of_combine').val(),
      year_start = $('#year_start_combine').val(),
      year_end = $('#year_end_combine').val()
      console.log(genre);
      console.log("3333");
      console.log(year_start);
      var url = "http://127.0.0.1:5000/analytics/productiontrend?genre="+genre;
      if (year_start){
        url = url + "&year_start=" + year_start
      }
      if (year_end){
        url = url + "&year_end=" + year_end
      }
      console.log(url);

      $.ajax({
        url:url,
        type:'get',
        dataType:"json",
        async:false,
        success: function(result) {
            loading.style.display = "none";
          console.log("123456789");
          //console.log(result.data);
          dataset = result.data

        }
      });
      loading.style.display = "none";
      console.log("Number_of_animes");
      console.log(dataset);

    });
  google.charts.load('current', {'packages':['line']});
  google.charts.setOnLoadCallback(draw_Chart);
  function draw_Chart(){
      var L = dataset;
      console.log("1234");
      console.log(L);
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Category');
      data.addColumn('number', 'Animes');
      data.addColumn('number', 'Movies');
      data.addColumn('number', 'Books');

      data.addRows(L);

      var options = {
        chart: {
          title: 'The rating comparison between anmies, movies and books',
          subtitle: 'number of each category'
        },
        width: 900,
        height: 500,
        axes: {
          x: {
            0: {side: 'top'}
          }
        }
      };

      var chart = new google.charts.Line(document.getElementById('line_top_x'));

      chart.draw(data, google.charts.Line.convertOptions(options));
    }

});

