# Youtube-web-server
Web server for youtube project

repo link - https://github.com/Toms752384/Youtube-web-server.git

For the bodek - General description of running the code:
1. Run "npm i" to install the dependencies of the server.

 2.Before running the server with nodemon, please write the followoing command in your terminal:
 "node uploadExistingVideos.js"
 This will upload the videos from the server to your local mongodb database.
 Now you have our 20 defualt videos 🫶.
 This will also uploud you 3 users ( us - Alon, Tom , Maayan 💖 )
 after this you will be able to see in your own mongoDB -
 - 3 users
 - 20 videos
    
 it might take a few moments

This is to make it easier for you to check the assignment 💘

3. Run the server using "nodemon server.js".
   
4. Enjoy!

Our paths ( accoreding to what the assigment ask for ) - 

------------------------------------------------------------------users_path--------------------------------------------------------------------------------

* to get the user details - (name,profile..) - get request
  http://localhost:3000/api/users/:id
  
* to edit a User exist - put request
  http://localhost:3000/api/users/:id

  - please notice if you want to edit you can open the menu ( in the side of evey page - on icon 3 stripes one below the other) and click next to "Edit your profile" on 
    "Edit" it will open for you the option to change your nickname or photo profile depending on what you choose.
    
 * to delete a user - deledt request
   http://localhost:3000/api/users/:id

   - please notice you can delete your own user if you are Connected.
     
-----------------------------------------------------------------videos_path-------------------------------------------------------------------------------

 * to get 20 videos with -get- that the first 10 videos are most viewed and the other 10 are randomly -
  http://localhost:3000/api/videos

 * to return the all videos that a of a user with a specific id - get request
   http://localhost:3000/api/users/:id/videos

   - it is useful for the profile page the assigment asked for , you can get to this by click on a video and there click on the photo of the user that uploud this video ( 
     the photo is below the video.
     
  * to create a new video - post request
    http://localhost:3000/api/users/:id/videos

    - you can uploud a new video by clicking on the menu bar or the the icon of camera (🎥) that in the right corner.

  * to get a details on a spcific id video - get requst
    http://localhost:3000/api/users/:id/videos/:pid

    - just choose from the home page which video you will like to watch 😃

  * to edit a exist video - put requst
    http://localhost:3000/api/users/:id/videos/:pid

    - notice you can edit a video only if it is your video and you logged in 💻,
      to edit click on the 3 dots below the video in the page of watch a video.

   * to delete a exist video - delete requset
     http://localhost:3000/api/users/:id/videos/:pid

      - notice you can delete a video only if it is your video and you logged in 💻,
      to delete click on the 3 dots below the video in the page of watch a video.

----------------------------------------------------------------comments_path---------------------------------------------------------------------------

   * to add a new comment - post request
     http://localhost:3000/api/users/:pid/comments/:id

     - notice to add a comment you need to get to a video you want to share a comment there and you will see below the video commentbox 💬

   * to get all comments by id of video - get request
     http://localhost:3000/api/users/:pid/comments

     - it is usefull for the watching a video page
    

   * to edit a comment - put request
     http://localhost:3000/api/users/:id/:pid/comments/:cid

     - notice you can edit a comment by getting to a video you wrote a commend there and below your comment there are 3 dots if you will click it you can choose the option 
       to edit your comment 🖱️

   * to delete a comment - delete request
      http://localhost:3000/api/users/:id/:pid/comments/:cid
     
     - notice you can delete a comment by getting to a video you wrote a commend there and below your comment there are 3 dots if you will click it you can choose the 
       option to delete your comment 🖱️

     -----------------------------------------------------------------token_path-------------------------------------------------------------------------

   * to create a token to a user that exist - post request
     http://localhost:3000/api/tokens

     - This is in order for us to create a token for the user and now all actions ןמ the server will attach this token

  באחריותכם לוודא ש״נעלתם״ את קוד השרת שאתם מגישים לתרגיל 2 ב branch מתאים,
שהבודק יוכל לבדוק אותו - וכדי שלא תתערבב העבודה על תרגיל 3 עם מה שהוגש בתרגיל .2
עליכם להסביר זאת בצורה ברורה ב README. לבדוק

