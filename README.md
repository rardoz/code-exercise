# code-exercise
Code Exercise - React Game 2.0

## Setup
* Using node version 8.9.5 run `npm install`
* Run `npm start`
* Next navigate to `http://localhost:8080`


## Building for prod
* Run `npm run build`

Note: If you do this you need to run `npm run clear` before starting dev mode. Webpack dev server resolves compiled files first instead of virtual files. So you have to clear that stuff out or you wont see your changes in dev mode.


## Objective
![example](https://i.gyazo.com/0da250886a33734abb0b41f22e29c1b3.gif)

You will be making a game in React. Feel free to be creative. I have provided an SVG example and an icon, but you may use whatever you like. Click on a target to get a point. After 10 successful clicks, the player wins.

### Requirements
* Update project to node 9.x
* Update react to the latest version: 16.3.x
* Update all dependencies to their latest versions
* Use the context api in react
* Organize dependencies for extra points ;)
* Add a test using Jest
* Fork this repo and submit a PR when done
* No external libs for UI
* Put code in `/src/spas/home`
* Must use SVG asset for click target
* You may use `scss` or `css`
* Must be responsive and mobile friendly
* Shoud work in all modern web browsers
* Must have a winner UI
