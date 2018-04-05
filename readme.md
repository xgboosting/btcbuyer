Site structure like http://instantdomainsearch.com

User can enter link of a product and that leads him down a process of registration and payment.
After that, our team sees the product the user wants purchased and we can deliver it in a user-specified way (online or physical).

Thats it. With all its quirks and quarks - FAQ, forgotten password, order status, sales overview. :)

http://instantdomainsearch.com

After domain is entered in field, script grabs screenshot of website and copies the site title.

user confirms this is the right product page.

Next a box appears to describe the product and enter price separately

Next the user can enter

Name First Name Address Country Phone #

Mandatory email

Optional password

—

Or login

Then

Show user final price including our fee Payment Method using coinbase business crypto api

Functionality of rest:

User / login /register /forgot pass Order system admin view Different priority for orders -
default is normal. Can go to Important, Critical Different statuses for orders -
default is open. Can be changed to closed, received, in delivery, in progress Price of each order total total order price/fee .
We can adjust price and ask for more payment in case user forgot shipping fee quantity
 Link Admin can answer all orders and see a small overview of all orders listed by either
 DATE, STATUS, LAST_REPLY, PRIORITY, PRICE users can also add more answers to order even without answer from admin first.

The user should see in his panel:

orders - settings

Orders overview for user

Date, Link, Quantity, Price,, Status, Last Reply

can view orders and see replies from admins and reply himself

Settings

Change password

Change default delivery address (name, first name, address, country, phone #)

Change email

Delete account

# user methods

## class create user

* post - user creation

⋅⋅* name
⋅⋅* address
⋅⋅* country
⋅⋅* email
⋅⋅* phone number

* get - sends email for email validation

## class validate email

* get - validates email

# class forgot password

* get - sends email
⋅⋅* enter email

* post - change password
⋅⋅* new password

## class delete user

* post - delete user

# order methods

## class make order

* post - submit order
⋅⋅1. auto fill if user logged in
⋅⋅* name
⋅⋅* address
⋅⋅* country
⋅⋅* phone number
⋅⋅2. if user not logged in
⋅⋅* email
⋅⋅* password  
⋅⋅* save info/ create account bool

## class dashboard

* post - submits message to order

⋅⋅* message

* get - returns orders, filter by
⋅⋅* date
⋅⋅* price
⋅⋅* status

* put - change email, password, default address




























.
