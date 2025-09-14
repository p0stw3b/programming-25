---
path: '/ru/part-7/5-creating-modules'
title: 'Создание собственных модулей'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела

- Вы сможете писать собственные модули
- Вы узнаете, что означает переменная Python `__name__` и значение `__main__`

</text-box>

Писать собственные модули Python легко. Любой файл, содержащий действительный код Python, может быть импортирован как модуль. Предположим, у нас есть файл с именем `words.py` со следующим содержимым:

```python
def first_word(my_string: str):
    parts = my_string.split(" ")
    return parts[0]

def last_word(my_string: str):
    parts = my_string.split(" ")
    return parts[-1]

def number_of_words(my_string: str):
    parts = my_string.split(" ")
    return len(parts)
```

Функции, определенные в файле, можно получить, импортировав файл:

```python
import words

my_string = "Sheila sells seashells by the seashore"

print(words.first_word(my_string))
print(words.last_word(my_string))
print(words.number_of_words(my_string))
```

<sample-output>

Sheila
seashore
6

</sample-output>

Примечание: файл, содержащий модуль Python, должен находиться либо в том же каталоге с программой, которая его импортирует, либо в одном из каталогов Python по умолчанию, иначе интерпретатор Python не найдет его при выполнении оператора `import`.

Мы можем использовать собственные модули так же, как мы научились использовать модули из стандартной библиотеки Python:

```python
from words import first_word, last_word

sentence = input("Please type in a sentence: ")

print("The first word was: " + first_word(sentence))
print("The last word was: " + last_word(sentence))
```

<sample-output>

Please type in a sentence: **Python is a swell programming language**
The first word was: Python
The last word was: language

</sample-output>

## Использование подсказок типов

При использовании модулей подсказки типов становятся особенно полезными. Если вы используете редактор, который имеет встроенную поддержку подсказок типов, использование различных модулей становится намного проще.

Например, Visual Studio Code будет отображать подсказки типов при написании кода:

<img src="../../part-7/7_vihje.png">

## Код главной функции в модуле

Если модуль содержит какой-либо код, который не содержится в определении функции (то есть, если модуль содержит код в главной функции модуля), этот код выполняется автоматически при импорте модуля.

Предположим, что наш файл `words.py` также содержал некоторые тестовые случаи:

```python
def first_word(my_string: str):
    parts = my_string.split(" ")
    return parts[0]

def last_word(my_string: str):
    parts = my_string.split(" ")
    return parts[-1]

def number_of_words(my_string: str):
    parts = my_string.split(" ")
    return len(parts)

print(first_word("This is a test"))
print(last_word("Here we are still testing"))
print(number_of_words("One two three four five"))
```

Теперь, если мы импортируем модуль с оператором `import`, весь код в модуле, который находится вне определенных функций, автоматически выполняется:

```python
import words

my_string = "Sheila sells seashells by the seashore"

print(words.first_word(my_string))
print(words.last_word(my_string))
print(words.number_of_words(my_string))
```

<sample-output>

This
testing
5
Sheila
seashore
6

</sample-output>

Как видно выше, это не хороший результат, потому что программа, которую мы пытаемся написать, нарушается тестовыми случаями из самого модуля.

К счастью, есть решение, и это то, которое вы использовали много раз ранее в упражнениях этого курса. Нам просто нужно проверить, выполняется ли программа сама по себе, или код был импортирован с оператором `import`. Python имеет встроенную переменную `__name__`, которая содержит имя выполняемой программы. Если программа выполняется сама по себе, значение переменной равно `__main__`. Если программа была импортирована, значение переменной является именем импортированного модуля (в этом случае `words`).

Зная это, мы можем добавить условный оператор, который позволяет нам выполнять тестовые случаи только в том случае, если программа выполняется сама по себе. Как вы можете видеть ниже, структура выглядит знакомой:

```python
def first_word(my_string: str) -> str:
    parts = my_string.split(" ")
    return parts[0]

def last_word(my_string: str) -> str:
    parts = my_string.split(" ")
    return parts[-1]

def number_of_words(my_string: str) -> int:
    parts = my_string.split(" ")
    return len(parts)

if __name__ == "__main__":
    # testing functionality
    print(first_word("This is a test"))
    print(last_word("Here we are still testing"))
    print(number_of_words("One two three four five"))
```

Если вы выполните модуль сам по себе, тестовые случаи выводятся:

<sample-output>

This
testing
5

</sample-output>

Когда модуль импортируется в другую программу, тестовые случаи не выполняются:

```python
import words

my_string = "Sheila sells seashells by the seashore"

print(words.first_word(my_string))
print(words.last_word(my_string))
print(words.number_of_words(my_string))
```

<sample-output>

Sheila
seashore
6

</sample-output>

В упражнениях этого курса, когда вас просили написать функции, вы обычно также ожидали обернуть тестовые случаи в блок `if __name__ == "__main__"` точно как тот, что выше. Теперь вы знаете почему.

<programming-exercise name='String helper' tmcname='part07-17_string_helper'>

Пожалуйста, напишите модуль с именем `string_helper`, который содержит следующие функции:

Функция `change_case(orig_string: str)` создает и возвращает новую версию строки параметра. Строчные буквы в оригинале должны быть заглавными, а заглавные буквы должны быть строчными.

Функция `split_in_half(orig_string: str)` разделяет строку параметра пополам и возвращает результаты в кортеже. Если в оригинале нечетное количество символов, первая половина должна быть короче.

Функция `remove_special_characters(orig_string: str)` возвращает новую версию строки параметра с удаленными всеми специальными символами. В возвращаемой строке разрешены только строчные и заглавные буквы, числа и пробелы.

Несколько примеров того, как модуль будет использоваться:

```python
import string_helper

my_string = "Well hello there!"

print(string_helper.change_case(my_string))

p1, p2 = string_helper.split_in_half(my_string)

print(p1)
print(p2)

m2 = string_helper.remove_special_characters("This is a test, lets see how it goes!!!11!")
print(m2)
```

<sample-output>

wELL HELLO THERE!
Well hel
lo there!
This is a test lets see how it goes11

</sample-output>

</programming-exercise>

<!---
<quiz id="2203412c-628c-54a3-bd77-edebd5ce4f67"></quiz>
-->

Пожалуйста, ответьте на краткую анкету по материалам этой недели.

<quiz id="483d5609-6819-5c77-86b1-bc8ce20a2e18"></quiz>