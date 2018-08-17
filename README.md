Start Date: 31/05/18 <br>

## Description: Personal portfolio and blog of Gabriela Guedez 

### Your Project's Name
Whiskey Insight

### Description: Whiskey Insight - A tool to discover highly rated whiskeys 
### at different price points

#### Notes on UXD
1. Strategy Plane<br>
<em>What are you trying to achieve?</em>
Being able to cross-reference the data from [whiskeyanalysis.com](http://whiskyanalysis.com/index.php/interesting-correlations/how-to-read-the-database/) in order to help users find the ideal bottle/s of whiskey to match their taste and budget.<br>
<em>For whom?</em><br>
For whiskey enthusiasts and people working in the whiskey industry.<br>
<br>
2. Scope Plane<br>
- Preproduction decisions: 31/05/18<br>
- Create mockup: 31/05/18<br>
<br>
3. Structure Plane<br>
- Simple structure, all graphs displayed on one page
<br>
4. Skeleton Plane<br>
- Build basic structure: 10/06/18<br>
- Add content and basic design: 18/06/18<br>
5. Surface Plane<br>
- Aim for a look and feel that evokes whiskey: use a colour palette with different shades of orange and brown.
- Keep a classic style, adult and refined, with a touch of colour but overall elegant feeling.
- Polish design and complete version 1: 20/06/18<br>

#### Mockup - 
Planned to have five graphs as [shown in mockup](/assets/pre-production/mock-up-project-2.pdf)

#### Features
As per the projects brief:<br>
**CREATE A DATA DASHBOARD**
- Build a data dashboard that visualizes a dataset of your choice:<br>
I used data from a CSV file by [whiskeyanalysis.com](http://whiskyanalysis.com/index.php/interesting-correlations/how-to-read-the-database/)<br>
to allow users find the top rated whiskeys after applying a series of filters.
- Your data can be stored locally (e.g., in a js file) or sourced from an API: Store locally.
- Visualise your data using D3.js and dc.js: I used five different types of dc graphs:<br>
the map with bubbles was based on **dataMap**, I also used a **selectMenu** for the country selection,<br>
a **barChart** for the flavour profile preferences, a **pieChart** for the price ranges, a **scatterPlot** <br>
to display the standard deviation (in relation to whiskey's ratings), and finally, a **dataTable** to render the result organisedly.<br>

<br>


#### Technologies Used

- HTML5
- CSS3
- Google Fonts
- Font Awesome
- Bootstrap 3.3.7
</br>

#### Note on Chrome Bug
- There is a bug in Google Chrome affecting the dataTable. It causes the first whiskey
to be incorrectly place at the top of the list. The second whiskey is the one that
actually should take the top position.
This issue is inexistent on Mozilla.
- Another bug has to do with the bubbles in the map: While most of the time they appear as expected,<br>
sometimes, the bubbles won't render. Just refresh the page.


### Testing

Manual testing included frequent use of the Developer Tools to adjust style to different screens.</br>
Manual clicking and confirmation that the links work as expected.</br>
Acting as a user, the following actions were undertaken as manual tests:
- Opening and closing the map.
- Filtering the results from each graph individually.
- Filtering the results from one graph while interacting with a second graph. <br>
- Then a third, then progressing until choosing at least one condition from each graph.
- Reseting.
- Clicking on the pagination: Tried to push beyond the number of available pages,<br>
tried to see if it would restart in unexpected positions after reseting or changing the filters.<br>

### Deployment

This project was deployed on GitHub Pages.

Differences between the deployed version and the development version:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?



#### Sources 

[NavBar Emoji](https://emojipedia.org/licensing/)

[Whiskey images](https://www.pexels.com/photo/alcohol-glass-beverage-pouring-8734/)

[Bubble chart code] (http://datamaps.github.io/)
[TopoJSON](https://github.com/topojson/topojson)

[Modal](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal)

[Back to top button](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_scroll_to_top)

[Footer](https://mdbootstrap.com/components/bootstrap-footer/)

Some pieces (with permision) for responsivness taken from [Mormoran's Dashboard Project](https://github.com/Mormoran/twitter_django/blob/master/static/js/graph.js)