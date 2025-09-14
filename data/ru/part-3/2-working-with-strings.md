---
path: '/ru/part-3/2-working-with-strings'
title: 'Работа со строками'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После изучения этого раздела

- Вы сможете использовать операторы `+` и `*` со строками
- Вы узнаете, как определить длину строки
- Вы поймёте, что означает индексация строк
- Вы узнаете, как искать подстроки внутри строки

</text-box>

## Операции со строками

Строки можно объединять, или _конкатенировать_, с помощью оператора `+`:

```python
begin = "ex"
end = "ample"
word = begin+end
print(word)
```

<sample-output>

example

</sample-output>

Оператор `*` также можно использовать со строкой, когда другой операнд — целое число. Строка-операнд тогда повторяется количество раз, указанное целым числом. Например, это будет работать:

```python
word = "banana"
print(word*3)
```

<sample-output>

bananabananabanana

</sample-output>

Используя строковые операции вместе с циклом, мы можем написать программу, которая рисует пирамиду:

```python
n = 10 # number of layers in the pyramid
row = "*"

while n > 0:
    print(" " * n + row)
    row += "**"
    n -= 1
```

Это выводит следующее:

```x
          *
         ***
        *****
       *******
      *********
     ***********
    *************
   ***************
  *****************
 *******************
```

Команда `print` внутри цикла выводит строку, которая начинается с `n` пробелов, за которыми следует всё, что хранится в переменной `row`. Затем две звёздочки добавляются в конец переменной `row`, а значение переменной `n` уменьшается на 1.

<in-browser-programming-exercise name="Умножение строки" tmcname="part03-08_string_multiplied" title="Умножение строки">

Пожалуйста, напишите программу, которая спрашивает у пользователя строку и количество. Затем программа выводит строку столько раз, сколько указано в количестве. Весь вывод должен быть на одной строке, без дополнительных пробелов или символов.

Пример ожидаемого поведения:

<sample-output>

Please type in a string: **hiya**
Please type in an amount: **4**
hiyahiyahiyahiya

</sample-output>

</in-browser-programming-exercise>

## Длина и индекс строки

Функция `len` возвращает количество символов в строке, что всегда является целым числом. Например, `len("привет")` возвращает 6, потому что в строке `привет` шесть символов.

Следующая программа спрашивает у пользователя строку и затем выводит её "подчёркнутой". Программа печатает вторую строку с таким же количеством символов `-`, как длина входной строки:

```python
input_string = input("Please type in a string: ")
print(input_string)
print("-"*len(input_string))
```

<sample-output>

Please type in a string: **Hi there!**

<pre>
Hi there!
---------
</pre>

</sample-output>

Длина строки включает все символы в строке, включая пробелы. Например, длина строки `пока пока` равна 9.

<in-browser-programming-exercise name="Более длинная строка" tmcname="part03-09_longer_string" title="Более длинная строка">

Пожалуйста, напишите программу, которая спрашивает у пользователя две строки и затем выводит ту, которая длиннее — то есть в которой больше символов. Если строки имеют одинаковую длину, программа должна вывести "Строки имеют одинаковую длину".

Некоторые примеры ожидаемого поведения:

<sample-output>

Please type in string 1: **hey**
Please type in string 2: **hiya**
hiya is longer

</sample-output>

<sample-output>

Please type in string 1: **howdy doody**
Please type in string 2: **hola**
howdy doody is longer

</sample-output>

<sample-output>

Please type in string 1: **hey**
Please type in string 2: **bye**
The strings are equally long

</sample-output>

</in-browser-programming-exercise>

Поскольку строки по сути являются последовательностями символов, любой отдельный символ в строке также можно извлечь. Оператор `[]` находит символ с _индексом_, указанным в скобках.

Индекс относится к позиции в строке, считая с нуля. Первый символ в строке имеет индекс 0, второй символ имеет индекс 1, и так далее.

<img src="../../part-3/3_2_1.png">

Например, эта программа

```python

input_string = input("Please type in a string: ")
print(input_string[0])
print(input_string[1])
print(input_string[3])

```

выведет это:

<sample-output>

Please type in a string: **monkey**
m
o
k

</sample-output>

Поскольку первый символ в строке имеет индекс 0, последний символ имеет индекс _длина - 1_. Следующая программа выводит первый и последний символы строки:

```python
input_string = input("Please type in a string: ")
print("First character: " + input_string[0])
print("Last character: " + input_string[len(input_string) - 1])
```

<sample-output>

Please type in a string: **testing**
First character: t
Last character: g

</sample-output>

Следующая программа проходит через все символы в строке от первого до последнего:

```python
input_string = input("Please type in a string: ")
index = 0
while index < len(input_string):
    print(input_string[index])
    index += 1
```

<sample-output>

Please type in a string: **test**
t
e
s
t

</sample-output>

Вы также можете использовать отрицательную индексацию для доступа к символам, считая с конца строки. Последний символ в строке находится по индексу -1, предпоследний символ по индексу -2, и так далее. Вы можете думать о `input_string[-1]` как о сокращении для `input_string[len(input_string) - 1]`.

<img src="../../part-3/3_2_2.png">

Пример выше можно упростить с помощью отрицательной индексации:

```python
input_string = input("Please type in a string: ")
print("First character: " + input_string[0])
print("Last character: " + input_string[-1])
```

<sample-output>

Please type in a string: **testing**
First character: t
Last character: g

</sample-output>

## IndexError: string index out of range

Если вы попробовали приведённые выше примеры самостоятельно, возможно, вы уже сталкивались с сообщением об ошибке _IndexError: string index out of range_. Эта ошибка появляется, если вы пытаетесь получить доступ к индексу, которого нет в строке.

```python
input_string = input("Please type in a string: ")
print("The tenth character: " + input_string[9])
```

<sample-output>

Please type in a string: **introduction to programming**
The tenth character: i

</sample-output>

<sample-output>

Please type in a string: **python**

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: string index out of range

</sample-output>

Иногда ошибка индексации вызвана ошибкой в коде. Например, довольно часто допускают ошибку индексации при попытке получить доступ к последнему символу в строке:

```python
input_string = input("Please type in a string: ")
print("Last character: " + input_string[len(input_string)])
```

Поскольку индексация строки начинается с нуля, последний символ находится по индексу `len(input_string) - 1`, а не по `len(input_string)`.

Есть ситуации, когда программа должна готовиться к ошибкам, вызванным вводом пользователя:

```python
input_string = input("Please type in a string: ")
if len(input_string) > 0:
    print("First character: " + input_string[0])
else:
    print("The input string is empty. There is no first character.")
```

В приведённом выше примере, если программист не включил проверку длины входной строки, строка длиной ноль вызвала бы ошибку. Строка длиной ноль также называется пустой строкой, и здесь она была бы получена простым нажатием Enter при запросе ввода.

<in-browser-programming-exercise name="С конца в начало" tmcname="part03-10_end_to_beginning" title="С конца в начало">

Пожалуйста, напишите программу, которая спрашивает у пользователя строку. Затем программа выводит входную строку в обратном порядке, с конца в начало. Каждый символ должен быть на отдельной строке.

Пример ожидаемого поведения:

<sample-output>

Please type in a string: **hiya**
a
y
i
h

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Второй и предпоследний символы" tmcname="part03-11_second_and_second_to_last" title="Второй и предпоследний символы">

Пожалуйста, напишите программу, которая спрашивает у пользователя строку. Затем программа выводит сообщение на основе того, одинаковые ли второй символ и предпоследний символ или нет. См. примеры ниже.

<sample-output>

Please type in a string: **python**
The second and the second to last characters are different

</sample-output>

<sample-output>

Please type in a string: **pascal**
The second and the second to last characters are a

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Линия решёток" tmcname="part03-12_line_of_hashes" title="Линия решёток">

Пожалуйста, напишите программу, которая выводит линию символов решётки, ширина которой выбирается пользователем.

<sample-output>

Width: **3**
<pre>
###
</pre>

</sample-output>

<sample-output>

Width: **8**
<pre>
########
</pre>

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Прямоугольник из решёток" tmcname="part03-13_rectangle_of_hashes" title="Прямоугольник из решёток">

Пожалуйста, измените предыдущую программу так, чтобы она также спрашивала высоту и выводила прямоугольник из символов решётки соответственно.

<sample-output>

Width: **10**
Height: **3**
##########
##########
##########

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Подчёркивание" tmcname="part03-14_underlining" title="Подчёркивание">

Пожалуйста, напишите программу, которая спрашивает у пользователя строки, используя цикл. Программа выводит каждую строку подчёркнутой, как показано в примерах ниже. Выполнение заканчивается, когда пользователь вводит пустую строку — то есть просто нажимает Enter при запросе.

<sample-output>

Please type in a string: **Hi there!**
<pre>
Hi there!
---------
</pre>
Please type in a string: **This is a test**
<pre>
This is a test
--------------
</pre>
Please type in a string: **a**
<pre>
a
-
</pre>
Please type in a string:

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Выравнивание по правому краю" tmcname="part03-15_right_aligned" title="Выравнивание по правому краю">

Пожалуйста, напишите программу, которая спрашивает у пользователя строку и затем выводит её так, чтобы отображалось точно 20 символов. Если входная строка короче 20 символов, начало строки заполняется символами `*`.

Вы можете предполагать, что входная строка не более 20 символов длиной.

<sample-output>

Please type in a string: **python**
<pre>
**************python
</pre>

</sample-output>

<sample-output>

Please type in a string: **alongerstring**
<pre>
*******alongerstring
</pre>

</sample-output>

<sample-output>

Please type in a string: **averyverylongstring**
<pre>
*averyverylongstring
</pre>

</sample-output>


</in-browser-programming-exercise>

<in-browser-programming-exercise name="Слово в рамке" tmcname="part03-16_framed_word" title="Слово в рамке">

Пожалуйста, напишите программу, которая спрашивает у пользователя строку и затем выводит рамку из символов `*` со словом в центре. Ширина рамки должна быть 30 символов. Вы можете предполагать, что входная строка всегда поместится внутри рамки.

Если длина входной строки — нечётное число, вы можете выводить слово в любом из двух возможных центральных расположений.

<sample-output>

Word: **testing**
<pre>
******************************
*          testing           *
******************************
</pre>

</sample-output>

<sample-output>

Word: **python**
<pre>
******************************
*           python           *
******************************
</pre>

</sample-output>

</in-browser-programming-exercise>


## Подстроки и срезы

_Подстрока_ строки — это последовательность символов, которая образует часть строки. Например, строка `пример` содержит подстроки `при`, `мер` и `пле`, среди прочих. В программировании на Python процесс выбора подстрок обычно называется _нарезкой_ (slicing), а подстрока часто называется _срезом_ (slice) строки. Эти два термина часто можно использовать взаимозаменяемо.

Если вы знаете начальный и конечный индексы среза, который хотите извлечь, вы можете сделать это с помощью обозначения `[a:b]`. Это означает, что срез начинается с индекса `a` и заканчивается последним символом перед индексом `b` — то есть включая первый, но исключая последний. Вы можете думать об индексах как о разделительных линиях, нарисованных слева от индексируемого символа, как показано на изображении ниже:

<img src="../../part-3/3_2_3.png">

Давайте внимательнее посмотрим на некоторые нарезанные строки:

```python
input_string = "presumptious"

print(input_string[0:3])
print(input_string[4:10])

# if the beginning index is left out, it defaults to 0
print(input_string[:3])

# if the end index is left out, it defaults to the length of the string
print(input_string[4:])
```

<sample-output>

pre
umptio
pre
umptious

</sample-output>

<text-box variant='hint' name='Полуоткрытые интервалы'>

При обработке строк в Python интервал `[a:b]` является _полуоткрытым_, что в данном случае означает, что символ в начальном индексе `a` включён в интервал, но символ в конечном индексе `b` исключается. Почему так?

Для этой особенности нет глубокой причины. Скорее это соглашение, унаследованное от других языков программирования.

Полуоткрытые интервалы могут показаться неинтуитивными, но на практике они имеют некоторые преимущества. Например, вы можете легко вычислить длину среза с помощью `b-a`. С другой стороны, вы всегда должны помнить, что символ в конечном индексе `b` не будет включён в срез.

</text-box>

<in-browser-programming-exercise name="Подстроки, часть 1" tmcname="part03-17_substrings_part_1" title="Подстроки, часть 1">

Пожалуйста, напишите программу, которая просит пользователя ввести строку. Затем программа выводит все подстроки, которые начинаются с первого символа, от самой короткой до самой длинной. Посмотрите на пример ниже.

<sample-output>

Please type in a string: **test**
t
te
tes
test

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Подстроки, часть 2" tmcname="part03-18_substrings_part_2" title="Подстроки, часть 2">

Пожалуйста, напишите программу, которая просит пользователя ввести строку. Затем программа выводит все подстроки, которые заканчиваются последним символом, от самой короткой до самой длинной. Посмотрите на пример ниже.

<sample-output>

Please type in a string: **test**
t
st
est
test

</sample-output>

</in-browser-programming-exercise>

## Поиск подстрок

Оператор `in` может сказать нам, содержит ли строка определённую подстроку. Логическое выражение `a in b` истинно, если `b` содержит подстроку `a`.

Например, этот фрагмент кода

```python
input_string = "test"

print("t" in input_string)
print("x" in input_string)
print("es" in input_string)
print("ets" in input_string)
```

выводит следующее:

<sample-output>

True
False
True
False

</sample-output>

Программа ниже позволяет пользователю искать подстроки в строке, жёстко закодированной в программу:

```python
input_string = "perpendicular"

while True:
    substring = input("What are you looking for? ")
    if substring in input_string:
        print("Found it")
    else:
        print("Not found")
```

<sample-output>

What are you looking for? **perp**
Found it
What are you looking for? **abc**
Not found
What are you looking for? **pen**
Found it
...

</sample-output>

<in-browser-programming-exercise name="Содержит ли гласные" tmcname="part03-19_does_it_contain_vowels" title="Содержит ли гласные">

Пожалуйста, напишите программу, которая спрашивает у пользователя строку. Затем программа выводит разные сообщения, если строка содержит любые из гласных а, е или о.

Вы можете предполагать, что ввод будет полностью в нижнем регистре. Посмотрите на примеры ниже.

<sample-output>

Please type in a string: **hello there**
a not found
e found
o found

</sample-output>

<sample-output>

Please type in a string: **hiya**
a found
e not found
o not found

</sample-output>


</in-browser-programming-exercise>

Оператор `in` возвращает логическое значение, поэтому он только скажет нам, _существует ли_ подстрока в строке, но он не будет полезен для выяснения _где_ именно она находится. Вместо этого для этой цели можно использовать строковый метод Python `find`. Он принимает искомую подстроку в качестве аргумента и возвращает либо первый индекс, где она найдена, либо `-1`, если подстрока не найдена в строке.

Изображение ниже иллюстрирует, как она используется:

<img src="../../part-3/3_2_4.png">

Некоторые примеры использования `find`:

```python
input_string = "test"

print(input_string.find("t"))
print(input_string.find("x"))
print(input_string.find("es"))
print(input_string.find("ets"))
```

<sample-output>

0
-1
1
-1

</sample-output>

Приведённый выше пример поиска подстроки, реализованный с помощью `find`:

```python
input_string = "perpendicular"

while True:
    substring = input("What are you looking for? ")
    index = input_string.find(substring)
    if index >= 0:
        print(f"Found it at the index {index}")
    else:
        print("Not found")
```

<sample-output>

What are you looking for? **perp**
Found it at the index 0
What are you looking for? **abc**
Not found
What are you looking for? **pen**
Found it at the index 3
...

</sample-output>

<text-box variant='hint' name='Методы'>

Выше мы использовали строковый _метод_ `find`. Методы работают довольно похоже на _функции_, рассмотренные в предыдущей части. Что отличает их от функций, так это то, что методы всегда привязаны к _объекту_, на котором они вызываются. Объект — это сущность, названная перед методом в вызове метода. В случае `find` объект — это строка, где метод ищет подстроку, которую он имеет в качестве аргумента.

</text-box>

<in-browser-programming-exercise name="Найти первую подстроку" tmcname="part03-20_find_first_substring" title="Найти первую подстроку">

Пожалуйста, напишите программу, которая просит пользователя ввести строку и один символ. Затем программа выводит первый трёхсимвольный срез, который начинается с символа, указанного пользователем. Вы можете предполагать, что входная строка имеет длину не менее трёх символов. Программа должна вывести три символа или ничего.

Обратите особое внимание на случаи, когда в строке осталось менее двух символов после первого вхождения искомого символа. В этом случае ничего не должно быть выведено, и при выполнении программы не должно быть ошибок индексации.

<sample-output>

Please type in a word: **mammoth**
Please type in a character: **m**
mam

</sample-output>

<sample-output>

Please type in a word: **banana**
Please type in a character: **n**
nan

</sample-output>

<sample-output>

Please type in a word: **tomato**
Please type in a character: **x**

</sample-output>

<sample-output>

Please type in a word: **python**
Please type in a character: **n**

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Найти все подстроки" tmcname="part03-21_find_all_substrings" title="Найти все подстроки">

Пожалуйста, создайте расширенную версию предыдущей программы, которая выводит _все подстроки длиной не менее трёх символов_, которые начинаются с символа, указанного пользователем. Вы можете предполагать, что входная строка имеет длину не менее трёх символов.

<sample-output>

Please type in a word: **mammoth**
Please type in a character: **m**
mam
mmo
mot

</sample-output>

<sample-output>

Please type in a word: **banana**
Please type in a character: **n**
nan

</sample-output>

**Подсказка** следующий пример может дать вам вдохновение о том, как можно решить это упражнение:

```python
word = input("Word: ")
while True:
    if len(word) == 0:
        break
    print(word)
    word = word[2:]
```

<sample-output>

Word: **mammoth**
mammoth
mmoth
oth
h

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Второе вхождение" tmcname="part03-22_second_occurrence" title="Второе вхождение">

Пожалуйста, напишите программу, которая находит _второе_ вхождение подстроки. Если второго (или первого) вхождения нет, программа должна вывести соответствующее сообщение.

В этом упражнении вхождения _не могут_ пересекаться. Например, в строке `аааа` второе вхождение подстроки `аа` находится по индексу 2.

Некоторые примеры ожидаемого поведения:

<sample-output>

Please type in a string: **abcabc**
Please type in a substring: **ab**
The second occurrence of the substring is at index 3.

</sample-output>

<sample-output>

Please type in a string: **methodology**
Please type in a substring: **o**
The second occurrence of the substring is at index 6.

</sample-output>

<sample-output>

Please type in a string: **aybabtu**
Please type in a substring: **ba**
The substring does not occur twice in the string.

</sample-output>

</in-browser-programming-exercise>

<!---
Викторина для повторения содержимого этого раздела:

<quiz id="6bfa7eab-80de-52e2-afe5-285af914099f"></quiz>
-->