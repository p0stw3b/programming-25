---
path: '/ru/part-9/2-objects-as-attributes'
title: 'Объекты как атрибуты'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После изучения этого раздела

- Вы узнаете, как использовать объекты в качестве атрибутов в других объектах
- Вы познакомитесь с ключевым словом `None`

</text-box>

Мы уже видели примеры классов, у которых есть списки в качестве атрибутов. Поскольку ничто не мешает нам включать изменяемые объекты в качестве атрибутов в наши классы, мы также можем использовать экземпляры наших собственных классов в качестве атрибутов в других классах, которые мы определили сами. В следующих примерах мы определим классы `Course`, `Student` и `CompletedCourse`. Завершенный курс использует первые два класса. Определения классов очень короткие и простые, чтобы лучше сосредоточиться на технике использования экземпляров наших собственных классов в качестве атрибутов.

Предположим, что каждый класс определен в отдельном файле.

Сначала определяем класс `Course` в файле с именем `course.py`:

```python
class Course:
    def __init__(self, name: str, code: str, credits: int):
        self.name = name
        self.code = code
        self.credits = credits
```

Далее класс `Student` в файле с именем `student.py`:

```python
class Student:
    def __init__(self, name: str, student_number: str, credits: int):
        self.name = name
        self.student_number = student_number
        self.credits = credits
```

Наконец, класс `CompletedCourse` определен в файле с именем `completedcourse.py`. Поскольку он использует другие два класса, их необходимо импортировать перед использованием:

```python
from course import Course
from student import Student

class CompletedCourse:
    def __init__(self, student: Student, course: Course, grade: int):
        self.student = student
        self.course = course
        self.grade = grade
```

Вот пример основной функции, которая добавляет несколько завершенных курсов в список:

```python
from completedcourse import CompletedCourse
from course import Course
from student import Student

# Create a list of students
students = []
students.append(Student("Ollie", "1234", 10))
students.append(Student("Peter", "3210", 23))
students.append(Student("Lena", "9999", 43))
students.append(Student("Tina", "3333", 8))

# Create a course named Introduction to Programming
itp = Course("Introduction to Programming", "itp1", 5)

# Add completed courses for each student, with grade 3 for all
completed = []
for student in students:
    completed.append(CompletedCourse(student, itp, 3))

# Print out the name of the student for each completed course
for course in completed:
    print(course.student.name)
```

<sample-output>

Ollie
Peter
Lena
Tina

</sample-output>

Что именно происходит со всеми точками в строке `print(course.student.name)`?

* `course` — это экземпляр класса `CompletedCourse`
* `student` ссылается на атрибут объекта `CompletedCourse`, который является объектом типа `Student`
* атрибут `name` в объекте `Student` содержит имя студента

## Когда необходим импорт?

В приведенных выше примерах оператор `import` появлялся довольно часто:

```python
from completedcourse import CompletedCourse
from course import Course
from student import Student

# rest of the main function
```

Оператор `import` необходим только при использовании кода, который определен где-то вне текущего файла (или сеанса интерпретатора Python). Это включает ситуации, когда мы хотим использовать что-то, определенное в стандартной библиотеке Python. Например, модуль `math` содержит некоторые математические операции:

```python
import math

x = 10
print(f"the square root of {x} is {math.sqrt(x)}")
```

В приведенном выше примере мы предположили, что три класса определены каждый в отдельном файле, а основная функция запускается из еще одного файла. Именно поэтому операторы `import` были необходимы.

Если весь программный код написан в одном файле, как советует делать большинство упражнений на этом курсе, **вам не понадобятся** операторы `import` для использования определенных вами классов.

Если вы обнаружили, что пишете что-то вроде

```python
from person import Person

# more code goes here
```

вероятно, вы что-то делаете не так. Если вам нужно освежить память, оператор `import` впервые был представлен в [части 7](/ru/part-7/1-modules) этого учебного материала.

<programming-exercise name='Pets' tmcname='part09-06_pets'>

Шаблон упражнения содержит наброски двух классов: `Person` и `Pet`. У каждого человека есть один питомец. Измените метод `__str__` в классе `Person` так, чтобы он также выводил информацию о питомце человека, как показано в примере ниже.

Строка, возвращаемая методом, _должна точно следовать формату, указанному ниже_.

```python
hulda = Pet("Hulda", "mixed-breed dog")
levi = Person("Levi", hulda)

print(levi)
```

<sample-output>

Levi, whose pal is Hulda, a mixed-breed dog

</sample-output>

**Примечание:** все определения классов находятся в одном текстовом файле. Вам не нужно ничего `import`овать.

</programming-exercise>

## Список объектов как атрибут объекта

В приведенных выше примерах мы использовали отдельные экземпляры других классов в качестве атрибутов: у Person есть один Pet в качестве атрибута, а у CompletedCourse есть один Student и один Course в качестве атрибутов.

В объектно-ориентированном программировании часто бывает так, что мы хотим иметь _коллекцию_ объектов в качестве атрибута. Например, отношения между спортивной командой и ее игроками следуют этому шаблону:

```python
class Player:
    def __init__(self, name: str, goals: int):
        self.name = name
        self.goals = goals

    def __str__(self):
        return f"{self.name} ({self.goals} goals)"

class Team:
    def __init__(self, name: str):
        self.name = name
        self.players = []

    def add_player(self, player: Player):
        self.players.append(player)

    def summary(self):
        goals = []
        for player in self.players:
            goals.append(player.goals)
        print("Team:", self.name)
        print("Players:", len(self.players))
        print("Goals scored by each player:", goals)
```

Пример нашего класса в действии:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))
ca.add_player(Player("Emily", 22))
ca.add_player(Player("Andy", 1))
ca.summary()
```

<sample-output>

Team: Campus Allstars
Players: 3
Goals scored by each player: [10, 22, 1]

</sample-output>

<programming-exercise name='A box of presents' tmcname='part09-07_box_of_presents'>

В этом упражнении вы будете практиковаться в упаковке подарков. Вы напишете два класса: `Present` и `Box`. Подарок имеет имя и вес, а коробка содержит подарки.

## Класс Present

Определите класс `Present`, который можно использовать для представления различных видов подарков. Определение класса должно содержать атрибуты для имени и веса (в кг) подарка. Экземпляры класса должны работать следующим образом:

```python
book = Present("ABC Book", 2)

print("The name of the present:", book.name)
print("The weight of the present:", book.weight)
print("Present:", book)
```

Это должно вывести

<sample-output>

The name of the present: ABC Book
The weight of the present: 2
Present: ABC Book (2 kg)

</sample-output>

## Класс Box

Определите класс `Box`. Вы должны иметь возможность добавлять подарки в коробку, и коробка должна отслеживать общий вес подарков внутри. Определение класса должно содержать эти методы:

- `add_present(self, present: Present)` который добавляет подарок, переданный в качестве аргумента, в коробку. Метод не имеет возвращаемого значения.
- `total_weight(self)` который возвращает общий вес подарков в коробке.

Вы можете использовать следующий код для тестирования класса:

```python
book = Present("ABC Book", 2)

box = Box()
box.add_present(book)
print(box.total_weight())

cd = Present("Pink Floyd: Dark Side of the Moon", 1)
box.add_present(cd)
print(box.total_weight())
```

<sample-output>

2
3

</sample-output>

</programming-exercise>

## None: ссылка ни на что

В программировании на Python все инициализированные переменные ссылаются на объект. Однако неизбежно возникают ситуации, когда нам нужно ссылаться на что-то, что не существует, не вызывая ошибок. Ключевое слово `None` представляет именно такой "пустой" объект.

Продолжая пример Team и Player выше, предположим, что мы хотим добавить метод для поиска игроков в команде по имени игрока. Если такой игрок не найден, может иметь смысл вернуть `None`:

```python
class Player:
    def __init__(self, name: str, goals: int):
        self.name = name
        self.goals = goals

    def __str__(self):
        return f"{self.name} ({self.goals} goals)"

class Team:
    def __init__(self, name: str):
        self.name = name
        self.players = []

    def add_player(self, player: Player):
        self.players.append(player)

    def find_player(self, name: str):
        for player in self.players:
            if player.name == name:
                return player
        return None
```

Давайте протестируем нашу функцию:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))
ca.add_player(Player("Amily", 22))
ca.add_player(Player("Andy", 1))

player1 = ca.find_player("Andy")
print(player1)
player2 = ca.find_player("Charlie")
print(player2)
```

<sample-output>

Andy (1 goals)
None

</sample-output>

Однако будьте осторожны с `None`. Иногда это может вызвать больше проблем, чем решить. Распространенная ошибка программирования — попытка доступа к методу или атрибуту через ссылку, которая оценивается как `None`:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))

player = ca.find_player("Charlie")
print(f"Goals by Charlie: {player.goals}")
```

Выполнение приведенного выше кода вызовет ошибку:

<sample-output>

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'NoneType' object has no attribute 'goals'

</sample-output>

Хорошая идея — проверить на `None` перед попыткой доступа к любым атрибутам или методам возвращаемых значений:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))

player = ca.find_player("Charlie")
if player is not None:
    print(f"Goals by Charlie: {player.goals}")
else:
    print(f"Charlie doesn't play in Campus Allstars :(")
```

<sample-output>

Charlie doesn't play in Campus Allstars :(

</sample-output>

<programming-exercise name='The shortest person in the room' tmcname='part09-08_shortest_in_room'>

Шаблон упражнения содержит класс `Person`. У человека есть имя и рост. В этом упражнении вы реализуете класс `Room`. Вы можете добавить любое количество людей в комнату, а также можете найти и удалить самого низкого человека в комнате.

## Room

Определите класс `Room`. Он должен иметь список людей в качестве атрибута, а также содержать следующие методы:

- `add(person: Person)` добавляет человека, переданного в качестве аргумента, в комнату.
- `is_empty()` возвращает `True` или `False` в зависимости от того, пуста ли комната.
- `print_contents()` выводит содержимое списка людей в комнате.

Взгляните на следующий пример использования:

```python
room = Room()
print("Is the room empty?", room.is_empty())
room.add(Person("Lea", 183))
room.add(Person("Kenya", 172))
room.add(Person("Ally", 166))
room.add(Person("Nina", 162))
room.add(Person("Dorothy", 155))
print("Is the room empty?", room.is_empty())
room.print_contents()
```

<sample-output>

Is the room empty? True
Is the room empty? False
There are 5 persons in the room, and their combined height is 838 cm
Lea (183 cm)
Kenya (172 cm)
Ally (166 cm)
Nina (162 cm)
Dorothy (155 cm)

</sample-output>

## Самый низкий человек

Определите метод `shortest()` в определении класса `Room`. Метод должен вернуть самого низкого человека в комнате, в которой он вызывается. Если комната пуста, метод должен вернуть `None`. Метод _не должен_ удалять человека из комнаты.

```python
room = Room()

print("Is the room empty?", room.is_empty())
print("Shortest:", room.shortest())

room.add(Person("Lea", 183))
room.add(Person("Kenya", 172))
room.add(Person("Nina", 162))
room.add(Person("Ally", 166))

print()

print("Is the room empty?", room.is_empty())
print("Shortest:", room.shortest())

print()

room.print_contents()
```

<sample-output>

Is the room empty? True
Shortest: None

Is the room empty? False
Shortest: Nina

There are 4 persons in the room, and their combined height is 683 cm
Lea (183 cm)
Kenya (172 cm)
Nina (162 cm)
Ally (166 cm)

</sample-output>

## Удаление человека из комнаты

Определите метод `remove_shortest()` в определении класса `Room`. Метод должен удалить самый низкий объект `Person` из комнаты и вернуть ссылку на объект. Если комната пуста, метод должен вернуть `None`.

```python
room = Room()

room.add(Person("Lea", 183))
room.add(Person("Kenya", 172))
room.add(Person("Nina", 162))
room.add(Person("Ally", 166))
room.print_contents()

print()

removed = room.remove_shortest()
print(f"Removed from room: {removed.name}")

print()

room.print_contents()
```

<sample-output>

There are 4 persons in the room, and their combined height is 683 cm
Lea (183 cm)
Kenya (172 cm)
Nina (162 cm)
Ally (166 cm)

Removed from room: Nina

There are 3 persons in the room, and their combined height is 521 cm
Lea (183 cm)
Kenya (172 cm)
Ally (166 cm)

</sample-output>

**Подсказка**: в [части 4](/ru/part-4/3-lists#removing-items-from-a-list) вы найдете инструкции по удалению элементов из списка.

**Подсказка2**: всегда можно вызвать другой метод того же класса изнутри метода. Следующее должно работать нормально:

```python
class Room:
    # ...
    def shortest(self):
        # your code goes here

    def remove_shortest(self):
        shortest_person = self.shortest()
        # ...
```

</programming-exercise>