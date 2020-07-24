export const source = `import Icon from '../icon';
import { oneOf } from '../../utils/assist';
import mixinsLink from '../../mixins/link';

const prefixCls = 'ivu-btn';

export default {
    data () {
      return {
        a: 1,
        b: { foo: 'test' },
        c: [1, 2, 3]
      }
    },
    methods: {
      a () {
      }
    },
    computed: {
      // 仅读取
      aDouble: function () {
        return this.a * 2
      },
      // 读取和设置
      aPlus: {
        get: function () {
          return this.a + 1
        },
        set: function (v) {
          this.a = v - 1
        }
      }
    },
    watch: {
      b: () => {
      },
      c: {
        handler: function (val, oldVal) { },
        deep: true
      },
      e: [
        'handle1',
        function handle2 (val, oldVal) { /* ... */ },
        {
          handler: function handle3 (val, oldVal) { /* ... */ },
          /* ... */
        }
      ]
    }
};`
