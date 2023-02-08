# Guitar tabs 
## Table of contents

* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)

### General info
------------
It's created with Vanilla JS,  Sass and it used the html2pdf.js package to be able to print the tabs.
This web application allows you to create your own guitar tabs. A guitar tab is a different way to read the notes and chords. It's quite usely around the guitar musicians.

### Technologies
------------
Project is created with:
* Vanilla JS.
* SCSS.
* Html2pdf.js package.
* Gulp.js toolkit.

### Setup
------------
To run this project, install it locally using npm:
```
$ cd `yourFolderPath`
$ npm install
$ npm run deploy
```
This project uses Gulp.js to build, minimize the code and the images.
Once you have built the project, you can run it using LiveServer or another type of technology. The compressed code will be located in the public folder, so, you have to run the index.html that is located there.

### Features
------------
* This application is intented to work only with the use of the keyboard, the mouse is only used to print the tabs, and also to select the inputs of the current page.
* It uses the html2pdf.js package to convert the tabs that you have made to a PDF.
* It has tha mostly used guitar techniques like:
	* Palm Mute.
	* Pull Off.
	* Hammer On.
	* Sliding.
	* Bending.
* It has the undo/redo functions.
* You can traverse the grid of the tabs with your keyboard.
* Depending on the columns of the tabs is the font size that the PDF will have.
