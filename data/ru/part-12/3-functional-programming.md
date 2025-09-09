---
path: '/ru/part-12/3-functional-programming'
title: 'Функциональное программирование'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После изучения этого раздела

- Вы поймёте, что означает функциональное программирование
- Вы сможете использовать функции `map`, `reduce` и `filter` в своих собственных программах

</text-box>

Функциональное программирование относится к _парадигме программирования_, которая по возможности избегает изменений в состоянии программы. Переменные обычно избегаются. Вместо этого цепочки вызовов функций образуют основу программы.

Лямбда-выражения и различные типы включений являются общими техниками в стиле функционального программирования, поскольку они позволяют обрабатывать данные без их хранения в переменных, чтобы состояние программы не изменялось. Например, лямбда-выражение для всех целей и задач является функцией, но нам не нужно хранить именованную ссылку на неё где-либо.

Как упоминалось выше, функциональное программирование является парадигмой программирования или стилем программирования. Существует много различных парадигм программирования, и мы уже сталкивались с некоторыми из них:

* императивное программирование, где программа состоит из последовательности команд, которые выполняются по порядку
* процедурное программирование, где программа группируется в процедуры или подпрограммы
* объектно-ориентированное программирование, где программа и её состояние хранятся в объектах, определённых в классах.

Существуют различные мнения о разделениях между различными парадигмами; например, некоторые утверждают, что императивное и процедурное программирование означают одно и то же, в то время как другие помещают императивное программирование как общий термин, который охватывает как процедурное, так и объектно-ориентированное программирование. Терминология и разделения не так важны, и не важно строго придерживаться той или иной парадигмы, но важно понимать, что такие различные подходы существуют, поскольку они влияют на выбор, который делают программисты.

Многие языки программирования разработаны с учётом той или иной парадигмы программирования, но Python является довольно универсальным языком программирования и позволяет следовать нескольким различным парадигмам программирования, даже в рамках одной программы. Это позволяет нам выбирать наиболее эффективный и ясный метод для решения каждой проблемы.

Давайте рассмотрим некоторые инструменты функционального программирования, предоставляемые Python.

## map

Функция `map` выполняет некоторую операцию над каждым элементом в итерируемой серии. Это звучит очень похоже на эффект включения, но синтаксис другой.

Предположим, у нас есть список строк, которые мы хотим преобразовать в список целых чисел:

```python
str_list = ["123","-10", "23", "98", "0", "-110"]

integers = map(lambda x : int(x), str_list)

print(integers) # это говорит нам о типе объекта, с которым мы имеем дело

for number in integers:
    print(number)
```

<sample-output>

<map object at 0x0000021A4BFA9A90>
123
-10
23
98
0
-110

</sample-output>

Общий синтаксис для функции `map`:

`map(<функция>, <серия>)`

где `функция` — это операция, которую мы хотим выполнить над каждым элементом в `серии`.

Функция `map` возвращает объект типа `map`, который является итерируемым и может быть преобразован в список:

```python
def capitalize(my_string: str):
    first = my_string[0]
    first = first.upper()
    return first + my_string[1:]

test_list = ["first", "second", "third", "fourth"]

capitalized = map(capitalize, test_list)

capitalized_list = list(capitalized)
print(capitalized_list)
```

<sample-output>

['First', 'Second', 'Third', 'Fourth']

</sample-output>

Как вы можете видеть из примеров выше, функция `map` принимает как анонимную лямбда-функцию, так и именованную функцию, определённую с ключевым словом `def`.

Мы могли бы достичь того же результата с помощью включения списка:

```python
def capitalize(my_string: str):
    first = my_string[0]
    first = first.upper()
    return first + my_string[1:]

test_list = ["first", "second", "third", "fourth"]

capitalized_list = [capitalize(item) for item in test_list]
print(capitalized_list)
```

...или мы могли бы пройти через исходный список с помощью цикла `for` и сохранить обработанные элементы в новом списке с помощью метода `append`. Обычно в программировании существует множество различных решений для каждой проблемы. Редко бывают абсолютно правильные или неправильные ответы. Знание множества различных подходов помогает выбирать наиболее подходящий для каждой ситуации или тот, который лучше всего соответствует вашим собственным предпочтениям.

Стоит отметить, что функция `map` возвращает не список, а объект _итератор_ типа map. Итератор ведёт себя во многих отношениях как список, но есть исключения, как можно увидеть в следующем примере:

```python
def capitalize(my_string: str):
    first = my_string[0]
    first = first.upper()
    return first + my_string[1:]

test_list = ["first", "second", "third", "fourth"]

# сохранить возвращаемое значение функции map
capitalized = map(capitalize, test_list)

for word in capitalized:
  print(word)

print("вывести то же самое снова:")
for word in capitalized:
  print(word)
```

Это выведет следующее:

<sample-output>

First
Second
Third
Fourth
вывести то же самое снова:

</sample-output>

Выше мы пытались вывести содержимое итератора `map` дважды, но вторая попытка не произвела вывода. Причина в том, что `map` является итератором; прохождение через него с помощью цикла `for` "истощает" его, как генератор истощается, когда достигается его максимальное значение. После того, как элементы в итераторе были пройдены с помощью цикла `for`, больше нечего проходить.

Если вам нужно пройти через содержимое итератора `map` более одного раза, вы могли бы, например, преобразовать map в список:

```python
test_list = ["first", "second", "third", "fourth"]

# преобразовать возвращаемое значение функции map в список
capitalized = list(map(capitalize, test_list))

for word in capitalized:
  print(word)

print("вывести то же самое снова:")
for word in capitalized:
  print(word)
```

<sample-output>

First
Second
Third
Fourth
вывести то же самое снова:
First
Second
Third
Fourth

</sample-output>

## Функция map и ваши собственные классы

Вы, естественно, также можете обрабатывать экземпляры ваших собственных классов с помощью функции `map`. Никаких специальных трюков не требуется, как вы можете видеть в примере ниже:

```python
class BankAccount:
    def __init__(self, account_number: str, name: str, balance: float):
        self.__account_number = account_number
        self.name = name
        self.__balance = balance

    def deposit(self, amount: float):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance

a1 = BankAccount("123456", "Randy Riches", 5000)
a2 = BankAccount("12321", "Paul Pauper", 1)
a3 = BankAccount("223344", "Mary Millionaire ", 1000000)

accounts = [a1, a2, a3]

clients = map(lambda t: t.name, accounts)
for name in clients:
  print(name)

balances = map(lambda t: t.get_balance(), accounts)
for balance in balances:
  print(balance)
```

<sample-output>

Randy Riches
Paul Pauper
Mary Millionaire
5000
1
1000000

</sample-output>

Здесь мы сначала собираем имена владельцев счетов с помощью функции `map`. Анонимная лямбда-функция используется для получения значения атрибута `name` из каждого объекта BankAccount:

```python
clients = map(lambda t: t.name, accounts)
```

Аналогично, баланс каждого BankAccount собирается. Лямбда-функция выглядит немного по-другому, поскольку баланс получается с помощью вызова метода, а не напрямую из атрибута:

```python
balances = map(lambda t: t.get_balance(), accounts)
```

<programming-exercise name='Attempted courses' tmcname='part12-11_attempted_courses'>

Шаблон упражнения содержит определение класса для `CourseAttempt` (Попытка курса). Он работает следующим образом:

```python
attempt = CourseAttempt("Peter Python", "Introduction to Programming", 5)
print(attempt.student_name)
print(attempt.course_name)
print(attempt.grade)
print(attempt)
```

<sample-output>

Peter Python
Introduction to Programming
5
Peter Python, оценка за курс Introduction to Programming 5

</sample-output>

## Имена студентов

Напишите функцию `names_of_students(attempts: list)`, которая принимает список объектов CourseAttempt в качестве аргумента. Функция должна вернуть новый список с именами студентов, которые пытались пройти курс.

```python
s1 = CourseAttempt("Peter Python", "Introduction to Programming", 3)
s2 = CourseAttempt("Olivia C. Objective", "Introduction to Programming", 5)
s3 = CourseAttempt("Peter Python", "Advanced Course in Programming", 2)

for name in names_of_students([s1, s2, s3]):
    print(name)
```

<sample-output>

Peter Python
Olivia C. Objective
Peter Python

</sample-output>

Реализуйте функцию, используя функцию `map`.

## Курсы

Напишите функцию `course_names(attempts: list)`, которая принимает список объектов CourseAttempt в качестве аргумента. Функция должна вернуть новый список, содержащий названия курсов из исходного списка в алфавитном порядке. Каждое название курса должно появляться в списке только один раз.

```python
s1 = CourseAttempt("Peter Python", "Introduction to Programming", 3)
s2 = CourseAttempt("Olivia C. Objective", "Introduction to Programming", 5)
s3 = CourseAttempt("Peter Python", "Advanced Course in Programming", 2)

for name in course_names([s1, s2, s3]):
    print(name)
```
<sample-output>

Advanced Course in Programming
Introduction to Programming

</sample-output>

Реализуйте функцию, используя функцию `map`. Только этого, вероятно, будет недостаточно. Вам понадобится что-то ещё, чтобы убедиться, что названия курсов уникальны.

</programming-exercise>

## filter

Встроенная функция Python `filter` похожа на функцию `map`, но, как следует из названия, она не берёт все элементы из источника. Вместо этого она фильтрует их с помощью функции критерия, которая передается в качестве аргумента. Если функция критерия возвращает `True`, элемент выбирается.

Давайте рассмотрим пример использования `filter`:

```python
integers = [1, 2, 3, 5, 6, 4, 9, 10, 14, 15]

even_numbers = filter(lambda number: number % 2 == 0, integers)

for number in even_numbers:
    print(number)
```

<sample-output>

2
6
4
10
14

</sample-output>

Приведённый выше пример может стать немного понятнее, если мы вместо этого использовали именованную функцию:

```python
def is_it_even(number: int):
    if number % 2 == 0:
        return True
    return False

integers = [1, 2, 3, 5, 6, 4, 9, 10, 14, 15]

even_numbers = filter(is_it_even, integers)

for number in even_numbers:
    print(number)
```

Эти две программы функционально полностью идентичны. В основном это вопрос мнения, какой подход вы считаете лучшим.

Давайте рассмотрим другой пример фильтрации. Эта программа моделирует рыбу и выбирает только ту, которая весит не менее 1000 граммов:

```python
class Fish:
    """ Класс моделирует рыбу определённого вида и веса """
    def __init__(self, species: str, weight: int):
        self.species = species
        self.weight = weight

    def __repr__(self):
        return f"{self.species} ({self.weight} г.)"

if __name__ == "__main__":
    f1 = Fish("Pike", 1870)
    f2 = Fish("Perch", 763)
    f3 = Fish("Pike", 3410)
    f4 = Fish("Cod", 2449)
    f5 = Fish("Roach", 210)

    fishes = [f1, f2, f3, f4, f5]

    over_a_kilo = filter(lambda fish : fish.weight >= 1000, fishes)

    for fish in over_a_kilo:
        print(fish)
```

<sample-output>

Pike (1870 г.)
Pike (3410 г.)
Cod (2449 г.)

</sample-output>

Мы могли бы так же использовать включение списка и достичь того же результата:

```python
over_a_kilo = [fish for fish in fishes if fish.weight >= 1000]
```

## Возвращаемое значение filter является итератором

Функция `filter` напоминает функцию `map` также и в том, что она возвращает _итератор_. Существуют ситуации, где вы должны быть особенно осторожны с `filter`, поскольку итераторы можно пройти только один раз. Таким образом, попытка вывести коллекцию крупных рыб дважды не сработает так просто, как вы могли бы подумать:

```python
f1 = Fish("Pike", 1870)
f2 = Fish("Perch", 763)
f3 = Fish("Pike", 3410)
f4 = Fish("Cod", 2449)
f5 = Fish("Roach", 210)

fishes = [f1, f2, f3, f4, f5]

over_a_kilo = filter(lambda fish : fish.weight >= 1000, fishes)

for fish in over_a_kilo:
    print(fish)

print("вывести то же самое снова:")

for fish in over_a_kilo:
    print(fish)
```

Это выведет следующее:

<sample-output>

Pike (1870 г.)
Pike (3410 г.)
Cod (2449 г.)
вывести то же самое снова:

</sample-output>

Если вам нужно пройти через содержимое итератора `filter` более одного раза, вы могли бы преобразовать результат в список:

```python
fishes = [f1, f2, f3, f4, f5]

# преобразовать возвращаемое значение функции filter в список
over_a_kilo = list(filter(lambda fish : fish.weight >= 1000, fishes))
```

<programming-exercise name='Filtering attempts' tmcname='part12-12_filtering_attempts'>

В этом упражнении мы продолжим работать с классом `CourseAttempt`.

## Принятые попытки

Напишите функцию `accepted(attempts: list)`, которая принимает список объектов CourseAttempt в качестве аргумента. Функция должна вернуть новый список объектов CourseAttempt, включая только те элементы из исходного списка, чья оценка составляет не менее 1.

```python
s1 = CourseAttempt("Peter Python", "Introduction to Programming", 3)
s2 = CourseAttempt("Olivia C. Objective", "Introduction to Programming", 5)
s3 = CourseAttempt("Peter Python", "Advanced Course in Programming", 0)

for attempt in accepted([s1, s2, s3]):
    print(attempt)
```

<sample-output>

Peter Python, оценка за курс Introduction to Programming 3
Olivia C. Objective, оценка за курс Introduction to Programming 5

</sample-output>

Реализуйте функцию, используя функцию `filter`.

## Попытки с оценкой

Напишите функцию `attempts_with_grade(attempts: list, grade: int)`, которая принимает список объектов CourseAttempt и целое число в качестве аргументов. Функция должна вернуть новый список, содержащий только те объекты CourseAttempt из исходного списка, чья оценка соответствует второму аргументу.

```python
s1 = CourseAttempt("Peter Python", "Introduction to Programming", 3)
s2 = CourseAttempt("Olivia C. Objective", "Introduction to Programming", 5)
s3 = CourseAttempt("Peter Python", "Introduction to AI", 3)
s4 = CourseAttempt("Olivia C. Objective", "Data Structures and Algorithms", 3)

for attempt in attempts_with_grade([s1, s2, s3, s4], 3):
    print(attempt)
```

<sample-output>

Peter Python, оценка за курс Introduction to Programming 3
Peter Python, оценка за курс Introduction to AI 3
Olivia C. Objective, оценка за курс Data Structures and Algorithms 3

</sample-output>

Реализуйте функцию, используя функцию `filter`.

## Студенты, которые прошли курс

Напишите функцию `passed_students(attempts: list, course: str)`, которая принимает список объектов CourseAttempt и название курса в качестве аргументов. Функция должна вернуть _алфавитно упорядоченный_ список имён тех студентов, которые прошли курс, то есть их оценка за данный курс была выше 0.

```python
s1 = CourseAttempt("Peter Python", "Introduction to Programming", 3)
s2 = CourseAttempt("Olivia C. Objective", "Introduction to AI", 5)
s3 = CourseAttempt("Peter Python", "Introduction to AI", 0)
s4 = CourseAttempt("Jack Java", "Introduction to AI", 3)

for attempt in passed_students([s1, s2, s3, s4], "Introduction to AI"):
    print(attempt)
```

<sample-output>

Jack Java
Olivia C. Objective

</sample-output>

Реализуйте функцию, используя функции `filter` и `map`.

</programming-exercise>

## reduce

Третья краеугольная функция в этом введении в принципы функционального программирования — это `reduce` из модуля `functools`. Как следует из названия, её цель — _свести_ элементы в ряду к одному значению.

Функция `reduce` начинает с операции и начального значения. Она выполняет данную операцию над каждым элементом в ряду по очереди, так что значение изменяется на каждом шаге. После того, как все элементы были обработаны, возвращается результирующее значение.

Мы выполняли суммирование списков целых чисел различными способами раньше, но вот пример с помощью функции `reduce`. Обратите внимание на оператор `import`; в Python версий 3 и выше он необходим для доступа к функции `reduce`. В старых версиях Python оператор `import` не был нужен, поэтому в интернете можно встретить примеры без него.

```python
from functools import reduce

my_list = [2, 3, 1, 5]

sum_of_numbers = reduce(lambda reduced_sum, item: reduced_sum + item, my_list, 0)

print(sum_of_numbers)
```

<sample-output>

11

</sample-output>

Давайте внимательнее рассмотрим, что здесь происходит. Функция `reduce` принимает три аргумента: функцию, ряд элементов и начальное значение. В этом случае ряд — это список целых чисел, и поскольку мы вычисляем сумму, подходящим начальным значением является ноль.

Первый аргумент — это функция, которая представляет операцию, которую мы хотим выполнить над каждым элементом. Здесь функция — это анонимная лямбда-функция:

```python
lambda reduced_sum, item: reduced_sum + item
```

Эта функция принимает два аргумента: текущее свёрнутое значение и элемент, очередь которого обрабатывается. Они используются для вычисления нового значения для свёрнутого значения. В этом случае новое значение — это сумма старого значения и текущего элемента.

Может быть легче понять, что функция `reduce` действительно делает, если мы используем обычную именованную функцию вместо лямбда-функции. Таким образом, мы также можем включить полезные выводы:

```python
from functools import reduce

my_list = [2, 3, 1, 5]

# вспомогательная функция для reduce, добавляет одно значение к текущей свёрнутой сумме
def sum_helper(reduced_sum, item):
  print(f"свёрнутая сумма сейчас {reduced_sum}, следующий элемент {item}")
  # новая свёрнутая сумма - это старая сумма + следующий элемент
  return reduced_sum + item

sum_of_numbers = reduce(sum_helper, my_list, 0)

print(sum_of_numbers)
```

Программа выводит:

<sample-output>

свёрнутая сумма сейчас 0, следующий элемент 2
свёрнутая сумма сейчас 2, следующий элемент 3
свёрнутая сумма сейчас 5, следующий элемент 1
свёрнутая сумма сейчас 6, следующий элемент 5
11

</sample-output>

Сначала функция обрабатывает элемент со значением 2. Для начала свёрнутая сумма равна 0, что является начальным значением, переданным функции `reduce`. Функция вычисляет и возвращает сумму этих двух: `0 + 2 = 2`.

Это значение сохраняется в `reduced_sum`, когда функция `reduce` обрабатывает следующий элемент в списке со значением 3. Функция вычисляет и возвращает сумму этих двух: `2 + 3 = 5`. Затем этот результат используется при обработке следующего элемента, и так далее, и так далее.

Теперь суммирование простое, поскольку для этой цели есть даже встроенная функция `sum`. Но как насчёт умножения? Нужны лишь небольшие изменения для создания свёрнутого произведения:

```python
from functools import reduce

my_list = [2, 2, 4, 3, 5, 2]

product_of_list = reduce(lambda product, item: product * item, my_list, 1)

print(product_of_list)
```

<sample-output>

480

</sample-output>

Поскольку мы имеем дело с умножением, начальное значение не ноль. Вместо этого мы используем 1. Что случилось бы, если бы мы использовали 0 в качестве начального значения?

Выше мы в основном имели дело с целыми числами, но `map`, `filter` и `reduce` могут обрабатывать коллекцию объектов любого типа.

В качестве примера давайте сгенерируем общую сумму балансов всех счетов в банке с помощью `reduce`:

```python
class BankAccount:
    def __init__(self, account_number: str, name: str, balance: float):
        self.__account_number = account_number
        self.name = name
        self.__balance = balance

    def deposit(self, amount: float):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance

a1 = BankAccount("123456", "Randy Riches", 5000)
a2 = BankAccount("12321", "Paul Pauper", 1)
a3 = BankAccount("223344", "Mary Millionaire ", 1000000)

accounts = [a1, a2, a3]

from functools import reduce

def balance_sum_helper(balance_sum, account):
  return balance_sum + account.get_balance()

balances_total = reduce(balance_sum_helper, accounts, 0)

print("Общая сумма банковских балансов:")
print(balances_total)
```

Эта программа выведет:

<sample-output>

Общая сумма банковских балансов:
1005001

</sample-output>

Функция `balance_sum_helper` получает баланс каждого банковского счёта с помощью метода, предназначенного для этой цели в определении класса `BankAccount`:

```python
def balance_sum_helper(balance_sum, account):
  return balance_sum + account.get_balance()
```

<text-box variant='hint' name='Reduce без начального значения'>

Вам не всегда нужно передавать третий аргумент функции `reduce`. Например, суммирование работало бы так же хорошо _без_ начального значения:

```python
my_list = [2, 3, 1, 5]

sum_of_numbers = reduce(lambda reduced_sum, item: reduced_sum + item, my_list)

print(sum_of_numbers)
```

Если начальное значение опущено, `reduce` берёт первый элемент в списке как начальное значение и начинает свёртку со второго элемента далее.

</text-box>

**НБ:** если элементы в ряду имеют тип, отличный от предполагаемого свёрнутого результата, третий аргумент обязателен. Пример с банковскими счетами не работал бы без начального значения. То есть попытка этого

```python
balances_total = reduce(balance_sum_helper, accounts)
```

привела бы к ошибке:

```python
TypeError: unsupported operand type(s) for +: 'BankAccount' and 'int'
```

В вышеприведённом случае, когда `reduce` пытается выполнить функцию `balance_sum_helper` в первый раз, аргументы, которые она использует, — это _два первых элемента в списке_, которые оба имеют тип BankAccount. В частности, значение, присвоенное параметру `balance_sum`, является первым элементом в списке. Функция `balance_sum_helper` пытается добавить к нему целое значение, но добавление целого числа напрямую к объекту BankAccount не является поддерживаемой операцией.

<programming-exercise name='Study credits' tmcname='part12-13_credits'>

В этом упражнении мы будем работать со слегка изменённой версией класса `CourseAttempt`. Имя студента опущено, но количество кредитов включено. Класс работает следующим образом:

```python
attempt = CourseAttempt("Data Structures and Algorithms", 3, 10)
print(attempt)
print(attempt.course_name)
print(attempt.credits)
print(attempt.grade)
```

<sample-output>

Data Structures and Algorithms (10 кр) оценка 3
Data Structures and Algorithms
10
3

</sample-output>

## Сумма всех кредитов

Реализуйте функцию `sum_of_all_credits`, которая принимает список попыток курса в качестве аргумента. Функция суммирует общее количество учебных кредитов, охваченных курсами. Она должна работать следующим образом:

```python
s1 = CourseAttempt("Introduction to Programming", 5, 5)
s2 = CourseAttempt("Advanced Course in Programming", 4, 5)
s3 = CourseAttempt("Data Structures and Algorithms", 3, 10)
credit_sum = sum_of_all_credits([s1, s2, s3])
print(credit_sum)
```

<sample-output>

20

</sample-output>

Реализуйте функцию, используя функцию `reduce`.

## Сумма пройденных кредитов

Реализуйте функцию `sum_of_passed_credits`, которая принимает список попыток курса в качестве аргумента. Функция суммирует кредиты за попытки курса с оценкой 1 или выше. Она должна работать следующим образом:

```python
s1 = CourseAttempt("Introduction to Programming", 5, 5)
s2 = CourseAttempt("Advanced Course in Programming", 0, 4)
s3 = CourseAttempt("Data Structures and Algorithms", 3, 10)
credit_sum = sum_of_passed_credits([s1, s2, s3])
print(credit_sum)
```

<sample-output>

15

</sample-output>

Реализуйте функцию, используя функции `reduce` и `filter`.

## Средняя оценка для пройденных курсов

Реализуйте функцию `average`, которая принимает список попыток курса в качестве аргумента. Функция вычисляет среднюю оценку для попыток курса с оценкой 1 или выше. Она должна работать следующим образом:

```python
s1 = CourseAttempt("Introduction to Programming", 5, 5)
s2 = CourseAttempt("Advanced Course in Programming", 0, 4)
s3 = CourseAttempt("Data Structures and Algorithms", 3, 10)
ag = average([s1, s2, s3])
print(ag)
```

<sample-output>

4.0

</sample-output>

Реализуйте функцию, используя функции `reduce` и `filter`. НБ: упражнение просит простое среднее значение, а не взвешенное среднее.

При работе над этим упражнением, вероятно, стоит помнить, что [возвращаемое значение filter является итератором](/ru/part-12/3-functional-programming#возвращаемое-значение-filter-является-итератором).

</programming-exercise>