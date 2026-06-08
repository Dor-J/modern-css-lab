import { useMemo, useRef, useState } from 'react'
import type { Feature } from '../../data/features'
import BrowserSupportBadge from '../ui/BrowserSupportBadge'
import DemoControlBar from './DemoControlBar'
import InspectorPanel from './InspectorPanel'
import LiveSnippet from './LiveSnippet'
import { getCssVarStyle } from './playgroundUtils'
import { usePlaygroundState } from './usePlaygroundState'

type FeaturePlaygroundProps = {
  feature: Feature
  compact?: boolean
}

function FeaturePlayground({ feature, compact = false }: FeaturePlaygroundProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [selectedTargetId, setSelectedTargetId] = useState(feature.interaction.targets[0]?.id ?? '')
  const [refreshKey, setRefreshKey] = useState(0)
  const { values, setValue, resetValues } = usePlaygroundState(feature.slug, feature.interaction.controls)
  const style = useMemo(
    () => getCssVarStyle(feature.interaction.controls, values),
    [feature.interaction.controls, values],
  )

  return (
    <article className={`feature-playground ${compact ? 'feature-playground--compact' : ''}`} id={`play-${feature.slug}`}>
      <header className="feature-playground__header">
        <div>
          <p className="eyebrow">Interactive inspector</p>
          <h3>{feature.title}</h3>
          <p>{feature.summary}</p>
        </div>
        <BrowserSupportBadge support={feature.support} year={feature.baselineYear} />
      </header>
      <DemoControlBar
        controls={feature.interaction.controls}
        values={values}
        onChange={(id, value) => {
          setValue(id, value)
          setRefreshKey((current) => current + 1)
        }}
        onReset={() => {
          resetValues()
          setRefreshKey((current) => current + 1)
        }}
      />
      <div className="feature-playground__workspace">
        <div
          className="feature-playground__preview"
          ref={rootRef}
          style={style}
          onInputCapture={() => setRefreshKey((current) => current + 1)}
          onChangeCapture={() => setRefreshKey((current) => current + 1)}
          onPointerUpCapture={() => setRefreshKey((current) => current + 1)}
        >
          <div className="feature-playground__subject">
            <p className="eyebrow">{feature.category}</p>
            <h4>{feature.cssFeatures[0] ?? feature.title}</h4>
            <p>{feature.whyItMatters}</p>
            <div className="feature-playground__chips">
              {feature.cssFeatures.slice(0, 4).map((cssFeature) => (
                <span className="feature-playground__chip" key={cssFeature}>
                  {cssFeature}
                </span>
              ))}
            </div>
          </div>
        </div>
        <InspectorPanel
          rootRef={rootRef}
          targets={feature.interaction.targets}
          selectedTargetId={selectedTargetId}
          onSelectTarget={setSelectedTargetId}
          controls={feature.interaction.controls}
          computedProperties={feature.interaction.computedProperties}
          supportQueries={feature.interaction.supportQueries}
          refreshKey={refreshKey}
        />
      </div>
      <LiveSnippet
        snippets={feature.interaction.snippetTemplates}
        controls={feature.interaction.controls}
        values={values}
      />
    </article>
  )
}

export default FeaturePlayground
