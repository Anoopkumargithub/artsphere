import type Experiments from '@wix/wix-experiments'

export const createFeatures = ({
  experiments,
  settings: { env },
}: {
  experiments: Experiments
  settings: { env: { live: boolean } }
}) => ({
  get fes() {
    return experiments.enabled('specs.wixDataViewer.EnableFES')
  },
  get warmupData() {
    return env.live
  },
  get newCurrentPageIndex() {
    return experiments.enabled('specs.wixDataViewer.NewCurrentPageIndex')
  },
  get automationsClientV2() {
    return experiments.enabled('specs.wixDataClient.AutomationsClientV2')
  },
})
