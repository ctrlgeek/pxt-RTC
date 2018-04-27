

//% weight=50 color=#8000f0 icon="\uf017" block="Clock"
namespace DS1307 {
    let DS1307_I2C_ADDR = 0x68;
    let DS1307_REG_SECOND = 0
    let DS1307_REG_MINUTE = 1
    let DS1307_REG_HOUR = 2
    let DS1307_REG_WEEKDAY = 3
    let DS1307_REG_DAY = 4
    let DS1307_REG_MONTH = 5
    let DS1307_REG_YEAR = 6
    let DS1307_REG_CTRL = 7
    let DS1307_REG_RAM = 8

    export enum DateTimeName {
        //% block="second"
        second,
        //% block="minute"
        minute,
        //% block="hour"
        hour,
        //% block="day"
        day, 
        //% block="month"
        month, 
        //% block="year"
        year
    }

    /**
     * set ds1307's reg
     */
    function setReg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(DS1307_I2C_ADDR, buf);
    }

    /**
     * get ds1307's reg
     */
    function getReg(reg: number): number {
        pins.i2cWriteNumber(DS1307_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(DS1307_I2C_ADDR, NumberFormat.UInt8BE);
    }

    /**
     * convert a Hex data to Dec
     */
    function HexToDec(dat: number): number {
        return (dat / 16) * 10 + (dat % 16);
    }

    /**
     * convert a Dec data to Hex
     */
    function DecToHex(dat: number): number {
        return (dat / 10) * 16 + (dat % 10)
    }





    /*
     *Read data from RTC
     * @param datetimename date time format
     */
    //% blockId="get_RTC_data" block="read RTC %datetimename"
    //% weight=100 blockGap=8 
    export function getRTC(datetimename: DateTimeName): number {

        return (2000)
    }








    /**
     * start ds1307 (go on)
     */
    //% blockId="DS1307_START" block="start"
    //% weight=52 blockGap=8 
    export function start() {
        let t = getSecond()
        setSecond(t & 0x7f)
    }

    /**
     * stop ds1307 (pause)
     */
    //% blockId="DS1307_STOP" block="pause"
    //% weight=51 blockGap=8 
    export function stop() {
        let t = getSecond()
        setSecond(t | 0x80)
    }

    /**
     * get Year
     */
    //% blockId="DS1307_GET_YEAR" block="year"
    //% weight=99 blockGap=8 
    export function getYear(): number {
        return (HexToDec(getReg(DS1307_REG_YEAR)) + 2000)
    }

    /**
     * set year
     * @param dat is the Year will be set, eg: 2018
     */
    //% blockId="DS1307_SET_YEAR" block="set year %dat"
    //% weight=69 blockGap=8 
    export function setYear(dat: number): void {
        setReg(DS1307_REG_YEAR, DecToHex(dat % 100))
    }

    /**
     * get Month
     */
    //% blockId="DS1307_GET_MONTH" block="month"
    //% weight=98 blockGap=8 
    export function getMonth(): number {
        return HexToDec(getReg(DS1307_REG_MONTH))
    }

    /**
     * set month
     * @param dat is Month will be set.  eg: 2
     */
    //% blockId="DS1307_SET_MONTH" block="set month %dat"
    //% weight=68 blockGap=8
    //% dat.min=1 dat.max=12
    export function setMonth(dat: number): void {
        setReg(DS1307_REG_MONTH, DecToHex(dat % 13))
    }

    /**
     * get Day
     */
    //% blockId="DS1307_GET_DAY" block="day"
    //% weight=97 blockGap=8 
    export function getDay(): number {
        return HexToDec(getReg(DS1307_REG_DAY))
    }

    /**
     * set day
     * @param dat is the Day will be set, eg: 15
     */
    //% blockId="DS1307_SET_DAY" block="set day %dat"
    //% weight=67 blockGap=8
    //% dat.min=1 dat.max=31
    export function setDay(dat: number): void {
        setReg(DS1307_REG_DAY, DecToHex(dat % 32))
    }

    /**
     * get Week Day
     */
    //% blockId="DS1307_GET_WEEKDAY" block="weekday"
    //% weight=96 blockGap=8 
    export function getWeekday(): number {
        return HexToDec(getReg(DS1307_REG_WEEKDAY))
    }

    /**
     * set weekday
     * @param dat is the Week Day will be set, eg: 4
     */
    //% blockId="DS1307_SET_WEEKDAY" block="set weekday %dat"
    //% weight=66 blockGap=8
    //% dat.min=1 dat.max=7
    export function setWeekday(dat: number): void {
        setReg(DS1307_REG_WEEKDAY, DecToHex(dat % 8))
    }

    /**
     * get Hour
     */
    //% blockId="DS1307_GET_HOUR" block="hour"
    //% weight=95 blockGap=8 
    export function getHour(): number {
        return HexToDec(getReg(DS1307_REG_HOUR))
    }

    /**
     * set hour
     * @param dat is the Hour will be set, eg: 0
     */
    //% blockId="DS1307_SET_HOUR" block="set hour %dat"
    //% weight=65 blockGap=8
    //% dat.min=0 dat.max=23
    export function setHour(dat: number): void {
        setReg(DS1307_REG_HOUR, DecToHex(dat % 24))
    }

    /**
     * get Minute
     */
    //% blockId="DS1307_GET_MINUTE" block="minute"
    //% weight=94 blockGap=8 
    export function getMinute(): number {
        return HexToDec(getReg(DS1307_REG_MINUTE))
    }

    /**
     * set minute
     * @param dat is the Minute will be set, eg: 0
     */
    //% blockId="DS1307_SET_MINUTE" block="set minute %dat"
    //% weight=64 blockGap=8
    //% dat.min=0 dat.max=59
    export function setMinute(dat: number): void {
        setReg(DS1307_REG_MINUTE, DecToHex(dat % 60))
    }

    /**
     * get Second
     */
    //% blockId="DS1307_GET_SECOND" block="second"
    //% weight=93 blockGap=8 
    export function getSecond(): number {
        return HexToDec(getReg(DS1307_REG_SECOND))
    }

    /**
     * set second
     * @param dat is the Second will be set, eg: 0
     */
    //% blockId="DS1307_SET_SECOND" block="set second %dat"
    //% weight=63 blockGap
    //% dat.min=0 dat.max=59
    export function setSecond(dat: number): void {
        setReg(DS1307_REG_SECOND, DecToHex(dat % 60))
    }

    /**
     * set Date and Time
     * @param year is the Year will be set, eg: 2018
     * @param month is the Month will be set, eg: 2
     * @param day is the Day will be set, eg: 15
     * @param weekday is the Weekday will be set, eg: 4
     * @param hour is the Hour will be set, eg: 0
     * @param minute is the Minute will be set, eg: 0
     * @param second is the Second will be set, eg: 0
     */
    //% blockId="DS1307_SET_DATETIME" block="set year %year|month %month|day %day|weekday %weekday|hour %hour|minute %minute|second %second"
    //% weight=60 blockGap
    export function DateTime(year: number, month: number, day: number, weekday: number, hour: number, minute: number, second: number): void {
        let buf = pins.createBuffer(8);
        buf[0] = DS1307_REG_SECOND;
        buf[1] = second % 60;
        buf[2] = minute % 60;
        buf[3] = hour % 24;
        buf[4] = weekday % 8;
        buf[5] = day % 32;
        buf[6] = month % 13;
        buf[7] = year % 100;
        pins.i2cWriteBuffer(DS1307_I2C_ADDR, buf)
    }

}
