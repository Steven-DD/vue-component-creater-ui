  <template lc_id="vSeYn6dQcE">
      <div lc_id="NahfEKxF68" class="demonstration-raw">
          <table border="0" lc_id="RDLbKPIVyp">
              <tr lc_id="riqra/6H1d">
                  <td lc_id="RhfgQCKISj">
                      <div class="title" lc_id="OnWMPOSYwo">div:</div>
                  </td>
                  <td lc_id="ZOFUAuegZ7">
                      <div lc_id="jayChQGWVD" div-lc-mark lc-mark></div>
                  </td>
              </tr>
              <tr lc_id="ZkGHGI7m4A">
                  <td lc_id="y39F0MMZXF">
                      <div class="title" lc_id="aTozeXy5X1">模块儿：</div>
                  </td>
                  <td lc_id="py61TxZ6JM">
                      <div class="la-card" lc-mark lc_id="CEQYvPg0Lq">
                          <div class="la-card__header" lc_id="n1tZOilCKM">
                              <div class="la-card__iconTitle" lc_id="yL8DJBlHHX">
                                  <span class="icon" lc_id="c/Gh20Ca09"></span>
                                  <div class="title" lc_id="gS9UirllZM">
                                      <span lc_id="h8Qa0nn9EA">这是一个文本</span>
                                  </div>
                              </div>
                              <div class="la-card__more" lc_id="xMokxqDV1u">
                                  <slot name="more" lc_id="UbbDrd/kty"></slot>
                              </div>
                          </div>
                          <div class="la-card__wrap" lc_id="y6gOFVHmkR">
                              <div class="la-card__body" lc_id="dTKAV5AXBl">
                                  <slot name="body" lc_id="ROR2fYFLZB"></slot>
                              </div>
                              <div class="la-card__border--bottom" lc_id="2TEzNt4Fjv"></div>
                          </div>
                      </div>
                  </td>
              </tr>
              <tr lc_id="i+v/R6TP05">
                  <td lc_id="wLL4oua+v6">
                      <div class="title" lc_id="ySJLvpCtUj">span:</div>
                  </td>
                  <td lc_id="Wg/gdfZ1hC">
                      <span lc_id="m+Oy7pHzNT" lc-mark>Span Element</span>
                  </td>
              </tr>
              <tr lc_id="Ejan36KyM/">
                  <td lc_id="ke9QDthYso">
                      <div class="title" lc_id="V2t1JzpJnA">a（超链接）:</div>
                  </td>
                  <td lc_id="SUPSw5gtWC">
                      <a lc-mark lc_id="MjGtLkly03">W3School</a>
                  </td>
              </tr>
              <tr lc_id="bgvuIIHVqY">
                  <td lc_id="h0nRibffcF">
                      <div class="title" lc_id="MxMSt/pxUC">abbr（标记缩写）:</div>
                  </td>
                  <td lc_id="lX0P4NPEIk">
                      <abbr lc-mark title="People's Republic of China" lc_id="oFoyJEu70y">PRC</abbr>
                  </td>
              </tr>
              <tr lc_id="inCzutb68I">
                  <td lc_id="mh8/q4jJAC">
                      <div class="title" lc_id="Kl4zl6s4bN">article:</div>
                  </td>
                  <td lc_id="ylNI9kdThf">
                      <article lc_id="p6pMF5D2hP">
                          <h1 lc-mark lc_id="GcMEfj/r8i">Internet Explorer 9</h1>
                          <p lc-mark lc_id="odzwtRzLYd">Windows Internet Explorer 9（简称 IE9）于 2011 年 3 月 14
                            日发布.....</p>
                      </article>
                  </td>
              </tr>
              <tr lc_id="sQR/stqYia">
                  <td lc_id="cw8+279Hwb">
                      <div class="title" lc_id="NpMarePQQF">aside:</div>
                  </td>
                  <td lc_id="/RsZDrC6KZ">
                      <aside lc-mark lc_id="65Oo0WGvvy">The Epcot Center is a theme park in Disney World, Florida.</aside>
                      <h4 lc_id="oSbd1PW0Nw" lc-mark>Epcot Center</h4>
                  </td>
              </tr>
              <tr lc_id="YpolLNtaim">
                  <td lc_id="0L0kRmNEHS">
                      <div class="title" lc_id="lLb2wnV7cj">p:</div>
                  </td>
                  <td lc_id="E3Kwwe8iVC">
                      <p lc-mark lc_id="t5axePjnHi">这是普通文本</p>
                      <b lc-mark lc_id="MKNiVzEnZC">这是粗体文本</b>
                  </td>
              </tr>
          </table>
      </div>
  </template>
  <script>
import { deepLCEle } from "@/utils/initRawComponent";
export default {
    data() {
        return {};
    },

    mounted() {
        this.$emit("mounted");
        // 对所有拥有lc-mark的元素进行初始化
        let countComponentCount = 0;
        deepLCEle(document.querySelector(".demonstration-raw"), () => {
            countComponentCount++;
        });
    },
    methods: {},
};  </script>
  <style scoped>.title {
      width: 120px;
  }
  
  .demonstration-raw {
      padding: 10px 0;
  }
  
  [div-lc-mark] {
      border: 1px grey dashed;
      min-height: 1rem;
      border-radius: 0px;
  }
  
  .la-card {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 15px;
      position: relative;
      background: rgba(11, 22, 38, 0.7);
      border: 1px solid #000;
      border-radius: 13px;
  }
  
  .la-card .title {
  
      height: 34px;
      font-size: 18px;
      color: #fff;
      font-style: italic;
      line-height: 34px;
      flex-shrink: 0;
      padding-left: 2px;
  
  }</style>
