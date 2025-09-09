---
path: '/ru/part-11/4-more-recursion-examples'
title: 'Больше примеров рекурсии'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела

- Вы будете знакомы с бинарными деревьями и некоторыми рекурсивными алгоритмами, используемыми для их обработки

</text-box>

Реальные преимущества рекурсии становятся очевидными, когда мы сталкиваемся с проблемами, где итеративные решения трудно написать. Давайте рассмотрим _бинарные деревья_, например. Бинарное дерево - это разветвлённая структура, где у нас есть узлы, и в каждом узле структура разветвляется, максимум, на две дочерние ветви с собственными узлами. Бинарное дерево могло бы тогда выглядеть так (информатику часто считают ветвью естественных наук, но наше понимание деревьев немного перевёрнуто, как вы заметите):

<img src="../../part-11/11_4_1_2.png">

Бинарные деревья должны по крайней мере теоретически легко обрабатываться рекурсивно: если мы хотим выполнить какую-то операцию на каждом узле дерева, наш алгоритм просто должен

1. Обработать текущий узел
2. Вызвать себя на дочернем узле слева
3. Вызвать себя на дочернем узле справа

<img src="../../part-11/11_4_2_2e.png">

Как вы можете видеть из изображения выше, и левое, и правое "поддеревья" являются полноценными бинарными деревьями сами по себе, и единственный узел, оставшийся за пределами рекурсивных вызовов, - это родительский узел, который обрабатывается на шаге 1 перед рекурсивным вызовом функции. Итак, мы можем быть уверены, что когда выполнение функции завершается, каждый узел был посещён точно один раз.

Итеративная версия обхода бинарного дерева была бы гораздо сложнее, поскольку нам пришлось бы каким-то образом отслеживать все узлы, которые мы уже посетили. Те же принципы верны для всех вычислительных древесных структур, не только бинарных.

Бинарное дерево также легко моделируется в коде Python. Нам нужно только написать определение класса для одного узла. У него есть атрибут значения и атрибуты для левого и правого дочерних узлов:

```python

class Node:
    """ Класс представляет одиночный узел в бинарном дереве """
    def __init__(self, value, left_child:'Node' = None, right_child:'Node' = None):
        self.value = value
        self.left_child = left_child
        self.right_child = right_child
```

Теперь предположим, что мы хотим смоделировать следующее дерево:

<img src="../../part-11/11_4_3.png">

Мы могли бы достичь этого следующим кодом:

```python
if __name__ == "__main__":
    tree = Node(2)

    tree.left_child = Node(3)
    tree.left_child.left_child = Node(5)
    tree.left_child.right_child = Node(8)

    tree.right_child = Node(4)
    tree.right_child.right_child = Node(11)
```

## Рекурсивные алгоритмы бинарного дерева

Сначала давайте рассмотрим алгоритм, который печатает все узлы в бинарном дереве один за другим. В этих следующих примерах мы будем работать с бинарным деревом, определённым выше.

Аргументом функции печати является корневой узел бинарного дерева. Это узел в самом верху в нашей иллюстрации выше. Все остальные узлы являются _детьми_ этого узла:

```python

def print_nodes(root: Node):
    print(root.value)

    if root.left_child is not None:
        print_nodes(root.left_child)

    if root.right_child is not None:
        print_nodes(root.right_child)

```

Функция печатает значение узла, переданного в качестве аргумента, а затем вызывает себя на левом и правом дочерних узлах, предполагая, что узлы определены. Это очень простой алгоритм, но он эффективно и надёжно обходит все узлы дерева, независимо от размера дерева. Критически важно, что ни один узел не посещается дважды. Каждое значение печатается только один раз.

Если мы передадим корневой узел `tree` бинарного дерева, иллюстрированного выше, в качестве аргумента функции, она выведет

<sample-output>

2
3
5
8
4
11

</sample-output>

Как вы можете видеть из порядка узлов в выводе, алгоритм сначала движется вниз по "левой ноге" дерева до самого низа, а оттуда обходит другие узлы по порядку.

Аналогично мы можем написать алгоритм для вычисления суммы всех значений, хранящихся в узлах дерева:

```python
def sum_of_nodes(root: Node):
    node_sum = root.value

    if root.left_child is not None:
        node_sum += sum_of_nodes(root.left_child)

    if root.right_child is not None:
        node_sum += sum_of_nodes(root.right_child)

    return node_sum
```

Переменная `node_sum` инициализируется равной значению текущего узла. Значение в переменной затем увеличивается рекурсивными вызовами к суммам узлов левого и правого дочерних деревьев (сначала убедившись, что они существуют, конечно). Этот результат затем возвращается

<programming-exercise name='Greatest node' tmcname='part11-16_greatest_node'>

Напишите функцию `greatest_node(root: Node)`, которая принимает корневой узел бинарного дерева в качестве аргумента.

Функция должна вернуть значение узла с наибольшим значением в дереве. Дерево должно обходиться рекурсивно.

Подсказка: функция `sum_of_nodes` в примере выше может пригодиться.

Пример работы функции:

```python
if __name__ == "__main__":
    tree = Node(2)

    tree.left_child = Node(3)
    tree.left_child.left_child = Node(5)
    tree.left_child.right_child = Node(8)

    tree.right_child = Node(4)
    tree.right_child.right_child = Node(11)

    print(greatest_node(tree))
```

<sample-output>

11

</sample-output>

</programming-exercise>

## Отсортированное бинарное дерево

Бинарное дерево особенно полезно, когда узлы отсортированы определённым образом. Это делает поиск узлов в дереве быстрым и эффективным.

Давайте посмотрим на дерево, которое отсортировано следующим образом: левый дочерний узел каждого узла меньше самого узла, а правый дочерний узел соответственно больше.

<img src="../../part-11/11_4_1_2.png">

Теперь мы можем написать рекурсивный алгоритм для поиска узлов. Идея очень похожа на бинарный поиск из предыдущего раздела: если текущий узел - узел, который мы ищем, вернуть `True`. Иначе продолжить рекурсивно с левым или правым дочерним деревом. Если узел не определён, вернуть `False`.

```python
def find_node(root: Node, value):
    if root is None:
        return False

    if value == root.value:
        return True

    if value > root.value:
        return find_node(root.right_child, value)

    return find_node(root.left_child, value)
```

<programming-exercise name='Bosses and subordinates' tmcname='part11-17_bosses_and_subordinates'>

Класс `Employee` моделирует сотрудника компании:

```python
class Employee:
    def __init__(self, name: str):
        self.name = name
        self.subordinates = []

    def add_subordinate(self, employee: 'Employee'):
        self.subordinates.append(employee)
```

Напишите функцию `count_subordinates(employee: Employee)`, которая рекурсивно считает количество подчинённых каждого сотрудника.

Пример работы функции:

```python
if __name__ == "__main__":
    t1 = Employee("Sally")
    t2 = Employee("Eric")
    t3 = Employee("Matthew")
    t4 = Employee("Emily")
    t5 = Employee("Adele")
    t6 = Employee("Claire")
    t1.add_subordinate(t4)
    t1.add_subordinate(t6)
    t4.add_subordinate(t2)
    t4.add_subordinate(t3)
    t4.add_subordinate(t5)
    print(count_subordinates(t1))
    print(count_subordinates(t4))
    print(count_subordinates(t5))
```

<sample-output>

5
3
0

</sample-output>

</programming-exercise>

## Возвращение ко временам до рекурсии

Давайте завершим эту часть материала немного большим упражнением, сосредоточенным на принципах объектно-ориентированного программирования. Мы не рекомендуем использовать рекурсию в этой серии задач, но техники генераторов списков будут полезны.

<programming-exercise name='OrderBook' tmcname='part11-18_order_book'>

В этом упражнении вы напишете два разных класса, которые в свою очередь сформируют основу программного упражнения, которое следует за этим, где вы напишете интерактивное приложение.

## Task

Напишите класс `Task`, который моделирует одиночную задачу в списке задач программной компании. Задачи имеют
- описание
- оценку часов, необходимых для завершения задачи
- имя программиста, назначенного на задачу
- поле для отслеживания того, завершена ли задача
- уникальный идентификатор

Класс используется следующим образом:

```python
t1 = Task("program hello world", "Eric", 3)
print(t1.id, t1.description, t1.programmer, t1.workload)
print(t1)
print(t1.is_finished())
t1.mark_finished()
print(t1)
print(t1.is_finished())
t2 = Task("program webstore", "Adele", 10)
t3 = Task("program mobile app for workload accounting", "Eric", 25)
print(t2)
print(t3)
```

<sample-output>

1 program hello world Eric 3
1: program hello world (3 hours), programmer Eric NOT FINISHED
False
1: program hello world (3 hours), programmer Eric FINISHED
True
2: program webstore (10 hours), programmer Adele NOT FINISHED
3: program mobile app for workload accounting (25 hours), programmer Eric NOT FINISHED

</sample-output>

Некоторые пояснения:
- состояние задачи (завершена или ещё не завершена) можно проверить функцией `is_finished(self)`, которая возвращает булево значение
- задача не завершена при создании
- задача помечается как завершённая вызовом метода `mark_finished(self)`
- id задачи - это последовательный номер, который начинается с 1. Id первой задачи - 1, id второй - 2, и так далее.

**Подсказка**: `id` можно реализовать как [переменную класса](/ru/part-9/5-class-attributes#class-variables).

## OrderBook

Напишите класс `OrderBook`, который собирает все задачи, заказанные в программной компании. Задачи должны моделироваться классом `Task`, который вы только что написали.

Базовая версия OrderBook используется следующим образом:

```python
orders = OrderBook()
orders.add_order("program webstore", "Adele", 10)
orders.add_order("program mobile app for workload accounting", "Eric", 25)
orders.add_order("program app for practising mathematics", "Adele", 100)

for order in orders.all_orders():
    print(order)

print()

for programmer in orders.programmers():
    print(programmer)
```

<sample-output>

1: program webstore (10 hours), programmer Adele NOT FINISHED
2: program mobile app for workload accounting (25 hours), programmer Eric NOT FINISHED
3: program app for practising mathematics (100 hours), programmer Adele NOT FINISHED

Adele
Eric

</sample-output>

На этом этапе ваш `OrderBook` должен предоставлять три метода:
- `add_order(self, description, programmer, workload)`, который добавляет новый заказ в OrderBook. OrderBook хранит заказы внутренне как объекты `Task`. Примечание: метод должен принимать именно упомянутые аргументы, иначе автоматические тесты не будут работать корректно.
- `all_orders(self)` возвращает список всех задач, хранящихся в OrderBook
- `programmers(self)` возвращает список имён всех программистов с задачами, хранящимися в OrderBook. Список должен содержать каждого программиста только один раз

**Подсказка:** простой метод удаления дубликатов - обработка списка изначально как [set](https://docs.python.org/3.8/library/stdtypes.html#set). Set - это коллекция элементов, где каждый уникальный элемент появляется только один раз. `set` можно затем конвертировать обратно в список, и мы можем быть уверены, что каждый элемент теперь уникален:

```python
my_list = [1,1,3,6,4,1,3]
my_list2 = list(set(my_list))
print(my_list)
print(my_list2)
```

<sample-output>

[1, 1, 3, 6, 4, 1, 3]
[1, 3, 4, 6]

</sample-output>

## Ещё несколько функций для OrderBook

Напишите ещё три метода в вашем классе `OrderBook`.

Метод `mark_finished(self, id: int)` принимает id задачи в качестве аргумента и помечает соответствующую задачу как завершённую:

```python
orders = OrderBook()
orders.add_order("program webstore", "Adele", 10)
orders.add_order("program mobile app for workload accounting", "Eric", 25)
orders.add_order("program app for practising mathematics", "Adele", 100)

orders.mark_finished(1)
orders.mark_finished(2)

for order in orders.all_orders():
    print(order)
```

<sample-output>

1: program webstore (10 hours), programmer Adele FINISHED
2: program mobile app for workload accounting (25 hours), programmer Eric FINISHED
3: program app for practising mathematics (100 hours), programmer Adele NOT FINISHED

</sample-output>

Если нет задачи с данным id, метод должен вызвать исключение `ValueError`. Если вам нужно освежить знания о вызове исключений, посмотрите [часть 6](/ru/part-6/3-errors#raising-exceptions).

Методы `finished_orders(self)` и `unfinished_orders(self)` работают как ожидается: оба возвращают список, содержащий соответствующие задачи из OrderBook.

## Завершающие штрихи к OrderBook

Напишите один последний метод в вашем классе `OrderBook`: `status_of_programmer(self, programmer: str)`, который возвращает _кортеж_. Кортеж должен содержать количество завершённых и незавершённых задач программиста, вместе с оценочными часами в обеих категориях.

```python
orders = OrderBook()
orders.add_order("program webstore", "Adele", 10)
orders.add_order("program mobile app for workload accounting", "Adele", 25)
orders.add_order("program app for practising mathematics", "Adele", 100)
orders.add_order("program the next facebook", "Eric", 1000)

orders.mark_finished(1)
orders.mark_finished(2)

status = orders.status_of_programmer("Adele")
print(status)
```

<sample-output>

(2, 1, 35, 100)

</sample-output>

Первый элемент в кортеже - количество _завершённых_ задач, а второй элемент - количество _незавершённых_ задач. Третий и четвёртый элементы - суммы оценок рабочей нагрузки для завершённых и незавершённых задач соответственно.

Если нет программиста с данным именем, метод должен вызвать исключение `ValueError`.

</programming-exercise>

<programming-exercise name='Order book application' tmcname='part11-19_order_book_application'>

В этом упражнении вы создадите интерактивное приложение для администрирования задач, заказанных в программной компании. Реализация полностью на ваше усмотрение, но вы можете использовать строительные блоки из предыдущего упражнения в вашем приложении. Примеры в [последнем разделе части 10](/ru/part-10/4-application-development) также могут оказаться полезными.

## Без обработки ошибок

Приложение должно работать _точно_ следующим образом:

<sample-output>

команды:
0 выход
1 добавить заказ
2 список завершённых задач
3 список незавершённых задач
4 пометить задачу как завершённую
5 программисты
6 статус программиста

команда: **1**
описание: **program the next facebook**
программист и оценка рабочей нагрузки: **jonah 1000**
добавлено!

команда: **1**
описание: **program mobile app for workload accounting**
программист и оценка рабочей нагрузки: **eric 25**
добавлено!

команда: **1**
описание: **program an app for music theory revision**
программист и оценка рабочей нагрузки: **nina 12**
добавлено!

команда: **1**
описание: **program the next twitter**
программист и оценка рабочей нагрузки: **jonah 55**
добавлено!

команда: **2**
нет завершённых задач

команда: **3**
1: program the next facebook (1000 hours), programmer jonah NOT FINISHED
2: program mobile app for workload accounting (25 hours), programmer eric NOT FINISHED
3: program an app for music theory revision (12 hours), programmer nina NOT FINISHED
4: program the next twitter (55 hours), programmer jonah NOT FINISHED

команда: **4**
id: **2**
помечено как завершённое

команда: **4**
id: **4**
помечено как завершённое

команда: **2**
2: program mobile app for workload accounting (25 hours), programmer eric FINISHED
4: program the next twitter (55 hours), programmer jonah FINISHED

команда: **3**
1: program the next facebook (1000 hours), programmer jonah NOT FINISHED
3: program an app for music theory revision (12 hours), programmer nina NOT FINISHED

команда: **5**
jonah
eric
nina

команда: **6**
программист: **jonah**
задач: завершено 1 не завершено 1, часов: выполнено 55 запланировано 1000

</sample-output>

Первый балл упражнения предоставляется за работающее приложение, когда весь пользовательский ввод безошибочен.

## Обработка ошибок в пользовательском вводе

Чтобы получить второй балл упражнения за это упражнение, ваше приложение должно восстанавливаться от ошибочного пользовательского ввода. Любой ввод, который не следует указанному формату, должен производить сообщение об ошибке _ошибочный ввод_, и приводить к очередному повтору цикла, запрашивающего новую команду:

<sample-output>

команда: **1**
описание: **program mobile app for workload accounting**
программист и оценка рабочей нагрузки: **eric xxx**
ошибочный ввод

команда: **1**
описание: **program mobile app for workload accounting**
программист и оценка рабочей нагрузки: **eric**
ошибочный ввод

команда: **4**
id: **1000000**
ошибочный ввод

команда: **4**
id: **XXXX**
ошибочный ввод

команда: **6**
программист: **unknownprogrammer**
ошибочный ввод

</sample-output>

</programming-exercise>

Пожалуйста, ответьте на краткую анкету по этой части курса.

<quiz id="ce7a3228-ba6b-599b-8134-cd64fe015a96"></quiz>