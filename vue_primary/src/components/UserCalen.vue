<template>
    <!--撑满父容器-->
    <div style="width: 100%;height: 100%;background-color: white;
    display: flex;flex-direction: column">
        <!--标题栏-->
        <div style="display: flex;flex-direction: column">
            <div style="display: flex;flex-direction: column;height: initial">
                <div style="display: flex;flex-direction: row;
            height: 74px;align-items: center;font-size: 18px;line-height: 28px;
            justify-content: space-between;padding: 0 30px">
                    <div>Admin的日历</div>
                    <button @click="selectedMonth -= 1">减少月份</button>
                    <button @click="selectedMonth += 1">增加月份</button>
                    <!--<btn style="justify-self: self-end"-->
                         <!--@click.native="selectedMonth -= 1">{{'/'}}-->
                    <!--</btn>-->
                    <!--<btn @click.native="selectedMonth += 1">{{'>'}}</btn>-->
                </div>
            </div>
            <div style="width: 100%;height: 1px;
            background-color: #EAEDF3"></div>
        </div>
        <!--星期栏-->
        <div style="display: flex;flex-direction: column;">
            <div style="display: flex;flex-direction: row;height: 44px;
                        align-items: center">
                <div v-for="day in weekDays" :key="day"
                     style="flex: 1;font-size: 12px;color: #9EA0A5;
                     display:flex;justify-content: center">
                    {{day}}
                </div>
            </div>
            <div style="width: 100%;height: 1px;
            background-color: #EAEDF3"></div>
        </div>
        <!--日历格-->
        <div :class="['wrapper',wrapperHandler]">
            <div v-for="(dateCell, index) in allDays" :key="index"
                 :class="['box',canSelect(dateCell)]">
                <!--第一格如果是上个月则加上上个月的月份文字-->
                <div style="padding: 0 20px;height: min-content">
                    {{index === 0&&dateCell.isPre?
                    months[dateCell.date.getMonth()]+' '+ dateCell.date
                    .getDate()
                    :dateCell.date.getDate()}}
                </div>
                <!--读取单元格中的事件数据，显示第一个事件-->
                <div style="flex:1;background-color: rgba(22,101,216,.1);
                            display: flex;flex-direction: column;
                            padding: 14px 20px 0 20px;"
                     v-if="dateCell.data">
                    <!--文本溢出处理-->
                    <div style="color: #1665D8;font-size: 12px;
                                height: min-content;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                word-break: break-all;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp:2;
                                overflow: hidden;">
                        {{'超长文本超长文本超长文本超长文本超长文本超长文本超长' +
                        '文本超长文本超长文本超长文本超长文本超长文本超长文本'}}
                    </div>
                </div>
                <div v-if="dateCell.data && dateCell.data.length > 1"
                     style="text-align: center;font-size: 12px;color: #6B6C6F;
                            margin-top: 10px">
                    {{dateCell.data.length - 1}}+ more...
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import calendarDays from '../utils/calendar';
    // import btn from '../../components/BtnCustom';

    export default {
        name: 'UserCalen',
        components: {
            // btn,
        },
        data () {
            return {
                // 日历中的事件
                events: [
                    {title: '体育比赛', time: new Date(2019, 0, 1)},
                    {title: '歌唱比赛', time: new Date(2019, 0, 1)},
                ],
                // 选择的年份
                selectedYear: null,
                // 选择的月份
                selectedMonth: null,
                // 星期数据(以周日开始)
                weekDays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                // 月份数据
                months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月',
                         '八月', '九月', '十月', '十一月', '十二月'],
            };
        },
        created () {
            // 初始化数据
            const today = new Date();
            this.selectedYear = today.getFullYear();
            this.selectedMonth = today.getMonth();
        },
        mounted () {
        },
        computed: {
            // 计算日期数组
            allDays () {
                const allDays = calendarDays(this.selectedYear,
                                             this.selectedMonth);
                // 遍历所有日期添加用户事件数据
                for (let i = 0; i < allDays.length; i++) {
                    for (let j = 0; j < this.events.length; j++) {
                        if (allDays[ i ].date.getFullYear() ===
                            this.events[ j ].time.getFullYear() &&
                            allDays[ i ].date.getMonth() ===
                            this.events[ j ].time.getMonth() &&
                            allDays[ i ].date.getDate() ===
                            this.events[ j ].time.getDate()) {
                            console.log(this.events[ j ].title);
                            if (! allDays[ i ].data) {
                                allDays[ i ].data = [];
                            }
                            allDays[ i ].data.push(this.events[ j ]);
                        }
                    }
                }
                return allDays;
            },
            // 如果allDays大于35个则增加一行
            wrapperHandler () {
                if (this.allDays.length > 35) {
                    return 'langWrapper';
                }
                return '';
            },
            // 如果单元格对象属于上个月或者下个月则不可选中(css)
            canSelect () {
                return function (calendarObj) {
                    return calendarObj.isPre || calendarObj.isNext ?
                        'notSelect' : '';
                };
            },
        },
        watch: {
            // 监听月份的改变，若超出12月则加一年，并改为1月
            selectedMonth () {
                if (this.selectedMonth > 11) {
                    this.selectedMonth = 0;
                    this.selectedYear += 1;
                }
                if (this.selectedMonth < 0) {
                    this.selectedMonth = 11;
                    this.selectedYear -= 1;
                }
            },
        },
        methods: {},
    };
</script>

<style scoped lang="scss">
    .wrapper {
        flex: 1;
        background: #EAEDF3;
        justify-self: stretch;
        display: grid;
        grid-gap: 1px;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(5, 1fr);
        grid-auto-flow: row;
        &.langWrapper {
            grid-template-rows: repeat(6, 1fr);
        }
    }
    .box {
        display: flex;
        min-height: 140px;
        padding-top: 14px;
        padding-bottom: 14px;
        flex-direction: column;
        background-color: #FFFFFF;
        align-content: stretch;
        color: #3E3F42;
        &.notSelect {
            color: #9EA0A5;
        }
    }

</style>
