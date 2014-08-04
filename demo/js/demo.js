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

	$('.test2').on('click', function(event){
		event.preventDefault();
		$('span').removeClass('disabled');
		$('input').removeAttr('disabled')
		//$('span').addClass('disabled');
	});

	$('.test3').on('click', function(event){
		event.preventDefault();
		$('input').attr('disabled', 'true')
		$('span').addClass('disabled');
	});

	$('.txt-prev-label').each(function(){
		$(this).appendTo($(this).prev('div'))
	});

});	