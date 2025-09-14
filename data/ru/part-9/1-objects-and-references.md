---
path: '/ru/part-9/1-objects-and-references'
title: 'Объекты и ссылки'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После изучения этого раздела

- Вы сможете использовать различные структуры данных для работы с объектами
- Вы узнаете, как объекты могут передаваться в качестве аргументов

</text-box>

Каждое значение в Python является объектом. Любой объект, созданный на основе класса, который вы определили сами, работает точно так же, как любой "обычный" объект Python. Например, объекты можно хранить в списке:

```python
from datetime import date

class CompletedCourse:

    def __init__(self, course_name: str, credits: int, completion_date: date):
        self.name = course_name
        self.credits = credits
        self.completion_date = completion_date


if __name__ == "__main__":
    # Here we create some completed courses and add these to a list 
    completed = []

    maths1 = CompletedCourse("Mathematics 1", 5, date(2020, 3, 11))
    prog1 = CompletedCourse("Programming 1", 6, date(2019, 12, 17))

    completed.append(maths1)
    completed.append(prog1)

    # Let's add a couple more straight to the list
    completed.append(CompletedCourse("Physics 2", 4, date(2019, 11, 10)))
    completed.append(CompletedCourse("Programming 2", 5, date(2020, 5, 19)))

    # Go through all the completed courses, print out their names 
    # and sum up the credits received
    credits = 0
    for course in completed:
        print(course.name)
        credits += course.credits

    print("Total credits received:", credits)
```

<sample-output>

Mathematics 1
Programming 1
Physics 2
Programming 2
Total credits received: 20

</sample-output>

<programming-exercise name='The fastest car' tmcname='part09-01_fastest_car'>

Шаблон упражнения содержит класс с именем `Car`, который представляет характеристики автомобиля через два атрибута: `make (str)` и `top_speed (int)`.

Напишите функцию с именем `fastest_car(cars: list)`, которая принимает список объектов `Car` в качестве аргумента.

Функция должна вернуть марку самого быстрого автомобиля. Можно предположить, что всегда будет единственный автомобиль с наивысшей максимальной скоростью. Не изменяйте список, переданный в качестве аргумента, и не вносите изменения в определение класса `Car`.

Вы можете использовать следующий код для тестирования функции:

```python
if __name__ == "__main__":
    car1 = Car("Saab", 195)
    car2 = Car("Lada", 110)
    car3 = Car("Ferrari", 280)
    car4 = Car("Trabant", 85)

    cars = [car1, car2, car3, car4]
    print(fastest_car(cars))
```

<sample-output>

Ferrari

</sample-output>

</programming-exercise>

<programming-exercise name='Passing submissions' tmcname='part09-02_passing_submissions'>

Шаблон упражнения содержит класс с именем `ExamSubmission`, который, как следует из названия, моделирует работу экзаменуемого на экзамене. У класса определены два атрибута: `examinee (str)` и `points (int)`.

Напишите функцию с именем `passed(submissions: list, lowest_passing: int)`, которая принимает список экзаменационных работ и целое число, представляющее минимальный проходной балл, в качестве аргументов.

Функция должна создать и вернуть новый список, который содержит только зачетные работы из исходного списка. Не изменяйте список, переданный в качестве аргумента, и не вносите изменения в определение класса `ExamSubmission`.

Вы можете использовать следующий код для тестирования функции:

```python
if __name__ == "__main__":
    s1 = ExamSubmission("Peter", 12)
    s2 = ExamSubmission("Pippa", 19)
    s3 = ExamSubmission("Paul", 15)
    s4 = ExamSubmission("Phoebe", 9)
    s5 = ExamSubmission("Persephone", 17)

    passes = passed([s1, s2, s3, s4, s5], 15)
    for passing in passes:
        print(passing)
```

<sample-output>

ExamSubmission (examinee: Pippa, points: 19)
ExamSubmission (examinee: Paul, points: 15)
ExamSubmission (examinee: Persephone, points: 17)

</programming-exercise>

You may remember that lists do not contain any objects themselves. They contain _references to objects_. The exact same object can appear multiple times in a single list, and it can be referred to multiple times within the list or outside it. Let's have a look at an example:

```python
class Product:
    def __init__(self, name: str, unit: str):
        self.name = name
        self.unit = unit


if __name__ == "__main__":
    shopping_list = []
    milk = Product("Milk", "litre")

    shopping_list.append(milk)
    shopping_list.append(milk)
    shopping_list.append(Product("Cucumber", "piece"))
```

<img src="9_1_1.png">

If there is more than one reference to the same object, it makes no difference which one of the references is used:

```python
class Dog:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return self.name

dogs = []
fluffy = Dog("Fluffy")
dogs.append(fluffy)
dogs.append(fluffy)
dogs.append(Dog("Fluffy"))

print("Dogs initially:")
for dog in dogs:
    print(dog)

print("The dog at index 0 is renamed:")
dogs[0].name = "Pooch"
for dog in dogs:
    print(dog)

print("The dog at index 2 is renamed:")
dogs[2].name = "Fifi"
for dog in dogs:
    print(dog)
```

<sample-output>

Dogs initially:
Fluffy
Fluffy
Fluffy
The dog at index 0 is renamed:
Pooch
Pooch
Fluffy
The dog at index 2 is renamed:
Pooch
Pooch
Fifi

</sample-output>

</programming-exercise>

Вы, возможно, помните, что списки сами по себе не содержат никаких объектов. Они содержат _ссылки на объекты_. Один и тот же объект может появляться несколько раз в одном списке, и на него можно ссылаться несколько раз в списке или вне его. Рассмотрим пример:

```python
class Product:
    def __init__(self, name: str, unit: str):
        self.name = name
        self.unit = unit


if __name__ == "__main__":
    shopping_list = []
    milk = Product("Milk", "litre")

    shopping_list.append(milk)
    shopping_list.append(milk)
    shopping_list.append(Product("Cucumber", "piece"))
```

<img src="../../part-9/9_1_1.png">

Если на один и тот же объект существует более одной ссылки, не имеет значения, какая из ссылок используется:

```python
class Dog:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return self.name

dogs = []
fluffy = Dog("Fluffy")
dogs.append(fluffy)
dogs.append(fluffy)
dogs.append(Dog("Fluffy"))

print("Dogs initially:")
for dog in dogs:
    print(dog)

print("The dog at index 0 is renamed:")
dogs[0].name = "Pooch"
for dog in dogs:
    print(dog)

print("The dog at index 2 is renamed:")
dogs[2].name = "Fifi"
for dog in dogs:
    print(dog)
```

<sample-output>

False
True
False

True
True
True

</sample-output>

Ссылки по индексам 0 и 1 в списке ссылаются на один и тот же объект. Любая из ссылок может быть использована для доступа к объекту. Ссылка по индексу 2 ссылается на другой объект, хотя и с кажущимся одинаковым содержимым. Изменение содержимого этого последнего объекта не влияет на другой.

Оператор `is` используется для проверки того, ссылаются ли две ссылки на точно тот же объект, в то время как оператор `==` скажет вам, одинаково ли содержимое объектов. Следующий пример, надеюсь, прояснит разницу:

```python
list1 = [1, 2, 3]
list2 = [1, 2, 3]
list3 = list1

print(list1 is list2)
print(list1 is list3)
print(list2 is list3)

print()

print(list1 == list2)
print(list1 == list3)
print(list2 == list3)
```

<sample-output>

nerd
object
object-oriented programming
python

</sample-output>

Любой объект Python также может быть сохранен в словаре или любой другой структуре данных. Это также относится к объектам, созданным на основе класса, который вы определили сами.

```python
class Student:
    def __init__(self, name: str, cr: int):
        self.name = name
        self.cr = cr

if __name__ == "__main__":
    # The key in this dictionary is the student number, 
    # and the value is an object of type Student
    students = {}
    students["12345"] = Student("Saul Student", 10)
    students["54321"] = Student("Sally Student", 67)
```

[Инструмент визуализации](http://www.pythontutor.com/visualize.html#mode=edit) может помочь в понимании приведенного выше примера:

<img src="../../part-9/9_1_2.png">


## Self или не self?

До сих пор мы только коснулись поверхности использования имени параметра `self`. Давайте внимательнее рассмотрим, когда его следует или не следует использовать.

Ниже у нас есть простой класс, который позволяет создавать объект словаря, содержащий некоторые слова:

```python
class Vocabulary:
    def __init__(self):
        self.words = []

    def add_word(self, word: str):
        if not word in self.words:
            self.words.append(word)

    def print_vocabulary(self):
        for word in sorted(self.words):
            print(word)

vocab = Vocabulary()
vocab.add_word("python")
vocab.add_word("object")
vocab.add_word("object-oriented programming")
vocab.add_word("object")
vocab.add_word("nerd")

vocab.print_vocabulary()
```

<sample-output>

Steve Student (12345)
Saul Student (12345)

</sample-output>

Список слов хранится в атрибуте с именем `self.words`. В этом случае имя параметра `self` обязательно как в методе-конструкторе класса, так и в любом другом методе, обращающемся к этой переменной. Если `self` опустить, различные методы не будут обращаться к одному и тому же списку слов.

Добавим новый метод в наше определение класса. Метод `longest_word(self)` возвращает (одно из) самых длинных слов в словаре.

Вот один способ выполнения этой задачи, но вскоре мы увидим, что это не очень хороший способ:

```python
class Vocabulary:
    def __init__(self):
        self.words = []

    # ...

    def longest_word(self):
        # define two helper variables
        self.longest = ""
        self.length_of_longest = 0

        for word in self.words:
            if len(word) > self.length_of_longest:
                self.length_of_longest = len(word)
                self.longest = word

        return self.longest
```

Этот метод использует две вспомогательные переменные, которые объявлены с именем параметра `self`. Помните, имена переменных не имеют значения в функциональном смысле, поэтому эти переменные могли бы также называться более запутанно, например, `helper` и `helper2`. Код начинает выглядеть немного загадочно:

```python
class Vocabulary:
    def __init__(self):
        self.words = []

    # ...

    def longest_word(self):
        # define two helper variables
        self.helper = ""
        self.helper2 = 0

        for word in self.words:
            if len(word) > self.helper2:
                self.helper2 = len(word)
                self.helper = word

        return self.helper
```

Когда переменная объявляется с именем параметра `self`, она становится атрибутом объекта. Это означает, что переменная будет существовать до тех пор, пока существует объект. В частности, переменная будет продолжать существовать и после того, как метод, объявляющий ее, завершит свое выполнение. В приведенном выше примере это совершенно не нужно, поскольку вспомогательные переменные предназначены для использования только внутри метода `longest_word(self)`. Таким образом, объявление вспомогательных переменных с именем параметра `self` здесь не очень хорошая идея.

Кроме того, что переменные существуют дольше срока их "годности", использование `self` для создания новых атрибутов там, где они не нужны, может вызвать трудноуловимые ошибки в коде. Особенно атрибуты с общими именами, такие как `self.helper`, которые затем используются в различных методах, могут вызвать неожиданное поведение, которое трудно отследить.

Например, если вспомогательная переменная объявлена как атрибут и получает начальное значение в конструкторе, но затем переменная используется в несвязанном контексте в другом методе, результаты часто непредсказуемы:

```python
class Vocabulary:
    def __init__(self):
        self.words = []
        # define helper variables
        self.helper = ""
        self.helper2 = ""
        self.helper3 = ""
        self.helper4 = ""

    # ...

    def longest_word(self):
        for word in self.words:
            # above the helper variables were all assigned string values
            # the following will not work because the type of helper2 is wrong
            if len(word) > self.helper2:
                self.helper2 = len(word)
                self.helper = word

        return self.helper
```

Вы можете подумать, что это решается простым объявлением атрибутов там, где они используются, _вне_ конструктора, но это приводит к ситуации, где атрибуты, доступные через объект, зависят от того, _какие методы были выполнены_. В предыдущей части мы видели, что преимущество объявления атрибутов в конструкторе заключается в том, что все экземпляры класса будут иметь точно такие же атрибуты. Если это не так, использование различных экземпляров класса может легко привести к ошибкам.

В заключение, если вам нужны вспомогательные переменные для использования внутри одного метода, правильный способ сделать это — _без_ `self`. Для облегчения понимания кода также используйте информативные имена переменных:

```python
class Vocabulary:
    def __init__(self):
        self.words = []

    # ...

    def longest_word(self):
        # the correct way of declaring helper variables 
        # for use within a single method
        longest = ""
        length_of_longest = 0

        for word in self.words:
            if len(word) > length_of_longest:
                length_of_longest = len(word)
                longest = word

        return longest
```

В приведенной выше реализации вспомогательные переменные доступны только во время выполнения метода. Значения, хранящиеся в них, не могут вызвать осложнения в других частях программы.

## Объекты как аргументы функций

Объекты, созданные на основе наших собственных классов, обычно являются изменяемыми. Вы, возможно, помните, что, например, списки Python являются изменяемыми: когда они передаются в качестве аргументов функциям, их содержимое может измениться в результате выполнения.

Рассмотрим простой пример, где функция получает ссылку на объект типа `Student` в качестве аргумента. Функция затем изменяет имя студента. И функция, и основная функция, ее вызывающая, обращаются к одному и тому же объекту, поэтому изменение заметно и в основной функции.

```python
class Student:
    def __init__(self, name: str, student_number: str):
        self.name = name
        self.student_number = student_number

    def __str__(self):
        return f"{self.name} ({self.student_number})"

# the type hint here uses the name of the class defined above
def change_name(student: Student):
    student.name = "Saul Student"

# create a Student object
steve = Student("Steve Student", "12345")

print(steve)
change_name(steve)
print(steve)
```

<sample-output>

Mary Rusty (78218)
Mindy Rusty (80068)
Mike Pythons (70396)
Mark Javanese (83307)
Mary Pythons (45149)

</sample-output>

Также возможно создавать объекты внутри функций. Если функция возвращает ссылку на вновь созданный объект, он также доступен в основной функции:

```python
from random import randint, choice

class Student:
    def __init__(self, name: str, student_number: str):
        self.name = name
        self.student_number = student_number

    def __str__(self):
        return f"{self.name} ({self.student_number})"

# This function creates and returns a new Student object.
# It randomly selects values for the name and the student number.
def new_student():
    first_names = ["Mark","Mindy","Mary","Mike"]
    last_names = ["Javanese", "Rusty", "Scriptor", "Pythons"]

    # randomly determine the name
    name = choice(first_names) + " " + choice(last_names)

    # randomly determine the student number
    student_number = str(randint(10000,99999))

    # Create and return a Student object
    return Student(name, student_number)

if __name__ == "__main__":
    # Call the function five times and store the results in a list
    students = []
    for i in range(5):
        students.append(new_student())

    # Print out the results
    for student in students :
        print(student)
```

Выполнение приведенного выше кода может привести к следующему выводу (Обратите внимание: поскольку задействована случайность, если вы попробуете код самостоятельно, результаты, вероятно, будут отличаться).

<sample-output>

Jared got on board
Alice was too short :(
Rollercoaster (1 visitors)

</sample-output>

## Объекты как аргументы методов

Аналогично, объекты могут выступать в качестве аргументов методов. Рассмотрим пример из парка развлечений:

```python
class Person:
    def __init__(self, name: str, height: int):
        self.name = name
        self.height = height

class Attraction:
    def __init__(self, name: str, min_height: int):
        self.visitors = 0
        self.name = name
        self.min_height = min_height

    def admit_visitor(self, person: Person):
        if person.height >= self.min_height:
            self.visitors += 1
            print(f"{person.name} got on board")
        else:
            print(f"{person.name} was too short :(")

    def __str__(self):
        return f"{self.name} ({self.visitors} visitors)"
```
Attraction содержит метод `admit_visitor`, который принимает объект типа `Person` в качестве аргумента. Если посетитель достаточно высокий, он допускается на аттракцион и количество посетителей увеличивается. Классы можно протестировать следующим образом:

```python
rollercoaster = Attraction("Rollercoaster", 120)
jared = Person("Jared", 172)
alice = Person("Alice", 105)

rollercoaster.admit_visitor(jared)
rollercoaster.admit_visitor(alice)

print(rollercoaster)
```

<sample-output>

Eric weighs 7 kg
Peter weighs 85 kg

</sample-output>

<programming-exercise name='Baby Centre' tmcname='part09-03_baby_centre'>

Шаблон упражнения содержит класс с именем `Person` и скелетную реализацию класса `BabyCentre`. Объект `BabyCentre` выполняет различные действия с объектом `Person`. Он может, например, взвесить или накормить человека. В этом упражнении вы реализуете остальную часть класса `BabyCentre`. Не изменяйте определение класса `Person` никаким образом.

## Взвешивание людей

Определение класса `BabyCentre` содержит набросок функции `weigh`:

```python
class BabyCentre:
    def weigh(self, person: Person):
        # return the weight of the person passed as an argument
        return -1
```

Метод принимает объект `Person` в качестве аргумента. Он должен вернуть вес человека. Вы можете получить доступ к весу человека через соответствующий атрибут, определенный в классе `Person`. Заполните остальную реализацию метода `weigh`.

Ниже приведен пример основной функции, где `BabyCentre` взвешивает два отдельных объекта `Person`:

```python
baby_centre = BabyCentre()

eric = Person("Eric", 1, 110, 7)
peter = Person("Peter", 33, 176, 85)

print(f"{eric.name} weighs {baby_centre.weigh(eric)} kg")
print(f"{peter.name} weighs {baby_centre.weigh(peter)} kg")
```

<sample-output>

Eric weighs 7 kg
Peter weighs 85 kg

Eric weighs 10 kg
Peter weighs 85 kg

</sample-output>

## Кормление

Можно изменить состояние объекта, переданного в качестве аргумента. Реализуйте метод `feed(person: Person)`, который увеличивает на единицу вес человека, переданного в качестве аргумента.

В следующем примере два человека взвешиваются, затем один из них кормится три раза. Затем люди взвешиваются снова:

```python
baby_centre = BabyCentre()

eric = Person("Eric", 1, 110, 7)
peter = Person("Peter", 33, 176, 85)

print(f"{eric.name} weighs {baby_centre.weigh(eric)} kg")
print(f"{peter.name} weighs {baby_centre.weigh(peter)} kg")
print() 

baby_centre.feed(eric)
baby_centre.feed(eric)
baby_centre.feed(eric)

print(f"{eric.name} weighs {baby_centre.weigh(eric)} kg")
print(f"{peter.name} weighs {baby_centre.weigh(peter)} kg")
```

Вывод должен показать, что вес Эрика увеличился на три:

<sample-output>

Total number of weigh-ins is 0
Total number of weigh-ins is 2
Total number of weigh-ins is 6

</sample-output>

## Подсчет взвешиваний

Реализуйте метод `weigh_ins()`, который возвращает общее количество взвешиваний, выполненных объектом `BabyCentre`. Обратите внимание: вам понадобится новый атрибут для отслеживания количества взвешиваний. Вы можете использовать следующий код для тестирования вашего метода:

```python
baby_centre = BabyCentre()

eric = Person("Eric", 1, 110, 7)
peter = Person("Peter", 33, 176, 85)

print(f"Total number of weigh-ins is {baby_centre.weigh_ins()}")

baby_centre.weigh(eric)
baby_centre.weigh(eric)

print(f"Total number of weigh-ins is {baby_centre.weigh_ins()}")

baby_centre.weigh(eric)
baby_centre.weigh(eric)
baby_centre.weigh(eric)
baby_centre.weigh(eric)

print(f"Total number of weigh-ins is {baby_centre.weigh_ins()}")
```

<sample-output>

Balance 10
Payment successful: True
Balance 2
Payment successful: False
Balance 2

</sample-output>

</programming-exercise>

<programming-exercise name='LunchCard and PaymentTerminal' tmcname='part09-04_lunchcard_and_paymentterminal'>

В предыдущей части было [упражнение](/ru/part-8/5-more-examples-of-classes#programming-exercise-lunchcard), где вы реализовали класс `LunchCard`. У карты были отдельные методы для обеда обычного и специального обеда, а также метод для внесения денег на карту.

Класс `LunchCard`, как вас просили его реализовать, имеет некоторые проблемы. Карта сама знала цены различных вариантов обеда и знала, сколько денег нужно снять с баланса на основе этого. Но представьте, что цены изменились, или в систему были введены новые позиции, но несколько карт уже были зарегистрированы в системе. Это означало бы, что все существующие карты нужно было бы заменить версиями, знающими новые цены.

Лучшим решением было бы сделать карты "глупыми", не знающими цен различных продуктов. Цель карты была бы просто отслеживать доступный баланс. Все более сложные функции должны содержаться в другом классе: платежном терминале.

## Упрощенная LunchCard

Сначала реализуем упрощенную версию класса `LunchCard`. Карта должна содержать функциональность только для узнавания текущего баланса, внесения денег на карту и вычитания с баланса. Заполните метод `subtract_from_balance(amount)` в шаблоне упражнения согласно инструкциям в комментариях:

```python
class LunchCard:
    def __init__(self, balance: float):
        self.balance = balance

    def deposit_money(self, amount: float):
        self.balance += amount

    def subtract_from_balance(self, amount: float):
        pass
        # The amount should be subtracted from the balance only if
        # there is enough money on the card.
        # If the payment is successful, the method returns True. 
        # Otherwise it returns False.
```

Вы можете использовать следующий код для тестирования функции:

```python
if __name__ == "__main__":
    card = LunchCard(10)
    print("Balance", card.balance)
    result = card.subtract_from_balance(8)
    print("Payment successful:", result)
    print("Balance", card.balance)
    result = card.subtract_from_balance(4)
    print("Payment successful:", result)
    print("Balance", card.balance)
```

<sample-output>

The change returned was 7.5
The change returned was 2.5
The change returned was 0.0
Funds available at the terminal: 1009.3
Regular lunches sold: 2
Special lunches sold: 1

</sample-output>

## Платежный терминал и обработка наличных платежей

В студенческой столовой можно платить либо наличными, либо LunchCard. Для обработки как наличных, так и карточных транзакций используется платежный терминал. Начнем с наличных транзакций.

Вот скелетная реализация класса `PaymentTerminal`. Реализуйте методы как описано в комментариях:

```python
class PaymentTerminal:
    def __init__(self):
        # Initially there is 1000 euros in cash available at the terminal
        self.funds = 1000
        self.lunches = 0
        self.specials = 0

    def eat_lunch(self, payment: float):
        # A regular lunch costs 2.50 euros.
        # Increase the value of the funds at the terminal by the 
        # price of the lunch, increase the number of lunches sold, 
        # and return the appropriate change.
        # If the payment passed as an argument is not large enough to cover
        # the price, the lunch is not sold, and the entire sum is returned.

    def eat_special(self, payment: float):
        # A special lunch costs 4.30 euros.
        # Increase the value of the funds at the terminal by the 
        # price of the lunch, increase the number of lunches sold, 
        # and return the appropriate change.
        # If the payment passed as an argument is not large enough to cover
        # the price, the lunch is not sold, and the entire sum is returned.
```

Вы можете использовать следующий код для тестирования класса:

```python
exactum = PaymentTerminal()

change = exactum.eat_lunch(10)
print("The change returned was", change)

change = exactum.eat_lunch(5)
print("The change returned was", change)

change = exactum.eat_special(4.3)
print("The change returned was", change)

print("Funds available at the terminal:", exactum.funds)
print("Regular lunches sold:", exactum.lunches)
print("Special lunches sold:", exactum.specials)
```

<sample-output>

The change returned was 7.5
Payment successful: True
Payment successful: False
Payment successful: True
Funds available at the terminal: 1002.5
Regular lunches sold: 2
Special lunches sold: 1

</sample-output>

## Обработка карточных транзакций

Теперь реализуем карточные транзакции. Нам понадобятся методы, которые принимают `LunchCard` в качестве аргумента и уменьшают баланс на карте на цену обеда. Ниже вы найдете наброски этих функций. Заполните методы как описано в комментариях:

```python
class PaymentTerminal:
    # ...

    def eat_lunch_lunchcard(self, card: LunchCard):
        # A regular lunch costs 2.50 euros.
        # If there is enough money on the card, 
        # subtract the price of the lunch from the balance
        # and return True. If not, return False.


    def eat_special_lunchcard(self, card: LunchCard):
        # A special lunch costs 4.30 euros.
        # If there is enough money on the card, 
        # subtract the price of the lunch from the balance
        # and return True. If not, return False.
```

**Примечание:** при оплате LunchCard наличные средства, доступные в терминале, не изменяются. Однако обеды все еще продаются всякий раз, когда есть необходимый баланс, поэтому не забудьте соответствующим образом увеличить количество проданных обедов.

Вы можете использовать следующий код для тестирования класса:

```python
exactum = PaymentTerminal()

change = exactum.eat_lunch(10)
print("The change returned was", change)

card = LunchCard(7)

result = exactum.eat_special_lunchcard(card)
print("Payment successful:", result)
result = exactum.eat_special_lunchcard(card)
print("Payment successful:", result)
result = exactum.eat_lunch_lunchcard(card)
print("Payment successful:", result)

print("Funds available at the terminal:", exactum.funds)
print("Regular lunches sold:", exactum.lunches)
print("Special lunches sold:", exactum.specials)
```

<sample-output>

Card balance is 2 euros
Payment successful: False
Card balance is 102 euros
Payment successful: True
Card balance is 97.7 euros
Funds available at the terminal: 1100
Regular lunches sold: 0
Special lunches sold: 1

</sample-output>

## Внесение денег на карту

Наконец, добавим метод, который позволяет вносить деньги на карту. Владелец карты платит это наличными, поэтому внесенная сумма добавляется к средствам, доступным в терминале. Вот набросок метода:

```python
def deposit_money_on_card(self, card: LunchCard, amount: float):
    pass
```

Вы можете использовать следующий код для тестирования метода:

```python
exactum = PaymentTerminal()

card = LunchCard(2)
print(f"Card balance is {card.balance} euros")

result = exactum.eat_special_lunchcard(card)
print("Payment successful:", result)

exactum.deposit_money_on_card(card, 100)
print(f"Card balance is {card.balance} euros")

result = exactum.eat_special_lunchcard(card)
print("Payment successful:", result)
print(f"Card balance is {card.balance} euros")

print("Funds available at the terminal:", exactum.funds)
print("Regular lunches sold:", exactum.lunches)
print("Special lunches sold:", exactum.specials)
```

<sample-output>

Muhammad ibn Musa al-Khwarizmi is older than Blaise Pascal
Grace Hopper is not older than Blaise Pascal

</sample-output>

</programming-exercise>

## Экземпляр того же класса как аргумент метода

Ниже у нас есть еще одна версия класса `Person`:

```python
class Person:
    def __init__(self, name: str, year_of_birth: int):
        self.name = name
        self.year_of_birth = year_of_birth
```

Предположим, мы хотим написать программу, которая сравнивает возрасты объектов типа Person. Мы могли бы написать отдельную функцию для этой цели:

```python
def older_than(person1: Person, person2: Person):
    if person1.year_of_birth < person2.year_of_birth:
        return True
    else:
        return False

muhammad = Person("Muhammad ibn Musa al-Khwarizmi", 780)
pascal = Person("Blaise Pascal", 1623)
grace = Person("Grace Hopper", 1906)

if older_than(muhammad, pascal):
    print(f"{muhammad.name} is older than {pascal.name}")
else:
    print(f"{muhammad.name} is not older than {pascal.name}")

if older_than(grace, pascal):
    print(f"{grace.name} is older than {pascal.name}")
else:
    print(f"{grace.name} is not older than {pascal.name}")
```

<sample-output>

False
True

</sample-output>

Один из принципов объектно-ориентированного программирования — включать любую функциональность, которая обрабатывает объекты определенного типа, в определение класса в виде методов. Поэтому вместо функции мы могли бы написать _метод_, который позволяет сравнивать возраст объекта Person с _другим_ объектом Person:

```python
class Person:
    def __init__(self, name: str, year_of_birth: int):
        self.name = name
        self.year_of_birth = year_of_birth

    # NB: type hints must be enclosed in quotation marks if the parameter
    # is of the same type as the class itself!
    def older_than(self, another: "Person"):
        if self.year_of_birth < another.year_of_birth:
            return True
        else:
            return False
```

Здесь объект, на котором вызывается метод, называется `self`, в то время как другой объект Person называется `another`.

Помните, вызов метода отличается от вызова функции. Метод присоединяется к объекту с помощью точечной нотации:

```python
muhammad = Person("Muhammad ibn Musa al-Khwarizmi", 780)
pascal = Person("Blaise Pascal", 1623)
grace = Person("Grace Hopper", 1906)

if muhammad.older_than(pascal):
    print(f"{muhammad.name} is older than {pascal.name}")
else:
    print(f"{muhammad.name} is not older than {pascal.name}")

if grace.older_than(pascal):
    print(f"{grace.name} is older than {pascal.name}")
else:
    print(f"{grace.name} is not older than {pascal.name}")
```

Слева от точки находится сам объект, который называется `self` в определении метода. В скобках находится аргумент метода, который является объектом, называемым `another`.

Вывод программы точно такой же, как с реализацией функции выше.

Довольно косметический момент в заключение: структура `if...else` в методе `older_than` в основном не нужна. Значение логического выражения в условии уже является точно тем же значением истинности, которое возвращается. Метод, таким образом, можно упростить:

```python
class Person:
    def __init__(self, name: str, year_of_birth: int):
        self.name = name
        self.year_of_birth = year_of_birth

    # NB: type hints must be enclosed in quotation marks if the parameter 
    # is of the same type as the class itself!
    def older_than(self, another: "Person"):
        return self.year_of_birth < another.year_of_birth
```

Как указано в комментариях в приведенных выше примерах, если параметр в определении метода имеет тот же тип, что и сам класс, подсказка типа должна быть заключена в кавычки. Если оставить кавычки, это вызовет ошибку, которую вы увидите, если попробуете следующее:

```python
class Person:
    # ...

    # this would cause an error, as Person must be enclosed in quotation marks
    def older_than(self, another: Person):
        return self.year_of_birth < another.year_of_birth:
```

<programming-exercise name='Comparing properties' tmcname='part09-05_comparing_properties'>

База данных агентства недвижимости ведет записи о доступных объектах недвижимости с объектами, определенными следующим классом:

```python
class RealProperty:
    def __init__(self, rooms: int, square_metres: int, price_per_sqm: int):
        self.rooms = rooms
        self.square_metres = square_metres
        self.price_per_sqm = price_per_sqm
```

Ваша задача — реализовать методы, которые позволяют сравнивать доступную недвижимость.

## Больше ли?

Напишите метод с именем `bigger(self, compared_to)`, который возвращает `True`, если сам объект `RealProperty` больше, чем тот, с которым он сравнивается.

Пример того, как должна работать функция:

```python
central_studio = RealProperty(1, 16, 5500)
downtown_two_bedroom = RealProperty(2, 38, 4200)
suburbs_three_bedroom = RealProperty(3, 78, 2500)

print(central_studio.bigger(downtown_two_bedroom))
print(suburbs_three_bedroom.bigger(downtown_two_bedroom))
```

<sample-output>

71600
35400

</sample-output>

## Разность цен

Напишите метод с именем `price_difference(self, compared_to)`, который возвращает разность в цене между самим объектом `RealProperty` и тем, с которым он сравнивается. Разность цен — это абсолютное значение разности между общими ценами двух объектов недвижимости. Общая цена объекта недвижимости — это его цена за квадратный метр, умноженная на количество квадратных метров в объекте недвижимости.

Пример того, как должна работать функция:

```python
central_studio = RealProperty(1, 16, 5500)
downtown_two_bedroom = RealProperty(2, 38, 4200)
suburbs_three_bedroom = RealProperty(3, 78, 2500)

print(central_studio.price_difference(downtown_two_bedroom))
print(suburbs_three_bedroom.price_difference(downtown_two_bedroom))
```

<sample-output>

False
True

</sample-output>

## Дороже ли?

Напишите метод с именем `more_expensive(self, compared_to)`, который возвращает `True`, если сам объект `RealProperty` дороже, чем тот, с которым он сравнивается.

Пример того, как должна работать функция:

```python
central_studio = RealProperty(1, 16, 5500)
downtown_two_bedroom = RealProperty(2, 38, 4200)
suburbs_three_bedroom = RealProperty(3, 78, 2500)

print(central_studio.more_expensive(downtown_two_bedroom))
print(suburbs_three_bedroom.more_expensive(downtown_two_bedroom))
```

<sample-output>

False
True

</sample-output>

</programming-exercise>