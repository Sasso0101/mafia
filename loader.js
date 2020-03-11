// Welcome to Mafia Animator by Capsia Tech

/* Written by:
Desirée Schembri
Niccolò Celoro
Riccardo Riccio
Salvatore Andaloro
Simon Tomsič*/

/* Gets the browser's default language and popolutes the site */
function windowStart() {
	url = getLocalizedJsonUrl('');
	readJSON(url);
	hideItem();
}

/* Returns the JSON url of the chosen language */
function getLocalizedJsonUrl(userLang) {
	var jsonFiles = {
		'it': 'json/data-it.json',
		'si': 'json/data-si.json',
		'de': 'json/data-de.json',
		'en': 'json/data-en.json'
	};
	if (userLang == '') {
		userLang = navigator.language || navigator.userLanguage;
		userLang = userLang.substr(0,2);
	}
	return jsonFiles[userLang];
}

/* Loads page elements */
function dataLoader(json) {
	var images = listImages(json);
	preloader(images); // preload images
	applyStrings(json); // sets all string for selected lang
	createTimeline(json); // load timeline structure
	initFade();
}

/* Initializies crossfading elements */
function initFade() { // crossfading defaults
	var crossfade1 = document.getElementById("itemNameCF1"),
	crossfade2 = document.getElementById("itemNameCF2");
	crossfade1.style.opacity = 1;
	crossfade2.style.opacity = 0;
}

/* Returns the list of image urls to preload */
function listImages(json) {
	images = [];
	for (const i of Object.entries(json)) {
		if (i[1].hasOwnProperty('image')) {
			images.push(i[1].image);
		}
	}
	return images;
}

/* Downloads the JSON file and calls the loader function */
function readJSON(url) {
	var request = new XMLHttpRequest(),
	data;
	request.open('GET', url, true);

	request.onload = function() {
		if ((request.status >= 200 && request.status < 400) || request.status == 0 ) {
			data = JSON.parse(request.responseText);
			dataLoader(data);
		} else {
			console.log("Failed to get Json");
		}
	};

	request.onerror = function() {
		console.log("Failed to get Json");
	};

	request.send();
}

/* Loads the images from the urls contained in the array */
function preloader(imagesUrl) {
	var loadIMG = [], progress = 0;
	for (i = 0; i < imagesUrl.length; i++) {
		loadIMG[i] = new Image();
		loadIMG[i].src = imagesUrl[i];
		loadIMG[i].onload = function() {
			progress++;
			if (progress == imagesUrl.length) {
				endLoad();
			} else {
				loadingProgress(progress/imagesUrl.length);
			}
		}
		loadIMG[i].onerror = function() {
			console.log("Error while attempting to load image");
		}
	}
}

/* Creates the timeline's structure and sets the handlers for each item */
function createTimeline(items) {
	var timeline = document.getElementById('timeline');
	for (const i in items) {
		if (items[i].hasOwnProperty('html')) {
			var item = document.createElement("div");
			item.className = "circle";
			item.id = i;
			item.onclick = function() {displayItem(i, items);};
			item.onmouseenter = function() {changeTitle(i, items);};
			item.style.backgroundImage = 'url(' + items[i]['image'] + ')';
			timeline.appendChild(item);
		}
	}
}

/* Actions for loading progress */
function loadingProgress(percent) {
	console.log("Loading is at: "+(percent*100)+"%");
}

function endLoad() {
	console.log("Loading complete!");
}

/* Inserts the strings contained in the JSON into the elements */
function applyStrings(json) {
	for (const i in json) {
		if (!(json[i].hasOwnProperty('image'))) {
			el = document.getElementById(i);
			el.innerHTML = json[i].label;
		}
	}
}