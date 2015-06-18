[![Build Status](https://travis-ci.org/plastic-cup/polagraph.svg?branch=master)](https://travis-ci.org/plastic-cup/polagraph)
[![Code Climate](https://codeclimate.com/github/plastic-cup/polagraph/badges/gpa.svg)](https://codeclimate.com/github/plastic-cup/polagraph)
[![Test Coverage](https://codeclimate.com/github/plastic-cup/polagraph/badges/coverage.svg)](https://codeclimate.com/github/plastic-cup/polagraph/coverage)




# polagraph

A mobile/web APP to which users can upload their photos. Users need to sign in to upload & comment on them.

Will be hosted on Heroku eventually (estimated date of online launch 18.6.2015).

##How to use?

Out polagraph should be online at Heroku by Thursday 18.6.2015.
But until then:
Add dependencies will be installed by
 `npm install`.


#APP specs

+ [ ] Storage:
  + [ ] Images Amazon s3
  + [ ] Everything else Mongo DB
+ [ ] Authentication:
  + [ ] Using a 3rd party authentication
  + [ ] Stretch goal own login (hashing pw's etc)
+ [ ] Image Upload
+ [ ] Image View
+ [ ] Image Delete
+ [ ] Image comment
+ [ ] Email alerting
  + [ ] Signup
  + [ ] Daily digest
+ [ ] Data analysis
  + [ ] Setting up data log
  + [ ] Decide what we want to analyze


#### TO DO LIST
@ Pivotal tracker-> User stories & Epics & ToDoList



##How?

WDD -> Wine driven development

RDD -> ReadMe driven development

TDD -> Test driven development

##What we be using?
The kickass framework of the week is  **HAPI JS** (http://hapijs.com/)

-3rd party authentication with hapi plugin-> **bell**
(https://github.com/hapijs/bell)

-Cookie based session management with bell to enable multiple pages-> (https://github.com/hapijs/hapi-auth-cookie)

-Data collection to logs _[to enable data analysis]_ with hapi plugin->**good** (https://github.com/hapijs/good)

-Emailing delivery API -> **Mandrill** (http://mandrill.com/)  


###File structure

Homepage: _Does not require authentication_
* Feed of most recent pictures from all users
* Login/Signup button

FeedPage:
* Feed of most recent pictures from all users
* Ability to comment & upload
* Logout button

ProfilePage:
* User Profile (Name & details)
* Grid of your photos
* Upload link
* Logout button

UploadPage:
* File chooser
* File preview
* Description input

### Wireframes

![Wireframe1](images/Wireframes1.png)
![Wireframe2](images/Wireframes2.png)
