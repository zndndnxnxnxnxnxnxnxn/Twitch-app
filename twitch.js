/*Using an API via JQuery as part of Free Code Camp course*/

$(document).ready(function() {

  const url = "https://api.twitch.tv/kraken";
  let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

  //Iterate through channels
  function searchChannels() {
    for (let i = 0; i < channels.length; i++) {
      streamCall(channels[i]);
    }
  }

  // AJAX call to see if channel is live
  function streamCall(channel) {
    $.ajax({
      type: 'GET',
      url: url + "/streams/" + channel,
      headers: {
        "Client-ID": "x40xupb9w4tu8kzgh2vfmtr2w29vag"
      },
      success: function(data) {
        channelCall(data, channel);
      },
    });
  }

  //AJAX call to retrieve channel data
  function channelCall(stream, channel) {
    $.ajax({
      type: 'GET',
      url: url + "/channels/" + channel,
      headers: {
        "Client-ID": "x40xupb9w4tu8kzgh2vfmtr2w29vag"
      },
      success: function(data) {
        appendData(stream, data);
      },
      error: function(error) {
        displayError(channel);
      }
    });
  }

  //Parse channel data and append to html
  function appendData(stream, data) {
    if (stream.stream) {
      $("ul").append('<li class="online"><img src="' + data.logo + '"><a href=' + data.url + '>' + data.name + '</a><br><span>Online</span><br><span class="status">' + data.status + '</span></li>');
    } else {
      $("ul").append('<li class="offline"><img src="' + data.logo + '"><a href=' + data.url + '>' + data.name + '</a><br><span>Channel Offline</span></li>');
    }
  }

  //Append error message if channel doesn't exist
  function displayError(channel) {
    $("ul").append('<li class="error"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Singapore_Road_Signs_-_Restrictive_Sign_-_No_entry_vehicular.svg/1024px-Singapore_Road_Signs_-_Restrictive_Sign_-_No_entry_vehicular.svg.png"><a>' + channel + '</a><br>Channel Error</li>');
  }

  searchChannels();
});