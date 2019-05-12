//grab open-slide and btn-close by their id
let open = document.getElementById('open-slide');
let close = document.getElementById('btn-close');

//add a click enent listener and call the functions
open.addEventListener('click', openSlideMenu);
close.addEventListener('click', closeSlideMenu);

//function execution
function openSlideMenu(){
	document.getElementById('side-menu').style.width='250px';
	/*document.getElementById('main-container').style.marginLeft='250px';*/
}
function closeSlideMenu(){
	document.getElementById('side-menu').style.width='0';
	document.getElementById('main-container').style.marginLeft='0';
}

