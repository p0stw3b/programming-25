---
path: '/ru/part-10/1-class-hierarchies'
title: 'Иерархии классов'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После изучения этого раздела

- Вы узнаете, что означает наследование в контексте программирования
- Вы сможете писать классы, которые наследуют другие классы
- Вы узнаете, как наследование влияет на свойства в классах

</text-box>

## Специальные классы для специальных целей

Иногда вы сталкиваетесь с ситуацией, когда уже определили класс, но затем понимаете, что вам нужны специальные свойства в некоторых, но не во всех экземплярах класса. И наоборот, иногда вы понимаете, что определили два очень похожих класса с только незначительными различиями. Как программисты, мы стремимся всегда повторяться как можно меньше, сохраняя при этом ясность и читаемость. Итак, как мы можем приспособиться к различным реализациям по сути похожих объектов?

Рассмотрим два определения класса: `Student` и `Teacher`. Методы getter и setter пока оставлены для того, чтобы сделать пример короче.

```python

class Student:

    def __init__(self, name: str, id: str, email: str, credits: str):
        self.name = name
        self.id = id
        self.email = email
        self.credits = credits

class Teacher:

    def __init__(self, name: str, email: str, room: str, teaching_years: int):
        self.name = name
        self.email = email
        self.room = room
        self.teaching_years = teaching_years

```

Даже в упрощенном примере, как приведенный выше, у нас уже довольно много повторений: оба класса содержат атрибуты `name` и `email`. Было бы хорошей идеей иметь одно определение атрибута, чтобы одной функции было бы достаточно для редактирования обоих атрибутов.

Например, представьте, что адрес электронной почты школы изменился. Все адреса должны были бы быть обновлены. Мы _могли бы_ написать две отдельные версии по сути одной и той же функции:

```python

def update_email(o: Student):
    o.email = o.email.replace(".com", ".edu")

def update_email2(o: Teacher):
    o.email = o.email.replace(".com", ".edu")

```

Написание практически одного и того же дважды является ненужным повторением, не говоря уже о том, что это удваивает возможности для ошибок. Это было бы определенным улучшением, если бы мы могли использовать одну функцию для работы с экземплярами обоих классов.

Оба класса также имеют атрибуты, которые уникальны для них. Простое объединение _всех_ атрибутов в одном классе означало бы, что _все_ экземпляры класса тогда имели бы ненужные атрибуты, только разные для разных экземпляров. Это тоже не кажется идеальной ситуацией.

## Наследование

Объектно-ориентированные языки программирования обычно имеют технику, называемую _наследованием_. Класс может _наследовать_ свойства другого класса. В дополнение к этим унаследованным свойствам класс также может содержать свойства, которые уникальны для него.

Зная это, имело бы смысл для классов `Teacher` и `Student` иметь общий базовый или родительский класс `Person`:

```python

class Person:

    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

 ```

The new class contains those traits which are shared by the other two classes. Now `Student` and `Teacher` can _inherit_ these traits and add their own besides.

The syntax for inheritance simply involves adding the base class name in parentheses on the header line:

 ```python
class Person:

    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

    def update_email_domain(self, new_domain: str):
        old_domain = self.email.split("@")[1]
        self.email = self.email.replace(old_domain, new_domain)


class Student(Person):

    def __init__(self, name: str, id: str, email: str, credits: str):
        self.name = name
        self.id = id
        self.email = email
        self.credits = credits


class Teacher(Person):

    def __init__(self, name: str, email: str, room: str, teaching_years: int):
        self.name = name
        self.email = email
        self.room = room
        self.teaching_years = teaching_years

# Let's test our classes
if __name__ == "__main__":
    saul = Student("Saul Student", "1234", "saul@example.com", 0)
    saul.update_email_domain("example.edu")
    print(saul.email)

    tara = Teacher("Tara Teacher", "tara@example.fi", "A123", 2)
    tara.update_email_domain("example.ex")
    print(tara.email)

 ```

Both `Student` and `Teacher` inherit the `Person` class, so both have the traits defined in the `Person` class, including the method `update_email_domain`. The same method works for instances of both the derived classes.

Let's have a look at another example. We have a `Bookshelf` which inherits the class `BookContainer`:

 ```python
class Book:
    """ This class models a simple book """
    def __init__(self, name: str, author: str):
        self.name = name
        self.author = author


class BookContainer:
    """ This class models a container for books """

    def __init__(self):
        self.books = []

    def add_book(self, book: Book):
        self.books.append(book)

    def list_books(self):
        for book in self.books:
            print(f"{book.name} ({book.author})")


class Bookshelf(BookContainer):
    """ This class models a shelf for books """

    def __init__(self):
        super().__init__()

    def add_book(self, book: Book, location: int):
        self.books.insert(location, book)

 ```

The class `Bookshelf` contains the method `add_book`. A method with the same name is defined in the base class  `BookContainer`. This is called _overriding_: if a derived class has a method with the same name as the base class, the derived version overrides the original in instances of the derived class.

The idea in the example above is that a new book added to a BookContainer always goes to the top, but with a Bookshelf you can specify the location yourself. The method `list_books` works the same for both classes, as there is no overriding method in the derived class.

Let's try out these classes:

 ```python
if __name__ == "__main__":
    # Create some books for testing
    b1 = Book("Old Man and the Sea", "Ernest Hemingway")
    b2 = Book("Silent Spring", "Rachel Carson")
    b3 = Book("Pride and Prejudice", "Jane Austen")

    # Create a BookContainer and add the books
    container = BookContainer()
    container.add_book(b1)
    container.add_book(b2)
    container.add_book(b3)

    # Create a Bookshelf and add the books (always to the beginning)
    shelf = Bookshelf()
    shelf.add_book(b1, 0)
    shelf.add_book(b2, 0)
    shelf.add_book(b3, 0)


    # Tulostetaan
    print("Container:")
    container.list_books()

    print()

    print("Shelf:")
    shelf.list_books()
 ```

 <sample-output>

Container:
Old Man and the Sea (Ernest Hemingway)
Silent Spring (Rachel Carson)
Pride and Prejudice (Jane Austen)

Shelf:
Pride and Prejudice (Jane Austen)
Silent Spring (Rachel Carson)
Old Man and the Sea (Ernest Hemingway)

 </sample-output>

So, the Bookshelf class also has access to the `list_books` method. Through inheritance the method is a member of all the classes derived from the `BookContainer` class.

 ## Inheritance and scope of traits

A derived class inherits all traits from its base class. Those traits are directly accessible in the derived class, unless they have been defined as private in the base class (with two underscores before the name of the trait).

As the attributes of a Bookshelf are identical to a BookContainer, there was no need to rewrite the constructor of Bookshelf. We simply called the constructor of the base class:

 ```python
class Bookshelf(BookContainer):

    def __init__(self):
        super().__init__()

```

Any trait in the base class can be accessed from the derived class with the function `super()`. The `self` argument is left out from the method call, as Python adds it automatically.

But what if the attributes are not identical; can we still use the base class constructor in some way? Let's have a look at a class named `Thesis` which inherits the `Book` class. The derived class _can_ still call the constructor from the base class:

```python

class Book:
    """ This class models a simple book """

    def __init__(self, name: str, author: str):
        self.name = name
        self.author = author


class Thesis(Book):
    """ This class models a graduate thesis """

    def __init__(self, name: str, author: str, grade: int):
        super().__init__(name, author)
        self.grade = grade

```

The constructor in the `Thesis` class calls the constructor in the base class `Book` with the arguments for `name` and `author`. Additionally, the constructor in the derived class sets the value for the attribute `grade`. This naturally cannot be a part of the base class constructor, as the base class has no such attribute.

The above class can be used like this:

```python
if __name__ == "__main__":
    thesis = Thesis("Python and the Universe", "Peter Pythons", 3)

    # Print out the values of the attributes
    print(thesis.name)
    print(thesis.author)
    print(thesis.grade)

```

<sample-output>

Python and the Universe
Peter Pythons
3

</sample-output>

Итак, класс Bookshelf также имеет доступ к методу `list_books`. Через наследование метод является членом всех классов, производных от класса `BookContainer`.

## Наследование и область видимости свойств

Производный класс наследует все свойства от своего базового класса. Эти свойства напрямую доступны в производном классе, если только они не были определены как приватные в базовом классе (с двумя подчеркиваниями перед именем свойства).

Поскольку атрибуты Bookshelf идентичны BookContainer, не было необходимости переписывать конструктор Bookshelf. Мы просто вызвали конструктор базового класса:

```python
if __name__ == "__main__":
    card = BonusCard()
    card.add_product(Product("Bananas", 6.50))
    card.add_product(Product("Satsumas", 7.95))
    bonus = card.calculate_bonus()

    card2 = PlatinumCard()
    card2.add_product(Product("Bananas", 6.50))
    card2.add_product(Product("Satsumas", 7.95))
    bonus2 = card2.calculate_bonus()

    print(bonus)
    print(bonus2)
```

К любому свойству в базовом классе можно получить доступ из производного класса с помощью функции `super()`. Аргумент `self` опускается из вызова метода, поскольку Python добавляет его автоматически.

Но что, если атрибуты не идентичны; можем ли мы все еще использовать конструктор базового класса каким-то образом? Рассмотрим класс с именем `Thesis`, который наследует класс `Book`. Производный класс _может_ все еще вызвать конструктор из базового класса:

```python
laptop = LaptopComputer("NoteBook Pro15", 1500, 2)
print(laptop)
```

Конструктор в классе `Thesis` вызывает конструктор в базовом классе `Book` с аргументами для `name` и `author`. Дополнительно конструктор в производном классе устанавливает значение для атрибута `grade`. Это естественно не может быть частью конструктора базового класса, поскольку у базового класса нет такого атрибута.

Приведенный выше класс можно использовать так:

```python
museum = GameMuseum()
museum.add_game(ComputerGame("Pacman", "Namco", 1980))
museum.add_game(ComputerGame("GTA 2", "Rockstar", 1999))
museum.add_game(ComputerGame("Bubble Bobble", "Taito", 1986))
for game in museum.list_games():
    print(game.name)
```

<sample-output>

0.7225
0.7586250000000001

</sample-output>

Даже если производный класс _переопределяет_ метод в своем базовом классе, производный класс _все еще может_ вызвать переопределенный метод в базовом классе. В следующем примере у нас есть базовая `BonusCard` и специальная `PlatinumCard` для особенно лояльных клиентов. Метод `calculate_bonus` переопределен в производном классе, но переопределяющий метод вызывает базовый метод:

```python
rectangle = Rectangle(2, 3)
print(rectangle)
print("area:", rectangle.area())
```

Итак, бонус для PlatinumCard вычисляется путем вызова переопределенного метода в базовом классе, а затем добавления дополнительных 5 процентов к базовому результату. Пример того, как используются эти классы:

```python
square = Square(4)
print(square)
print("area:", square.area())
```

<sample-output>

NoteBook Pro15, 1500 MHz, 2 kg

</sample-output>

<programming-exercise name='Laptop computer' tmcname='part10-01_laptop_computer'>

Шаблон упражнения содержит определение класса для `Computer`, который имеет атрибуты `model` и `speed`.

Определите класс с именем `LaptopComputer`, который _наследует_ класс `Computer`. Конструктор нового класса должен принимать третий аргумент: `weight`, типа integer.

Также включите метод `__str__` в определение вашего класса. См. пример ниже для ожидаемого формата строкового представления, выводимого на печать.

```python
import random

class WordGame():
    def __init__(self, rounds: int):
        self.wins1 = 0
        self.wins2 = 0
        self.rounds = rounds

    def round_winner(self, player1_word: str, player2_word: str):
        # determine a random winner
        return random.randint(1, 2)

    def play(self):
        print("Word game:")
        for i in range(1, self.rounds+1):
            print(f"round {i}")
            answer1 = input("player1: ")
            answer2 = input("player2: ")

            if self.round_winner(answer1, answer2) == 1:
                self.wins1 += 1
                print("player 1 won")
            elif self.round_winner(answer1, answer2) == 2:
                self.wins2 += 1
                print("player 2 won")
            else:
                pass # it's a tie

        print("game over, wins:")
        print(f"player 1: {self.wins1}")
        print(f"player 2: {self.wins2}")
```

<sample-output>

Pacman
Bubble Bobble

</sample-output>

</programming-exercise>

<programming-exercise name='Game Museum' tmcname='part10-02_game_museum'>

Шаблон упражнения содержит определения классов для `ComputerGame` и `GameWarehouse`. Объект GameWarehouse используется для хранения объектов ComputerGame.

Ознакомьтесь с этими классами. Затем определите новый класс с именем `GameMuseum`, который наследует класс `GameWarehouse`.

Класс GameMuseum должен _переопределить_ метод `list_games()`, чтобы он возвращал список только тех игр, которые были сделаны до 1990 года.

Новый класс также должен иметь конструктор, который _вызывает конструктор из родительского класса `GameWarehouse`_. Конструктор не принимает аргументов.

Вы можете использовать следующий код для тестирования вашей реализации:

```python
p = WordGame(3)
p.play()
```

<sample-output>

rectangle 2x3
area: 6

</sample-output>

</programming-exercise>

<programming-exercise name='Areas' tmcname='part10-03_areas'>

Шаблон упражнения содержит определение класса для `Rectangle`. Он представляет [прямоугольную форму](https://en.wikipedia.org/wiki/Rectangle). Rectangle работает следующим образом:

```python
class LongestWord(WordGame):
    def __init__(self, rounds: int):
        super().__init__(rounds)

    def round_winner(self, player1_word: str, player2_word: str):
        # your code for determining the winner goes here
```

<sample-output>

square 4x4
area: 16

</sample-output>

## Square

Определите класс с именем `Square`, который наследует класс `Rectangle`. Стороны [квадрата](https://en.wikipedia.org/wiki/Square) имеют одинаковую длину, что делает квадрат специальным случаем прямоугольника. Новый класс не должен содержать никаких новых атрибутов.

Объект Square используется следующим образом:

```python
p = LongestWord(3)
p.play()
```

<sample-output>

Word game:
round 1
player1: **longword**
player2: **??**
player 2 won
round 2
player1: **i'm the best**
player2: **wut?**
player 1 won
round 3
player1: **who's gonna win**
player2: **me**
player 1 won
game over, wins:
player 1: 2
player 2: 1

</sample-output>

</programming-exercise>

<programming-exercise name='Word game' tmcname='part10-04_word_game'>

Шаблон упражнения содержит определение класса для `WordGame`. Он предоставляет базовую функциональность для игры в различные игры на основе слов:

```python
p = RockPaperScissors(4)
p.play()
```

Игра играется следующим образом:

```python
p = WordGame(3)
p.play()
```

<sample-output>

Word game:
round 1
player1: **short**
player2: **longword**
player 2 won
round 2
player1: **word**
player2: **wut?**
round 3
player1: **i'm the best**
player2: **no, me**
player 1 won
game over, wins:
player 1: 1
player 2: 1

</sample-output>

В этой "базовой" версии игры победитель определяется случайно. Ввод от игроков не влияет на результат.

## Самое длинное слово выигрывает

Определите класс с именем `LongestWord`. Это версия игры, где тот, кто вводит самое длинное слово в каждом раунде, выигрывает.

Новая версия игры реализуется _наследованием_ класса `WordGame`. Метод `round_winner` также должен быть подходящим образом переопределен. Набросок нового класса выглядит следующим образом:

```python
class LongestWord(WordGame):
    def __init__(self, rounds: int):
        super().__init__(rounds)

    def round_winner(self, player1_word: str, player2_word: str):
        # ваш код для определения победителя идет сюда
```

Пример того, как играется новая игра:

```python
p = LongestWord(3)
p.play()
```

<sample-output>

Word game:
round 1
player1: **rock**
player2: **rock**
round 2
player1: **rock**
player2: **paper**
player 2 won
round 3
player1: **scissors**
player2: **paper**
player 1 won
round 4
player1: **paper**
player2: **dynamite**
player 1 won
game over, wins:
player 1: 2
player 2: 1

</sample-output>

## Больше гласных выигрывает

Определите еще один класс WordGame с именем `MostVowels`. В этой версии игры тот, кто втиснул больше гласных в свое слово, выигрывает раунд.

## Камень ножницы бумага

Наконец, определите класс с именем `RockPaperScissors`, который позволяет играть в [камень ножницы бумага](https://en.wikipedia.org/wiki/Rock_paper_scissors).

Правила игры следующие:

- камень бьет ножницы (камень может сломать ножницы, но ножницы не могут разрезать камень)
- бумага бьет камень (бумага может покрыть камень)
- ножницы бьют бумагу (ножницы могут разрезать бумагу)

Если ввод от любого игрока неверен, он проигрывает раунд. Если оба игрока вводят что-то еще, чем _камень_, _бумага_ или _ножницы_, результат — ничья.

Пример того, как играется игра:

```python
p = RockPaperScissors(4)
p.play()
```

<sample-output>

Игра в слова:
раунд 1
игрок1: **камень**
игрок2: **камень**
раунд 2
игрок1: **камень**
игрок2: **бумага**
игрок 2 выиграл
раунд 3
игрок1: **ножницы**
игрок2: **бумага**
игрок 1 выиграл
раунд 4
игрок1: **бумага**
игрок2: **динамит**
игрок 1 выиграл
игра окончена, выигрыши:
игрок 1: 2
игрок 2: 1

</sample-output>

</programming-exercise>