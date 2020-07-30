import { types, print as PRINT } from 'recast' // print as PRINT
// import { THISKEY } from './util'
import { ConstructorTree } from '../global'
import { METHODSKEY } from '../util'
import { functionParser } from '../SHARE/functionParser'

const B = types.builders
export const setMethodsName = new Set()

export function methodsParser(dataAST: any, constructorTree: ConstructorTree) {
    // 需要先收集，所以要遍历两次
    for (const i of dataAST.value.properties) {
        setMethodsName.add(i.key.name)
    }

    for (const i of dataAST.value.properties) {
        functionParser(i.value.body.body)
    }

    console.log(setMethodsName)

    // 如果遇到箭头函数的话，就要递归处理expression
    constructorTree.bodyString.push(PRINT(B.expressionStatement(
        B.assignmentExpression('=', B.identifier(`const ${METHODSKEY}`),
            dataAST.value
        )
    )).code)
}

// body -> array

