// import { types, print as PRINT } from 'recast' // print as PRINT
// import { THISKEY } from './util'
import { ConstructorTree } from '../global'

// const B = types.builders

export function functionParser(dataAST: any, constructorTree: ConstructorTree) {
    console.log(dataAST.value)
}

// 需要把this.a => wjh_a
// 需要把this.$parent.b => wjh_parent_b import 进来的组件 这个由于无法感知，遇到$parent和$root的一律不做处理
// 如果做处理 可以使用privide / inject 这个后期做吧 感觉还是可以的

// 目前解决 可以把methods里面的function 提取出来，提取到外部吧 这个也需要一个收集器
