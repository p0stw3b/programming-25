---
path: '/ru/part-10/3-oo-programming-techniques'
title: 'Техники объектно-ориентированного программирования'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После изучения этого раздела

- Вы познакомитесь с некоторыми различными применениями переменной `self`
- Вы узнаете, как перегружать операторы в ваших классах
- Вы сможете создавать итерируемый класс

</text-box>

Класс может содержать метод, который возвращает объект того же самого класса. Например, ниже у нас есть класс `Product`, чей метод `product_on_sale` возвращает новый объект Product с тем же именем, что и оригинал, но с ценой, которая на 25% ниже:

```python
class Product:
    def __init__(self, name: str, price: float):
        self.__name = name
        self.__price = price

    def __str__(self):
        return f"{self.__name} (price {self.__price})"

    def product_on_sale(self):
        on_sale = Product(self.__name, self.__price * 0.75)
        return on_sale
```

```python
apple1 = Product("Apple", 2.99)
apple2 = apple1.product_on_sale()
print(apple1)
print(apple2)
```

<sample-output>

Apple (price 2.99)
Apple (price 2.2425)

</sample-output>

Давайте вспомним назначение переменной `self`: внутри определения класса она ссылается на сам объект. Обычно она используется для ссылки на собственные свойства объекта, его атрибуты и методы. Переменная может использоваться для ссылки на весь объект, например, если сам объект должен быть возвращен клиентскому коду. В примере ниже мы добавили метод `cheaper` в определение класса. Он принимает другой Product в качестве аргумента и возвращает более дешевый из двух:

```python
class Product:
    def __init__(self, name: str, price: float):
        self.__name = name
        self.__price = price

    def __str__(self):
        return f"{self.__name} (price {self.__price})"

    @property
    def price(self):
        return self.__price

    def cheaper(self, Product):
        if self.__price < Product.price:
            return self
        else:
            return Product
```

```python
apple = Product("Apple", 2.99)
orange = Product("Orange", 3.95)
banana = Product("Banana", 5.25)

print(orange.cheaper(apple))
print(orange.cheaper(banana))
```

<sample-output>

Apple (2.99)
Orange (3.95)

</sample-output>

Хотя это работает прекрасно, это очень специализированный случай сравнения двух объектов. Было бы лучше, если бы мы могли использовать операторы сравнения Python напрямую на этих объектах `Product`.

## Перегрузка операторов

Python содержит некоторые специально названные встроенные методы для работы со стандартными арифметическими операторами и операторами сравнения. Техника называется _перегрузкой операторов_. Если вы хотите использовать определенный оператор на экземплярах самоопределенных классов, вы можете написать специальный метод, который возвращает правильный результат оператора. Мы уже использовали эту технику с методом `__str__`: Python знает, что нужно искать метод с таким именем, когда требуется строковое представление объекта.

Начнем с оператора `>`, который говорит нам, больше ли первый операнд второго. Определение класса `Product` ниже содержит метод `__gt__`, что является сокращением от *g*reater *t*han (больше чем). Этот специально названный метод должен вернуть правильный результат сравнения. В частности, он должен вернуть `True` тогда и только тогда, когда текущий объект больше объекта, переданного в качестве аргумента. Критерии, используемые, могут быть определены программистом. Под _текущим объектом_ мы понимаем объект, на котором вызывается метод с точечной `.` нотацией.

```python
class Product:
    def __init__(self, name: str, price: float):
        self.__name = name
        self.__price = price

    def __str__(self):
        return f"{self.__name} (price {self.__price})"

    @property
    def price(self):
        return self.__price

    def __gt__(self, another_product):
        return self.price > another_product.price
```

В реализации выше метод `__gt__` возвращает `True`, если цена текущего продукта больше цены продукта, переданного в качестве аргумента. В противном случае метод возвращает `False`.

Теперь оператор сравнения `>` доступен для использования с объектами типа Product:

```python
orange = Product("Orange", 2.90)
apple = Product("Apple", 3.95)

if orange > apple:
    print("Orange is greater")
else:
    print("Apple is greater")
```

<sample-output>

Apple is greater

</sample-output>

Как указано выше, программист определяет критерии, по которым решается, что больше, а что меньше. Мы могли бы, например, решить, что порядок должен основываться не на цене, а быть алфавитным по названию. Это означало бы, что `orange` теперь был бы "больше чем" `apple`, поскольку "orange" стоит в алфавитном порядке последним.

```python
class Product:
    def __init__(self, name: str, price: float):
        self.__name = name
        self.__price = price

    def __str__(self):
        return f"{self.__name} (price {self.__price})"

    @property
    def price(self):
        return self.__price

    @property
    def name(self):
        return self.__name

    def __gt__(self, another_product):
        return self.name > another_product.name
```

```python
Orange = Product("Orange", 4.90)
Apple = Product("Apple", 3.95)

if Orange > Apple:
    print("Orange is greater")
else:
    print("Apple is greater")
```

<sample-output>

Orange is greater

</sample-output>

## Больше операторов

Вот таблица, содержащая стандартные операторы сравнения, вместе с методами, которые нужно реализовать, если мы хотим сделать их доступными для использования на наших объектах:

Оператор | Традиционное значение | Название метода
:--:|:--:|:--:
`<` | Меньше чем | `__lt__(self, another)`
`>` | Больше чем | `__gt__(self, another)`
`==` | Равно | `__eq__(self, another)`
`!=` | Не равно | `__ne__(self, another)`
`<=` | Меньше или равно | `__le__(self, another)`
`>=` | Больше или равно | `__ge__(self, another)`

Вы также можете реализовать некоторые другие операторы, включая следующие арифметические операторы:

Оператор | Традиционное значение | Название метода
:--:|:--:|:--:
`+` | Сложение | `__add__(self, another)`
`-` | Вычитание | `__sub__(self, another)`
`*` | Умножение | `__mul__(self, another)`
`/` | Деление (результат с плавающей точкой) | `__truediv__(self, another)`
`//` | Деление (целочисленный результат) | `__floordiv__(self, another)`

Больше операторов и названий методов легко найти онлайн. Помните также команду `dir` для перечисления методов, доступных для использования на данном объекте.

Очень редко необходимо реализовывать все арифметические операторы и операторы сравнения в ваших собственных классах. Например, деление — это операция, которая редко имеет смысл вне числовых объектов. Каким был бы результат деления объекта Student на три или на другой объект Student? Тем не менее, некоторые из этих операторов часто очень полезны и с вашими собственными классами. Выбор методов для реализации зависит от того, что имеет смысл, зная свойства ваших объектов.

Рассмотрим класс, который моделирует одну заметку. Если мы реализуем метод `__add__` в нашем определении класса, оператор сложения `+` становится доступным на наших объектах Note:

```python
from datetime import datetime

class Note:
    def __init__(self, entry_date: datetime, entry: str):
        self.entry_date = entry_date
        self.entry = entry

    def __str__(self):
        return f"{self.entry_date}: {self.entry}"

    def __add__(self, another):
        # The date of the new note is the current time
        new_note = Note(datetime.now(), "")
        new_note.entry = self.entry + " and " + another.entry
        return new_note
```
        
```python
entry1 = Note(datetime(2016, 12, 17), "Remember to buy presents")
entry2 = Note(datetime(2016, 12, 23), "Remember to get a tree")

# These notes can be added together with the + operator
# This calls the  __add__ method in the Note class
both = entry1 + entry2
print(both)
```

<sample-output>

2020-09-09 14:13:02.163170: Remember to buy presents and Remember to get a tree

</sample-output>

## Строковое представление объекта

Вы уже реализовали довольно много методов `__str__` в ваших классах. Как вы знаете, метод возвращает строковое представление объекта. Другой довольно похожий метод — `__repr__`, который возвращает _техническое_ представление объекта. Метод `__repr__` часто реализуется так, чтобы он возвращал программный код, который может быть выполнен для возвращения объекта с _идентичным содержимым_ текущему объекту.

Функция `repr` возвращает это техническое строковое представление объекта. Техническое представление используется также всякий раз, когда метод `__str__` не был определен для объекта. Следующий пример прояснит это:

```python
class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age
        
    def __repr__(self):
        return f"Person({repr(self.name)}, {self.age})"
```

```python3
person1 = Person("Анна", 25)
person2 = Person("Петр", 99)
print(person1)
print(person2)
```

<sample-output>

Person('Anna', 25)
Person('Peter', 99)

</sample-output>

Заметьте, как метод `__repr__` сам использует функцию `repr` для получения технического представления строки. Это необходимо для включения символов `'` в результат.

Следующий класс имеет определения как для `__repr__`, так и для `__str__`:

```python
class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age
        
    def __repr__(self):
        return f"Person({repr(self.name)}, {self.age})"

    def __str__(self):
        return f"{self.name} ({self.age} years)"
```

```python3
Person = Person("Анна", 25)
print(Person)
print(repr(Person))
```

<sample-output>

Anna (25 years)
Person('Anna', 25)

</sample-output>

Стоит отметить, что со структурами данных, такими как списки, Python всегда использует метод `__repr__` для строкового представления содержимого. Это иногда может выглядеть немного сбивающе с толку:

```python3
persons = []
persons.append(Person("Анна", 25))
persons.append(Person("Петр", 99))
persons.append(Person("Мария", 55))
print(persons)
```

<sample-output>

[Person('Anna', 25), Person('Peter', 99), Person('Mary', 55)]

</sample-output>

<programming-exercise name='Money' tmcname='part10-07_money'>

Шаблон упражнения содержит набросок класса с именем `Money`. Это упражнение просит вас реализовать некоторые дополнительные методы и исправить некоторые небольшие проблемы в шаблоне.

## Исправьте строковое представление

Метод `__str__` в определении класса работает не совсем правильно. Учитывая следующие два объекта Money, последний выводится неправильно:

```python
e1 = Money(4, 10)
e2 = Money(2, 5)  # two euros and five cents

print(e1)
print(e2)
```

<sample-output>

4.10
2.5

</sample-output>

Исправьте метод так, чтобы он выводил

<sample-output>

4.10 eur
2.05 eur

</sample-output>

## Равные суммы

Определите новый метод с именем `__eq__(self, another)`, который позволяет использовать оператор сравнения `==` на объектах Money. Вы можете протестировать вашу реализацию следующим кодом:

```python
e1 = Money(4, 10)
e2 = Money(2, 5)
e3 = Money(4, 10)

print(e1)
print(e2)
print(e3)
print(e1 == e2)
print(e1 == e3)
```

<sample-output>

4.10 eur
2.05 eur
4.10 eur
False
True

</sample-output>

## Другие операторы сравнения

Реализуйте соответствующие методы для операторов сравнения `<`, `>` и `!=`.

```python
e1 = Money(4, 10)
e2 = Money(2, 5)

print(e1 != e2)
print(e1 < e2)
print(e1 > e2)
```

<sample-output>

True
False
True

</sample-output>

## Сложение и вычитание

Реализуйте операторы сложения и вычитания `+` и `-` для объектов Money. Оба должны возвращать новый объект типа Money. Ни сам объект, ни объект, переданный в качестве аргумента, не должны изменяться в результате.

Примечание: значение объекта Money не может быть отрицательным. Если попытка вычесть приведет к отрицательному результату, метод должен вызвать исключение `ValueError`.

```python
e1 = Money(4, 5)
e2 = Money(2, 95)

e3 = e1 + e2
e4 = e1 - e2

print(e3)
print(e4)

e5 = e2-e1
```

<sample-output>

7.00 eur
1.10 eur
Traceback (most recent call last):
  File "money.py", line 416, in <module>
    e5 = e2-e1
  File "money.py", line 404, in __sub__
    raise ValueError(f"a negative result is not allowed")
ValueError: a negative result is not allowed

</sample-output>

## Значение не должно быть напрямую доступным

У класса все еще есть небольшая проблема с целостностью. Пользователь может "схитрить", получив прямой доступ к атрибутам и изменив значение, хранящееся в объекте Money:

```python
print(e1)
e1.euros = 1000
print(e1)
```

<sample-output>

4.05 eur
1000.05 eur

</sample-output>

[Инкапсулируйте](/ru/part-9/3-encapsulation#encapsulation) реализацию атрибутов, определенных в классе, так чтобы обман, используемый выше, был невозможен. Класс не должен иметь публичных атрибутов и никаких методов getter или setter для евро или центов.

</programming-exercise>

<programming-exercise name='Simple date' tmcname='part10-08_simple_date'>

В этом упражнении вас просят реализовать класс `SimpleDate`, который позволяет обрабатывать даты. Для простоты мы предполагаем здесь, что _каждый месяц имеет 30 дней_.

Из-за этого упрощения вам не следует использовать модуль `datetime` из стандартной библиотеки Python. Вместо этого вы самостоятельно реализуете подобную функциональность.

## Сравнения

Реализуйте набросок класса вместе с методами, позволяющими сравнения с операторами `<`, `>`, `==` и `!=`. Вы можете использовать следующий код для тестирования вашей реализации:

```python
d1 = SimpleDate(4, 10, 2020)
d2 = SimpleDate(28, 12, 1985)
d3 = SimpleDate(28, 12, 1985)

print(d1)
print(d2)
print(d1 == d2)
print(d1 != d2)
print(d1 == d3)
print(d1 < d2)
print(d1 > d2)
```

<sample-output>

4.10.2020
28.12.1985
False
True
False
False
True

</sample-output>

## Увеличение

Реализуйте оператор сложения `+`, который позволяет добавить заданное количество дней к объекту SimpleDate. Оператор должен вернуть новый объект SimpleDate. Исходный объект не должен изменяться.

```python
d1 = SimpleDate(4, 10, 2020)
d2 = SimpleDate(28, 12, 1985)

d3 = d1 + 3
d4 = d2 + 400

print(d1)
print(d2)
print(d3)
print(d4)
```

<sample-output>

4.10.2020
28.12.1985
7.10.2020
8.2.1987

</sample-output>

## Разность

Реализуйте оператор вычитания `-`, который позволяет найти разность в днях между двумя объектами SimpleDate. Поскольку мы предположили, что каждый месяц имеет 30 дней, год в рамках этого упражнения составляет 12*30 = 360 дней.

Вы можете использовать следующий код для тестирования вашей программы:

```python
d1 = SimpleDate(4, 10, 2020)
d2 = SimpleDate(2, 11, 2020)
d3 = SimpleDate(28, 12, 1985)

print(d2-d1)
print(d1-d2)
print(d1-d3)
```

<sample-output>

28
28
12516

</sample-output>

</programming-exercise>

## Итераторы

Мы знаем, что оператор `for` может использоваться для _итерации_ через множество различных структур данных, файлов и коллекций элементов. Типичный случай использования — следующая функция:

```python

def count_positives(my_list: list):
    n = 0
    for item in my_list:
        if item > 0:
            n += 1
    return n

```

Функция проходит по элементам в списке один за другим и отслеживает, сколько элементов было положительными.

Возможно сделать ваши собственные классы итерируемыми тоже. Это полезно, когда основная цель класса включает хранение коллекции элементов. Класс Bookshelf из предыдущего примера был бы хорошим кандидатом, поскольку имело бы смысл использовать цикл `for` для прохода по книгам на полке. То же самое применимо к, скажем, студенческому реестру. Возможность итерироваться через коллекцию студентов может быть полезной.

Чтобы сделать класс итерируемым, вы должны реализовать методы итератора `__iter__` и `__next__`. Мы вернемся к специфике этих методов после следующего примера:

```python
class Book:
    def __init__(self, name: str, author: str, page_count: int):
        self.name = name
        self.author = author
        self.page_count = page_count

class Bookshelf:
    def __init__(self):
        self._books = []

    def add_book(self, book: Book):
        self._books.append(book)

    # This is the iterator initialization method
    # The iteration variable(s) should be initialized here
    def __iter__(self):
        self.n = 0
        # the method returns a reference to the object itself as 
        # the iterator is implemented within the same class definition
        return self

    # This method returns the next item within the object
    # If all items have been traversed, the StopIteration event is raised
    def __next__(self):
        if self.n < len(self._books):
            # Select the current item from the list within the object
            book = self._books[self.n]
            # increase the counter (i.e. iteration variable) by one
            self.n += 1
            # return the current item
            return book
        else:
            # All books have been traversed
            raise StopIteration
```

Метод `__iter__` инициализирует итерационную переменную или переменные. В этом случае достаточно иметь простой счетчик, содержащий индекс текущего элемента в списке. Нам также нужен метод `__next__`, который возвращает следующий элемент в итераторе. В примере выше метод возвращает элемент по индексу `n` из списка внутри объекта Bookshelf, и итерационная переменная также увеличивается.

Когда все объекты пройдены, метод `__next__` возбуждает исключение `StopIteration`. Процесс не отличается от возбуждения любых других исключений, но это исключение автоматически обрабатывается Python, и его цель — сигнализировать коду, вызывающему итератор (например, циклу `for`), что итерация теперь завершена.

Наш Bookshelf теперь готов для итерации, например, с циклом `for`:

```python
if __name__ == "__main__":
    b1 = Book("The Life of Python", "Montague Python", 123)
    b2 = Book("The Old Man and the C", "Ernest Hemingjavay", 204)
    b3 = Book("A Good Cup of Java", "Caffee Coder", 997)

    shelf = Bookshelf()
    shelf.add_book(b1)
    shelf.add_book(b2)
    shelf.add_book(b3)

    # Print the names of all the books
    for book in shelf:
        print(book.name)
```

<sample-output>

The Life of Python
The Old Man and the C
A Good Cup of Java

</sample-output>


<programming-exercise name='An iterable shopping list' tmcname='part10-09_iterable_shopping_list'>

Шаблон упражнения содержит класс `ShoppingList` из [упражнения в части 8](/ru/part-8/2-classes-and-objects#programming-exercise-shopping-list). Настройте класс так, чтобы он был итерируемым и, таким образом, мог использоваться следующим образом:

```python
shopping_list = ShoppingList()
shopping_list.add("bananas", 10)
shopping_list.add("apples", 5)
shopping_list.add("pineapple", 1)

for product in shopping_list:
    print(f"{product[0]}: {product[1]} units")
```

<sample-output>

bananas: 10 units
apples: 5 units
pineapple: 1 units

</sample-output>

Метод `__next__` вашего итератора должен возвращать кортежи, где первый элемент — название продукта, а второй элемент — количество.

</programming-exercise>