---
path: '/ru/part-11/3-recursion'
title: 'Рекурсия'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела

- Вы будете знать, что означает рекурсия
- Вы сможете написать простую рекурсивную функцию

</text-box>

Как мы видели много раз раньше, функции могут вызывать другие функции. Например:

```python
def hello(name : str):
    print("Hello", name)

def hello_many_times(name : str, times : int):
    for i in range(times):
        hello(name)
```

Функция также может вызывать саму себя, но мы как программисты должны быть осторожными, когда делаем это. Легко попасть в бесконечный цикл вызовов функций, точно так же, как мы попадали в бесконечный цикл повторений с циклами `while`, если мы не включали соответствующие условия выхода. Итак, попытка вызвать функцию `hello` со следующим определением

```python
def hello(name : str):
    print("Hello", name)
    hello(name) # function calls itself
```

привела бы к новому виду ошибки:

<sample-output>

RecursionError: maximum recursion depth exceeded

</sample-output>

## Что означает рекурсия?

_Рекурсия_, упомянутая в ошибке выше, относится к _определению чего-то в терминах самого себя_. В контексте программирования это обычно относится к функции, которая вызывает саму себя. Чтобы это работало без вызова бесконечных циклов, аргументы, передаваемые функции, должны изменяться каждый раз, чтобы вложенные вызовы функций остановились в какой-то момент. Основной принцип здесь такой же, как в циклах `while`: всегда должно быть условие остановки какого-то рода, и это условие должно срабатывать в какой-то момент выполнения.

Давайте посмотрим на простую функцию, которая добавляет нули в список до тех пор, пока в списке менее 10 элементов. На этот раз мы не используем цикл, однако. Если условие ещё не выполнено, функция вызывает саму себя:

```python
def fill_list(numbers: list):
    """ If the length of the list is less than 10, add items to the list """
    if len(numbers) < 10:
        numbers.append(0)
        # call the function again
        fill_list(numbers)


if __name__ == "__main__":
    test_list = [1,2,3,4]
    fill_list(test_list)
    print(test_list)
```

<sample-output>

[1, 2, 3, 4, 0, 0, 0, 0, 0, 0]

</sample-output>

Эту функциональность можно было бы так же хорошо достичь с обычным циклом `while`:

```python
def fill_list(numbers: list):
    """ If the length of the list is less than 10, add items to the list """
    while len(numbers) < 10:
        numbers.append(0)

if __name__ == "__main__":
    test_list = [1,2,3,4]
    fill_list(test_list)
    print(test_list)
```

Более традиционный итеративный подход производит более короткую программу, которая, возможно, также легче для понимания. С рекурсивной версией не так ясно, что на протяжении всего процесса мы работаем с одним и тем же списком. Тем не менее, это так, и именно поэтому рекурсивная функция работает так же хорошо.

<text-box variant="hint" name="Итеративный или рекурсивный?">

Теория информатики часто различает _итеративные_ и _рекурсивные_ алгоритмы, поэтому лучше ознакомиться с этими терминами прямо с самого начала. Итеративные решения - это те, которые основаны на последовательной обработке элементов, часто с использованием циклов. До сих пор мы имели дело с итеративными методами почти исключительно. Рекурсивный, с другой стороны, относится к методу, где функция вызывает саму себя с изменяющимися значениями параметров.

В принципе должно быть возможно решить любую проблему либо итеративными, либо рекурсивными методами. На практике, однако, один или другой обычно явно лучше подходит для каждой проблемы. Способность определить, что лучше, приходит во многом с практикой.

</text-box>

<programming-exercise name='Add numbers to a list' tmcname='part11-13_add_numbers_to_list'>

Напишите _рекурсивную функцию_ `add_numbers_to_list(numbers: list)`. Функция принимает список чисел в качестве аргумента и добавляет новые числа в список, пока длина списка не станет делиться на пять. Каждое число, добавленное в список, должно быть на единицу больше последнего числа в списке.

Функция должна вызывать саму себя рекурсивно. Посмотрите пример ниже.

```python
numbers = [1,3,4,5,10,11]
add_numbers_to_list(numbers)
print(numbers)
```

<sample-output>

[1, 3, 4, 5, 10, 11, 12, 13, 14, 15]

</sample-output>

</programming-exercise>

## Рекурсия и возвращаемые значения

Рекурсивные функции также могут иметь возвращаемые значения. В последних нескольких разделах мы работали с факториалами, поэтому давайте напишем рекурсивную функцию факториала:

```python

def factorial(n: int):
    """ The function calculates the factorial n! for n >= 0 """
    if n < 2:
        # The factorial for 0 and 1 is 1
        return 1

    # Call the function again with an argument that is one smaller
    return n * factorial(n - 1)

if __name__ == "__main__":
    # Tesing our function
    for i in range(1, 7):
        print(f"The factorial of {i} is {factorial(i)}")

```

<sample-output>

The factorial of 1 is 1
The factorial of 2 is 2
The factorial of 3 is 6
The factorial of 4 is 24
The factorial of 5 is 120
The factorial of 6 is 720

</sample-output>

Если параметр рекурсивной функции factorial равен 0 или 1, функция возвращает 1, потому что именно так определяется операция факториала. В любом другом случае функция возвращает значение `n * factorial(n - 1)`, которое является значением своего параметра `n`, умноженным на возвращаемое значение вызова функции `factorial(n - 1)`.

Ключевая часть здесь в том, что определение функции содержит условие остановки. Если оно выполняется, рекурсия заканчивается. В этом случае это условие `n < 2`. Мы знаем, что оно будет достигнуто в конечном счёте, потому что значение, передаваемое как аргумент функции, уменьшается на единицу на каждом уровне рекурсии.

[Инструмент визуализации](http://www.pythontutor.com/visualize.html#mode=edit) может быть большой помощью в понимании рекурсивных программ.

Приведённый выше пример может стать немного яснее, если мы используем вспомогательные переменные:

```python
def factorial(n: int):
    if n < 2:
        return 1

    factorial_one_level_down = factorial(n - 1)
    factorial_now = n * factorial_one_level_down
    return factorial_now
    
factorial(5)
```

Посмотрите, как [инструмент визуализации](http://www.pythontutor.com/visualize.html#code=def%20factorial%28n%3A%20int%29%3A%0A%20%20%20%20if%20n%20%3C%202%3A%0A%20%20%20%20%20%20%20%20return%201%0A%0A%20%20%20%20factorial_one_level_down%20%3D%20factorial%28n%20-%201%29%0A%20%20%20%20factorial_now%20%3D%20n%20*%20factorial_one_level_down%0A%20%20%20%20return%20factorial_now%0A%20%20%20%20%0Afactorial%285%29&cumulative=false&curInstr=5&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false) демонстрирует прогресс рекурсии.

Инструмент визуализации имеет небольшую особенность в способе обработки стека вызовов, поскольку он, кажется, "растёт" вниз. Обычно стеки вызовов изображаются именно как стеки, где новые вызовы помещаются наверх. В инструменте визуализации активный в настоящее время вызов функции - это затенённый блок внизу, который имеет свои собственные копии видимых переменных.

Когда вызывается рекурсивная функция factorial, стек вызовов строится до тех пор, пока не будет достигнут предел, установленный `n < 2`. Затем окончательный вызов функции в стеке возвращается со значением - это `1`, поскольку `n` теперь меньше 2. Это возвращаемое значение передаётся предыдущему вызову функции в стеке, где оно используется для вычисления возвращаемого значения этого вызова функции, и так далее обратно из стека.

Возвращаемое значение каждого вызова функции сохраняется во вспомогательной переменной `factorial_now`. Пожалуйста, внимательно пройдите через визуализацию, пока не поймёте, что происходит на каждом шаге, и обратите особое внимание на значение, возвращаемое на каждом шаге.

<img src="../../part-11/11_1_1.png">

Давайте посмотрим на другой общий рекурсивный пример: число Фибоначчи. В последовательности Фибоначчи каждое число является суммой двух предшествующих чисел. Первые два числа здесь определены как 1 и 1, и последовательность затем начинается так: 1, 1, 2, 3, 5, 8, 13, 21, 34.

```python
def fibonacci(n: int):
    """ The function returns the nth number in the Fibonacci sequence (1, 1, 2, 3, 5, 8 etc.); n > 0"""

    if n <= 2:
        # the first two are ones
        return 1

    # All other numbers equal the sum of the two preceding numbers in the sequence
    return fibonacci(n - 1) + fibonacci(n - 2)

# Test that everything works
if __name__ == "__main__":
    for i in range(1, 11):
        print(f"The {i}. number in the Fibonacci sequence is {fibonacci(i)}")
```

<sample-output>

The 1. number in the Fibonacci sequence is 1
The 2. number in the Fibonacci sequence is 1
The 3. number in the Fibonacci sequence is 2
The 4. number in the Fibonacci sequence is 3
The 5. number in the Fibonacci sequence is 5
The 6. number in the Fibonacci sequence is 8
The 7. number in the Fibonacci sequence is 13
The 8. number in the Fibonacci sequence is 21
The 9. number in the Fibonacci sequence is 34
The 10. number in the Fibonacci sequence is 55

</sample-output>

На этот раз условие остановки - что параметр меньше или равен 2, потому что вся последовательность определяется от первых двух чисел дальше, и мы определили первые два числа равными 1.

Итак, как эта функция работает на практике?

Если функция вызывается с 1 или 2 в качестве аргумента, она возвращает 1, как диктуется условием `n <= 2`.

Если аргумент равен 3 или больше, функция возвращает значение `fibonacci(n - 1) + fibonacci(n - 2)`. Если аргумент равен точно 3, это значение равно `fibonacci(2) + fibonacci(1)`, и мы уже знаем результат обоих из предыдущего шага. `1 + 1` равно 2, что действительно является третьим числом в последовательности Фибоначчи.

Если аргумент равен 4, возвращаемое значение - `fibonacci(3) + fibonacci(2)`, что мы теперь знаем как `2 + 1`, что равно 3.

Если аргумент равен 5, возвращаемое значение - `fibonacci(4) + fibonacci(3)`, что мы теперь знаем как `3 + 2`, что равно 5.

И так далее, и так далее.

Мы можем проверить на каждом шаге, что функция производит правильные результаты, чего часто достаточно в основных задачах программирования. Формальная проверяемость алгоритмов - тема для более продвинутых курсов, таких как [Структуры данных и алгоритмы](https://studies.helsinki.fi/courses/cur/hy-opt-cur-2122-808d3413-3db0-4ab9-89d9-e816e94bf51d).

<programming-exercise name='Recursive sum' tmcname='part11-14_recursive_sum'>

Напишите рекурсивную функцию `recursive_sum(number: int)`, которая вычисляет сумму `1 + 2 + ... + number`. Шаблон упражнения содержит следующий набросок:

```python
def recursive_sum(number: int):
    # if the number is 1, there is nothing else to add
    if number <= 1:
        return number

    # fill in the rest of the function
```

Несколько примеров:

```python
result = recursive_sum(3)
print(result)

print(recursive_sum(5))
print(recursive_sum(10))
```

<sample-output>

6
15
55

</sample-output>

</programming-exercise>

<programming-exercise name='Balance all the brackets' tmcname='part11-15_balanced_brackets'>

Шаблон упражнения содержит функцию `balanced_brackets`, которая принимает строку в качестве аргумента. Она проверяет, сбалансированы ли _круглые_ скобки, или скобки, в строке. То есть для каждой открывающей скобки `(` должна быть закрывающая скобка `)`, и все пары скобок должны быть сопоставлены по порядку, т.е. пары скобок не должны пересекаться.

```python
def balanced_brackets(my_string: str):
    if len(my_string) == 0:
        return True
    if not (my_string[0] == '(' and my_string[-1] == ')'):
        return False

    # remove first and last character
    return balanced_brackets(my_string[1:-1])

ok = balanced_brackets("(((())))")
print(ok)

# there is one closing bracket too many, so this produces False
ok = balanced_brackets("()())")
print(ok)

# this one starts with a closing bracket, False again
ok = balanced_brackets(")()")
print(ok)

# this produces False because the function only handles entirely nested brackets
ok = balanced_brackets("()(())")
print(ok)
```

<sample-output>

True
False
False
False

</sample-output>

Расширьте функцию так, чтобы она также работала с квадратными скобками `[]`. Функция также должна игнорировать все символы, которые не являются скобками `()` или `[]`. Различные типы скобок должны быть правильно сопоставлены по порядку.

Посмотрите на примеры ниже:

```python
ok = balanced_brackets("([([])])")
print(ok)

ok = balanced_brackets("(python version [3.7]) please use this one!")
print(ok)

# this is no good, the closing bracket doesn't match
ok = balanced_brackets("(()]")
print(ok)

# different types of brackets are mismatched
ok = balanced_brackets("([bad egg)]")
print(ok)
```

Примечание: функция должна обрабатывать только полностью вложенные скобки. Строка `(x + 1)(y + 1)` должна производить `False`, поскольку скобки не вложены одна в другую.

<sample-output>

True
True
False
False


</sample-output>

</programming-exercise>

## Бинарный поиск

В бинарном поиске у нас есть отсортированный список элементов, и мы пытаемся найти определённый элемент внутри. Порядок элементов может быть, например, числа от наименьшего к наибольшему или строки от первых в алфавитном порядке к последним. Метод сортировки не имеет значения, лишь бы он был известен и релевантен для элемента, который мы пытаемся найти.

Идея бинарного поиска - всегда смотреть на элемент в самом центре списка. Затем у нас есть три возможных сценария. Если элемент в центре
- тот, который мы ищем: мы можем вернуть указание, что мы нашли элемент
- меньше того, который мы ищем: мы можем повторить поиск в большей половине списка
- больше того, который мы ищем: мы можем повторить поиск в меньшей половине списка.

Если список пуст, мы можем определить, что элемент не найден, и вернуть указание на это.

На следующем изображении мы можем видеть, как прогрессирует бинарный поиск, когда он ищет число 24:

<img src="../../part-11/11_3_1.png">

Вот рекурсивный алгоритм для бинарного поиска:

```python
def binary_search(target: list, item: int, left : int, right : int):
    """ The function returns True if the item is contained in the target list, False otherwise """
    # If the search area is empty, item was not found
    if left > right:
        return False

    # Calculate the centre of the search area, integer result
    centre = (left+right)//2

    # If the item is found at the centre, return
    if target[centre] == item:
        return True

    # If the item is greater, search the greater half
    if target[centre] < item:
        return binary_search(target, item, centre+1, right)
    # Else the item is smaller, search the smaller half
    else:
        return binary_search(target, item, left, centre-1)


if __name__ == "__main__":
    # Test your function
    target = [1, 2, 4, 5, 7, 8, 11, 13, 14, 18]
    print(binary_search(target, 2, 0, len(target)-1))
    print(binary_search(target, 13, 0, len(target)-1))
    print(binary_search(target, 6, 0, len(target)-1))
    print(binary_search(target, 15, 0, len(target)-1))
```

<sample-output>

True
True
False
False

</sample-output>

Функция `binary_search` принимает четыре аргумента: целевой список, элемент, который ищется, и левый и правый края области поиска. Когда функция вызывается впервые, область поиска покрывает весь целевой список. Левый край находится в индексе `0`, а правый край находится в индексе `len(target)-1`. Функция вычисляет центральный индекс и проверяет эту позицию в списке. Либо элемент найден, либо поиск продолжается в меньшей или большей половине целевого списка.

Давайте сравним это с простым линейным поиском. В линейном поиске область поиска проходится с начала далее, пока либо элемент не найден, либо мы не исчерпаем область поиска. Количество шагов, необходимых для покрытия всей области поиска, растёт _линейно_ в том же темпе, что и размер области поиска. Каждый шаг поиска покрывает только одного кандидата поиска с начала области поиска. Предположим, что искомый элемент _не_ найден. Если область поиска составляет миллион элементов, нам пришлось бы сделать миллион шагов поиска, чтобы убедиться, что элемент не в области поиска.

В бинарном поиске, с другой стороны, количество шагов, необходимых, растёт _логарифмически_. Предположим снова, что искомый элемент _не_ найден. Область поиска сокращается вдвое с каждым шагом, поскольку мы знаем, что элемент либо меньше, либо больше текущего кандидата поиска в центре. 2 в степени 20 (2^20) уже значительно больше 1 миллиона, поэтому потребуется максимум 20 шагов для покрытия всей области поиска с бинарным поиском. Итак, когда мы имеем дело с отсортированными областями поиска, как мы часто делаем при работе с компьютерами и материалами, которые должны автоматически обрабатываться, бинарный поиск намного эффективнее линейного поиска.