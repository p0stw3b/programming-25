---
path: '/ru/part-7/4-data-processing'
title: 'Обработка данных'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела

- Вы узнаете, как использовать модуль для обработки CSV-файлов
- Вы узнаете, как использовать модуль для обработки JSON-файлов
- Вы сможете получать и читать файлы из интернета

</text-box>

## Чтение CSV-файлов

CSV - такой простой формат, что до сих пор мы обращались к нему с помощью написанного вручную кода. Однако в стандартной библиотеке Python есть готовый модуль для работы с CSV-файлами: [csv](https://docs.python.org/3/library/csv.html). Он работает следующим образом:

```python
import csv

with open("test.csv") as my_file:
    for line in csv.reader(my_file, delimiter=";"):
        print(line)
```

Приведенный выше код читает все строки в CSV-файле `test.csv`, разделяет содержимое каждой строки на список, используя разделитель `;`, и выводит каждый список. Таким образом, предполагая, что содержимое строки выглядит следующим образом:

```x
012121212;5
012345678;2
015151515;4
```

Код выведет следующее:

<sample-output>

['012121212', '5']
['012345678', '2']
['015151515', '4']

</sample-output>

Поскольку формат CSV такой простой, какой смысл иметь отдельный модуль, когда мы можем так же хорошо использовать функцию `split`? Ну, во-первых, способ построения модуля также будет работать правильно, если значения в файле являются строками, которые также могут содержать символ-разделитель. Если какая-то строка в файле выглядела бы так

```x
"aaa;bbb";"ccc;ddd"
```

приведенный выше код произвел бы это:

<sample-output>

['aaa;bbb', 'ccc;ddd']

</sample-output>

Использование функции `split` также разделило бы внутри строк, что, вероятно, нарушило бы данные и нашу программу в процессе.

## Чтение JSON-файлов

CSV - это лишь один из многих машиночитаемых форматов данных. [JSON](https://www.json.org/json-en.html) - это еще один, и он часто используется, когда данные должны передаваться между приложениями.

JSON-файлы - это текстовые файлы со строгим форматом, который, возможно, немного менее доступен для человеческого глаза, чем формат CSV. В следующем примере используется файл `courses.json`, который содержит информацию о некоторых курсах:

```x
[
    {
        "name": "Introduction to Programming",
        "abbreviation": "ItP",
        "periods": [1, 3]
    },
    {
        "name": "Advanced Course in Programming",
        "abbreviation": "ACiP",
        "periods": [2, 4]
    },
    {
        "name": "Database Application",
        "abbreviation": "DbApp",
        "periods": [1, 2, 3, 4]
    }
]
```

Структура JSON-файла может показаться вам довольно знакомой к настоящему времени. JSON-файл выше выглядит точно как список Python, который содержит три словаря Python.

Стандартная библиотека имеет модуль для работы с JSON-файлами: [json](https://docs.python.org/3/library/json.html). Функция `loads` принимает любой аргумент, переданный в формате JSON, и преобразует его в структуру данных Python. Таким образом, обработка файла `courses.json` с помощью кода ниже

```python
import json

with open("courses.json") as my_file:
    data = my_file.read()

courses = json.loads(data)
print(courses)
```

выведет следующее:

<sample-output>

[{'name': 'Introduction to Programming', 'abbreviation': 'ItP', 'periods': [1, 3]}, {'name': 'Advanced Course in Programming', 'abbreviation': 'ACiP', 'periods': [2, 4]}, {'name': 'Database Application', 'abbreviation': 'DbApp', 'periods': [1, 2, 3, 4]}]

</sample-output>

Если мы также хотели бы вывести название каждого курса, мы могли бы расширить нашу программу с помощью цикла `for`:

```python
for course in courses:
    print(course["name"])
```

<sample-output>

Introduction to Programming
Advanced Course in Programming
Database Application

</sample-output>


<programming-exercise name='Handling JSON files' tmcname='part07-12_json_files'>

Давайте посмотрим на JSON-файл, который содержит некоторую информацию о студентах в следующем формате:

```json
[
    {
        "name": "Peter Pythons",
        "age": 27,
        "hobbies": [
            "coding",
            "knitting"
        ]
    },
    {
        "name": "Jean Javanese",
        "age": 24,
        "hobbies": [
            "coding",
            "rock climbing",
            "reading"
        ]
    }
]
```

Пожалуйста, напишите функцию с именем `print_persons(filename: str)`, которая читает JSON-файл в указанном выше формате и выводит содержимое, как показано ниже. Файл может содержать любое количество записей.

<sample-output>

Peter Pythons 27 years (coding, knitting)
Jean Javanese 24 years (coding, rock climbing, reading)

</sample-output>

Хобби должны быть перечислены в том же порядке, в котором они появляются в JSON-файле.

</programming-exercise>

## Получение файла из интернета

Стандартная библиотека Python также содержит модули для работы с онлайн-контентом, и одна полезная функция - [urllib.request.urlopen](
https://docs.python.org/3/library/urllib.request.html#urllib.request.urlopen). Рекомендуется взглянуть на весь модуль, но следующий пример должен быть достаточен для того, чтобы вы освоили функцию. Ее можно использовать для получения контента из интернета, чтобы его можно было обрабатывать в ваших программах.

Следующий код выведет содержимое главной страницы Хельсинкского университета:

```python
import urllib.request

my_request = urllib.request.urlopen("https://helsinki.fi")
print(my_request.read())
```

Страницы, предназначенные для человеческих глаз, обычно не выглядят очень красиво, когда их код выводится. Однако в следующих примерах мы будем работать с машиночитаемыми _данными_ из онлайн-источника. Большая часть машиночитаемых данных, доступных онлайн, находится в формате JSON.

<programming-exercise name='Course statistics' tmcname='part07-13_course_statistics'>

#### Получение списка активных курсов

По адресу <https://studies.cs.helsinki.fi/stats-mock/api/courses> вы найдете базовую информацию о некоторых курсах, предлагаемых факультетом информатики Хельсинкского университета, в формате JSON.

Пожалуйста, напишите функцию с именем `retrieve_all()`, которая получает данные всех курсов, которые в настоящее время активны (поле `enabled` имеет значение `true`). Они должны быть возвращены как список кортежей в следующем формате:

<sample-output>

<pre>
[
    ('Full Stack Open 2020', 'ofs2019', 2020, 201),
    ('DevOps with Docker 2019', 'docker2019', 2019, 36),
    ('DevOps with Docker 2020', 'docker2020', 2020, 36),
    ('Beta DevOps with Kubernetes', 'beta-dwk-20', 2020, 28)
]
</pre>

</sample-output>

Каждый кортеж содержит следующие поля из исходных данных:

- название курса: `fullName`
- `name`
- `year`
- сумма значений, перечисленных в `exercises`


**Примечание**: Крайне важно, чтобы вы получали данные с помощью функции `urllib.request.urlopen`, иначе автоматические тесты могут не работать правильно.

**Примечание2**: Тесты устроены таким образом, что они слегка изменяют данные, полученные из интернета, чтобы убедиться, что вы не жестко кодируете возвращаемые значения.

**Примечание3**: Некоторые пользователи Mac столкнулись со следующей проблемой:

```sh
File "/Library/Frameworks/Python.framework/Versions/3.8/lib/python3.8/urllib/request.py", line 1353, in do_open
    raise URLError(err)
urllib.error.URLError: <urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1124)>
```

Решение зависит от того, как Python установлен на вашей машине. В некоторых случаях выполнение следующего в терминале помогает:

```sh
cd "/Applications/Python 3.8/"
sudo "./Install Certificates.command
```

Путь, используемый в команде `cd` выше, зависит от версии Python, которую вы установили. Путь может также быть, например, `"/Applications/Python 3.9/"`.

[Различные решения](https://stackoverflow.com/questions/27835619/urllib-and-ssl-certificate-verify-failed-error) проблемы были предложены.

Один трюк, который некоторые нашли полезным:

```python
import urllib.request
import json
import ssl # добавьте эту библиотеку в раздел импорта

def retrieve_all():
    # добавьте следующую строку в начало всех ваших функций
    context = ssl._create_unverified_context()
    # остальная часть вашей функции
```

Еще один потенциальный обходной путь:

 ```python
import urllib.request
import certifi # добавьте эту библиотеку в раздел импорта
import json

def retrieve_all():
    address = "https://studies.cs.helsinki.fi/stats-mock/api/courses"
    # добавьте второй аргумент к вызову функции
    request = urllib.request.urlopen(address, cafile=certifi.where())
    # остальная часть вашей функции
```

#### Получение данных для одного курса

Каждый курс также имеет свой собственный URL, где доступны более конкретные еженедельные данные о курсе. URL следуют формату <https://studies.cs.helsinki.fi/stats-mock/api/courses/****/stats>, где вы бы заменили звездочки содержимым поля `name` для курса, к которому вы хотите получить доступ.

Например, данные для курса `docker2019` находятся по адресу <https://studies.cs.helsinki.fi/stats-mock/api/courses/docker2019/stats>.

Пожалуйста, напишите функцию с именем `retrieve_course(course_name: str)`, которая возвращает статистику для указанного курса в формате словаря.

Например, вызов функции `retrieve_course("docker2019")` вернул бы словарь со следующим содержимым:

<sample-output>

<pre>
{
    'weeks': 4,
    'students': 220,
    'hours': 5966,
    'hours_average': 27,
    'exercises': 4988,
    'exercises_average': 22
}
</pre>

</sample-output>

Значения в словаре определяются следующим образом:

- `weeks`: количество полученных JSON-литералов объектов
- `students`: максимальное количество студентов во всех неделях
- `hours`: сумма всех значений `hour_total` в разных неделях
- `hours_average`: значение `hours`, разделенное на значение `students` (округленное вниз до ближайшего целого значения)
- `exercises`: сумма всех значений `exercise_total` в разных неделях
- `exercises_average`: значение `exercises`, разделенное на значение `students` (округленное вниз до ближайшего целого значения)

**Примечание**: Смотрите примечания в Части 1 упражнения, поскольку они применимы и здесь.

**Примечание2**: Модуль Python [math](https://docs.python.org/3/library/math.html) имеет полезную функцию для округления вниз целых чисел.

</programming-exercise>

<programming-exercise name='Who cheated' tmcname='part07-14_who_cheated'>

Файл `start_times.csv` содержит индивидуальное время начала для программистского экзамена в формате `name;hh:mm`. Пример:

```csv
jarmo;09:00
timo;18:42
kalle;13:23
```

Кроме того, файл `submissions.csv` содержит очки и время сдачи для отдельных упражнений. Формат здесь `name;task;points;hh:mm`. Пример:

```csv
jarmo;1;8;16:05
timo;2;10;21:22
jarmo;2;10;19:15
и т.д...
```

Ваша задача - найти студентов, которые потратили более 3 часов на экзаменационные задания. То есть любой студент, чье _любое_ задание было сдано более чем через 3 часа после времени начала экзамена, помечается как нарушитель. Может быть более одной сдачи для одного и того же задания для каждого студента. Вы можете предположить, что все времена находятся в пределах одного дня.

Пожалуйста, напишите функцию с именем `cheaters()`, которая возвращает список, содержащий имена студентов, которые нарушили правила

</programming-exercise>

<programming-exercise name='Who cheated, version 2' tmcname='part07-15_who_cheated_2'>

У вас снова есть в распоряжении CSV-файлы из предыдущего упражнения. Пожалуйста, напишите функцию с именем `final_points()`, которая возвращает итоговые экзаменационные баллы, полученные студентами, в формате словаря, следуя этим критериям:

* Если есть несколько сдач для одного и того же задания, учитывается сдача с наибольшим количеством баллов.
* Если сдача была сделана более чем через 3 часа после времени начала, сдача игнорируется.

Задания нумеруются от 1 до 8, и каждая сдача оценивается от 0 до 6 баллов.

В возвращаемом словаре ключом должно быть имя студента, а значением - общие баллы, полученные студентом.

Подсказка: вложенные словари могут быть хорошим подходом при обработке задач и времени сдачи каждого студента.

</programming-exercise>

## Поиск модулей

Официальная документация Python содержит информацию о всех модулях, доступных в стандартной библиотеке:

* https://docs.python.org/3/library/

В дополнение к стандартной библиотеке, интернет полон свободно доступных модулей Python для различных целей. Некоторые часто используемые модули перечислены здесь:

* https://wiki.python.org/moin/UsefulModules

<programming-exercise name='Spell checker, version 2' tmcname='part07-16_spellchecker_2'>

В этом упражнении вы напишете улучшенную версию программы проверки правописания из [предыдущей части](/ru/part-6/1-reading-files).

Как и в предыдущей версии, программа должна попросить пользователя ввести строку текста. Ваша программа должна затем выполнить проверку правописания и вывести отзыв пользователю, чтобы все неправильно написанные слова были окружены звездочками. Кроме того, _программа должна вывести список предложений для неправильно написанных слов_.

Пожалуйста, взгляните на следующие два примера.

<sample-output>

write text: **We use ptython to make a spell checker**
<pre>
We use *ptython* to make a spell checker
suggestions:
ptython: python, pythons, typhon
</pre>

</sample-output>

<sample-output>

write text: **this is acually a good and usefull program**
<pre>
this is *acually* a good and *usefull* program
suggestions:
acually: actually, tactually, factually
usefull: usefully, useful, museful
</pre>

</sample-output>

Предложения должны быть определены с помощью функции [get\_close\_matches](https://docs.python.org/3/library/difflib.html#difflib.get_close_matches) из модуля стандартной библиотеки Python [difflib](https://docs.python.org/3/library/difflib.html).

**Примечание**: Для корректной работы автоматических тестов пожалуйста, используйте функцию с "настройками по умолчанию". То есть пожалуйста, передавайте только два аргумента функции: неправильно написанное слово и список слов.

</programming-exercise>

<!---
<quiz id="311e3116-a763-50b5-b79e-056fdccb3394"></quiz>
-->