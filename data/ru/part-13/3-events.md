---
path: '/ru/part-13/3-events'
title: 'События'
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела

- Вы будете знакомы с событиями pygame
- Вы сможете написать программу, которая реагирует на нажатия клавиш
- Вы сможете написать программу, которая реагирует на события мыши

</text-box>

До сих пор наши главные циклы выполняли только предопределённые анимации и реагировали только на события типа `pygame.QUIT`, хотя цикл получает список всех событий от операционной системы. Давайте разберёмся с другими типами событий.

## Обработка событий

Эта программа выводит информацию обо всех событиях, переданных операционной системой pygame программе, пока она выполняется:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

while True:
    for event in pygame.event.get():
        print(event)
        if event.type == pygame.QUIT:
            exit()
```

Предположим, что программа была оставлена на некоторое время, а затем была нажата кнопка выхода. Программа выводит следующую информацию:

```x
<Event(4-MouseMotion {'pos': (495, 274), 'rel': (495, 274), 'buttons': (0, 0, 0), 'window': None})>
<Event(4-MouseMotion {'pos': (494, 274), 'rel': (-1, 0), 'buttons': (0, 0, 0), 'window': None})>
<Event(4-MouseMotion {'pos': (492, 274), 'rel': (-2, 0), 'buttons': (0, 0, 0), 'window': None})>
<Event(4-MouseMotion {'pos': (491, 274), 'rel': (-1, 0), 'buttons': (0, 0, 0), 'window': None})>
<Event(5-MouseButtonDown {'pos': (491, 274), 'button': 1, 'window': None})>
<Event(6-MouseButtonUp {'pos': (491, 274), 'button': 1, 'window': None})>
<Event(2-KeyDown {'unicode': 'a', 'key': 97, 'mod': 0, 'scancode': 38, 'window': None})>
<Event(3-KeyUp {'key': 97, 'mod': 0, 'scancode': 38, 'window': None})>
<Event(2-KeyDown {'unicode': 'b', 'key': 98, 'mod': 0, 'scancode': 56, 'window': None})>
<Event(3-KeyUp {'key': 98, 'mod': 0, 'scancode': 56, 'window': None})>
<Event(2-KeyDown {'unicode': 'c', 'key': 99, 'mod': 0, 'scancode': 54, 'window': None})>
<Event(3-KeyUp {'key': 99, 'mod': 0, 'scancode': 54, 'window': None})>
<Event(12-Quit {})>
```

Первые несколько событий касаются использования мыши, затем есть некоторые события от клавиатуры, и наконец последнее событие закрывает программу. Каждое событие имеет как минимум тип, но они также могут предлагать другую идентифицирующую информацию, такую как местоположение курсора мыши или нажатая клавиша.

Вы можете поискать описания событий в [документации pygame](https://www.pygame.org/docs/ref/event.html), но иногда может быть проще вывести события с помощью кода выше и найти событие, которое происходит, когда случается что-то, на что вы хотите реагировать.

## События клавиатуры

Эта программа может обрабатывать события, когда пользователь нажимает стрелку влево или вправо на клавиатуре. Программа выводит, какая клавиша была нажата.

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

while True:
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                print("left")
            if event.key == pygame.K_RIGHT:
                print("right")

        if event.type == pygame.QUIT:
            exit()
```

Константы `pygame.K_LEFT` и `pygame.K_RIGHT` относятся к стрелкам влево и вправо. Константы pygame для разных клавиш на клавиатуре перечислены в [документации pygame](https://www.pygame.org/docs/ref/key.html#key-constants-label).

Например, если пользователь дважды нажмёт стрелку вправо, затем один раз влево, а затем ещё раз вправо, программа выведет

```x
right
right
left
right
```

Теперь у нас есть все инструменты, необходимые для перемещения персонажа, или _спрайта_, на экране влево и вправо с помощью стрелок. Следующий код достигнет этого:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")
x = 0
y = 480-robot.get_height()

while True:
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                x -= 10
            if event.key == pygame.K_RIGHT:
                x += 10

        if event.type == pygame.QUIT:
            exit()

    window.fill((0, 0, 0))
    window.blit(robot, (x, y))
    pygame.display.flip()
```

В зависимости от того, как вы используете стрелки, выполнение программы может выглядеть так:

<img src="../../part-13/pygame_move_robot.gif">

В приведённом выше коде у нас есть переменные `x` и `y`, которые содержат координатное местоположение для спрайта. Переменная `y` установлена так, что спрайт появляется внизу окна. Значение `y` не изменяется на протяжении выполнения программы. Значение `x`, однако, увеличивается на 10 каждый раз, когда пользователь нажимает стрелку вправо, и уменьшается на 10 каждый раз, когда нажата стрелка влево.

Программа работает в целом довольно хорошо, но клавишу нужно нажимать снова каждый раз, когда мы хотим двигаться снова. Было бы лучше, если бы движение было непрерывным, пока клавиша удерживается. Следующая программа предлагает эту функциональность:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")
x = 0
y = 480-robot.get_height()

to_right = False
to_left = False

clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                to_left = True
            if event.key == pygame.K_RIGHT:
                to_right = True

        if event.type == pygame.KEYUP:
            if event.key == pygame.K_LEFT:
                to_left = False
            if event.key == pygame.K_RIGHT:
                to_right = False

        if event.type == pygame.QUIT:
            exit()

    if to_right:
        x += 2
    if to_left:
        x -= 2

    window.fill((0, 0, 0))
    window.blit(robot, (x, y))
    pygame.display.flip()

    clock.tick(60)
```

Код теперь содержит переменные `to_right` и `to_left`. Они содержат знание о том, должен ли спрайт двигаться вправо или влево в данный момент. Когда пользователь нажимает стрелку, значение, хранящееся в соответствующей переменной, становится `True`. Когда клавиша отпускается, значение изменяется на `False`.

Часы используются для синхронизации движений спрайта, так что они потенциально происходят 60 раз в секунду. Если стрелка нажата, спрайт движется на два пикселя вправо или влево. Это означает, что спрайт движется на 120 пикселей в секунду, если клавиша удерживается нажатой.

<programming-exercise name='Four directions' tmcname='part13-11_four_directions'>

Пожалуйста, напишите программу, где игрок может двигать робота в четырёх направлениях с помощью стрелок на клавиатуре. Конечный результат должен выглядеть так:

<img src="../../part-13/pygame_four_directions.gif">

</programming-exercise>

<programming-exercise name='Four walls' tmcname='part13-12_four_walls'>

Пожалуйста, улучшите программу из предыдущего упражнения, чтобы робот не мог пройти за пределы окна ни в одном из четырёх направлений. Конечный результат должен выглядеть так:

<img src="../../part-13/pygame_four_walls.gif">

</programming-exercise>

<programming-exercise name='Two players' tmcname='part13-13_two_players'>

Пожалуйста, напишите программу, где два игрока каждый управляют своим роботом. Один из игроков должен использовать стрелки, а другой может использовать, например, клавиши w-s-a-d. Конечный результат должен выглядеть так:

<img src="../../part-13/pygame_two_players.gif">

</programming-exercise>

## События мыши

Следующий код реагирует на события, когда кнопка мыши нажимается, пока курсор находится в области окна:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

while True:
    for event in pygame.event.get():
        if event.type == pygame.MOUSEBUTTONDOWN:
            print("you pressed the button number", event.button, "at location", event.pos)

        if event.type == pygame.QUIT:
            exit()
```

Выполнение этой программы должно выглядеть примерно так:

```x
you pressed the button number 1 at location (82, 135)
you pressed the button number 1 at location (369, 135)
you pressed the button number 1 at location (269, 297)
you pressed the button number 3 at location (515, 324)
```

Кнопка номер 1 относится к левой кнопке мыши, а кнопка номер 3 относится к правой кнопке мыши.

Следующая программа объединяет обработку событий мыши и рисование изображения на экране. Когда пользователь нажимает кнопку мыши, пока курсор мыши находится в границах окна, изображение робота рисуется в этом местоположении.

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")

while True:
    for event in pygame.event.get():
        if event.type == pygame.MOUSEBUTTONDOWN:
            x = event.pos[0]-robot.get_width()/2
            y = event.pos[1]-robot.get_height()/2

            window.fill((0, 0, 0))
            window.blit(robot, (x, y))
            pygame.display.flip()

        if event.type == pygame.QUIT:
            exit()
```

Выполнение программы могло бы выглядеть так:

<img src="../../part-13/pygame_cursor.gif">

Следующая программа содержит анимацию, где спрайт робота следует за курсором мыши. Местоположение спрайта хранится в переменных `robot_x` и `robot_y`. Когда мышь движется, её местоположение сохраняется в переменных `target_x` и `target_y`. Если робот не находится в этом местоположении, он движется в соответствующем направлении.

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")

robot_x = 0
robot_y = 0
target_x = 0
target_y = 0

clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        if event.type == pygame.MOUSEMOTION:
            target_x = event.pos[0]-robot.get_width()/2
            target_y = event.pos[1]-robot.get_height()/2

        if event.type == pygame.QUIT:
            exit(0)

    if robot_x > target_x:
        robot_x -= 1
    if robot_x < target_x:
        robot_x += 1
    if robot_y > target_y:
        robot_y -= 1
    if robot_y < target_y:
        robot_y += 1

    window.fill((0, 0, 0))
    window.blit(robot, (robot_x, robot_y))
    pygame.display.flip()

    clock.tick(60)
```

Выполнение программы должно выглядеть примерно так:

<img src="../../part-13/pygame_cursor2.gif">

<programming-exercise name='Robot and mouse' tmcname='part13-14_robot_and_mouse'>

Пожалуйста, напишите программу, где робот следует за курсором мыши так, что центр робота всегда находится точно на курсоре мыши. Конечный результат должен выглядеть так:

<img src="../../part-13/pygame_robot_cursor.gif">

</programming-exercise>

<programming-exercise name='The location of the robot' tmcname='part13-15_robot_location'>

Пожалуйста, напишите программу, где робот появляется в случайном местоположении внутри окна. Когда игрок нажимает на робота мышью, робот перемещается в новое местоположение. Конечный результат должен выглядеть так:

<img src="../../part-13/pygame_robot_location.gif">

</programming-exercise>