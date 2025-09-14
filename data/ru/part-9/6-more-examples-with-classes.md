---
path: '/ru/part-9/6-more-examples-with-classes'
title: 'Больше примеров с классами'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После изучения этого раздела

- Вы познакомитесь с еще несколькими примерами классов и объектов
- Вы сможете использовать значения по умолчанию для параметров в ваших методах

</text-box>

Следующий пример состоит из двух классов. Класс `Point` является моделью для точки в двумерном пространстве. Класс `Line` является моделью для отрезка между двумя точками. Код ниже прокомментирован; пожалуйста, прочитайте комментарии, чтобы понять, как работают классы.

```python
import math

class Point:
    """ The class represents a point in two-dimensional space """

    def __init__(self, x: float, y: float):
        # These attributes are public because any value is acceptable for x and y
        self.x = x
        self.y = y

    # This class method returns a new Point at origo (0, 0)
    # It is possible to return a new instance of the class from within the class
    @classmethod
    def origo(cls):
        return Point(0, 0)

    # This class method creates a new Point based on an existing Point
    # The original Point can be mirrored on either or both of the x and y axes
    # For example, the Point (1, 3) mirrored on the x-axis is (1, -3)
    @classmethod
    def mirrored(cls, point: "Point", mirror_x: bool, mirror_y: bool):
        x = point.x
        y = point.y
        if mirror_x:
            y = -y
        if mirror_y:
            x = -x

        return Point(x, y)

    def __str__(self):
        return f"({self.x}, {self.y})"


class Line:
    """ The class represents a line segment in two-dimensional space """

    def __init__(self, beginning: Point, end: Point):
        # These attributes are public because any two Points are acceptable
        self.beginning = beginning
        self.end = end

    # This method uses the Pythagorean theorem to calculate the length of the line segment
    def length(self):
        sum_of_squares = (self.end.x - self.beginning.x) ** 2 + (self.end.y - self.beginning.y) ** 2
        return math.sqrt(sum_of_squares)

    # This method returns the Point in the middle of the line segment
    def centre_point(self):
        centre_x = (self.beginning.x + self.end.x) / 2
        centre_y = (self.beginning.y + self.end.y) / 2
        return Point(centre_x, centre_y)

    def __str__(self):
        return f"{self.beginning} ... {self.end}"
```

```python
point = Point(1,3)
print(point)

origo = Point.origo()
print(origo)

point2 = Point.mirrored(point, True, True)
print(point2)

line = Line(point, point2)
print(line.length())
print(line.centre_point())
print(line)
```

<sample-output>

(1, 3)
(0, 0)
(-1, -3)
6.324555320336759
(0.0, 0.0)
(1, 3) ... (-1, -3)

</sample-output>

## Значения по умолчанию параметров

В программировании Python вы можете обычно устанавливать значение по умолчанию для любого параметра. Значения по умолчанию могут быть использованы как в функциях, так и в методах.

Если у параметра есть значение по умолчанию, вам не нужно включать значение в качестве аргумента при вызове функции. Если аргумент предоставлен, значение по умолчанию игнорируется. Если нет, используется значение по умолчанию.

Значения по умолчанию часто используются в конструкторах. Если можно ожидать, что не вся информация доступна при создании объекта, лучше включить значение по умолчанию в определение метода-конструктора, чем заставлять клиента заботиться об этой проблеме. Это делает использование класса проще с точки зрения клиента, но также обеспечивает целостность объекта. Например, с установленным значением по умолчанию мы можем быть уверены, что "пустое" значение всегда одинаково, если только клиент специально не хочет предоставить что-то другое. Если значение по умолчанию не установлено, клиент должен предоставить "пустое" значение. Это может быть, например, пустая строка `""`, специальный пустой объект `None` или строка `"не установлено"`.

Рассмотрим еще один класс, представляющий студента. При создании нового объекта Student клиент должен предоставить имя и номер студента. Номер студента приватный и не должен изменяться позже. Дополнительно объект Student имеет атрибуты для учебных кредитов и заметок, которые имеют значения по умолчанию в конструкторе. Новые значения могут быть переданы как аргументы в конструктор, но они также могут быть пропущены, чтобы вместо них использовались значения по умолчанию. Пожалуйста, изучите комментарии в коде, чтобы лучше понять, что делает каждый метод.

```python
class Student:
    """ This class models a student """

    def __init__(self, name: str, student_number: str, credits: int = 0, notes: str = ""):
        # calling the setter method for the name attribute
        self.name = name

        if len(student_number) < 5:
            raise ValueError("A student number should have at least five characters")

        self.__student_number = student_number

        # calling the setter method for the credits attribute
        self.credits = credits

        self.__notes = notes

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, name):
        if name != "":
            self.__name = name
        else:
            raise ValueError("The name cannot be an empty string")

    @property
    def student_number(self):
        return self.__student_number

    @property
    def credits(self):
        return self.__credits

    @credits.setter
    def credits(self, op):
        if op >= 0:
            self.__credits = op
        else:
            raise ValueError("The number of study credits cannot be below zero")

    @property
    def notes(self):
        return self.__notes

    @notes.setter
    def notes(self, notes):
        self.__notes = notes

    def summary(self):
        print(f"Student {self.__name} ({self.student_number}):")
        print(f"- credits: {self.__credits}")
        print(f"- notes: {self.notes}")
```

```python
# Passing only the name and the student number as arguments to the constructor
student1 = Student("Sally Student", "12345")
student1.summary()

# Passing the name, the student number and the number of study credits
student2 = Student("Sassy Student", "54321", 25)
student2.summary()

# Passing values for all the parameters
student3 = Student("Saul Student", "99999", 140, "extra time in exam")
student3.summary()

# Passing a value for notes, but not for study credits
# NB: the parameter must be named now that the arguments are not in order
student4 = Student("Sandy Student", "98765", notes="absent in academic year 20-21")
student4.summary()
```

<sample-output>

Student Sally Student (12345):
- credits: 0
- notes:
Student Sassy Student (54321):
- credits: 25
- notes:
Student Saul Student (99999):
- credits: 140
- notes: extra time in exam
Student Sandy Student (98765):
- credits: 0
- notes: absent in academic year 20-21

</sample-output>

Примечание: нет метода сеттера для атрибута `student_number`, поскольку номер студента не должен изменяться.

Есть одна довольно значительная загвоздка при использовании значений по умолчанию для параметров. Следующий пример, моделирующий еще один вид студента, прольет больше света на это:

```python
class Student:
    def __init__(self, name, completed_courses=[]):
        self.name = name
        self.completed_courses = completed_courses

    def add_course(self, course):
        self.completed_courses.append(course)
```

```python
student1 = Student("Sally Student")
student2 = Student("Sassy Student")

student1.add_course("ItP")
student1.add_course("ACiP")

print(student1.completed_courses)
print(student2.completed_courses)
```

<sample-output>

['ItP', 'ACiP']
['ItP', 'ACiP']

</sample-output>

Добавление завершенных курсов в список Салли также добавляет эти курсы в список Сэсси. Фактически, это точно один и тот же список, поскольку Python повторно использует ссылку, хранящуюся в значении по умолчанию. Создание двух новых объектов Student в приведенном выше примере эквивалентно следующему:

```python
courses = []
student1 = Student("Sally Student", courses)
student2 = Student("Sassy Student", courses)
```

Значения по умолчанию параметров никогда не должны быть экземплярами более сложных, изменяемых структур данных, таких как списки. Проблему можно обойти, внеся следующие изменения в конструктор класса `Student`:

```python
class Student:
    def __init__(self, name, completed_courses=None):
        self.name = name
        if completed_courses is None:
            self.completed_courses = []
        else:
            self.completed_courses = completed_courses

    def add_course(self, course):
        self.completed_courses.append(course)
```

```python
student1 = Student("Sally Student")
student2 = Student("Sassy Student")

student1.add_course("ItP")
student1.add_course("ACiP")

print(student1.completed_courses)
print(student2.completed_courses)
```

<sample-output>

['ItP', 'ACiP']
[]

</sample-output>

## Большой финал

Даже если следующее упражнение завершает эту часть материала, техники, необходимые для его решения, уже все были рассмотрены в разделе с названием [объекты как атрибуты](/ru/part-9/2-objects-as-attributes). В частности, от вас не требуется использовать декоратор `@property` или значения по умолчанию для параметров в этом упражнении. Это упражнение очень похоже на упражнения [коробка подарков](/ru/part-9/2-objects-as-attributes#programming-exercise-a-box-of-presents) и [самый низкий человек в комнате](/ru/part-9/2-objects-as-attributes#programming-exercise-the-shortest-person-in-the-room).

#### Важная информация касательно следующего упражнения
Обратите внимание, что есть проблема, вызванная обновлением Python, которая конфликтует с встроенной библиотекой и исходным именем файла для этого упражнения. Если у вас возникают проблемы, мы рекомендуем повторно скачать папку упражнения. Получив новые локальные тестовые файлы, вы можете использовать либо "code.py", либо "code_1.py" в качестве имени файла. При использовании Visual Studio Code вы можете получать уведомления о проблемах в тестовом файле. Однако эти уведомления можно безопасно игнорировать, поскольку они вызваны неспособностью теста импортировать из файлов "code.py" или "code_1.py".

<programming-exercise name='Item, Suitcase and Cargo hold' tmcname='part09-15_item_suitcase_hold'>

В этой серии упражнений вы создадите классы `Item`, `Suitcase` и `Cargo Hold`, которые позволят вам дополнительно попрактиковаться в работе с объектами, которые содержат ссылки на другие объекты.

## Item

Создайте класс с именем `Item`, который используется для создания предметов различных видов. Каждый предмет имеет название и вес (в килограммах).

Вы можете использовать следующий код для тестирования класса:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)

print("Name of the book:", book.name())
print("Weight of the book:", book.weight())

print("Book:", book)
print("Phone:", phone)
```

Ваша программа должна вывести это:

<sample-output>

Name of the book: ABC Book
Weight of the book: 2
Book: ABC Book (2 kg)
Phone: Nokia 3210 (1 kg)

</sample-output>

`Item` должен предоставлять методы `weight` и `name`, которые возвращают значения, хранящиеся в этих атрибутах.

Имя и вес должны быть инкапсулированы внутри класса. Следующий код не должен работать:

```python
book = Item("ABC Book", 2)
book.weight = 10
```

## Suitcase

Напишите класс с именем `Suitcase`. Вы должны иметь возможность упаковывать предметы в чемодан. У чемодана также есть максимальный общий вес для предметов, хранящихся внутри.

Ваш класс должен содержать следующие элементы:

- конструктор, который принимает максимальный вес в качестве аргумента
- метод с именем `add_item`, который добавляет предмет, переданный в качестве аргумента, в чемодан. Метод не имеет возвращаемого значения.
- метод `__str__`, который возвращает строку в формате "x items (y kg)"

Класс должен убедиться, что общий вес предметов, хранящихся в любом `Suitcase`, не превышает максимальный вес, установленный для этого экземпляра. Если максимальный вес будет превышен при вызове метода `add_item`, новый предмет не должен быть добавлен в чемодан.

Ваш класс должен работать следующим образом:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

suitcase = Suitcase(5)
print(suitcase)

suitcase.add_item(book)
print(suitcase)

suitcase.add_item(phone)
print(suitcase)

suitcase.add_item(brick)
print(suitcase)
```

Выполнение приведенного выше должно вывести

<sample-output>

0 items (0 kg)
1 items (2 kg)
2 items (3 kg)
2 items (3 kg)

</sample-output>

## Следите за языком

Уведомление "1 items" не очень грамматично. Вместо этого должно быть "1 item". Внесите необходимые изменения в ваш метод `__str__`.

Предыдущий пример теперь должен выводить

<sample-output>

0 items (0 kg)
1 item (2 kg)
2 items (3 kg)
2 items (3 kg)

</sample-output>

## Все предметы

Добавьте следующие методы в определение класса `Suitcase`:

- `print_items` выводит все предметы, хранящиеся в чемодане
- `weight` возвращает целое число, представляющее общий вес всех предметов, хранящихся в чемодане

Ваш класс теперь должен работать с следующей программой:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

suitcase = Suitcase(10)
suitcase.add_item(book)
suitcase.add_item(phone)
suitcase.add_item(brick)

print("The suitcase contains the following items:")
suitcase.print_items()
combined_weight = suitcase.weight()
print(f"Combined weight: {combined_weight} kg")
```

Выполнение приведенной выше программы должно вывести это:

<sample-output>

The suitcase contains the following items:
ABC Book (2 kg)
Nokia 3210 (1 kg)
Brick (4 kg)
Combined weight: 7 kg

</sample-output>

Если вы реализовали ваш класс `Suitcase` с более чем двумя переменными экземпляра, внесите необходимые изменения так, чтобы каждый экземпляр имел только два атрибута данных: максимальный вес и список предметов внутри.

## Самый тяжелый предмет

Добавьте новый метод в ваш класс `Suitcase`: `heaviest_item` должен вернуть `Item`, который является самым тяжелым. Если есть два или более предметов с одинаковым, самым тяжелым весом, метод может вернуть любой из них. Метод должен вернуть ссылку на объект. Если чемодан пустой, метод должен вернуть `None`.

Ваш класс теперь должен работать с следующей программой:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

suitcase = Suitcase(10)
suitcase.add_item(book)
suitcase.add_item(phone)
suitcase.add_item(brick)

heaviest = suitcase.heaviest_item()
print(f"The heaviest item: {heaviest}")
```

Выполнение приведенной выше программы должно вывести это:

<sample-output>

The heaviest item: Brick (4 kg)

</sample-output>

## Грузовой отсек

Напишите класс с именем `CargoHold` со следующими методами:

- конструктор, который принимает максимальный вес в качестве аргумента
- метод с именем `add_suitcase`, который добавляет чемодан, переданный в качестве аргумента, в грузовой отсек
- метод `__str__`, который возвращает строку в формате "x suitcases, space for y kg"

Класс должен убедиться, что общий вес предметов, хранящихся в любом `CargoHold`, не превышает максимальный вес, установленный для этого экземпляра. Если максимальный вес будет превышен при вызове метода `add_suitcase`, новый чемодан не должен быть добавлен в грузовой отсек.

Ваш класс теперь должен работать с следующей программой:

```python
cargo_hold = CargoHold(1000)
print(cargo_hold)

book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

adas_suitcase = Suitcase(10)
adas_suitcase.add_item(book)
adas_suitcase.add_item(phone)

peters_suitcase = Suitcase(10)
peters_suitcase.add_item(brick)

cargo_hold.add_suitcase(adas_suitcase)
print(cargo_hold)

cargo_hold.add_suitcase(peters_suitcase)
print(cargo_hold)
```

<sample-output>

0 suitcases, space for 1000 kg
1 suitcase, space for 997 kg
2 suitcases, space for 993 kg

</sample-output>

## Содержимое грузового отсека

Добавьте метод с именем `print_items` в ваш класс `CargoHold`. Он должен вывести все предметы во всех чемоданах внутри грузового отсека.

Ваш класс теперь должен работать с следующей программой:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

adas_suitcase = Suitcase(10)
adas_suitcase.add_item(book)
adas_suitcase.add_item(phone)

peters_suitcase = Suitcase(10)
peters_suitcase.add_item(brick)

cargo_hold = CargoHold(1000)
cargo_hold.add_suitcase(adas_suitcase)
cargo_hold.add_suitcase(peters_suitcase)

print("The suitcases in the cargo hold contain the following items:")
cargo_hold.print_items()
```

Выполнение приведенной выше программы должно вывести это:

<sample-output>

The suitcases in the cargo hold contain the following items:
ABC Book (2 kg)
Nokia 3210 (1 kg)
Brick (4 kg)

</sample-output>

</programming-exercise>

Пожалуйста, ответьте на краткую анкету о материалах этой недели.

<quiz id="7d931659-2dd3-5557-bd3b-a409dd1ebfa2"></quiz>