import { mergeWithGetters } from '../../helpers/mergeWithGetters'

export const extendComponentAdapter = <ComponentApi, ExtendedApi>(
  component: ComponentApi,
  extendedApi: ExtendedApi,
): ComponentApi & ExtendedApi => {
  return mergeWithGetters(component, extendedApi)
}
