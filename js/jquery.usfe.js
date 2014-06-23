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

			//settings type = checkbox
			c_styleCheckbox: 'style-1',


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
					$("input[name='" + thisName + "']").removeAttr('checked');
					$("input[id='" + thisElem + "']").attr('checked', true);

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
				if(defaults.c_styleCheckbox == 'style-1')
					classCheckbox = 'custom-checkbox';
				else if(defaults.c_styleCheckbox == 'style-2')
					classCheckbox = 'custom-checkbox-2';
				else
					classCheckbox = 'custom-checkbox';

				// (3.7.2)
				var customCheckbox = $('<span class="' + classCheckbox + '">'),
					checkboxWrap = $('<div class="checkbox-wrap">'),
					nextElem = $(elem).next('label'),
					classCheckbox;

				// (3.7.3)
				$(elem).wrap(checkboxWrap);
				$(elem).before(customCheckbox).after(nextElem);
				$(elem).addClass('hidden-checkbox');				

				// (3.7.4)
				if(nextElem.length > 0){
					var labelText = $(elem).parent('div').find('label').text();
					var timeValue = $(elem).attr('value');
					if(!timeValue){
						$(elem).val(labelText);
					}
				};

				// (3.7.5)
				$(customCheckbox).on('click', function(){						
					$(this).next('input').click();
				});

				// (3.7.6)
				$(elem).on('click', function(){

					var parent = $(this).parent('div');
					if($(parent).find('input').is(':checked')){
						$(parent).find(customCheckbox).addClass('active-checkbox');
						$(this).attr('checked', true);
					}
					else{
						$(parent).find(customCheckbox).removeClass('active-checkbox');
						$(this).removeAttr('checked');
					}
				});

			},
			//end method typeCheckbox

			// (3.8)
			typeSelect: function(elem){

				// (3.8.1)
				var selectWrap = $('<div class="select-wrap">'),
					selectThis = $('<div class="select-this">'),
					selectThisText = $('<div class="select-this-text">'),
					selectThisTrigger = $('<div class="select-this-trigger">'),
					selectThisTriggerArrow = $('<div class="select-this-trigger-arrow">'+'&#9660;'+'</div>'),
					selectDropdown = $('<div class="select-dropdown">'),
					selectUl = $('<ul>');

				// (3.8.2)
				$(elem).before(selectWrap);
				$(selectThis).append(selectThisText,$(selectThisTrigger).append(selectThisTriggerArrow));
				$(selectWrap).append(selectThis, selectDropdown, elem);

				if($(elem).attr('disabled'))
					$(selectThis).addClass('select-disabled');
								
				// (3.8.3)
				var initDefaultOption = false;
				var countData = 0;
				$(elem).children('option, optgroup').each(function(){

					// (3.8.3.1)
					if(this.nodeName.toLowerCase() == 'optgroup'){
						var thisClass = $(this).attr('class');
						var optgroupClass = 'optgroup';
						var optionClass = 'option';
						$(selectUl).append('<li class="' + optgroupClass +' '+ thisClass + '">' + $(this)
							.attr('label') + '</li>');

						$(this).find('option').each(function(){
							var valueData = 'element-' + countData++;
							$(this).attr('data-opt', valueData);
							var optionText = $(this).text();
							$(selectUl).append('<li data-li="' + valueData + '" class="' + optionClass +' '+ thisClass + '">' + optionText + '</li>');

							var disabled = $(this).attr('disabled');
							if(disabled){
								var AttrDisabled = $(this).attr('data-opt');
								$(selectUl).find('li[data-li="'+AttrDisabled+'"]').addClass('disabled');
							}
						});

					}
					// (3.8.3.2)
					else if(this.nodeName.toLowerCase() == 'option'){

						var optionText = $(this).text();
						$(selectUl).append('<li>' + optionText + '</li>');

						var disabled = $(this).attr('disabled');
						if(disabled){
							var indexDisabled = $(this).index();
							$(selectUl).children('li').eq(indexDisabled).addClass('disabled');
						}

						var selected = $(this).attr('selected');
						if(selected){
							$(selectThisText).text($(this).text());
							var indexSelected = $(this).index();
							$(selectUl).children('li').eq(indexSelected).addClass('selected');
							initDefaultOption = true;
						}
					}

				});
				$(selectDropdown).append(selectUl);

				// (3.8.4)
				if(!initDefaultOption){
					var eqPos = 0;
					while($(selectUl).find('li').eq(eqPos).hasClass('disabled')){
						eqPos++;					
					}
					var firstOption = $(elem).find('option').eq(eqPos);
					$(selectThisText).text($(firstOption).text());
					$(selectUl).find('li').eq(eqPos).addClass('selected');
				}

				// (3.8.5)
				$(selectThis).on('click', function(event){

					event.stopPropagation();

					if($(this).hasClass('select-disabled, optgroup')) return false;

					var thisElem = $(this);

					$('.select-this').each(function(){
						if($(this) !== thisElem){
							$(this).find('.select-this-trigger-arrow').remove();
							$(this).find('.select-this-trigger').append('<div class="select-this-trigger-arrow">' + '&#9660' + '</div>');
						}
					});

					var thisDrop = $(this).parent().find('.select-dropdown');
					if($(thisDrop).is(':hidden')){
						$('.select-dropdown').hide();
						$(thisDrop).show();
						changeArrow(true);
					}
					else{
						$(thisDrop).hide();
						changeArrow(false);
					}

				});

				// (3.8.6)
				$(selectUl).find('li').on('click', function(event){

					event.stopPropagation();

					if($(this).hasClass('disabled')) return false;
					if($(this).hasClass('optgroup')) return false;

					$(this).parent().find('li').removeClass('selected');
					$(this).addClass('selected');
					$(selectThisText).text($(this).text());
					$(this).parents('.select-dropdown').hide();

					changeArrow(false);

				});

				// (3.8.7)
				$(selectUl).find('li').hover(function(){
					$(this).parents('ul').addClass('hover-list');
				},
				function(){
					$(this).parent('ul').removeClass('hover-list');
				});


				// (3.8.8)
				$('html').on('click', function(){
					$('.select-dropdown').hide();
					changeArrow(false);
				});

				// (3.8.9)
				function changeArrow(param){
					var arrow = '';
					if(param){
						arrow = '&#9650';
					}
					else{
						arrow = '&#9660';

					}
					$(selectThisTrigger).find('div').remove();
					$(selectThisTrigger).append('<div class="select-this-trigger-arrow">' + arrow + '</div>');
				}

				

			},
			//end method typeSelect

		};
		//end all methods


		return this.each(function(){

			var nowThis;

			if(this.nodeName.toLowerCase() == 'form'){
				$(this).find('input, button, textarea, select').each(function(){

					if(this.nodeName.toLowerCase() == 'textarea')
						$(this).attr('type', 'textarea');

					if(this.nodeName.toLowerCase() == 'select')
						$(this).attr('type', 'select');

					nowThis = this;
					definition(nowThis);
				});
			}
			else if(this.nodeName.toLowerCase() == 'textarea'){
				$(this).attr('type', 'textarea');
			}
			else if(this.nodeName.toLowerCase() == 'select'){
				$(this).attr('type', 'select');
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
					case 'select' :
						methods.typeSelect(el);	
						break;
					default:
						console.log('Ошибка! Элемент не может быть обработан:');
						console.log(el);	
				}
			}

		});
	};

})(jQuery)


