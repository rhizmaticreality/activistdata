# Olives & Sheep: Map Archive.
A map of Palestine displaying activist reports on daily activity, events etc.
the points are taken from a gdrive sheet filled out by the activists with info, such as address, date, media links and posts.

The code in this repo is based on the olives and sheep repo located at https://github.com/oohalakkadi/olivesandsheep/
The sheet used to add the points is located at https://docs.google.com/spreadsheets/d/1ndX6vrM9q-7rDKZ1j8_X2fWuhO3pVHHKJQGnw8jXCqU
When adding rows to the sheet, activists are required to fill in a specific address preferably as detailed as possible in the address column, and then the sheet code automatically populates the latitude and longitude fields needed to render points on the map.


Using this sheet, 3 layers are added to the map: 
* Clusters - circles for points that are clustered on the map, i.e., grouped together in different zoom levels, with circle radius 
* Cluster counts - numbers on the circles indicating the number of points in a cluster
* Activist data - points for sheet rows containing address latitude and longitude. Each of these points will show a popup when clicked with relevant info from other fields in the sheet row

