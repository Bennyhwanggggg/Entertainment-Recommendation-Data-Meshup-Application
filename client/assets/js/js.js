/**
 * Created by wayne on 17/5/18.
 */

$(".animes").click(function(){

    var table1 = document.getElementById('table1_tbody');
    console.log("1");
    var k;
    if(document.getElementsByClassName("table1tr").length!=0){
            table1tr = document.getElementsByClassName("table1tr");
            console.log(table1tr.length)
            for (k = 0; k < table1tr.length; k++) {
                console.log(k);
                table1.removeChild(table1tr[k]);
                console.log(table1tr);
            }

    }

    var numtoshow =$("#number_of_animes").val();
    var genretoshow =$("#genre_of_animes").val();
    var typetoshow =$("#type_of_animes").val();
    console.log(numtoshow);
    const url = 'http://127.0.0.1:5000/show/animes?count='+numtoshow+'&genre='+genretoshow+'&title='+typetoshow;
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
        

        console.log(table1)
    });

    $(".content1").show();
    $(".content2").hide();
    $(".content3").hide();
    $(".content4").hide();
});

$(".movie").click(function(){
    console.log("22222222222");
    $(".content2").show();
    $(".content1").hide();
    $(".content3").hide();
    $(".content4").hide();
});

$(".books").click(function(){
    console.log("3");
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