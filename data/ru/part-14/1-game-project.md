---
path: '/ru/part-14/1-game-project'
title: 'Игровой проект'
hidden: false
---

В этой части мы будем использовать pygame для создания довольно большой игры. Это вариация классической игры Sokoban, где игрок перемещает робота по сетке и толкает ящики в правильные места с как можно меньшим количеством ходов.

Конечный результат будет выглядеть так:

<img src="../../part-14/game.png">

## Карта игры

Начнём с рисования карты, используемой в игре. Игра реализована в классе `Sokoban`, который будет содержать всю функциональность, необходимую для игры. На этом первом этапе содержимое класса следующее:

```python
import pygame

class Sokoban:
    def __init__(self):
        pygame.init()
        
        self.load_images()
        self.new_game()
        
        self.height = len(self.map)
        self.width = len(self.map[0])
        self.scale = self.images[0].get_width()

        window_height = self.scale * self.height
        window_width = self.scale * self.width
        self.window = pygame.display.set_mode((window_width, window_height))

        pygame.display.set_caption("Sokoban")

        self.main_loop()

    def load_images(self):
        self.images = []
        for name in ["floor", "wall", "target", "box", "robot", "done", "target_robot"]:
            self.images.append(pygame.image.load(name + ".png"))

    def new_game(self):
        self.map = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                    [1, 2, 3, 0, 0, 0, 1, 0, 0, 1, 2, 3, 0, 0, 0, 0, 1],
                    [1, 0, 0, 1, 2, 3, 0, 2, 3, 0, 0, 0, 1, 0, 0, 0, 1],
                    [1, 0, 4, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]

    def main_loop(self):
        while True:
            self.check_events()
            self.draw_window()

    def check_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                exit()

    def draw_window(self):
        self.window.fill((0, 0, 0))

        for y in range(self.height):
            for x in range(self.width):
                square = self.map[y][x]
                self.window.blit(self.images[square], (x * self.scale, y * self.scale))

        pygame.display.flip()

if __name__ == "__main__":
    Sokoban()
```

Запуск программы должен отобразить окно с начальным состоянием игры. Давайте внимательнее рассмотрим код, который это достигает.

## Конструктор

Конструктор класса инициализирует модули pygame и основные переменные и структуры данных, участвующие в игре. Он также вызывает метод основного цикла игры.

```python
    def __init__(self):
        pygame.init()
        
        self.load_images()
        self.new_game()
        
        self.height = len(self.map)
        self.width = len(self.map[0])
        self.scale = self.images[0].get_width()

        window_height = self.scale * self.height
        window_width = self.scale * self.width
        self.window = pygame.display.set_mode((window_width, window_height))

        pygame.display.set_caption("Sokoban")

        self.main_loop()
```

Метод `load_images` загружает изображения, используемые в игре, в список с именем `images`. Метод `new_game` создаёт двумерный список с именем `map`, который содержит состояние игровой сетки в начале игры.

Переменные `height` и `width` инициализируются на основе размеров игровой сетки. Переменная `scale` содержит длину стороны одной клетки в сетке. Поскольку каждое изображение является квадратом точно одинакового размера, размер всех квадратов покрывается этой одной переменной, и ширина первого изображения прекрасно подойдёт для этого значения. Это же значение можно использовать для вычисления ширины и высоты всей сетки, что позволяет нам создать окно подходящего размера для отображения игровой сетки.

## Загрузка изображений

Метод `load_images` загружает все изображения, используемые в игре:

```python
    def load_images(self):
        self.images = []
        for name in ["floor", "wall", "target", "box", "robot", "done", "target_robot"]:
            self.images.append(pygame.image.load(name + ".png"))
```

Игра использует следующие изображения:

### Клетка пола

<img src="../../part-14/floor.png">

* Имя файла: `floor.png`
* Позиция в списке: 0

### Клетка стены

<img src="../../part-14/wall.png">

* Имя файла: `wall.png`
* Позиция в списке: 1

### Целевая клетка

<img src="../../part-14/target.png">

* Имя файла: `target.png`
* Позиция в списке: 2
* Робот должен переместить какой-то ящик на эту клетку

### Ящик

<img src="../../part-14/box.png">

* Имя файла: `box.png`
* Позиция в списке: 3

### Робот

<img src="../../part-14/robot.png">

* Имя файла: `robot.png`
* Позиция в списке: 4

### Ящик на целевой клетке

<img src="../../part-14/done.png">

* Имя файла: `done.png`
* Позиция в списке: 5
* Ящик был перемещён на целевую клетку

### Робот на целевой клетке

<img src="../../part-14/target_robot.png">

* Имя файла: `target_robot.png`
* Позиция в списке: 6
* Робот также может находиться на пустой целевой клетке

## Создание сетки

Метод `new_game` создаёт начальное состояние игровой сетки:

```python
    def new_game(self):
        self.map = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                    [1, 2, 3, 0, 0, 0, 1, 0, 0, 1, 2, 3, 0, 0, 0, 0, 1],
                    [1, 0, 0, 1, 2, 3, 0, 2, 3, 0, 0, 0, 1, 0, 0, 0, 1],
                    [1, 0, 4, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
```

Метод создаёт двумерный список с именем `map`, который использует пронумерованные позиции изображений в _их_ списке для разметки того, какое изображение куда идёт. Таким образом, игра содержит запись состояния игровой сетки во все времена.

НБ: в начале все пространства на сетке содержат число от 0 до 4. Числа 5 и 6 не включены, поскольку в начале ни один ящик или робот не находится на целевой клетке.

## Основной цикл

Метод `main_loop` довольно короткий. С каждой итерацией он вызывает два метода: `check_events` проходит через любые события, собранные с предыдущей итерации, а метод `draw_window` обновляет содержимое окна.

```python
    def main_loop(self):
        while True:
            self.check_events()
            self.draw_window()

    def check_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                exit()

    def draw_window(self):
        self.window.fill((0, 0, 0))

        for y in range(self.height):
            for x in range(self.width):
                square = self.map[y][x]
                self.window.blit(self.images[square], (x * self.scale, y * self.scale))

        pygame.display.flip()
```

На этом этапе единственное событие, фактически обрабатываемое игрой, — это закрытие игрового окна, например, из кнопки выхода. Затем игра выходит, вызывая функцию Python `exit`.

Каждый раз, когда вызывается метод `draw_window`, проходится вся матрица игровой сетки, и изображение, соответствующее каждой клетке в сетке, рисуется в правильном месте.

НБ: координаты x и y используются двумя разными способами в игре. При работе с индексами двумерного списка логично давать координату y первой, поскольку y ссылается на номер строки, в то время как x — это номер столбца. С другой стороны, при использовании методов pygame x обычно передаётся первым, поскольку это довольно часто встречается при работе с графикой, а также в математических контекстах.