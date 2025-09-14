---
path: "/ru/part-1/5-conditional-statements"
title: "Условные операторы"
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После изучения этого раздела

- Вы сможете использовать простые условные операторы в программировании
- Вы узнаете, что такое булево значение
- Вы сможете выражать условия с помощью операторов сравнения

</text-box>

До сих пор каждая программа, которую мы написали, выполнялась построчно по порядку. Вместо выполнения каждой строки кода каждый раз, когда программа запускается, часто полезно создавать разделы программы, которые выполняются только в определенных ситуациях.

Например, следующий код проверяет, является ли пользователь совершеннолетним:

```python
age = int(input("How old are you? "))

if age > 17:
    print("You are of age!")
    print("Here's a copy of GTA6 for you.")

print("Next customer, please!")
```

Когда пользователю больше 17 лет, выполнение программы должно выглядеть так:

<sample-output>

How old are you? **18**
You are of age!
Here's a copy of GTA6 for you.
Next customer, please!

</sample-output>

Если пользователю 17 лет или меньше, выводится только это:

<sample-output>

How old are you? **16**
Next customer, please!

</sample-output>

Эти примеры показывают нам, что значение, данное как ввод, влияет на то, какие части программы выполняются. Программа содержит _условный оператор_ с блоком кода, который выполняется только если условие в операторе истинно.

<img src="../../part-1/1_5_1.png">

В условном операторе ключевое слово `if` сопровождается _условием_, таким как сравнение двух значений. Блок кода, следующий за этой заголовочной строкой, выполняется только если условие истинно.

Обратите внимание на символ двоеточия, следующий за заголовком `if`. В следующем коде двоеточия нет:

```python
age = 10

# no colon at the end of the following line
if age > 17
    print("You are of age.")
```

При выполнении это вызывает ошибку:

<sample-output>
<pre>
File "program.py", line 3
  if age > 17
            ^
SyntaxError: invalid syntax
</pre>
</sample-output>

## Операторы сравнения

Очень часто условия состоят из сравнения двух значений. Вот таблица с наиболее распространенными операторами сравнения, используемыми в Python:

| Оператор | Назначение        | Пример  |
|:--------:|----------------|----------|
| `==`     | Равно       | `a == b` |
| `!=`     | Не равно   | `a != b` |
| `>`      | Больше   | `a > b`  |
| `>=`     | Больше или равно | `a >= b` |
| `<`      | Меньше      | `a < b`  |
| `<=`     | Меньше или равно    | `a <= b` |

Давайте посмотрим на программу, которая выводит разные вещи в зависимости от того, является ли число, которое вводит пользователь, отрицательным, положительным или равным нулю:

```python
number = int(input("Please type in a number: "))

if number < 0:
    print("The number is negative.")

if number > 0:
    print("The number is positive.")

if number == 0:
    print("The number is zero.")
```

Примеры того, как программа работает с тремя различными вводами:

<sample-output>

Please type in a number: **15**
The number is positive.

</sample-output>

<sample-output>

Please type in a number: **-18**
The number is negative.

</sample-output>

<sample-output>

Please type in a number: **0**
The number is zero.

</sample-output>

## Отступы

Python распознает, что блок кода является частью условного оператора, если каждая строка кода в блоке имеет одинаковый _отступ_. То есть, в начале каждой строки кода в блоке кода должно быть одинаковое количество пробелов.

Например:

````python
password = input("Please type in a password: ")

if password == "kittycat":
    print("You knew the password!")
    print("You must be either the intended user...")
    print("...or quite an accomplished hacker.")

print("The program has finished its execution. Thanks and bye!")
````

Вы можете использовать клавишу Tab, сокращение от клавиши _табулятора_, чтобы вставить определенное количество пробелов.

<img src="../../part-1/1_5_keyboard.png">

Многие текстовые редакторы автоматически делают отступ на следующей строке, когда нажимается клавиша Enter после символа двоеточия. Когда вы хотите закончить блок кода с отступом, вы можете использовать клавишу `Backspace`, чтобы вернуться к началу строки.

<img src="../../part-1/1_5_keyboard2.png">
<small><center>
Источник изображений клавиатуры:
 <a href="https://pixabay.com/users/Clker-Free-Vector-Images-3736/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=311803">Clker-Free-Vector-Images</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=311803">Pixabay</a>
</center></small>

<in-browser-programming-exercise name="Orwell" tmcname="part01-21_orwell" title="Оруэлл">

Пожалуйста, напишите программу, которая запрашивает у пользователя целое число. Программа должна вывести "Orwell", если число точно 1984, и иначе ничего не делать.

<sample-output>

Please type in a number: **2020**

</sample-output>

<sample-output>

Please type in a number: **1984**
Orwell

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Absolute value" tmcname="part01-22_absolute_value" title="Абсолютное значение">

Пожалуйста, напишите программу, которая запрашивает у пользователя целое число. Если число меньше нуля, программа должна вывести число, умноженное на -1. Иначе программа выводит число как есть. Пожалуйста, посмотрите на примеры ожидаемого поведения ниже.

<sample-output>

Please type in a number: **-7**
The absolute value of this number is 7

</sample-output>

<sample-output>

Please type in a number: **1**
The absolute value of this number is 1

</sample-output>

<sample-output>

Please type in a number: **-99**
The absolute value of this number is 99

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Soup or no soup" tmcname="part01-23_soup_or_no_soup" title="Суп или не суп">

Пожалуйста, напишите программу, которая запрашивает имя пользователя. Если имя что угодно, кроме "Jerry", программа затем запрашивает количество порций и выводит общую стоимость. Цена одной порции составляет 5.90.

Два примера выполнения программы:

<sample-output>

Please tell me your name: **Kramer**
How many portions of soup? **2**
The total cost is 11.8
Next please!

</sample-output>

<sample-output>

Please tell me your name: **Jerry**
Next please!

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Order of magnitude" tmcname="part01-24_order_of_magnitude" title="Порядок величины">

Пожалуйста, напишите программу, которая запрашивает у пользователя целое число. Программа должна затем вывести величину числа согласно следующим примерам.

<sample-output>

Please type in a number: **950**
This number is smaller than 1000
Thank you!

</sample-output>

<sample-output>

Please type in a number: **59**
This number is smaller than 1000
This number is smaller than 100
Thank you!

</sample-output>

<sample-output>

Please type in a number: **2**
This number is smaller than 1000
This number is smaller than 100
This number is smaller than 10
Thank you!

</sample-output>

<sample-output>

Please type in a number: **1123**
Thank you!

</sample-output>


</in-browser-programming-exercise>


## Булевы значения и булевы выражения

Любое условие, используемое в условном операторе, приведет к истинностному значению, то есть либо истина, либо ложь. Например, условие `a < 5` истинно, если `a` меньше 5, и ложно, если `a` равно или больше 5.

Эти типы значений часто называются _булевыми_ значениями, названными в честь английского математика Джорджа Буля. В Python они обрабатываются типом данных `bool`. Переменные типа `bool` могут иметь только два значения: `True` или `False`.

Любой фрагмент кода, который приводит к булеву значению, называется _булевым выражением_. Например, условие в условном операторе всегда является булевым выражением, и слова _условие_ и _булево выражение_ часто могут использоваться взаимозаменяемо.

Результат булева выражения может быть сохранен в переменной так же, как результат любого числового вычисления:

```python
a = 3
condition = a < 5
print(condition)
if condition:
    print("a is less than 5")
```

<sample-output>

True
a is less than 5

</sample-output>

Ключевые слова Python `True` и `False` также могут использоваться напрямую. В следующем примере команда `print` выполняется каждый раз, потому что значение условия `True`:

```python
condition = True
if condition:
    print("This is printed every time.")
```

<sample-output>

This is printed every time.

</sample-output>

Программа как эта не очень полезна, но позже в курсе вы увидите примеры, где булевы переменные очень пригодятся.

<in-browser-programming-exercise name="Calculator" tmcname="part01-25_calculator" title="Калькулятор">

Пожалуйста, напишите программу, которая запрашивает у пользователя два числа и операцию. Если операция _add_ (сложить), _multiply_ (умножить) или _subtract_ (вычесть), программа должна вычислить и вывести результат операции с заданными числами. Если пользователь вводит что-то еще, программа должна ничего не выводить.

Несколько примеров ожидаемого поведения:

<sample-output>

Number 1: **10**
Number 2: **17**
Operation: **add**

10 + 17 = 27

</sample-output>

<sample-output>

Number 1: **4**
Number 2: **6**
Operation: **multiply**

4 * 6 = 24

</sample-output>

<sample-output>

Number 1: **4**
Number 2: **6**
Operation: **subtract**

4 - 6 = -2

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Temperatures" tmcname="part01-26_temperatures" title="Температуры">

Пожалуйста, напишите программу, которая запрашивает у пользователя температуру в градусах Фаренгейта, а затем выводит то же в градусах Цельсия. Если преобразованная температура опускается ниже нуля градусов Цельсия, программа также должна вывести "Brr! It's cold in here!" (Бррр! Здесь холодно!).

Формулу для преобразования градусов Фаренгейта в градусы Цельсия можно легко найти в любой поисковой системе по вашему выбору.

Два примера ожидаемого поведения:

<sample-output>

Please type in a temperature (F): **101**
101 degrees Fahrenheit equals 38.333333333333336 degrees Celsius

Please type in a temperature (F): **21**
21 degrees Fahrenheit equals -6.111111111111111 degrees Celsius
Brr! It's cold in here!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Daily wages" tmcname="part01-27_daily_wages" title="Ежедневная зарплата">

Пожалуйста, напишите программу, которая запрашивает почасовую ставку, отработанные часы и день недели. Программа должна затем вывести ежедневную зарплату, которая равна почасовой ставке, умноженной на отработанные часы, за исключением воскресений, когда почасовая ставка удваивается.

<sample-output>

Hourly wage: **8.5**
Hours worked: **3**
Day of the week: **Monday**
Daily wages: 25.5 euros

</sample-output>

<sample-output>

Hourly wage: **12.5**
Hours worked: **10**
Day of the week: **Sunday**
Daily wages: 250.0 euros

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Loyalty bonus" tmcname="part01-28_loyalty_bonus" title="Бонус лояльности">

Эта программа вычисляет бонус в конце года, который получает клиент на свою карту лояльности. Бонус вычисляется по следующей формуле:

* Если на карте меньше ста баллов, бонус составляет 10%
* В любом другом случае бонус составляет 15%

Программа должна работать так:

<sample-output>

How many points are on your card? **55**
Your bonus is 10 %
You now have 60.5 points

</sample-output>

Но есть проблема с программой, поэтому с некоторыми вводами она работает не совсем правильно:

<sample-output>

How many points are on your card? **95**
Your bonus is 10 %
Your bonus is 15 %
You now have 120.175 points

</sample-output>

Пожалуйста, исправьте программу так, чтобы всегда был либо 10% либо 15% бонус, но никогда не оба.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="What to wear tomorrow" tmcname="part01-29_what_to_wear_tomorrow" title="Что надеть завтра">

Пожалуйста, напишите программу, которая запрашивает прогноз погоды на завтра, а затем предлагает подходящую для погоды одежду.

Предложение должно изменяться, если температура (измеряемая в градусах Цельсия) выше 20, 10 или 5 градусов, а также если ожидается дождь.

Несколько примеров ожидаемого поведения:

<sample-output>

What is the weather forecast for tomorrow?
Temperature: **21**
Will it rain (yes/no): **no**
Wear jeans and a T-shirt

</sample-output>

<sample-output>

What is the weather forecast for tomorrow?
Temperature: **11**
Will it rain (yes/no): **no**
Wear jeans and a T-shirt
I recommend a jumper as well

</sample-output>

<sample-output>

What is the weather forecast for tomorrow?
Temperature: **7**
Will it rain (yes/no): **no**
Wear jeans and a T-shirt
I recommend a jumper as well
Take a jacket with you

</sample-output>

<sample-output>

What is the weather forecast for tomorrow?
Temperature: **3**
Will it rain (yes/no): **yes**
Wear jeans and a T-shirt
I recommend a jumper as well
Take a jacket with you
Make it a warm coat, actually
I think gloves are in order
Don't forget your umbrella!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Solving a quadratic equation" tmcname="part01-30_quadratic_formula" title="Решение квадратного уравнения">

В модуле Python `math` есть функция `sqrt`, которая вычисляет квадратный корень из числа. Вы можете использовать её следующим образом:

```python
from math import sqrt

print(sqrt(9))
```

Это должно вывести

<sample-output>

3.0

</sample-output>

Мы вернемся к концепции _модуля_ и оператору `import` позже. Сейчас достаточно понимать, что строка `from math import sqrt` позволяет нам использовать функцию `sqrt` в нашей программе.

Пожалуйста, напишите программу для решения квадратного уравнения вида ax²+bx+c. Программа запрашивает значения a, b и c. Затем она должна использовать квадратную формулу для решения уравнения. Квадратная формула, выраженная с функцией Python `sqrt`, выглядит следующим образом:

x = (-b ± sqrt(b²-4ac))/(2a).

Вы можете предположить, что уравнение всегда будет иметь два действительных корня, поэтому вышеприведенная формула всегда будет работать.

Пример ожидаемого поведения:

<sample-output>

Value of a: **1**
Value of b: **2**
Value of c: **-8**

The roots are 2.0 and -4.0

</sample-output>

</in-browser-programming-exercise>

<!--

A quiz to review the contents of this section:

<quiz id="bc7e500f-a91e-5709-8ae6-34637ff01737"></quiz>

-->

Пожалуйста, ответьте на краткую анкету по материалам этой недели. Анкета стоит одного балла за упражнение.

<quiz id="9ee2113a-a265-5bd2-9609-1f9c2298fe02"></quiz>