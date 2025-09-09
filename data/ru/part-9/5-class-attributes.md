---
path: '/ru/part-9/5-class-attributes'
title: 'Атрибуты классов'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После изучения этого раздела

- Вы познакомитесь с терминами переменная класса и метод класса
- Вы узнаете, как статические свойства отличаются от свойств экземпляров
- Вы сможете добавлять статические свойства в свои классы

</text-box>

_Свойства_ объектов являются центральной концепцией в объектно-ориентированном программировании. Термин охватывает методы и переменные, определенные в определении класса. Опять же, не все программисты Python используют термин "свойства", некоторые предпочитают _атрибуты_, _особенности_ или _члены_. Свойства довольно приняты в более широком мире объектно-ориентированного программирования, поэтому это термин, который мы используем здесь.

До сих пор мы имели дело в основном со _свойствами объектов_. Они включают методы и атрибуты, доступные в любом экземпляре класса. Фактически, _сами классы_ также могут иметь свойства, которые иногда называются _статическими свойствами_, или более конкретно _переменными класса_ и _методами класса_.

## Переменные класса

Каждый экземпляр класса имеет свои собственные конкретные значения для каждого атрибута, определенного в классе, как мы видели в примерах в предыдущих разделах. Но что, если мы хотим иметь некоторые данные, которые разделяются различными экземплярами? Введите _переменные класса_, также известные как статические переменные. Переменная класса — это переменная, к которой обращаются через сам класс, а не через экземпляры, созданные на основе класса. В любой данный момент времени во время выполнения программы переменная класса имеет одно единственное значение, независимо от того, сколько экземпляров класса создано.

Переменная класса объявляется без префикса `self` и обычно вне любого определения метода, поскольку она должна быть доступна из любого места внутри класса или даже извне класса.

```python
class SavingsAccount:
    general_rate = 0.03

    def __init__(self, account_number: str, balance: float, interest_rate: float):
        self.__account_number = account_number
        self.__balance = balance
        self.__interest_rate = interest_rate

    def add_interest(self):
        # Общая процентная ставка равна 
        # общей ставке + процентной ставке счета
        total_interest = SavingsAccount.general_rate + self.__interest_rate
        self.__balance += self.__balance * total_interest

    @property
    def balance(self):
        return self.__balance
```

Поскольку переменная `general_rate` определена внутри класса, но вне любых определений методов, и она не использует префикс `self`, это переменная класса.

К переменной класса обращаются через имя класса, например, так:

```python
# Общая ставка существует независимо от любых экземпляров объектов
print("Общая процентная ставка составляет", SavingsAccount.general_rate)

account = SavingsAccount("12345", 1000, 0.05)
# Добавляем общий накопленный процент к балансу счета
account.add_interest()
print(account.balance)
```

<sample-output>

Общая процентная ставка составляет 0.03
1080.0

</sample-output>

Итак, к переменным класса обращаются через имя класса, например, с `SavingsAccount.general_rate`, в то время как к переменным экземпляра обращаются через имя переменной объекта, например, `account.balance`. Переменная экземпляра, естественно, существует только когда экземпляр класса был создан, но переменная класса доступна везде и в любой момент времени, где доступен сам класс.

Переменные класса полезны, когда есть потребность в значениях, которые разделяются всеми экземплярами класса. В приведенном выше примере мы предположили, что общая процентная ставка всех сберегательных счетов формируется из двух компонентов: общая ставка процента разделяется всеми счетами, но каждый счет также имеет свою собственную процентную ставку в переменной экземпляра. Общая ставка также может изменяться, но изменение тогда повлияет на все экземпляры класса одинаково.

```python
class SavingsAccount:
    general_rate = 0.03

    def __init__(self, account_number: str, balance: float, interest_rate: float):
        self.__account_number = account_number
        self.__balance = balance
        self.__interest_rate = interest_rate

    def add_interest(self):
        # Общая процентная ставка равна 
        # общей ставке + процентной ставке счета
        total_interest = SavingsAccount.general_rate + self.__interest_rate
        self.__balance += self.__balance * total_interest

    @property
    def balance(self):
        return self.__balance

    @property
    def total_interest(self):
        return self.__interest_rate + SavingsAccount.general_rate
```

```python
account1 = SavingsAccount("12345", 100, 0.03)
account2 = SavingsAccount("54321", 200, 0.06)

print("Общая процентная ставка:", SavingsAccount.general_rate)
print(account1.total_interest)
print(account2.total_interest)

# Общая ставка процента теперь 10 процентов
SavingsAccount.general_rate = 0.10

print("Общая процентная ставка:", SavingsAccount.general_rate)
print(account1.total_interest)
print(account2.total_interest)
```

<sample-output>

Общая процентная ставка: 0.03
0.06
0.09
Общая процентная ставка: 0.1
0.13
0.16

</sample-output>

Когда общая ставка процента изменяется, общая процентная ставка для всех экземпляров класса изменяется. Как вы можете видеть выше, возможно добавить метод getter с декоратором `@property`, даже если нет атрибута с тем же именем в классе. Этот метод возвращает сумму общей ставки процента и специфичной для счета процентной ставки.

Рассмотрим другой пример. Класс `PhoneNumber` используется для определения единственного номера телефона, но он также содержит некоторые коды стран в словаре. Этот словарь является переменной класса и как таковой разделяется всеми экземплярами класса, поскольку код страны для телефонных номеров из одной страны всегда одинаков.

```python
class PhoneNumber:
    country_codes = {"Finland": "+358", "Sweden": "+46", "United States": "+1"}

    def __init__(self, name: str, phone_number: str, country: str):
        self.__name = name
        self.__phone_number = phone_number
        self.__country = country

    @property
    def phone_number(self):
        # Когда добавляется префикс кода страны 
        # начальный ноль удаляется из номера телефона
        return PhoneNumber.country_codes[self.__country] + " " + self.__phone_number[1:]
```

```python
paulas_no = PhoneNumber("Паула Питонс", "050 1234 567", "Finland")
print(paulas_no.phone_number)
```

<sample-output>

+358 50 1234 567

</sample-output>

Каждый объект PhoneNumber содержит имя владельца, сам номер и страну телефонного номера. Когда к атрибуту, содержащему телефонный номер, обращаются с помощью метода getter, соответствующий код страны извлекается из словаря переменной класса на основе атрибута страны, и результат префиксируется к номеру.

Пример реализации выше еще не очень функционален в других отношениях. В следующем примере мы добавили getter и setter для всех атрибутов:

```python
class PhoneNumber:
    country_codes = {"Finland": "+358", "Sweden": "+46", "United States": "+1"}

    def __init__(self, name: str, phone_number: str, country: str):
        self.__name = name
        # Это вызов метода phone_number.setter
        self.phone_number = phone_number
        # Это вызов метода country.setter
        self.country = country

    # метод getter для phone_number объединяет код страны 
    # и атрибут phone_number
    @property
    def phone_number(self):
        # начальный ноль удаляется, поскольку код страны префиксируется
        return PhoneNumber.country_codes[self.__country] + " " + self.__phone_number[1:]

    @phone_number.setter
    def phone_number(self, number):
        # Убеждаемся, что номер содержит только цифры и символы пробела
        for character in number:
            if character not in "1234567890 ":
                raise ValueError("Номер телефона может содержать только цифры и пробелы")
        self.__phone_number = number

    # getter только для самого номера без кода страны
    @property
    def local_number(self):
        return self.__phone_number

    @property
    def country(self):
        return self.__country

    @country.setter
    def country(self, country):
        # Убеждаемся, что страна является ключом в словаре кодов стран
        if country not in PhoneNumber.country_codes:
            raise ValueError("Эта страна не в списке.")
        self.__country = country

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, name):
        self.__name = name

    def __str__(self):
        return f"{self.phone_number} ({self.__name})"
```

```python
if __name__ == "__main__":
    pn = PhoneNumber("Петр Питонс", "040 111 1111", "Sweden")
    print(pn)
    print(pn.phone_number)
    print(pn.local_number)
```

<sample-output>

+46 40 111 1111 (Петр Питонс)
+46 40 111 1111
040 111 1111

</sample-output>

<programming-exercise name='Postcodes' tmcname='part09-13_postcodes'>

Шаблон упражнения содержит определение класса `City`, которое является моделью для одного города.

Добавьте переменную класса с именем `postcodes`, которая ссылается на словарь. Ключи словаря — это названия городов, а присоединенные значения — почтовые коды для этих городов. И то, и другое — строки.

Словарь должен содержать (по крайней мере) следующие почтовые коды:

* Helsinki 00100
* Turku 20100
* Tampere 33100
* Rovaniemi 96100
* Oulu 90100

Вам не нужно реализовывать никакой другой функциональности.

</programming-exercise>

## Методы класса

Метод класса, также называемый статическим методом, — это метод, который не привязан к какому-либо единственному экземпляру класса. Метод класса может быть вызван без создания каких-либо экземпляров класса.

Методы класса обычно представляют собой инструменты, которые имеют что-то общее с целью класса, но которые отделены в том смысле, что не должно быть необходимо создавать экземпляры класса, чтобы иметь возможность их вызывать. Методы класса обычно публичные, чтобы их можно было вызывать как извне класса, так и изнутри класса, включая изнутри экземпляров класса.

Метод класса определяется с аннотацией `@classmethod`. Первый параметр всегда `cls`. Имя переменной `cls` похоже на параметр `self`. Разница в том, что `cls` указывает на класс, а `self` указывает на экземпляр класса. Ни один из параметров не включается в список аргументов при вызове функции; Python автоматически заполняет соответствующее значение.

В следующем примере у нас есть класс, моделирующий регистрацию автомобилей. Класс `Registration` содержит статический метод для проверки действительности номерного знака. Метод является статическим методом класса, потому что полезно иметь возможность проверить, действителен ли номерной знак, еще до того, как будет создан единственный объект Registration:

```python
class Registration:
    def __init__(self, owner: str, make: str, year: int, license_plate: str):
        self.__owner = owner
        self.__make = make
        self.__year = year

        # Вызов метода license_plate.setter
        self.license_plate = license_plate

    @property
    def license_plate(self):
        return self.__license_plate

    @license_plate.setter
    def license_plate(self, plate):
        if Registration.license_plate_valid(plate):
            self.__license_plate = plate
        else:
            raise ValueError("Номерной знак недействителен")

    # Метод класса для валидации номерного знака
    @classmethod
    def license_plate_valid(cls, plate: str):
        if len(plate) < 3 or "-" not in plate:
            return False

        # Проверяем начальную и конечную секции знака отдельно
        letters, numbers = plate.split("-")

        # начальная секция может содержать только буквы
        for character in letters:
            if character.lower() not in "abcdefghijklmnopqrstuvwxyzåäöабвгдеёжзийклмнопрстуфхцчшщъыьэюя":
                return False

        # конечная секция может содержать только цифры
        for character in numbers:
            if character not in "1234567890":
                return False

        return True
```

```python
registration = Registration("Мария Моторист", "Volvo", "1992", "abc-123")

if Registration.license_plate_valid("xyz-789"):
    print("Это действительный номерной знак!")
```

<sample-output>

Это действительный номерной знак!

</sample-output>

Действительность номерного знака может быть проверена даже без создания единственного экземпляра класса, например, с `Registration.license_plate_valid("xyz-789")`. Тот же метод вызывается в конструкторе класса. Примечание: даже в конструкторе этот метод доступен через имя класса, а не `self`!

<programming-exercise name='List helper' tmcname='part09-14_list_helper'>

Создайте класс с именем `ListHelper`, который содержит следующие два метода класса.

* `greatest_frequency(my_list: list)` возвращает наиболее часто встречающийся элемент в списке
* `doubles(my_list: list)` возвращает количество уникальных элементов, которые появляются в списке не менее двух раз

Должна быть возможность использовать эти методы без создания экземпляра класса. Пример того, как методы могут быть использованы:

```python
numbers = [1, 1, 2, 1, 3, 3, 4, 5, 5, 5, 6, 5, 5, 5]
print(ListHelper.greatest_frequency(numbers))
print(ListHelper.doubles(numbers))
```

<sample-output>

5
3

</sample-output>

</programming-exercise>