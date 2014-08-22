## User Style Elements Form
Плагин для легкой стилизации сложных элементов форм

###Элементы для стилизации
`Плагин работает со следующими элементами:`
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
Для начала использования необходимо подключить jquery и ниже вызывать плагин:<br>
`$(elem).usfe({})` - вызов плагина без параметров, буду задействованы параметры по умолчанию.<br>
elem -  может быть форма `'form.order-form'`, тогда плагин обработает все дочерние элемент
доступные для стилизации.<br>
elem - непосредственно элемент который будет обработан `'input[type="radio"]'`

Для плавного изменения цветов у некоторых элементов, необходимо так же 
подключить jquery.color.

###Параметры
`Для каждого элемента или группы элементов у параметров есть свой уникальный преффикс.`
####select
<table>
    <tr>
      <td><b>s_height</b></td>
      <td>Устанавливает высоту выпадающего списка, если контент превышает данное значение - появится полоса прокрутки</td>
    </tr>
</table>
####input type="radio"
<table>
    <tr>
      <td colspan="2">У элемента нет параметров</td>
    </tr>
</table>
####input type="checkbox"
<table>
    <tr>
      <td><b>c_styleCheckbox</b></td>
      <td>Параметр изменяющий внешний вид элемента input</td>
    </tr>
</table>
####input type="usfe-calendar"
<table>
    <tr>
      <td><b>cal_animateSpeed</b></td>
      <td>Устанавливает скорость появления/скрытия блока с календарем</td>
    </tr>
    <tr>
      <td><b>cal_animateSwitch</b></td>
      <td>Анимированное переключение месяцев календаря, передать true</td>
    </tr>
    <tr>
      <td><b>cal_animateSwitchSpeed</b></td>
      <td>Скорость анимированного переключения месяцев календаря</td>
    </tr>
</table>
####input type="usfe-search"
<table>
    <tr>
      <td><b>se_height</b></td>
      <td>Устанавливает максимальную высоту списка результатов, при переполнении появится полоса прокрутки</td>
    </tr>
    <tr>
      <td><b>se_animateEffect</b></td>
      <td>Будет ли использована анимация для элемента</td>
    </tr>
    <tr>
      <td><b>se_animateSpeed</b></td>
      <td>Скорость анимации изменения цвета и фона поля</td>
    </tr>
    <tr>
      <td><b>se_animateToogleSpeed</b></td>
      <td>Скорость скрытия/появления списка результатов</td>
    </tr>
    <tr>
      <td><b>se_color</b></td>
      <td>Цвет текста для поля при получении фокуса</td>
    </tr>
    <tr>
      <td><b>se_backgroundcolor</b></td>
      <td>Цвет фона для поля при получении фокуса</td>
    </tr>
</table>	
####input type="file
<table>
    <tr>
      <td><b>f_defaultFileName</b></td>
      <td>Начальное значение текста в поле для имени файла</td>
    </tr>
    <tr>
      <td><b>f_defaultFileNameDel</b></td>
      <td>Значение текста после удаления выбранного файла</td>
    </tr>
        <tr>
      <td><b>f_defaultButtonName</b></td>
      <td>Начальный текст кнопки для выбора файла</td>
    </tr>
    <tr>
      <td><b>f_editButtonName</b></td>
      <td>Начальное значение текста в поле для имени файла</td>
    </tr>
    <tr>
      <td><b>f_defaultFileName</b></td>
      <td>Начальное значение текста в поле для имени файла</td>
    </tr>
    <tr>
      <td><b>f_charDelete</b></td>
      <td>Текст или другой html символ для кнопки удаления выбранного файла</td>
    </tr>
    <tr>
      <td><b>f_bgDelete</b></td>
      <td>Фон обертки при нажатии на кнопку удаления выбранного файла</td>
    </tr>
</table>
####input type="usfe-number"
<table>
    <tr>
      <td><b>n_maxVal</b></td>
      <td>Максимальное значение для поля</td>
    </tr>
    <tr>
      <td><b>n_iconPlus</b></td>
      <td>Текст кнопки для увеличения значения в поле</td>
    </tr>
    <tr>
      <td><b>n_iconMinus</b></td>
      <td>Текст кнопки для уменьшения значения в поле</td>
    </tr>
    <tr>
      <td><b>n_editBg</b></td>
      <td>Будет ли меняться цвет при смене значения</td>
    </tr>
</table>
####textarea
<table>
    <tr>
      <td><b>te_animateEffect</b></td>
      <td>Основной параметр, определяющий использовать ли эффекты анимации для поля</td>
    </tr>
    <tr>
      <td><b>te_animateSpeed</b></td>
      <td>Скорость анимации поля textarea</td>
    </tr>
    <tr>
      <td><b>te_color</b></td>
      <td>Цвет текста поля при получении фокуса</td>
    </tr>
    <tr>
      <td><b>te_backgroundcolor</b></td>
      <td>Фоновый цвет поля при получении фокуса</td>
    </tr>
</table>
####input type="text, password, email"
<table>
    <tr>
      <td><b>t_animateEffect</b></td>
      <td>Основной параметр, определяющий использовать ли эффекты анимации для поля</td>
    </tr>
    <tr>
      <td><b>t_animateSpeed</b></td>
      <td>Скорость анимации поля</td>
    </tr>
    <tr>
      <td><b>t_editW</b></td>
      <td>На сколько px измениться ширина поля при получении фокуса</td>
    </tr>
    <tr>
      <td><b>t_editH</b></td>
      <td>На сколько px изменить высота поля при получении фокуса</td>
    </tr>
    <tr>
      <td><b>t_color</b></td>
      <td>Цвет текста поля при получении фокуса</td>
    </tr>
    <tr>
      <td><b>t_backgroundcolor</b></td>
      <td>Фоновый цвет поля при получении фокуса</td>
    </tr>
</table>

###Поддержка атрибутов
 - Disabled - `select, option, input[type="text"], input[type="email"], input[type="password"], input[type="checkbox"], input[type="radio"], input[type="file"], input[type="usfe-calendar"]`;
 - Checked -  `input[type="checkbox"], input[type="radio"]`;

###Динамическое изменение
Примеры динамических изменений показаны с помощью кнопок в демо-примере.
В случае добавления новых элементов в список `select` и изменения исходного списка для результатов в элементах `input[type=usfe-search]`, необходимо вызвать метод -  `$(elem).trigger('refresh')`;<br>
Во всех остальных случаях вызвать плагин для нужного элемента - `$(elem).usfe()`;
###Кроссбраузерность
Все современные дескопные браузеры<br>
IE9+<br>
IOS<br>
Android - в разработке.<br>
###Демонстрация
Пример работы можно увидеть <a target="_blank" href="http://example.web-ulyanov.ru/frontend/usfe/demo/index.html">здесь</a>
###Связаться с автором
Предложения по улучшению и исправлению ошибок - <a href="mailto:web.ulyanov@gmail.com">web.ulyanov@gmail.com</a>


