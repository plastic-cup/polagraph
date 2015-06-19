var feed = document.getElementById('feed');

function getRecentPictures(){
    var request = new XMLHttpRequest();
    request.open('GET', '/all');
    request.send();
    request.onreadystatechange = function(){
        if (request.readyState === 4){
            if (request.status === 200){
                var pictures = JSON.parse(request.responseText);
                console.log(pictures);
                pictures.forEach(function(element){
                    createPost(element.id, element.caption, element.ext);
                });
            }
        }
    };
}

function createPost(src, caption, ext){
    var post = '<div class="feed-entry">' +
        '<img class = "feed-pic" src="https://s3.amazonaws.com/polagraph/' + src + '.' + ext +'">' +
        '<p><span>Caption</span>' + caption + '</p>' +
    '</div>';
    feed.innerHTML += post;
}

document.onload = getRecentPictures();
