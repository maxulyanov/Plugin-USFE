/*

 USFE (User Style Form Elements) — jQuery plugin
 Version: 2.0.1
 Author: M.Ulyanov (web.ulyanov@gmail.com)
 Site: http://web-ulyanov.ru
 Source && Doc: https://github.com/M-Ulyanov/Plugin-USFE/
 Example: http://example.web-ulyanov.ru/frontend/usfe/demo/index.html

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
			n_maxVal: Infinity,
			n_editBg: true,
			n_iconPlus: '+',
			n_iconMinus: '-',

			//settings type = text
			t_animateEffect: true,
			t_animateSpeed: 400,
			t_editW: 12,
			t_editH: 3,
			t_color: '#FFF',
			t_backgroundcolor: '#727272',

			//settings type = textarea
			te_animateEffect: true,
			te_animateSpeed: 400,
			te_color: '#FFF',
			te_backgroundcolor: '#727272',

			//settings type = select
			s_height: false,

			//settings type = calendar
			cal_animateSpeed: 0,
			cal_animateSwitch: false,
			cal_animateSwitchSpeed: 300,

			//settings type = search
			se_animateEffect: true,
			se_animateSpeed: 400,
			se_animateToogleSpeed: 200,
			se_color: '#727272',
			se_backgroundcolor: '#f7f7f7'


		};

		options = $.extend(defaults, options);

		var data;
		var methods = {

			// (3.0)
			init: function(){
				data = $(this).data('tooltip');
	            $(this).data('tooltip', {target : $(this)});
			},

			// (3.1)
			typeFile : function(elem){

				// (3.1.1)
				var fileWrap = $('<div class="file-wrap"></div>'),
					fileButton = $('<button type="button" class="file-button"></button>'),
					fileName  = $('<div class="file-name"></div>'),
					fileDelete = $('<span class="file-del">'+defaults.f_charDelete+'</a>');

				if($(elem).parents('.file-wrap').length < 1){
					$(elem).wrap(fileWrap);						
					$(elem).after(fileButton, fileName);
				}

				$(elem).parents('.file-wrap').find('.file-button').text(defaults.f_defaultButtonName);
				$(elem).parents('.file-wrap').find('.file-name').text(defaults.f_defaultFileName);

				elem = $(elem);

				var disabled = $(elem).attr('disabled');
				if(disabled){
					$(elem).parents('.file-wrap').addClass('file-disabled');
				}

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
	            
			            $(elem).parent().append(fileDelete);

			            $(fileDelete).css({
			            	display: 'block',
			            	opacity: 1
			            })

			        }).change();

				});

		        // (3.1.8)
		        $(fileDelete).on('click', function(){

		        	if($(this).parents('.file-wrap').hasClass('file-disabled'))
		        		return false;
		        	
		            // (3.1.9)
		            var self = this;
		            var thisBg = $(elem).parents('.file-wrap').css('backgroundColor');

		            $(elem).parent(fileWrap).removeAttr('title');

		            // (3.1.10)
		            $(this).parent().stop(true, true).animate({
		                backgroundColor:  defaults.f_bgDelete
		            },400)
		            .stop(true,true).animate({
		                backgroundColor: thisBg
		            },400);

		            $(this).parent().find(fileName).animate({
		                opacity: 0
		            });

		            $(this).parent().find(self).animate({
		                opacity: 0
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
		                opacity: 1
		            },400);

		            $(this).css({display: 'none'});

        		};

			},
			//end method typeFile

			// (3.2)
			typeNumber : function(elem){

					// (3.2.1)
					var numWrap = $('<div class="number-wrap"></div>'),
						numPlus = $('<button type="button" value="-" class="number-plus"></button>'),
						numMinus = $('<button type="button" value="-" class="number-minus"></button>');

				
					if($(elem).parents('.number-wrap').length < 1){

						$(elem).wrap(numWrap);
						$(elem).before(numMinus).after(numPlus);

						// (3.2.2)
						$(elem).next('.number-plus').on('click', function(){

							var thisInput = $(this).parent().find('input[type="usfe-number"]');
							var thisVal = $(thisInput).val();
							thisVal++;

							// (3.2.3)
							if(defaults.n_editBg){
								$(thisInput).stop(true, true).animate({
									backgroundColor: '#9bcb1e'
								}, 400).stop(true,true).animate({
									backgroundColor: '#FFF'
								}, 400);
							}

							computation(this, thisVal);
						});
					

						// (3.2.4)
						$(elem).prev('.number-minus').on('click', function(){

							var thisInput = $(this).parent().find('input[type="usfe-number"]');
							var thisVal = $(thisInput).val();
							thisVal--; 

							// (3.2.5)
							if(!thisVal) thisVal = 1;

							// (3.2.6)
							if(defaults.n_editBg){
								$(thisInput).stop(true, true).animate({
									backgroundColor: '#ea6856'
								}, 400).stop(true,true).animate({
									backgroundColor: '#FFF'
								}, 400);
							}

							computation(this, thisVal);
						});
					}

					$(elem).parents('.number-wrap').find('.number-plus').text(defaults.n_iconPlus);
					$(elem).parents('.number-wrap').find('.number-minus').text(defaults.n_iconMinus);

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
						if(val > defaults.n_maxVal)
							return false;
						$(elem).parent().find('input[type="usfe-number"]').val(val);
						$(elem).parent().find('input[type="usfe-number"]').attr('value', val);
					};
	
			},
			//end method typeNumber

			// (3.3)
			typeText : function(elem){

				var disabled = $(elem).attr('disabled');
				if(disabled){
					$(elem).addClass('disabled-input');
				}

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
						height: textRealH
					});

					// (3.3.3)
					$(elem).focus(function(){
						$(this).animate({
							width: textDefaultW + defaults.t_editW,
							height: textDefaultH + defaults.t_editH,
							backgroundColor: defaults.t_backgroundcolor,
							color: defaults.t_color
						}, defaults.t_animateSpeed);
					});

					// (3.3.4)
					$(elem).focusout(function(){
						$(this).animate({
							width: textDefaultW,
							height: textDefaultH, 
							backgroundColor: textDefaultBg,
							color: textDefaultColor
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
							color: defaults.te_color
						}, defaults.te_animateSpeed);
					});

					// (3.5.3)
					$(elem).focusout(function(){
						$(this).animate({
							backgroundColor: textareaDefaultBg,
							color: textareaDefaultColor
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
						customRadio = $('<span class="custom-radio"></span>'),
						thisRadioId = $(elem).attr('id'),
						thisRadioName = $(elem).attr('name'),
						nextElem = $(elem).next('label'),
						parentElem = $(elem).parent('label');

					// (3.6.2)					
					if($(elem).parent('label').length){
						$(parentElem).wrap(radioWrap);
						$(elem).before(customRadio);
					}
					else{
						$(elem).wrap(radioWrap);
						$(elem).before(customRadio, nextElem);
					}
						
					$(elem).addClass('hidden-radio');

					// (3.6.3)	
					$(customRadio).attr({
						'data-radio': thisRadioId,
						'data-radiogroup' : thisRadioName
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
					var checked = $(elem).attr('checked');
					var elemDisabled = $(elem).attr('disabled');

					if(checked){
						var groupName = $(elem).attr('name');
						$("span[data-radiogroup='" + groupName + "']").removeClass('active-radio');
						
						$(elem).parents('.radio-wrap').find('span').addClass('active-radio');
						$(elem).attr('checked', true);
					}

					if(elemDisabled){
						$(elem).parents('.radio-wrap').find('span').addClass('disable-radio');
					}		

					// (3.6.6)
					$(customRadio).on('click', function(){
						if(!$(this).hasClass('disable-radio')){

							// (3.6.7)
							var thisGroup = $(this).attr('data-radiogroup');
							$("span[data-radiogroup='" + thisGroup + "']").removeClass('active-radio');
							$(this).addClass('active-radio');

							// (3.6.8)
							var thisElem = $(this).attr('data-radio');
							var thisName = $("input[id='" + thisElem + "']").attr('name');
							$("input[name='" + thisName + "']").removeAttr('checked');
							$("input[id='" + thisElem + "']").attr('checked', true);

							$("input[id='" + thisElem + "']").click();

							if(typeof thisElem === 'undefined'){
								$(this).parents('.radio-wrap').find('input').click();
							}			
						}

					});

					// (3.6.9)
					$(nextElem).on('click', function(){
						customRadio.click();
					});

					// (3.6.10)
					$(parentElem).on('click', function(){
						if(!$(this).find('span').hasClass('disable-radio')){

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
				// (3.7.2)
				var customCheckbox = $('<span class="custom-checkbox"></span>'),					
					checkboxWrap = $('<div class="checkbox-wrap">'),
					nextElem = $(elem).next('label'),
					parentElem = $(elem).parent('label');


				// (3.7.3)
				if($(elem).parents('.checkbox-wrap').length < 1){	
					if($(elem).parent('label').length){
							$(parentElem).wrap(checkboxWrap);
							$(elem).before(customCheckbox);
						}
						else{
							$(elem).wrap(checkboxWrap);
							$(elem).before(customCheckbox).after(nextElem);
						}	
					$(elem).css({
						'opacity': 0,
						'position': 'absolute',
						'left': '-9999px'
					});
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

				// (3.7.5)
				var checked = $(elem).attr('checked');
				if(checked){
					$(elem).prev('span').addClass('active-checkbox');
				}

				var disabled = $(elem).attr('disabled');
				if(disabled){
					$(elem).prev('span').addClass('disabled-checkbox');
				}

				// (3.7.6)
				$(customCheckbox).on('click', function(){				
					$(this).parent('.checkbox-wrap').find('input[type="checkbox"]').click();
				});

				// (3.7.7)
				$(elem).on('click', function(){

					var parent = $(this).parents('.checkbox-wrap');
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
						selectThisTriggerArrow = $('<div class="select-this-trigger-arrow"></div>'),
						selectDropdown = $('<div class="select-dropdown">'),
						selectUl = $('<ul>');


					if($(elem).parents('.select-wrap').length < 1){	
						// (3.8.2)
						$(elem).before(selectWrap);
						$(selectThis).append(selectThisText,$(selectThisTrigger).append(selectThisTriggerArrow));
						$(selectWrap).append(selectThis, selectDropdown, elem);
					}

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

						if($(this).hasClass('select-disabled')) return false;
						if($(this).hasClass('optgroup')) return false;

						var thisElem = $(this);

						$('.select-this').each(function(){
							if($(this) !== thisElem){
								$(this).find('.select-this-trigger-arrow').remove();
								$(this).find('.select-this-trigger').append('<div class="select-this-trigger-arrow"></div>');
							}
						});

						$('.select-this').removeClass('open-dropdown');

						var thisDrop = $(this).parent().find('.select-dropdown');
						if($(thisDrop).is(':hidden')){
							$('.select-dropdown').hide();
							$(thisDrop).show();
							$(this).addClass('open-dropdown');
						}
						else{
							$(thisDrop).hide();
							$(this).removeClass('open-dropdown');
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

						$(this).parents('.select-wrap').find('.select-this').removeClass('open-dropdown');

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
						$('.select-this').removeClass('open-dropdown');
					});

				

				// (3.8.9)
				if(defaults.s_height){
					$(elem).parents('.select-wrap').find('ul').css({
						'height' : defaults.s_height + 'px',
						'overflowY' : 'scroll'
					});
				};

				// (3.8.10)
				$(elem).on('refresh', function() {
					$(elem).off().parent().before(elem).remove();
					methods.typeSelect(elem);
				});

			},
			//end method typeSelect

			// (3.9)
			typeCalendar: function(elem){

	           // methods.init();

				// (3.9.1)
			  	var calendar = new Date(),
			  		month = calendar.getMonth(),
			  		year = calendar.getFullYear(),
			      	calendarWrap = $('<div class="calendar-wrap"></div>'),
			      	calendarTable = $('<table class="calendar"></table>'),
			      	calendarButton = $('<span class="calendar-button"></span>'),
			      	calendarIcon = $('<span class="calendar-icon"></span>');

				var arrMonth = ['Январь','Февраль','Март','Апрель','Май','Июнь',
				              'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
				var arrDay = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];

				$(elem).attr('readonly', true);

				// (3.9.2)
				function calendarGenerator(year, month){

					$(calendarTable).empty();				
					var calendarTr = '<tr>';

					// (3.9.3)
					var cal = new Date(year, month);			  		
					var numDay = new Date(cal.getFullYear(), cal.getMonth()+1, 0).getDate();
					var numDayPrev = new Date(cal.getFullYear(), cal.getMonth(), 0).getDate();
					//
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
					calendarTr += '<tr>';    
				  	if(firstDay == 0){
				  		var prevM  = numDayPrev - 6;
				    	for(var i = 0; i < 6; i++){
				      		prevM ++;
				     		calendarTr += '<td class="prevday">' + prevM + '</td>';
				    	};
				  	}
				  	else{
					  	if(firstDay == 1){
					  		var prevM  = numDayPrev - 7;
					    	for(var i = 0; i < 7; i++){
					      		prevM ++;
					     		calendarTr += '<td class="prevday">' + prevM + '</td>';
					    	};
					    	calendarTr += '</tr>';
					  	}
				  		var prevM  = numDayPrev - firstDay + 1;
				    	for(var i = 1; i < firstDay; i++){
				    		prevM ++;
				     		calendarTr += '<td class="prevday">' + prevM + '</td>';
				    	};
				  	}

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
				  	if(lastDay != 0){
				  		var d = 1;
				    	for(d; d <= 7-lastDay; d++){
				      		calendarTr += '<td class="nextday">' + d + '</td>';
				      	}

				      	var a = [];
				      	a = calendarTr.split('</tr>');
				      	
				      	if(a.length <= 7){
				      		calendarTr += '<tr>';
				      		for(var i = 1; i <= 7; i++){
					      		calendarTr += '<td class="nextday">' + d + '</td>';
					      		d++
				      		}

				      	}
				  	}
				  	else{
				  		for(var i = 1; i <= 7; i++)
				      		calendarTr += '<td class="nextday">' + i + '</td>';
				      		calendarTr += '</tr>';
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
				  			opacity : 0
				  		},defaults.cal_animateSwitchSpeed, function(){
				  			calendarGenerator(year, month);
				  		})
				  		.animate({
				  			left: '-100px'
				  		}, 0)
				  		.animate({
				  			left : '0',
				  			opacity: 1
				  		},defaults.cal_animateSwitchSpeed);
			  		}
			  		else{
			  			$(this).closest(calendarTable).animate({
			  				left: 0
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
				  			opacity : 0
				  		},defaults.cal_animateSwitchSpeed, function(){
				  			calendarGenerator(year, month);
				  		})
				  		.animate({
				  			left: '100px'
				  		}, 0)
				  		.animate({
				  			left : '0',
				  			opacity: 1
				  		},defaults.cal_animateSwitchSpeed);
			  		}
			  		else{
			  			$(this).closest(calendarTable).animate({
			  				left: 0
			  			}, 0, function(){
			  				calendarGenerator(year, month);
			  			});
			  		}
			  	});

			  	// (3.9.13)
			  	if($(elem).parents('.calendar-wrap').length < 1){            	 	
			  		$(elem).wrap(calendarWrap);
			  		$(elem).after(calendarButton, calendarTable);
			  		$(calendarButton).append(calendarIcon);            	
			  	}
			  	else{
			  		removeOldElems();
			  		$(elem).after(calendarButton, calendarTable);
			  		$(calendarButton).append(calendarIcon);   
			  	}

			  	var disabled = $(elem).attr('disabled');
				if(disabled){
					$(elem).parent('.calendar-wrap').addClass('calendar-disabled');
				}


			  	function removeOldElems(){
			  		var p = $(elem).parents('.calendar-wrap');
			  		$(p).find('.calendar-button, .calendar').remove();
			  	}
			  		
			  	// (3.9.14)
			  	$(calendarButton).on('click', function(event){
			  		if($(this).parents('.calendar-wrap').hasClass('calendar-disabled'))
		        		return false;
			  		event.stopPropagation();
			  		$('.calendar').stop(1).fadeOut(defaults.cal_animateSpeed);
			  		$(this).next('.calendar').stop(1).fadeToggle(defaults.cal_animateSpeed);
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
			  	$(elem).before(searchIcon);

			  	// (3.10.2)
				$(dataList).css('display', 'none');

				var resultList = $(elem).closest('.seach-wrap').find('.result-list');

				// (3.10.3)
				$(dataList).find('li').each(function(){
					arr.push($(this).text());
					$(resultList).append('<li>' + '<span>' + $(this).text() + '</span>' +  '</li>');
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
							return false;
						}

						for(var i = 0 ;i < arr.length; i++){
							var subArr = arr[i].toLowerCase().substr(0, countChar);
							var subVal = strValue.substr(0, countChar);
							if(subArr == subVal){
								if($('li:contains("' + arr[i] + '")').length == 0){
									console.log('11')
									$('<li>' + '<span>' + arr[i] + '</span>' +  '</li>').appendTo(resultList);
								}
							}
							else{
								$('li:contains("' + arr[i] + '")').remove();
							}
						};

						$('.no-result').remove();
						if($(resultList).find('li').length == 0){
							$('<li class="no-result">' + '<span>' + 'Совпадений не найдено.' + '</span>' +  '</li>').appendTo(resultList)
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
					$(resultList).css('max-height', defaults.se_height);	

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
							color: defaults.se_color
						}, defaults.se_animateSpeed);

						$(this).animate({
							color: defaults.se_color
						}, defaults.se_animateSpeed);

						$(this).next('.seach-icon').css({
							'backgroundPosition': '0 -23px'
						});
					});

					// (3.10.12)
					$(elem).focusout(function(){
						$(this).parent('.seach-bg').animate({
							backgroundColor: searchDefaultBg,
							color: searchDefaultColor
						}, defaults.se_animateSpeed);

						$(this).animate({
							color: searchDefaultColor
						}, defaults.te_animateSpeed);

						$(this).next('.seach-icon').css({
							'backgroundPosition': '0 0'
						});
					});
				}

				// (3.10.13)
				$(elem).on('refresh', function() {
					$(elem).off().parent().before(elem).remove();
					methods.typeSearch(elem);
				});

			}//end method typeSearch

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


