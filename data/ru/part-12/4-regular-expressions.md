---
path: '/ru/part-12/4-regular-expressions'
title: 'Регулярные выражения'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После изучения этого раздела

- Вы поймёте, что такое регулярные выражения
- Вы сможете использовать регулярные выражения в своих собственных программах

</text-box>

Мы уже установили, что Python является превосходной средой для обработки текста. Один дополнительный мощный инструмент для обработки текста — это _регулярные выражения_, часто сокращаемые как _regex_ или _regexp_. Они представляют способ выбора и поиска строк, которые следуют определённому образцу. Этот раздел знакомит вас с основами регулярных выражений, но вы найдёте гораздо больше информации онлайн, включая Python [руководство](https://docs.python.org/3/howto/regex.html).

## Что такое регулярные выражения?

Регулярные выражения — это не только функция Python. Они представляют, в некотором смысле, язык программирования внутри языка программирования. Они, в определённой степени, совместимы между многими различными языками программирования. Регулярные выражения имеют свой собственный специфический синтаксис. Идея заключается в определении коллекции строк, которые следуют определённым правилам.

Давайте начнём с простого примера, прежде чем глубже погрузиться в синтаксис:

```python
import re

words = ["Python", "Pantone", "Pontoon", "Pollute", "Pantheon"]

for word in words:
    # the string should begin with "P" and end with "on"
    if re.search("^P.*on$", word):
        print(word, "found!")
```

<sample-output>

Python found!
Pontoon found!
Pantheon found!

</sample-output>

Нам нужно импортировать модуль `re`, чтобы использовать регулярные выражения в Python. Модуль `re` содержит много функций для работы с регулярными выражениями. В примере выше функция `search` принимает два строковых аргумента: строку образца и целевую строку, где ищется образец.

Этот второй пример ищет любые числа в строке. Функция `findall` возвращает список всех экземпляров, которые соответствуют образцу:

```python
import re

sentence = "First, 2 !#third 44 five 678xyz962"

numbers = re.findall("\d+", sentence)

for number in numbers:
    print(number)
```

<sample-output>

2
44
678
962

</sample-output>

## Синтаксис регулярных выражений

Давайте познакомимся с основным синтаксисом регулярных выражений. Большинство следующих примеров используют эту тестовую программу:

```python
import re

expression = input("Please type in an expression: ")

while True:
    input_string = input("Please type in a string: ")
    if input_string == "":
        break
    if re.search(expression, input_string):
        print("Found!")
    else:
        print("Not found.")
```

### Альтернативные подстроки

Вертикальная черта `|`, также называемая символом pipe, позволяет сопоставлять альтернативные подстроки. Её значение таким образом _или_. Например, выражение `911|112` соответствует строкам, которые включают либо подстроку `911`, либо подстроку `112`.

Пример с тестовой программой:

<sample-output>

Please type in an expression: **aa|ee|ii**
Please type in a string: **aardvark**
Found!
Please type in a string: **feelings**
Found!
Please type in a string: **radii**
Found!
Please type in a string: **smooch**
Not found.
Please type in a string: **continuum**
Not found.

</sample-output>


### Группы символов

Квадратные скобки используются для обозначения групп допустимых символов. Например, выражение `[aeio]` соответствовало бы всем строкам, которые содержат любой из символов a, e, i или o.

Тире также разрешено для соответствия диапазонам символов. Например, выражение `[0-68a-d]` соответствовало бы всем строкам, которые содержат цифру между 0 и 6, или восьмёрку, или символ между a и d. В этой нотации все диапазоны _включительные_.

Объединение двух наборов скобок позволяет соответствовать двум последовательным символам. Например, выражение `[1-3][0-9]` соответствовало бы любому двузначному числу между 10 и 39, включительно.

Пример с тестовой программой:

<sample-output>

Please type in an expression: **[C-FRSO]**
Please type in a string: **C**
Found!
Please type in a string: **E**
Found!
Please type in a string: **G**
Not found.
Please type in a string: **R**
Found!
Please type in a string: **O**
Found!
Please type in a string: **T**
Not found.

</sample-output>

### Повторяющиеся соответствия

Любая часть выражения может быть повторена с следующими операторами:

* `*` повторяет любое количество раз, включая ноль
* `+` повторяет любое количество раз, но не менее одного раза
* `{m}` повторяет ровно `m` раз

Эти операторы работают с частью выражения, непосредственно предшествующей оператору. Например, выражение `ba+b` соответствовало бы подстрокам `bab`, `baab` и `baaaaaaaaaaab`, среди прочих. Выражение `A[BCDE]*Z` соответствовало бы подстрокам `AZ`, `ADZ` или `ABCDEBCDEBCDEZ`, среди прочих.

Пример с тестовой программой:

<sample-output>

Please type in an expression: **1[234]\*5**
Please type in a string: **15**
Found!
Please type in a string: **125**
Found!
Please type in a string: **145**
Found!
Please type in a string: **12342345**
Found!
Please type in a string: **126**
Not found.
Please type in a string: **165**
Not found.

</sample-output>


### Другие специальные символы

Точка — это символ-джокер, который может соответствовать любому одиночному символу. Например, выражение `c...o` соответствовало бы любой пятисимвольной подстроке, начинающейся с `c` и заканчивающейся на `o`, такой как `c-3po` или `cello`.

Символ `^` указывает, что соответствие должно быть в начале строки, а `$` указывает, что соответствие должно быть в конце строки. Они также могут использоваться для исключения из соответствий любых других символов, кроме указанных:

<sample-output>

Please type in an expression: **\^[123]\*$**
Please type in a string: **4**
Not found.
Please type in a string: **1221**
Found!
Please type in a string: **333333333**
Found!

</sample-output>

Иногда вам нужно найти соответствие для специальных символов, зарезервированных для синтаксиса регулярных выражений. Обратная косая черта `\` может использоваться для _экранирования_ специальных символов. Так, выражение `1+` соответствует одному или более числам `1`, но выражение `1\+` соответствует строке `1+`.

<sample-output>

Please type in an expression: **^\\\***
Please type in a string: **moi\***
Not found.
Please type in a string: **m\*o\*i**
Not found.
Please type in a string: **\*moi**
Found!

</sample-output>

Круглые скобки могут использоваться для группировки различных частей выражения. Например, выражение `(ab)+c` соответствовало бы подстрокам `abc`, `ababc` и `ababababababc`, но не строкам `ac` или `bc`, поскольку вся подстрока `ab` должна была бы появиться не менее одного раза.

<sample-output>

Please type in an expression: **^(jabba).\*(hut)$**
Please type in a string: **jabba the hut**
Found!
Please type in a string: **jabba a hut**
Found!
Please type in a string: **jarjar the hut**
Not found.
Please type in a string: **jabba the smut**
Not found.

</sample-output>

<programming-exercise name='Regular expressions' tmcname='part12-14_regular_expressions'>

Вот несколько упражнений для знакомства с синтаксисом регулярных выражений.

## Дни недели

Используя регулярное выражение, напишите функцию `is_dotw(my_string: str)`. Функция должна возвращать `True`, если строка, переданная в качестве аргумента, содержит сокращение для дня недели (Mon, Tue, Wed, Thu, Fri, Sat, Sun).

Несколько примеров работы функции:

```python
print(is_dotw("Mon"))
print(is_dotw("Fri"))
print(is_dotw("Tui"))
```

<sample-output>

True
True
False

</sample-output>

## Проверка на гласные

Напишите функцию `all_vowels(my_string: str)`, которая использует регулярное выражение для проверки, являются ли все символы в данной строке гласными.

Несколько примеров работы функции:

```python
print(all_vowels("eioueioieoieou"))
print(all_vowels("autoooo"))
```

<sample-output>

True
False

</sample-output>

## Время дня

Напишите функцию `time_of_day(my_string: str)`, которая использует регулярное выражение для проверки, является ли строка в формате `XX:YY:ZZ` допустимым временем в 24-часовом формате, с двумя цифрами для часов, минут и секунд соответственно.

Несколько примеров работы функции:

```python
print(time_of_day("12:43:01"))
print(time_of_day("AB:01:CD"))
print(time_of_day("17:59:59"))
print(time_of_day("33:66:77"))
```

<sample-output>

True
False
True
False

</sample-output>

</programming-exercise>

## Грандиозный финал

Для завершения этой части материала давайте поработаем ещё больше с объектами и классами, создав немного более обширную программу. Это упражнение не обязательно включает регулярные выражения, но разделы о [функциях как аргументах](/ru/part-12/1-functions-as-arguments) и [включениях списков](/ru/part-11/1-list-comprehensions) вероятно будут полезны.

Вы также можете найти полезным пример из [части 10](/ru/part-10/4-application-development).

<programming-exercise name='Hockey statistics' tmcname='part12-15_hockey_statistics'>

В этом упражнении вы создадите приложение для изучения статистики хоккейной лиги из НХЛ несколькими различными способами.

Шаблон упражнения содержит два файла JSON: `partial.json` и `all.json`. Первый из них в основном предназначен для тестирования. Последний содержит много данных, поскольку в файле включена вся статистика игроков НХЛ за сезон 2019-20.

Запись для одного игрока имеет следующий формат:

```json
{
    "name": "Patrik Laine",
    "nationality": "FIN",
    "assists": 35,
    "goals": 28,
    "penalties": 22,
    "team": "WPG",
    "games": 68
}
```

Оба файла содержат список записей в вышеуказанном формате.

Если вам нужно освежить информацию о работе с файлами JSON, пожалуйста, посмотрите [часть 7 этого учебного материала](/ru/part-7/4-data-processing#чтение-json-файлов).

## Поиск и список

Напишите интерактивное приложение, которое сначала запрашивает имя файла, а затем предлагает следующие функции:

- поиск по имени для статистики одного игрока
- список всех сокращений для названий команд в алфавитном порядке
- список всех сокращений для стран в алфавитном порядке

Эти функции дают вам одно очко упражнения. Ваше приложение должно теперь работать следующим образом:

<sample-output>

file name: **partial.json**
read the data of 14 players

commands:
0 quit
1 search for player
2 teams
3 countries
4 players in team
5 players from country
6 most points
7 most goals

command: **1**
name: **Travis Zajac**
<pre>
Travis Zajac         NJD   9 + 16 =  25
</pre>

command: **2**
BUF
CGY
DAL
NJD
NYI
OTT
PIT
WPG
WSH

command: **3**
CAN
CHE
CZE
SWE
USA

command: **0**

</sample-output>

НБ: формат вывода для игрока должен быть точно таким:

<sample-output>

<pre>
Leon Draisaitl       EDM  43 + 67 = 110
Connor McDavid       EDM  34 + 63 =  97
Travis Zajac         NJD   9 + 16 =  25
Mike Green           EDM   3 +  8 =  11
Markus Granlund      EDM   3 +  1 =   4
123456789012345678901234567890123456789
</pre>

</sample-output>

Последняя строка в примере выше помогает вам рассчитать ширину различных полей в выводе; вы не должны печатать строку чисел самостоятельно в вашей финальной работе.

Сокращение команды печатается начиная с 22-го символа. Знак `+` является 30-м символом, а знак `=` является 35-м символом. Все поля должны быть выровнены по правому краю. Все пробелы — это символы пробела.

F-строки — вероятно, самый простой способ достичь необходимого вывода. Процесс аналогичен [этому упражнению](/ru/part-6/1-reading-files#programming-exercise-course-grading-part-3) из части 6.

## Список игроков по очкам

Эти две функциональности дадут вам второе очко упражнения:

- список игроков в определённой команде в порядке набранных очков, от наибольшего к наименьшему. Очки равны _голы_ + _передачи_
- список игроков из определённой страны в порядке набранных очков, от наибольшего к наименьшему

Ваше приложение должно теперь работать следующим образом:

<sample-output>

file name: **partial.json**
read the data of 14 players

commands:
0 quit
1 search for player
2 teams
3 countries
4 players in team
5 players from country
6 most points
7 most goals

command: **4**
team: **OTT**
<pre>
Drake Batherson      OTT   3 +  7 =  10
Jonathan Davidsson   OTT   0 +  1 =   1
</pre>

command: **5**
country: **CAN**
<pre>
Jared McCann         PIT  14 + 21 =  35
Travis Zajac         NJD   9 + 16 =  25
Taylor Fedun         DAL   2 +  7 =   9
Mark Jankowski       CGY   5 +  2 =   7
Logan Shaw           WPG   3 +  2 =   5
</pre>

command: **0**

</sample-output>

## Самые успешные игроки

Эти две функциональности дадут вам третье очко упражнения:

- список из `n` игроков, которые набрали больше всего очков
  - если два игрока имеют одинаковый счёт, тот, кто забил больше голов, идёт первым
- список из `n` игроков, которые забили больше всего голов
  - если два игрока имеют одинаковое количество голов, тот, кто сыграл меньше игр, идёт первым

Ваше приложение должно теперь работать следующим образом:

<sample-output>

file name: **partial.json**
read the data of 14 players

commands:
0 quit
1 search for player
2 teams
3 countries
4 players in team
5 players from country
6 most points
7 most goals

command: **6**
how many: **2**
<pre>
Jakub Vrana          WSH  25 + 27 =  52
Jared McCann         PIT  14 + 21 =  35
</pre>

command: **6**
how many: **5**

<pre>
Jakub Vrana          WSH  25 + 27 =  52
Jared McCann         PIT  14 + 21 =  35
John Klingberg       DAL   6 + 26 =  32
Travis Zajac         NJD   9 + 16 =  25
Conor Sheary         BUF  10 + 13 =  23
</pre>

command: **7**
how many: **6**

<pre>
Jakub Vrana          WSH  25 + 27 =  52
Jared McCann         PIT  14 + 21 =  35
Conor Sheary         BUF  10 + 13 =  23
Travis Zajac         NJD   9 + 16 =  25
John Klingberg       DAL   6 + 26 =  32
Mark Jankowski       CGY   5 +  2 =   7
</pre>

command: **0**

</sample-output>

</programming-exercise>

Пожалуйста, ответьте на краткую анкету по этой части курса.

<quiz id="1e16612c-1004-5cf5-9525-6669104f50ec"></quiz>