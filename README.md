# Setup

Clone the repo:
```
git clone https://github.com/SoccerSquad/pwa.git
```

Checkout your own branch:
```
git checkout -b <your branch name>
```

Add your new branch to the repo:
```
git push -u origin <your branch name>
```

For setting up the website for testing on your local machine:
Install Node (it automatically installs npm):
https://nodejs.org/en/download/

To install other modules and packages, run:
```
npm install
```

To build the app, run:
```
npm run build:prpl-server
```

To test the app on your own computer, run:
```
npm run serve:prpl-server
```
Then open this url in your browser to see if it's working:
http://127.0.0.1:8080

If it is working, make a Pull Request, there is a "New pull request" button next to the drop down menu where you select your branch on Github.

Once the changes are in, One of us will review them and merge them with the 'master' branch, and then we will simply refresh the Google cloud server to update the website that is served to the public.