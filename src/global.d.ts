import { ASTNode } from 'ast-types'
export interface ConstructorTree {
    bodyString: string[],
    relativeStatement: Map<any, ASTNode>,
    setupBody: any[]
    importStringArray: Set<string>
}
