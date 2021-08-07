// grabbing the input value

var input = "hello";
search(input);
document.querySelector(".js-go").addEventListener('click', function() {
    input = document.querySelector("input").value;
    search(input);
});

document.querySelector(".js-userinput").addEventListener('keyup', function(e) {
    input = document.querySelector("input").value;

    if (e.which === 13) { search(input); }

});

// API stuff to do

function search(input) {


    var url = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=iE7XNDrBH2OCnQTDcZJcaG8tUYQq5Ms0";

    // AJAX Request
    var GiphyAJAXCall = new XMLHttpRequest();
    GiphyAJAXCall.open('GET', url);
    GiphyAJAXCall.send();

    GiphyAJAXCall.addEventListener('load', function(e) {

        var data = e.target.response;
        pushToDOM(data);

    });


}

// showing the gifs


function pushToDOM(input) {

    var container = document.querySelector(".js-container");
    container.innerHTML = null;
    var response = JSON.parse(input);
    var imageURLs = response.data;
    imageURLs.forEach(function(image) {
        var src = image.images.fixed_height.url;
        var container = document.querySelector(".js-container");
        container.innerHTML += "<img src=\"" + src + "\" class=\"container-image\">";

    });

}