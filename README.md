# devconnector

This website was made with the MERN stack along with Redux.
It uses jwt authorisation for securing the apis.

In this application you can :-
  Make an account
  Log in 
  Make a profile
  Edit your profile
  Make posts
  Like/Unlike Posts
  Make Comments on your posts
  
In this project @reduxjs/toolkit library was used for state management to display the users data and react authorisation.

If you dont have the jwt token in your localstorage and you try to access a page that is protected , you will just be redirected to the login page.
After logging in you are not allowed to view the login ,register or the landing page.
The state of the navbar depends on the authentication state in redux.
