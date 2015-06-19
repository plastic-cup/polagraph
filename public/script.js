var feed = document.getElementById('feed');

function getRecentPictures(){
    var request = new XMLHttpRequest();
    request.open('GET', '/all');
    request.send();
    console.log('woorki');
    request.onreadystatechange = function(){
        if (request.readyState === 4){
            if (request.status === 200){
                var pictures = JSON.parse(request.responseText);
                pictures.forEach(function(element){
                    createPost(element.Key);
                });
            }
        }
    };
}

function createPost(src){
    var post = '<div class="feed-entry">' +
        '<img class = "feed-pic" src="https://s3.amazonaws.com/polagraph/' + src + '">' +
        '<p><span>Caption</span> These are some mountains. Look #familiar? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellent pulvinar elementum neque sit amet sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id turpis ac metus pellentesque tincidunt. Maecenas malesuada, risus eget tincidunt tincidunt, tortor ex tincidunt dolor, a dapibus dui justo non leo. Donec euismod lacus velit, vitae accumsan metus rhoncus non. Suspendisse iaculis mi et massa aliquam, vitae consectetur tellus auctor. Donec ullamcorper, ante vitae rutrum accumsan, tortor dui pulvinar felis, vitae porttitor ipsum arcu sed arcu. Nunc porta facilisis est in luctus. Vestibulum efficitur rutrum metus eget pharetra.</p>' +
    '</div>';
    feed.innerHTML += post;
}

document.onload = getRecentPictures();
