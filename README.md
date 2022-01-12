# Snacks Pizza
 
- E-Commerce restaurant/food-ordering application built with Next.js, React, Redux, and MongoDB. 
- PayPal API integrated for customer card payments. 
- Customers can order, pay, and track orders from payment through delivery.
- Admin dashboard to add/edit products and move orders through 4 stages (payment, processing, on the way, delivered.)

## Screenshots
<img src="public/Screenshot (242).png">  
<img src="public/Screenshot (245).png">
 
## Customized for Freelance Projects
- Initially this project was built with JavaScript to fetch all character data from an external API (https://akabab.github.io/superhero-api/).
- However, due to the unpredicatable nature of using any 3rd party controlled API/data, I decided to develop an Express server with Node.js and load the data from a MongoDb collection I could control.
- I am now able to avoid potential rejected requests from 3rd party APIs (e.g., for exceeding request quotas, CORS issues, etc.) and make the app more performant by controlling the data. 

## Project Features
- Display cards for all heroes and villains on main screen.
- User may search for specific characters in Navbar Search. 
- User clicks card button to display character modal containing name (red/hero or black/villain), larger image and 5 submodal buttons.
- The submodals display detailed data relative to character Powerstats, Biography, Appearance, Work and Connections.
- App incorporates several CSS animations/transitions in Navbar, Main Card View, and Modal View.

## View Deployed Project

- Project deployed with Vercel.


