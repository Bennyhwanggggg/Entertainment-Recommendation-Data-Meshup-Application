/**
 * Created by wayne on 17/5/18.
 */


$(".book").click(function(){
    console.log("1")
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

$(".IMDB").click(function(){
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