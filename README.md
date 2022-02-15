# MERN Stack Boilerplate


# Work done contained in this assignment

# Food Delivery Web App
This is a basic food delivery web app built using MERN stack with all the basic functionalities such as 
+ Registration & Login for both buyer and vendor
+ Option to view and edit profile for buyer and vendor
+ Vendor can add, delete and edit food items.
+ Vendor can see the list of orders and can either accept them or reject them
+ Buyer can see,search and filter food items based on Veg/Non-Veg and price range.
+ Buyer can't order from shops that aren't open at that time
+ Buyer can order a food item of his/her choice by clicking on the order button and specifying the quantity of food item and add-ons if any after which the required amount of money gets deducted from the wallet
+ If the wallet balance is less than bill amount, order doesn't get placed. Buyer can add money to wallet and then place the order again
+ Buyer can click on Pick up order button once he/she picks it up and this completes the order.
+ Upon completing the order, he/she can rate it as well from 1 to 5. This updates the rating for that food item
+ No vendor can accept/cook more than 10 orders at a time
+ Vendor can see stats like Top 5 Items that have been sold, Counts for- Orders Placed,Pending Orders,Completed Orders

## Bonus
+ Email to the buyers on acceptance/rejection of their order buy creating a common email id stating that "<vendor-name>" accepted your order.
+ Deployed the website with 
    - frontend at:
    - backend  at:

also website is deployed


website link backend - https://mamba8bit.herokuapp.com/

website frontend link - mamba-8bitl.surge.sh








## Installations

### Node

* For Linux:
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

* For Mac:
```
brew install node
```

### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).


### React

```
npm install -g create-react-app
```

* To create a new React app:
```
create-react-app name_of_app
```

* To run the app, cd into the directory and do:
```
npm start
```

## Running the boilerplate

* Run Mongo daemon:
```
sudo mongod
```
Mongo will be running on port 27017.


* Run Express Backend:
```
cd backend/
npm install
npm start
```

* Run React Frontend:
```
cd frontend
npm install/
npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

