---
path: '/ru/part-2/4-simple-loops'
title: 'Простые циклы'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела

- Вы будете знать, что означает цикл в программировании
- Вы сможете использовать цикл `while True` в ваших программах
- Вы будете знать, как использовать команду `break` для выхода из цикла

</text-box>

Мы теперь подробно рассмотрели условные структуры. Еще одна центральная техника в программировании - повторение, или _итерация_. Вместе они образуют фундаментальные структуры управления, которые должен освоить любой программист. Они называются структурами управления, потому что в сущности они позволяют вам контролировать, какие строки кода выполняются когда. Пока условные структуры позволяют вам _выбирать между_ секциями кода, итерационные структуры позволяют вам _повторять_ секции кода. Их часто называют _циклами_, потому что они позволяют программе "возвращаться назад" к какой-то строке, которая уже была выполнена раньше. Процесс выполнения одного повторения цикла также называется итерацией цикла.

Этот раздел знакомит с простым циклом `while`. Его структура похожа на условные операторы, которые мы уже рассмотрели. В следующей части мы погрузимся в некоторые более сложные примеры.

Давайте посмотрим на программу, которая просит пользователя ввести число, а затем выводит число в квадрате. Это продолжается до тех пор, пока пользователь не введет -1.

```python
while True:
    number = int(input("Please type in a number, -1 to quit: "))

    if number == -1:
        break

    print(number ** 2)

print("Thanks and bye!")
```

Выполнение программы может выглядеть так:

<sample-output>

Please type in a number, -1 to quit: **2**
4
Please type in a number, -1 to quit: **4**
16
Please type in a number, -1 to quit: **10**
100
Please type in a number, -1 to quit: **-1**
Thanks and bye!

</sample-output>

Как вы можете видеть выше, программа запрашивает несколько чисел благодаря оператору `while` в программе. Когда пользователь вводит -1, выполняется команда `break`, которая выходит из цикла, и выполнение продолжается с первой строки после блока `while`.

С циклами крайне важно, чтобы всегда был способ выйти из цикла в какой-то точке кода, иначе повторение могло бы продолжаться вечно. Чтобы проиллюстрировать это, давайте немного изменим приведенный выше пример:

```python
number = int(input("Please type in a number, -1 to quit: "))
while True:
    if number == -1:
        break

    print(number ** 2)

print("Thanks and bye!")
```

В этой версии программа просит пользователя ввести число _вне цикла_. Если пользователь введет любое другое число, кроме -1, из цикла никогда не выйти. Это образует _бесконечный цикл_, что означает, что блок кода внутри цикла повторяется бесконечно:

<sample-output>

Please type in a number, -1 to quit: **2**
4
4
4
4
4
4
4
4
(continued ad infinitum...)

</sample-output>

Следующая программа имеет похожую структуру на пример выше бесконечного цикла, но пользовательский опыт совершенно другой. Эта программа позволяет пользователю продолжить только если он введет правильный PIN _1234_:

```python
while True:
    code = input("Please type in your PIN: ")
    if code == "1234":
        break
    print("Incorrect...try again")

print("Correct PIN entered!")
```

<sample-output>

Please type in your PIN: **0000**
Incorrect...try again
Please type in your PIN: **9999**
Incorrect...try again
Please type in your PIN: **1234**
Correct PIN entered!

</sample-output>

<in-browser-programming-exercise name="Продолжим?" tmcname="part02-15_shall_we_continue" title="Продолжим?">

Давайте создадим программу по образцу приведенного выше примера. Эта программа должна вывести сообщение "привет", а затем спросить "Продолжим?" до тех пор, пока пользователь не введет "нет". Затем программа должна вывести "ладно тогда" и завершиться. Пожалуйста, посмотрите на пример ниже.

<sample-output>

hi
Shall we continue? **yes**
hi
Shall we continue? **oui**
hi
Shall we continue? **jawohl**
hi
Shall we continue? **no**
okay then

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Проверка ввода" tmcname="part02-16_input_validation" title="Проверка ввода">

Пожалуйста, напишите программу, которая спрашивает у пользователя целые числа.

Если число меньше нуля, программа должна вывести сообщение "Неверное число".

Если число больше нуля, программа должна вывести квадратный корень из числа, используя функцию Python `sqrt`.

В любом случае программа должна затем спросить другое число.

Если пользователь вводит число ноль, программа должна прекратить запрашивать числа и выйти из цикла.

Ниже вы найдете напоминание о том, как используется функция `sqrt`. Не забудьте `import`ировать ее в начале программы.

```python
# sqrt function will not work without this line in the beginning of the program
from math import sqrt

print(sqrt(9))
```

<sample-output>

3.0

</sample-output>

Пример ожидаемого поведения вашей программы:

<sample-output>

Please type in a number: **16**
4.0
Please type in a number: **4**
2.0
Please type in a number: **-3**
Invalid number
Please type in a number: **1**
1.0
Please type in a number: **0**
Exiting...

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Исправить код: Обратный отсчет" tmcname="part02-17_countdown" title="Исправить код: Обратный отсчет">

Эта программа должна вывести обратный отсчет. Код следующий:

```python
number = 5
print("Countdown!")
while True:
  print(number)
  number = number - 1
  if number > 0:
    break

print("Now!")
```

Это должно вывести

<sample-output>

Countdown!
5
4
3
2
1
Now!

</sample-output>

Однако программа работает не совсем правильно. Пожалуйста, исправьте ее.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Повторить пароль" tmcname="part02-18_repeat_password" title="Повторить пароль">

Пожалуйста, напишите программу, которая спрашивает у пользователя пароль. Программа должна затем попросить пользователя ввести пароль снова. Если пользователь вводит что-то другое, чем первый пароль, программа должна продолжать спрашивать до тех пор, пока пользователь не введет первый пароль снова правильно.

Посмотрите на ожидаемое поведение ниже:

<sample-output>

Password: **sekred**
Repeat password: **secret**
They do not match!
Repeat password: **cantremember**
They do not match!
Repeat password: **sekred**
User account created!

</sample-output>

</in-browser-programming-exercise>

## Циклы и вспомогательные переменные

Давайте сделаем пример проверки PIN более реалистичным. Эта версия дает пользователю только три попытки ввода PIN.

Программа использует две вспомогательные переменные. Переменная `attempts` отслеживает, сколько раз пользователь ввел PIN. Переменная `success` устанавливается в `True` или `False` в зависимости от того, удается ли пользователю войти в систему.

```python
attempts = 0

while True:
    code = input("Please type in your PIN: ")
    attempts += 1

    if code == "1234":
        success = True
        break

    if attempts == 3:
        success = False
        break

    # this is printed if the code was incorrect AND there have been less than three attempts
    print("Incorrect...try again")

if success:
    print("Correct PIN entered!")
else:
    print("Too many attempts...")
```

<sample-output>

Please type in your PIN: **0000**
Incorrect...try again
Please type in your PIN: **1234**
Correct PIN entered!

</sample-output>

<sample-output>

Please type in your PIN: **0000**
Incorrect...try again
Please type in your PIN: **9999**
Incorrect...try again
Please type in your PIN: **4321**
Too many attempts...

</sample-output>

Цикл завершается _либо_ когда пользователь вводит правильный PIN _либо_ если было слишком много попыток. Оператор `if` после цикла проверяет значение переменной `success` и выводит сообщение соответственно.

## Отладочные операторы печати в циклах

Добавление циклов к программам также добавляет потенциальные источники ошибок. Становится еще более важным овладеть использованием отладочных операторов печати, как было введено в [первом разделе этой части](/ru/part-2/1-programming-terminology).

Давайте посмотрим на программу, почти идентичную предыдущему примеру, но с одним критическим различием:

```python
attempts = 0

while True:
    code = input("Please type in your PIN: ")
    attempts += 1

    if attempts == 3:
        success = False
        break

    if code == "1234":
        success = True
        break

    print("Incorrect...try again")

if success:
    print("Correct PIN entered!")
else:
    print("Too many attempts...")
```

Эта версия ведет себя странно, когда пользователь вводит правильный код на третьей попытке:

<sample-output>

Please type in your PIN: **0000**
Incorrect...try again
Please type in your PIN: **9999**
Incorrect...try again
Please type in your PIN: **1234**
Too many attempts...

</sample-output>

Итак, давайте попробуем найти причину, добавив некоторые стратегические отладочные операторы печати внутри цикла:

```python
while True:
    print("beginning of the while block:")
    code = input("Please type in your PIN: ")
    attempts += 1

    print("attempts:", attempts)
    print("condition1:", attempts == 3)
    if attempts == 3:
        success = False
        break

    print("code:", code)
    print("condition2:", code == "1234")
    if code == "1234":
        success = True
        break

    print("Incorrect...try again")
```

<sample-output>

beginning of the while block:
Please type in your PIN: **2233**
attempts: 1
condition1: False
code: 2233
condition2: False
Incorrect...try again
beginning of the while block:
Please type in your PIN: **4545**
attempts: 2
condition1: False
code: 4545
condition2: False
Incorrect...try again
beginning of the while block:
Please type in your PIN: **1234**
attempts: 3
condition1: True
Too many attempts...

</sample-output>

Из приведенных выше выводов мы можем видеть, что во время третьей итерации цикла условие первого оператора `if` является `True`, и цикл завершается. Эта итерация никогда не доходит до второго оператора `if`, который проверяет, был ли код введен правильно:

```python
  while True:
    # ....

    # this block is executed too early
    if attempts == 3:
        success = False
        break

    # the third iteration never gets this far
    if code == "1234":
        success = True
        break
```

Порядок условных операторов, или различных ветвей внутри условного оператора, является частой причиной ошибок, особенно в циклах. Отладочные операторы печати часто являются самым простым способом найти их причину.

<in-browser-programming-exercise name="PIN и количество попыток" tmcname="part02-19_pin_and_number_of_attempts" title="PIN и количество попыток">

Пожалуйста, напишите программу, которая продолжает спрашивать у пользователя PIN-код до тех пор, пока он не введет правильный, который является _4321_. Программа должна затем вывести количество раз, которое пользователь попробовал разные коды.

<sample-output>

PIN: **3245**
Wrong
PIN: **1234**
Wrong
PIN: **0000**
Wrong
PIN: **4321**
Correct! It took you 4 attempts

</sample-output>

Если пользователь угадывает с первого раза, программа должна вывести что-то немного другое:

<sample-output>

PIN: **4321**
Correct! It only took you one single attempt!

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Следующий високосный год" tmcname="part02-20_next_leap_year" title="Следующий високосный год">

Пожалуйста, напишите программу, которая спрашивает у пользователя год и выводит следующий високосный год.

<sample-output>

Year: **2023**
The next leap year after 2023 is 2024

</sample-output>

Если пользователь вводит год, который является високосным (например 2024), программа должна вывести следующий високосный год:

<sample-output>

Year: **2024**
The next leap year after 2024 is 2028

</sample-output>

</in-browser-programming-exercise>

## Объединение строк с оператором +

Приведенный выше пример с проверкой PIN использовал вспомогательную переменную `attempts` для отслеживания того, сколько раз пользователь пытался ввести код:

```python
attempts = 0

while True:
    code = input("Please type in your PIN: ")
    attempts += 1
    # ...
```

Переменная устанавливается в ноль вне цикла, и каждая итерация увеличивает ее значение на единицу.

Похожая идея увеличения работает и со строковыми переменными. Программа может, например, отслеживать все PIN-коды, которые пользователь ввел:

```python

codes = ""
attempts = 0

while True:
    code = input("Please type in your PIN: ")
    attempts += 1
    codes += code + ", "
    # ...
```

Вспомогательная переменная инициализируется _пустой строкой_, то есть строкой без символов в ней:

```python
codes = ""
```

С каждой итерацией строка становится длиннее, поскольку код, который пользователь ввел, добавляется вместе с запятой:

```python
    code = input("Please type in your PIN: ")
    codes += code + ", "
```

Если пользователь вводит коды _1111 2222 1234_, в конце выполнения программы значение `codes` будет

<sample-output>

1111, 2222, 1234,

</sample-output>


<in-browser-programming-exercise name="История" tmcname="part02-21_story" title="История">

### Часть 1

Пожалуйста, напишите программу, которая продолжает спрашивать у пользователя слова. Если пользователь вводит `конец`, программа должна вывести историю, которую сформировали слова, и закончить.

<sample-output>

Please type in a word: **Once**
Please type in a word: **upon**
Please type in a word: **a**
Please type in a word: **time**
Please type in a word: **there**
Please type in a word: **was**
Please type in a word: **a**
Please type in a word: **girl**
Please type in a word: **end**
Once upon a time there was a girl

</sample-output>

### Часть 2

Измените программу так, чтобы цикл завершался также, если пользователь вводит одно и то же слово два раза подряд.

<sample-output>

Please type in a word: **It**
Please type in a word: **was**
Please type in a word: **a**
Please type in a word: **dark**
Please type in a word: **and**
Please type in a word: **stormy**
Please type in a word: **night**
Please type in a word: **night**
It was a dark and stormy night

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Работа с числами" tmcname="part02-22_working_with_numbers" title="Работа с числами">

### Предзадача

Пожалуйста, напишите программу, которая спрашивает у пользователя целые числа. Программа должна продолжать спрашивать числа до тех пор, пока пользователь не введет ноль.

<sample-output>

Please type in integer numbers. Type in 0 to finish.
Number: **5**
Number: **22**
Number: **9**
Number: **-2**
Number: **0**

</sample-output>

### Часть 1: Подсчет

После чтения чисел программа должна вывести, сколько чисел было введено. Ноль в конце не должен включаться в подсчет.

Вам понадобится новая переменная здесь для отслеживания введенных чисел.

<sample-output>

... the program asks for numbers
Numbers typed in 4

</sample-output>

### Часть 2: Сумма

Программа должна также вывести сумму всех введенных чисел. Ноль в конце не должен включаться в вычисление.

Программа должна теперь вывести следующее:

<sample-output>

... the program asks for numbers
Numbers typed in 4
The sum of the numbers is 34

</sample-output>

### Часть 3: Среднее

Программа должна также вывести среднее значение чисел. Ноль в конце не должен включаться в вычисление. Вы можете предположить, что пользователь всегда введет хотя бы одно действительное ненулевое число.

<sample-output>

... the program asks for numbers
Numbers typed in 4
The sum of the numbers is 34
The mean of the numbers is 8.5

</sample-output>

#### Часть 4: Положительные и отрицательные

Программа должна также вывести статистику о том, сколько из чисел были положительными и сколько были отрицательными. Ноль в конце не должен включаться в вычисление.

<sample-output>

... the program asks for numbers
Numbers typed in 4
The sum of the numbers is 34
The mean of the numbers is 8.5
Positive numbers 3
Negative numbers 1

</sample-output>

</in-browser-programming-exercise>

<!--

A quiz to review the contents of this section:

<quiz id="63a51999-e525-5f1d-a333-b26392a5585b"></quiz>

-->

Пожалуйста, ответьте на короткую анкету о материалах этой недели.

<quiz id="5ab8aa39-8d52-5fb7-ac91-253bba93c84b"></quiz>