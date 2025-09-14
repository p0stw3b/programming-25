---
path: '/ru/part-5/4-tuple'
title: 'Кортеж'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела

- Вы будете знакомы с типом данных кортеж
- Вы сможете создавать кортежи из различных типов значений
- Вы узнаете разницу между кортежем и списком
- Вы сможете назвать некоторые типичные случаи использования кортежей

</text-box>

Кортеж - это структура данных, которая во многом похожа на список. Наиболее важные различия между ними:

* Кортежи заключаются в круглые скобки `()`, в то время как списки заключаются в квадратные скобки `[]`
* Кортежи _неизменяемы_, в то время как содержимое списка может изменяться

Следующий фрагмент кода создает кортеж, содержащий координаты точки:

```python
point = (10, 20)
```

Элементы, хранящиеся в кортеже, доступны по индексу, точно так же, как элементы, хранящиеся в списке:

```python
point = (10, 20)
print("x coordinate:", point[0])
print("y coordinate:", point[1])
```

<sample-output>

x coordinate: 10
y coordinate: 20

</sample-output>

Значения, хранящиеся в кортеже, не могут быть изменены после определения кортежа. Следующее _не_ сработает:

```python
point = (10, 20)
point[0] = 15
```

<sample-output>

TypeError: 'tuple' object does not support item assignment

</sample-output>

<programming-exercise name='Создать кортеж' tmcname='part05-23_create_tuple'>

Пожалуйста, напишите функцию с именем `create_tuple(x: int, y: int, z: int)`, которая принимает три целых числа в качестве аргументов и создает и возвращает кортеж на основе следующих критериев:

1. Первый элемент в кортеже - наименьший из аргументов
2. Второй элемент в кортеже - наибольший из аргументов
3. Третий элемент в кортеже - сумма аргументов

Пример его использования:

```python

if __name__ == "__main__":
    print(create_tuple(5, 3, -1))

```

<sample-output>

(-1, 5, 7)

</sample-output>

</programming-exercise>

<programming-exercise name='Самый старый человек' tmcname='part05-24_oldest_person'>

Пожалуйста, напишите функцию с именем `oldest_person(people: list)`, которая принимает список кортежей в качестве аргумента. В каждом кортеже первый элемент - имя человека, а второй элемент - год его рождения. Функция должна найти самого старого человека в списке и вернуть его имя.

Пример работы функции:

```python
p1 = ("Adam", 1977)
p2 = ("Ellen", 1985)
p3 = ("Mary", 1953)
p4 = ("Ernest", 1997)
people = [p1, p2, p3, p4]

print(oldest_person(people))
```

<sample-output>

Mary

</sample-output>

</programming-exercise>

<programming-exercise name='Люди постарше' tmcname='part05-25_older_people'>

В этом упражнении мы работаем с кортежами точно такими же, как описано в предыдущем упражнении.

Пожалуйста, напишите функцию с именем `older_people(people: list, year: int)`, которая выбирает всех тех людей в списке, которые родились _до_ года, заданного в качестве аргумента. Функция должна вернуть имена этих людей в новом списке.

Пример его использования:

```python
p1 = ("Adam", 1977)
p2 = ("Ellen", 1985)
p3 = ("Mary", 1953)
p4 = ("Ernest", 1997)
people = [p1, p2, p3, p4]

older = older_people(people, 1979)
print(older)
```

<sample-output>

[ 'Adam', 'Mary' ]

</sample-output>

</programming-exercise>

## Для чего предназначен кортеж?

Кортежи идеальны, когда есть набор связанных значений. Например, когда нужно работать с x и y координатами точки, кортеж - естественный выбор, потому что координаты всегда будут состоять из двух значений:

```python
point = (10, 20)
```

Технически, конечно, также возможно использовать список для хранения этих данных:

```python
point = [10, 20]
```

Список - это коллекция последовательных элементов в определенном порядке. Размер списка также может изменяться. Когда мы храним координаты точки, мы хотим хранить конкретно x и y координаты, а не произвольный список, содержащий эти значения.

Поскольку кортежи неизменяемы, в отличие от списков, их можно использовать в качестве ключей в словаре. Следующий фрагмент кода создает словарь, где ключи - координатные точки:

```python
points = {}
points[(3, 5)] = "monkey"
points[(5, 0)] = "banana"
points[(1, 2)] = "harpsichord"
print(points[(3, 5)])
```

<sample-output>
monkey
</sample-output>

Попытка аналогичного определения словаря с использованием списков _не_ сработает:

```python
points = {}
points[[3, 5]] = "monkey"
points[[5, 0]] = "banana"
points[[1, 2]] = "harpsichord"
print(points[[3, 5]])
```

<sample-output>

TypeError: unhashable type: 'list'

</sample-output>

## Кортежи без скобок

Скобки не являются строго необходимыми при определении кортежей. Следующие два присваивания переменных идентичны по результатам:

```python
numbers = (1, 2, 3)
```

```python
numbers = 1, 2, 3
```

Это означает, что мы также можем легко возвращать несколько значений, используя кортежи. Давайте рассмотрим следующий пример:

```python
def minmax(my_list):
  return min(my_list), max(my_list)

my_list = [33, 5, 21, 7, 88, 312, 5]

min_value, max_value = minmax(my_list)
print(f"The smallest item is {min_value} and the greatest item is {max_value}")
```

<sample-output>

The smallest item is 5 and the greatest item is 312

</sample-output>

Эта функция возвращает два значения в кортеже. Возвращаемое значение присваивается двум переменным одновременно:

```python
min_value, max_value = minmax(my_list)
```

Использование скобок может сделать обозначение более четким. В левой части оператора присваивания у нас также есть кортеж, который содержит два имени переменных. Значения, содержащиеся в кортеже, возвращаемом функцией, присваиваются этим двум переменным.

```python
(min_value, max_value) = minmax(my_list)
```

Вы можете помнить метод словаря `items` из предыдущего раздела. Мы использовали его для доступа ко всем ключам и значениям, хранящимся в словаре:

```python
my_dictionary = {}

my_dictionary["apina"] = "monkey"
my_dictionary["banaani"] = "banana"
my_dictionary["cembalo"] = "harpsichord"

for key, value in my_dictionary.items():
    print("key:", key)
    print("value:", value)
```

Кортежи работают и здесь тоже. Метод `my_dictionary.items()` возвращает каждую пару ключ-значение как кортеж, где первый элемент - ключ, а второй элемент - значение.

Еще один распространенный случай использования кортежей - обмен значениями двух переменных:

```python
number1, number2 = number2, number1
```

Оператор присваивания выше меняет местами значения, хранящиеся в переменных `number1` и `number2`. Результат идентичен тому, что достигается следующим фрагментом кода, используя вспомогательную переменную:

```python
helper_var = number1
number1 = number2
number2 = helper_var
```

<programming-exercise name='База данных студентов' tmcname='part05-26_student_database'>

В этой серии упражнений вы создадите простую базу данных студентов. Прежде чем погрузиться в работу, потратьте некоторое время на чтение инструкций и размышления о том, какие структуры данных необходимы для организации данных, хранящихся в вашей программе.

#### добавление студентов

Сначала напишите функцию с именем `add_student`, которая добавляет нового студента в базу данных. Также напишите предварительную версию функции `print_student`, которая выводит информацию об одном студенте.

Эти функции используются следующим образом:

```python
students = {}
add_student(students, "Peter")
add_student(students, "Eliza")
print_student(students, "Peter")
print_student(students, "Eliza")
print_student(students, "Jack")
```

Ваша программа должна теперь вывести

<sample-output>

<pre>
Peter:
 no completed courses
Eliza:
 no completed courses
Jack: no such person in the database
</pre>

</sample-output>

#### добавление завершенных курсов

Пожалуйста, напишите функцию с именем `add_course`, которая добавляет завершенный курс к информации конкретного студента в базе данных. Данные курса представляют собой кортеж, состоящий из названия курса и оценки:

```python
students = {}
add_student(students, "Peter")
add_course(students, "Peter", ("Introduction to Programming", 3))
add_course(students, "Peter", ("Advanced Course in Programming", 2))
print_student(students, "Peter")
```

Когда некоторые курсы были добавлены, выводимая информация изменяется:

<sample-output>

<pre>
Peter:
 2 completed courses:
  Introduction to Programming 3
  Advanced Course in Programming 2
 average grade 2.5
</pre>

</sample-output>

#### повторение курсов

Курсы с оценкой 0 должны игнорироваться при добавлении информации о курсе. Кроме того, если курс уже есть в базе данных в информации этого конкретного студента, оценка, записанная в базе данных, никогда не должна понижаться, если курс повторяется.

```python
students = {}
add_student(students, "Peter")
add_course(students, "Peter", ("Introduction to Programming", 3))
add_course(students, "Peter", ("Advanced Course in Programming", 2))
add_course(students, "Peter", ("Data Structures and Algorithms", 0))
add_course(students, "Peter", ("Introduction to Programming", 2))
print_student(students, "Peter")
```

<sample-output>

<pre>
Peter:
 2 completed courses:
  Introduction to Programming 3
  Advanced Course in Programming 2
 average grade 2.5
</pre>

</sample-output>

#### сводка базы данных

Пожалуйста, напишите функцию с именем `summary`, которая выводит сводку на основе всей информации, хранящейся в базе данных.

```python
students = {}
add_student(students, "Peter")
add_student(students, "Eliza")
add_course(students, "Peter", ("Data Structures and Algorithms", 1))
add_course(students, "Peter", ("Introduction to Programming", 1))
add_course(students, "Peter", ("Advanced Course in Programming", 1))
add_course(students, "Eliza", ("Introduction to Programming", 5))
add_course(students, "Eliza", ("Introduction to Computer Science", 4))
summary(students)
```

Это должно вывести

<sample-output>

<pre>
students 2
most courses completed 3 Peter
best average grade 4.5 Eliza
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name="Квадрат из букв" tmcname="part05-27_letter_square">

Это заключительное упражнение в этой части является относительно сложной задачей решения проблем. Ее можно решить разными способами. Даже хотя текущий раздел в материале охватывает кортежи, кортежи не обязательно лучший способ решения этой задачи.

Пожалуйста, напишите программу, которая выводит квадрат из букв, как указано в примерах ниже. Можно предположить, что будет не более 26 слоев.

<sample-output>

Layers: **3**
<pre>
CCCCC
CBBBC
CBABC
CBBBC
CCCCC
</pre>

</sample-output>

<sample-output>

Layers: **4**
<pre>
DDDDDDD
DCCCCCD
DCBBBCD
DCBABCD
DCBBBCD
DCCCCCD
DDDDDDD
</pre>

</sample-output>

**Примечание:** это упражнение не просит вас писать функции, поэтому вы __не должны__ размещать какой-либо код внутри блока `if __name__ == "__main__"`.

</programming-exercise>

<!---
Викторина для обзора содержания этого раздела:

<quiz id="69694e01-4c47-5b9d-8a00-b0d96a477dc7"></quiz>
-->

Пожалуйста, ответьте на короткую анкету по материалам этой недели.

<quiz id="34daa09c-da82-53df-be28-02a22704bf7e"></quiz>