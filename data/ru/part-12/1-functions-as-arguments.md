---
path: '/ru/part-12/1-functions-as-arguments'
title: 'Функции как аргументы'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После изучения этого раздела

- Вы сможете сортировать списки по различным критериям
- Вы поймёте, что такое лямбда-выражение
- Вы сможете использовать лямбда-выражения с другими функциями Python
- Вы поймёте, как функция передается в качестве аргумента другой функции

</text-box>

Мы уже знакомы с методом `sort` и функцией `sorted`, которые используются для сортировки списков в их естественном порядке. Для чисел и строк это обычно работает нормально. Однако для чего-то более сложного то, что Python считает естественным порядком элементов, не всегда совпадает с нашими намерениями как программистов.

Например, список кортежей по умолчанию сортируется на основе первого элемента каждого кортежа:

```python
products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

products.sort()

for product in products:
    print(product)
```

<sample-output>

('apple', 3.95)
('banana', 5.95)
('orange', 4.5)
('watermelon', 4.95)

</sample-output>

Но что если мы хотели отсортировать список по цене?

## Функции как аргументы

Метод или функция сортировки обычно принимает необязательный второй аргумент, который позволяет обойти критерии сортировки по умолчанию. Этот второй аргумент — функция, которая определяет, как определяется значение каждого элемента в списке. При сортировке списка Python вызывает эту функцию при сравнении элементов друг с другом.

Рассмотрим пример:

```python
def order_by_price(item: tuple):
    # Return the price, which is the second item within the tuple
    return item[1]

if __name__ == "__main__":
    products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

    # Use the function order_by_price for sorting
    products.sort(key=order_by_price)

    for product in products:
        print(product)
```

<sample-output>

('apple', 3.95)
('orange', 4.5)
('watermelon', 4.95)
('banana', 5.95)

</sample-output>

Теперь список отсортирован по ценам товаров, но что действительно происходит в программе?

Функция `order_by_price` на самом деле довольно простая. Она принимает один элемент в качестве аргумента и возвращает значение для этого элемента. В частности, она возвращает второй элемент в кортеже, который представляет цену. Но затем у нас есть эта строка кода, где вызывается метод `sort`:

`products.sort(key=order_by_price)`

Здесь метод `sort` вызывается с функцией в качестве аргумента. Это не ссылка на возвращаемое значение функции, а ссылка на _саму функцию_. Метод `sort` вызывает эту функцию несколько раз, используя каждый элемент списка в качестве аргумента по очереди.

Если мы включим дополнительный оператор print в определение функции `order_by_price`, мы можем убедиться, что функция действительно вызывается один раз для каждого элемента в списке:

```python
def order_by_price(item: tuple):
    # Print the item
    print(f"Function call: order_by_price({item})")

    # Return the price, which is the second item within the tuple
    return item[1]


products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

# Use the function order_by_price for sorting
products.sort(key=order_by_price)

for product in products:
    print(product)
```

<sample-output>

Function call: order_by_price(('banana', 5.95))
Function call: order_by_price(('apple', 3.95))
Function call: order_by_price(('orange', 4.5))
Function call: order_by_price(('watermelon', 4.95))
('apple', 3.95)
('orange', 4.5)
('watermelon', 4.95)
('banana', 5.95)

</sample-output>

Порядок может быть _обращён_ с помощью другого ключевого аргумента `reverse`, который доступен как с методом `sort`, так и с функцией `sorted`:

```python
products.sort(key=order_by_price, reverse=True)

t2 = sorted(products, key=order_by_price, reverse=True)
```

## Определение функции внутри определения функции

Мы также могли бы включить именованную функцию для этой новой функциональности сортировки по цене, которую мы создали. Давайте добавим функцию с именем `sort_by_price`:

```python
def order_by_price(item: tuple):
    return item[1]

def sort_by_price(items: list):
    # use the order_by_price function here
    return sorted(items, key=order_by_price)

products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

for product in sort_by_price(products):
    print(product)
```

Если мы знаем, что вспомогательная функция `order_by_price` не используется где-либо вне функции `sort_by_price`, мы можем поместить определение первой функции внутри определения последней функции:

```python
def sort_by_price(items: list):
    # helper function defined within the function
    def order_by_price(item: tuple):
        return item[1]

    return sorted(items, key=order_by_price)
```

<programming-exercise name='Sort by remaining stock' tmcname='part12-01_remaining_stock'>

Напишите функцию `sort_by_remaining_stock(items: list)`. Функция принимает список кортежей в качестве аргумента. Кортежи состоят из названия, цены и остатка товара. Функция должна вернуть новый список, где элементы отсортированы по остатку товара, от наименьшего к наибольшему. Исходный список не должен изменяться.

Функция должна работать следующим образом:

```python
products = [("banana", 5.95, 12), ("apple", 3.95, 3), ("orange", 4.50, 2), ("watermelon", 4.95, 22)]

for product in sort_by_remaining_stock(products):
    print(f"{product[0]} {product[2]} pcs")
```

<sample-output>
orange 2 pcs
apple 3 pcs
banana 12 pcs
watermelon 22 pcs
</sample-output>

</programming-exercise>

<programming-exercise name='Sort by number of seasons' tmcname='part12-02_seasons'>

Напишите функцию `sort_by_seasons(items: list)`, которая принимает список словарей в качестве аргумента. Каждый словарь содержит информацию об одном телешоу. Функция должна отсортировать этот список по количеству сезонов каждого шоу в порядке возрастания. Функция не должна изменять исходный список, а должна возвращать новый список.

Функция должна работать следующим образом:

```python
shows = [{ "name": "Dexter", "rating" : 8.6, "seasons":9 }, { "name": "Friends", "rating" : 8.9, "seasons":10 },  { "name": "Simpsons", "rating" : 8.7, "seasons":32 }  ]

for show in sort_by_seasons(shows):
    print(f"{show['name']} {show['seasons']} seasons")
```

<sample-output>
Dexter 9 seasons
Friends 10 seasons
Simpsons 32 seasons
</sample-output>

</programming-exercise>

<programming-exercise name='Sort by ratings' tmcname='part12-03_ratings'>

Напишите функцию `sort_by_ratings(items: list)`, которая принимает список словарей в качестве аргумента. Структура словарей идентична предыдущему упражнению. Эта функция должна отсортировать словари в _убывающем порядке на основе рейтингов шоу_. Функция не должна изменять исходный список, а должна возвращать новый список.

```python
shows = [{ "name": "Dexter", "rating" : 8.6, "seasons":9 }, { "name": "Friends", "rating" : 8.9, "seasons":10 },  { "name": "Simpsons", "rating" : 8.7, "seasons":32 }  ]

print("Rating according to IMDB")
for show in sort_by_ratings(shows):
    print(f"{show['name']}  {show['rating']}")
```

<sample-output>

Rating according to IMDB
Friends 8.9
Simpsons 8.7
Dexter 8.6

</sample-output>

</programming-exercise>

## Сортировка коллекций собственных объектов

Используя тот же принцип, давайте напишем программу, которая сортирует список объектов из нашего собственного класса `Student` двумя разными способами:

```python
class Student:
    """ The class models a single student """
    def __init__(self, name: str, id: str, credits: int):
        self.name = name
        self.id = id
        self.credits = credits

    def __str__(self):
        return f"{self.name} ({self.id}), {self.credits} cr."


def by_id(item: Student):
    return item.id

def by_credits(item: Student):
    return item.credits


if __name__ == "__main__":
    o1 = Student("Archie", "a123", 220)
    o2 = Student("Marvin", "m321", 210)
    o3 = Student("Anna", "a999", 131)

    students = [o1, o2, o3]

    print("Sort by id:")
    for student in sorted(students, key=by_id):
        print(student)

    print()

    print("Sort by credits:")
    for student in sorted(students, key=by_credits):
        print(student)
```

<sample-output>

Sort by id:
Archie (a123), 220 cr.
Anna (a999), 131 cr.
Marvin (m321), 210 cr.

Sort by credits:
Anna (a999), 131 cr.
Marvin (m321), 210 cr.
Archie (a123), 220 cr.

</sample-output>

Как вы можете видеть выше, сортировка по различным критериям работает именно так, как задумано. Если функции `by_id` и `by_credits` не нужны где-то еще, есть способы упростить реализацию. Мы вернемся к этой теме после этих упражнений.

<programming-exercise name='ClimbingRoute' tmcname='part12-04_climbing_route'>

Шаблон упражнения содержит определение класса для `ClimbingRoute` (Скалолазный маршрут). Он работает следующим образом:

```python
route1 = ClimbingRoute("Edge", 38, "6A+")
route2 = ClimbingRoute("Smooth operator", 11, "7A")
route3 = ClimbingRoute("Synchro", 14, "8C+")


print(route1)
print(route2)
print(route3.name, route3.length, route3.grade)
```

<sample-output>

Edge, length 38 metres, grade 6A+
Smooth operator, length 11 metres, grade 7A
Synchro 14 8C+

</sample-output>

## Сортировка по длине

Напишите функцию `sort_by_length(routes: list)`, которая возвращает новый список маршрутов, отсортированных по длине от самого длинного к самому короткому.

Функция должна работать следующим образом:

```python
r1 = ClimbingRoute("Edge", 38, "6A+")
r2 = ClimbingRoute("Smooth operator", 11, "7A")
r3 = ClimbingRoute("Synchro", 14, "8C+")
r4 = ClimbingRoute("Small steps", 12, "6A+")

routes = [r1, r2, r3, r4]

for route in sort_by_length(routes):
    print(route)
```

<sample-output>

Edge, length 38 metres, grade 6A+
Synchro, length 14 metres, grade 8C+
Small steps, length 12 metres, grade 6A+
Smooth operator, length 11 metres, grade 7A

</sample-output>

## Сортировка по сложности

Напишите функцию `sort_by_difficulty(routes: list)`, которая возвращает новый список маршрутов, отсортированных по сложности, то есть категории, от самого сложного к самому простому. Для маршрутов с одинаковой категорией более длинный является более сложным. Шкала категорий скалолазных маршрутов _4, 4+, 5, 5+, 6A, 6A+, ..._, которая на практике работает как алфавитный порядок для строк.

Функция должна работать следующим образом:

```python
r1 = ClimbingRoute("Edge", 38, "6A+")
r2 = ClimbingRoute("Smooth operator", 11, "7A")
r3 = ClimbingRoute("Synchro", 14, "8C+")
r4 = ClimbingRoute("Small steps", 12, "6A+")

routes = [r1, r2, r3, r4]
for route in sort_by_difficulty(routes):
    print(route)
```

<sample-output>

Synchro, length 14 metres, grade 8C+
Smooth operator, length 11 metres, grade 7A
Edge, length 38 metres, grade 6A+
Small steps, length 12 metres, grade 6A+

</sample-output>

**Подсказка:** если порядок основан на списке или кортеже, по умолчанию Python сортирует элементы сначала на основе первого элемента, затем на основе второго элемента и так далее:

```python
my_list = [("a", 4),("a", 2),("b", 30), ("b", 0) ]
print(sorted(my_list))
```

<sample-output>

[('a', 2), ('a', 4), ('b', 0), ('b', 30)]

</sample-output>

</programming-exercise>

<programming-exercise name='Climbing areas' tmcname='part12-05_climbing_areas'>

В дополнение к `ClimbingRoute` из предыдущего упражнения, шаблон упражнения содержит определение класса для `ClimbingArea` (Зона скалолазания).

```python
ca1 = ClimbingArea("Olhava")
ca1.add_route(ClimbingRoute("Edge", 38, "6A+"))
ca1.add_route(ClimbingRoute("Great cut", 36, "6B"))
ca1.add_route(ClimbingRoute("Swedish route", 42, "5+"))

ca2 = ClimbingArea("Nummi")
ca2.add_route(ClimbingRoute("Synchro", 14, "8C+"))

ca3 = ClimbingArea("Nalkkila slab")
ca3.add_route(ClimbingRoute("Small steps", 12, "6A+"))
ca3.add_route(ClimbingRoute("Smooth operator", 11, "7A"))
ca3.add_route(ClimbingRoute("Piggy not likey", 12 , "6B+"))
ca3.add_route(ClimbingRoute("Orchard", 8, "6A"))

print(ca1)
print(ca3.name, ca3.routes())
print(ca3.hardest_route())
```

<sample-output>

Olhava, 3 routes, hardest 6B
Nalkkila slab 4
Smooth operator, length 9 metres, grade 7A

</sample-output>

## Сортировка по количеству маршрутов

Напишите функцию `sort_by_number_of_routes`, которая сортирует зоны скалолазания в порядке возрастания на основе количества маршрутов в каждой из них.

```python
# ca1, ca2 and ca3 declared as above
areas = [ca1, ca2, ca3]
for area in sort_by_number_of_routes(areas):
    print(area)

```

<sample-output>

Nummi, 1 routes, hardest 8C+
Olhava, 3 routes, hardest 6B
Nalkkila slab, 4 routes, hardest 7A

</sample-output>

## Сортировка по самому сложному маршруту

Напишите функцию `sort_by_most_difficult`, которая сортирует зоны скалолазания в _убывающем_ порядке на основе самого сложного маршрута в каждой зоне.

```python
# ca1, ca2 and ca3 declared as above
areas = [ca1, ca2, ca3]
for area in sort_by_most_difficult(areas):
    print(area)
```

<sample-output>

Nummi, 1 routes, hardest 8C+
Nalkkila slab, 4 routes, hardest 7A
Olhava, 3 routes, hardest 6B

</sample-output>

</programming-exercise>

## Лямбда-выражения

Мы в основном работали с функциями с точки зрения модульности. Это верно, что функции играют важную роль в управлении сложностью ваших программ и предотвращении повторения кода. Функции обычно пишутся так, чтобы их можно было использовать много раз.

Но иногда вам нужно что-то похожее на функцию, которую вы будете использовать всего один раз. Лямбда-выражения позволяют создавать небольшие анонимные функции, которые создаются (и отбрасываются) по мере необходимости в коде. Общий синтаксис следующий:

`lambda <параметры> : <выражение>`

Сортировка списка кортежей по второму элементу в каждом кортеже будет выглядеть так при реализации с лямбда-выражением:

```python
products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

# Function is created "on the fly" with a lambda expression:
products.sort(key=lambda item: item[1])

for product in products:
    print(product)
```

<sample-output>

('apple', 3.95)
('orange', 4.5)
('watermelon', 4.95)
('banana', 5.95)

</sample-output>

Выражение

`lambda item: item[1]`

эквивалентно определению функции

```python
def price(item):
    return item[1]
```

за исключением того, что лямбда-функция не имеет имени. Поэтому лямбда-функции называются анонимными функциями.

Во всех остальных отношениях лямбда-функция ничем не отличается от любой другой функции, и они могут использоваться во всех тех же контекстах, что и любая эквивалентная именованная функция. Например, следующая программа сортирует список строк по алфавиту по _последнему_ символу в каждой строке:

```python
strings = ["Mickey", "Mack", "Marvin", "Minnie", "Merl"]

for word in sorted(strings, key=lambda word: word[-1]):
    print(word)
```

<sample-output>

Minnie
Mack
Merl
Marvin
Mickey

</sample-output>

Мы также можем комбинировать списочные выражения, метод `join` и лямбда-выражения. Например, мы могли бы сортировать строки только по гласным в них, игнорируя все остальные символы:

```python
strings = ["Mickey", "Mack", "Marvin", "Minnie", "Merl"]

for word in sorted(strings, key=lambda word: "".join([c for c in word if c in "aeiou"])):
    print(word)
```

<sample-output>

Mack
Marvin
Merl
Mickey
Minnie

</sample-output>

Анонимные функции также могут использоваться с другими встроенными функциями Python, а не только с теми, которые используются для сортировки. Например, функции `min` и `max` также принимают ключевой аргумент с именем `key`. Он используется как критерий для сравнения элементов при выборе минимального или максимального значения.

В следующем примере мы работаем с аудиозаписями. Сначала мы выбираем самую старую запись, а затем самую длинную:

```python

class Recording:
    """ The class models a single audio recording """
    def __init__(self, name: str, performer: str, year: int, runtime: int):
        self.name = name
        self.performer = performer
        self.year = year
        self.runtime = runtime


    def __str__(self):
        return f"{self.name} ({self.performer}), {self.year}. {self.runtime} min."

if __name__ == "__main__":
    r1 = Recording("Nevermind", "Nirvana", 1991, 43)
    r2 = Recording("Let It Be", "Beatles", 1969, 35)
    r3 = Recording("Joshua Tree", "U2", 1986, 50)

    recordings = [r1, r2, r3]


    print("The oldest recording:")
    print(min(recordings, key=lambda rec: rec.year))

    print("The longest recording:")
    print(max(recordings, key=lambda rec: rec.runtime))
```

<sample-output>

The oldest recording:
Let It Be (Beatles), 1969. 35 min.
The longest recording:
U2 (Joshua Tree), 1986. 50 min.

</sample-output>

<programming-exercise name='BallPlayers' tmcname='part12-06_ballplayers'>

Шаблон упражнения содержит определение класса с именем `BallPlayer` (Игрок в мяч). У него есть следующие открытые атрибуты:

* name (имя)
* номер майки `number`
* забитые голы `goals`
* выполненные передачи `assists`
* время игры в минутах `minutes`

Реализуйте следующие функции. НБ: каждая функция имеет различный тип возвращаемого значения.

## Больше всего голов

Напишите функцию `most_goals`, которая принимает список игроков в мяч в качестве аргумента.

Функция должна вернуть имя игрока, который забил больше всего голов, в строковом формате.

## Больше всего очков

Напишите функцию `most_points`, которая принимает список игроков в мяч в качестве аргумента.

Функция должна вернуть кортеж, содержащий имя и номер майки игрока, который набрал больше всего очков. Общее количество очков — это количество голов и количество передач вместе.

## Меньше всего минут

Напишите функцию `least_minutes`, которая принимает список игроков в мяч в качестве аргумента.

Функция должна вернуть объект `BallPlayer`, у которого наименьшее значение времени игры в минутах.

Вы можете протестировать свои функции с помощью следующей программы:

```python
if __name__ == "__main__":
    player1 = BallPlayer("Archie Bonkers", 13, 5, 12, 46)
    player2 = BallPlayer("Speedy Tickets", 7, 2, 26, 55)
    player3 = BallPlayer("Cruella De Hill", 9, 1, 32, 26)
    player4 = BallPlayer("Devilled Tasmanian", 12, 1, 11, 41)
    player5 = BallPlayer("Donald Quack", 4, 3, 9, 12)
    
    team = [player1, player2, player3, player4, player5]
    print(most_goals(team))
    print(most_points(team))
    print(least_minutes(team))
```

Это должно вывести:

<sample-output>

Archie Bonkers
('Cruella De Hill', 9)
BallPlayer(name=Donald Quack, number=4, goals=3, passes=9, minutes=12)

</sample-output>

</programming-exercise>

## Функции как аргументы внутри ваших собственных функций

Мы установили выше, что можно передать ссылку на функцию в качестве аргумента другой функции. Чтобы завершить этот раздел, давайте напишем нашу собственную функцию, которая принимает функцию в качестве аргумента.

```python
# the type hint "callable" refers to a function
def perform_operation(operation: callable):
    # Call the function which was passed as an argument
    return operation(10, 5)

def my_sum(a: int, b: int):
    return a + b

def my_product(a: int, b: int):
    return a * b


if __name__ == "__main__":
    print(perform_operation(my_sum))
    print(perform_operation(my_product))
    print(perform_operation(lambda x,y: x - y))

```

<sample-output>

15
50
5

</sample-output>

Значение, возвращаемое функцией `perform_operation`, зависит от того, какая функция была передана в качестве аргумента. Подойдёт любая функция, которая принимает два аргумента, независимо от того, анонимная она или именованная.

Передача ссылок на функции в качестве аргументов другим функциям может быть не тем, что вы будете делать ежедневно в своей программистской карьере, но это может быть полезной техникой. Следующая программа выбирает некоторые строки из одного файла и записывает их в другой файл. Способ выбора строк определяется функцией, которая возвращает `True`, только если строки должны быть скопированы:

```python
def copy_lines(source_file: str, target_file: str, criterion= lambda x: True):
    with open(source_file) as source, open(target_file, "w") as target:
        for line in source:
            # Remove any whitespace from beginning and end of line
            line = line.strip()

            if criterion(line):
                target.write(line + "\n")

# Some examples
if __name__ == "__main__":
    # If the third parameter is not given, copy all lines
    copy_lines("first.txt", "second.txt")

    # Copy all non-empty lines
    copy_lines("first.txt", "second.txt", lambda line: len(line) > 0)

    # Copy all lines which contain the word "Python"
    copy_lines("first.txt", "second.txt", lambda line: "Python" in line)

    # Copy all lines which do not end in a full stop
    copy_lines("first.txt", "second.txt", lambda line: line[-1] != ".")
```

Определение функции содержит значение по умолчанию для ключевого параметра `criterion`: `lambda x: True`. Эта анонимная функция всегда возвращает `True` независимо от входных данных. Таким образом, поведение по умолчанию — копировать все строки. Как обычно, если для параметра со значением по умолчанию задано значение, новое значение заменяет значение по умолчанию.

<programming-exercise name='Product search' tmcname='part12-07_product_search'>

Это упражнение имеет дело с продуктами, которые хранятся в кортежах. Все примеры предполагают переменную с именем `products`, которой присвоено следующее значение:

```python
products = [("banana", 5.95, 12), ("apple", 3.95, 3), ("orange", 4.50, 2), ("watermelon", 4.95, 22), ("kale", 0.99, 1)]
```

Каждый кортеж содержит три элемента: название, цена и количество.

Напишите функцию `search(products: list, criterion: callable)`. Второй аргумент функции — сама функция, и она должна быть способна обработать кортеж, как определено выше, и вернуть булево значение. Функция поиска должна вернуть новый список, содержащий те кортежи из исходного, которые соответствуют критерию.

Если мы хотели включить только товары, цена которых была меньше 4 евро, мы могли бы использовать следующую функцию критерия:

```python
def price_under_4_euros(product):
    return product[1] < 4
```

Функция возвращает `True`, если второй элемент в кортеже меньше четырёх по значению.

Пример использования функции `search`:

```python
for product in search(products, price_under_4_euros):
    print(product)
```

<sample-output>

('apple', 3.95, 3)
('kale', 0.99, 1)

</sample-output>

Функция критерия также может быть лямбда-функцией. Если мы хотели найти только те товары, количество которых составляет не менее 11, мы могли бы написать следующее:

```python
for product in search(products, lambda t: t[2]>10):
    print(product)
```

<sample-output>

('banana', 5.95, 12)
('watermelon', 4.95, 22)

</sample-output>

</programming-exercise>