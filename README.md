# devconnector

This website has been made with the following frameworks and libraries :- 
  1>  Mongoose (Database ORM for MongoDB)
  2>  ExpressJS (Web framework for handeling http requests)
  3>  ReactJS (Frontend framework for UI)
  4>  NodeJs (Runtime for the backend
  5>  Octokit (Github Api)
  6>  Gravitar (Api for the profile picture)
  7>  Axios (Promise Based Http Client)
  8>  Bcrypt (Hashing Library for User Passwords)
  9>  Config (Global Variables)
  10> JsonWebToken (Authorization)
  11> Redux-toolkit (State Management Framework for the frontend)
  12> Moment (Date Formatting)
  13> React-redux (For integrating react with redux)
  14> React-router-dom (For declarative routing in react)


In this application you can :-
  Make an account
  Log in 
  Make a profile
  Edit your profile
  Make posts
  Like/Unlike Posts
  Make Comments on your posts
  See Last 5 Github repositories from users (if they entered their github profile)
  See users gravitar (fetches the avatar from the gravatar api)
  
In this project @reduxjs/toolkit library was used for state management to display the users data and react authorisation.

If you dont have the jwt token in your localstorage and you try to access a page that is protected , you will just be redirected to the login page.
After logging in you are not allowed to view the login ,register or the landing page.
The state of the navbar depends on the authentication state in redux. 


