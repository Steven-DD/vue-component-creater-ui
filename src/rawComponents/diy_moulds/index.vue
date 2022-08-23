  <template lc_id="1G40PecAKj">
      <div class="element-class" lc_id="BxAcFGKkSS">
          <la-card lc-mark title="自定义标题" lc_id="KQTv5vpbmy">
              <template #more lc_id="+TsChijyjd">
                  <span lc_id="US3qNX+T4q"></span>
              </template>
              <template #body lc_id="TQFFeCG3fl">
                  <div class="card_center" lc_id="0l3c7WZOwA"></div>
              </template>
          </la-card>
          <la-table lc-mark :thead="tbThead" :height="tbHeight" :autoscroll="tbAutoScroll" :tbody="tbTbody" :rowheight="tbRowHeight" lc_id="cJiFui1KZh"></la-table>
      </div>
  </template>
  <script>
import { deepLCEle } from '@/utils/initRawComponent'
export default {
  data() {
    return {
      tbThead: [
        { prop: 'name', label: '姓名', width: '80' },
        { prop: 'inflowTime', label: '流入时间', width: '120' },
        { prop: 'place', label: '地点', width: '120' },
        { prop: 'type', label: '类型', width: '80' }
      ],
      tbTbody: [
        {
          name: 'dddd',
          inflowTime: '11111',
          place: '111111',
          type: '111111'
        }
      ],
      tbHeight: 300,
      tbAutoScroll: false,
      tbRowHeight: 50
    }
  },
  mounted() {
    this.$emit('mounted')
    // 对所有拥有lc-mark的元素进行初始化
    deepLCEle(document.querySelector('.element-class'), () => { })
  },
  methods: {}
}  </script>
  <style scoped></style>
  <style>
.demonstration-element {
  font-size: 12px;
  color: #1f2f3d;
  padding: 10px 0 10px 0;
  vertical-align: middle;
}

.card_center {
  height: 300px;
}

.demonstration-element::before {
  content: '';
  background-color: #4dba87;
  display: inline-block;
  height: 1em;
  margin-right: 4px;
  width: 3px;
  border-radius: 2px;
  vertical-align: middle;
  position: relative;
  top: -1px;
}

.demonstration-element::after {
  content: ' :';
  font-weight: 600;
}

.element-class [lc-mark] {
  margin-bottom: 10px;
}  </style>
