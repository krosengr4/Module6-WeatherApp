### Description of my Weather Dashboard App:
On this application, the user will get the current weather as well as a 5 day forecast of the city the user types in.

For the current weather, the user will get the temperature(in farenheight), wind speed(MPH), and humidity(%).
For the five day forecast, the user will get the date and an emoji to represent the weather conditions.

The application will also build and save the five most recent cities that the user has visited. The list of 5 cities are buttons for the user to click on and get the current and five day forecast for the city they clicked. 
The list of cities will be save if the user closes out of the application, and will be displayd again when the user reopens the application.

When the user loads into the application, the current and future conditions will display for the last city that the user searched for.

### USER STORY
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

### ACCEPTANCE CRITERIA
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
