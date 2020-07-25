import { ASTNode } from 'ast-types'
export interface ConstructorTree {
    propsStatment: any
    bodyString: string[]
    relativeStatement: Map<any, ASTNode>
    setupBody: any[]
    importStringArray: Set<string>
}
