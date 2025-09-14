---
path: '/ru/part-7/3-times-and-dates'
title: 'Время и даты'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела

- Вы узнаете, как обрабатывать даты и время в коде Python
- Вы сможете создавать и использовать объекты `datetime`
- Вы узнаете, как сравнивать и вычислять разности между двумя датами или временами

</text-box>

## Объект datetime

Модуль Python [datetime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime) включает функцию [now](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime.now), которая возвращает объект datetime, содержащий текущую дату и время. По умолчанию вывод объекта datetime выглядит так:

```python
from datetime import datetime

my_time = datetime.now()
print(my_time)
```

<sample-output>

2021-10-19 08:46:49.311393

</sample-output>

Вы также можете определить объект самостоятельно:

```python
from datetime import datetime

my_time = datetime(1952, 12, 24)
print(my_time)
```

<sample-output>

1952-12-24 00:00:00

</sample-output>

По умолчанию время устанавливается на полночь, поскольку мы не указали время дня в приведенном выше примере.

К различным элементам объекта datetime можно получить доступ следующим образом:

```python
from datetime import datetime

my_time = datetime(1952, 12, 24)
print("Day:", my_time.day)
print("Month:", my_time.month)
print("Year:", my_time.year)
```

<sample-output>

Day: 24
Month: 12
Year: 1952

</sample-output>

Также можно указать время дня. Точность может варьироваться, как видно ниже:

```python
from datetime import datetime

pv1 = datetime(2021, 6, 30, 13)     # 30.6.2021 at 1PM
pv2 = datetime(2021, 6, 30, 18, 45) # 30.6.2021 at 6.45PM
```

## Сравнение времени и вычисление разностей между ними

Знакомые операторы сравнения также работают с объектами datetime:

```python
from datetime import datetime

time_now = datetime.now()
midsummer = datetime(2021, 6, 26)

if time_now < midsummer:
    print("It is not yet Midsummer")
elif time_now == midsummer:
    print("Happy Midsummer!")
elif time_now > midsummer:
    print("It is past Midsummer")
```

<sample-output>

It is past Midsummer

</sample-output>

Разность между двумя объектами datetime можно вычислить просто с помощью оператора вычитания:

```python
from datetime import datetime

time_now = datetime.now()
midsummer = datetime(2021, 6, 26)

difference = midsummer - time_now
print("Midsummer is", difference.days, "days away")
```

<sample-output>

Midsummer is -116 days away

</sample-output>

Примечание: результат вычитания datetime является объектом [timedelta](https://docs.python.org/3/library/datetime.html?highlight=datetime#timedelta-objects). Он менее универсален, чем объект `datetime`. Например, вы можете получить доступ к количеству дней в объекте `timedelta`, но не к количеству лет, поскольку длина года варьируется. Объект `timedelta` содержит атрибуты `days`, `seconds` и `microseconds`. Другие меры могут быть переданы в качестве аргументов, но они будут преобразованы внутренне.

Аналогично, сложение доступно между объектами `datetime` и `timedelta`. Результатом будет `datetime`, полученный при добавлении указанного количества дней (или недель, секунд и т.д.) к объекту `datetime`:

```python
from datetime import datetime, timedelta
midsummer = datetime(2021, 6, 26)

one_week = timedelta(days=7)
week_from_date = midsummer + one_week

print("A week after Midsummer it will be", week_from_date)

long_time = timedelta(weeks=32, days=15)

print("32 weeks and 15 days after Midsummer it will be", midsummer + long_time)
```

<sample-output>

A week after Midsummer it will be 2021-07-03 00:00:00
32 weeks and 15 days after Midsummer it will be 2022-02-20 00:00:00

</sample-output>

Давайте посмотрим, как работает более высокая точность:

```python
time_now = datetime.now()
midnight = datetime(2021, 6, 30)
difference = midnight - time_now
print(f"Midnight is still {difference.seconds} seconds away")
```

<sample-output>

Midnight is still 8188 seconds away

</sample-output>

<programming-exercise name='How old' tmcname='part07-09_how_old'>

Пожалуйста, напишите программу, которая спрашивает у пользователя его дату рождения, а затем выводит, сколько лет пользователю было в канун нового тысячелетия. Программа должна запрашивать день, месяц и год отдельно и выводить возраст в днях. Пожалуйста, посмотрите на примеры ниже:

<sample-output>

Day: **10**
Month: **9**
Year: **1979**
You were 7417 days old on the eve of the new millennium.

</sample-output>

<sample-output>

Day: **28**
Month: **3**
Year: **2005**
You weren't born yet on the eve of the new millennium.

</sample-output>

Вы можете предположить, что все комбинации день-месяц-год, данные в качестве аргумента, будут действительными датами. То есть не будет даты типа 31 февраля.

</programming-exercise>

<programming-exercise name='Valid PIC?' tmcname='part07-10_valid_pic'>

В этом упражнении вы будете проверять финские персональные идентификационные коды (PIC).

Пожалуйста, напишите функцию с именем `is_it_valid(pic: str)`, которая возвращает `True` или `False` в зависимости от того, действителен ли PIC, данный в качестве аргумента, или нет. Финские PIC следуют формату `ddmmyyXyyyz`, где `ddmmyy` содержит дату рождения, `X` - маркер века, `yyy` - персональный идентификатор и `z` - контрольный символ.

Программа должна проверить действительность по этим трем критериям:

* Первая половина кода является действительной, существующей датой в формате `ddmmyy`.
* Маркер века - либо `+` (1800-е), `-` (1900-е) или `A` (2000-е).
* Контрольный символ действителен.

Контрольный символ вычисляется путем взятия девятизначного числа, созданного датой рождения и персональным идентификатором, деления его на 31 и выбора символа по индексу, указанному остатком, из строки `0123456789ABCDEFHJKLMNPRSTUVWXY`. Например, если остаток был 12, контрольным символом был бы `C`.

Больше примеров и объяснений использования PIC доступны в [Агентстве цифровых и демографических услуг](https://dvv.fi/en/personal-identity-code).

**Внимание!** Пожалуйста, убедитесь, что вы не делитесь своим собственным PIC, например в коде, который вы используете для тестирования, или через каналы поддержки курса.

Вот несколько действительных PIC, которые вы можете использовать для тестирования:

* 230827-906F
* 120488+246L
* 310823A9877

</programming-exercise>

## Форматирование времени и дат

Модуль `datetime` содержит удобный метод [strftime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.date.strftime) для форматирования строкового представления объекта datetime. Например, следующий код выведет текущую дату в формате `dd.mm.yyyy`, а затем дату и время в другом формате:

```python
from datetime import datetime

my_time = datetime.now()
print(my_time.strftime("%d.%m.%Y"))
print(my_time.strftime("%d/%m/%Y %H:%M"))
```

<sample-output>

19.10.2021
19/10/2021 09:31

</sample-output>

Форматирование времени использует специальные символы для обозначения конкретных форматов. Ниже приведен список некоторых из них (пожалуйста, смотрите [документацию](https://docs.python.org/3/library/time.html#time.strftime) Python для полного списка):

Обозначение | Значение
:--------|:--------
`%d` | день (01–31)
`%m` | месяц (01–12)
`%Y` | год в 4-значном формате
`%H` | часы в 24-часовом формате
`%M` | минуты (00–59)
`%S` | секунды (00–59)

Вы также можете указать разделитель между различными элементами, как показано в примерах выше.

Форматирование datetime также работает в обратном направлении, если вам нужно разобрать объект datetime из строки, данной пользователем. Метод [strptime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime.strptime) сделает именно это:

```python
from datetime import datetime

birthday = input("Please type in your birthday in the format dd.mm.yyyy: ")
my_time = datetime.strptime(birthday, "%d.%m.%Y")

if my_time < datetime(2000, 1, 1):
    print("You were born in the previous millennium")
else:
    print("You were born during this millennium")
```

<sample-output>

Please type in your birthday in the format dd.mm.yyyy: **5.11.1986**
You were born in the previous millennium

</sample-output>

<programming-exercise name='Screen time' tmcname='part07-11_screen_time'>

Пожалуйста, напишите программу для записи количества времени, которое пользователь провел перед экраном телевизора, компьютера или мобильного устройства за определенный период времени.

Программа должна работать следующим образом:

<sample-output>

Filename: **late_june.txt**
Starting date: **24.6.2020**
How many days: **5**
Please type in screen time in minutes on each day (TV computer mobile):
Screen time 24.06.2020: **60 120 0**
Screen time 25.06.2020: **0 0 0**
Screen time 26.06.2020: **180 0 0**
Screen time 27.06.2020: **25 240 15**
Screen time 28.06.2020: **45 90 5**
Data stored in file late_june.txt

</sample-output>

Пользователь будет вводить каждый день на отдельной строке, и записи будут содержать три числа, разделенных пробелами, представляющие минуты.

При указанном выше вводе программа должна сохранить данные в файле с именем `late_june.txt`. Содержимое должно выглядеть так:

<sample-data>

Период времени: 24.06.2020-28.06.2020
Всего минут: 780
Средние минуты: 156.0
24.06.2020: 60/120/0
25.06.2020: 0/0/0
26.06.2020: 180/0/0
27.06.2020: 25/240/15
28.06.2020: 45/90/5

</sample-data>

</programming-exercise>

<!---
<quiz id="6fff0633-2f18-5e2b-9eab-6c8950c8378b"></quiz>
-->