input.onButtonPressed(Button.A, function () {
    serial.writeLine("Pressed")
})
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    let line = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    line = line.substr(0, line.length - 1)
    let items = line.split(":")
    let name = items[0]
    let code = parseInt(items[1])
    serial.writeLine(name)
    serial.writeNumber(code)
    radio.sendValue(name, code)
    basic.showIcon(IconNames.Happy)
    basic.pause(100)
})

let line = ""
serial.redirectToUSB()
serial.setWriteLinePadding(0)
radio.setGroup(147)
basic.showIcon(IconNames.Yes)
basic.clearScreen()
basic.forever(function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.pause(10)
    basic.showIcon(IconNames.SmallHeart)
    basic.pause(10)
    basic.showIcon(IconNames.Heart)
    basic.pause(10)
    basic.showLeds(`
. . . . .
. . . . .
. . . . .
. . . . .
. . . . .
`)
    basic.pause(2000)
})

