/*

 USFE (User Style Form Elements) — jQuery plugin
 Version: 1.5.6
 Author: M.Ulyanov (web.ulyanov@gmail.com)
 Site: http://web-ulyanov.ru
 Source && Doc: https://github.com/M-Ulyanov/Plugin-USFE/blob/master/js/jquery.usfe.js
 Example: http://example.web-ulyanov.ru/frontend/usfe

 */

(function($){

	$.fn.usfe = function(options){
		var defaults = {

			//settings type = file
			f_defaultFileName : 'Файл не выбран',
			f_defaultFileNameDel : 'Файл не выбран',
			f_FileNameLength : 30,
			f_defaultButtonName : 'Выбрать',
			f_editButtonName : 'Изменить',
			f_charDelete : '&#215;',
			f_bgDelete: '#f48475',

			//settings type = number
			n_iconPlus: '+',
			n_iconMinus: '-',
			n_editBg: true,

			//settings type = text
			t_animateEffect: true,
			t_animateSpeed: 400,
			t_editW: 12,
			t_editH: 3,
			t_color: '#FFF',
			t_backgroundcolor: '#52626F',

			//settings type = textarea
			te_animateEffect: true,
			te_animateSpeed: 400,
			te_color: '#FFF',
			te_backgroundcolor: '#52626F',

		};

		options = $.extend(defaults, options);

		var methods = {

			// (3.1)
			typeFile : function(elem){

				// (3.1.1)
				var fileWrap = $('<div class="file-wrap">'),
					fileButton = $('<button type="button" class="file-button">'+ defaults.f_defaultButtonName + '</button>'),
					fileName  = $('<div class="file-name">'+ defaults.f_defaultFileName + '</div>'),
					fileDelete = $('<span class="file-del">'+ defaults.f_charDelete  +'</a>');

				$(elem).wrap(fileWrap);	
				$(elem).after(fileButton, fileName);

				elem = $(elem);

				$(fileButton).on('click', function(){

					// (3.1.2)
			        elem.click();

			        // (3.1.3)
			        var fileApi = (window.File) ? true : false;

			        // (3.1.4)
			        $(elem).on('change',function(){

			            var fileNameText;

			            // (3.1.5)
			            if(fileApi && elem[0].files[0]){
			                fileNameText = elem[0].files[0].name;
			            }
			            else{
			                fileNameText = elem.val().split('\\');
			                fileNameText = fileNameText[fileNameText.length -1];             
			            }

			            // (3.1.6)
			            if(!fileNameText.length){
			                return;
			            }

			            // (3.1.7)
			            if(fileNameText.length > defaults.f_FileNameLength){
			            	var fileNameTitle = fileNameText;
			            	$(elem).parent(fileWrap).attr('title', fileNameTitle);
			            	fileNameText = fileNameText.substring(0, defaults.f_FileNameLength);
			            	fileNameText = fileNameText + '...';
			            }

			            fileName.addClass('select-file').text(fileNameText);
			            fileButton.text(defaults.f_editButtonName);
	            
			            if(document.addEventListener){
			                $(elem).parent().append(fileDelete);
			            }

			            $(fileDelete).css({
			            	display: 'block',
			            	opacity: 1,
			            })

			        }).change();

				});

		        // (3.1.8)
		        $(fileDelete).on('click', function(){

		            // (3.1.9)
		            var self = this;
		            var thisBg = $(fileWrap).css('backgroundColor');

		            $(elem).parent(fileWrap).removeAttr('title');

		            // (3.1.10)
		            $(this).parent().stop(true, true).animate({
		                backgroundColor:  defaults.f_bgDelete,
		            },400)
		            .stop(true,true).animate({
		                backgroundColor: thisBg,
		            },400);

		            $(this).parent().find(fileName).animate({
		                opacity: '0',
		            });

		            $(this).parent().find(self).animate({
		                opacity: '0',
		            });

		            // (3.1.11)
		            setTimeout(function(){
		                funcDelete.call($(self));
		            }, 600);

		        });

		        // (3.1.11)
        		function funcDelete(){

		            var thisFile = $(this).parent().find('input[type="file"]');
		            $(thisFile).prop('value', '');

		            $(this).parent().find(fileName).removeClass('select-file').text(defaults.f_defaultFileNameDel);
		            $(this).parent().find(fileName).animate({
		                opacity: '1',
		            },400);

		            $(this).css({display: 'none'});

        		};

			},
			//end method typeFile

			// (3.2)
			typeNumber : function(elem){

				// (3.2.1)
				var numWrap = $('<div class="number-wrap">'),
					numPlus = $('<button type="button" value="-" class="number-plus">'+ defaults.n_iconPlus +'</button>'),
					numMinus = $('<button type="button" value="-" class="number-minus">'+ defaults.n_iconMinus +'</button>');

				$(elem).wrap(numWrap);
				$(elem).before(numMinus).after(numPlus);

				// (3.2.2)
				$('.number-plus').on('click', function(){

					var thisInput = $(this).parent().find('input[data-element="number"]');
					var thisVal = $(thisInput).val();
					thisVal++;

					// (3.2.3)
					if(defaults.n_editBg){
						$(thisInput).stop(true, true).animate({
							backgroundColor: '#9bcb1e',
						},400).stop(true,true).animate({
							backgroundColor: '#FFF',
						},400);
					}

					computation(this, thisVal);
				});

				// (3.2.4)
				$('.number-minus').on('click', function(){

					var thisInput = $(this).parent().find('input[data-element="number"]');
					var thisVal = $(thisInput).val();
					thisVal--; 

					// (3.2.5)
					if(!thisVal) thisVal = 1;

					// (3.2.6)
					if(defaults.n_editBg){
						$(thisInput).stop(true, true).animate({
							backgroundColor: '#ea6856',
						},400).stop(true,true).animate({
							backgroundColor: '#FFF',
						},400);
					}

					computation(this, thisVal);
				});

				// (3.2.7)
				$('input[data-element="number"]').on('keypress input change', function(event){

					if(event.charCode < 48 || event.charCode > 57) return false;
					var thisVal = $(this).parent().find('input[data-element="number"]').val(); 

					computation(this, thisVal);
				})
			 
				// (3.2.8)
				function computation(elem, val){

					if(isNaN(val)){
						val = 1;
					}

					$(elem).parent().find('input[data-element="number"]').val(val);
					$(elem).parent().find('input[data-element="number"]').attr('value', val);
				}
	
			},
			//end method typeNumber

			// (3.3)
			typeText : function(elem){

				if(defaults.t_animateEffect){

					// (3.3.1)
					var textWrap = $('<div class="text-wrap">'),
						textDefaultBg = $(elem).css('backgroundColor'),
						textDefaultColor = $(elem).css('color'),
						textDefaultH = $(elem).height(),
						textDefaultW = $(elem).width(),
						textRealH =  $(elem).innerHeight();

					$(elem).wrap(textWrap);

					// (3.3.2)
					$('.text-wrap').css({
						position: 'relative',
						height: textRealH,
					});

					$(elem).css({
						position: 'absolute',
					})

					// (3.3.3)
					$(elem).focus(function(){
						$(this).animate({
							width: textDefaultW + defaults.t_editW,
							height: textDefaultH + defaults.t_editH,
							backgroundColor: defaults.t_backgroundcolor,
							color: defaults.t_color,
						}, defaults.t_animateSpeed);
					});

					// (3.3.4)
					$(elem).focusout(function(){
						$(this).animate({
							width: textDefaultW,
							height: textDefaultH, 
							backgroundColor: textDefaultBg,
							color: textDefaultColor,
						}, defaults.t_animateSpeed);
					});
				}
			},
			//end method typeText

			// (3.4)
			typeButton: function(elem){

				$(elem).addClass('butsub-element');
			},
			//end method typeButton

			// (3.5)
			typeTextarea: function(elem){

				if(defaults.te_animateEffect){

					// (3.5.1)
					textareaDefaultBg = $(elem).css('backgroundColor'),
					textareaDefaultColor = $(elem).css('color'),

					// (3.5.2)
					$(elem).focus(function(){
						$(this).animate({
							backgroundColor: defaults.te_backgroundcolor,
							color: defaults.te_color,
						}, defaults.te_animateSpeed);
					});

					// (3.5.3)
					$(elem).focusout(function(){
						$(this).animate({
							backgroundColor: textareaDefaultBg,
							color: textareaDefaultColor,
						}, defaults.te_animateSpeed);
					});
				}	
			},
			//end method typeTextarea

			// (3.6)
			typeRadio: function(elem){

				// (3.6.1)
				var customRadio = $('<span class="custom-radio">'),
					thisRadioId = $(elem).attr('id'),
					thisRadioName = $(elem).attr('name'),
					nextElem = $(elem).next('label');

				// (3.6.2)	
				$(elem).before(customRadio);
				$(elem).addClass('hidden-radio');

				// (3.6.3)	
				$(customRadio).attr({
					'data-radio': thisRadioId,
					'data-radiogroup' : thisRadioName ,
				});

				// (3.6.4)
				if(nextElem.length > 0){
					var labelText = $("label[for='"+thisRadioId+"']").text();
					var timeValue = $(elem).attr('value');
					if(!timeValue){
						$(elem).val(labelText);
					}
				}

				// (3.6.5)
				$(customRadio).on('click', function(){

					// (3.6.6)
					var thisGroup = $(this).attr('data-radiogroup');
					$("span[data-radiogroup='" + thisGroup + "']").removeClass('active-radio');
					$(this).addClass('active-radio');

					// (3.6.7)
					var thisElem = $(this).attr('data-radio');
					$("input[id='" + thisElem + "']").click();

					// (3.6.8)
					var thisName = $("input[id='" + thisElem + "']").attr('name');
					$("input[name='" + thisName + "']").removeClass('check-radio');
					$("input[id='" + thisElem + "']").addClass('check-radio');

				});

				// (3.6.9)
				$(nextElem).on('click', function(){
					customRadio.click();
				});

			},
			//end method typeRadio

			// (3.7)
			typeCheckbox: function(elem){

				// (3.7.1)
				var customCheckbox = $('<span class="custom-checkbox">'),
					thisCheckboxId = $(elem).attr('id'),
					thisCheckboxName = $(elem).attr('name'),
					nextElem = $(elem).next('label');

				// (3.7.2)
				$(elem).before(customCheckbox);
				$(elem).addClass('hidden-checkbox');

				// (3.7.3)	
				$(customCheckbox).attr({
					'data-radio': thisCheckboxId,
					'data-radiogroup' : thisCheckboxName ,
				});

				// (3.7.4)
				if(nextElem.length > 0){
					var labelText = $("label[for='" + thisCheckboxId + "']").text();
					var timeValue = $(elem).attr('value');
					if(!timeValue){
						$(elem).val(labelText);
					}
				}

				// (3.7.5)
				$(customCheckbox).on('click', function(){

					// (3.7.7)
					var thisElem = $(this).attr('data-radio');
					$("input[id='" + thisElem + "']").click();

					if($(this).hasClass('active-radio')){
						$(this).removeClass('active-radio');
					}
					else{
						$(this).addClass('active-radio');
					}

					// (3.7.8)
					var thisName = $("input[id='" + thisElem + "']").attr('name');
					$("input[name='" + thisName + "']").removeClass('check-radio');
					$("input[id='" + thisElem + "']").addClass('check-radio');

					console.log($('input[type="checkbox"]:checked').length);

				});

				// (3.7.9)
				$(nextElem).on('click', function(){
					customCheckbox.click();
				});



			},
			//end method typeCheckbox

		};
		//end all methods


		return this.each(function(){

			var nowThis;

			if(this.nodeName.toLowerCase() == 'form'){
				$(this).find('input, button, textarea').each(function(){

					if(this.nodeName.toLowerCase() == 'textarea')
						$(this).attr('type', 'textarea');

					nowThis = this;
					definition(nowThis);
				});
			}
			else if(this.nodeName.toLowerCase() == 'textarea'){
				$(this).attr('type', 'textarea');
			}

			definition(nowThis);

			function definition(el){
				
				var type = $(el).attr('type');
				var dataEl = $(el).attr('data-element');

				switch(type){
					case 'file':
						methods.typeFile(el);
						break;
					case 'text':
					case 'password':
						(dataEl == 'number') ? methods.typeNumber(el) : methods.typeText(el);
						break;
					case 'submit':
					case 'button':
					case 'reset':
						methods.typeButton(el);
						break;
					case 'textarea':
						methods.typeTextarea(el);
						break;
					case 'radio' :
						methods.typeRadio(el);	
						break;
					case 'checkbox' :
						methods.typeCheckbox(el);	
						break;
					default:
						console.log('Ошибка! Элемент не может быть обработан:');
						console.log(el);	
				}
			}

		});
	};

})(jQuery)


