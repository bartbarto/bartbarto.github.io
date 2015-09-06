(function(){
	var skills = document.getElementsByClassName('skill');

	for (var i = 0; i < skills.length; i++) {
		var skill = skills[i];
		skill.addEventListener('mouseenter', hover)
		skill.addEventListener('mouseleave', hoverEnd)
	};


	function hasClass(elem, className) {
    	return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
	}

	function removeClass(el, className){
		if (el.classList)
		  el.classList.remove(className);
		else
		  el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}

	function addClass(el, className){
		if (el.classList)
		  el.classList.add(className);
		else
		  el.className += ' ' + className;
	}


	function hover(e){
		el = e.target;
		el.setAttribute('data-original', e.target.innerHTML);

		if(!el.querySelectorAll('.description').length){
			var desc = document.createElement('div');
			addClass(desc, 'description');
			desc.innerHTML = el.getAttribute('data-info');
			setTimeout(function(){
				addClass(desc, 'active');
			}, 1);

			el.appendChild(desc);
		}else{
			addClass(el.querySelectorAll('.description')[0], 'active')
		}

	}

	function hoverEnd(e){
		el = e.target;
		// el.innerHTML = el.getAttribute('data-original');

		var desc = el.querySelectorAll('.description');
		var TO;
		for (var i = 0; i < desc.length; i++) {
			removeClass(desc[i], 'active');
		}

	}

	var cats = document.querySelectorAll('.category')

	for (var i = 0; i < cats.length; i++) {
		cats[i].addEventListener('click', catClick)
	};

	function catClick(e){

		e.preventDefault();
		e.stopPropagation();
		var cat = e.target.getAttribute('href').replace('#category_', '');

		var post_links = document.querySelectorAll('.post-link')
		for (var i = 0; i < post_links.length; i++) {
			if(post_links[i].getAttribute('data-categories').split('.html')[0].indexOf(cat) > -1){
				post_links[i].style.display = 'block';
			}else{
				post_links[i].style.display = 'none';
			}
		};
	}


})()

function turnAround(from, to){

}