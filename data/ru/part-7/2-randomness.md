---
path: '/ru/part-7/2-randomness'
title: 'Случайность'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела

- Вы познакомитесь с некоторыми функциями в модуле `random`
- Вы сможете использовать случайные числа в своих программах

</text-box>

Этот раздел концентрируется на модуле [random](https://docs.python.org/3/library/random.html?highlight=random#module-random) из стандартной библиотеки Python. Он содержит инструменты для генерации случайных чисел и другой рандомизированной функциональности.

Разделы в этой части материала содержат много ссылок на [документацию](https://docs.python.org/3/library/) стандартной библиотеки Python. Мы рекомендуем перейти по ссылкам, чтобы ознакомиться с тем, как работает документация.

## Генерация случайного числа

Функция [randint(a, b)](https://docs.python.org/3/library/random.html?highlight=random#random.randint) возвращает случайное целочисленное значение между `a` и `b` включительно. Например, следующая программа работает как обычный кубик:

```python
from random import randint

print("The result of the throw:", randint(1, 6))
```

Выполнение этого может напечатать:

<sample-output>

The result of the throw: 4

</sample-output>

Следующая программа бросает кубик десять раз:

```python
from random import randint

for i in range(10):
    print("The result of the throw:", randint(1, 6))
```

Запуск приведенного выше кода может напечатать

<sample-output>

The result of the throw: 5
The result of the throw: 4
The result of the throw: 3
The result of the throw: 2
The result of the throw: 3
The result of the throw: 4
The result of the throw: 6
The result of the throw: 4
The result of the throw: 4
The result of the throw: 3

</sample-output>

Примечание: стоит помнить, что функция `randint` работает немного по-другому по сравнению с, например, срезами или функцией `range`, с которыми мы сталкивались ранее. Вызов функции `randint(1, 6)` приводит к числу между 1 и 6 включительно, но вызов функции `range(1, 6)` приводит к диапазону чисел от 1 до 5.

## Больше функций рандомизации

Функция [shuffle](https://docs.python.org/3/library/random.html?highlight=random#random.shuffle) перемешает любую структуру данных, переданную как аргумент, на месте. Например, следующая программа перемешивает список слов:

```python
from random import shuffle

words = ["atlas", "banana", "carrot"]
shuffle(words)
print(words)
```

<sample-output>

['banana', 'atlas', 'carrot']

</sample-output>

Функция `choice` возвращает случайно выбранный элемент из структуры данных:

```python
from random import choice

words = ["atlas", "banana", "carrot"]
print(choice(words))
```

<sample-output>

'carrot'

</sample-output>

## Номера лотереи

Распространенным примером для изучения случайности является случай номеров лотереи. Давайте попробуем вытянуть несколько номеров лотереи. В Финляндии национальная лотерея состоит из пула 40 чисел, 7 из которых выбираются для тиража каждой недели.

Первая попытка розыгрыша набора чисел может выглядеть так:

```python
from random import randint

for i in range(7):
    print(randint(1, 40))
```

Однако это не сработало бы в долгосрочной перспективе, поскольку одно и то же число может появиться дважды в одном недельном розыгрыше семи чисел. Нам нужен способ убедиться, что вытянутые числа все уникальны.

Одна возможность - сохранить вытянутые числа в списке и добавлять число, только если его еще нет в списке. Это можно повторять, пока длина списка не станет семь:

```python
from random import randint

weekly_draw = []
while len(weekly_draw) < 7:
    new_rnd = randint(1, 40)
    if new_rnd not in weekly_draw:
        weekly_draw.append(new_rnd)

print(weekly_draw)
```

Более компактный подход - использовать функцию `shuffle`:

```python
from random import shuffle

number_pool = list(range(1, 41))
shuffle(number_pool)
weekly_draw = number_pool[0:7]
print(weekly_draw)
```

Здесь идея заключается в том, что мы сначала создаем список, содержащий доступные числа от 1 до 40, довольно похожий на шары в лотерейной машине. Пул чисел затем перемешивается, и первые семь чисел выбираются для недельного розыгрыша. Это избавляет нас от необходимости писать цикл.

Фактически, модуль `random` содержит еще более простой способ выбора номеров лотереи: функция [sample](https://docs.python.org/3/library/random.html?highlight=random#random.sample). Она возвращает случайную выборку указанного размера из заданной структуры данных:

```python
from random import sample

number_pool = list(range(1, 41))
weekly_draw = sample(number_pool, 7)
print(weekly_draw)
```

<programming-exercise name='Lottery numbers' tmcname='part07-04_lottery_numbers'>

Пожалуйста, напишите функцию с именем `lottery_numbers(amount: int, lower: int, upper: int)`, которая генерирует столько случайных чисел, сколько указано первым аргументом. Все числа должны попадать в границы от `lower` до `upper`. Числа должны быть сохранены в списке и возвращены. Числа должны быть в возрастающем порядке в возвращаемом списке.

Поскольку это номера лотереи, ни одно число не должно появляться дважды в списке.

Пример того, как функция должна работать:

```python
for number in lottery_numbers(7, 1, 40):
    print(number)
```

<sample-output>

4
7
11
16
22
29
38

</sample-output>

</programming-exercise>

## Откуда берутся эти случайные числа?

Особенности модуля [random](https://docs.python.org/3/library/random.html) основаны на алгоритме, который производит случайные числа на основе конкретного значения инициализации и некоторых арифметических операций. Значение инициализации часто называется _начальным значением_.

Начальное значение может быть предоставлено пользователем с функцией [seed](https://docs.python.org/3/library/random.html?highlight=random#random.seed):

```python
from random import randint, seed

seed(1337)
# this will always produce the same "random" number
print(randint(1, 100))
```

Если у нас есть функции, которые полагаются на рандомизацию, и мы устанавливаем начальное значение, функция будет производить тот же результат каждый раз, когда она выполняется. Результат может отличаться в разных версиях Python, но по сути случайность теряется установкой начального значения. Это может быть полезной особенностью при тестировании программы, например.

<text-box variant="info" name="Истинная случайность">

Точнее говоря, числа, предоставляемые модулем `random`, не являются по-настоящему случайными. Вместо этого они _псевдослучайные_. Компьютеры, по сути, являются детерминированными машинами. В идеальной ситуации должно быть возможно предсказать способ их функционирования до последнего бита. Поэтому очень трудно создавать по-настоящему случайные числа с помощью компьютера. Однако для многих приложений псевдослучайных чисел достаточно. Когда требуются истинно случайные числа, начальное значение обычно генерируется каким-то источником вне компьютера, например фоновым излучением, уровнями шума или [лавовыми лампами](https://blog.cloudflare.com/randomness-101-lavarand-in-production/).

Для получения дополнительной информации о случайности, пожалуйста, смотрите <a href="https://www.random.org/randomness/">random.org</a>.

</text-box>

<programming-exercise name='Password generator, part 1' tmcname='part07-05_password_generator_part_1'>

Пожалуйста, напишите функцию, которая создает пароли желаемой длины, состоящие из строчных символов от a до z.

Пример того, как функция должна работать:

```python
for i in range(10):
    print(generate_password(8))
```

<sample-output>

lttehepy
olsxttjl
cbjncrzo
dwxqjdgu
gpfdcecs
jabyvgar
xnbbonbl
ktmsjyww
ejhprmel
rjkoacib

</sample-output>

</programming-exercise>

<programming-exercise name='Password generator, part 2' tmcname='part07-06_password_generator_part_2'>

Пожалуйста, напишите улучшенную версию вашего генератора паролей. Функция теперь принимает три аргумента:

* Если второй аргумент `True`, сгенерированный пароль должен также содержать одну или более цифр.
* Если третий аргумент `True`, сгенерированный пароль должен также содержать один или более из этих специальных символов: `!?=+-()#`.

Несмотря на эти два дополнительных аргумента, пароль должен всегда содержать по крайней мере одну строчную букву алфавита. Вы можете предположить, что функция будет вызываться только с комбинациями аргументов, которые возможно сформулировать в пароли, следующие этим правилам. То есть аргументы не будут указывать например пароль длиной 2, который содержит как цифру, так и специальные символы, поскольку тогда не было бы места для обязательной строчной буквы.

Пример того, как функция должна работать:

```python
for i in range(10):
    print(generate_strong_password(8, True, True))
```

<sample-output>

2?0n+u31
u=m4nl94
n#=i6r#(
da9?zvm?
7h)!)g?!
a=59x2n5
(jr6n3b5
9n(4i+2!
32+qba#=
n?b0a7ey

</sample-output>

</programming-exercise>

<programming-exercise name='Dice roller' tmcname='part07-07_dice_roller'>

В этом упражнении вы напишете несколько функций, которые могут использоваться в играх с кубиками.

Вместо обычных кубиков это упражнение определяет _нетранзитивные кубики_. Вы можете прочитать о них [здесь](https://singingbanana.com/dice/article.htm) или [посмотреть это видео](https://www.youtube.com/watch?v=LrIp6CKUlH8).

Вы будете использовать три кубика:

- Кубик A имеет стороны 3, 3, 3, 3, 3, 6
- Кубик B имеет стороны 2, 2, 2, 5, 5, 5
- Кубик C имеет стороны 1, 4, 4, 4, 4, 4

</pre>

Пожалуйста, напишите функцию с именем `roll(die: str)`, которая бросает кубик, указанный аргументом. Пример того, как это должно работать:

```python
for i in range(20):
    print(roll("A"), " ", end="")
print()
for i in range(20):
    print(roll("B"), " ", end="")
print()
for i in range(20):
    print(roll("C"), " ", end="")
```

<sample-output>

3  3  3  3  3  3  3  3  3  3  3  3  3  3  3  3  6  3  6  3
2  2  5  2  2  5  5  2  2  5  2  5  5  5  2  5  2  2  2  2
4  4  4  4  4  1  1  4  4  4  1  4  4  4  4  4  4  4  4  4

</sample-output>

Также напишите функцию с именем `play(die1: str, die2: str, times: int)`, которая бросает оба кубика столько раз, сколько указано третьим аргументом. Функция должна возвращать кортеж. Первый элемент должен быть количеством раз, когда выиграл кубик 1, второй - количеством раз, когда выиграл кубик 2, а третий элемент должен быть количеством ничьих.

```python
result = play("A", "C", 1000)
print(result)
result = play("B", "B", 1000)
print(result)
```

<sample-output>

(292, 708, 0)
(249, 273, 478)

</sample-output>

</programming-exercise>

<programming-exercise name='Random words' tmcname='part07-08_random_words'>

Шаблон упражнения содержит файл `words.txt`, который содержит некоторые слова английского языка, по одному на каждой строке.

Пожалуйста, напишите функцию с именем `words(n: int, beginning: str)`, которая возвращает список, содержащий `n` случайных слов из файла `words.txt`. Все слова должны начинаться со строки, указанной вторым аргументом.

Одно и то же слово не должно появляться дважды в списке. Если недостаточно слов, начинающихся с указанной строки, функция должна вызвать исключение `ValueError`.

Пример работы функции:

```python
word_list = words(3, "ca")
for word in word_list:
    print(word)
```

<sample-output>

cat
car
carbon

</sample-output>

</programming-exercise>

<!---
<quiz id="d53a6898-f390-55ef-b266-95694bcbe704"></quiz>
-->