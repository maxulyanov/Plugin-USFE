## User Style Elements Form.
==================
Плагин для легкой стилизации сложных элементов форм

###Элементы для стилизации
Плагин работает со следующими элементами:

 - input type="text"
 - input type="password"
 - input type="email"
 - input type="file"
 - input type="submit"
 - input type="reset"
 - input type="radio"
 - input type="checkbox"
 - input type="usfe-number";
 - input type="usfe-calendar"
 - button type="submit"
 - button type="reset"
 - button type="button"
 - select
 - textarea
 

###Использование
Для начала использования необходимо подключить jquery и ниже вызывать плагин:
**$(elem).usfe({})** - вызов плагина без параметров, буду задействованы параметры по умолчанию.
elem -  может быть форма **'form.order-form'**, тогда плагин обработает все дочерние элемент
доступныедля стилизации.<br>
elem - непосредственно элемент который будет обработан **'input[type="radio"]'**

Для плавного изменения цветов у некоторых элементов, необходимо так же 
подключить jquery.color.

##Параметры
Для каждого элемента или группы элементов у параметров есть свой уникальный преффикс.

####select
<table>
    <tr>
      <td>**s_height**</td>
      <td>Устанавливает высоту выпадающего списка, если контент превышает данное значение - появится полоса прокрутки</td>
    </tr>
<table>

####input type="radio"
<table>
    <tr>
      <td colspan="2">**У элемента нет параметров**</td>
    </tr>
<table>

####input type="checkbox"
<table>
    <tr>
      <td>**c_styleCheckbox**</td>
      <td>Параметр изменяющий внешний вид элемента input</td>
    </tr>
<table>
	
####input type="file
<table>
    <tr>
      <td>**f_defaultFileName**</td>
      <td>Начальное значение текста в поле для имени файла</td>
    </tr>
    <tr>
      <td>**f_defaultFileNameDel**</td>
      <td>Значение текста после удаления выбранного файла</td>
    </tr>
        <tr>
      <td>**f_defaultButtonName**</td>
      <td>Начальный текст кнопки для выбора файла</td>
    </tr>
    <tr>
      <td>**f_editButtonName**</td>
      <td>Начальное значение текста в поле для имени файла</td>
    </tr>
    <tr>
      <td>**f_defaultFileName**</td>
      <td>Начальное значение текста в поле для имени файла</td>
    </tr>
    <tr>
      <td>**f_charDelete**</td>
      <td>Текст или другой html символ для кнопки удаления выбранного файла</td>
    </tr>
    <tr>
      <td>**f_bgDelete**</td>
      <td>Фон обертки при нажатии на кнопку удаления выбранного файла</td>
    </tr>
<table>

####input type="usfe-number"
<table>
    <tr>
      <td>**n_maxVal**</td>
      <td>Максимальное значение для поля</td>
    </tr>
    <tr>
      <td>**n_iconPlus**</td>
      <td>Текст кнопки для увеличения значения в поле</td>
    </tr>
    <tr>
      <td>**n_iconMinus**</td>
      <td>Текст кнопки для уменьшения значения в поле</td>
    </tr>
    <tr>
      <td>**n_editBg**</td>
      <td>Будет ли меняться цвет при смене значения</td>
    </tr>
<table>

####textarea
<table>
    <tr>
      <td>**te_animateEffect**</td>
      <td>Основной параметр, определяющий использовать ли эффекты анимации для поля</td>
    </tr>
    <tr>
      <td>**te_animateSpeed**</td>
      <td>Скорость анимации поля textarea</td>
    </tr>
    <tr>
      <td>**te_color**</td>
      <td>Цвет текста поля при получении фокуса</td>
    </tr>
    <tr>
      <td>**te_backgroundcolor**</td>
      <td>Фоновый цвет поля при получении фокуса</td>
    </tr>
<table>

####input type="text, password, email"
<table>
    <tr>
      <td>**t_animateEffect**</td>
      <td>Основной параметр, определяющий использовать ли эффекты анимации для поля</td>
    </tr>
    <tr>
      <td>**t_animateSpeed**</td>
      <td>Скорость анимации поля</td>
    </tr>
    <tr>
      <td>**t_editW**</td>
      <td>На сколько px измениться ширина поля при получении фокуса</td>
    </tr>
    <tr>
      <td>**t_editH**</td>
      <td>На сколько px изменить высота поля при получении фокуса</td>
    </tr>
    <tr>
      <td>**t_color**</td>
      <td>Цвет текста поля при получении фокуса</td>
    </tr>
    <tr>
      <td>**t_backgroundcolor**</td>
      <td>Фоновый цвет поля при получении фокуса</td>
    </tr>
<table>

###Поддержка атрибутов


###Динамическое изменение


###Кроссбраузерность


###Связаться с автором

