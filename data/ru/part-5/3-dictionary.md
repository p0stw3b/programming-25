---
path: '/ru/part-5/3-dictionary'
title: 'Словарь'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела

- Вы будете знакомы со структурой данных словарь
- Вы сможете использовать словарь с разными типами ключей и значений
- Вы узнаете, как перебирать содержимое словаря
- Вы сможете назвать некоторые типичные случаи использования словарей

</text-box>

Списки могут быть полезными во многих ситуациях, но они ограничены тем фактом, что элементы доступны через индексы: 0, 1, 2 и так далее. Если вы хотите найти какой-то элемент в списке, вам нужно либо знать его индекс, либо, в худшем случае, перебрать весь список.

Еще одной центральной структурой данных в Python является _словарь_. В словаре элементы индексируются _ключами_. Каждый ключ соответствует _значению_. Значения, хранящиеся в словаре, можно получить и изменить, используя ключ.

## Использование словаря

Следующий пример показывает, как работает структура данных словарь. Вот простой словарь с финского на английский:

```python
my_dictionary = {}

my_dictionary["apina"] = "monkey"
my_dictionary["banaani"] = "banana"
my_dictionary["cembalo"] = "harpsichord"

print(len(my_dictionary))
print(my_dictionary)
print(my_dictionary["apina"])
```

<sample-output>

3
{'apina': 'monkey', 'banaani': 'banana', 'cembalo': 'harpsichord'}
monkey

</sample-output>

Обозначение `{}` создает пустой словарь, в который мы теперь можем добавить содержимое. Добавлены три пары ключ-значение: `"apina"` соответствует `"monkey"`, `"banaani"` соответствует `"banana"`, и `"cembalo"` соответствует `"harpsichord"`. Наконец, выводится количество пар ключ-значение в словаре, весь словарь и значение, соответствующее ключу `"apina"`.

После определения словаря мы также можем использовать его с пользовательским вводом:

```python
word = input("Please type in a word: ")
if word in my_dictionary:
    print("Translation: ", my_dictionary[word])
else:
    print("Word not found")
```

Обратите внимание на использование оператора `in` выше. Когда он используется с переменной типа словарь, он проверяет, находится ли первый операнд среди ключей, хранящихся в словаре. При разных входных данных эта программа может вывести следующее:

<sample-output>

Please type in a word: **apina**
Translation: monkey

</sample-output>

<sample-output>

Please type in a word: **pöllö**
Word not found

</sample-output>

## Что можно хранить в словаре?

Тип данных называется словарь, но он не обязательно должен содержать только строки. Например, в следующем словаре ключи - строки, но значения - целые числа:

```python
results = {}
results["Mary"] = 4
results["Alice"] = 5
results["Larry"] = 2
```

Здесь ключи - целые числа, а значения - списки:

```python
lists = {}
lists[5] = [1, 2, 3]
lists[42] = [5, 4, 5, 4, 5]
lists[100] = [5, 2, 3]
```

## Как работают ключи и значения

Каждый ключ может появляться только один раз в словаре. Если вы добавляете запись, используя ключ, который уже существует в словаре, исходное значение, соответствующее этому ключу, заменяется новым значением:

```python
my_dictionary["suuri"] = "big"
my_dictionary["suuri"] = "large"
print(my_dictionary["suuri"])
```

<sample-output>

large

</sample-output>

Все ключи в словаре должны быть _неизменяемыми_. Поэтому список нельзя использовать в качестве ключа, потому что его можно изменить. Например, выполнение следующего кода вызывает ошибку:

```python
my_dictionary[[1, 2, 3]] = 5
```

<sample-output>

TypeError: unhashable type: 'list'

</sample-output>

<text-box variant="hint" name="Хеш-таблица">

Обратите внимание на слово 'unhashable' в сообщении об ошибке выше. Это ссылка на внутреннее устройство типа данных словарь. Python хранит содержимое словаря в _хеш-таблице_. Каждый ключ сводится к _хеш-значению_, которое определяет, где ключ хранится в памяти компьютера. Сообщение об ошибке выше указывает, что список не может быть обработан в хеш-значение, поэтому его нельзя использовать в качестве ключа в словаре.

Курсы _Структуры данных и алгоритмы_ далее исследуют хеш-таблицы.

</text-box>

В отличие от ключей, _значения_, хранящиеся в словаре, могут изменяться, поэтому любой тип данных приемлем в качестве значения. Значение также может соответствовать более чем одному ключу в том же словаре.

<programming-exercise name='Умножить на десять' tmcname='part05-14_times_ten'>

Пожалуйста, напишите функцию с именем `times_ten(start_index: int, end_index: int)`, которая создает и возвращает новый словарь. Ключами словаря должны быть числа между `start_index` и `end_index` включительно.

Значение, соответствующее каждому ключу, должно быть ключом, умноженным на десять.

Например:

```python
d = times_ten(3, 6)
print(d)
```

<sample-output>

{3: 30, 4: 40, 5: 50, 6: 60}

</sample-output>

</programming-exercise>

<programming-exercise name='Факториалы' tmcname='part05-15_factorials'>

Пожалуйста, напишите функцию с именем `factorials(n: int)`, которая возвращает факториалы чисел от 1 до `n` в словаре. Число является ключом, а факториал этого числа - значением, соответствующим ему.

Напоминание: факториал числа `n` записывается как `n`! и вычисляется умножением числа на каждое целое число меньше его самого. Например, факториал 4 равен 4 * 3 * 2 * 1 = 24.

Пример работы функции:

```python
k = factorials(5)
print(k[1])
print(k[3])
print(k[5])
```

<sample-output>

1
6
120

</sample-output>

</programming-exercise>

## Перебор словаря

Знакомый цикл `for item in collection` также можно использовать для перебора словаря. Когда он используется непосредственно со словарем, цикл проходит через ключи, хранящиеся в словаре, один за другим. В следующем примере выводятся все ключи и значения, хранящиеся в словаре:

```python
my_dictionary = {}

my_dictionary["apina"] = "monkey"
my_dictionary["banaani"] = "banana"
my_dictionary["cembalo"] = "harpsichord"

for key in my_dictionary:
    print("key:", key)
    print("value:", my_dictionary[key])
```

<sample-output>

key: apina
value: monkey
key: banaani
value: banana
key: cembalo
value: harpsichord

</sample-output>

Иногда нужно перебрать все содержимое словаря. Метод `items` возвращает все ключи и значения, хранящиеся в словаре, по одной паре за раз:

```python

for key, value in my_dictionary.items():
    print("key:", key)
    print("value:", value)
```

В примерах выше вы могли заметить, что ключи обрабатываются в том же порядке, в котором они были добавлены в словарь. Поскольку ключи обрабатываются на основе хеш-значения, порядок обычно не должен иметь значения в приложениях. Фактически, во многих старых версиях Python порядок не гарантированно соответствует времени вставки.

## Некоторые более продвинутые способы использования словарей

Давайте рассмотрим список слов:

```python
word_list = [
  "banana", "milk", "beer", "cheese", "sourmilk", "juice", "sausage",
  "tomato", "cucumber", "butter", "margarine", "cheese", "sausage",
  "beer", "sourmilk", "sourmilk", "butter", "beer", "chocolate"
]
```

Мы хотели бы проанализировать этот список слов различными способами. Например, мы хотели бы знать, сколько раз каждое слово появляется в списке.

Словарь может быть полезным инструментом для управления такой информацией. В приведенном ниже примере мы проходим через элементы в списке один за другим. Используя слова в списке в качестве ключей в новом словаре, значение, соответствующее каждому ключу, - это количество раз, когда слово появилось:

```python
def counts(my_list):
    words = {}
    for word in my_list:
        # if the word is not yet in the dictionary, initialize the value to zero
        if word not in words:
            words[word] = 0
        # increment the value
        words[word] += 1
    return words

# call the function
print(counts(word_list))
```

Программа выводит следующее:

<sample-output>

{'banana': 1, 'milk': 1, 'beer': 3, 'cheese': 2, 'sourmilk': 3, 'juice': 1, 'sausage': 2, 'tomato': 1, 'cucumber': 1, 'butter': 2, 'margarine': 1, 'chocolate': 1}

</sample-output>

Что если мы хотим категоризировать слова на основе первой буквы в каждом слове? Один из способов достичь этого - использовать словари:

```python
def categorize_by_initial(my_list):
    groups = {}
    for word in my_list:
        initial = word[0]
        # initialize a new list when the letter is first encountered
        if initial not in groups:
            groups[initial] = []
        # add the word to the appropriate list
        groups[initial].append(word)
    return groups

groups = categorize_by_initial(word_list)

for key, value in groups.items():
    print(f"words beginning with {key}:")
    for word in value:
        print(word)
```
Структура функции очень похожа на предыдущее упражнение, но на этот раз значения, соответствующие ключам, - это списки. Программа выводит следующее:

<sample-output>

words beginning with b:
banana
beer
butter
beer
butter
beer
words beginning with m:
milk
margarine
words beginning with c:
cheese
cucumber
cheese
chocolate
words beginning with s:
sourmilk
sausage
sausage
sourmilk
sourmilk
words beginning with j:
juice
words beginning with t:
tomato

</sample-output>

<programming-exercise name='Гистограмма' tmcname='part05-16_histogram'>

Пожалуйста, напишите функцию с именем `histogram`, которая принимает строку в качестве аргумента. Функция должна вывести гистограмму, представляющую количество раз, когда каждая буква встречается в строке. Каждое вхождение буквы должно быть представлено звездочкой на конкретной строке для этой буквы.

Например, вызов функции `histogram("abba")` должен вывести

<sample-output>

<pre>
a **
b **
</pre>

</sample-output>

в то время как `histogram("statistically")` должен вывести

<sample-output>

<pre>
s **
t ***
a **
i **
c *
l **
y *
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name='Телефонная книга, версия 1' tmcname='part05-17_phone_book_v1'>

Пожалуйста, напишите приложение телефонной книги. Оно должно работать следующим образом:

<sample-output>

command (1 search, 2 add, 3 quit): **2**
name: **peter**
number: **040-5466745**
ok!
command (1 search, 2 add, 3 quit): **2**
name: **emily**
number: **045-1212344**
ok!
command (1 search, 2 add, 3 quit): **1**
name: **peter**
040-5466745
command (1 search, 2 add, 3 quit): **1**
name: **mary**
no number
command (1 search, 2 add, 3 quit): **2**
name: **peter**
number: **09-22223333**
ok!
command (1 search, 2 add, 3 quit): **1**
name: **peter**
09-22223333
command (1 search, 2 add, 3 quit): **3**
quitting...

</sample-output>

Как вы можете видеть выше, к каждому имени может быть прикреплен только один номер. Если добавляется новая запись с тем же именем, номер, прикрепленный к старой записи, заменяется новым номером.

**Примечание:** это упражнение не просит вас писать функции, поэтому вы __не должны__ размещать какой-либо код внутри блока `if __name__ == "__main__"`.

</programming-exercise>

<programming-exercise name='Телефонная книга, версия 2' tmcname='part05-18_phone_book_v2'>

Пожалуйста, напишите улучшенную версию приложения телефонной книги. Каждая запись должна теперь вмещать несколько телефонных номеров. Приложение должно работать во всем остальном точно так же, как выше, но на этот раз _все_ номера, прикрепленные к имени, должны быть выведены.

<sample-output>

command (1 search, 2 add, 3 quit): **2**
name: **peter**
number: **040-5466745**
ok!
command (1 search, 2 add, 3 quit): **2**
name: **emily**
number: **045-1212344**
ok!
command (1 search, 2 add, 3 quit): **1**
name: **peter**
040-5466745
command (1 search, 2 add, 3 quit): **1**
name: **mary**
no number
command (1 search, 2 add, 3 quit): **2**
name: **peter**
number: **09-22223333**
ok!
command (1 search, 2 add, 3 quit): **1**
name: **peter**
040-5466745
09-22223333
command (1 search, 2 add, 3 quit): **3**
quitting...

</programming-exercise>

## Removing keys and values from a dictionary

It is naturally possible to also remove key-value pairs from the dictionary. There are two ways to accomplish this. The first is the command `del`:

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
del staff["David"]
print(staff)
```

<sample-output>

{'Alan': 'lecturer', 'Emily': 'professor'}

</sample-output>

Если вы попытаетесь использовать команду `del` для удаления ключа, который не существует в словаре, будет ошибка:

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
del staff["Paul"]
```

<sample-output>

<pre>
>>> del staff["Paul"]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'Paul'
</pre>

</sample-output>

Поэтому перед удалением ключа следует проверить, присутствует ли он в словаре:

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
if "Paul" in staff:
  del staff["Paul"]
  print("Deleted")
else:
  print("This person is not a staff member")
```

Другой способ удалить записи в словаре - метод `pop`:

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
deleted = staff.pop("David")
print(staff)
print(deleted, "deleted")
```

<sample-output>

{'Alan': 'lecturer', 'Emily': 'professor'}
lecturer deleted

</sample-output>

Как видите выше, `pop` также возвращает значение из удаленной записи.

По умолчанию `pop` также вызовет ошибку, если вы попытаетесь удалить ключ, которого нет в словаре. Можно избежать этого, дав методу второй аргумент, который содержит _значение по умолчанию для возврата_. Это значение возвращается, если ключ не найден в словаре. Специальное значение Python `None` подойдет здесь:

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
deleted = staff.pop("Paul", None)
if deleted == None:
  print("This person is not a staff member")
else:
  print(deleted, "deleted")
```

<sample-output>

This person is not a staff member

</sample-output>

Примечание: если вам нужно удалить содержимое всего словаря и попробовать сделать это с помощью цикла for, например так

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
for key in staff:
  del staff[key]
```

вы получите сообщение об ошибке:

<sample-output>

RuntimeError: dictionary changed size during iteration

</sample-output>

При переборе коллекции с помощью цикла `for` содержимое не может изменяться во время выполнения цикла.

К счастью, есть метод словаря именно для этой цели:

```python
staff.clear()
```

<programming-exercise name='Инвертировать словарь' tmcname='part05-19_invert_dictionary'>

Пожалуйста, напишите функцию с именем `invert(dictionary: dict)`, которая принимает словарь в качестве аргумента. Словарь должен быть инвертирован на месте так, чтобы значения стали ключами, а ключи стали значениями.

Пример его использования:

```python
s = {1: "first", 2: "second", 3: "third", 4: "fourth"}
invert(s)
print(s)
```

<sample-output>

{"first": 1, "second": 2, "third": 3, "fourth": 4}

</sample-output>

**Примечание:** принципы, касающиеся списков, рассмотренные [здесь](/ru/part-5/2-references#использование-списков-в-качестве-параметров-в-функциях), также действуют для словарей, передаваемых в качестве аргументов.

Если у вас есть проблемы с выполнением этого упражнения, [инструмент визуализации](http://www.pythontutor.com/visualize.html#mode=edit) может помочь вам понять, что ваш код делает или не делает.

</programming-exercise>

<programming-exercise name='Числа прописью' tmcname='part05-20_numbers_spelled_out'>

Пожалуйста, напишите функцию с именем `dict_of_numbers()`, которая возвращает новый словарь. Словарь должен иметь числа от 0 до 99 в качестве ключей. Значение, прикрепленное к каждому ключу, должно быть числом, записанным словами. Пожалуйста, посмотрите на пример ниже:

```python
numbers = dict_of_numbers()
print(numbers[2])
print(numbers[11])
print(numbers[45])
print(numbers[99])
print(numbers[0])
```

<sample-output>

two
eleven
forty-five
ninety-nine
zero

</sample-output>

Примечание: Пожалуйста, не формулируйте каждое число прописью вручную. Выясните, как можно использовать циклы и словари в вашем решении.

</programming-exercise>

## Использование словарей для структурированных данных

Словари очень полезны для структурирования данных. Следующий код создаст словарь, который содержит некоторые персональные данные:

```python
person = {"name": "Pippa Python", "height": 154, "weight": 61, "age": 44}
```

Это означает, что у нас есть человек по имени Pippa Python, рост которого 154, вес 61 и возраст 44. Та же информация может так же хорошо храниться в переменных:

```python
name = "Pippa Python"
height = 154
weight = 61
age = 44
```

Преимущество словаря в том, что это коллекция. Он собирает связанные данные под одной переменной, поэтому легко получить доступ к различным компонентам. То же самое преимущество предлагает список:

```python
person = ["Pippa Python", 153, 61, 44]
```

Со списками программист должен будет запомнить, что хранится в каждом индексе списка. Ничто не указывает, что `person[2]` содержит вес, а `person[3]` - возраст человека. При использовании словаря эта проблема избегается, поскольку каждая часть данных доступна через именованный ключ.

Предполагая, что мы определили несколько людей, используя тот же формат, мы можем получить доступ к их данным следующим образом:

```python
person1 = {"name": "Pippa Python", "height": 154, "weight": 61, "age": 44}
person2 = {"name": "Peter Pythons", "height": 174, "weight": 103, "age": 31}
person3 = {"name": "Pedro Python", "height": 191, "weight": 71, "age": 14}

people = [person1, person2, person3]

for person in people:
    print(person["name"])

combined_height = 0
for person in people:
    combined_height += person["height"]

print("The average height is", combined_height / len(people))
```

<sample-output>

Pippa Python
Peter Pythons
Pedro Python
The average height is 173.0

</sample-output>

<programming-exercise name='База данных фильмов' tmcname='part05-21_movie_database'>

Пожалуйста, напишите функцию с именем `add_movie(database: list, name: str, director: str, year: int, runtime: int)`, которая добавляет новый объект фильма в базу данных фильмов.

База данных - это список, и каждый объект фильма в списке - это словарь. Словарь должен содержать следующие ключи.

* name
* director
* year
* runtime

Значения, прикрепленные к этим ключам, передаются в качестве аргументов функции.

Пример его использования:

```python
database = []
add_movie(database, "Gone with the Python", "Victor Pything", 2017, 116)
add_movie(database, "Pythons on a Plane", "Renny Pytholin", 2001, 94)
print(database)
```

<sample-output>

[{"name": "Gone with the Python", "director": "Victor Pything", "year": 2017, "runtime": 116}, {"name": "Pythons on a Plane", "director": "Renny Pytholin", "year": 2001, "runtime": 94}]

</sample-output>

</programming-exercise>

<programming-exercise name='Найти фильмы' tmcname='part05-22_find_movies'>

Пожалуйста, напишите функцию с именем `find_movies(database: list, search_term: str)`, которая обрабатывает базу данных фильмов, созданную в предыдущем упражнении. Функция должна составить новый список, который содержит только фильмы, название которых включает искомое слово. Регистр здесь не важен. Поиск `ana` должен вернуть список, содержащий как `Anaconda`, так и `Management`.

Пример его использования:

```python
database = [{"name": "Gone with the Python", "director": "Victor Pything", "year": 2017, "runtime": 116},
{"name": "Pythons on a Plane", "director": "Renny Pytholin", "year": 2001, "runtime": 94},
{"name": "Dawn of the Dead Programmers", "director": "M. Night Python", "year": 2011, "runtime": 101}]

my_movies = find_movies(database, "python")
print(my_movies)
```

<sample-output>

[{"name": "Gone with the Python", "director": "Victor Pything", "year": 2017, "runtime": 116}, {"name": "Pythons on a Plane", "director": "Renny Pytholin", "year": 2001, "runtime": 94}]

</sample-output>

</programming-exercise>

На этом этапе курса вы можете выбрать участие в исследовании, связанном с изучением программирования. Участие добровольное, и отдельных участников нельзя идентифицировать из данных, собранных в исследовании. Вы можете свободно выйти из эксперимента в любой момент. [Нажмите здесь, чтобы начать исследование!](https://runestone.academy/ns/books/published/p3pt/index.html)

<!---
Викторина для обзора содержания этого раздела:

<quiz id="6361eeca-a2e2-5577-892c-749706d754f0"></quiz>
-->