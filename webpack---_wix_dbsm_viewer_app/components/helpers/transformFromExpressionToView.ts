import type { Logger } from '../../logger'
import { transformFromRecordToView } from '../transformData'
import { evaluateExpression, getExpressionFunctions } from '@wix/expressions'

export const transformFromExpressionToView = ({
  expression,
  record,
  prop,
  role,
  componentIsInput,
  logger,
}: {
  expression: string
  record: Record<any, any>
  prop: string
  role: string
  componentIsInput?: boolean
  logger: Logger
}): { value: string; propPath: string } => {
  try {
    const expressionValue = evaluateExpression({
      expression,
      variables: record,
      functions: getExpressionFunctions()!,
    })
    if (
      typeof expressionValue === 'object' &&
      expressionValue !== null &&
      'html' in expressionValue &&
      'alignment' in expressionValue &&
      Object.keys(expressionValue).length === 2
    ) {
      const { html, alignment } = expressionValue
      const propPath = prop === '$text' ? 'html' : prop
      const value = transformFromRecordToView({
        value: html,
        role,
        componentIsInput,
        propPath,
      })
      return {
        value: `<p class="wixui-rich-text__text" style="text-align: ${alignment};">${value}</p>`,
        propPath,
      }
    } else {
      const propPath = prop === '$text' ? 'text' : prop
      return {
        value: transformFromRecordToView({
          value: expressionValue,
          role,
          componentIsInput,
          propPath,
        }),
        propPath,
      }
    }
  } catch (err) {
    logger.log(`Failed to evaluate expression: ${err}`)
    return {
      propPath: prop === '$text' ? 'text' : prop,
      value: '',
    }
  }
}
