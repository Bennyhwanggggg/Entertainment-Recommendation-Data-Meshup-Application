/**
 * Created by wayne on 17/5/18.
 */


$(".animes").click(function(){
    console.log("1");
    const url = 'http://127.0.0.1:5000/animes';
    
    var e = document.getElementById("11");
    var strUser = e.options[e.selectedIndex].value;

    var a = document.getElementById('11').value
    console.log(a)
    
    // fetch(url, {
    //     method: 'get',
    //     headers: {'Content-Type' : 'application/json'},
    //     body: JSON.stringify({
    //         order: document.getElementById('11').value
    //     })
    // }).then(function(response){
    //     return response.json()
    // }).then(function(data) {
    //     console.log(data)
    //     // loading.style.display = "none";
    //     // if (data.lgname == "The LGA name you inputed doesn't exist.") {
    //     //     let div = document.createElement('div');
    //     //     div.setAttribute('id', "666");
    //     //     div.innerHTML = 'https://mlab.com/databases/my-database/collections/crime/' + data.lgname;
    //     //     return parent_tag.appendChild(div);
    //     // }
    // }

    $(".content1").show();
    $(".content2").hide();
    $(".content3").hide();
    $(".content4").hide();
});

$(".movie").click(function(){
    console.log("2")
    $(".content2").show();
    $(".content1").hide();
    $(".content3").hide();
    $(".content4").hide();
});

$(".books").click(function(){
    console.log("3")
    $(".content3").show();
    $(".content1").hide();
    $(".content2").hide();
    $(".content4").hide();
});

$(".Combination").click(function(){
    console.log("4")
    $(".content4").show();
    $(".content1").hide();
    $(".content3").hide();
    $(".content2").hide();
});