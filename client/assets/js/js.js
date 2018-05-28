/**
 * Created by wayne on 17/5/18.
 */

$(document).ready(function() {
    $("#loading0").hide();

    var anime_genres = ["Comedy", "Shoujo Ai", "Magic", "Cars", "Mecha",
	"Romance", "Slice of Life", "Ecchi", "School", "Demons",
	"Psychological", "Dementia", "Horror", "Harem", "Game", "Shoujo",
	"Thriller", "Shounen", "Kids", "Sci-Fi", "Sports", "Parody", 
	"Shounen Ai", "Music", "Martial Arts", "Vampire", "Fantasy", "Seinen",
	"Samurai", "Action", "Historical", "Mystery", "Police", "Military",
	"Josei", "Space", "Supernatural", "Super Power", "Drama"];

    var movie_genres = ["Adventure", "Musical", "Fantasy", "Drama",
	"Animation", "Action", "Family", "Biography", "War", "Comedy",
	"Horror", "History", "Crime", "Mystery", "Music", "Western",
	"Thriller", "Sport", "Romance", "Sci-Fi"];

    var book_genres = ["Fiction", "Thriller", "Shounen", "Literature",
	"Military", "Drama", "Fantasy", "Comedy", "Slice of Life",
	"Supernatural", "Super Power", "Mecha", "Sci-Fi"];

    var all_genres = anime_genres.concat(movie_genres).concat(book_genres).filter(function(elem, index, self) {
	return index == self.indexOf(elem);
    });

    jQuery.each(anime_genres, function() {
	$("#anime_genres").append("<option value='" + this + "'>" + this + "</option>");
    });

    jQuery.each(movie_genres, function() {
	$("#movie_genres").append("<option value='" + this + "'>" + this + "</option>");
    });

    jQuery.each(book_genres, function() {
	$("#book_genres").append("<option value='" + this + "'>" + this + "</option>");
    });

    jQuery.each(all_genres, function() {
	$("#all_filter_genre").append("<option value='" + this + "'>" + this + "</option>");
    });
});

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

$("#all_filter").click(function() {
    var url = "http://127.0.0.1:5000/show/combined?type1=Movies&type2=Animes&type3=Books";

    var filter_genre = $("#all_filter_genre").val();
    var filter_year = $("#all_filter_year").val();

    if (filter_genre) {
	url += "?genre=" + filter_genre;
    }

    if (filter_genre) {
	url += "?year=" + filter_year;
    }

    $("#all_results tbody tr").remove();

    $("#loading0").show();

    fetch(url, {
        method: 'get'
    })
    .then((response)=> response.json())
    .then(function(data){
	$("#loading0").hide();
	jQuery.each(data, function() {
	    var table = "<tr class='all_results'>";
	    table += "<th>" + this.title + "</th>";
	    table += "<th>" + this.title + "</th>";
        table += "<th>" + this.genre.join(', ') + "</th>";
	    table += "<th>" + this.year.toString() + "</th>";
	    table += "<th>" + this.revenue.toString() + "</th>";
	    table += "<th>" + this.rating.toString() + "</th>";
	    table += "</tr>";
	    $("#all_results > tbody:last-child").append(table);
	});
    });
});

$("#animes_search").click(function(){/* table1_Animes*/

    var loading = document.getElementById('loading1');
    loading.style.display = "block";

    var table1 = document.getElementById('table1_tbody');
    console.log("1");
    var k;
    if(document.getElementsByClassName("table1tr").length!=0){
            table1tr = document.getElementsByClassName("table1tr");
            console.log(table1tr)
            var data_length = table1tr.length
            var i = 0;
            while (i < data_length){
                table1.removeChild(table1tr[0]);
                i++;
            }
    }
    var numtoshow =$("#number_of_animes").val();
    var genretoshow =$("#anime_genres").val();
    var typetoshow =$("#type_of_animes").val();
    var start_rate =$("#rate_start").val();
    var end_rate =$("#rate_end").val();
    var up_down =$("#up_down").val();
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
        loading.style.display = "none";
        if (data.length!=0){
            var i;
            var animes_td;
            var animes_tr
            for (i = 0; i < data.length; i++) {
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
                animes_td2.innerHTML = data[i]['genre'].join(', ');
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
    });
});

$("#movies_search").click(function(){
    var loading = document.getElementById('loading2');
    loading.style.display = "block";
    var table2 = document.getElementById('table2_tbody');
    console.log("1");
    var k;
    if(document.getElementsByClassName("table2tr").length!=0){
            table2tr = document.getElementsByClassName("table2tr");
            var data_length = table2tr.length;
            var i = 0;
            while (i < data_length){
                table2.removeChild(table2tr[0]);
                i++;
            }
    }

    var numtoshow =$("#number_of_movie").val();
    var genretoshow =$("#movie_genres").val();
    var start_rate =$("#rate_start_movie").val();
    var end_rate =$("#rate_end_movie").val();
    var up_down =$("#up_down_movie").val();
    var year =$("#year_movie").val();
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
        loading.style.display = "none";

        if (data.length!=0){
            var i;

        var animes_td;
        var movies_tr;
        for (i = 0; i < data.length; i++) {
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
            movies_td10 = document.createElement('td');
            movies_td11 = document.createElement('td');

            movies_td1.innerHTML = data[i]['title'];
            movies_td2.innerHTML = data[i]['genre'].join(', ');
            movies_td3.innerHTML = data[i]['description'];
            movies_td4.innerHTML = data[i]['director'];
            movies_td5.innerHTML = data[i]['actors'];
            movies_td6.innerHTML = data[i]['year'];
            movies_td7.innerHTML = data[i]['runtime'];
            movies_td8.innerHTML = data[i]['rating'];
            movies_td10.innerHTML = data[i]['metascore'];
            movies_td11.innerHTML = data[i]['revenue'];

            movies_tr.appendChild(movies_td1);
            movies_tr.appendChild(movies_td2);
            movies_tr.appendChild(movies_td3);
            movies_tr.appendChild(movies_td4);
            movies_tr.appendChild(movies_td5);
            movies_tr.appendChild(movies_td6);
            movies_tr.appendChild(movies_td7);
            movies_tr.appendChild(movies_td8);
            movies_tr.appendChild(movies_td10);
            movies_tr.appendChild(movies_td11);
            table2.appendChild(movies_tr)
        }
	document.getElementById("search_help_msg_movies").innerHTML= "";
        }else{
            alert("no data")
        }
    });
});

$("#books_search").click(function(){
    var loading = document.getElementById('loading3');
    loading.style.display = "block";
    var table3 = document.getElementById('table3_tbody');
    var k;
    if(document.getElementsByClassName("table3tr").length!=0){
            table3tr = document.getElementsByClassName("table3tr");
            var data_length = table3tr.length;
            var i = 0;
            while (i < data_length){
                table3.removeChild(table3tr[0]);
                i++;
            }
    }

    var numtoshow =$("#number_of_book").val();
    var genretoshow =$("#book_genres").val();
    var start_rate =$("#rate_start_book").val();
    var end_rate =$("#rate_end_book").val();
    var up_down =$("#up_down_book").val();
    var year =$("#year_book").val();
    var url = 'http://127.0.0.1:5000/show/books?';
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
        loading.style.display = "none";
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
                books_td2.innerHTML = data[i]['genre'].join(', ');
                books_td3.innerHTML = data[i]['isbn'];
                books_td4.innerHTML = data[i]['author'];
                books_td5.innerHTML = data[i]['year'];
                books_td6.innerHTML = data[i]['rating'];
                books_td7.innerHTML = data[i]['revenue'];

                books_tr.appendChild(books_td1);
                books_tr.appendChild(books_td2);
                books_tr.appendChild(books_td3);
                books_tr.appendChild(books_td4);
                books_tr.appendChild(books_td5);
                books_tr.appendChild(books_td6);
                books_tr.appendChild(books_td7);
                table3.appendChild(books_tr)
            }
	    document.getElementById("search_help_msg_books").innerHTML= "";
        }else{
            alert("Sorry, we do not have data!!")
        }
    });
});


function pie_chart(){
    var loading = document.getElementById('loading4');
    loading.style.display = "block";
      $(function(){
          url = "http://127.0.0.1:5000/analytics/productionquality?",
          genre = $('#genre_of_combine').val();
          year = $('#year_combine').val();
          year_start = $('#year_start_combine').val();
          year_end = $('#year_end_combine').val();
          var name_items = [];
          var name_value = [];
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
              name_value.push(result.Number_of_animes);
              name_value.push(result.Number_of_movies);
              name_value.push(result.Number_of_books);
              name_value.push(result.Average_rating_of_animes);
              name_value.push(result.Average_rating_of_movies);
              name_value.push(result.Average_rating_of_books);
              name_value.push(result.Average_earning_of_animes);
              name_value.push(result.Average_earning_of_movies);
              name_value.push(result.Average_earning_of_books);
              for (let key in result){
                name_items.push(key);
              }
            }
      });
      loading.style.display = "none";

      google.charts.load("current", {packages:['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data1 = google.visualization.arrayToDataTable([['Entertainment', 'length of results'],
        ['Animes', name_value[0]],
        ['Movies', name_value[1]],
        ['Books', name_value[2]]]);

        // Optional; add a title and set the width and height of the chart
        var option = {'title':'Entertainment Type Production amount', 'width':550, 'height':500};

        // Display the chart inside the <div> element with id="piechart"
        var pie = new google.visualization.PieChart(document.getElementById('piechart'));
        pie.draw(data1, option);

        // graph 1
        var data = google.visualization.arrayToDataTable([
          ["Element", "Number", { role: "style" } ],
          ["Animes", name_value[3], "#b87333"],
          ["Movies", name_value[4], "silver"],
          ["Books", name_value[5], "gold"]
        ]);

        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
                         { calc: "stringify",
                           sourceColumn: 1,
                           type: "string",
                           role: "annotation" },
                         2]);

        var options = {
          title: "Average Rating of Each Entertainment Type",
          width: 500,
          height: 200,
          bar: {groupWidth: "95%"},
          legend: { position: "none" },
          vAxis: {minValue: 0}
        };
        var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
        chart.draw(view, options);

        // graph2
        var data2 = google.visualization.arrayToDataTable([
          ["Element", "Number", { role: "style" } ],
          ["Animes", name_value[6], "#b87333"],
          ["Movies", name_value[7], "silver"],
          ["Books", name_value[8], "gold"]
        ]);

        var view2 = new google.visualization.DataView(data2);
        view.setColumns([0, 1,
                         { calc: "stringify",
                           sourceColumn: 1,
                           type: "string",
                           role: "annotation" },
                         2]);

        var options2 = {
          title: "Average Revenue of Each Entertainment Type",
          width: 500,
          height: 200,
          bar: {groupWidth: "95%"},
          legend: { position: "none" },
          vAxis: {minValue: 0}
        };
        var chart2 = new google.visualization.ColumnChart(document.getElementById("columnchart_values2"));
        chart2.draw(view2, options2);
    }
    })
}


var dataset = [];
$("#combine_trend").click(function(){
    var loading = document.getElementById('loading4');
    loading.style.display = "block";

    $(function(){
      url = "http://127.0.0.1:5000/analytics/productiontrend?",
      genre = $('#genre_of_combine').val(),
      year_start = $('#year_start_combine').val(),
      year_end = $('#year_end_combine').val()
      var url = "http://127.0.0.1:5000/analytics/productiontrend?genre="+genre;
      if (year_start){
        url = url + "&year_start=" + year_start
      }
      if (year_end){
        url = url + "&year_end=" + year_end
      }
      $.ajax({
        url:url,
        type:'get',
        dataType:"json",
        async:false,
        success: function(result) {
            loading.style.display = "none";
          dataset = result.data

        }
      });
      loading.style.display = "none";
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(draw_Chart);
      function draw_Chart(){
          var L = dataset;
          var data_1 = google.visualization.arrayToDataTable(L);
          var options = {
              title: 'Rating Comparison',
              curveType: 'function',
              legend: { position: 'bottom' },
              vAxis: {
                  title: 'Rating',
                  logScale: false
                },
              hAxis: {
                  title: 'Year',
                  logScale: true
                }
            };
          var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
          chart.draw(data_1, options);
        }
    });
});

var dataset_1 = [];
$("#combine_revenue").click(function(){
    var loading = document.getElementById('loading4');
    loading.style.display = "block";

    $(function(){
      url = "http://127.0.0.1:5000/analytics/productionrevenue?",
      year_start = $('#year_start_combine').val(),
      year_end = $('#year_end_combine').val()
      var url = "http://127.0.0.1:5000/analytics/productionrevenue?";
      if (year_start){
        url = url + "year_start=" + year_start
      }
      if (year_end){
        url = url + "&year_end=" + year_end
      }

      $.ajax({
        url:url,
        type:'get',
        dataType:"json",
        async:false,
        success: function(result) {
            loading.style.display = "none";
          dataset_1 = result.data

        }
      });
      loading.style.display = "none";
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(draw_Chart_1);
      function draw_Chart_1(){
          var L = dataset_1;
          var data_1 = google.visualization.arrayToDataTable(L);
          var options = {
              title: 'Revenue Comparison',
              curveType: 'function',
              legend: { position: 'bottom' },
              vAxis: {
                  title: 'Revenue(million)',
                  logScale: false
                },
              hAxis: {
                  title: 'Year',
                  logScale: true
                }
            };

          var chart = new google.visualization.LineChart(document.getElementById('line_top_x'));
          chart.draw(data_1, options);
        }
    });
});


function orderbarchart(){
    var loading = document.getElementById('loading4');
    loading.style.display = "block";
      $(function(){
      var url = "http://127.0.0.1:5000/analytics/genrequality?count=10&earning=highest";
      var year = $('#year_combine').val();
      var name_items = [];
      var name_value = [];
      var name_value2 = [];
      if (year){
        url = url + "&year="+year
      } else {
        alert('No year selected');
      }
      var data = [];
      $.ajax({
        url:url,
        type:'get',
        dataType:"json",
        async:false,
        success: function(result) {
            loading.style.display = "none";
            var i;
            for (i=0; i<10; i++){
                name_items.push(result[i].genre)
                name_value.push(result[i].average_rating)
                name_value2.push(result[i].average_revenue)
          }
        }
      });
      loading.style.display = "none";
      google.charts.load("current", {packages:['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        // graph 1
        var data = google.visualization.arrayToDataTable([
          ["Element", "Number", { role: "style" } ],
          [name_items[0], name_value[0], "blue"],
          [name_items[1], name_value[1], "blue"],
          [name_items[2], name_value[2], "blue"],
          [name_items[3], name_value[3], "blue"],
          [name_items[4], name_value[4], "blue"],
          [name_items[5], name_value[5], "blue"],
          [name_items[6], name_value[6], "blue"],
          [name_items[7], name_value[7], "blue"],
          [name_items[8], name_value[8], "blue"],
          [name_items[9], name_value[9], "blue"]
        ]);

        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
                         { calc: "stringify",
                           sourceColumn: 1,
                           type: "string",
                           role: "annotation" },
                         2]);

        var options = {
          title: "Genre vs Avg Rating",
          width: 500,
          height: 200,
          bar: {groupWidth: "95%"},
          legend: { position: "none" },
          vAxis: {minValue: 0}
        };
        var chart = new google.visualization.ColumnChart(document.getElementById("genrebarchart1"));
        chart.draw(view, options);

        // graph2
        var data = google.visualization.arrayToDataTable([
          ["Element", "Number", { role: "style" } ],
          [name_items[0], name_value2[0], "blue"],
          [name_items[1], name_value2[1], "blue"],
          [name_items[2], name_value2[2], "blue"],
          [name_items[3], name_value2[3], "blue"],
          [name_items[4], name_value2[4], "blue"],
          [name_items[5], name_value2[5], "blue"],
          [name_items[6], name_value2[6], "blue"],
          [name_items[7], name_value2[7], "blue"],
          [name_items[8], name_value2[8], "blue"],
          [name_items[9], name_value2[9], "blue"]
        ]);

        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
                         { calc: "stringify",
                           sourceColumn: 1,
                           type: "string",
                           role: "annotation" },
                         2]);

        var options = {
          title: "Genre vs Avg Revenue (mil)",
          width: 500,
          height: 200,
          bar: {groupWidth: "95%"},
          legend: { position: "none" },
          vAxis: {minValue: 0}
        };
        var chart = new google.visualization.ColumnChart(document.getElementById("genrebarchart2"));
        chart.draw(view, options);
    }
    })
}
