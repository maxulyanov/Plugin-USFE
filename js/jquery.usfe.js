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
			t_backgroundcolor: '#475160',

			//settings type = textarea
			te_animateEffect: true,
			te_animateSpeed: 400,
			te_color: '#FFF',
			te_backgroundcolor: '#475160',

			//settings type = checkbox
			c_styleCheckbox: 'style-1',

			//settings type = select
			s_height: false,

			//settings type = calendar
			cal_animateSpeed: 200,
			cal_animateSwitch: false,
			cal_animateSwitchSpeed: 300,

			//settings type = search
			se_animateEffect: true,
			se_animateSpeed: 400,
			se_animateToogleSpeed: 200,
			se_color: '#FFF',
			se_backgroundcolor: '#475160',


		};

		options = $.extend(defaults, options);

		var data;
		var methods = {

			// (3.0)
			init: function(){
				data = $(this).data('tooltip');
	            $(this).data('tooltip', {target : $(this),});
			},

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

				if($(elem).parents('.number-wrap').length < 1){

					// (3.2.1)
					var numWrap = $('<div class="number-wrap">'),
						numPlus = $('<button type="button" value="-" class="number-plus">'+ defaults.n_iconPlus +'</button>'),
						numMinus = $('<button type="button" value="-" class="number-minus">'+ defaults.n_iconMinus +'</button>');

					$(elem).wrap(numWrap);
					$(elem).before(numMinus).after(numPlus);

					// (3.2.2)
					$('.number-plus').on('click', function(){

						var thisInput = $(this).parent().find('input[type="usfe-number"]');
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

						var thisInput = $(this).parent().find('input[type="usfe-number"]');
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
					$('input[type="usfe-number"]').on('keypress input change', function(event){

						if(event.charCode < 48 || event.charCode > 57) return false;
						var thisVal = $(this).parent().find('input[type="usfe-number"]').val(); 

						computation(this, thisVal);
					});
				 
					// (3.2.8)
					function computation(elem, val){

						if(isNaN(val)){
							val = 1;
						}

						$(elem).parent().find('input[type="usfe-number"]').val(val);
						$(elem).parent().find('input[type="usfe-number"]').attr('value', val);
					};
				};	
	
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

					if($(elem).parents('.text-wrap').length < 1){
						$(elem).wrap(textWrap);
					}

					// (3.3.2)
					$('.text-wrap').css({
						position: 'relative',
						height: textRealH,
					});

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

				if($(elem).parents('.radio-wrap').length < 1){

					// (3.6.1)
					var radioWrap = $('<div class="radio-wrap">'),
						customRadio = $('<span class="custom-radio">'),
						thisRadioId = $(elem).attr('id'),
						thisRadioName = $(elem).attr('name'),
						nextElem = $(elem).next('label'),
						parentElem = $(elem).parent('label');

					// (3.6.2)
					if(!data){						
						if($(elem).parent('label').length){
							$(parentElem).wrap(radioWrap);
							$(elem).before(customRadio);
						}
						else{
							$(elem).wrap(radioWrap);
							$(elem).before(customRadio, nextElem);
						}	
							
						$(elem).addClass('hidden-radio');
					};

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

					var checked = $(elem).attr('checked');
					var elemDisabled = $(elem).attr('disabled');

					if(checked){
						var groupName = $(elem).attr('name');
						$("span[data-radiogroup='" + groupName + "']").removeClass('active-radio');
						
						$(elem).parents('.radio-wrap').find('span').addClass('active-radio');
						$(elem).attr('checked', true);
					}

					if(elemDisabled){
						$(elem).parent('.radio-wrap').find('span').addClass('disabled');
					}

					
				

					// (3.6.5)
					$(customRadio).on('click', function(){
						if(!$(this).hasClass('disabled')){
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
						}

					});

					// (3.6.9)
					$(nextElem).on('click', function(){
						customRadio.click();
					});

					// (3.6.10)
					$(parentElem).on('click', function(){
						if(!$(this).find('span').hasClass('disabled')){

							var thisCustom = $(this).find('.custom-radio');
							var thisGroup = $(thisCustom).attr('data-radiogroup');
							$("span[data-radiogroup='" + thisGroup + "']").removeClass('active-radio')
							$(thisCustom).addClass('active-radio');
						}
					});
				}
			},
			//end method typeRadio

			// (3.7)
			typeCheckbox: function(elem){

				// (3.7.1)
				if(defaults.c_styleCheckbox == 'style-1'){
					classCheckbox = 'custom-checkbox';
				}
				else if(defaults.c_styleCheckbox == 'style-2'){
					classCheckbox = 'custom-checkbox-2';
				}
				else
					classCheckbox = 'custom-checkbox';

				// (3.7.2)
				var customCheckbox = $('<span class="' + classCheckbox + '">'),					
				checkboxWrap = $('<div class="checkbox-wrap">'),
					nextElem = $(elem).next('label'),
					classCheckbox;

				// (3.7.3)
				if($(elem).parents('.checkbox-wrap').length < 1){	
					$(elem).wrap(checkboxWrap);
					$(elem).before(customCheckbox).after(nextElem);
					$(elem).addClass('hidden-checkbox');
				}
				else{
					$(elem).prev('span').remove();
					$(elem).before(customCheckbox);
				}		

				// (3.7.4)
				if(nextElem.length > 0){
					var labelText = $(elem).parent('div').find('label').text();
					var timeValue = $(elem).attr('value');
					if(!timeValue){
						$(elem).val(labelText);
					}
				};

				var checked = $(elem).attr('checked');
				if(checked){
					$(elem).prev('span').addClass('active-checkbox');
				}

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

				if($(elem).parents('.select-wrap').length < 1){

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

							// a
							var thisClass = $(this).attr('class');
							var optgroupClass = 'optgroup';
							var optionClass = 'option';
							$(selectUl).append('<li class="' + optgroupClass +' '+ thisClass + '">' + $(this)
								.attr('label') + '</li>');

							// b
							$(this).find('option').each(function(){

								// c
								var valueData = 'element-' + countData++;
								$(this).attr('data-opt', valueData);
								var optionText = $(this).text();
								$(selectUl).append('<li data-li="' + valueData + '" class="' + optionClass +' '+ thisClass + '">' + optionText + '</li>');

								// d
								var disabled = $(this).attr('disabled');
								if(disabled){
									var AttrDisabled = $(this).attr('data-opt');
									$(selectUl).find('li[data-li="' + AttrDisabled + '"]')
									.addClass('disabled');
								}

								// f
								var selectrLen = $(selectUl).find('li.selected').length;
								var selected = $(this).attr('selected');
								if(selected && selectrLen < 1){
									$(selectThisText).text($(this).text());
									var AttrSelected = $(this).attr('data-opt');
									$(selectUl).find('li[data-li="' + AttrSelected + '"]')
									.addClass('selected');
									initDefaultOption = true;
								}

							});
						}

						// (3.8.3.2)
						else if(this.nodeName.toLowerCase() == 'option'){

							// a
							var thisClass = $(this).attr('class');
							if(!thisClass)
								thisClass = '';
							var optionText = $(this).text();
							$(selectUl).append('<li class="'+ thisClass + '">' + optionText + '</li>');

							// b
							var disabled = $(this).attr('disabled');
							if(disabled){
								var indexDisabled = $(this).index();
								$(selectUl).children('li').eq(indexDisabled).addClass('disabled');
							}

							// c
							var selectrLen = $(selectUl).find('li.selected').length;
							var selected = $(this).attr('selected');
							if(selected && selectrLen < 1){
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
					};
				}

				// (3.8.10)
				if(defaults.s_height){
					$(elem).parents('.select-wrap').find('ul').css({
						'height' : defaults.s_height + 'px',
						'overflowY' : 'scroll',
					});
				};

			},
			//end method typeSelect

			// (3.9)
			typeCalendar: function(elem){

	            methods.init();

				// (3.9.1)
			  	var calendar = new Date(),
			  		month = calendar.getMonth(),
			  		year = calendar.getFullYear(),
			      	calendarWrap = $('<div class="calendar-wrap">'),
			      	calendarTable = $('<table class="calendar">'),
			      	calendarButton = $('<span class="calendar-button">'),
			      	calendarIcon = $('<span class="calendar-icon">');

				var arrMonth = ['Январь','Февраль','Март','Апрель','Май','Июнь',
				              'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
				var arrDay = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];

				$(elem).attr('disabled', true);

				// (3.9.2)
				function calendarGenerator(year, month){

					$(calendarTable).empty();				
					var calendarTr = '<tr>';

					// (3.9.3)
					var cal = new Date(year, month);			  		
					var numDay = new Date(cal.getFullYear(), cal.getMonth()+1, 0).getDate();
			      	var firstDay = new Date(cal.getFullYear(), cal.getMonth(), 1).getDay();
			      	var lastDay = new Date(cal.getFullYear(), cal.getMonth(), numDay).getDay();

					// (3.9.4)
					calendarTr += '<td class="prev-month">' + '<span>' + '</td>';
					calendarTr += '<td class="month" data-month="' + month + '" colspan="3">' + arrMonth[cal.getMonth()] + '</td>';
					calendarTr += '<td class="year" data-year="' + year + '" colspan="2">' + year; + '</td>';
					calendarTr += '<td class="next-month">' + '<span>' + '</td>';
					calendarTr += '</tr>';

					// (3.9.5)
					for(var i = 0; i < 7; i++){
				    	calendarTr += '<td class="tr-week">' + arrDay[i]; + '</td>'
					};
					calendarTr += '</tr>';

					// (3.9.6)       
				  	if(firstDay == 0){
				    	for(var i = 0; i < 6; i++){
				      		calendarTr += '<td class="empty"></td>';
				    	};
				  	}
				  	else{
				    	for(var i = 1; i < firstDay; i++){
				     		calendarTr += '<td class="empty"></td>';
				    	};
				  	};

				  	// (3.9.7)
				  	for(var i = 1; i <= numDay; i++){
				    	var dayWeek = new Date(year,month,i).getDay();
				    	(i == calendar.getDate() && month == calendar.getMonth() && year == calendar.getFullYear()) ? 
					      	calendarTr += '<td class="today day">' + i + '</td>':
					      	calendarTr += '<td class="day">' + i + '</td>';
				    	if(dayWeek == 0){
				      		calendarTr += '</tr>';
				    	};
				  	};

					// (3.9.8)
				  	if(lastDay != 0) {
				    	for(var i = lastDay; i < 7; i++)
				      		calendarTr += '<td class="empty"></td>';
				  	}

				 	$(calendarTable).append(calendarTr);

					// (3.9.9)
				  	$(calendarTable).find('tr').each(function(){
			   			$(this).find('td:eq(5), td:eq(6)').addClass('weekend');
			  		});
			  	};
			  	calendarGenerator(year, month);

			  	// (3.9.10)
			  	function setValue(day, month, year){
					if(!day)
						day = calendar.getDate();
					if(!month)
						month = calendar.getMonth() + 1;

					if(!year)
						year = calendar.getFullYear();

					if(day <= 9) day = '0' + day;
					if(month <= 9) month = '0' + month;
					$(elem).val(day + '.' + month + '.' + year);
				};
				setValue();

			  	// (3.9.11)
			  	$(document).on('click', '.next-month', function(event){
			  		event.stopPropagation();

			  		var month = parseFloat($(this).parent().find('.month').attr('data-month'));
			  		var year = 	parseFloat($(this).parent().find('.year').attr('data-year'));
			  		month++;
			  		if(month >=12){
			  			month = 0;
			  			year++;
			  		}

			  		if(defaults.cal_animateSwitch){
				  		$(this).closest(calendarTable).animate({
				  			left: '100px',
				  			opacity : 0,
				  		},defaults.cal_animateSwitchSpeed, function(){
				  			calendarGenerator(year, month);
				  		})
				  		.animate({
				  			'left': '-100px',
				  		}, 0)
				  		.animate({
				  			left : '0',
				  			opacity: 1,
				  		},defaults.cal_animateSwitchSpeed);
			  		}
			  		else{
			  			$(this).closest(calendarTable).animate({
			  				left: 0,
			  			}, 0, function(){
			  				calendarGenerator(year, month);
			  			});
			  		}

			  	});

			  	// (3.9.12)
			  	$(document).on('click', '.prev-month', function(event){
			  		event.stopPropagation();

			  		var month = parseFloat($(this).parent().find('.month').attr('data-month'));
			  		var year = 	parseFloat($(this).parent().find('.year').attr('data-year'));
			  		month--;
			  		if(month <=0){
			  			month = 11;
			  			year--;
			  		}

			  		if(defaults.cal_animateSwitch){
				  		$(this).closest(calendarTable).animate({
				  			left: '-100px',
				  			opacity : 0,
				  		},defaults.cal_animateSwitchSpeed, function(){
				  			calendarGenerator(year, month);
				  		})
				  		.animate({
				  			'left': '100px',
				  		}, 0)
				  		.animate({
				  			left : '0',
				  			opacity: 1,
				  		},defaults.cal_animateSwitchSpeed);
			  		}
			  		else{
			  			$(this).closest(calendarTable).animate({
			  				left: 0,
			  			}, 0, function(){
			  				calendarGenerator(year, month);
			  			});
			  		}
			  	});

			  	// (3.9.13)
			  	if(!data){
            	 	$(elem).wrap(calendarWrap);
			  		$(elem).after(calendarButton, calendarTable);
			  		$(calendarButton).append(calendarIcon);            	
			  	}
			  		
			  	// (3.9.14)
			  	$(calendarButton).on('click', function(event){
			  		event.stopPropagation();

			  		$(this).next('.calendar').fadeToggle(defaults.cal_animateSpeed);
			  	});

			  	// (3.9.15)
			  	$(calendarTable).on('click','.day', function(){

			  		$(this).closest('.calendar').find('td').removeClass('select-day');
			  		$(this).addClass('select-day');

			  		var thisMonth = $(this).closest('.calendar').find('.month').text();
			  		var thisYear = $(this).closest('.calendar').find('.year').text();
			  		var numMonth;
			  		for(var i = 0; i < arrMonth.length; i++){
			  			if(arrMonth[i] == thisMonth){
			  				numMonth = i + 1;
			  			}
			  		};
			  		setValue($(this).text(), numMonth, thisYear);
			  	});

			  	// (3.9.16)
				$(document).on('click', function(event){

					if($(event.target).closest('.calendar').length) return;
					$(calendarTable).fadeOut(defaults.cal_animateSpeed);
					event.stopPropagation();
				});

			},
			//end method typeCalendar

			// (3.10)
			typeSearch: function(elem){

				// (3.10.1)
				var arr = [],
					countChar = 0,
					resultList = ('<ul class="result-list">'),
					searchWrap = $('<div class="seach-wrap">'),
					searchBg = $('<div class="seach-bg">'),
					searchIcon = $('<input type="submit" class="seach-icon">'),
					dataList = '#' + $(elem).attr('data-list');

				$(elem).wrap(searchWrap);
			  	$(elem).after(resultList, $(dataList));
			  	$(elem).wrap(searchBg);
			  	$(elem).after(searchIcon);

			  	// (3.10.2)
			  	$('.result-list').css({
			  		'max-height': 208,
			  	});
				$(dataList).css('display', 'none');

				var resultList = $(elem).closest('.seach-wrap').find('.result-list');

				// (3.10.3)
				$(dataList).find('li').each(function(){
					arr.push($(this).text());
					$(resultList).append('<li>' + $(this).text() + '</li>');
				});

				// (3.10.4)
				$(elem).keyup(function(event){

					// (3.10.5)
					countChar = $(this).val().length;
					var liHeight = $(resultList).find('li').data('li-height');

					// (3.10.6)
					if(event.which !== 38 && event.which !== 40){
						var strValue = $(this).val().toLowerCase();
						if(!strValue){
							$(resultList).stop().fadeIn(200);
						}

						for(var i = 0 ;i < arr.length; i++){
							var subArr = arr[i].toLowerCase().substr(0, countChar);
							var subVal = strValue.substr(0, countChar);
							if(subArr == subVal){
								if($('li:contains("' + arr[i] + '")').length == 0){
									$('<li>' + arr[i] + '</li>').appendTo(resultList);
								}
							}
							else{
								$('li:contains("' + arr[i] + '")').remove();
							}
						};

						$('.no-result').remove();
						if($(resultList).find('li').length == 0){
							$('<li class="no-result">' + 'Совпадений не найдено.' + '</li>').appendTo(resultList)
						};
					}

					// (3.10.7)
					else if($(resultList).is(':visible')){

						if($(resultList).find('li.no-result').length !== 0)
							return false;

						var elemSelected = $(resultList).find('li.selected');
						var lenElems = $(resultList).find('li').length;

						if(event.which == 40){
							
							if(elemSelected.length == 0){
								$(resultList).find('li').eq(0).addClass('selected');
							}
							else{
								$(elemSelected).next().addClass('selected');
								$(elemSelected).removeClass('selected');

								if(!$(elemSelected).next().length){
									$(resultList).find('li').eq(0).addClass('selected');
								}
								
							};

							$(resultList).scrollTop($('.result-list').scrollTop() + $('.result-list')
							.find('li').filter('.selected').position().top);
						}
						else if(event.which == 38){
							$(elemSelected).prev().addClass('selected');
							$(elemSelected).removeClass('selected');

							if(!$(elemSelected).prev().length){
								$(resultList).find('li').eq(lenElems-1).addClass('selected');
							}

							$(resultList).scrollTop($('.result-list').scrollTop() + $('.result-list')
							.find('li').filter('.selected').position().top);
						};

						var resultTxt = $(resultList).find('li.selected').text();
						$(elem).val(resultTxt);
						
					};

					// (3.10.8)
					var h = $(resultList).height();
					(h >= 200)
						? 
						$(resultList).css({'overflowY' : 'scroll'})	
						:
						$(resultList).css({'overflowY' : 'auto'});	

					(countChar) ? 
						$(resultList).fadeIn(defaults.se_animateToogleSpeed)
						: 
						$(resultList).fadeOut(defaults.se_animateToogleSpeed);

				});

				// (3.10.9)
				$(document).on('click','.result-list li', function(){
					if($(this).hasClass('no-result'))
						return false

						var resultTxt = $(this).text();
						$(this).parents('.seach-wrap').find('li').removeClass('selected');
						$(this).addClass('selected');
						$(this).parents('.seach-wrap').find('input[type="usfe-search"]').val(resultTxt);
				});

				// (3.10.10)
				$('body').on('click', function(){
					$(resultList).fadeOut(defaults.se_animateToogleSpeed);
				});

				var searchDefaultBg = $(elem).parent('div').css('backgroundColor');
				var searchDefaultColor = $(elem).css('color');

				// (3.10.11)
				if(defaults.se_animateEffect){
					$(elem).focus(function(){
						$(this).parent('.seach-bg').animate({
							backgroundColor: defaults.se_backgroundcolor,
							color: defaults.se_color,
						}, defaults.se_animateSpeed);

						$(this).animate({
							color: defaults.se_color,
						}, defaults.se_animateSpeed);

						$(this).next('.seach-icon').css({
							'backgroundPosition': '0 -23px',
						});
					});

					// (3.10.12)
					$(elem).focusout(function(){
						$(this).parent('.seach-bg').animate({
							backgroundColor: searchDefaultBg,
							color: searchDefaultColor,
						}, defaults.se_animateSpeed);

						$(this).animate({
							color: searchDefaultColor,
						}, defaults.te_animateSpeed);

						$(this).next('.seach-icon').css({
							'backgroundPosition': '0 0',
						});
					});
				}

			},//end method typeSearch

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
			else{
				if(this.nodeName.toLowerCase() == 'textarea'){
					$(this).attr('type', 'textarea');
				}
				if(this.nodeName.toLowerCase() == 'select'){
					$(this).attr('type', 'select');
				}
				definition(this);
			}

			function definition(el){

				var type = $(el).attr('type');

				switch(type){
					case 'file':
						methods.typeFile(el);
						break;
					case 'text':
					case 'password':
					case 'email':
						methods.typeText(el);
						break;
					case 'usfe-number':
						methods.typeNumber(el)
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
					case 'usfe-calendar' :
						methods.typeCalendar(el);
						break;
					case 'usfe-search' :
						methods.typeSearch(el);
						break;
					default:
						console.log('Ошибка! Элемент не может быть обработан:');
						console.log(el);	
				}
			}

		});
	};

})(jQuery)


