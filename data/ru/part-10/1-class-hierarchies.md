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

Новый класс содержит те свойства, которые разделяются другими двумя классами. Теперь `Student` и `Teacher` могут _наследовать_ эти свойства и добавлять свои собственные кроме того.

Синтаксис для наследования просто включает добавление имени базового класса в скобки в строке заголовка:

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

# Давайте протестируем наши классы
if __name__ == "__main__":
    saul = Student("Саул Студент", "1234", "saul@example.com", 0)
    saul.update_email_domain("example.edu")
    print(saul.email)

    tara = Teacher("Тара Преподаватель", "tara@example.fi", "A123", 2)
    tara.update_email_domain("example.ex")
    print(tara.email)

```

И `Student`, и `Teacher` наследуют класс `Person`, поэтому оба имеют свойства, определенные в классе `Person`, включая метод `update_email_domain`. Один и тот же метод работает для экземпляров обоих производных классов.

Рассмотрим другой пример. У нас есть `Bookshelf`, который наследует класс `BookContainer`:

```python
class Book:
    """ Этот класс моделирует простую книгу """
    def __init__(self, name: str, author: str):
        self.name = name
        self.author = author


class BookContainer:
    """ Этот класс моделирует контейнер для книг """

    def __init__(self):
        self.books = []

    def add_book(self, book: Book):
        self.books.append(book)

    def list_books(self):
        for book in self.books:
            print(f"{book.name} ({book.author})")


class Bookshelf(BookContainer):
    """ Этот класс моделирует полку для книг """

    def __init__(self):
        super().__init__()

    def add_book(self, book: Book, location: int):
        self.books.insert(location, book)

```

Класс `Bookshelf` содержит метод `add_book`. Метод с тем же именем определен в базовом классе `BookContainer`. Это называется _переопределением_: если производный класс имеет метод с тем же именем, что и базовый класс, производная версия переопределяет оригинал в экземплярах производного класса.

Идея в приведенном выше примере заключается в том, что новая книга, добавленная в BookContainer, всегда идет наверх, но с Bookshelf вы можете указать место самостоятельно. Метод `list_books` работает одинаково для обоих классов, поскольку нет переопределяющего метода в производном классе.

Давайте попробуем эти классы:

```python
if __name__ == "__main__":
    # Создаем несколько книг для тестирования
    b1 = Book("Старик и море", "Эрнест Хемингуэй")
    b2 = Book("Безмолвная весна", "Рейчел Карсон")
    b3 = Book("Гордость и предубеждение", "Джейн Остин")

    # Создаем BookContainer и добавляем книги
    container = BookContainer()
    container.add_book(b1)
    container.add_book(b2)
    container.add_book(b3)

    # Создаем Bookshelf и добавляем книги (всегда в начало)
    shelf = Bookshelf()
    shelf.add_book(b1, 0)
    shelf.add_book(b2, 0)
    shelf.add_book(b3, 0)


    # Выводим
    print("Контейнер:")
    container.list_books()

    print()

    print("Полка:")
    shelf.list_books()
```

<sample-output>

Контейнер:
Старик и море (Эрнест Хемингуэй)
Безмолвная весна (Рейчел Карсон)
Гордость и предубеждение (Джейн Остин)

Полка:
Гордость и предубеждение (Джейн Остин)
Безмолвная весна (Рейчел Карсон)
Старик и море (Эрнест Хемингуэй)

</sample-output>

Итак, класс Bookshelf также имеет доступ к методу `list_books`. Через наследование метод является членом всех классов, производных от класса `BookContainer`.

## Наследование и область видимости свойств

Производный класс наследует все свойства от своего базового класса. Эти свойства напрямую доступны в производном классе, если только они не были определены как приватные в базовом классе (с двумя подчеркиваниями перед именем свойства).

Поскольку атрибуты Bookshelf идентичны BookContainer, не было необходимости переписывать конструктор Bookshelf. Мы просто вызвали конструктор базового класса:

```python
class Bookshelf(BookContainer):

    def __init__(self):
        super().__init__()

```

К любому свойству в базовом классе можно получить доступ из производного класса с помощью функции `super()`. Аргумент `self` опускается из вызова метода, поскольку Python добавляет его автоматически.

Но что, если атрибуты не идентичны; можем ли мы все еще использовать конструктор базового класса каким-то образом? Рассмотрим класс с именем `Thesis`, который наследует класс `Book`. Производный класс _может_ все еще вызвать конструктор из базового класса:

```python

class Book:
    """ Этот класс моделирует простую книгу """

    def __init__(self, name: str, author: str):
        self.name = name
        self.author = author


class Thesis(Book):
    """ Этот класс моделирует дипломную работу """

    def __init__(self, name: str, author: str, grade: int):
        super().__init__(name, author)
        self.grade = grade

```

Конструктор в классе `Thesis` вызывает конструктор в базовом классе `Book` с аргументами для `name` и `author`. Дополнительно конструктор в производном классе устанавливает значение для атрибута `grade`. Это естественно не может быть частью конструктора базового класса, поскольку у базового класса нет такого атрибута.

Приведенный выше класс можно использовать так:

```python
if __name__ == "__main__":
    thesis = Thesis("Python и Вселенная", "Петр Питонс", 3)

    # Выводим значения атрибутов
    print(thesis.name)
    print(thesis.author)
    print(thesis.grade)

```

<sample-output>

Python и Вселенная
Петр Питонс
3

</sample-output>

Даже если производный класс _переопределяет_ метод в своем базовом классе, производный класс _все еще может_ вызвать переопределенный метод в базовом классе. В следующем примере у нас есть базовая `BonusCard` и специальная `PlatinumCard` для особенно лояльных клиентов. Метод `calculate_bonus` переопределен в производном классе, но переопределяющий метод вызывает базовый метод:

```python

class Product:

    def __init__(self, name: str, price: float):
        self.name = name
        self.price = price

class BonusCard:

    def __init__(self):
        self.products_bought = []

    def add_product(self, product: Product):
        self.products_bought.append(product)

    def calculate_bonus(self):
        bonus = 0
        for product in self.products_bought:
            bonus += product.price * 0.05

        return bonus

class PlatinumCard(BonusCard):

    def __init__(self):
        super().__init__()

    def calculate_bonus(self):
        # Вызов метода в базовом классе
        bonus = super().calculate_bonus()

        # ...и добавление пяти процентов к итогу
        bonus = bonus * 1.05
        return bonus
```

Итак, бонус для PlatinumCard вычисляется путем вызова переопределенного метода в базовом классе, а затем добавления дополнительных 5 процентов к базовому результату. Пример того, как используются эти классы:

```python
if __name__ == "__main__":
    card = BonusCard()
    card.add_product(Product("Бананы", 6.50))
    card.add_product(Product("Мандарины", 7.95))
    bonus = card.calculate_bonus()

    card2 = PlatinumCard()
    card2.add_product(Product("Бананы", 6.50))
    card2.add_product(Product("Мандарины", 7.95))
    bonus2 = card2.calculate_bonus()

    print(bonus)
    print(bonus2)
```

<sample-output>

0.7225
0.7586250000000001

</sample-output>

<programming-exercise name='Laptop computer' tmcname='part10-01_laptop_computer'>

Шаблон упражнения содержит определение класса для `Computer`, который имеет атрибуты `model` и `speed`.

Определите класс с именем `LaptopComputer`, который _наследует_ класс `Computer`. Конструктор нового класса должен принимать третий аргумент: `weight`, типа integer.

Также включите метод `__str__` в определение вашего класса. См. пример ниже для ожидаемого формата строкового представления, выводимого на печать.

```python
laptop = LaptopComputer("NoteBook Pro15", 1500, 2)
print(laptop)
```

<sample-output>

NoteBook Pro15, 1500 MHz, 2 kg

</sample-output>

</programming-exercise>

<programming-exercise name='Game Museum' tmcname='part10-02_game_museum'>

Шаблон упражнения содержит определения классов для `ComputerGame` и `GameWarehouse`. Объект GameWarehouse используется для хранения объектов ComputerGame.

Ознакомьтесь с этими классами. Затем определите новый класс с именем `GameMuseum`, который наследует класс `GameWarehouse`.

Класс GameMuseum должен _переопределить_ метод `list_games()`, чтобы он возвращал список только тех игр, которые были сделаны до 1990 года.

Новый класс также должен иметь конструктор, который _вызывает конструктор из родительского класса `GameWarehouse`_. Конструктор не принимает аргументов.

Вы можете использовать следующий код для тестирования вашей реализации:

```python
museum = GameMuseum()
museum.add_game(ComputerGame("Pacman", "Namco", 1980))
museum.add_game(ComputerGame("GTA 2", "Rockstar", 1999))
museum.add_game(ComputerGame("Bubble Bobble", "Taito", 1986))
for game in museum.list_games():
    print(game.name)
```

<sample-output>

Pacman
Bubble Bobble

</sample-output>

</programming-exercise>

<programming-exercise name='Areas' tmcname='part10-03_areas'>

Шаблон упражнения содержит определение класса для `Rectangle`. Он представляет [прямоугольную форму](https://en.wikipedia.org/wiki/Rectangle). Rectangle работает следующим образом:

```python
rectangle = Rectangle(2, 3)
print(rectangle)
print("площадь:", rectangle.area())
```

<sample-output>

rectangle 2x3
площадь: 6

</sample-output>

## Square

Определите класс с именем `Square`, который наследует класс `Rectangle`. Стороны [квадрата](https://en.wikipedia.org/wiki/Square) имеют одинаковую длину, что делает квадрат специальным случаем прямоугольника. Новый класс не должен содержать никаких новых атрибутов.

Объект Square используется следующим образом:

```python
square = Square(4)
print(square)
print("площадь:", square.area())
```

<sample-output>

square 4x4
площадь: 16

</sample-output>

</programming-exercise>

<programming-exercise name='Word game' tmcname='part10-04_word_game'>

Шаблон упражнения содержит определение класса для `WordGame`. Он предоставляет базовую функциональность для игры в различные игры на основе слов:

```python
import random

class WordGame():
    def __init__(self, rounds: int):
        self.wins1 = 0
        self.wins2 = 0
        self.rounds = rounds

    def round_winner(self, player1_word: str, player2_word: str):
        # определить случайного победителя
        return random.randint(1, 2)

    def play(self):
        print("Игра в слова:")
        for i in range(1, self.rounds+1):
            print(f"раунд {i}")
            answer1 = input("игрок1: ")
            answer2 = input("игрок2: ")

            if self.round_winner(answer1, answer2) == 1:
                self.wins1 += 1
                print("игрок 1 выиграл")
            elif self.round_winner(answer1, answer2) == 2:
                self.wins2 += 1
                print("игрок 2 выиграл")
            else:
                pass # это ничья

        print("игра окончена, выигрыши:")
        print(f"игрок 1: {self.wins1}")
        print(f"игрок 2: {self.wins2}")
```

Игра играется следующим образом:

```python
p = WordGame(3)
p.play()
```

<sample-output>

Игра в слова:
раунд 1
игрок1: **длинноеслово**
игрок2: **??**
игрок 2 выиграл
раунд 2
игрок1: **я лучший**
игрок2: **что?**
игрок 1 выиграл
раунд 3
игрок1: **кто выиграет**
игрок2: **я**
игрок 1 выиграл
игра окончена, выигрыши:
игрок 1: 2
игрок 2: 1

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

Игра в слова:
раунд 1
игрок1: **короткое**
игрок2: **длинноеслово**
игрок 2 выиграл
раунд 2
игрок1: **слово**
игрок2: **что?**
раунд 3
игрок1: **я лучший**
игрок2: **нет, я**
игрок 1 выиграл
игра окончена, выигрыши:
игрок 1: 1
игрок 2: 1

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