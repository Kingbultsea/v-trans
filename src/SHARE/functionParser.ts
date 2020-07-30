import { types } from 'recast' // print as PRINT
import { COMPONENT_NAME, METHODSKEY } from '../util'
import { setMethodsName } from '../OPTIONS/methodsParser'

const B = types.builders

export function functionParser(dataAST: any) {
    for (const i in dataAST) {
        if (dataAST[i] && typeof dataAST[i] === 'object' && dataAST[i].type === 'ThisExpression') {
            if (dataAST.property && typeof dataAST.property === 'object' && setMethodsName.has(dataAST.property.name)) {
                dataAST[i] = B.identifier(`${COMPONENT_NAME}.${METHODSKEY}`)
            } else {
                dataAST[i] = B.identifier(COMPONENT_NAME)
            }
        }
        else if (typeof dataAST[i] === 'object' && dataAST[i] && dataAST[i].type !== 'FunctionDeclaration') {
            functionParser(dataAST[i])
        }
    }
}

// function replaceThisExpression(dataAST: any) {
//
// }

// 需要把this.a => wjh_a
// 需要把this.$parent.b => wjh_parent_b import 进来的组件 这个由于无法感知，遇到$parent和$root的一律不做处理
// 如果做处理 可以使用privide / inject 这个后期做吧 感觉还是可以的

// 目前解决 可以把methods里面的function 提取出来，提取到外部吧 这个也需要一个收集器
