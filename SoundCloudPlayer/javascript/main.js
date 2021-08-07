// search

var UI = {}

UI.Enterpress = function() {
    document.querySelector(".js-search").addEventListener('keypress', function(e) {

        if (e.which === 13) {
            var inputValue = e.target.value;
            SoundCloudAPI.getTrack(inputValue);

        }

    })
}

UI.Submit = function() {
    document.querySelector(".js-submit").addEventListener('click', function(e) {

        var inputValue = document.querySelector(".js-search").value;
        SoundCloudAPI.getTrack(inputValue);

    })
}

UI.Enterpress();
UI.Submit();



//  query soundcloud api


var SoundCloudAPI = {};


SoundCloudAPI.init = function() {
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });

}

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(inputValue) {
    SC.get('/tracks', {
        q: inputValue,
    }).then(function(tracks) {
        console.log(tracks);
        SoundCloudAPI.renderTracks(tracks);
    });

}

SoundCloudAPI.getTrack();

SoundCloudAPI.renderTracks = function(tracks) {

    var body = document.querySelector(".search-results");
    body.innerHTML = null;

    tracks.forEach(function(track) {

        //card
        var card = document.createElement('div');
        card.classList.add('card');

        //image
        var imageDiv = document.createElement('div');
        imageDiv.classList.add('image');

        var image_img = document.createElement('img');
        image_img.classList.add('image_img');
        image_img.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract/';

        imageDiv.appendChild(image_img);

        //content
        var content = document.createElement('div');
        content.classList.add('content');

        var header = document.createElement('div');
        header.classList.add('header');

        header.innerHTML = '<a href="' + track.permalink_url + ' "target="_blank">' + track.title + '</a>';

        //button
        var button = document.createElement('div');
        button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

        var icon = document.createElement('i');
        icon.classList.add('add', 'icon');

        var buttonText = document.createElement('span');
        buttonText.innerText = 'Add to playlist';

        //appending
        content.appendChild(header);
        button.appendChild(icon);
        button.appendChild(buttonText);
        button.addEventListener('click', function() {
            SoundCloudAPI.getEmbed(track.permalink_url)

        });

        card.appendChild(imageDiv);
        card.appendChild(content);
        card.appendChild(button);


        var searchResults = document.querySelector(".js-search-results");
        searchResults.appendChild(card);



    });

}




// display cards

SoundCloudAPI.getEmbed = function(trackURL) {
    console.log('click yayay');
    var track_url = trackURL;
    SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
        console.log('oEmbed response: ', oEmbed);

        var sideBar = document.querySelector('.js-playlist');


        var box = document.createElement('div');
        box.innerHTML = oEmbed.html;

        sideBar.insertBefore(box, sideBar.firstChild);
        localStorage.setItem("key", sideBar.innerHTML);
    });


}

var sideBar = document.querySelector('.js-playlist');
sideBar.innerHTML = localStorage.getItem("key");