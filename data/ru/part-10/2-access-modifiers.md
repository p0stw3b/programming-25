---
path: '/ru/part-10/2-access-modifiers'
title: 'Модификаторы доступа'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После изучения этого раздела

- Вы поймете модификаторы доступа private и protected
- Вы узнаете, как определяется видимость свойств в Python

</text-box>

Если свойство определено как приватное в базовом классе, оно недоступно напрямую в любых производных классах, как было кратко упомянуто в предыдущем разделе. Рассмотрим пример. В классе `Notebook` ниже заметки хранятся в списке, и атрибут списка является приватным:

```python

class Notebook:
    """ A Notebook stores notes in string format """

    def __init__(self):
        # private attribute
        self.__notes = []

    def add_note(self, note):
        self.__notes.append(note)

    def retrieve_note(self, index):
        return self.__notes[index]

    def all_notes(self):
        return ",".join(self.__notes)

```

Если целостность класса является ключевой, делание атрибута списка `notes` приватным имеет смысл. Класс предоставляет клиенту подходящие методы для добавления и просмотра заметок, в конце концов. Этот подход становится проблематичным, если мы определяем новый класс `NotebookPro`, который наследует класс `Notebook`. Приватный атрибут списка недоступен клиенту, но он также недоступен производным классам. Если мы попытаемся получить к нему доступ, как в методе `find_notes` ниже, мы получим ошибку:

```python
class NotebookPro(Notebook):
    """ A better Notebook with search functionality """
    def __init__(self):
        # This is OK, the constructor is public despite the underscores
        super().__init__()

    # This causes an error
    def find_notes(self, search_term):
        found = []
        # the attribute __notes is private
        # the derived class can't access it directly
        for note in self.__notes:
            if search_term in note:
                found.append(note)

        return found
```

<sample-output>
    
AttributeError: 'NotebookPro' object has no attribute '_NotebookPro__notes'

</sample-output>

## Защищенные свойства

Многие объектно-ориентированные языки программирования имеют функцию, обычно специальное ключевое слово, для _защиты_ свойств. Это означает, что свойство должно быть скрыто от клиентов класса, но оставаться доступным для его подклассов. Python в целом не любит ключевые слова, поэтому такая функция напрямую недоступна в Python. Вместо этого есть _соглашение_ о маркировке защищенных свойств определенным способом.

Помните, свойство может быть скрыто префиксом его имени двумя подчеркиваниями:

```python
def __init__(self):
    self.__notes = []
```

Согласованное соглашение для _защиты_ свойства — это префикс имени _одним_ подчеркиванием. Теперь это _просто_ соглашение. Ничто не мешает программисту нарушить соглашение, но это считается плохой практикой программирования.

```python
def __init__(self):
    self._notes = []
```

Ниже у нас есть весь пример Notebook с защищенным `_notes` вместо приватного `__notes`:

```python
class Notebook:
    """ A Notebook stores notes in string format """

    def __init__(self):
        # protected attribute
        self._notes = []

    def add_note(self, note):
        self._notes.append(note)

    def retrieve_note(self, index):
        return self._notes[index]

    def all_notes(self):
        return ",".join(self._notes)

class NotebookPro(Notebook):
    """ A better Notebook with search functionality """
    def __init__(self):
        # This is OK, the constructor is public despite the underscores
        super().__init__()

    # This works, the protected attribute is accessible to the derived class
    def find_notes(self, search_term):
        found = []
        for note in self._notes:
            if search_term in note:
                found.append(note)

        return found

```

Ниже у нас есть удобная таблица для видимости атрибутов с различными модификаторами доступа:

Модификатор доступа	| Пример | Видимый клиенту | Видимый производному классу
:--------:|:-------------:|:---:|:----:
Публичный    | `self.name`   | да | да
Защищенный | `self._name`  | нет  | да
Приватный   | `self.__name` | нет | нет

Модификаторы доступа работают одинаково со всеми свойствами. Например, в классе `Person` ниже у нас есть защищенный метод `capitalize_initials`. Его можно использовать из производного класса `Footballer`:

```python
class Person:
    def __init__(self, name: str):
        self._name = self._capitalize_initials(name)

    def _capitalize_initials(self, name):
        name_capitalized = []
        for n in name.split(" "):
            name_capitalized.append(n.capitalize())

        return " ".join(name_capitalized)

    def __repr__(self):
        return self.__name

class Footballer(Person):

    def __init__(self, name: str, nickname: str, position: str):
        super().__init__(name)
        # the method is available as it is protected in the base class
        self.__nickname = self._capitalize_initials(nickname)
        self.__position = position

    def __repr__(self):
        r =  f"Footballer - name: {self._name}, nickname: {self.__nickname}"
        r += f", position: {self.__position}"
        return r

# Test the classes
if __name__ == "__main__":
    jp = Footballer("peter pythons", "pyper", "forward")
    print(jp)

```

<sample-output>

Footballer - name: Peter Pythons, nickname: Pyper, position: forward

</sample-output>


<programming-exercise name='Supergroup' tmcname='part10-05_supergroup'>

Шаблон упражнения содержит определение класса для `SuperHero`.

Определите класс с именем `SuperGroup`, который представляет группу супергероев. Класс должен содержать следующие члены:

* **Защищенные** атрибуты name (str), location (str) и members (list)
* Конструктор, который принимает имя и местоположение группы в качестве аргументов, в этом порядке
* Методы getter для атрибутов name и location
* Метод с именем `add_member(hero: SuperHero)`, который добавляет нового члена в группу
* Метод с именем `print_group`, который выводит информацию о группе и ее членах, следуя формату, указанному ниже

Пример класса в действии:

```python
superperson = SuperHero("SuperPerson", "Superspeed, superstrength")
invisible = SuperHero("Invisible Inca", "Invisibility")
revengers = SuperGroup("Revengers", "Emerald City")

revengers.add_member(superperson)
revengers.add_member(invisible)
revengers.print_group()
```

<sample-output>

Revengers, Emerald City
Members:
SuperPerson, superpowers: Superspeed, superstrength
Invisible Inca, superpowers: Invisibility

</sample-output>

Если вам нужно освежить память о методах getter и setter, посмотрите [этот раздел в предыдущей части](/ru/part-9/3-encapsulation#getters-and-setters) материала.

</programming-exercise>

<programming-exercise name='Secret magic potion' tmcname='part10-06_secret_magic_potion'>

Шаблон упражнения содержит определение класса для `MagicPotion`, который позволяет сохранить рецепт волшебного зелья. Определение класса содержит конструктор вместе с методами

* `add_ingredient(ingredient: str, amount: float)` и
* `print_recipe()`

Определите класс с именем `SecretMagicPotion`, который наследует класс `MagicPotion` и позволяет также защитить рецепт паролем.

Новый класс должен иметь конструктор, который также принимает строку пароля в качестве аргумента.

Класс также должен содержать следующие методы:

* `add_ingredient(ingredient: str, amount: float, password: str)`
* `print_recipe(password: str)`

Если аргумент пароля, переданный любому из этих методов, неверен, методы должны вызвать исключение `ValueError`.

Если пароль правильный, каждый метод должен вызвать соответствующий метод в родительском классе. Не копируйте и не вставляйте ничего из класса MagicPotion.

Пример того, как это работает:

```python
diminuendo = SecretMagicPotion("Diminuendo maximus", "hocuspocus")
diminuendo.add_ingredient("Toadstool", 1.5, "hocuspocus")
diminuendo.add_ingredient("Magic sand", 3.0, "hocuspocus")
diminuendo.add_ingredient("Frogspawn", 4.0, "hocuspocus")
diminuendo.print_recipe("hocuspocus")

diminuendo.print_recipe("pocushocus") # WRONG password!
```

<sample-output>

Diminuendo maximus:
Toadstool 1.5 grams
Magic sand 3.0 grams
Frogspawn 4.0 grams
Traceback (most recent call last):
  File "secret_magic_potion.py", line 98, in <module>
    raise ValueError("Wrong password!")
ValueError: Wrong password!

</sample-output>

</programming-exercise>