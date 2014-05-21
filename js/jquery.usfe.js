(function($){

	$.fn.usfe = function(options){
		var defaults = {
			f_defaultFileName : 'Файл не выбран',
		};

		options = $.extend(defaults, options);

		var methods = {

			file : function(elem){

				var fileWrap = $('<div class="file-wrap">'),
					fileButton = $('<button type="button" class="file-button">Выбрать</button>'),
					fileName  = $('<div class="file-name">'+ defaults.f_defaultFileName + '</div>'),
					fileDelete = $('<span class="delFile">&#215;</a>');

				$(fileWrap).append(elem, fileButton, fileName )
				$('body').append(fileWrap);

				elem = $(elem);

				$(fileButton).on('click', function(){
					// Имититация клика по inputFile
			        elem.click();

			        // Есть ли поддержка file Api
			        var fileApi = (window.File) ? true : false;

			        // По событию change
			        $(elem).on('change',function(){

			            var fileNameText;

			            // True и файл получен
			            if(fileApi && elem[0].files[0]){
			                fileNameText = elem[0].files[0].name;
			            }
			            else{
			                fileNameText = elem.val().split('\\');
			                fileNameText = fileNameText[fileNameText.length -1];             
			            }

			            // Если имя файла не получено
			            if(!fileNameText.length){
			                return;
			            }

			            // Изменяем поле с именем файла и текст на кнопки
			            fileName.addClass('select-file').text(fileNameText);
			            fileButton.text('Выбрать');
			            
			            if(document.addEventListener){
			                $(this).parent().append(fileDelete);
			            }

			        }).change();

				});

		        // Удаление выбранного файла
		        $(fileDelete).on('click', function(){

		            // Кешируем this в переменную
		            var self = this;

		            // Анимиции скрытия и изменения цвет
		            $(this).parent().stop(true, true).animate({
		                backgroundColor: '#f48475',
		            },400).stop(true,true).animate({
		                backgroundColor: '#FFF',
		            },400);

		            $(this).parent().find(fileName).animate({
		                opacity: '0',
		            });

		            $(this).parent().find(self).animate({
		                opacity: '0',
		            });

		            // Вызовем с задержкой функцию удаления
		            setTimeout(function(){
		                funcDelete.call($(self));
		            }, 600);

		        });

		                // Функция удаления файла и замены текста
        function funcDelete(){
            var thisFile = $(this).parent().find('input[type="file"]');
            $(thisFile).replaceWith($(thisFile).clone());

            $(this).parent().find(fileName).removeClass('select-file').text('Файл не выбран');
            $(this).parent().find(fileName).animate({
                opacity: '1',
            },400)

            $(this).remove();
        }

			},
			text : function(){
				console.log('ТЕКСТ')
			}
		}

		return this.each(function(){

			var type = $(this).attr('type');

			if(type == 'file'){
				methods.file(this);
			}
			else if(type == 'text'){
				methods.text();
			}

		});
	};

})(jQuery)


