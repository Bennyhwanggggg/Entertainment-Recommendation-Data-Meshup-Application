/**
 * Created by wayne on 17/5/18.
 */

$(".animes").click(function(){
    // var e = document.getElementById("11");
    // var strUser = e.options[e.selectedIndex].value;
    //
    // var a = document.getElementById('11').value;
    // console.log(a)

    console.log("1");

    // var numtoshow = $(this).find('#number_of_animes').attr('data-id')
    // var numtoshow = $(this).find('#number_of_animes').data('id')

    // var e = document.getElementById("number_of_animes").value;
    // var numtoshow = e.options[e.selectedIndex].value;


    // $("#number_of_animes :selected").text(); // The text content of the selected option
    var numtoshow =$("#number_of_animes").val();
    console.log(numtoshow);
    const url = 'http://127.0.0.1:5000/show/animes?count='+numtoshow;
    fetch(url, {
        method: 'get'
    }).then((response)=> response.json())
      .then(function(data){
        console.log(data)

        var i;
        for (i = 0; i < data.length; i++) {
            text += data[i] + "<br>";
        }

        console.log(text)

        // animes_tr = document.createElement('tr');
        // animes_tr = document.createElement('td');
        //
        // var table = document.getElementById("table1");
        // var row = table.insertRow(0);
        // var cell1 = row.insertCell(0);
        // var cell2 = row.insertCell(1);
        // cell1.innerHTML = "NEW CELL1";
        // cell2.innerHTML = "NEW CELL2";



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