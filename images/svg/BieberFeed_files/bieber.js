/*
    bieber.js
    An implementation of the BieberFeed project.
*/

var tweetIDs = {};
const LIST_LENGTH = 26;

window.addEventListener('load', function(){
    updateTweets();
    var intervalID = window.setInterval(updateTweets, 5000);
    $('#live_updates_checkbox').change(function(){
        if ($(this).is(":checked")) {
            updateTweets();
            intervalID = window.setInterval(updateTweets, 5000);
        } else {
            window.clearInterval(intervalID);
        }
    });

}, false);

function updateTweets() {
    $.get('http://ec2-54-210-131-157.compute-1.amazonaws.com/feed/ohu', function(data, status) {
        if (status === "success") {
            var ul = '#tweets';
            for (i = 0; i < 26; i++) {
                if (!tweetIDs.hasOwnProperty(data[i].id_str)) {
                    tweetIDs[data[i].id_str] = 'exists';
                    var li = $('<li></li>');
                    li.html('<strong>' + data[i].user.name + '</strong> ' + data[i].text);
                    $(ul).prepend(li);
                    animateListItem(li);
                }
            }
            while ($(ul).children().length > LIST_LENGTH) {
                $(ul + " li:last").remove();
            }
        } else {
            // something went wrong, check status
        }
    });
}

function animateListItem(li) {
    setTimeout(function() {
        li.addClass('show');
    }, 10);
}
