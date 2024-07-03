# Youtube-web-server
Web server for youtube project

For the bodek:
1. Run "npm i" to install the dependencies of the server.
2.Before running the server with nodemon, please write the followoing command in your terminal:
"node uploadExistingVideos.js"
This will upload the videos from the server to your local mongodb database.
Now you have our 20 defualt videos.
This will also uploud you 3 users ( us - Alon, Tom , Maayan (: )
after this you will be able to see in your own mongoDB -
1 - 3 users
2-  20 videos
   it might take a few moments 
This is to make it easier for you to check the assignment 💘
3. Run the server using "nodemon server.js".
4. Enjoy!

Our paths ( accoreding to what the assigment ask for ) - 
* to get 20 videos with -get- that the first 10 videos are most viewed and the other 10 are randomly -
  http://localhost:3000/api/videos 

* to get the user details - (name,profile..) - get request
  http://localhost:3000/api/users/:id
  
* to edit a User exist - put request
  http://localhost:3000/api/users/:id

  - please notice if you want to edit you can open the menu ( in the side of evey page - on icon 3 stripes one below the other) and click next to "Edit your profile" on 
    "Edit" it will open for you the option to change your nickname or photo profile depending on what you choose.
    
 * to delete a user - deledt request
   http://localhost:3000/api/users/:id

   - please notice you can delete your own user if you are Connected.

 * to return the all videos that a of a user with a Spitzfit id - get request
   http://localhost:3000/api/users/:id/videos

   - it is useful for the profile page the assigment asked for , you can get to this 

  

