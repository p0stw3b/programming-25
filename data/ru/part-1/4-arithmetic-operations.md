---
path: "/ru/part-1/4-arithmetic-operations"
title: "Арифметические операции"
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После изучения этого раздела

- Вы сможете использовать переменные в различных арифметических операциях
- Вы узнаете, как работать с числами в пользовательском вводе
- Вы узнаете, как приводить значения к другим основным типам данных

</text-box>

В предыдущих разделах вы видели примеры с базовой арифметикой. В следующей таблице вы можете увидеть наиболее распространенные арифметические операторы в Python с примерами:

| Оператор      | Назначение       | Пример      | Результат |
|:-------------:|---------------|--------------|-------|
| `+`           | Сложение      | `2 + 4`      |`6`    |
| `-`           | Вычитание   | `10 - 2.5`   |`7.5`  |
| `*`           | Умножение | `-2 * 123`  |`-246` |
| `/`           | Деление (результат с плавающей точкой) | `9 / 2`     | `4.5` |
| `//`          | Деление (целочисленный результат)              | `9 // 2`    | `4`   |
| `%`           | Остаток от деления        | `9 % 2`      |`1`    |
| `**`          | Возведение в степень | `2 ** 3`    |`8`    |

Порядок операций знаком из математики: сначала вычисляются степени, затем умножение и деление, и наконец сложение и вычитание. Порядок можно изменить с помощью скобок.

Например, этот фрагмент кода

```python
print(2 + 3 * 3)
print((2 + 3) * 3)
```

выводит

<sample-output>

11
15

</sample-output>

## Операнды, операторы и типы данных

Вычисление обычно состоит из *операндов* и *операторов*:

<img src="../../part-1/1_4_1.png">

Тип данных операнда обычно определяет тип данных результата: если два целых числа складываются вместе, результат также будет целым числом. Если число с плавающей точкой вычитается из другого числа с плавающей точкой, результат является числом с плавающей точкой. Фактически, если хотя бы один из операндов в выражении является числом с плавающей точкой, результат также будет числом с плавающей точкой, независимо от других операндов.

Деление `/` является исключением из этого правила. Его результат является числом с плавающей точкой, даже если операнды являются целыми числами. Например, `1 / 5` приведет к числу с плавающей точкой `0.2`.

Пример:

```python
height = 172.5
weight = 68.55

# the Body Mass Index, or BMI, is calculated by dividing body mass with the square of height
# height is converted into metres in the formula
bmi = weight / (height / 100) ** 2

print(f"The BMI is {bmi}")
```

Эта программа выводит следующее:

<sample-output>

The BMI is 23.037177063642087

</sample-output>

Обратите внимание, что Python также имеет оператор целочисленного деления `//`. Если операнды являются целыми числами, он будет производить целое число. Результат округляется вниз до ближайшего целого числа. Например, эта программа

```python
x = 3
y = 2

print(f"/ operator {x/y}")
print(f"// operator {x//y}")
```

выводит

<sample-output>

/ operator 1.5
// operator 1

</sample-output>

## Числа как ввод

Мы уже использовали команду `input` для чтения строк от пользователя. Та же функция может использоваться для чтения чисел, но строка, произведенная функцией, должна быть затем преобразована в числовой тип данных в коде программы. В предыдущем разделе мы приводили целые числа к строкам с помощью функции `str`. Тот же основной принцип применим здесь, но название функции приведения будет другим.

Строка может быть преобразована в целое число с помощью функции `int`. Следующая программа спрашивает пользователя о году его рождения и сохраняет его в переменной `input_str`. Программа затем создает другую переменную `year`, которая содержит год, преобразованный в целое число. После этого вычисление `2021-year` становится возможным, используя значение, предоставленное пользователем.

```python
input_str = input("Which year were you born? ")
year = int(input_str)
print(f"Your age at the end of the year 2021: {2021 - year}" )
```
<sample-output>

Which year were you born? **1995**
Your age at the end of the year 2021: 26

</sample-output>

Обычно вам не нужно создавать две отдельные переменные (как `input_str` и `year` выше) для чтения числового значения от пользователя. Вместо этого чтение ввода с помощью функции `input` и преобразование его с помощью функции `int` может быть достигнуто за один раз:

```python
year = int(input("Which year were you born? "))
print(f"Your age at the end of the year 2021: {2021 - year}" )
```

Аналогично, строка может быть преобразована в число с плавающей точкой с помощью функции `float`. Эта программа спрашивает пользователя о его росте и весе и использует их для вычисления ИМТ:

```python
height = float(input("What is your height? "))
weight = float(input("What is your weight? "))

height = height / 100
bmi = weight / height ** 2

print(f"The BMI is {bmi}")
```

Пример вывода программы:

<sample-output>

What is your height? **163**
What is your weight? **74.45**
The BMI is 28.02137829801649

</sample-output>

<in-browser-programming-exercise name="Times five" tmcname="part01-13_times_five" title="Умножить на пять">

Пожалуйста, напишите программу, которая запрашивает у пользователя число. Программа затем выводит это число, умноженное на пять.

Программа должна работать следующим образом:

<sample-output>

Please type in a number: **3**
3 times 5 is 15

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Name and age" tmcname="part01-14_name_and_age" title="Имя и возраст">

Пожалуйста, напишите программу, которая запрашивает у пользователя его имя и год рождения. Программа затем выводит сообщение следующим образом:

<sample-output>

What is your name? **Frances Fictitious**
Which year were you born? **1990**
Hi Frances Fictitious, you will be 31 years old at the end of the year 2021

</sample-output>

</in-browser-programming-exercise>

## Использование переменных

Давайте посмотрим на программу, которая вычисляет сумму трех чисел, заданных пользователем:

```python
number1 = int(input("First number: "))
number2 = int(input("Second number: "))
number3 = int(input("Third number: "))

sum = number1 + number2 + number3
print(f"The sum of the numbers: {sum}")
```

Пример выполнения программы:

<sample-output>

First number: **5**
Second number: **21**
Third number: **7**
The sum of the numbers: 33

</sample-output>

Программа использует четыре разные переменные, но двух легко хватило бы в этом случае:

```python
sum = 0

number = int(input("First number: "))
sum = sum + number

number = int(input("Second number: "))
sum = sum + number

number = int(input("Third number: "))
sum = sum + number

print(f"The sum of the numbers: {sum}")
```

Теперь все вводы от пользователя читаются в одну и ту же переменную `number`. Значение переменной `sum` _увеличивается_ на значение переменной `number` каждый раз, когда пользователь вводит новое число.

Давайте внимательнее рассмотрим эту команду:

```python
sum = sum + number
```

Здесь значение переменной `sum` и значение переменной `number` складываются вместе, и результат сохраняется обратно в переменную `sum`. Например, если до команды значение `sum` равно 3, а значение `number` равно 2, после выполнения команды значение `sum` равно 5.

Увеличение значения переменной - очень распространенная операция. Поэтому есть часто используемая сокращенная нотация, которая достигает того же результата, что и явное суммирование выше:

```python
sum += number
```

Это позволяет нам написать программу выше немного более кратко:

```python
sum = 0

number = int(input("First number: "))
sum += number

number = int(input("Second number: "))
sum += number

number = int(input("Third number: "))
sum += number

print(f"The sum of the numbers: {sum}")
```

Фактически, нам не обязательно нужна переменная `number` вообще. Вводы от пользователя также могут быть обработаны так:

```python
sum = 0

sum += int(input("First number: "))
sum += int(input("Second number: "))
sum += int(input("Third number: "))

print(f"The sum of the numbers: {sum}")
```

Конечно, это будет зависеть от контекста, сколько переменных нужно. Если требуется запомнить каждое значение, которое вводит пользователь, не будет возможности "переиспользовать" ту же переменную для чтения разных значений от пользователя. Рассмотрим следующее:

```python
number1 = int(input("First number: "))
number2 = int(input("Second number: "))

print(f"{number1} + {number2} = {number1+number2}")
```

<sample-output>

First number: **2**
Second number: **3**
2 + 3 = 5

</sample-output>

С другой стороны, вышеприведенная программа не имеет именованной переменной для хранения суммы двух значений.

"Переиспользование" переменной имеет смысл только тогда, когда есть необходимость временно хранить вещи похожего типа и назначения, например, при суммировании чисел.

В следующем примере переменная `data` используется для сначала хранения имени пользователя, а затем его возраста. Это совсем не разумно.

```python
data = input("What is your name? ")
print("Hi " + data + "!")

data = int(input("What is your age? "))
# program continues...
```

Лучшая идея - использовать отдельные переменные с _описательными_ именами:

```python
name = input("What is your name? ")
print("Hi " + name + "!")

age = int(input("What is your age? "))
# program continues...
```

<in-browser-programming-exercise name="Seconds in a day" tmcname="part01-15_seconds_in_a_day" title="Секунды в дне">

Пожалуйста, напишите программу, которая запрашивает у пользователя количество дней. Программа затем выводит количество секунд в заданном количестве дней.

Программа должна работать следующим образом:

<sample-output>

How many days? **1**
Seconds in that many days: 86400

</sample-output>

Другой пример:

<sample-output>

How many days? **7**
Seconds in that many days: 604800

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Fix the code: Product" tmcname="part01-16_product" title="Исправьте код: Произведение">

Эта программа запрашивает у пользователя три числа. Программа затем выводит их произведение, то есть числа, умноженные друг на друга. Однако в программе что-то не так - она работает не совсем правильно, как вы можете увидеть, если запустите её. Пожалуйста, исправьте её.

Пример ожидаемого выполнения программы:

<sample-output>

Please type in the first number: **2**
Please type in the second number: **3**
Please type in the third number: **5**
The product is 30

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Sum and product" tmcname="part01-17_sum_and_product" title="Сумма и произведение">

Пожалуйста, напишите программу, которая запрашивает у пользователя два числа. Программа затем выводит сумму и произведение двух чисел.

Программа должна работать следующим образом:

<sample-output>

Number 1: **3**
Number 2: **7**
The sum of the numbers: 10
The product of the numbers: 21

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Sum and mean" tmcname="part01-18_sum_and_mean" title="Сумма и среднее">

Пожалуйста, напишите программу, которая запрашивает у пользователя четыре числа. Программа затем выводит сумму и среднее значение чисел.

Программа должна работать следующим образом:

<sample-output>

Number 1: **2**
Number 2: **1**
Number 3: **6**
Number 4: **7**
The sum of the numbers is 16 and the mean is 4.0

</sample-output>

</in-browser-programming-exercise>



<in-browser-programming-exercise name="Food expenditure" tmcname="part01-19_food_expenditure" title="Расходы на питание">

Пожалуйста, напишите программу, которая оценивает типичные расходы пользователя на питание.

Программа спрашивает у пользователя, сколько раз в неделю он ест в студенческой столовой. Затем она спрашивает цену типичного студенческого обеда и деньги, потраченные на продукты в течение недели.

На основе этой информации программа вычисляет типичные расходы пользователя на питание еженедельно и ежедневно.

Программа должна работать следующим образом:

<sample-output>

How many times a week do you eat at the student cafeteria? **4**
The price of a typical student lunch? **2.5**
How much money do you spend on groceries in a week? **28.5**

Average food expenditure:
Daily: 5.5 euros
Weekly: 38.5 euros

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Students in groups" tmcname="part01-20_students_in_groups" title="Студенты в группах">

Пожалуйста, напишите программу, которая спрашивает количество студентов на курсе и желаемый размер группы. Программа затем выводит количество групп, сформированных из студентов курса. Если деление не точное, одна из групп может иметь меньше участников, чем указано.

Если вы не можете заставить свой код работать как ожидается, совершенно нормально двигаться дальше и вернуться к этому упражнению позже. Тема следующего раздела - [условные операторы](/ru/part-1/5-conditional-statements). Это упражнение также может быть решено с использованием условной конструкции.

<sample-output>

How many students on the course? **8**
Desired group size? **4**
Number of groups formed: 2

</sample-output>

<sample-output>

How many students on the course? **11**
Desired group size? **3**
Number of groups formed: 4

</sample-output>

Подсказка: оператор целочисленного деления `//` может пригодиться здесь.

</in-browser-programming-exercise>

<!--

A quiz to review the contents of this section:

<quiz id="d781d54e-9792-5a79-a018-168940390580"></quiz>

-->