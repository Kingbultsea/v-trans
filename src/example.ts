export const source = `import Icon from '../icon';
import { oneOf } from '../../utils/assist';
import mixinsLink from '../../mixins/link';

const prefixCls = 'ivu-btn';

export default {
    props: {
        type: {
            validator (value) {
                return oneOf(value, ['default', 'primary', 'dashed', 'text', 'info', 'success', 'warning', 'error']);
            },
            default: 'default'
        },
        shape: {
            validator (value) {
                return oneOf(value, ['circle', 'circle-outline']);
            }
        },
        size: {
            validator (value) {
                return oneOf(value, ['small', 'large', 'default']);
            },
            default () {
                return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size;
            }
        },
        loading: Boolean,
        disabled: Boolean,
        htmlType: {
            default: 'button',
            validator (value) {
                return oneOf(value, ['button', 'submit', 'reset']);
            }
        },
        icon: {
            type: String,
            default: ''
        },
        customIcon: {
            type: String,
            default: ''
        },
        long: {
            type: Boolean,
            default: false
        },
        ghost: {
            type: Boolean,
            default: false
        }
    },
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
