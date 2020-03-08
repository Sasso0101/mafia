/** Gets the list of image urls to load */
function listImages(json) {
	images = [];
	for (const i of Object.entries(json)) {
		if (i[1].hasOwnProperty('image')) {
			images.push(i[1].image);
		}
	}
	return images;
}

/** Loads the images from the urls contained in the array */
function loadImages(imagesUrl) {
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
			console.log("Error while attempting to load image.");
		}
	}
}

/** Logs loading status */
function loadingProgress(percent) {
	console.log("Loading is at: "+(percent*100)+"%");
}

function endLoad() {
	console.log("Loading complete!");
}

/** Inserts the strings contained in the JSON into the elements */
function applyStrings(json) {
	for (const i in json) {
		if (!(json[i].hasOwnProperty('image'))) {
			el = document.getElementById(i);
			el.innerHTML = json[i].label;
		}
	}
}

/** Creates the timeline's structure and sets the handlers for each item */
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

/** Initializies crossfading elements */
function initializeCrossfading() {
	var crossfade1 = document.getElementById("itemNameCF1"),
	crossfade2 = document.getElementById("itemNameCF2");
	crossfade1.style.opacity = 1;
	crossfade2.style.opacity = 0;
}

/** Gets the JSON, loads the images, creates the timeline, applies the strings and initliazies the crossfading elements */
function dataLoader(jsonUrl) {
	var request = new XMLHttpRequest();
	request.open('GET', jsonUrl, true);

	request.onload = function() {
		if (request.responseText) {
			var json = JSON.parse(request.responseText);
			var images = listImages(json);
			loadImages(images);
			applyStrings(json);
			createTimeline(json);
			initializeCrossfading();
		} else {
			console.log("Failed to get Json");
		}
	};

	request.onerror = function() {
		console.log("Failed to get Json");
	};

	request.send();
}

/** Returns the JSON url of the chosen language */
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

/** Gets the browser's default language and popolutes the site */
function windowStart() {
	jsonUrl = getLocalizedJsonUrl('');
	dataLoader(jsonUrl);
}

/** Reload the site with the chosen language */
function changeLanguage(lang) {
	document.getElementById("timeline").innerHTML = '';
	jsonUrl = getLocalizedJsonUrl(lang);
	dataLoader(jsonUrl);
}