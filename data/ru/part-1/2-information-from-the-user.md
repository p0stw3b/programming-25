---
path: '/ru/part-1/2-information-from-the-user'
title: 'Информация от пользователя'
hidden: false
---

<text-box variant='learningObjectives' name='Цели обучения'>

После изучения этого раздела

- Вы узнаете, как написать программу, которая использует ввод от пользователя
- Вы узнаете, как использовать переменные для хранения ввода и вывода его на экран
- Вы сможете объединять строки

</text-box>

_Ввод_ означает любую информацию, которую пользователь предоставляет программе. В частности, команда Python `input` считывает строку ввода, введенную пользователем. Она также может использоваться для отображения сообщения пользователю, чтобы запросить конкретный ввод.

Следующая программа считывает имя пользователя с помощью команды `input`. Затем она выводит его с помощью команды `print`:

```python
name = input("What is your name? ")
print("Hi there, " + name)
```

Выполнение этой программы может выглядеть так (ввод пользователя выделен жирным):

<sample-output>

What is your name? **Paul Python**
Hi there, Paul Python

</sample-output>

То, что эта программа выводит, частично зависит от ввода пользователя. Это означает, что выполнение программы может также выглядеть так:

<sample-output>

What is your name? **Paula Programmer**
Hi there, Paula Programmer

</sample-output>

Слово `name` в этой программе является _переменной_. В контексте программирования переменная - это место для хранения некоторого _значения_, такого как строка или число. Это значение может быть использовано позже, и оно также может быть изменено.

<text-box variant="hint" name="Именование переменных">

В принципе, переменные можно именовать довольно свободно, в рамках определенных ограничений, указанных в языке Python.

Обычная международная практика программирования - именовать переменные на английском языке, но вы можете встретить код, где переменные названы на других языках, например, на родном языке программиста. Название переменной не влияет напрямую на её содержимое, поэтому название в этом смысле не имеет значения. Однако часто может быть полезно в понимании того, как работает код, если переменные названы логично и на английском языке.

</text-box>

<in-browser-programming-exercise name="Name twice" tmcname="part01-06_name_twice" title="Имя дважды">

Пожалуйста, напишите программу, которая запрашивает имя пользователя, а затем выводит его дважды на двух последовательных строках.

Пример того, как должна работать программа:

<sample-output>

What is your name? **Paul**
Paul
Paul

</sample-output>

</in-browser-programming-exercise>

## Обращение к переменной

К одной переменной можно обращаться много раз в программе:

```python
name = input("What is your name? ")

print("Hi, " + name + "!")
print(name + " is quite a nice name.")
```

Если пользователь вводит имя `Пол Питон`, эта программа выводит следующее:

<sample-output>

What is your name? **Paul Python**
Hi, Paul Python!
Paul Python is quite a nice name.

</sample-output>

Давайте внимательнее рассмотрим, как используется команда `print` выше. В скобках команды есть как текст в кавычках, так и имена переменных, которые ссылаются на ввод пользователя. Они были объединены с помощью оператора `+`, который _соединяет_ две строки в одну строку.

Строки и переменные можно комбинировать довольно свободно:

```python
name = input("What is your name? ")

print("Hi " + name + "! Let me make sure: your name is " + name + "?")
```

Если пользователь вводит имя `Эллен Пример`, это выводит

<sample-output>

What is your name? **Ellen Example**
Hi Ellen Example! Let me make sure: your name is Ellen Example?

</sample-output>

<in-browser-programming-exercise name="Name and exclamation marks" tmcname="part01-07_name_and_exclamation_marks" title="Имя и восклицательные знаки">

Пожалуйста, напишите программу, которая запрашивает имя пользователя, а затем выводит его дважды на одной строке так, что в начале строки стоит восклицательный знак, еще один между двумя именами и третий в конце строки.

Программа должна работать следующим образом:

<sample-output>

What is your name? **Paul**
!Paul!Paul!

</sample-output>

</in-browser-programming-exercise>

## Больше одного ввода

Программа может запрашивать более одного ввода. Обратите внимание, как ниже каждая команда `input` сохраняет полученное значение в разной переменной.

```python
name = input("What is your name? ")
email = input("What is your email address? ")
nickname = input("What is your nickname? ")

print("Let's make sure we got this right")
print("Your name: " + name)
print("Your email address: " + email)
print("Your nickname: " + nickname)
```

Программа может вывести это, например:

<sample-output>

What is your name? **Frances Fictitious**
What is your email address? **frances99@example.com**
What is your nickname? **Fran**
Let's make sure we got this right
Your name: Frances Fictitious
Your email address: frances99@example.com
Your nickname: Fran

</sample-output>

Если одна и та же переменная используется для хранения более одного ввода, каждое новое значение заменит предыдущее. Например:

```python
address = input("What is your address? ")
print("So you live at address " + address)

address = input("Please type in a new address: ")
print("Your address is now " + address)
```

Пример выполнения программы:

<sample-output>

What is your address? **Python Path 101, Flat 3D**
So you live at address Python Path 101, Flat 3D
Please type in a new address: **New Road 999**
Your address is now New Road 999

</sample-output>

Это означает, что если одна и та же переменная используется для хранения двух вводов подряд, то нет способа получить доступ к значению первого ввода после его замены вторым:

```python
address = input("What is your address? ")
address = input("Please type in a new address: ")

print("Your address is now " + address)
```

Пример того, как может выглядеть вывод программы:

<sample-output>

What is your address? **Python Path 10**
Please type in a new address: **Programmer's Walk 23**
Your address is now Programmer's Walk 23

</sample-output>

<in-browser-programming-exercise name="Name and address" tmcname="part01-08_name_and_address" title="Имя и адрес">

Пожалуйста, напишите программу, которая запрашивает имя и адрес пользователя. Программа также должна вывести заданную информацию, как показано ниже:

<sample-output>

Given name: **Steve**
Family name: **Sanders**
Street address: **91 Station Road**
City and postal code: **London EC05 6AW**
Steve Sanders
91 Station Road
London EC05 6AW

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Fix the code: Utterances" tmcname="part01-09_utterances" title="Исправьте код: Высказывания">

Вот программа, которая должна запрашивать три высказывания и выводить их, как показано:

<sample-output>

The 1st part: **hickory**
The 2nd part: **dickory**
The 3rd part: **dock**
hickory-dickory-dock!

</sample-output>

Однако в коде ниже что-то не так. Пожалуйста, исправьте его.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Story" tmcname="part01-10_story" title="История">

Пожалуйста, напишите программу, которая выводит следующую историю. Пользователь вводит имя и год, которые должны быть вставлены в вывод.

<sample-output>

Please type in a name: **Mary**
Please type in a year: **1572**

Mary is a valiant knight, born in the year 1572. One morning Mary woke up to an awful racket: a dragon was approaching the village. Only Mary could save the village's residents.

</sample-output>

История должна изменяться в соответствии с вводом пользователя.


</in-browser-programming-exercise>

<!--

A quiz to review the contents of this section:

<quiz id="10cb3510-d8a6-5e9b-b372-c85c4c7eb957"></quiz>

-->