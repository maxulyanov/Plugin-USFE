(function($){

	$.fn.usfe = function(options){
		var defaults = {

			//settings type = file
			f_defaultFileName : 'Файл не выбран',
			f_defaultFileNameDel : 'Файл не выбран',
			f_defaultButtonName : 'Выбрать',
			f_editButtonName : 'Изменить',
			f_charDelete : '&#215;',
		};

		options = $.extend(defaults, options);

		var methods = {

			// (3.1)
			file : function(elem){

				// (3.1.1)
				var fileWrap = $('<div class="file-wrap">'),
					fileButton = $('<button type="button" class="file-button">'+ defaults.f_defaultButtonName + '</button>'),
					fileName  = $('<div class="file-name">'+ defaults.f_defaultFileName + '</div>'),
					fileDelete = $('<span class="delFile">'+ defaults.f_charDelete  +'</a>');

				$(fileWrap).append(elem, fileButton, fileName )
				$('body').append(fileWrap);

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

		            // (3.1.10)
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

		            // (3.1.11)
		            setTimeout(function(){
		                funcDelete.call($(self));
		            }, 600);

		        });

		        // (3.1.11)
        		function funcDelete(){

		            var thisFile = elem;
		            $(thisFile).replaceWith(thisFile.val('').clone(true));

		            $(this).parent().find(fileName).removeClass('select-file').text(defaults.f_defaultFileNameDel);
		            $(this).parent().find(fileName).animate({
		                opacity: '1',
		            },400);

		            $(this).css({display: 'none'});

        		};

			},
			//end method file

			text : function(){
				console.log('ТЕКСТ')
			}
		};
		//end all methods


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


