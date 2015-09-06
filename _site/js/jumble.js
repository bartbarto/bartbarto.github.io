//jumble plugin - still very much a WIP
(function($) {

	$.fn.jumble = function(options) {

	 	var o = $.extend(true, {}, $.fn.jumble.defaults, options);

		this.each(function() {

			var container = $(this),
				h1 = $(o.textContainer, container),
				start = $('.' + o.startClass),
				arr1 = start.text().toLowerCase().split(''),
				finish = $('.' + o.finishClass),
				finishIndex = finish.index(),
				arr2 = finish.text().toLowerCase().split(''),
				validate = {},
				keep = {};


			//wrap all H1 characters with a span
			for (var i = 0; i < h1.length; i++) {
				var h1Split = h1.eq(i).text().split(''),
					h1New = [];
				for (var c = 0; c < h1Split.length; c++) {
					if (h1Split[c] === '^') {
						h1New[c] = '<div class="line-break">' + h1Split[c] + '</div>';
					} else {
						h1New[c] = '<span>' + h1Split[c] + '</span>';
					}
				}
				h1.eq(i).html(h1New.join(''));
			}



			//find out if start has any of the same letters as finish

			//create a validation array
			for (var i = 0; i < arr2.length; i++) {
				validate[arr1[i]] = (arr1[i]) ? true : false;
			}



			//feed the finish array through the validation array to see if
			//there are any matching letters between the two strings.
			//credit: http://stackoverflow.com/questions/2307663/fastest-most-efficient-way-to-compare-two-string-arrays-javascript/#answer-2307736

			for (var i = 0; i < arr2.length; i++) {
				if (validate[arr2[i]]){

					//if there is a match find the letter in the start string
					//add the class "keep" to the letter's span and append the
					//finish string letter index to a data-index attribute

					if ([arr2[i]]) start.find(':contains(' + [arr2[i]] + ')').addClass('keep').attr('data-index', i);

					//Save the results in an array named "keep"

					keep[arr2[i]] = (arr2[i]) ? true : false;

				}
			}



			//fade the letters we are not keeping
			start.find('span').not('.keep').animate({'opacity':'0'}, o.fadeSpeed, o.easing, function(){

				//animate the letters we are keeping
				$('.keep').each(function(){
					var startTop = $(this).position().top,
						startLeft = $(this).position().left,
						dataIndex = $(this).data('index'),
						finishTop = finish.find('span').eq(dataIndex).position().top,
						finishLeft = finish.find('span').eq(dataIndex).position().left;

					//move the letters to their new position
					$(this).animate({'top':finishTop - startTop,'left':finishLeft - startLeft}, o.animateSpeed, o.easing, function(){
						//fade the finish string in to fill in the gaps
						finish.animate({'opacity':'1'}, o.fadeSpeed, o.easing, function(){
							start.css({'display':'none'});
							h1.removeClass('start finish').eq(finishIndex).addClass('start').next().addClass('finish');
						});
					});
				});

			});




		}); //end each

		return this;

	};


	$.fn.jumble.defaults = {
		 textContainer: 'span',
		 startClass: 'start',
		 finishClass: 'finish',
		 fadeSpeed: 500,
		 animateSpeed: 500,
		 easing: null,
	};

})(jQuery);