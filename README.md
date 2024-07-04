# Youtube-web-server
Web server for youtube project.
This web server was build in MVC structure, including a routes folder to make the server more readable and moduler.

First steps : 
hii dear bodek before we start please follow the next steps  🔥 -
1. clone to your own copmuter our server repo - https://github.com/Toms752384/Youtube-web-server.git
   please make sure you are on the main branch! the other branches are for other parts of the project, and for production.
3. clone to your own computer our react app for part 2! it means you need to clone the app from this repo link - https://github.com/AlonLivne007/YouTube-project-.git
   please make sure you are on main_part_2 branch! the "main" brunch is for the first part of the project.
4. Last but not least - make sure you download to your own computer the - mongoDB app. You can find it in google on their official website - use the community edition.

General description of running the code:
1. Run "npm i" to install the dependencies of the server.

2. Before running the server with nodemon, please write the followoing command in your terminal:
 "node uploadExistingVideos.js"
 This will upload the videos from the server to your local mongodb database, from a folder called "localVideos", that resides in the server.
 We chose to upload the videos that are shown in the react app, and are uploded from users in the "localVideos" folder, to support longer videos, and not in base64.
 Photos are indeed handled in base64, and stored directly in the database.

 Now you have our 20 defualt videos 🫶.
 This will also uploud you 3 users (us - Alon, Tom , Maayan 💖).
 After this you will be able to see in your own mongoDB -
 - 3 users
 - 20 videos
    
 It might take a few moments.

This is to make it easier for you to check the assignment 💘

3. Run the server using "nodemon server.js".
   - please notice it might not work to you beacuse you need specific permissions from your computer to run this global script so you can just do the reguler command - node server.js.

4. Enjoy!

Our paths (accordding to the requirements and more): 

------------------------------------------------------------------users_path--------------------------------------------------------------------------------

* To get the user details - (name,profile..) - get request.
  http://localhost:3000/api/users/:id
  
* To edit a User exist - put request.
  http://localhost:3000/api/users/:id

  - Please notice if you want to edit you can open the menu (in the left side of every page - on the iconof  3 stripes one below the other) and click next to "Edit your profile" on 
    "Edit" it will open for you the option to change your nickname or your avatar depending on what you choose.
    
 * To delete a user - delete request.
   http://localhost:3000/api/users/:id

   - Please notice you can delete your own user only if you are logged in.
  
 * To get all users - get request.
   http://localhost:3000/api/users/fetchUsers

 * To create a new user - post request.
   http://localhost:3000/api/users/
     
-----------------------------------------------------------------videos_path-------------------------------------------------------------------------------

 * To get videos from the database - get request.
  http://localhost:3000/api/videos

   - Relevnt to the Home page , notice that you will see allways 20 videos in the home page even if there are more in the mongoDB,
     because that is the requirement of the assignment

 * To return the all videos that of a user with a specific id - get request.
   http://localhost:3000/api/users/:id/videos

   - It is used in the profile page the assigment asked for. you can get there by click on a video and then click on the photo of the user / his username next to the 
     photo that uplouded the video. They are below the video.
     
  * To create a new video - post request.
    http://localhost:3000/api/users/:id/videos

    - You can upload a new video by clicking on the menu bar or the the icon of camera (🎥) that in the right corner.

  * To get details on a specific video - get request.
    http://localhost:3000/api/users/:id/videos/:pid

    - Just choose from the home page which video you would like to watch 😃

  * To edit an existing video - put request.
    http://localhost:3000/api/users/:id/videos/:pid

    - Notice you can edit a video only if it is your video and you logged in 💻,
      to edit click on the 3 dots below the video in the page of watch a video.

   * To delete an existing video - delete requset.
     http://localhost:3000/api/users/:id/videos/:pid

      - Notice you can delete a video only if it is your video and you logged in 💻,
      to delete click on the 3 dots below the video in the page of watch a video.

----------------------------------------------------------------comments_path---------------------------------------------------------------------------

   * To add a new comment - post request.
     http://localhost:3000/api/users/:pid/comments/:id

     - Notice to add a comment you need to get to a video you want to share a comment, and you will see below the video commentbox 💬

   * To get all comments by an id of a video - get request.
     http://localhost:3000/api/users/:pid/comments

     - It is usefull for the watching a video page.
    

   * To edit a comment - put request.
     http://localhost:3000/api/users/:id/:pid/comments/:cid

     - Notice you can edit a comment by getting to a video you wrote a commennt in, and there, below your comment, there are 3 dots - if you will click on it. you can choose the option 
       to edit your comment 🖱️

   *  To delete a comment - delete request.
      http://localhost:3000/api/users/:id/:pid/comments/:cid
      
   - Notice you can delete a comment by getting to a video you wrote a commennt in, and there, below your comment, there are 3 dots - if you will click on it. you can choose the option 
       to delete your comment 🖱️

     -----------------------------------------------------------------token_path-------------------------------------------------------------------------

   * To create a token to a logged in user - post request.
     http://localhost:3000/api/tokens

     - This is in order for us to create a token for the user and now all actions in the server will attach this token.

