# E-commerce product dashboard

This project is a product dashboard for an e-commerce platform built using Next.js 14. In the example app deployed the users can search for, or selected from the dropdown, guitar FX pedals sales, conversion rates and average customer rating from the previous 1, 3, 6 or 12 months.
For each pedal (product) the user can also see the last five comments left by customers.

## Features

- Product information card, including items left in stock.
- Three interactive charts displaying sales over time, product conversion rate over time and customer review trends.
- Each chart can be toggled to show the data for the last month, last 3 months, last 6 months or last 12 months.
- Users can generate an xls download of the selected product data and timeframe display by clicking the Download button in each chart.
- Also displayed under the charts are the last 5 customer comments for the selected product.

## Branching and workflow

After the inital set up of the project repo I created a 'development' branch specifically for working on the project. All tasks were branched from development, completed and then pushed back into development. At the end of the project I merged development into main. I will build the deployment on Vercel from main. 

## Set up and run

**Prerequisites**

1. Node.js installed version 18+
2. npm

**Set up**

1. Clone the repo

```bash
git clone https://github.com/Monkfish3000/product-dashboard.git
```

2. cd into product-dashboard

```bash
cd product-dashboard
```

3.  Install all dependencies

Using npm:

```bash
npm install
```

4. Run the development server

```bash
npm run dev
```

5. Open browser and go to http://localhost:3000

## Notes

## SSR and data fetching

I chose to build the app in Next 14 as I wanted to take advantage of Next 14 and the ability to render components on the server that comes "out of the box" with Next 13+. As well as the built in optimizations that come with Next. Additionally, as I intend to deploy the finished app on Vercel - Next obviously integrates very well with Vercel - this made further sense.
I tried to strucuture my app so that all the data (mock data in a JSON) was fetched in server components - on the server - and then passed down into client components that needed to be interactive.

## Dir structure

This being a Next app I wanted the dashboard to be the "home page" but I didn't want 'dashboard' in the url so I created a hidden dashboard route in the app dir and then removed the page.tsx file from the app dir, leaving only layout.tsx. This was a deliberate decision so that dashboard would be the '/' page (for now) but it meant that in the future it would be easy to add a new page.tsx in the app dir that would be the "home page" - e.g. a sign in page or welcome page - and I could remove the () from the dashboard dir and easily have everything there on the /dashboard route. 

My components I have organised into 'functional', 'visual' and 'common' - there may be a little crossover but generally the 'visual' component are containers and server components that don't need any user interaction. The 'functional' components are all client components. 

## Styling

At the start of the project I intended to use a combination of tailwind and CSS modules. My intention was to use tailwind for styling the container components and the general layout of the app. And then to use CSS modules to be more precise in styling some of the jsx elements and for adding in specific animations to elements. However, in the end as the project progressed I realised that I was able to rely on tailwind exclusively.
The exception being the styling of the background grid that was my starting canvas. This was done in plain css and inspired heavily by the creators of - https://dub.co/

## Charts

For the charts I considered a number of libraries - chart.js I am very familiar with and have used a lot in the past. D3.js also looks interesting albeit a little too complex for the needs of this project. In the end I chose recharts.js that is in fact built with D3. 
I also considered using shadcn in combination with recharts for certain elements but in the found I could do everything I needed using tailwind and recharts. Maybe for future enhancements I will include shadcn as it is very customisable and lightweight - allowing just the components you want to be downloaded and not an entire components library. 

## Future enhancements

In terms of fetching data, using the enhanced 'fetch' that is built in to Next was very convenient - given that Next takes care of a lot of the caching for you (another advantage), I had to remind myself to manually invalidate the data when I was setting up the project and making changes to it. I then had to remember to set a cache revalidation policy - which I set to one hour. Probably adequate for an analtyics app but easy to modify if needed.
Moving forwards I would look to implement an ORM - probably Prism, which also integrates well with Next and would allow for more sophisticated data fetching and improve maintainability and scalability.

In terms of UX - there are some aspects of the search bar that I am not happy with. My first fix will be to clear the search term as soon as the user clicks away so that the user can quickly and easily search another product without having to manually delete the current one from the search bar. Or, I will add a small 'x' to the end of the bar that the user can click to quickly clear the search bar.

Additionally, when the dashboard first loads there is just a blank screen, before the user selects a product and views the data. I will address this by displaying a placeholder or welcome message or something other than a blank screen. 

When the graphs are displayed in 1 and 3 months - it would be much better to display the data by day (1 month) and week (3 month) so that the user can have a much deeper insight into their data.

The customer comments displayed under the graph are very light on data. I would enhance this to include information like, the date the comment was left and the rating the user left (we would need to fetch this data). Presently the first five (most recent) comments are diplayed. I would add a button that enabled the user to diplay the subsequent five.

Another important next step is to write unit tests to ensure reliability and enhance scalability. I will use Jest, focussing first on the data fetching and procesing of data in fetch-data and helpers.
