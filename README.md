# Tarifa-luz MagicMirror² module

Progress-bar show in this interval are at concrete moment and change between them.

## Screenshots

![tarifa-luz screenshot green](https://github.com/jirsis/JIR-tarifa-luz/raw/master/screenshot-green.png "Tarifa-luz module valle interval")

![tarifa-luz screenshot yellow](https://github.com/jirsis/JIR-tarifa-luz/raw/master/screenshot-yellow.png "Tarifa-luz module llano interval")

![tarifa-luz screenshot red](https://github.com/jirsis/JIR-tarifa-luz/raw/master/screenshot-red.png "Tarifa-luz module punta interval")

![tarifa-luz screenshot green with price](https://github.com/jirsis/JIR-tarifa-luz/raw/master/screenshot-price.png "Tarifa-luz module with price")

## Configuration

Just add to the config file:

```
    {
        module: "JIR-tarifa-luz",
        position: "top_left"
        config: {
            ...
        }
    },
```

The following properties can be configured:

| Option                       | Description
| ---------------------------- | -----------
| `showPrice`                  | Show the price in the current interval. <br><br> **Possible values:** `true\|false` <br> **Default value:** `false`
| `esiosToken`                 | Token to get all prices updated. You should get yours following the [e•sios instructions](https://www.esios.ree.es/es/pagina/api). <br><br> **Possible values:** `"6753856a894a0a3b27bb41cb7843db6f2d2eb88ab8cf3d49b7e39f7980cef700"` <br> **Default value:** `undefined`
| `esiosLocation`              | Location to filter e•sios data. <br><br> **Possible values:** `8741\|8742\|8743\|8744\|8745` <br>8741 - Península, 8742 - Canarias, 8743 - Baleares, 8744 - Ceuta, 8745 - Melilla <br><br>**Default value:** `8741`

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
- [x] 0.4.0 indicar el precio del tramo actual
- [ ] 0.5.0 indicar dos tramos de igual tipo como continuos
