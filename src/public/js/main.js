(()=>{
// variables
	const header = document.getElementsByClassName('js-header')[0];
	const burger = document.getElementsByClassName('js-burger')[0];
	const menu = document.getElementsByClassName('c-menu')[0];
	const search = document.getElementsByClassName('js-searchInput')[0];
	const searchIcon = document.getElementsByClassName('js-searchIcon')[0];

// function calls
	headerSmall();
	toggleMenu();
	toggleSearch();

// functions

function headerSmall(){
	window.onscroll = debounce( ()=>{
		let scroll = document.documentElement.scrollTop || document.body.scrollTop;

		if(scroll >= 100 && !header.classList.contains('header-is-small')){
			header.classList.add('header-is-small');
		}
		if(scroll < 100){
			header.classList.remove('header-is-small');
			closeSearch();
		}
	},
	50);
}

function toggleMenu(){

	menu.classList.add('is-hidden');

	burger.addEventListener('click', ()=>{
		menu.classList.toggle('c-menu-is-open');
	});


	burger.addEventListener('click', ()=>{
		if ( menu.classList.contains('c-menu-is-open') ){
				menu.classList.remove('is-hidden');
		} else {
			setTimeout( ()=> {
				menu.classList.add('is-hidden');
			}, 400);
		}
	});
}

function toggleSearch(){

	outsideClickClose();

	searchIcon.addEventListener('click', ()=>{
		if( search.classList.contains('c-search-is-open') ){
			closeSearch();
		} else{
			openSearch();
		}
	});
}
		
function closeSearch(){
	search.classList.add('c-search--disappear');
	setTimeout( ()=>{ search.classList.remove('c-search-is-open') },100);
	setTimeout( ()=>{ search.classList.remove('c-search--disappear') },800);
	search.value = '';
}

function openSearch(){
	
	header.classList.add('header-is-small');

	search.classList.add('c-search-is-open');
	search.classList.remove('c-search--disappear');
}

function outsideClickClose(){
	window.addEventListener('click', (event) => {
		if(event.target !== search && event.target !== searchIcon){
	  	closeSearch();
	  }
	});
}

// https://davidwalsh.name/javascript-debounce-function --> optimize scroll
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

})();