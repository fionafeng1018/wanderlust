// Foursquare API Info
const clientId = 'FBNWU1HP0MTF5XWEBSD3TXBVZ5OM42NT1M0RHBTAXEZBPGYV';
const clientSecret = 'M0Z4F42FIZLS3MTEHDV3XA5NEEWWNRGZBTP3OTZ0L4R01JU3';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '9b99c7917f89b4c2437d35804a8c03d9';
const weatherUrl ='https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20200204`;
  
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      return venues;
    }
  }
  catch(error){
    console.log(error);
  }
}

//request photos:
const getVenuesPhoto = async (venueId) => {
  const photo_url ='https://api.foursquare.com/v2/venues/'
  const urlToFetch = `${photo_url}${venueId}/photos?limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20200204`;
        
  try{
       const response = await fetch(urlToFetch);
       if(response.ok){
          const jsonResponse = await response.json();
          const photoSrc = jsonResponse.response.photos.items[0];
          const photoUrl = photoSrc.prefix+'100x100'+photoSrc.suffix;
         // console.log(photoUrl)
          return photoUrl;
        }
      }
      catch(error){
            console.log(error);
      }
  }

const getForecast = async() => {
  const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = response.json();
      return jsonResponse;
    }
  }
  catch(error){
    console.log(error);
  }
}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = venueIcon.prefix+'bg_64'+venueIcon.suffix;
    const venueId = venue.id;
    const venuePhoto = getVenuesPhoto(venueId).then(
      img => {
                 let venueContent = createVenueHTML(venue.name,venue.location,venueImgSrc,img);
                  $venue.append(venueContent);
            }        
      );
  });
  
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here: 
  const weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues =>{
    renderVenues(venues)
  })
  getForecast().then(forecast=>{
    renderForecast(forecast)
  }
  )
  return false;
}

$submit.click(executeSearch)