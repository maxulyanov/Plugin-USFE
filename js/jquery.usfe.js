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

				// (3.1.1)
				var numWrap = $('<div class="number-wrap">'),
					numPlus = $('<button type="button" value="-" class="number-plus">'+ defaults.n_iconPlus +'</button>'),
					numMinus = $('<button type="button" value="-" class="number-minus">'+ defaults.n_iconMinus +'</button>');

				$(elem).wrap(numWrap);
				$(elem).before(numMinus).after(numPlus);

				// (3.1.2)
				$('.number-plus').on('click', function(){

					var thisInput = $(this).parent().find('input[data-element="number"]');
					var thisVal = $(thisInput).val();
					thisVal++;

					// (3.1.3)
					if(defaults.n_editBg){
						$(thisInput).stop(true, true).animate({
							backgroundColor: '#9bcb1e',
						},400).stop(true,true).animate({
							backgroundColor: '#FFF',
						},400);
					}

					computation(this, thisVal);
				});

				// (3.1.4)
				$('.number-minus').on('click', function(){

					var thisInput = $(this).parent().find('input[data-element="number"]');
					var thisVal = $(thisInput).val();
					thisVal--; 

					// (3.1.5)
					if(!thisVal) thisVal = 1;

					// (3.1.6)
					if(defaults.n_editBg){
						$(thisInput).stop(true, true).animate({
							backgroundColor: '#ea6856',
						},400).stop(true,true).animate({
							backgroundColor: '#FFF',
						},400);
					}

					computation(this, thisVal);
				});

				// (3.1.4)
				$('input[data-element="number"]').on('keypress input change', function(event){

					if(event.charCode < 48 || event.charCode > 57) return false;
					var thisVal = $(this).parent().find('input[data-element="number"]').val(); 

					computation(this, thisVal);
				})
			 
				// (3.1.5)
				function computation(elem, val){

					if(isNaN(val)){
						val = 1;
					}

					$(elem).parent().find('input[data-element="number"]').val(val);
					$(elem).parent().find('input[data-element="number"]').attr('value', val);
				}
	
			},
			//end method typeNumber

			typeText : function(){
				console.log('text')
			}
		};
		//end all methods


		return this.each(function(){

			if(this.nodeName.toLowerCase() == 'form'){
				$(this).children().each(function(){
					definition(this);
				});
			}
			else{
				definition(this);
			}

			function definition(el){
				
				var type = $(el).attr('type');
				var dataEl = $(el).attr('data-element');

				if(type == 'file'){
					methods.typeFile(el);
				}
				else if(type == 'text'){
					(dataEl == 'number') ? methods.typeNumber(el) : methods.typeText(el);
				}
			}

		});
	};

})(jQuery)


