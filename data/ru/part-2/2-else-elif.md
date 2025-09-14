---
path: '/ru/part-2/2-else-elif'
title: 'Больше условий'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела

- Вы будете знать, как создавать множественные ветвления в условных операторах
- Вы поймете назначение операторов `if`, `elif` и `else` в условном операторе
- Вы сможете использовать операцию взятия остатка `%` в логических выражениях

</text-box>

Давайте посмотрим на программу, которая просит пользователя ввести число, а затем выводит различные сообщения в зависимости от того, является ли число отрицательным, положительным или равным нулю:

```python
number = int(input("Please type in a number: "))

if number < 0:
    print("The number is negative")

if number >= 0:
    print("The number is positive or zero")
```

Это выглядит немного неуклюже и повторяюще. Мы всегда хотим выполнить только один из блоков `if`, потому что ввод всегда будет либо меньше нуля, либо равен нулю или больше. То есть, либо `number < 0`, либо `number >= 0` истинно, но никогда оба одновременно. Итак, первый условный оператор фактически содержит все, что нам здесь нужно. Если он истинный, число отрицательное. Если он ложный, число равно нулю или положительное.

Вместо создания совершенно другого условного оператора, как в приведенном выше примере, можно создать другую ветвь того же условного оператора, чтобы покрыть все случаи _где условие было ложным_. Это называется оператор `else`.

Предыдущий пример переписанный:

```python
number = int(input("Please type in a number: "))

if number < 0:
    print("The number is negative")
else:
    print("The number is positive or zero")
```

При использовании конструкции if-else одна и точно одна из ветвей всегда будет выполнена. Следующая картинка иллюстрирует структуру:

<img src="../../part-2/2_2_1.png">

Примечание: никогда не может быть ветви else без ветви if перед ней. Конструкция if-else в целом образует единый _условный оператор_.

Следующий пример проверяет, является ли число, данное пользователем, четным или нет. Четность можно проверить с помощью оператора взятия остатка `%`, который дает остаток от операции целочисленного деления. При делении на два, если остаток равен нулю, число четное. Иначе число нечетное.

```python
number = int(input("Please type in a number: "))

if number % 2 == 0:
    print("The number is even")
else:
    print("The number is odd")
```

<sample-output>

Please type in a number: **5**
The number is odd

</sample-output>

Еще один пример со сравнением строк:

```python
correct = "kittycat"
password = input("Please type in the password: ")

if password == correct:
    print("Welcome")
else:
    print("No admittance")
```

С двумя различными вводами это должно вывести:

<sample-output>

Please type in the password: **kittycat**
Welcome

</sample-output>

<sample-output>

Please type in the password: **monkey**
No admittance

</sample-output>


<in-browser-programming-exercise name="Возраст совершеннолетия" tmcname="part02-04_age_of_maturity" height="400px" title="Возраст совершеннолетия">

Пожалуйста, напишите программу, которая спрашивает у пользователя его возраст. Программа должна затем вывести сообщение на основе того, является ли пользователь совершеннолетним или нет, используя 18 как возраст совершеннолетия.

Несколько примеров ожидаемого поведения:

<sample-output>

How old are you? **12**
You are not of age!

</sample-output>


<sample-output>

How old are you? **32**
You are of age!

</sample-output>

</in-browser-programming-exercise>

## Альтернативные ветви с использованием оператора elif

Часто программа должна учитывать более двух вариантов. Например, результат футбольного матча может пойти тремя путями: домашние выигрывают, гости выигрывают, или ничья.

К условному оператору можно добавить ветвь `elif`. Это сокращение от слов "else if", что означает, что ветвь будет содержать альтернативу исходному условию. Важно, что оператор `elif` выполняется только если ни одна из предшествующих ветвей не выполняется.

<img src="../../part-2/2_2_2.png">

Давайте посмотрим на программу, которая определяет победителя матча:

```python
goals_home = int(input("Home goals scored: "))
goals_away = int(input("Away goals scored: "))

if goals_home > goals_away:
    print("The home team won!")
elif goals_away > goals_home:
    print("The away team won!")
else:
    print("It's a tie!")
```

Эта программа может вывести три различных утверждения при различных входных данных:

<sample-output>

Home goals scored: **4**
Away goals scored: **2**
The home team won!

</sample-output>

<sample-output>

Home goals scored: **0**
Away goals scored: **6**
The away team won!

</sample-output>

<sample-output>

Home goals scored: **3**
Away goals scored: **3**
It's a tie!

</sample-output>

В приведенном выше примере есть три альтернативные ветви, одна из которых всегда будет выполнена. Однако нет ограничения на количество ветвей `elif`, которые может содержать условный оператор, и ветвь `else` не является обязательной.

Это также действительный условный оператор:

```python
print("Holiday calendar")
date = input("What is the date today? ")

if date == "Dec 26":
    print("It's Boxing Day")
elif date == "Dec 31":
    print("It's Hogmanay")
elif date == "Jan 1":
    print("It's New Year's Day")

print("Thanks and bye.")
```

<sample-output>

Holiday calendar
What is the date today? **Dec 31**
It's Hogmanay
Thanks and bye.

</sample-output>

Обратите внимание, что в предыдущем примере нет ветви `else`. Если пользователь введет дату, которая не упоминается ни в одной из ветвей `if` или `elif`, или введет дату в другом формате, ни одна из трех ветвей условного оператора не выполняется.

<sample-output>

Holiday calendar
What is the date today? **Dec 25**
Thanks and bye.

</sample-output>

<in-browser-programming-exercise name="Больше или равно" tmcname="part02-05_greater_or_equal"  height="400px" title="Больше или равно">

Пожалуйста, напишите программу, которая спрашивает два целых числа. Программа должна затем вывести то, которое больше. Если числа равны, программа должна вывести другое сообщение.

Несколько примеров ожидаемого поведения:

<sample-output>

Please type in the first number: **5**
Please type in another number: **3**
The greater number was: 5

</sample-output>

<sample-output>

Please type in the first number: **5**
Please type in another number: **8**
The greater number was: 8

</sample-output>

<sample-output>

Please type in the first number: **5**
Please type in another number: **5**
The numbers are equal!

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Старший" tmcname="part02-06_elder" height="550px" title="Старший">

Пожалуйста, напишите программу, которая спрашивает имена и возрасты двух человек. Программа должна затем вывести имя старшего.

Несколько примеров ожидаемого поведения:

<sample-output>

Person 1:
Name: **Alan**
Age: **26**
Person 2:
Name: **Ada**
Age: **27**
The elder is Ada

</sample-output>

<sample-output>

Person 1:
Name: **Bill**
Age: **1**
Person 2:
Name: **Jean**
Age: **1**
Bill and Jean are the same age

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Последний по алфавиту" tmcname="part02-07_alphabetically_last"  height="500px" title="Последний по алфавиту">

Операторы сравнения Python также могут использоваться на строках. Строка `a` меньше строки `b`, если она идет в алфавитном порядке перед `b`. Обратите внимание, однако, что сравнение надежно только если
- сравниваемые символы одного регистра, т.е. все ЗАГЛАВНЫЕ или все строчные
- используется только стандартный английский алфавит от a до z, или от A до Z.

Пожалуйста, напишите программу, которая спрашивает у пользователя два слова. Программа должна затем вывести то из двух, которое идет последним по алфавиту.

Вы можете предположить, что все слова будут полностью набраны в нижнем регистре.

Несколько примеров ожидаемого поведения:

<sample-output>

Please type in the 1st word: **car**
Please type in the 2nd word: **scooter**
scooter comes alphabetically last.

</sample-output>

<sample-output>

Please type in the 1st word: **zorro**
Please type in the 2nd word: **batman**
zorro comes alphabetically last.

</sample-output>

<sample-output>

Please type in the 1st word: **python**
Please type in the 2nd word: **python**
You gave the same word twice.

</sample-output>

</in-browser-programming-exercise>

<!--

A quiz to review the contents of this section:

<quiz id="82f644fe-5d89-5153-842a-11d5d11bc059"></quiz>

-->