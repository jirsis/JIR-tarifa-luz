# Tarifa-luz MagicMirror² module

Progress-bar show in this interval are at concrete moment and change between them.

## Screenshots

![tarifa-luz screenshot green](https://github.com/jirsis/JIR-tarifa-luz/raw/master/screenshot-green.png "Tarifa-luz module valle interval")

![tarifa-luz screenshot yellow](https://github.com/jirsis/JIR-tarifa-luz/raw/master/screenshot-yellow.png "Tarifa-luz module llano interval")

![tarifa-luz screenshot red](https://github.com/jirsis/JIR-tarifa-luz/raw/master/screenshot-red.png "Tarifa-luz module punta interval")


## Configuration

Just add to the config file:

```
    {
        module: "JIR-tarifa-luz",
        position: "top_left"
    },
```

## Tramos

* Punta: 10:00-14:00  18:00-22:00
* Llano: 08:00-10:00  14:00-18:00  22:00-00:00
* Valle: 00:00-08:00 + weekend + local bank holiday



## ToDo

- [x] 0.1.0 indicar la tarifa actual
- [x] 0.1.0 indicar cuanto queda para el siguiente tramo de tarifa
- [x] 0.2.0 barra ocupa lo mismo que el reloj
- [x] 0.2.0 indicar barra de progreso lo que falta para el siguiente tramo
- [x] 0.2.0 indicar los fines de semana como valle
- [x] 0.3.0 indicar los festivos nacionales como valle
- [ ] 0.4.0 indicar dos tramos de igual tipo como continuos
