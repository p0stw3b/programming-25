---
path: '/ru/part-4/3-lists'
title: 'Списки'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После изучения этого раздела

- Вы узнаете, что такое списки в Python
- Вы сможете получать доступ к определенному элементу в списке
- Вы узнаете, как добавлять элементы в список и как их удалять
- Вы познакомитесь со встроенными функциями и методами для работы со списками

</text-box>

До сих пор в наших программах мы хранили данные с помощью переменных, каждый бит данных обычно имел свою именованную переменную. Это, очевидно, имеет некоторые ограничения, поскольку может стать громоздким определять отдельные переменные для всего, когда нужно обработать много данных.

Python _список_ - это коллекция значений, к которой обращаются через одно имя переменной. Содержимое списка записывается в квадратных скобках. Значения, содержащиеся в списке, называются _элементами_ или иногда _элементами_.

Следующая команда создает новый пустой список

```python
my_list = []
```

тогда как эта команда создает список с пятью элементами в нем:

```python
my_list = [7, 2, 2, 5, 2]
```

## Доступ к элементам списка

Элементы в списке индексируются точно так же, как символы в строке. Индексация начинается с нуля, а последний индекс равен длине списка минус 1:

<img src="../../part-4/4_3_1.png" alt="Списки индексируются начиная с 0">

К одному элементу списка можно получить доступ точно так же, как к одному символу в строке, с помощью квадратных скобок:

```python
my_list = [7, 2, 2, 5, 2]

print(my_list[0])
print(my_list[1])
print(my_list[3])

print("The sum of the first two items:", my_list[0] + my_list[1])
```

<sample-output>

7
2
5
The sum of the first two items: 9

</sample-output>

Все содержимое списка также может быть выведено:

```python
my_list = [7, 2, 2, 5, 2]
print(my_list)
```

<sample-output>

[7, 2, 2, 5, 2]

</sample-output>

В отличие от строк, списки изменяемы, что означает, что их содержимое может изменяться. Вы можете присвоить новое значение элементу в списке, точно так же, как вы можете присвоить новое значение переменной:

```python
my_list = [7, 2, 2, 5, 2]
print(my_list)
my_list[1] = 3
print(my_list)
```

<sample-output>

[7, 2, 2, 5, 2]
[7, 3, 2, 5, 2]

</sample-output>

Функция `len` дает вам количество элементов в списке:

```python
my_list = [7, 2, 2, 5, 2]
print(len(my_list))
```

<sample-output>

5

</sample-output>


<programming-exercise name='Change the value of an item' tmcname='part04-12_change_value_of_item' title='Изменить значение элемента'>

Пожалуйста, напишите программу, которая инициализирует список значениями `[1, 2, 3, 4, 5]`. Затем программа должна спрашивать пользователя индекс и новое значение, заменять значение по данному индексу и снова выводить список. Это должно повторяться, пока пользователь не даст -1 для индекса. Вы можете предполагать, что все заданные индексы попадут в ваш список.

Пример выполнения программы:

<sample-output>

Index: **0**
New value: **10**
[10, 2, 3, 4, 5]
Index: **2**
New value: **250**
[10, 2, 250, 4, 5]
Index: **4**
New value: **-45**
[10, 2, 250, 4, -45]
Index: **-1**

</sample-output>

**Примечание:** это упражнение не просит вас писать какие-либо функции, поэтому вы __не должны__ размещать какой-либо код в блоке `if __name__ == "__main__"`.

</programming-exercise>

## Добавление элементов в список

Метод `append` добавляет элементы в конец списка. Он работает следующим образом:

```python
numbers = []
numbers.append(5)
numbers.append(10)
numbers.append(3)
print(numbers)
```

<sample-output>

[5, 10, 3]

</sample-output>

Следующий пример использует два отдельных списка:

```python
numbers = []
shoe_sizes = []

numbers.append(5)
numbers.append(10)
numbers.append(3)

shoe_sizes.append(37)
shoe_sizes.append(44)
shoe_sizes.append(40)
shoe_sizes.append(28)

print("Numbers:")
print(numbers)

print("Shoe sizes:")
print(shoe_sizes)
```

Элемент добавляется к списку, для которого вызывается метод:

<sample-output>

Numbers:
[5, 10, 3]
Shoe sizes:
[37, 44, 40, 28]

</sample-output>

<programming-exercise name='Add items to a list' tmcname='part04-13_add_items_to_list' title='Добавить элементы в список'>

Пожалуйста, напишите программу, которая сначала спрашивает пользователя количество элементов для добавления. Затем программа должна спросить данное количество значений, одно за другим, и добавить их в список в том порядке, в котором они были введены. Наконец, список выводится.

Пример ожидаемого поведения:

<sample-output>

How many items: **3**
Item 1: **10**
Item 2: **250**
Item 3: **34**
[10, 250, 34]

</sample-output>

**Примечание:** это упражнение не просит вас писать какие-либо функции, поэтому вы __не должны__ размещать какой-либо код в блоке `if __name__ == "__main__"`.

</programming-exercise>

## Добавление в определенное место

Если вы хотите указать место в списке, куда должен быть добавлен элемент, вы можете использовать метод `insert`. Метод добавляет элемент по указанному индексу. Все элементы, уже находящиеся в списке с индексом, равным или больше указанного индекса, перемещаются на один индекс дальше, "вправо":

<img src="../../part-4/4_3_2.png" alt = "Вставка элемента в список">

Итак, например, эта программа

```python
numbers = [1, 2, 3, 4, 5, 6]
numbers.insert(0, 10)
print(numbers)
numbers.insert(2, 20)
print(numbers)
```

выводит это:

<sample-output>

[10, 1, 2, 3, 4, 5, 6]
[10, 1, 20, 2, 3, 4, 5, 6]

</sample-output>

## Удаление элементов из списка

Есть два разных подхода к удалению элемента из списка:

* Если _индекс_ элемента известен, вы можете использовать метод `pop`.
* Если _содержимое_ элемента известно, вы можете использовать метод `remove`.

Итак, метод `pop` принимает индекс элемента, который вы хотите удалить, в качестве своего аргумента. Следующая программа удаляет элементы по индексам 2 и 3 из списка. Обратите внимание, как изменяются индексы оставшихся элементов при удалении одного.

```python
my_list = [1, 2, 3, 4, 5, 6]

my_list.pop(2)
print(my_list)
my_list.pop(3)
print(my_list)
```

<sample-output>

[1, 2, 4, 5, 6]
[1, 2, 4, 6]

</sample-output>

Полезно помнить, что метод `pop` также _возвращает_ удаленный элемент:

```python
my_list = [4, 2, 7, 2, 5]

number = my_list.pop(2)
print(number)
print(my_list)
```

<sample-output>

7
[4, 2, 2, 5]

</sample-output>

Метод `remove`, с другой стороны, принимает значение элемента, который нужно удалить, в качестве своего аргумента. Например, эта программа

```python
my_list = [1, 2, 3, 4, 5, 6]

my_list.remove(2)
print(my_list)
my_list.remove(5)
print(my_list)
```

выводит это:

<sample-output>

[1, 3, 4, 5, 6]
[1, 3, 4, 6]

</sample-output>

Метод удаляет _первое_ вхождение значения в списке, так же как строковая функция `find` возвращает первое вхождение подстроки:

```python
my_list = [1, 2, 1, 2]

my_list.remove(1)
print(my_list)
my_list.remove(1)
print(my_list)
```

<sample-output>

[2, 1, 2]
[2, 2]

</sample-output>

<programming-exercise name='Addition and removal' tmcname='part04-14_addition_and_removal' title='Добавление и удаление'>

Пожалуйста, напишите программу, которая спрашивает пользователя выбрать между добавлением и удалением. В зависимости от выбора программа _добавляет элемент в_ или _удаляет элемент из_ конца списка. Элемент, который добавляется, должен всегда быть на один больше последнего элемента в списке. Первый элемент для добавления должен быть 1.

Список выводится в начале и после каждой операции. Посмотрите на пример выполнения ниже:

<sample-output>

The list is now []
a(d)d, (r)emove or e(x)it: **d**
The list is now [1]
a(d)d, (r)emove or e(x)it: **d**
The list is now [1, 2]
a(d)d, (r)emove or e(x)it: **d**
The list is now [1, 2, 3]
a(d)d, (r)emove or e(x)it: **r**
The list is now [1, 2]
a(d)d, (r)emove or e(x)it: **d**
The list is now [1, 2, 3]
a(d)d, (r)emove or e(x)it: **x**
Bye!

</sample-output>

Вы можете предполагать, что если список пуст, не будет попыток удалить элементы.

**Примечание:** это упражнение не просит вас писать какие-либо функции, поэтому вы __не должны__ размещать какой-либо код в блоке `if __name__ == "__main__"`.

</programming-exercise>

Если указанного элемента нет в списке, функция `remove` вызывает ошибку. Так же как со строками, мы можем проверить наличие элемента с помощью оператора `in`:

```python
my_list = [1, 3, 4]

if 1 in my_list:
    print("The list contains item 1")

if 2 in my_list:
    print("The list contains item 2")
```

<sample-output>

The list contains item 1

</sample-output>

<programming-exercise name='Same word twice' tmcname='part04-15_same_word_twice' title='Одно и то же слово дважды'>

Пожалуйста, напишите программу, которая просит пользователя вводить слова. Если пользователь вводит слово второй раз, программа должна вывести количество различных введенных слов и завершить работу.

<sample-output>

Word: **once**
Word: **upon**
Word: **a**
Word: **time**
Word: **upon**
You typed in 4 different words

</sample-output>

**Примечание:** это упражнение не просит вас писать какие-либо функции, поэтому вы __не должны__ размещать какой-либо код в блоке `if __name__ == "__main__"`.

</programming-exercise>

## Сортировка списков

Элементы в списке могут быть _отсортированы_ от наименьшего к наибольшему с помощью метода `sort`.

```python
my_list = [2,5,1,2,4]
my_list.sort()
print(my_list)
```

<sample-output>

[1, 2, 2, 4, 5]

</sample-output>

Обратите внимание, как метод изменяет сам список. Иногда мы не хотим изменять исходный список, поэтому мы используем функцию `sorted` вместо этого. Она _возвращает_ отсортированный список:

```python
my_list = [2,5,1,2,4]
print(sorted(my_list)))
```

<sample-output>

[1, 2, 2, 4, 5]

</sample-output>

Помните разницу между ними: `sort` изменяет порядок исходного списка на месте, тогда как `sorted` создает новую упорядоченную копию списка. С `sorted` мы можем сохранить исходный порядок списка:

```python
original = [2, 5, 1, 2, 4]
in_order = sorted(original)
print(original)
print(in_order)
```

<sample-output>

[2, 5, 1, 2, 4]
[1, 2, 2, 4, 5]

</sample-output>

<programming-exercise name='List twice' tmcname='part04-16_list_twice' title='Список дважды'>

Пожалуйста, напишите программу, которая просит пользователя ввести значения и добавляет их в список. После каждого добавления список выводится двумя разными способами:
- в порядке добавления элементов
- упорядочен от наименьшего к наибольшему

Программа завершается, когда пользователь вводит 0.

Пример ожидаемого поведения:

<sample-output>

New item: **3**
The list now: [3]
The list in order: [3]
New item: **1**
The list now: [3, 1]
The list in order: [1, 3]
New item: **9**
The list now: [3, 1, 9]
The list in order: [1, 3, 9]
New item: **5**
The list now: [3, 1, 9, 5]
The list in order: [1, 3, 5, 9]
New item: **0**
Bye!

</sample-output>

**Примечание:** это упражнение не просит вас писать какие-либо функции, поэтому вы __не должны__ размещать какой-либо код в блоке `if __name__ == "__main__"`.

</programming-exercise>

## Максимум, минимум и сумма

Функции `max` и `min`, сокращения от максимум и минимум, возвращают наибольший и наименьший элемент в списке соответственно. Функция `sum` возвращает сумму всех элементов в списке.

```python
my_list = [5, 2, 3, 1, 4]

greatest = max(my_list)
smallest = min(my_list)
list_sum = sum(my_list)

print("Smallest:", smallest)
print("Greatest:", greatest)
print("Sum:", list_sum)
```

<sample-output>

Smallest: 1
Greatest: 5
Sum: 15

</sample-output>

## Методы против функций

В Python есть два разных способа обработки списков, которые могут сбивать с толку. В большинстве случаев вы будете использовать _методы_ списка, такие как `append` и `sort`. Они используются с оператором точки `.` на переменной списка:

```python
my_list = []

# method calls
my_list.append(3)
my_list.append(1)
my_list.append(7)
my_list.append(2)

# another method call
my_list.sort()
```

Некоторые _функции_ готовы принять список в качестве аргумента. Выше мы видели, что функции `max`,  `min`, `len` и `sorted` делают именно это:

```python
my_list = [3, 2, 7, 1]

# function calls take the list as an argument
greatest = max(my_list)
smallest = min(my_list)
length = len(my_list)

print("Smallest:", smallest)
print("Greatest:", greatest)
print("Length of the list:", length)

# another function call 
# the list itself is an argument, the function returns a sorted copy
in_order = sorted(my_list)
print(in_order)
```

<sample-output>

Smallest: 1
Greatest: 7
Length of the list: 4
[1, 2, 3, 7]

</sample-output>

## Список как аргумент или возвращаемое значение

Так же как встроенные функции выше, наши собственные функции также могут принимать список в качестве аргумента и производить список в качестве возвращаемого значения. Следующая функция вычисляет центральное значение в упорядоченном списке, также называемое _медианным_ значением:

```python
def median(my_list: list):
    ordered = sorted(my_list)
    list_centre = len(ordered) // 2
    return ordered[list_centre]
```

Функция создает упорядоченную версию списка, переданного в качестве аргумента, и возвращает элемент в самом центре. Обратите внимание на оператор целочисленного деления `//`, используемый здесь. Индекс списка всегда должен быть целым числом.

Функция работает следующим образом:

```python
shoe_sizes = [45, 44, 36, 39, 40]
print("The median of the shoe sizes is", median(shoe_sizes))

ages = [1, 56, 34, 22, 5, 77, 5]
print("The median of the ages is", median(ages))
```

<sample-output>

The median of the shoe sizes is 40
The median of the ages is 22

</sample-output>

Функция также может возвращать список. Следующая функция просит пользователя ввести целые числа и возвращает ввод в виде списка:

```python
def input_numbers():
    numbers = []
    while True:
        user_input = input("Please type in an integer, leave empty to exit: ")
        if len(user_input) == 0:
            break
        numbers.append(int(user_input))
    return numbers
```

Функция использует вспомогательную переменную `numbers`, которая является списком. Все числа, введенные пользователем, добавляются в список. Когда происходит выход из цикла, функция возвращает список с оператором `return numbers`.

Вызов функции таким образом

```python 
numbers = input_numbers()

print("Наибольшее число равно", max(numbers))
print("Медиана чисел равна", median(numbers))
```

может вывести это, например:

<sample-output>

Please type in an integer, leave empty to exit: **5**
Please type in an integer, leave empty to exit: **-22**
Please type in an integer, leave empty to exit: **4**
Please type in an integer, leave empty to exit: **35**
Please type in an integer, leave empty to exit: **1**
Please type in an integer, leave empty to exit:
The greatest number is 35
The median of the numbers is 4

</sample-output>

Этот небольшой пример демонстрирует одно из важнейших применений функций: они могут помочь вам разделить ваш код на меньшие, легко понятные и логические целые.

Конечно, та же функциональность может быть достигнута без написания наших собственных функций:

```python
numbers = []
while True:
    user_input = input("Please type in an integer, leave empty to exit: ")
    if len(user_input) == 0:
        break
    numbers.append(int(user_input))

ordered = sorted(numbers)
list_centre = len(ordered) // 2
median = ordered[list_centre]

print("The greatest number is", max(numbers))
print("The median of the numbers is", median)
```

В этой версии следовать программной логике сложнее, поскольку больше не ясно, какие команды являются частью какой функциональности. Код выполняет те же цели - чтение ввода, вычисление медианного значения и так далее - но структура менее ясна.

Организация вашего кода в отдельные функции улучшит читаемость вашей программы, но также облегчит обработку логических целых. Это, в свою очередь, поможет вам проверить, что программа работает так, как задумано, поскольку каждую функцию можно тестировать отдельно.

Другое важное применение функций - делать код _многократно используемым_. Если вам нужно достичь какой-то функциональности несколько раз в вашей программе, хорошая идея создать свою собственную функцию и назвать ее соответствующим образом:

```python
print("Shoe sizes:")
shoe_sizes = input_numbers()

print("Weights:")
weights = input_numbers()

print("Heights:")
heights = input_numbers()
```

<programming-exercise name='The length of a list' tmcname='part04-17_length_of_list' title='Длина списка'>

Пожалуйста, напишите функцию с именем `length`, которая принимает список в качестве аргумента и возвращает длину списка.

```python
my_list = [1, 2, 3, 4, 5]
result = length(my_list)
print("The length is", result)

# the list given as an argument doesn't need to be stored in any variable
result = length([1, 1, 1, 1])
print("The length is", result)
```

<sample-output>

The length is 5
The length is 4

</sample-output>

</programming-exercise>

<programming-exercise name='Arithmetic mean' tmcname='part04-18_mean' title='Среднее арифметическое'>

Пожалуйста, напишите функцию с именем `mean`, которая принимает список целых чисел в качестве аргумента. Функция возвращает среднее арифметическое значений в списке.

```python
my_list = [1, 2, 3, 4, 5]
result = mean(my_list))
print("mean value is", result)
```

<sample-output>

mean value is 3.0

</sample-output>

</programming-exercise>

<programming-exercise name='The range of a list' tmcname='part04-19_range_of_list' title='Диапазон списка'>

Пожалуйста, напишите функцию с именем `range_of_list`, которая принимает список целых чисел в качестве аргумента. Функция возвращает разность между наименьшим и наибольшим значением в списке.


```python
my_list = [1, 2, 3, 4, 5]
result = range_of_list(my_list))
print("The range of the list is", result)
```

<sample-output>

The range of the list is 4

</sample-output>

</programming-exercise>


В Python есть много других способов использования списков. Python [документация](https://docs.python.org/3/tutorial/datastructures.html) - хорошее место для начала, если вы хотите узнать больше.

<!---
A quiz to review the contents of this section:

<quiz id="4849cd69-1938-5f4f-8805-8445f0f5c015"></quiz>
-->