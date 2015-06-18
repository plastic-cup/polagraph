$('#submit').click(function() {
    console.log($('#file')[0].files);
    var formData = new FormData();
    var file = $('#file')[0].files[0];
    formData.append('file',file);
    $.ajax({
        type: 'POST',
        url: '/upload',
        data: JSON.stringify(formData)
    }).done(function(response) {
        console.log("testing");
    });
});
