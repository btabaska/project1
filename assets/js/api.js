function theAudioDBAPIQuery() {
  var search = prompt("what do you want to search for");
  var apiURL = `https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?a=${search}`;
  var returnObject = [];

  fetchAlbum = (apiURL) => {
    fetch(apiURL)
      .then((response) => response.json())
      .then((responseJson) => fetchTrackList(responseJson));
  };

  function fetchTrackList(response) {
    response.album.forEach((album) => {
      fetch(
        "https://www.theaudiodb.com/api/v1/json/1/track.php?m=" + album.idAlbum
      )
        .then((response) => response.json())
        .then(
          (data) =>
            (returnObject[
              `${album.strArtist} - ${album.strAlbum} - ${runtimeCounter(data)}`
            ] = data)
        );
    });
  }
  fetchAlbum(apiURL);
  return returnObject;
}

console.log(theAudioDBAPIQuery());

runtimeCounter = (album) => {
  var totalRuntime = 0;
  console.log(album.track);
  album.track.forEach((track) => {
    totalRuntime += parseInt(track.intDuration);
  });

  return msToHMS(totalRuntime);
};

function msToHMS(ms) {
  // 1- Convert to seconds:
  var seconds = ms / 1000;
  // 2- Extract hours:
  var hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;
  return hours + ":" + minutes + ":" + parseInt(seconds);
}
//TODO: Adder function to get the album runtime from the data
//Finish the return object for the data
