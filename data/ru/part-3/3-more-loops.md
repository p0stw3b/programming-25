---
path: '/ru/part-3/3-more-loops'
title: 'Больше о циклах'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После изучения этого раздела

- Вы поймёте, когда нужна команда `break` для выхода из циклов
- Вы сможете использовать команду `continue` для перехода к следующей итерации
- Вы поймёте, как работают вложенные циклы

</text-box>

## Команда break

Вы уже встречались с командой `break`. Её можно использовать для немедленной остановки выполнения цикла. Типичный пример её использования — ситуация, когда программа запрашивает у пользователя ввод, и выполнение заканчивается только при получении определённого ввода.

Ту же функциональность можно достичь без команды `break`, используя подходящее условие. Две программы ниже просят пользователя ввести числа и вычисляют сумму чисел до тех пор, пока пользователь не введёт -1.

```python
# 1st version using the break command

sum = 0

while True:
    number = int(input("Please type in a number, -1 to exit: "))
    if number == -1:
        break
    sum += number

print (f"The sum is {sum}")
```

```python
# 2nd version without the break command

sum = 0
number = 0

while number != -1:
    number = int(input("Please type in a number, -1 to exit: "))
    if number != -1:
        sum += number

print (f"The sum is {sum}")
```

Обе программы выводят одно и то же с одинаковыми входными данными, например:

<sample-output>

Please type in a number, -1 to exit: **2**
Please type in a number, -1 to exit: **4**
Please type in a number, -1 to exit: **5**
Please type in a number, -1 to exit: **3**
Please type in a number, -1 to exit: **-1**
The sum is 14

</sample-output>

Итак, две программы функционально практически идентичны. Однако первый метод часто проще, поскольку условие `number == -1` появляется только один раз, а переменную `number` не нужно инициализировать вне цикла.

Команда `break` и подходящее условие также могут использоваться вместе в цикле while. Например, следующий цикл повторяется до тех пор, пока сумма чисел не превысит 100, но также останавливается, если пользователь введёт число -1.

```python
sum = 0

while sum <= 100:
    number = int(input("Please type in a number, -1 to exit: "))
    if number == -1:
        break
    sum += number

print (f"The sum is {sum}")
```

Некоторые примеры выполнения программы:

<sample-output>

Please type in a number, -1 to exit: **15**
Please type in a number, -1 to exit: **8**
Please type in a number, -1 to exit: **21**
Please type in a number, -1 to exit: **-1**
The sum is 44

</sample-output>

<sample-output>

Please type in a number, -1 to exit: **15**
Please type in a number, -1 to exit: **8**
Please type in a number, -1 to exit: **21**
Please type in a number, -1 to exit: **45**
Please type in a number, -1 to exit: **17**
The sum is 106

</sample-output>

В первом примере выполнение цикла останавливается, потому что пользователь вводит число -1. Во втором примере оно останавливается, потому что сумма чисел превышает 100.

Как всегда в программировании, существует много способов достичь одной и той же функциональности. Следующая программа функционально идентична приведённой выше:

```python
sum = 0

while True:
    number = int(input("Please type in a number, -1 to exit: "))
    if number == -1:
        break
    sum += number
    if sum > 100:
        break

print (f"The sum is {sum}")
```
## Команда continue

Другой способ изменить выполнение цикла — команда `continue`. Она заставляет выполнение цикла перейти прямо к началу цикла, где находится условие цикла. Затем выполнение продолжается нормально с проверки условия:

<img src="../../part-3/3_3_1.png">

Например, следующая программа суммирует числа из ввода, но включает только числа, которые меньше 10. Если число равно 10 или больше, выполнение переходит к началу цикла, и число не добавляется к сумме.

```python
sum = 0

while True:
    number = int(input("Please type in a number, -1 to exit: "))
    if number == -1:
        break
    if number >= 10:
        continue
    sum += number

print (f"The sum is {sum}")
```

<sample-output>

Please type in a number, -1 to exit: **4**
Please type in a number, -1 to exit: **7**
Please type in a number, -1 to exit: **99**
Please type in a number, -1 to exit: **5**
Please type in a number, -1 to exit: **-1**
The sum is 16

</sample-output>

## Вложенные циклы

Как и операторы `if`, циклы также могут быть помещены внутри других циклов. Например, следующая программа использует цикл для запроса у пользователя ввода чисел. Затем она использует другой цикл внутри первого для вывода обратного отсчёта от данного числа до 1:

```python
while True:
    number = int(input("Please type in a number: "))
    if number == -1:
        break
    while number > 0:
        print(number)
        number -= 1
```

<sample-output>

Please type in a number: **4**
4
3
2
1
Please type in a number: **3**
3
2
1
Please type in a number: **6**
6
5
4
3
2
1
Please type in a number: **-1**

</Sample-output>

When there are nested loops, `break` and `continue` commands only affect the innermost loop which they are a part of. The previous example could also be written like this:

```python
while True:
    number = int(input("Please type in a number: "))
    if number == -1:
        break
    while True:
        if number <= 0:
            break
        print(number)
        number -= 1
```

Here the latter `break` command only stops the innermost loop, which is used to print the numbers. 

## More helper variables with loops

We've already used helper variables, which increase or decrease with every iteration of a loop, many times before, so the following program should look quite familiar in structure. The program prints out all even numbers above zero until it reaches a limit set by the user:

```python
limit = int(input("Please type in a number: "))
i = 0
while i < limit:
    print(i)
    i += 2
```

<sample-output>

Please type in a number: **8**
0
2
4
6

</sample-output>

Когда есть вложенные циклы, команды `break` и `continue` влияют только на самый внутренний цикл, частью которого они являются. Предыдущий пример также можно было бы написать так:

```python
while True:
    number = int(input("Please type in a number: "))
    if number == -1:
        break
    while True:
        if number <= 0:
            break
        print(number)
        number -= 1
```

Здесь вторая команда `break` останавливает только самый внутренний цикл, который используется для вывода чисел.

## Больше вспомогательных переменных с циклами

Мы уже много раз использовали вспомогательные переменные, которые увеличиваются или уменьшаются с каждой итерацией цикла, поэтому следующая программа должна показаться довольно знакомой по структуре. Программа выводит все чётные числа больше нуля до предела, установленного пользователем:

```python
limit = int(input("Please type in a number: "))
i = 0
while i < limit:
    print(i)
    i += 2
```

<sample-output>

Please type in a number: **5**
0 1 2 3 4
0 1 2 3
0 1 2
0 1
0

</sample-output>

Вспомогательная переменная `i` устанавливается в 0 перед циклом и увеличивается на два с каждой итерацией.

Использование вложенных циклов иногда требует отдельной вспомогательной переменной для внутреннего цикла. Программа ниже выводит "числовую пирамиду" на основе числа, данного пользователем:

```python
number = int(input("Please type in a number: "))
while number > 0:
    i = 0
    while i < number:
        print(f"{i} ", end="")
        i += 1
    print()
    number -= 1
```

<sample-output>

Please type in a number: 2
1 x 1 = 1
1 x 2 = 2
2 x 1 = 2
2 x 2 = 4

</sample-output>

В этой программе внешний цикл использует вспомогательную переменную `number`, которая уменьшается на 1 с каждой итерацией, пока не достигнет 0. Вспомогательная переменная `i` устанавливается в 0 непосредственно перед входом во внутренний цикл каждый раз, когда внешний цикл повторяется.

Внутренний цикл использует вспомогательную переменную `i`, которая увеличивается на 1 с каждой итерацией внутреннего цикла. Внутренний цикл повторяется до тех пор, пока `i` не станет равным `number`, и выводит каждое значение `i` на той же строке, разделённое символом пробела. Когда внутренний цикл завершается, команда `print` во внешнем цикле начинает новую строку.

Теперь помните, что с каждой итерацией внешнего цикла значение `number` уменьшается, поэтому количество повторений внутреннего цикла также уменьшается. С каждым повторением строка чисел становится короче, и таким образом мы получаем форму пирамиды.

Вложенные циклы могут быстро стать запутанными, но понимание того, как они работают, крайне важно. Вы вполне можете найти [инструмент визуализации](http://www.pythontutor.com/visualize.html#mode=edit) Python Tutor полезным для понимания того, как работает этот пример. Скопируйте приведённый выше код в окно кода инструмента и следите за формированием вывода и изменяющимися значениями вспомогательных переменных по мере выполнения.

<in-browser-programming-exercise name="Умножение" tmcname="part03-23_multiplication" title="Умножение">

Пожалуйста, напишите программу, которая спрашивает у пользователя положительное целое число. Затем программа выводит список операций умножения, пока оба операнда не достигнут числа, данного пользователем. См. примеры ниже для подробностей:

<sample-output>

Please type in a number: 3
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9

</sample-output>

<sample-output>

Please type in a sentence: **Humpty Dumpty sat on a wall**
H
D
s
o
a
w

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Первые буквы слов" tmcname="part03-24_first_letters_of_words" title="Первые буквы слов">

Пожалуйста, напишите программу, которая просит пользователя ввести предложение. Затем программа выводит первую букву каждого слова в предложении, каждую букву на отдельной строке.

Пример ожидаемого поведения:

<sample-output>

Please type in a number: **3**
The factorial of the number 3 is 6
Please type in a number: **4**
The factorial of the number 4 is 24
Please type in a number: **-1**
Thanks and bye!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Факториал" tmcname="part03-25_factorial" title="Факториал">

Пожалуйста, напишите программу, которая просит пользователя ввести целое число. Если пользователь вводит число, равное или меньшее 0, выполнение заканчивается. В противном случае программа выводит факториал числа.

Факториал числа включает умножение числа на все положительные целые числа, меньшие его. Другими словами, это произведение всех положительных целых чисел, меньших или равных числу. Например, факториал 5 равен 1 * 2 * 3 * 4 * 5 = 120.

Некоторые примеры ожидаемого поведения:

<sample-output>

Please type in a number: **1**
The factorial of the number 1 is 1
Please type in a number: **0**
Thanks and bye!

</sample-output>

<sample-output>

Please type in a number: **5**
2
1
4
3
5

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Переверни пары" tmcname="part03-26_flip_the_pairs" title="Переверни пары">

Пожалуйста, напишите программу, которая просит пользователя ввести число. Затем программа выводит все положительные целые значения от 1 до этого числа. Однако порядок чисел изменён так, что каждая пара чисел перевёрнута. То есть 2 идёт перед 1, 4 перед 3 и так далее. См. примеры ниже для подробностей.

<sample-output>

Please type in a number: **6**
2
1
4
3
6
5

</sample-output>

<sample-output>

Please type in a number: **5**
1
5
2
4
3

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Поочерёдно" tmcname="part03-27_taking_turns" title="Поочерёдно">

Пожалуйста, напишите программу, которая просит пользователя ввести число. Затем программа выводит положительные целые числа между 1 и самим числом, чередуясь между двумя концами диапазона, как в примерах ниже.

<sample-output>

Please type in a number: **6**
1
6
2
5
3
4

</sample-output>

<sample-output>

Пожалуйста, введите число: **6**
1
6
2
5
3
4

</sample-output>

</in-browser-programming-exercise>

<!---
Викторина для повторения содержимого этого раздела:

<quiz id="b1118ae8-8dd4-563a-b6a5-0c274136535c"></quiz>
-->