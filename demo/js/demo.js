$(function(){

	// Появление блоков в демо
	$('#custom-form > div').animate({
		opacity: 1,
		left: 0
	}, 600);


	// Различные варианты инициализации плагина для демонстрации
	$('#custom-form').usfe({
		cal_animateSwitchSpeed: 300
	});

	$('#fix-height').usfe({
		s_height: 160
	});

	$('#example-calendar-two').usfe({
		cal_animateSwitch: true,
		cal_animateSwitchSpeed: 400,
		cal_animateSpeed: 400,
		cal_animateSpeed: 500
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



	// Доп. функции для демонстрации
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



	// Отмена стандартного поведения ссылок при клике
	$('.edit-button').on('click', function(event){
		event.preventDefault();
	});



	// Функция добавление нового списка select
	$('.button-select-new').on('click', function(){
		var newElem = $('<p style="margin-top:15px;"><span>Новый список</span><select><option>Выберите пункт</option><option>Пункт 1</option><option>Пункт 2</option><option>Пункт 3</option></select></p>');
		$(newElem).appendTo($('#custom-form > div').eq(0).find('.demo-block'));
		$('select').usfe();
	});

	// Функция переключения активности списков
	$('.button-select-toogle-active').on('click', function(){
		$('.select-this').toggleClass('select-disabled');
	});

	// Функция добавления новых элементов в первый список
	$('.button-select-toogle-add').on('click', function(){
		var newElem = '';
		for(var i = 1; i <= 5; i++){
			newElem += '<option>' + 'Новый пункт '+ i +'</option>';
		}
		$(this).parent('div').parent('div').find('select')
		$(newElem).appendTo($('#custom-form > div').eq(0).find('.demo-block > p:first select'));
		$('.demo-block > p:first select').trigger('refresh');
	});

	// Функция переключения активности элементов первого списка 
	$('.button-select-toogle-active-2').on('click', function(){
		$('.demo-block > p:first').find('li').toggleClass('disabled');
	});



	// Функция добавления нового элемента
	$('.button-radio-new').on('click', function(){
		var newElem = $('<label><input name="group1" type="radio">Новый элемент Radio</label>');
		$(newElem).appendTo($('#custom-form > div').eq(1).find('.demo-block > p'));
		$('input[type="radio"]').usfe();
	});

	// Функция переключения активности элементов radio
	$('.button-radio-toggle').on('click', function(){
		$('input[type="radio"]').toggleDisabled();
		$('.custom-radio').toggleClass('disable-radio');
	});



	// Функция переключения активности элементов checkbox
	$('.button-checkbox-toggle').on('click', function(){
		$('input[type="checkbox"]').toggleDisabled();
		$('.custom-checkbox').toggleClass('disabled-checkbox');
	});

	//  Функция переключения выбранных элементов
	$('.button-checkbox-toggle-2').on('click', function(){
		$('input[type="checkbox"]').toggleChecked();
		$('.custom-checkbox').toggleClass('active-checkbox');
	});

	// Фукция добавления нового элемента вверх
	$('.button-checkbox-new').on('click', function(){
		var newElem = $('<label><input name="group1" type="checkbox">Новый элемент Checkbox</label>');
		$(newElem).appendTo($('#custom-form > div').eq(2).find('.demo-block > p:first'));
		$('.first-block-d-check').find('input[type=checkbox]').usfe();
	});

	// Фукция добавления нового элемента вниз
	$('.button-checkbox-new-2').on('click', function(){
		var newElem = $('<label><input name="group1" type="checkbox">Новый элемент Checkbox</label>');
		$(newElem).appendTo($('#custom-form > div').eq(2).find('.demo-block > p:last'));
		$('.last-block-d-check').find('input[type=checkbox]').usfe({
			c_styleCheckbox: 'style-2',
		});
	});




	// Фукция добавления нового элемента
	$('.button-file-new').on('click', function(){
		var newElem = $('<p><span>Новый элемент file:</span><input type="file"></p>');
		$(newElem).appendTo($('#custom-form > div').eq(3).find('.demo-block'));
		$('input[type=file]:not("#example-file-2")').usfe();
	});

	// Функция переключения активности элементов type="file"
	$('.button-file-toggle').on('click', function(){
		$('.file-wrap').toggleClass('file-disabled');
		$('input[type="file"]').toggleDisabled();
	});




	// Функция добавления нового элемента
	$('.button-cal-new').on('click', function(){
		var newElem = $('<p style="margin-top:5px;"><span>Новый календарь:</span><input type="usfe-calendar"></p>');
		$(newElem).appendTo($('#custom-form > div').eq(4).find('.demo-block'));
		$('input[type=usfe-calendar]:not("#example-calendar-two")').usfe();
	});

	// Функция переключения активности элемента calendar
	$('.button-cal-toggle').on('click', function(){
		$('.calendar-wrap').toggleClass('calendar-disabled');
		$('input[type="usfe-calendar"]').toggleDisabled();
	});



	// Функция добавления новых элементов в список результатов
	$('.button-search-new').on('click', function(){
		var newElem = $('<li>Москва [new elem]</li><li>Можайск [new elem]</li><li>Муром [new elem]</li><li>Мытищи [new elem]</li><li>Мурманск [new elem]</li><li>Санкт-Петербург [new elem]</li><li>Симферополь [new elem]</li><li>Смоленск [new elem]</li><li>Самара [new elem]</li><li>Саранск [new elem]</li><li>Сочи [new elem]</li><li>Суздаль [new elem]</li>');
		$(newElem).appendTo($('#custom-form').find('#city'));
		$('input[type=usfe-search]').trigger('refresh');
	});

	// Корректное отображения элементов без label
	$('.txt-prev-label').each(function(){
		$(this).appendTo($(this).prev('div'))
	});


	// Переключение цветов
	$('#select-theme').find('a').on('click', function(event){
		event.preventDefault();
		if($(this).hasClass('get-theme-default')){
			console.log('1')
			$('#custom-form').removeClass('orange-theme green-theme pink-theme');
		}
		else if($(this).hasClass('get-theme-orange')){
			$('#custom-form').removeClass('green-theme pink-theme');
			$('#custom-form').addClass('orange-theme');
		}
		else if($(this).hasClass('get-theme-green')){
			$('#custom-form').removeClass('orange-theme pink-theme');
			$('#custom-form').addClass('green-theme');
		}
		else if($(this).hasClass('get-theme-pink')){
			$('#custom-form').removeClass('orange-theme green-theme');
			$('#custom-form').addClass('pink-theme');
		}
	});

	// Блок с выбором темы
	$('#select-theme').animate({
		'top' : '0',
	}, 500);


	$(document).scroll(function(){
  		var sc = $(this).scrollTop();
		$('#select-theme').stop(true).animate({
			top : sc
		}, 400)
	});



});	