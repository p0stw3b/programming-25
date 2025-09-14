---
path: '/ru/part-8/3-defining-classes'
title: 'Определение классов'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела

- Вы будете знать, как определять свои собственные классы
- Вы сможете создавать объекты на основе классов, которые вы определили сами
- Вы будете знать, как написать конструктор
- Вы знакомы с именем параметра `self`
- Вы будете знать, что такое атрибуты и как они используются

</text-box>

Класс определяется с помощью ключевого слова `class`. Синтаксис следующий:

```python
class NameOfClass:
    # class defition goes here
```

Классы обычно именуются в _PascalCase_, также известном как _UpperCamelCase_. Это означает, что все слова в имени класса пишутся вместе, без пробелов, и каждое слово начинается с заглавной буквы. Следующие имена классов следуют этому соглашению:

* `Weekday`
* `BankAccount`
* `LibraryDatabase`
* `PythonCourseGrades`

Одно определение класса должно представлять одно единое целое, содержание которого должно быть атомарно связано вместе каким-то образом. В более сложных программах классы могут содержать члены других классов. Например, класс `Course` мог бы содержать объекты класса `Lecture`, `ExerciseSession` и т.д.

Давайте посмотрим на скелет определения класса. Функциональность пока отсутствует.

```python
class BankAccount:
    pass
```

Приведенный выше кусок кода говорит Python, что здесь мы определяем класс с именем `BankAccount`. Класс пока не содержит никакой функциональности, но мы все еще можем создать объект на основе класса.

Давайте посмотрим на программу, где две переменные добавляются к объекту `BankAccount`: `balance` и `owner`. Любые переменные, прикрепленные к объекту, называются его _атрибутами_, или более конкретно, _атрибутами данных_, или иногда _переменными экземпляра_.

К атрибутам, прикрепленным к объекту, можно обращаться через объект:

```python
class BankAccount:
    pass

peters_account = BankAccount()
peters_account.owner = "Peter Python"
peters_account.balance = 5.0

print(peters_account.owner)
print(peters_account.balance)
```

<sample-output>

Peter Python
5.0

</sample-output>

Атрибуты данных доступны только через объект, к которому они прикреплены. Каждый объект `BankAccount`, созданный на основе класса `BankAccount`, имеет свои собственные значения, прикрепленные к атрибутам данных. К этим значениям можно получить доступ, ссылаясь на рассматриваемый объект:

```python
account = BankAccount()
account.balance = 155.50

print(account.balance) # This refers to the data attribute balance attached to the account
print(balance) # THIS CAUSES AN ERROR, as there is no such independent variable available, and the object reference is missing
```

## Добавление конструктора

В приведенном выше примере мы видели, что новый экземпляр класса может быть создан путем вызова метода конструктора класса, как в: `ИмяКласса()`. Выше мы затем прикрепляли атрибуты данных к объекту отдельно, но часто более удобно передавать эти начальные значения атрибутов прямо при создании объекта. В приведенном выше примере у нас сначала был объект `BankAccount` без этих атрибутов, и атрибуты существовали только после того, как они были явно объявлены.

Объявление атрибутов вне конструктора приводит к ситуации, когда разные экземпляры одного и того же класса могут иметь разные атрибуты. Следующий код производит ошибку, потому что теперь у нас есть другой объект `BankAccount`, `paulas_account`, который не содержит тех же атрибутов:

```python
class BankAccount:
    pass

peters_account = BankAccount()
peters_account.owner = "Peter"
peters_account.balance = 1400

paulas_account = BankAccount()
paulas_account.owner = "Paula"

print(peters_account.balance)
print(paulas_account.balance) # THIS CAUSES AN ERROR
```

Итак, вместо объявления атрибутов после создания каждого экземпляра класса, обычно лучшая идея - инициализировать значения атрибутов при вызове конструктора класса. Поскольку определение класса `BankAccount` в настоящее время является просто скелетом, метод конструктора неявно предполагается интерпретатором Python, но возможно определить свои собственные методы конструктора, и именно это мы сейчас и сделаем.

Метод конструктора - это объявление метода со специальным именем `__init__`, обычно включаемое в самом начале определения класса.

Давайте посмотрим на класс `BankAccount` с добавленным методом конструктора:

```python
class BankAccount:

    # The constructor
    def __init__(self, balance: float, owner: str):
        self.balance = balance
        self.owner = owner
```

Имя метода конструктора всегда `__init__`. Обратите внимание на _два подчеркивания с обеих сторон_ слова `init`.

Первый параметр в определении конструктора всегда называется `self`. Это относится к самому объекту и необходимо для объявления любых атрибутов, прикрепленных к объекту. Присваивание

`self.balance = balance`

присваивает баланс, полученный в качестве аргумента, атрибуту balance объекта. Это общепринятое соглашение - использовать одинаковые имена переменных для параметров и атрибутов данных, определенных в конструкторе, но имена переменных `self.balance` и `balance` выше относятся к _двум разным переменным_:

* Переменная `self.balance` является атрибутом объекта. Каждый объект `BankAccount` имеет свой собственный баланс.

* Переменная `balance` является параметром в методе конструктора `__init__`. Ее значение устанавливается в значение, переданное в качестве аргумента методу при вызове конструктора (то есть когда создается новый экземпляр класса).

Теперь, когда мы определили параметры метода конструктора, мы можем передавать желаемые начальные значения атрибутов данных в качестве аргументов при создании нового объекта:

```python
class BankAccount:

    # The constructor
    def __init__(self, balance: float, owner: str):
        self.balance = balance
        self.owner = owner

# As the method is called, no argument should be given for the self parameter
# Python assigns the value for self automatically
peters_account = BankAccount(100, "Peter Python")
paulas_account = BankAccount(20000, "Paula Pythons")

print(peters_account.balance)
print(paulas_account.balance)
```

<sample-output>

100
20000

</sample-output>

Теперь гораздо легче работать с объектами `BankAccount`, поскольку значения можно передавать при создании объекта, и полученные два отдельных экземпляра можно обрабатывать более предсказуемо и единообразно. Объявление атрибутов данных в конструкторе также гарантирует, что атрибуты действительно объявлены, и желаемые начальные значения всегда даются программистом, использующим класс.

Все еще возможно изменить начальные значения атрибутов данных позже в программе:

```python
class BankAccount:

    # The constructor
    def __init__(self, balance: float, owner: str):
        self.balance = balance
        self.owner = owner

peters_account = BankAccount(100, "Peter Python")
print(peters_account.balance)

# Change the balance to 1500
peters_account.balance = 1500
print(peters_account.balance)

# Add 2000 to the balance
peters_account.balance += 2000
print(peters_account.balance)
```

<sample-output>

100
1500
3500

</sample-output>

Давайте посмотрим на другой пример классов и объектов. Мы напишем класс, который моделирует один розыгрыш лотерейных номеров:

```python
from datetime import date

class LotteryDraw:

    def __init__(self, round_week: int, round_date: date, numbers: list):
        self.round_week = round_week
        self.round_date = round_date
        self.numbers = numbers


# Create a new LotteryDraw object
round1 = LotteryDraw(1, date(2021, 1, 2), [1,4,8,12,13,14,33])

# Tulostetaan tiedot
print(round1.round_week)
print(round1.round_date)

for number in round1.numbers:
    print(number)
```

<sample-output>

1
2021-01-02
1
4
8
12
13
14
33

</sample-output>

Как видно выше, атрибуты могут быть любого типа. Здесь каждый объект LotteryDraw имеет атрибуты типа `list` и `date`.

<programming-exercise name='Book (Книга)' tmcname='part08-05_book'>

Напишите класс с именем `Book` с атрибутами `name`, `author`, `genre` и `year`, а также конструктор, который присваивает начальные значения этим атрибутам.

Ваш класс должен работать вот так:

```python
python = Book("Fluent Python", "Luciano Ramalho", "programming", 2015)
everest = Book("High Adventure", "Edmund Hillary", "autobiography", 1956)

print(f"{python.author}: {python.name} ({python.year})")
print(f"The genre of the book {everest.name} is {everest.genre}")
```

<sample-output>

Luciano Ramalho: Fluent Python (2015)
The genre of the book High Adventure is autobiography

</sample-output>

</programming-exercise>

<programming-exercise name='Three classes (Три класса)' tmcname='part08-06_three_classes'>

Напишите три класса, указанные ниже. Каждый класс должен иметь точно такие же имена и типы атрибутов, как указано.

Пожалуйста, также включите конструктор в каждый класс. Конструктор должен принимать начальные значения атрибутов в качестве аргументов в порядке, указанном ниже.

1. Класс Checklist
- атрибут header (строка)
- атрибут entries (список)

2. Класс Customer
- атрибут id (строка)
- атрибут balance (с плавающей точкой)
- атрибут discount (целое число)

3. Класс Cable
- атрибут model (строка)
- атрибут length (с плавающей точкой)
- атрибут max_speed (целое число)
- атрибут bidirectional (булево)

</programming-exercise>

## Использование объектов, сформированных из ваших собственных классов

Объекты, сформированные из ваших собственных определений классов, не отличаются от любых других объектов Python. Они могут передаваться как аргументы и возвращаемые значения, точно как любой другой объект. Мы могли бы, например, написать некоторые вспомогательные функции для работы с банковскими счетами:

```python
# this function creates a new bank account object and returns it
def open_account(name: str):
    new_account =  BankAccount(0, name)
    return new_account

# this function adds the amount passed as an argument to the balance of the bank account also passed as an argument
def deposit_money_on_account(account: BankAccount, amount: int):
    account.balance += amount

peters_account = open_account("Peter Python")
print(peters_account.balance)

deposit_money_on_account(peters_account, 500)

print(peters_account.balance)
```

<sample-output>

0
500

</sample-output>

<programming-exercise name='Define class: Pet (Определите класс: Домашний питомец)' tmcname='part08-07_pet'>

Определите класс `Pet`. Класс должен включать конструктор, который принимает начальные значения атрибутов `name`, `species` и `year_of_birth` в качестве аргументов, в этом конкретном порядке.

Также напишите функцию с именем `new_pet(name: str, species: str, year_of_birth: int)` _вне определения класса_. Функция должна создать и вернуть новый объект типа `Pet`, как определено в классе `Pet`.

Пример использования функции:

```python
fluffy = new_pet("Fluffy", "dog", 2017)
print(fluffy.name)
print(fluffy.species)
print(fluffy.year_of_birth)
```

<sample-output>

Fluffy
dog
2017

</sample-output>

</programming-exercise>

<programming-exercise name='The older book (Старшая книга)' tmcname='part08-08_older_book'>

Напишите функцию с именем `older_book(book1: Book, book2: Book)`, которая принимает два объекта типа `Book` в качестве аргументов. Функция должна вывести сообщение с деталями той, которая старше. Она должна вывести другое сообщение, если две книги были написаны в одном году. Пожалуйста, посмотрите примеры ниже.

```python
python = Book("Fluent Python", "Luciano Ramalho", "programming", 2015)
everest = Book("High Adventure", "Edmund Hillary", "autobiography", 1956)
norma = Book("Norma", "Sofi Oksanen", "crime", 2015)

older_book(python, everest)
older_book(python, norma)
```

<sample-output>

High Adventure is older, it was published in 1956
Fluent Python and Norma were published in 2015

</sample-output>

</programming-exercise>

<programming-exercise name='Books of a genre (Книги жанра)' tmcname='part08-09_books_of_genre'>

Напишите функцию с именем `books_of_genre(books: list, genre: str)`, которая принимает список объектов типа `Book` и строку, представляющую жанр, в качестве аргументов.

Функция должна вернуть _новый_ список, который содержит книги с желаемым жанром из исходного списка. Пожалуйста, посмотрите примеры ниже.

```python
python = Book("Fluent Python", "Luciano Ramalho", "programming", 2015)
everest = Book("High Adventure", "Edmund Hillary", "autobiography", 1956)
norma = Book("Norma", "Sofi Oksanen", "crime", 2015)

books = [python, everest, norma, Book("The Snowman", "Jo Nesbø", "crime", 2007)]

print("Books in the crime genre:")
for book in books_of_genre(books, "crime"):
    print(f"{book.author}: {book.name}")
```

<sample-output>

Books in the crime genre:
Sofi Oksanen: Norma
Jo Nesbø: The Snowman

</sample-output>

</programming-exercise>