# Lost-and-Found-Project
Project repository for a lost and found website for Stevens University. -Software Fundamentals 540


Get Started:
1. Navigate to an empty directory on your machine
2. Run "git clone https://github.com/blucas6/Lost-and-Found-Project.git" in that directory
3. Navigate to the newly created directory
4. Navigate to the "client" directory to work on the client
5. Run "git checkout develop" to switch to development branch
6. Run "git checkout -b name-of-your-new-branch" to create a new branch off of DEVELOP to make your changes
7. Make sure you are in your new branch and run "npm start" to install dependencies
8. Make your changes
9. Run "git add ." to add your files (node modules should NOT be added)
10. Run "git commit -m 'say-what-you-did'" to commit your changes locally
11. After you've finished your feature run "git checkout develop" to return to develop
12. Run "git pull origin" to make sure to grab any new changes from other people's work
13. Run "git push origin" to push your changes to Github


Branches:
1. main - deliverable code, no commits only merges
2. develop - working branch, make feature branches off of here
3. feature:
    - create local feature branch
    - add/commit locally
    - ONLY if collaborating push changes to remote feature
    - when done with changes PULL remote develop THEN merge into local develop and PUSH to remote develop
