import { types, print as PRINT } from 'recast' // print as PRINT
// import { THISKEY } from './util'
import { ConstructorTree } from '../global'
import { METHODSKEY } from '../util'

const B = types.builders

export function methodsParser(dataAST: any, constructorTree: ConstructorTree) {
    constructorTree.bodyString.push(PRINT(B.expressionStatement(
        B.assignmentExpression('=', B.identifier(`const ${METHODSKEY}`),
            dataAST.value
        )
    )).code)
}
