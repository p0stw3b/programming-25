---
path: '/ru/part-11/2-more-comprehensions'
title: 'Больше о генераторах'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела

- Вы сможете использовать генераторы со строками
- Вы будете знать, как использовать генераторы со своими собственными классами
- Вы сможете создавать генераторы словарей

</text-box>

Списки, возможно, являются наиболее распространённой целью для генераторов, но генераторы работают с любой серией элементов, включая строки. Точно так же, как в примерах со списками в предыдущем разделе, если генератор списков выполняется на строке, элементы (т.е. символы) в строке извлекаются один за другим, обрабатываются согласно данному выражению и сохраняются в списке.

```python
name = "Peter Python"

uppercased = [character.upper() for character in name]
print(uppercased)
```

<sample-output>

['P', 'E', 'T', 'E', 'R', ' ', 'P', 'Y', 'T', 'H', 'O', 'N']

</sample-output>

Результат действительно является списком, как диктуется скобочной нотацией вокруг выражения генератора. Если мы хотим строку вместо этого, мы можем использовать строковый метод `join` для разбора списка в строку. Помните, метод вызывается на строке, которую мы хотим использовать как "клей" между символами. Давайте посмотрим на несколько примеров:

```python
name = "Peter"
char_list = list(name)
print(char_list)

print("".join(char_list))
print(" ".join(char_list))
print(",".join(char_list))
print(" and ".join(char_list))
```

<sample-output>

['P', 'e', 't', 'e', 'r']
Peter
P e t e r
P,e,t,e,r
P and e and t and e and r

</sample-output>

Генераторы списков и метод `join` облегчают создание новых строк на основе других строк. Мы могли бы, например, создать строку, которая содержит только гласные из другой строки:

```python
test_string = "Hello there, this is a test!"

vowels = [character for character in test_string if character in "aeiou"]
new_string = "".join(vowels)

print(new_string)
```

<sample-output>

eoeeiiae

</sample-output>

В приведённом выше примере генератор списков и метод `join` находятся на отдельных строках, но их можно объединить в одно выражение:

```python
test_string = "Hello there, this is a test!"

vowel_string = "".join([character for character in test_string if character in "aeiou"])

print(vowel_string)
```

Многие программисты Python клянутся этими однострочниками, поэтому стоит научиться их читать. Мы могли бы даже добавить метод `split` в смесь, чтобы мы могли эффективно обрабатывать целые предложения одним выражением. В приведённом ниже примере первый символ из каждого слова в предложении удаляется:

```python
sentence = "Sheila keeps on selling seashells on the seashore"

sentence_no_initials = " ".join([word[1:] for word in sentence.split()])
print(sentence_no_initials)
```

<sample-output>

heila eeps n elling eashells n he eashore

</sample-output>

Давайте разберём это пошагово:

- `word[1:]` извлекает подстроку со второго символа (по индексу 1) и далее
- `sentence.split()` разбивает предложение на части по данному символу. В этом случае методу не дан аргумент, поэтому предложение разбивается по пробельным символам по умолчанию
- `" ".join()` объединяет элементы в списке в новую строку, используя пробельный символ между элементами

Более традиционный итеративный подход мог бы выглядеть так

```python
sentence = "Sheila keeps on selling seashells on the seashore"

word_list = []
words = sentence.split()
for word in words:
    word_no_initials = word[1:]
    word_list.append(word_no_initials)

sentence_no_initials = " ".join(word_list)

print(sentence_no_initials)
```

<programming-exercise name='Filter forbidden' tmcname='part11-08_filter_forbidden'>

Напишите функцию `filter_forbidden(string: str, forbidden: str)`, которая принимает две строки в качестве аргументов. Функция должна вернуть новую версию первой строки. Она не должна содержать никаких символов из второй строки.

Функция должна быть реализована с использованием генераторов списков. Максимальная длина функции - три строки кода, включая строку заголовка, начинающуюся с ключевого слова `def`.

Посмотрите на пример ниже.

```python
sentence = "Once! upon, a time: there was a python!??!?!"
filtered = filter_forbidden(sentence, "!?:,.")
print(filtered)
```

<sample-output>

Once upon a time there was a python

</sample-output>

</programming-exercise>

## Собственные классы и генераторы

Генераторы могут быть полезным инструментом для обработки или формулирования экземпляров ваших собственных классов, как мы увидим в следующих примерах.

Сначала давайте посмотрим на класс `Country`, который является простой моделью для одной страны с атрибутами для названия и населения. В главной функции ниже мы сначала создаём несколько объектов Country, а затем используем генератор списков для выбора только тех, чьё население больше пяти миллионов.

```python
class Country:
    """ Этот класс моделирует одну страну с населением """
    def __init__(self, name: str, population: int):
        self.name = name
        self.population = population

if __name__ == "__main__":
    finland = Country("Finland", 6000000)
    malta = Country("Malta", 500000)
    sweden = Country("Sweden", 10000000)
    iceland = Country("Iceland", 350000)

    countries = [finland, malta, sweden, iceland]

    bigger_countries = [country.name for country in countries if country.population > 5000000]
    for country in bigger_countries:
        print(country)

```

<sample-output>

Finland
Sweden

</sample-output>

В генераторе списков выше мы выбрали только атрибут name из объектов Country, поэтому содержимое списка можно было напечатать напрямую. Мы также могли создать новый список самих стран и получить доступ к атрибуту name в цикле `for`. Это было бы полезно, если тот же список стран использовался бы также позже в программе, или если нам нужен атрибут population в цикле `for` тоже:

```python
if __name__ == "__main__":
    finland = Country("Finland", 6000000)
    malta = Country("Malta", 500000)
    sweden = Country("Sweden", 10000000)
    iceland = Country("Iceland", 350000)

    countries = [finland, malta, sweden, iceland]

    bigger_countries = [country for country in countries if country.population > 5000000]
    for country in bigger_countries:
        print(country.name, country.population)
```

В следующем примере у нас есть класс `RunningEvent`, который моделирует одно событие бегового забега с атрибутами для длины и названия забега. Мы будем использовать генераторы списков для создания объектов `RunningEvent` на основе списка длин забегов.

Параметр `name` имеет значение по умолчанию в конструкторе класса `RunningEvent`, поэтому нам не нужно передавать название как аргумент.

```python
class RunningEvent:
    """ Класс моделирует событие бегового забега длиной n метров """
    def __init__(self, length: int, name: str = "no name"):
        self.length = length
        self.name = name

    def __repr__(self):
        return f"{self.length} m. ({self.name})"

if __name__ == "__main__":
    lengths = [100, 200, 1500, 3000, 42195]
    events = [RunningEvent(length) for length in lengths]

    # Напечатать все события
    print(events)

    # Выбрать одно из списка и дать ему название
    marathon = events[-1] # последний элемент в списке
    marathon.name = "Marathon"

    # Напечатать всё снова, включая новое название
    print(events)
```

<sample-output>

[100 m. (no name), 200 m. (no name), 1500 m. (no name), 3000 m. (no name), 42195 m. (no name)]
[100 m. (no name), 200 m. (no name), 1500 m. (no name), 3000 m. (no name), 42195 m. (Marathon)]

</sample-output>

Теперь давайте узнаем, что делает серию элементов "генерируемой". В предыдущей части мы узнали, как сделать наши собственные классы итерируемыми. Именно эта же функция также позволяет генераторы списков. Если ваш собственный класс итерируемый, он может использоваться как основа выражения генератора списков. Следующие определения классов скопированы прямо из [части 10](/ru/part-10/3-oo-programming-techniques#iterators):

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

    # Это метод инициализации итератора
    # Переменные итерации должны быть инициализированы здесь
    def __iter__(self):
        self.n = 0
        # метод возвращает ссылку на сам объект, поскольку
        # итератор реализован внутри того же определения класса
        return self

    # Этот метод возвращает следующий элемент в объекте
    # Если все элементы пройдены, вызывается событие StopIteration
    def __next__(self):
        if self.n < len(self._books):
            # Выбрать текущий элемент из списка внутри объекта
            book = self._books[self.n]
            # увеличить счётчик (т.е. переменную итерации) на единицу
            self.n += 1
            # вернуть текущий элемент
            return book
        else:
            # Все книги пройдены
            raise StopIteration

# Протестировать ваши классы
if __name__ == "__main__":
    b1 = Book("The Life of Python", "Montague Python", 123)
    b2 = Book("The Old Man and the C", "Ernest Hemingjavay", 204)
    b3 = Book("A Good Cup of Java", "Caffee Coder", 997)

    shelf = Bookshelf()
    shelf.add_book(b1)
    shelf.add_book(b2)
    shelf.add_book(b3)

    # Создать список, содержащий названия всех книг
    book_names = [book.name for book in shelf]
    print(book_names)

```

<programming-exercise name='Products in shopping list' tmcname='part11-09_products_in_shopping_list'>

В части 10 вы создали [итерируемый список покупок](/ru/part-10/3-oo-programming-techniques#programming-exercise-an-iterable-shopping-list), и мы только что узнали, что объект, созданный из итерируемого класса, может использоваться с генераторами списков. Шаблон упражнения содержит урезанную версию `ShoppingList` с достаточной функциональностью для выполнения требований этого упражнения.

Напишите функцию `products_in_shopping_list(shopping_list, amount: int)`, которая принимает объект ShoppingList и целое значение в качестве аргументов. Функция возвращает список названий продуктов. Список должен включать только продукты с как минимум количеством элементов, указанным параметром `amount`.

Функция должна быть реализована с использованием генераторов списков. Максимальная длина функции - две строки кода, включая строку заголовка, начинающуюся с ключевого слова `def`. Определение класса `ShoppingList` _не должно_ изменяться.

Функция должна работать следующим образом:

```python
my_list = ShoppingList()
my_list.add("bananas", 10)
my_list.add("apples", 5)
my_list.add("alcohol free beer", 24)
my_list.add("pineapple", 1)

print("список покупок содержит как минимум 8 из следующих элементов:")
for product in products_in_shopping_list(my_list, 8):
    print(product)
```

<sample-output>

список покупок содержит как минимум 8 из следующих элементов:
bananas
alcohol free beer

</sample-output>

</programming-exercise>

<programming-exercise name='Price difference of cheaper properties' tmcname='part11-10_cheaper_properties'>

Это упражнение является немного изменённой версией упражнения [Сравнение недвижимости](/ru/part-9/1-objects-and-references#programming-exercise-comparing-properties) из части 9.

Напишите функцию `cheaper_properties(properties: list, reference: RealProperty)`, которая принимает список недвижимости и единственный объект RealProperty в качестве аргументов. Функция должна вернуть список, содержащий только те свойства в исходном списке, которые дешевле эталонной недвижимости, вместе с разностью в цене. Элементы в возвращаемом списке должны быть кортежами, где первый элемент - сама недвижимость, а второй - разность в цене.

Функция должна быть реализована с использованием генераторов списков. Максимальная длина функции - две строки кода, включая строку заголовка, начинающуюся с ключевого слова `def`.

Код для класса `RealProperty` включён в шаблон упражнения и не должен изменяться.

Пример работы функции:

```python
a1 = RealProperty(1, 16, 5500, "Central studio")
a2 = RealProperty(2, 38, 4200, "Two bedrooms downtown")
a3 = RealProperty(3, 78, 2500, "Three bedrooms in the suburbs")
a4 = RealProperty(6, 215, 500, "Farm in the middle of nowhere")
a5 = RealProperty(4, 105, 1700, "Loft in a small town")
a6 = RealProperty(25, 1200, 2500, "Countryside mansion")

properties = [a1, a2, a3, a4, a5, a6]

print(f"более дешёвые варианты по сравнению с {a3.description}:")
for item in cheaper_properties(properties, a3):
    print(f"{item[0].description:35} разность в цене {item[1]} евро")
```

<sample-output>

более дешёвые варианты по сравнению с Three bedrooms in the suburbs:
Central studio                      разность в цене 107000 евро
Two bedrooms downtown               разность в цене 35400 евро
Farm in the middle of nowhere       разность в цене 87500 евро
Loft in a small town               разность в цене 16500 евро

</sample-output>

</programming-exercise>

## Генераторы и словари

В генераторах нет ничего по сути "списочного". Результат - список, потому что выражение генератора заключено в квадратные скобки, которые указывают на список Python. Генераторы работают точно так же с словарями Python, если вы используете фигурные скобки вместо этого. Помните, однако, что словари требуют пар ключ-значение. Оба должны быть указаны при создании словаря, также с генераторами.

Основой генератора может быть любая итерируемая серия, будь то список, строка, кортеж, словарь, любые из ваших собственных итерируемых классов и так далее.

В следующем примере мы используем строку как основу словаря. Словарь содержит все уникальные символы в строке вместе с количеством раз, которое они встречались:

```python
sentence = "hello there"

char_counts = {character : sentence.count(character) for character in sentence}
print(char_counts)
```

<sample-output>

{'h': 2, 'e': 3, 'l': 2, 'o': 1, ' ': 1, 't': 1, 'r': 1}

</sample-output>

Принцип выражения генератора точно такой же, как со списками, но вместо одного значения выражение теперь состоит из ключа и значения. Общий синтаксис выглядит так:

`{<выражение ключа> : <выражение значения> for <элемент> in <серия>}`

Чтобы завершить этот раздел, давайте снова посмотрим на факториалы. На этот раз мы сохраняем результаты в словаре. Само число является ключом, а значение - результат факториала из нашей функции:

```python
def factorial(n: int):
    """ Функция вычисляет факториал n! для целых чисел больше нуля """
    k = 1
    while n >= 2:
        k *= n
        n -= 1
    return k

if __name__ == "__main__":
    numbers = [-2, 3, 2, 1, 4, -10, 5, 1, 6]
    factorials = {number : factorial(number) for number in numbers if number > 0}
    print(factorials)
```

<sample-output>

{3: 6, 2: 2, 1: 1, 4: 24, 5: 120, 6: 720}

</sample-output>

<programming-exercise name='Lengths of strings' tmcname='part11-11_lengths_of_strings'>

Напишите функцию `lengths(strings: list)`, которая принимает список строк в качестве аргумента. Функция должна вернуть _словарь_ со строками в списке в качестве ключей и их длинами в качестве значений.

Функция должна быть реализована с генератором словарей. Максимальная длина функции - две строки кода, включая строку заголовка, начинающуюся с ключевого слова `def`.

Функция должна работать следующим образом:

```python
word_list = ["once", "upon" , "a", "time", "in"]

word_lengths = lengths(word_list)
print(word_lengths)
```

<sample-output>

{'once': 4, 'upon': 4, 'a': 1, 'time': 4, 'in': 2}

</sample-output>


</programming-exercise>

<programming-exercise name='Most common words' tmcname='part11-12_most_common_words'>

Напишите функцию `most_common_words(filename: str, lower_limit: int)`, которая принимает имя файла и целое значение для нижнего предела в качестве аргументов. Функция должна вернуть словарь, содержащий вхождения слов, которые появляются как минимум количество раз, указанное в параметре `lower_limit`.

Например, скажем, функция была использована для обработки файла _comprehensions.txt_ со следующим содержимым:

```txt
List comprehension is an elegant way to define and create lists based on existing lists.
List comprehension is generally more compact and faster than normal functions and loops for creating list.
However, we should avoid writing very long list comprehensions in one line to ensure that code is user-friendly.
Remember, every list comprehension can be rewritten in for loop, but every for loop can't be rewritten in the form of list comprehension.
```

Когда функция вызывается с аргументами `most_common_words("comprehensions.txt", 3)`, она должна вернуть

<sample-output>

{'comprehension': 4, 'is': 3, 'and': 3, 'for': 3, 'list': 4, 'in': 3}

</sample-output>

Примечание: регистр букв влияет на результаты, и все словоформы являются уникальными словами в этом упражнении. То есть слова `List`, `lists` и `list` каждое является отдельным словом здесь, и только `list` имеет достаточно вхождений, чтобы попасть в возвращаемый список. Вся пунктуация должна быть удалена перед подсчётом вхождений.

Вам решать, как это реализовать. Самым простым способом, вероятно, было бы использование генераторов списков и словарей.

</programming-exercise>