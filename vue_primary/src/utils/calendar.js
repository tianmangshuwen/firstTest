/**
 * @Description: 日历组件
 * @author mano233
 * @date 2019-01-29
 */

/**
 * 暴露的方法，返回日历对象
 * @param {Number} selectDateYear
 * @param {Number} selectDateMonth
 * @return {Array}
 */
function createCalendarObjArr (selectDateYear, selectDateMonth) {
    const allDays = [];
    if (!_check(selectDateYear, selectDateMonth)) {
        throw new Error( '时间参数异常' );
    }
    // 当前选择月份的第一天是星期几
    const firstDayOfWeek = _getFirstDayOfWeek(selectDateYear, selectDateMonth);
    // 当前选择月份的天数
    const monthDays = _getMonthDays(new Date(selectDateYear, selectDateMonth,
        1));
    // 上月的天数
    const preMonthDays = _getMonthDays(new Date(selectDateYear,
        selectDateMonth-1, 1));
    // 计算上个月的日期
    for (let i = 0; i < firstDayOfWeek; i++) {
        allDays.push({
            isPre: true,
            isNext: false,
            date: new Date(selectDateYear, selectDateMonth -1,
                preMonthDays - (firstDayOfWeek - i)
                + 1),
        });
    }
    // 计算当月日期
    for (let i = 0; i < monthDays; i++) {
        allDays.push({
            isPre: false,
            isNext: false,
            date: new Date(selectDateYear,
                selectDateMonth, i + 1),
        });
    }
    // 计算下个月的日期
    if (7-(7-firstDayOfWeek)+monthDays>35) {
        for (let i = 0; i < 42 - (firstDayOfWeek + monthDays); i++) {
            allDays.push({
                isPre: false,
                isNext: true,
                date: new Date(selectDateYear,
                    selectDateMonth + 1, i + 1),
            });
        }
    } else {
        for (let i = 0; i < 35 - (firstDayOfWeek + monthDays); i++) {
            allDays.push({
                isPre: false,
                isNext: true,
                date: new Date(selectDateYear,
                    selectDateMonth + 1, i + 1),
            });
        }
    }

    return allDays;
}

/**
 * 返回某年某月的一个月所有的天数
 * @param {Date} date
 * @return {number}
 */
function _getMonthDays (date) {
    const _year = date.getFullYear();
    const _month = date.getMonth();
    const monthDays = [31,
                       _isLeapYear(_year) ? 29 : 28,
                       31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return monthDays[ _month ];
}

/**
 * 检查参数
 * @param {Number} _year
 * @param {Number} _month
 * @return {boolean}
 */
function _check (_year, _month) {
    return _month <= 11 && _month >= 0;
}

/**
 * 判断某年某月的1号是星期几
 * @param {Number} _year 年
 * @param {Number} _month 月
 * @return {number}
 */
function _getFirstDayOfWeek (_year, _month) {
    const firstDayInMonth = new Date(_year, _month, 1);
    return firstDayInMonth.getDay();
}

/**
 * 判断是否是闰年
 * @param {Number} _year 年
 * @return {boolean}
 */
function _isLeapYear (_year) {
    return _year % 400 === 0 || (_year % 4 === 0 && _year % 100 !== 0);
}


export default createCalendarObjArr;
