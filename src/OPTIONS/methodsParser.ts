import { types, print as PRINT } from 'recast' // print as PRINT
// import { THISKEY } from './util'
import { ConstructorTree } from '../global'
import { METHODSKEY } from '../util'

const B = types.builders

export function methodsParser(dataAST: any, constructorTree: ConstructorTree) {
    // 个人感觉可以一整个替换后 检查
    for (const i of dataAST.value.properties[0].value.body.body) {
        console.log(
            PRINT(i).code
        )
    }
    // 如果遇到箭头函数的话，就要递归处理expression
    constructorTree.bodyString.push(PRINT(B.expressionStatement(
        B.assignmentExpression('=', B.identifier(`const ${METHODSKEY}`),
            dataAST.value
        )
    )).code)
}

// body -> array

