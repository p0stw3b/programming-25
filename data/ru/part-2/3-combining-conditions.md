---
path: '/ru/part-2/3-combining-conditions'
title: 'Объединение условий'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела

- Вы будете знать, как использовать операторы `and`, `or` и `not` в условиях
- Вы сможете писать вложенные условия

</text-box>

## Логические операторы

Вы можете объединять условия с логическими операторами `and` и `or`. Оператор `and` указывает, что все заданные условия должны быть истинными одновременно. Оператор `or` указывает, что хотя бы одно из заданных условий должно быть истинным.

Например, условие `number >= 5 and number <= 8` определяет, что `number` должно одновременно быть не менее 5 и не более 8. То есть, оно должно быть между 5 и 8.

```python
number = int(input("Please type in a number: "))
if number >= 5 and number <= 8:
    print("The number is between 5 and 8")
```

Между тем, условие `number < 5 or number > 8` определяет, что `number` должно быть либо меньше 5, либо больше 8. То есть, оно не должно быть в диапазоне от 5 до 8.

```python
number = int(input("Please type in a number: "))
if number < 5 or number > 8:
    print("The number is not within the range of 5 to 8")
```

Следующая таблица истинности содержит поведение этих операторов в различных ситуациях:

a     | b     | a and b | a or b |
:----:|:-----:|:-------:|:------:|
False | False | False   | False  |
True  | False | False   | True   |
False | True  | False   | True   |
True  | True  | True    | True   |

Иногда необходимо знать, является ли что-то _не_ истинным. Оператор `not` отрицает условие:

a     | not a
:----:|:----:
True  | False
False | True

Приведенный выше пример с _исключенным_ диапазоном от 5 до 8 также можно запрограммировать так:

```python
number = int(input("Please type in a number: "))
if not (number >= 5 and number <= 8):
    print("The number is not within the range of 5 to 8")
```

Особенно в программировании логические операторы часто называются _булевыми операторами_.

<text-box variant='hint' name="Упрощенные объединенные условия">

Условие `x >= a and x <= b` - очень распространенный способ проверить, попадает ли число `x` в диапазон от `a` до `b`. Выражение с такой структурой работает одинаково в большинстве языков программирования.

Python также позволяет упрощенную нотацию для объединения условий: `a <= x <= b` достигает того же результата, что и более длинная версия с использованием `and`. Эта более короткая нотация может быть более знакомой из математики, но она не очень широко используется в программировании на Python, возможно, потому что очень немногие другие языки программирования имеют подобное сокращение.

</text-box>

## Объединение и связывание условий

Следующая программа просит пользователя ввести четыре числа. Затем она определяет, какое из четырех является наибольшим, с помощью некоторых условий:

```python
n1 = int(input("Number 1: "))
n2 = int(input("Number 2: "))
n3 = int(input("Number 3: "))
n4 = int(input("Number 4: "))

if n1 > n2 and n1 > n3 and n1 > n4:
    greatest = n1
elif n2 > n3 and n2 > n4:
    greatest = n2
elif n3 > n4:
    greatest = n3
else:
    greatest = n4

print(f" {greatest} is the greatest of the numbers.")
```

<sample-output>

Number 1: **2**
Number 2: **4**
Number 3: **1**
Number 4: **1**
4 is the greatest of the numbers.

</sample-output>

В приведенном выше примере первое условие `n1 > n2 and n1 > n3 and n1 > n4` истинно только если все три условия внутри истинны.

<in-browser-programming-exercise name="Проверка возраста" tmcname="part02-08_age_check" title="Проверка возраста">

Пожалуйста, напишите программу, которая спрашивает возраст пользователя. Если возраст неправдоподобен, то есть он меньше 5 или что-то, что не может быть действительным человеческим возрастом, программа должна вывести комментарий.

Посмотрите на примеры ожидаемого поведения ниже, чтобы выяснить, какой комментарий применим в каждом случае.

<sample-output>

What is your age? **13**
Ok, you're 13 years old

</sample-output>

<sample-output>

What is your age? **2**
I suspect you can't write quite yet...

</sample-output>

<sample-output>

What is your age? **-4**
That must be a mistake

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Племянники" tmcname="part02-09_nephews" title="Племянники">

Пожалуйста, напишите программу, которая спрашивает имя пользователя. Если имя Хьюи, Дьюи или Луи, программа должна распознать пользователя как одного из племянников Дональда Дака.

Аналогично, если имя Морти или Ферди, программа должна распознать пользователя как одного из племянников Микки Мауса.

Несколько примеров:

<sample-output>

Please type in your name: **Morty**
I think you might be one of Mickey Mouse's nephews.

</sample-output>

<sample-output>

Please type in your name: **Huey**
I think you might be one of Donald Duck's nephews.

</sample-output>

<sample-output>

Please type in your name: **Ken**
You're not a nephew of any character I know of.

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Оценки и баллы" tmcname="part02-10_grades_and_points" title="Оценки и баллы">

Таблица ниже описывает границы оценок на определенном университетском курсе. Пожалуйста, напишите программу, которая спрашивает количество полученных баллов, а затем выводит полученную оценку согласно таблице.

баллы   | оценка
:--:|:----:
< 0 |  невозможно!
0-49 | неудовлетворительно
50-59 | 1
60-69 | 2
70-79 | 3
80-89| 4
90-100 | 5
\> 100 |  невозможно!

Несколько примеров:

<sample-output>

How many points [0-100]: **37**
Grade: fail

</sample-output>

<sample-output>

How many points [0-100]: **76**
Grade: 3

</sample-output>

<sample-output>

How many points [0-100]: **-3**
Grade: impossible!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="FizzBuzz" tmcname="part02-11_fizzbuzz" title="FizzBuzz">

Пожалуйста, напишите программу, которая спрашивает у пользователя целое число. Если число делится на три, программа должна вывести Fizz. Если число делится на пять, программа должна вывести Buzz. Если число делится и на три, и на пять, программа должна вывести FizzBuzz.

Несколько примеров ожидаемого поведения:

<sample-output>

Number: **9**
Fizz

</sample-output>

<sample-output>

Number: **7**

</sample-output>

<sample-output>

Number: **20**
Buzz

</sample-output>

<sample-output>

Number: **45**
FizzBuzz

</sample-output>

</in-browser-programming-exercise>

## Вложенные условия

Условные операторы также могут быть вложены в другие условные операторы. Например, следующая программа проверяет, является ли число больше нуля, а затем является ли оно четным или нечетным:

```python
number = int(input("Please type in a number: "))

if number > 0:
    if number % 2 == 0:
        print("The number is even")
    else:
        print("The number is odd")
else:
    print("The number is negative or zero")
```

Несколько примеров поведения этой программы:

<sample-output>

Please type in a number: **3**
The number is odd

Please type in a number: **18**
The number is even

Please type in a number: **-4**
The number is negative or zero

</sample-output>

С вложенными условными операторами крайне важно правильно делать отступы. Отступы определяют, какие ветви связаны вместе. Например, ветвь `if` и ветвь `else` с одинаковым количеством пробелов определяются как ветви одного и того же условного оператора.

Тот же результат часто может быть достигнут с использованием либо вложенных условных операторов, либо условий, объединенных с логическими операторами. Пример ниже функционально не отличается от приведенного выше примера в том смысле, что он выведет точно то же самое при тех же входных данных:

```python
number = int(input("Please type in a number: "))

if number > 0 and number % 2 == 0:
    print("The number is even")
elif number > 0 and number % 2 != 0:
    print("The number is odd")
else:
    print("The number is negative or zero")
```

Ни один подход не является внутренне лучше другого, но в разных ситуациях один или другой может показаться более логичным. В этом конкретном примере большинство людей склонны находить первую версию с вложением более интуитивной.

<in-browser-programming-exercise name="Високосный год" tmcname="part02-12_leap_year" title="Високосный год">

Обычно любой год, который делится на четыре, является високосным. Однако, если год дополнительно делится на 100, он является високосным только если он также делится на 400.

Пожалуйста, напишите программу, которая спрашивает у пользователя год, а затем выводит, является ли этот год високосным или нет.

Несколько примеров:

<sample-output>

Please type in a year: **2011**
That year is not a leap year.

</sample-output>

<sample-output>

Please type in a year: **2020**
That year is a leap year.

</sample-output>

<sample-output>

Please type in a year: **1800**
That year is not a leap year.

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Алфавитно в середине" tmcname="part02-13_alphabetically_in_the_middle" title="Алфавитно в середине">

Пожалуйста, напишите программу, которая спрашивает у пользователя три буквы. Программа должна затем вывести ту из трех букв, которая была бы в середине, если буквы были бы в алфавитном порядке.

Вы можете предположить, что буквы будут либо все заглавные, либо все строчные.

Несколько примеров ожидаемого поведения:

<sample-output>

1st letter: x
2nd letter: c
3rd letter: p
The letter in the middle is p

</sample-output>

<sample-output>

1st letter: C
2nd letter: B
3rd letter: A
The letter in the middle is B

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Калькулятор налога на подарки" tmcname="part02-14_gift_tax_calculator"  height="500px" title="Калькулятор налога на подарки">

Некоторые говорят, что уплата налогов делает финнов счастливыми, поэтому давайте посмотрим, лежит ли секрет счастья в одном из налогов, установленных в финском налоговом кодексе.

[Согласно Финскому налоговому управлению](https://www.vero.fi/en/individuals/property/gifts/), подарок - это передача имущества другому лицу без компенсации или платежа. Если общая стоимость подарков, которые вы получаете от одного и того же дарителя в течение 3 лет, составляет 5 000 евро или более, вы должны заплатить налог на подарки.

Когда подарок получен от близкого родственника или члена семьи, сумма налога к уплате определяется следующей таблицей, которая также доступна на [этом веб-сайте](https://www.vero.fi/en/individuals/property/gifts/gift-tax-calculator/):

Стоимость подарка | Налог на нижней границе | Налоговая ставка для превышающей части (%)
:------------:|:----------------------:|:-----------------------------------:
5 000 — 25 000 |        100     |       8
25 000 — 55 000	|       1 700   |	10
55 000 — 200 000 |      4 700	|       12
200 000 — 1 000 000 |   22 100  |	15
1 000 000 —	|       142 100 |	17

Итак, за подарок в 6 000 евро получатель платит налог в размере 180 евро (100 + (6 000 - 5 000) * 0.08). Аналогично, за подарок в 75 000 евро получатель платит налог в размере 7 100 евро (4 700 + (75 000 - 55 000) * 0.12).

Пожалуйста, напишите программу, которая вычисляет правильную сумму налога для подарка от близкого родственника. Посмотрите на примеры ниже, чтобы увидеть, что ожидается. Обратите внимание на отсутствие разделителей тысяч во входных значениях - вы можете предположить, что во входных данных не будет пробелов или других разделителей тысяч в числах, поскольку мы еще не рассматривали работу с ними.

<sample-output>

Value of gift: **3500**
No tax!

</sample-output>

<sample-output>

Value of gift: **5000**
Amount of tax: 100.0 euros

</sample-output>

<sample-output>

Value of gift: **27500**
Amount of tax: 1950.0 euros

</sample-output>

</in-browser-programming-exercise>

<!--

A quiz to review the contents of this section:

<quiz id="6bfd7e0d-2998-5697-80dc-418703fabbbf"></quiz>

-->