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
    # Здесь мы создаем несколько завершенных курсов и добавляем их в список 
    completed = []

    maths1 = CompletedCourse("Математика 1", 5, date(2020, 3, 11))
    prog1 = CompletedCourse("Программирование 1", 6, date(2019, 12, 17))

    completed.append(maths1)
    completed.append(prog1)

    # Добавим еще пару курсов прямо в список
    completed.append(CompletedCourse("Физика 2", 4, date(2019, 11, 10)))
    completed.append(CompletedCourse("Программирование 2", 5, date(2020, 5, 19)))

    # Проходим по всем завершенным курсам, выводим их названия 
    # и суммируем полученные кредиты
    credits = 0
    for course in completed:
        print(course.name)
        credits += course.credits

    print("Всего получено кредитов:", credits)
```

<sample-output>

Математика 1
Программирование 1
Физика 2
Программирование 2
Всего получено кредитов: 20

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
    milk = Product("Молоко", "литр")

    shopping_list.append(milk)
    shopping_list.append(milk)
    shopping_list.append(Product("Огурец", "штука"))
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
fluffy = Dog("Пушистый")
dogs.append(fluffy)
dogs.append(fluffy)
dogs.append(Dog("Пушистый"))

print("Собаки изначально:")
for dog in dogs:
    print(dog)

print("Собака с индексом 0 переименована:")
dogs[0].name = "Дружок"
for dog in dogs:
    print(dog)

print("Собака с индексом 2 переименована:")
dogs[2].name = "Фифи"
for dog in dogs:
    print(dog)
```

<sample-output>

Собаки изначально:
Пушистый
Пушистый
Пушистый
Собака с индексом 0 переименована:
Дружок
Дружок
Пушистый
Собака с индексом 2 переименована:
Дружок
Дружок
Фифи

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

False
True
False

True
True
True

</sample-output>

Любой объект Python также может быть сохранен в словаре или любой другой структуре данных. Это также относится к объектам, созданным на основе класса, который вы определили сами.

```python
class Student:
    def __init__(self, name: str, cr: int):
        self.name = name
        self.cr = cr

if __name__ == "__main__":
    # Ключом в этом словаре является номер студента, 
    # а значением является объект типа Student
    students = {}
    students["12345"] = Student("Сол Студент", 10)
    students["54321"] = Student("Салли Студент", 67)
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

nerd
object
object-oriented programming
python

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
        # определяем две вспомогательные переменные
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
        # определяем две вспомогательные переменные
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
        # определяем вспомогательные переменные
        self.helper = ""
        self.helper2 = ""
        self.helper3 = ""
        self.helper4 = ""

    # ...

    def longest_word(self):
        for word in self.words:
            # выше вспомогательным переменным были присвоены строковые значения
            # следующее не будет работать, потому что тип helper2 неверен
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
        # правильный способ объявления вспомогательных переменных 
        # для использования внутри одного метода
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

# подсказка типа здесь использует имя класса, определенного выше
def change_name(student: Student):
    student.name = "Сол Студент"

# создаем объект Student
steve = Student("Стив Студент", "12345")

print(steve)
change_name(steve)
print(steve)
```

<sample-output>

Стив Студент (12345)
Сол Студент (12345)

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

# Эта функция создает и возвращает новый объект Student.
# Она случайно выбирает значения для имени и номера студента.
def new_student():
    first_names = ["Марк","Минди","Мария","Майк"]
    last_names = ["Яванский", "Растиков", "Скриптов", "Питонов"]

    # случайно определяем имя
    name = choice(first_names) + " " + choice(last_names)

    # случайно определяем номер студента
    student_number = str(randint(10000,99999))

    # Создаем и возвращаем объект Student
    return Student(name, student_number)

if __name__ == "__main__":
    # Вызываем функцию пять раз и сохраняем результаты в список
    students = []
    for i in range(5):
        students.append(new_student())

    # Выводим результаты
    for student in students :
        print(student)
```

Выполнение приведенного выше кода может привести к следующему выводу (Обратите внимание: поскольку задействована случайность, если вы попробуете код самостоятельно, результаты, вероятно, будут отличаться).

<sample-output>

Мария Растиков (78218)
Минди Растиков (80068)
Майк Питонов (70396)
Марк Яванский (83307)
Мария Питонов (45149)

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
            print(f"{person.name} прошел на аттракцион")
        else:
            print(f"{person.name} слишком низкий :(")

    def __str__(self):
        return f"{self.name} ({self.visitors} посетителей)"
```
Attraction содержит метод `admit_visitor`, который принимает объект типа `Person` в качестве аргумента. Если посетитель достаточно высокий, он допускается на аттракцион и количество посетителей увеличивается. Классы можно протестировать следующим образом:

```python
rollercoaster = Attraction("Американские горки", 120)
jared = Person("Джаред", 172)
alice = Person("Алиса", 105)

rollercoaster.admit_visitor(jared)
rollercoaster.admit_visitor(alice)

print(rollercoaster)
```

<sample-output>

Джаред прошел на аттракцион
Алиса слишком низкий :(
Американские горки (1 посетителей)

</sample-output>

<programming-exercise name='Baby Centre' tmcname='part09-03_baby_centre'>

Шаблон упражнения содержит класс с именем `Person` и скелетную реализацию класса `BabyCentre`. Объект `BabyCentre` выполняет различные действия с объектом `Person`. Он может, например, взвесить или накормить человека. В этом упражнении вы реализуете остальную часть класса `BabyCentre`. Не изменяйте определение класса `Person` никаким образом.

## Взвешивание людей

Определение класса `BabyCentre` содержит набросок функции `weigh`:

```python
class BabyCentre:
    def weigh(self, person: Person):
        # вернуть вес человека, переданного в качестве аргумента
        return -1
```

Метод принимает объект `Person` в качестве аргумента. Он должен вернуть вес человека. Вы можете получить доступ к весу человека через соответствующий атрибут, определенный в классе `Person`. Заполните остальную реализацию метода `weigh`.

Ниже приведен пример основной функции, где `BabyCentre` взвешивает два отдельных объекта `Person`:

```python
baby_centre = BabyCentre()

eric = Person("Eric", 1, 110, 7)
peter = Person("Peter", 33, 176, 85)

print(f"{eric.name} весит {baby_centre.weigh(eric)} кг")
print(f"{peter.name} весит {baby_centre.weigh(peter)} кг")
```

<sample-output>

Eric весит 7 кг
Peter весит 85 кг

</sample-output>

## Кормление

Можно изменить состояние объекта, переданного в качестве аргумента. Реализуйте метод `feed(person: Person)`, который увеличивает на единицу вес человека, переданного в качестве аргумента.

В следующем примере два человека взвешиваются, затем один из них кормится три раза. Затем люди взвешиваются снова:

```python
baby_centre = BabyCentre()

eric = Person("Eric", 1, 110, 7)
peter = Person("Peter", 33, 176, 85)

print(f"{eric.name} весит {baby_centre.weigh(eric)} кг")
print(f"{peter.name} весит {baby_centre.weigh(peter)} кг")
print() 

baby_centre.feed(eric)
baby_centre.feed(eric)
baby_centre.feed(eric)

print(f"{eric.name} весит {baby_centre.weigh(eric)} кг")
print(f"{peter.name} весит {baby_centre.weigh(peter)} кг")
```

Вывод должен показать, что вес Эрика увеличился на три:

<sample-output>

Eric весит 7 кг
Peter весит 85 кг

Eric весит 10 кг
Peter весит 85 кг

</sample-output>

## Подсчет взвешиваний

Реализуйте метод `weigh_ins()`, который возвращает общее количество взвешиваний, выполненных объектом `BabyCentre`. Обратите внимание: вам понадобится новый атрибут для отслеживания количества взвешиваний. Вы можете использовать следующий код для тестирования вашего метода:

```python
baby_centre = BabyCentre()

eric = Person("Eric", 1, 110, 7)
peter = Person("Peter", 33, 176, 85)

print(f"Общее количество взвешиваний: {baby_centre.weigh_ins()}")

baby_centre.weigh(eric)
baby_centre.weigh(eric)

print(f"Общее количество взвешиваний: {baby_centre.weigh_ins()}")

baby_centre.weigh(eric)
baby_centre.weigh(eric)
baby_centre.weigh(eric)
baby_centre.weigh(eric)

print(f"Общее количество взвешиваний: {baby_centre.weigh_ins()}")
```

<sample-output>

Общее количество взвешиваний: 0
Общее количество взвешиваний: 2
Общее количество взвешиваний: 6

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
        # Сумма должна быть вычтена из баланса только если
        # на карте достаточно денег.
        # Если платеж успешен, метод возвращает True. 
        # Иначе он возвращает False.
```

Вы можете использовать следующий код для тестирования функции:

```python
if __name__ == "__main__":
    card = LunchCard(10)
    print("Баланс", card.balance)
    result = card.subtract_from_balance(8)
    print("Платеж успешен:", result)
    print("Баланс", card.balance)
    result = card.subtract_from_balance(4)
    print("Платеж успешен:", result)
    print("Баланс", card.balance)
```

<sample-output>

Баланс 10
Платеж успешен: True
Баланс 2
Платеж успешен: False
Баланс 2

</sample-output>

## Платежный терминал и обработка наличных платежей

В студенческой столовой можно платить либо наличными, либо LunchCard. Для обработки как наличных, так и карточных транзакций используется платежный терминал. Начнем с наличных транзакций.

Вот скелетная реализация класса `PaymentTerminal`. Реализуйте методы как описано в комментариях:

```python
class PaymentTerminal:
    def __init__(self):
        # Изначально в терминале доступно 1000 евро наличными
        self.funds = 1000
        self.lunches = 0
        self.specials = 0

    def eat_lunch(self, payment: float):
        # Обычный обед стоит 2.50 евро.
        # Увеличьте значение средств в терминале на 
        # цену обеда, увеличьте количество проданных обедов, 
        # и верните соответствующую сдачу.
        # Если платеж, переданный в качестве аргумента, недостаточно велик, чтобы покрыть
        # цену, обед не продается, и вся сумма возвращается.

    def eat_special(self, payment: float):
        # Специальный обед стоит 4.30 евро.
        # Увеличьте значение средств в терминале на 
        # цену обеда, увеличьте количество проданных обедов, 
        # и верните соответствующую сдачу.
        # Если платеж, переданный в качестве аргумента, недостаточно велик, чтобы покрыть
        # цену, обед не продается, и вся сумма возвращается.
```

Вы можете использовать следующий код для тестирования класса:

```python
exactum = PaymentTerminal()

change = exactum.eat_lunch(10)
print("Возвращенная сдача", change)

change = exactum.eat_lunch(5)
print("Возвращенная сдача", change)

change = exactum.eat_special(4.3)
print("Возвращенная сдача", change)

print("Средства, доступные в терминале:", exactum.funds)
print("Проданных обычных обедов:", exactum.lunches)
print("Проданных специальных обедов:", exactum.specials)
```

<sample-output>

Возвращенная сдача 7.5
Возвращенная сдача 2.5
Возвращенная сдача 0.0
Средства, доступные в терминале: 1009.3
Проданных обычных обедов: 2
Проданных специальных обедов: 1

</sample-output>

## Обработка карточных транзакций

Теперь реализуем карточные транзакции. Нам понадобятся методы, которые принимают `LunchCard` в качестве аргумента и уменьшают баланс на карте на цену обеда. Ниже вы найдете наброски этих функций. Заполните методы как описано в комментариях:

```python
class PaymentTerminal:
    # ...

    def eat_lunch_lunchcard(self, card: LunchCard):
        # Обычный обед стоит 2.50 евро.
        # Если на карте достаточно денег, 
        # вычтите цену обеда из баланса
        # и верните True. Если нет, верните False.


    def eat_special_lunchcard(self, card: LunchCard):
        # Специальный обед стоит 4.30 евро.
        # Если на карте достаточно денег, 
        # вычтите цену обеда из баланса
        # и верните True. Если нет, верните False.
```

**Примечание:** при оплате LunchCard наличные средства, доступные в терминале, не изменяются. Однако обеды все еще продаются всякий раз, когда есть необходимый баланс, поэтому не забудьте соответствующим образом увеличить количество проданных обедов.

Вы можете использовать следующий код для тестирования класса:

```python
exactum = PaymentTerminal()

change = exactum.eat_lunch(10)
print("Возвращенная сдача", change)

card = LunchCard(7)

result = exactum.eat_special_lunchcard(card)
print("Платеж успешен:", result)
result = exactum.eat_special_lunchcard(card)
print("Платеж успешен:", result)
result = exactum.eat_lunch_lunchcard(card)
print("Платеж успешен:", result)

print("Средства, доступные в терминале:", exactum.funds)
print("Проданных обычных обедов:", exactum.lunches)
print("Проданных специальных обедов:", exactum.specials)
```

<sample-output>

Возвращенная сдача 7.5
Платеж успешен: True
Платеж успешен: False
Платеж успешен: True
Средства, доступные в терминале: 1002.5
Проданных обычных обедов: 2
Проданных специальных обедов: 1

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
print(f"Баланс карты составляет {card.balance} евро")

result = exactum.eat_special_lunchcard(card)
print("Платеж успешен:", result)

exactum.deposit_money_on_card(card, 100)
print(f"Баланс карты составляет {card.balance} евро")

result = exactum.eat_special_lunchcard(card)
print("Платеж успешен:", result)
print(f"Баланс карты составляет {card.balance} евро")

print("Средства, доступные в терминале:", exactum.funds)
print("Проданных обычных обедов:", exactum.lunches)
print("Проданных специальных обедов:", exactum.specials)
```

<sample-output>

Баланс карты составляет 2 евро
Платеж успешен: False
Баланс карты составляет 102 евро
Платеж успешен: True
Баланс карты составляет 97.7 евро
Средства, доступные в терминале: 1100
Проданных обычных обедов: 0
Проданных специальных обедов: 1

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

muhammad = Person("Мухаммад ибн Муса аль-Хорезми", 780)
pascal = Person("Блез Паскаль", 1623)
grace = Person("Грейс Хоппер", 1906)

if older_than(muhammad, pascal):
    print(f"{muhammad.name} старше, чем {pascal.name}")
else:
    print(f"{muhammad.name} не старше, чем {pascal.name}")

if older_than(grace, pascal):
    print(f"{grace.name} старше, чем {pascal.name}")
else:
    print(f"{grace.name} не старше, чем {pascal.name}")
```

<sample-output>

Мухаммад ибн Муса аль-Хорезми старше, чем Блез Паскаль
Грейс Хоппер не старше, чем Блез Паскаль

</sample-output>

Один из принципов объектно-ориентированного программирования — включать любую функциональность, которая обрабатывает объекты определенного типа, в определение класса в виде методов. Поэтому вместо функции мы могли бы написать _метод_, который позволяет сравнивать возраст объекта Person с _другим_ объектом Person:

```python
class Person:
    def __init__(self, name: str, year_of_birth: int):
        self.name = name
        self.year_of_birth = year_of_birth

    # Примечание: подсказки типов должны быть заключены в кавычки, если параметр
    # имеет тот же тип, что и сам класс!
    def older_than(self, another: "Person"):
        if self.year_of_birth < another.year_of_birth:
            return True
        else:
            return False
```

Здесь объект, на котором вызывается метод, называется `self`, в то время как другой объект Person называется `another`.

Помните, вызов метода отличается от вызова функции. Метод присоединяется к объекту с помощью точечной нотации:

```python
muhammad = Person("Мухаммад ибн Муса аль-Хорезми", 780)
pascal = Person("Блез Паскаль", 1623)
grace = Person("Грейс Хоппер", 1906)

if muhammad.older_than(pascal):
    print(f"{muhammad.name} старше, чем {pascal.name}")
else:
    print(f"{muhammad.name} не старше, чем {pascal.name}")

if grace.older_than(pascal):
    print(f"{grace.name} старше, чем {pascal.name}")
else:
    print(f"{grace.name} не старше, чем {pascal.name}")
```

Слева от точки находится сам объект, который называется `self` в определении метода. В скобках находится аргумент метода, который является объектом, называемым `another`.

Вывод программы точно такой же, как с реализацией функции выше.

Довольно косметический момент в заключение: структура `if...else` в методе `older_than` в основном не нужна. Значение логического выражения в условии уже является точно тем же значением истинности, которое возвращается. Метод, таким образом, можно упростить:

```python
class Person:
    def __init__(self, name: str, year_of_birth: int):
        self.name = name
        self.year_of_birth = year_of_birth

    # Примечание: подсказки типов должны быть заключены в кавычки, если параметр 
    # имеет тот же тип, что и сам класс!
    def older_than(self, another: "Person"):
        return self.year_of_birth < another.year_of_birth
```

Как указано в комментариях в приведенных выше примерах, если параметр в определении метода имеет тот же тип, что и сам класс, подсказка типа должна быть заключена в кавычки. Если оставить кавычки, это вызовет ошибку, которую вы увидите, если попробуете следующее:

```python
class Person:
    # ...

    # это вызовет ошибку, поскольку Person должен быть заключен в кавычки
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

False
True

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

71600
35400

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