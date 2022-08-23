<template>
  <div class="table-box" :style="`height:${htmlSize(height)}px;`">
    <div class="table-head-wrap">
      <table>
        <colgroup>
          <col :key="th.prop" :style="`width:${htmlSize(th.width)}px;`" v-for="th in thead" />
        </colgroup>
        <thead>
          <tr>
            <th :key="th.prop" v-for="th in thead">
              <span v-html="th.label"></span>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="table-body-wrap" ref="body-wrap">
      <span class="no-data" v-if="tableData.length < 1">暂无数据</span>
      <div class="table-wrap" ref="tableWrap" @mouseenter="suspendScroll" @mouseleave="startScroll">
        <table ref="table" :style="tableStyle">
          <colgroup>
            <col :key="th.prop" :style="`width:${htmlSize(th.width)}px;`" v-for="th in thead" />
          </colgroup>
          <tbody>
            <template v-for="(tr, r) in tableData" :key="r">
              <tr :class="tr.rowClass" :style="`height: ${htmlSize(rowHeight)}px;`" v-show="!tr.child"
                @click="tr.child ? clickTableChildRow(tr, r) : clickTableRow(tr, r)">
                <td :key="d" v-for="(td, d) in thead" :title="(tr[td.prop] && tr[td.prop].label) || tr[td.prop]">
                  <slot :index="r" :name="td.prop" :row="tr">
                    <span v-if="
                        (!tr[td.prop] && tr[td.prop] !== 0) ||
                        (typeof tr[td.prop] == 'object' && Object.keys(tr[td.prop]).length === 0)
                      ">/</span>
                    <span v-else>{{ (tr[td.prop] && tr[td.prop].label) || tr[td.prop] }}</span>
                  </slot>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div v-if="loading" style="text-align: center; width: 100%; color: #999">
          <i class="el-icon-loading"></i>正在加载...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'table-box',
  props: {
    thead: {
      type: Array,
      default: () => []
    },
    tbody: {
      type: Array,
      default: () => []
    },
    autoScroll: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: false
    },
    rowSpace: {
      // 每行间隙
      type: Number,
      default: 5
    },
    rowHeight: {
      // 每行高度
      type: Number,
      default: 20
    },
    height: {
      // 表格高度
      type: Number,
      default: 200
    },
    isLazyload: {
      //数据懒加载
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timing: null,
      isScroll: false,
      topIndex: 0,
      rolling: false, // 正在滚动
      scrollSpeed: 3, // 滚动间隔 单位：秒
      tableData: [],
      isHover: false,
      oldTr: null,
      oldTrlist: [],
      tableScroll: 0,
      scrollTop: -1,
      scrollTimes: 0,
      loading: false,
      htmlSize
    }
  },
  mounted() {
    window.addEventListener('resize', this.setScrollHeight)
    this.$refs.tableWrap.addEventListener('scroll', this.setScrollTop)
    if (this.autoScroll) {
      this.$refs.tableWrap.removeEventListener('scroll', this.setScrollTop)
    }
  },
  beforeDestroy() {
    this.cleanTimeing()
    window.removeEventListener('resize', this.setScrollHeight)
    this.$refs.tableWrap.removeEventListener('scroll', this.setScrollTop)
  },
  methods: {
    setScrollHeight() {
      const wrap = this.$refs['body-wrap']
      const { table } = this.$refs
      this.isScroll = table.clientHeight > wrap.clientHeight
      this.startScroll()
    },
    // 设置滚动定时器
    setTiming() {
      this.cleanTimeing()
      if (!this.isScroll || !this.autoScroll || this.isHover) {
        return
      }

      const scroll = () => {
        this.rolling = true
        setTimeout(() => {
          this.rolling = false
          this.tableData.push(this.tableData[0])
          this.tableData.shift()
          this.topIndex < this.tableData.length ? this.topIndex++ : (this.topIndex = 0)
        }, (this.scrollSpeed * 1000) / 2)
      }
      this.timing = setInterval(scroll, this.scrollSpeed * 1000)
    },
    // 清除滚动定时器
    cleanTimeing() {
      clearInterval(this.timing)
    },
    // 开启滚动
    startScroll() {
      this.isHover = false
      this.setTiming()
    },
    // 暂停滚动
    suspendScroll() {
      this.isHover = true
      this.$nextTick(this.cleanTimeing)
    },
    setData(array) {
      // 表格数据更新时将数组和当前滚动下标同步
      for (let i = 0; i < this.topIndex; i++) {
        array.push(array[i])
        array.shift()
      }
      this.tableData = array
    },
    deepClone(source) {
      const sourceCopy = source instanceof Array ? [] : {}
      for (const item in source) {
        if (typeof source[item] === 'object') {
          sourceCopy[item] = this.deepClone(source[item])
        } else {
          sourceCopy[item] = source[item]
        }
      }
      return sourceCopy
    },
    clickTableRow(row, index) {
      const { table } = this.$refs
      if (!table) {
        return
      }
      const tr = table.rows[index]
      if (this.oldTr) {
        this.oldTr.className = ''
      }
      if (this.oldTrlist.length > 0) {
        this.oldTrlist.forEach(tr => {
          tr.className = ''
          tr.style.display = 'none'
        })
      }
      if (this.oldTr == tr) {
        this.$emit('clickTableRow', row, index, false, tr)
        this.oldTr = null
        return
      }

      this.$emit('clickTableRow', row, index, true, tr)
      // console.log(tr)
      tr.className = 'active'
      this.oldTr = tr

      if (row.childs) {
        const oldTrlist = []
        for (let i = 1; i <= row.childs; i++) {
          const next = index + i
          const tr = table.rows[next]
          tr.style.display = 'table-row'
          tr.className = 'trChild'
          oldTrlist.push(tr)
        }
        this.oldTrlist = oldTrlist
      }
    },
    clickTableChildRow(row, index) {
      this.$emit('clickTableChildRow', row, index, true)
    },
    //获取滚动事件
    setScrollTop() {
      if (!this.isLazyload || this.loading) {
        return
      }
      this.tableScroll =
        this.$refs.tableWrap.scrollHeight -
        this.$refs.tableWrap.clientHeight -
        parseInt(this.$refs.tableWrap.clientHeight * 0.1)
      this.scrollTop = this.$refs.tableWrap.scrollTop

      if (this.scrollTop >= this.tableScroll) {
        this.loading = true
      } else {
        this.loading = false
      }
    },
    //传递触底事件
    scrollToDown() {
      this.loading = true
      this.$emit('scrollToDown', this.scrollTimes)
    }
  },
  computed: {
    tableStyle() {
      const scrollToTop = htmlSize(this.rowHeight) + htmlSize(this.rowSpace)
      let style = `border-spacing: 0 ${htmlSize(this.rowSpace)}px;top:0;`
      if (this.rolling) {
        style += `top:-${scrollToTop}px;transition: top ${this.scrollSpeed / 2}s;`
      }
      return style
    }
  },
  watch: {
    tbody: {
      // 监听tbody重新计算表格高度
      handler(curVal, oldVal) {
        if (this.stripe) {
          curVal.forEach((item, i) => {
            if (i % 2 == 0) {
              item.rowClass = 'stripe'
            } else {
              item.rowClass = ''
            }
          })
        }
        this.setData(this.deepClone(curVal))
        this.$nextTick(this.setScrollHeight)
        this.loading = false
      },
      deep: true,
      immediate: true
    },
    loading: {
      handler(n, o) {
        if (n) {
          this.scrollTimes++
          this.scrollToDown()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  color: $whiteC;

  .table-body-wrap {
    flex: 1;
    height: 100%;
    overflow: hidden;
    position: relative;
    padding-right: 15px;

    .no-data {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      text-align: center;
      display: inline-block;
      vertical-align: middle;
      color: $mainC;
      z-index: 1;

      &::after {
        content: '';
        height: 100%;
        line-height: 100%;
        display: inline-block;
        vertical-align: middle;
      }
    }

    .table-wrap {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      overflow: auto;
    }

    .table-wrap::-webkit-scrollbar {
      display: none;
    }
  }

  table {
    border-collapse: separate;
    color: $tableColor;
    width: 100%;
    border: none;
    text-align: center;
    position: relative;
    table-layout: fixed;

    tr {
      th {
        height: px2rem(30);
        color: $tableColor;
        font-size: $fs18;
        line-height: px2rem(30);
        text-align: center;
      }

      td {
        color: $tableTd;
        font-size: $fs16;
        text-align: center;
      }
    }

    thead tr {
      border: px2rem(1) solid #63a2ff;
      background: $tableTrBg;
      background-size: 100% 100%;
    }

    tbody {
      td {
        border-bottom: $borderB;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: $tableTd;
      }

      tr:hover {
        // background-size: 101% 100%;
        // background-position-x: px2rem(-9);
      }

      .active {
        background: rgba(0, 255, 255, 0.1);
        border: 1px solid #00ffff;
        // opacity: 0.8;
        border-radius: 2px;
      }

      .trChild {
        td {
          font-size: $fs18;
        }
      }

      // .stripe {
      //   background: rgba($color: #ccc, $alpha: 0.2);
      // }
    }
  }
}
</style>
