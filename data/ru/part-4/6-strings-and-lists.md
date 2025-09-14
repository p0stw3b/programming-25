---
path: '/ru/part-4/6-strings-and-lists'
title: 'Больше о строках и списках'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После изучения этого раздела

- Вы познакомитесь с большим количеством методов для нарезки строк и списков
- Вы поймёте, что означает неизменяемость строк
- Вы сможете использовать методы `count` и `replace`

</text-box>

Вы уже знакомы с синтаксисом `[]` для доступа к части строки:

```python
my_string = "exemplary"
print(my_string[3:7])
```

<sample-output>

mpla

</sample-output>

Тот же синтаксис работает со списками. Списки можно нарезать точно так же, как строки:

```python
my_list = [3,4,2,4,6,1,2,4,2]
print(my_list[3:7])
```

<sample-output>

[4, 6, 1, 2]

</sample-output>

## Больше срезов

На самом деле, синтаксис `[]` работает очень похоже на функцию `range`, что означает, что мы также можем задать ему шаг:

```python
my_string = "exemplary"
print(my_string[0:7:2])
my_list = [1,2,3,4,5,6,7,8]
print(my_list[6:2:-1])
```

<sample-output>

eepa
[7, 6, 5, 4]

</sample-output>

Если мы пропустим любой из индексов, оператор по умолчанию включит всё. Среди прочего, это позволяет нам написать очень короткую программу для обращения строки:

```python
my_string = input("Please type in a string: ")
print(my_string[::-1])
```

<sample-output>

Please type in a string: **exemplary**
yralpmexe

</sample-output>

<!--a similar warning is in sections 3-4, 4-6 and 5-1, check them all if you're changing this-->
## Предупреждение: использование глобальных переменных внутри функций

Мы знаем, что возможно присваивать новые переменные в определениях функций, но функция также может видеть переменные, присвоенные вне её, в основной функции. Такие переменные называются _глобальными_ переменными.

Использование глобальных переменных изнутри функций обычно плохая идея. Среди прочих проблем, это может вызвать ошибки, которые трудно отследить.

Ниже приведён пример функции, которая использует глобальную переменную "по ошибке":

```python
def print_reversed(names: list):
    # using the global variable instead of the parameter by accident
    i = len(name_list) - 1
    while i >= 0:
        print(name_list[i])
        i -= 1

# here the global variable is assigned
name_list = ["Steve", "Jean", "Katherine", "Paul"]
print_reversed(name_list)
print()
print_reversed(["Huey", "Dewey", "Louie"])
```

<sample-output>

Paul
Katherine
Jean
Steve

Paul
Katherine
Jean
Steve

</sample-output>

Несмотря на то, что оба вызова функции имеют правильный тип аргумента, функция всегда выводит то, что хранится в глобальной переменной `name_list`.

Чтобы сделать дела ещё более запутанными, помните, что весь код для тестирования ваших функций должен быть размещён в блоке `if __name__ == "__main__":` для автоматических тестов. Предыдущий пример должен быть изменён:

```python
def print_reversed(names: list):
    # using the global variable instead of the parameter by accident
    i = len(name_list) - 1
    while i>=0:
        print(name_list[i])
        i -= 1

# All the code for testing the function should be within this block
if __name__ == "__main__":
    # here the global variable is assigned
    name_list = ["Steve", "Jean", "Katherine", "Paul"]
    print_reversed(name_list)
    print()
    print_reversed(["Huey", "Dewey", "Louie"])
```

Обратите внимание, что глобальная переменная теперь присваивается в блоке `if`.

Автоматические тесты в системе TMC выполняются без запуска какого-либо кода в блоке `if`. Поэтому в этом последнем примере функция теоретически даже не работала бы, поскольку она ссылается на переменную `name_list`, которая вообще не существует при выполнении тестов.

<programming-exercise name='Everything reversed' tmcname='part04-33_everything_reversed' title='Всё наоборот'>

Пожалуйста, напишите функцию с именем `everything_reversed`, которая принимает список строк в качестве аргумента. Функция возвращает новый список со всеми элементами исходного списка, обращёнными наоборот. Также порядок элементов должен быть обращён в новом списке.

Пример работы функции:

```python
my_list = ["Hi", "there", "example", "one more"]
new_list = everything_reversed(my_list)
print(new_list)
```

<sample-output>

['erom eno', 'elpmaxe', 'ereht', 'iH']

</sample-output>

</programming-exercise>

## Строки неизменяемы

Строки и списки имеют много общего, особенно в том, как они ведут себя с разными операторами. Главная разница в том, что строки _неизменяемы_. Это означает, что их нельзя изменить.

```python
my_string = "exemplary"
my_string[0] = "a"
```

Строки нельзя изменить, поэтому выполнение этой программы вызывает ошибку:

<sample-output>

TypeError: 'str' object does not support item assignment

</sample-output>

Подобная ошибка следует, если вы попытаетесь отсортировать строку методом `sort`.

Сами строки неизменяемы, но переменные, содержащие их, изменяемы. Строка может быть заменена другой строкой.

Следующие два примера принципиально отличаются:

```python
my_list = [1,2,3]
my_list[0] = 10
```

<img src="../../part-4/4_6_1.png">

```python
my_string = "Hey"
my_string = my_string + "!"
```

<img src="../../part-4/4_6_2.png">

Первый пример изменяет содержимое ссылочного списка. Второй пример заменяет ссылку на исходную строку ссылкой на другую строку. Исходная строка всё ещё где-то в памяти компьютера, но на неё нет ссылки, и она больше не может использоваться в программе.

Мы вернёмся к этой теме в следующей части, где ссылки на списки будут исследованы более подробно.

## Больше методов для списков и строк

Метод `count` подсчитывает количество раз, когда указанный элемент или подстрока встречается в цели. Метод работает одинаково как со строками, так и со списками:

```python
my_string = "How much wood would a woodchuck chuck if a woodchuck could chuck wood"
print(my_string.count("ch"))

my_list = [1,2,3,1,4,5,1,6]
print(my_list.count(1))
```

<sample-output>

5
3

</sample-output>

Метод не будет считать перекрывающиеся вхождения. Например, в строке `aaaa` метод считает только два вхождения подстроки `aa`, хотя фактически их было бы три, если бы разрешались перекрывающиеся вхождения.

Метод `replace` создаёт новую строку, где указанная подстрока заменяется другой строкой:

```python
my_string = "Hi there"
new_string = my_string.replace("Hi", "Hey")
print(new_string)
```

<sample-output>

Hey there

</sample-output>

Метод заменит все вхождения подстроки:

```python
sentence = "sheila sells seashells on the seashore"
print(sentence.replace("she", "SHE"))
```

<sample-output>

SHEila sells seaSHElls on the seashore

</sample-output>

При использовании метода `replace` типичная ошибка - забыть, что строки неизменяемы:

```python
my_string = "Python is fun"

# Replaces the substring but doesn't store the result...
my_string.replace("Python", "Java")
print(my_string)
```

<sample-output>

Python is fun

</sample-output>

Если старая строка больше не нужна, новая строка может быть присвоена той же переменной:

```python
my_string = "Python is fun"

# Replaces the substring and stores the result in the same variable
my_string = my_string.replace("Python", "Java")
print(my_string)
```

<sample-output>

Java is fun

</sample-output>

<programming-exercise name='Most common character' tmcname='part04-34_most_common_character' title='Наиболее частый символ'>

Пожалуйста, напишите функцию с именем `most_common_character`, которая принимает строковый аргумент. Функция возвращает символ, который имеет больше всего вхождений в строке. Если есть много символов с одинаково многими вхождениями, должен быть возвращён тот, который появляется первым в строке.

Пример ожидаемого поведения:

```python
first_string = "abcdbde"
print(most_common_character(first_string))

second_string = "exemplaryelementary"
print(most_common_character(second_string))
```

<sample-output>

b
e

</sample-output>

</programming-exercise>


<programming-exercise name='No vowels allowed' tmcname='part04-35_no_vowels_allowed' title='Гласные запрещены'>

Пожалуйста, напишите функцию с именем `no_vowels`, которая принимает строковый аргумент. Функция возвращает новую строку, которая должна быть такой же, как исходная, но с удалёнными всеми гласными.

Вы можете предполагать, что строка будет содержать только символы из строчного английского алфавита a...z.

Пример ожидаемого поведения:

```python
my_string = "this is an example"
print(no_vowels(my_string))
```

<sample-output>

ths s n xmpl

</sample-output>

</programming-exercise>


<programming-exercise name='No shouting allowed' tmcname='part04-36_no_shouting_allowed' title='Крик запрещён'>

Строковый метод Python `isupper()` возвращает `True`, если строка состоит _только_ из символов верхнего регистра.

Некоторые примеры:

```python
print("XYZ".isupper())

is_it_upper = "Abc".isupper()
print(is_it_upper)
```

<sample-output>

True
False

</sample-output>

Пожалуйста, используйте метод `isupper` для написания функции с именем `no_shouting`, которая принимает список строк в качестве аргумента. Функция возвращает новый список, содержащий только те элементы из исходного, которые не состоят исключительно из символов верхнего регистра.

Пример ожидаемого поведения:

```python
my_list = ["ABC", "def", "UPPER", "ANOTHERUPPER", "lower", "another lower", "Capitalized"]
pruned_list = no_shouting(my_list)
print(pruned_list)
```

<sample-output>

['def', 'lower', 'another lower', 'Capitalized']

</sample-output>

</programming-exercise>

<programming-exercise name='Neighbours in a list' tmcname='part04-37_neighbours_in_list' title='Соседи в списке'>

Для данного списка целых чисел решим, что два последовательных элемента в списке являются соседями, если их разность равна 1. Таким образом, элементы 1 и 2 были бы соседями, как и элементы 56 и 55.

Пожалуйста, напишите функцию с именем `longest_series_of_neighbours`, которая ищет самую длинную серию соседей в списке и возвращает её длину.

Например, в списке `[1, 2, 5, 4, 3, 4]` самый длинный список соседей был бы `[5, 4, 3, 4]` с длиной 4.

Пример вызова функции:

```python
my_list = [1, 2, 5, 7, 6, 5, 6, 3, 4, 1, 0]
print(longest_series_of_neighbours(my_list))
```

<sample-output>

4

</sample-output>

</programming-exercise>

## Разработка более крупного программного проекта

Эта четвёртая часть завершается немного более крупным программным проектом, где вы сможете применить многие из изученных до сих пор техник.

Правило №1 в решении любого программного проекта - не пытаться решить всё сразу. Программа должна быть построена из меньших разделов, таких как вспомогательные функции. Вы должны проверить работу каждой части, прежде чем переходить к следующей. Если вы попытаетесь справиться со слишком многим одновременно, скорее всего наступит только хаос.

Для этого вам понадобится способ тестирования ваших функций вне основной функции. Вы можете достичь этого, определив основную функцию явно и вызвав эту функцию извне любой другой функции в программе. Один вызов функции тогда легко закомментировать для тестирования. Первые шаги в построении следующего программного проекта могли бы выглядеть так:

```python
def main():
    points = []
    # your program code goes here

main()
```

Теперь вспомогательные функции могут быть протестированы без запуска основной функции:

```python
# helper function for determining the grade based on the amount of points
def grade(points):
    # more code

def main():
    all_points = []
    # your program code goes here

# comment out the main function
#main()

# test the helper function
student_points = 35
result = grade(student_points)
print(result)
```

## Передача данных от одной функции к другой

<!--- see also section 6-4, some significant overlap-->
Когда программа содержит несколько функций, возникает вопрос: как передать данные от одной функции к другой?

Следующий пример просит пользователя ввести некоторые целые значения. Программа затем выводит эти значения и выполняет "анализ" над ними. Программа разделена на три отдельные функции:

```python
def input_from_user(how_many: int):
    print(f"Please type in {how_many} numbers:")
    numbers = []

    for i in range(how_many):
        number = int(input(f"Number {i+1}: "))
        numbers.append(number)

    return numbers

def print_result(numbers: list):
    print("The numbers are: ")
    for number in numbers:
        print(number)

def analyze(numbers: list):
    mean = sum(numbers) / len(numbers)
    return f"There are altogether {len(numbers)} numbers, the mean is {mean}, the smallest is {min(numbers)} and the greatest is {max(numbers)}"

# the "main function" using these functions
inputs = input_from_user(5)
print_result(inputs)
analysis_result = analyze(inputs)
print(analysis_result)
```

Когда программа выполняется, это может выглядеть так:

<sample-output>

Please type in 5 numbers:
Number 1: **10**
Number 2: **34**
Number 3: **-32**
Number 4: **99**
Number 5: **-53**
The numbers are:
10
34
-32
99
-53
There are altogether 5 numbers, the mean is 11.6, the smallest is -53 and the greatest is 99

</sample-output>

Идея здесь в том, что основная функция "сохраняет" все данные, обрабатываемые программой. В этом случае всё, что нужно, - это ввод от пользователя в переменной `inputs`.

Если ввод нужен в функции, он передаётся как аргумент. Это происходит с функциями `print_result` и `analyze`. Если функция производит данные, которые нужны в другом месте программы, функция возвращает их командой `return`, и они сохраняются в переменной в основной функции. Это происходит с функциями `input_from_user` и `analyze`.

Вы могли бы использовать глобальную переменную `inputs` из основной функции напрямую во вспомогательных функциях. Мы уже рассмотрели, почему это плохая идея, но [вот ещё одно объяснение](https://softwareengineering.stackexchange.com/questions/148108/why-is-global-state-so-evil). Если функции могут изменить глобальную переменную, в программе могут начать происходить неожиданные вещи, особенно когда количество функций становится большим.

Передача данных в функции и из них лучше всего обрабатывается аргументами и возвращаемыми значениями.

Вы также могли бы отделить неявную основную функцию в примере выше в её собственную функцию. Тогда переменная `inputs` больше не была бы глобальной переменной, а вместо этого локальной переменной внутри функции `main`:

```python
# your main function goes here
def main():
    inputs = input_from_user(5)
    print_result(inputs)
    analysis_result = analyze(inputs)

    print(analysis_result)

# run the main function
main()
```

<programming-exercise name='Grade statistics' tmcname='part04-38_grade_statistics' title='Статистика оценок'>

В этом упражнении вы напишете программу для вывода статистики оценок для университетского курса.

Программа просит пользователя ввести результаты от разных студентов курса. Эти результаты включают экзаменационные баллы и количество выполненных упражнений. Программа затем выводит статистику на основе результатов.

Экзаменационные баллы - целые числа от 0 до 20. Количество выполненных упражнений - целое число от 0 до 100.

Программа продолжает спрашивать ввод, пока пользователь не введёт пустую строку. Вы можете предполагать, что все строки содержат допустимый ввод, что означает, что в каждой строке есть два целых числа или строка пустая.

Пример того, как вводятся данные:

<sample-output>

Exam points and exercises completed: **15 87**
Exam points and exercises completed: **10 55**
Exam points and exercises completed: **11 40**
Exam points and exercises completed: **4 17**
Exam points and exercises completed:
Statistics:

</sample-output>

Когда пользователь вводит пустую строку, программа выводит статистику. Она формулируется следующим образом:

Выполненные упражнения преобразуются в _баллы за упражнения_, так что выполнение не менее 10% упражнений даёт один балл, 20% даёт два балла, и так далее. Выполнение всех 100 упражнений даёт 10 баллов за упражнения. Количество баллов за упражнения - целое значение, округлённое вниз.

Оценка за курс определяется на основе следующей таблицы:

экзаменационные баллы + баллы за упражнения   | оценка
:--:|:----:
0–14 | 0 (т.е. провал)
15–17 | 1
18–20 | 2
21–23 | 3
24–27 | 4
28–30 | 5

Также есть пороговое значение экзамена. Если студент получил менее 10 баллов с экзамена, он автоматически проваливает курс, независимо от общего количества баллов.

С примером ввода сверху программа вывела бы следующую статистику:

<sample-output>

<pre>
Statistics:
Points average: 14.5
Pass percentage: 75.0
Grade distribution:
  5:
  4:
  3: *
  2:
  1: **
  0: *
</pre>

</sample-output>

Числа с плавающей точкой должны выводиться с точностью до одного десятичного знака.

**Примечание:** это упражнение не просит вас писать какие-либо конкретные функции, поэтому вы __не должны__ размещать какой-либо код в блоке `if __name__ == "__main__"`. Если какая-либо функциональность в вашей программе находится, например, в функции `main`, вы должны включить код, вызывающий эту функцию, обычно, а не содержать его в блоке `if`, как в упражнениях, которые определяют определённые функции.

**Подсказка:**

Пользовательский ввод в этой программе состоит из строк с двумя целыми значениями:

<sample-output>

Exam points and exercises completed: **15 87**

</sample-output>

Вы должны сначала разделить входную строку на две части, а затем преобразовать разделы в целые числа функцией `int`. Разделение ввода может быть достигнуто тем же способом, что и в упражнении [First, second and last words](/ru/part-4/2-more-functions#programming-exercise-first-second-and-last-words), но есть и более простой способ. Строковый метод `split` разрежет ввод хорошо. Вы найдёте больше информации, поискав *python string split* в Интернете.

<!-- **Huomaa** että tällä hetkellä Windowsissa on ongelmia joidenkin tehtävien testien suorittamisessa. Jos törmäät seuraavaan virheilmoitukseen

<img src="../../part-4/4_3_2.png" alt="Listan iterointi">

voit suorittaa testit lähettämällä ne palvelimelle valitsemalla testien suoritusnapin oikealla puolella olevasta symbolista avautuvasta TMC-valikosta _Submit solutions_.

Ongelman saa korjattua menemällä laajennuksen asennusvalikkoon ja muuttamalla "TMC Data" -kohdassa tehtävien sijainnin johonkin toiseen sijaintiin, jonka tiedostopolku on lyhempi, allaolevassa kuvassa nappi _change path_. Siirrossa saattaa kestää hetken, joten odotathan operaation päättymistä.

<img src="../../part-4/4_3_3.png" alt="Listan iterointi">

Ongelmaan pyritään saamaan parempi ratkaisu lähipäivinä. -->

</programming-exercise>

<!---
A quiz to review the contents of this section:

<quiz id="925f1715-d762-5e44-a812-be13bff1aa44"></quiz>
-->

Пожалуйста, ответьте на краткую анкету по материалам этой недели.

<quiz id="5df4a245-bde4-5211-bcce-224e0e14d991"></quiz>