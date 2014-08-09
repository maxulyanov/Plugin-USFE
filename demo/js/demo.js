$(function(){


	//Различные варианты инициализации плагина для демонстрации
	$('#custom-form').usfe({
		c_styleCheckbox: 'style-1',
		cal_animateSwitchSpeed: 100,
		cal_animateSpeed: 300,
	});

	$('#fix-height').usfe({
		s_height: 120,
	});

	$('#example-calendar-two').usfe({
		cal_animateSwitch: true,
		cal_animateSwitchSpeed: 400,
		cal_animateSpeed: 400,
	});

	$('#check4, #check5, #check6, #check-6, #check7').usfe({
		c_styleCheckbox: 'style-2',
	});

	$('#example-file-2').usfe({
		f_defaultButtonName: 'Прикрепить',
		f_defaultFileName: 'Выберите файл',
		f_bgDelete: 'rgb(114, 168, 33)',
	});

	$('#example-num-2').usfe({
		n_iconPlus: 'Сюда',
		n_iconMinus: 'Туда',
	});


	//Доп. функции для демонстрации
	$.fn.toggleDisabled = function() {
		return this.each(function() {
			this.disabled = !this.disabled;
		});
	};

	$.fn.toggleChecked = function() {
		return this.each(function() {
			this.checked = !this.checked;
		});
	};

	//Отмена станд.поведения ссылок при клике
	$('.edit-button').on('click', function(event){
		event.preventDefault();
	});


	//
	$('.button-select-new').on('click', function(){
		var newElem = $('<p style="margin-top:15px;"><span>Новый список</span><select><option>Выберите пункт</option><option>Пункт 1</option><option>Пункт 2</option><option>Пункт 3</option></select></p>');
		$(newElem).appendTo($('#custom-form > div').eq(0).find('.demo-block'));
		$('select').usfe();
	});

	//
	$('.button-select-toogle-active').on('click', function(){
		$('.select-this').toggleClass('select-disabled');
	});

	$('.button-select-toogle-add').on('click', function(){
		var newElem = '';
		for(var i = 1; i <= 5; i++){
			newElem += '<option>' + 'Новый пункт '+ i +'</option>';
		}
		$(this).parent('div').parent('div').find('select')
		$(newElem).appendTo($('#custom-form > div').eq(0).find('.demo-block > p:first select'));
		$('.demo-block > p:first select').trigger('refresh');
	});

	$('.button-select-toogle-active-2').on('click', function(){
		$('.select-wrap').find('li').toggleClass('disabled');
	});


	//
	$('.button-radio-toggle').on('click', function(){
		$('input[type="radio"]').toggleDisabled().trigger('refresh');
		$('.custom-radio').toggleClass('disable-radio');
	});

	$('.button-radio-new').on('click', function(){
		var newElem = $('<label><input name="group1" type="radio">Новый элемент Radio</label>');
		$(newElem).appendTo($('#custom-form > div').eq(1).find('.demo-block > p'));
		$('input[type="radio"]').usfe();
	});


	//
	$('.button-checkbox-toggle').on('click', function(){
		$('input[type="checkbox"]').toggleDisabled().trigger('refresh');
		$('.custom-checkbox').toggleClass('disabled-checkbox');
	});

	$('.button-checkbox-toggle-2').on('click', function(){
		event.preventDefault();
		$('input[type="checkbox"]').toggleChecked().trigger('refresh');
		$('.custom-checkbox').toggleClass('active-checkbox');
	});

	$('.button-checkbox-new').on('click', function(){
		var newElem = $('<label><input name="group1" type="checkbox">Новый элемент Checkbox</label>');
		$(newElem).appendTo($('#custom-form > div').eq(2).find('.demo-block > p:first'));
		$('.first-block-d-check').find('input[type=checkbox]').usfe();
	});

	$('.button-checkbox-new-2').on('click', function(){
		var newElem = $('<label><input name="group1" type="checkbox">Новый элемент Checkbox</label>');
		$(newElem).appendTo($('#custom-form > div').eq(2).find('.demo-block > p:last'));
		$('.last-block-d-check').find('input[type=checkbox]').usfe({
			c_styleCheckbox: 'style-2',
		});
	});


	$('.txt-prev-label').each(function(){
		$(this).appendTo($(this).prev('div'))
	});

});	