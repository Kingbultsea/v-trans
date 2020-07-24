import { print as PRINT } from 'recast'
import { ConstructorTree } from '../global'
import { THISKEY, expressionStatement } from '../util';

export function computeParser(dataAST: any, constructorTree: ConstructorTree) {
    let add: boolean = false

     for (const i of dataAST.value.properties) {
         add = true
         constructorTree.relativeStatement.set(
             i.key.name,
             expressionStatement(`const ${THISKEY}${i.key.name}`, `computed(${PRINT(i.value).code})`)
         )
     }

     add && constructorTree.importStringArray.add('computed')
}
