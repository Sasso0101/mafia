/** Opens the pop-up window */
function displayItem(id, json) {
	var timeline = document.getElementById("timeline"),
	logo = document.getElementById("logo"),
	navbar = document.getElementsByTagName("nav")[0],
	closeItem = document.getElementById("closeItem");
	timeline.style.marginBottom = '0';
	timeline.style.opacity = 0;
	logo.style.marginTop = '0';
	logo.style.opacity = 0;
	navbar.style.marginTop = '0';
	navbar.style.opacity = 0;
	setTimeout(function(){
		timeline.style.display = 'none';
		logo.style.display = 'none';
		navbar.style.display = 'none';
		item = document.getElementById("item");
		item.innerHTML = json[id].html;
		setTimeout(function(){
			// item.style.height = 'calc(100vh - 100px)';
			closeItem.style.display = 'block';
		}, 100)
	}, 500);
}

/** Closes the pop-up window */
function hideItem() {
	var timeline = document.getElementById("timeline"),
	logo = document.getElementById("logo"),
	navbar = document.getElementsByTagName("nav")[0],
	item = document.getElementById("item");
	// item.style.height = '0';
	closeItem.style.display = '';
	setTimeout(function(){
		item.innerHTML = '';
		timeline.style.display = 'flex';
		logo.style.display = 'block';
		navbar.style.display = 'flex';
		setTimeout(function(){
			timeline.style.marginBottom = '';
			timeline.style.opacity = '';
			logo.style.marginTop = '';
			logo.style.opacity = '';
			navbar.style.marginTop = '';
			navbar.style.opacity = '';
		}, 100);
	}, 1000);
}

/** Crossfade animation */
function changeTitle(id, json) {
	var crossfade1 = document.getElementById("itemNameCF1"),
	crossfade2 = document.getElementById("itemNameCF2");
	if (crossfade1.style.opacity == 1) {
		crossfade2.innerHTML = json[id].label;
	} else {
		crossfade1.innerHTML = json[id].label;
	}
	tmp = crossfade1.style.opacity;
	crossfade1.style.opacity = crossfade2.style.opacity;
	crossfade2.style.opacity = tmp;
}

