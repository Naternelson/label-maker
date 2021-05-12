# Product Parameters Project
This project covers creating a product, with indiduval item paremeters. These item parameters outline the parameters for a unique item code for each item of a product. 

## Specs
This project utilitizes Ruby on Rails  ```~> 6.1.3``` for its backend feautes. For its frontend, it utilizes vanilla Javascript, HTML, and CSS with no additional libraries. The project is divided into backend and frontend folders.

## Initization
To view and edit this project, fork and clone this repository onto your local machine. Within the backend directory, be sure to run ```bundle install ``` to download all the necessary gem files.

To initialize the database, run ``` rails db:migrate```. A seed files is provided; to load that run ```rails db:seed```.

The backend does not support local views; any HTML request will be presented back with a JSON view. No user or session requirements exists, all information is unprotected. 

## Browser  
Before you load the webpage, be sure to navigate to the ```backend/``` directory and run ```rails s ``` to start the rails server. 

To see this project in the browser, navigate to ```frontend/``` directory and open the ```index.html``` file.

### Design
Center of screen will be a form for new products, with an option to add item code parameters to the product. You can add as many as you need.

if you have seeded the database, there will be a column of products to the right. You can select a product and it will be pulled to the center, where you can delete the product or add items to this product.

### Compatibility
For best performance, use Google Chrome. This project may not compatible with differenct browsers.

## Licence
This product is free to use.
Project creator: Nate Nelson