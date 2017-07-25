# Overview

## Google Chrome.
I used the Fetch API to get the AJAX response. Would use the standard "AJAX/XHR" code to polyfill across all browsers/platforms. Same with vendor prefixes, I would add all the vendor prefixes (ie. -webkit, -moz, -ms) to be compatible.

## Nav must be responsive/Page should look good across all viewport sizes.
To satisfy this requirement, I had to change the mobile viewport media query mobile width from 767 to 
820. Based on the wireframes, there is not enough room to open the secondary navigation at anything below 820px. In addition, the font-size specs for the primary navigation was too large at the specified viewport and caused the links to wrap. I lowered the font-size and margins to fit the primary navigation on one line.

## Code must run after the following command
All plugin dependencies were added.

## Nice to haves (things that we look for):
* Adherence to accessibility standards: design specs were followed. Outline CSS pseudo-class was not removed. Alt/title texted added for images.
* Documentation: commented code and added own project read-me.


# Design Specifications

## Typography
Followed specs outside of changed desktop navigation font-size (as mentioned). Also: copyright line-height was changed to 48px to match wireframe. All letter-spacing was reduced based on h1 element.

## Color
Used opacity property vs rgba for mask. No default font color was specified, so I made it #333. Pure black (#000) is bad design practice (pure black not found naturally).

## Measurements
Following the wireframe, I made the mobile navigation slide out 100% responsive width minus the width of the close button.


# Plugins

## Babel
To use babel, type command: "babel --presets env,babili public/scripts/main-ES2015.js --out-file public/scripts/main.min.js --source-maps".

## Jasmine
To run unit tests, type command: "jasmine".

## JSHint
To use jshint, type command: "jshint public/scripts/main.js". I had to change the config file ("esnext" is deprecated). Only errors thrown are relating to the transpiler. To fix, I would wrap the functions in parentheses and change to single quotes.

## LESS/SASS
Formatted CSS (file created before I converted it to SASS) is main.css. To use SASS (assuming it's installed), type command: "sass --watch public/styles/main.scss:public/styles/main.min.css --style compressed;".

## Minification
SASS command handled minification. File minification of main.js was handled online.


# Interactions

## Mobile

Copyright made position fixed. Menu scrolls.

* When a user clicks the open navigation icon (“hamburger”), the navigation should “push” from left to right: I transitioned it in from the left.
* The HUGE logo and navigation toggle slide left to right: both slide.
* The open navigation icon should change to the close navigation icon (“x”): changes immediately and gets floated right.
* Translucent mask appears over content, right of navigation: overflow hidden on body added to prevent background scroll. scroll bar removed.
* The Primary Navigation should include link items and menu items: completed.
* When a user hovers a Primary Navigation item, it should change color (magenta/light gray): completed.
* When a user clicks a Primary Navigation link item, the browser should navigate to a new page: completed.
* When a user clicks a Primary Navigation menu item, the Secondary Navigation should “push” down, the chevron should rotate * 180°: menu opens up below primary navigation and chevron is rotated.
* When a user hovers a Secondary Navigation item, it should change color (magenta/light gray): completed.
* When a user clicks a Secondary Navigation item, browser should navigate to a new page: completed.
* When a user clicks outside of the navigation, the navigation should close: completed.
* When the navigation closes:
  * the menu should “pull” from right to left: it slides.
  * the logo and toggle button should “slide” from right to left: logo slides, hamburger icon floats back left.
  * the close icon should change to the open icon: changes immediately.
  * the mask should be hidden: completed.