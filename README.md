# Macalike Calculator in modern React with Redux

## Abstract

This is a coding exercise I was given to show I can accurately reproduce a pixel-perfect UI (almost, I didn't add the glass and drop-shadows as CSS effects for such are pretty weak, same with the rounded corners which I did add and you can see they don't render nicely) with basic functionality in React using Redux as a data store for application state. The design is based on the OSX calculator mini-app (with some liberties, again since I don't have a Mac I wasn't able to measure some of the color values and effects properly).

### What's There

I've tested all of the basic operations and they seem to be working correctly.

I trapped issues in Divide By Zero by forcing a reset (same as clicking the AC button) when a Divide By Zero is detected.

Bugs are probably there. In edge and corner cases. I didn't mash on this thing for hours. There is definitely a display area limitation on the current number display field, it's truncated when it gets into deep decimals or exponentials.

### What's Missing

- The modulus button doesn't do anything right now, I wasn't sure what it's supposed to do so left it alone.
- The 'glass' styling from the OSX app is not present, that kind of thing is very fiddly in HTML/CSS and I didn't want to go down that road for this demo.
- The exact font and characters used in OSX are proprietary, so I used the closest standard web approximation with Arial/Helvetica/Sans.
- More componentization is possible to be sure, however I'm also a fan of not over-engineering and over-componentizing something as concrete and discreet as this. The buttons are componentized properly.
- Keyboard support. To be a complete and useful app, capturing keyboard presses would certainly be handy!

### Redux Reducer/Store for Application State

There are 5 state values I needed to make this application work. They are as follows:

- __displayValue__ is the current string displayed in the top area which represents the number the user is currently building, or the result of a completed operation.
- __storedValue__ is the previously built displayValue that is stored at the time of pressing one of the function buttons as a floating point number. It is used to actually perform the left side of any equation.
- __currentFunction__ is a string value which stores the last function/operation (add,sub,mult,div) the user has requested, which will be executed when the user presses the equals key. Defaults to `none`.
- __decimalMode__ is a boolean value which indicates that the user pressed the decimal key and the next number key press should come after a decimal (if a decimal is not already present).
- __clearRegister__ is a boolean value which instructs any number presses to clear the current displayValue when pressed and begin building a new number.

## Running

Clone the repo to your own local machine with node and npm (latest versions, I believe I'm on 20.x and 12.x respectively at time of making this) and install all of the dependencies and libs (node modules) with:

```sh
npm i
```

After that, run the following to have vite kick off a dev server and open your browser to it:

```sh
npm start
```

If you run into any difficulties, please let me know!
timothy.partee@gmail.com

## Dependencies

Uses [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [React Testing Library](https://github.com/testing-library/react-testing-library) to create a modern [React](https://react.dev/) app compatible with [Create React App](https://create-react-app.dev/)

