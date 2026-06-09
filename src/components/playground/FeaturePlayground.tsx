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
          {renderCategoryPreview(feature)}
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

function FeatureChips({ feature }: { feature: Feature }) {
  return (
    <div className="feature-playground__chips">
      {feature.cssFeatures.slice(0, 4).map((cssFeature) => (
        <span className="feature-playground__chip" key={cssFeature}>
          {cssFeature}
        </span>
      ))}
    </div>
  )
}

function renderCategoryPreview(feature: Feature) {
  const title = feature.cssFeatures[0] ?? feature.title

  switch (feature.category) {
    case 'layout':
      return (
        <div className="feature-playground__subject feature-playground__subject--layout">
          <p className="eyebrow">layout lab</p>
          <h4>{title}</h4>
          <div className="feature-playground__layout-grid">
            <article className="feature-playground__layout-item">
              <strong>Primary track</strong>
              <span>Resize the container control.</span>
            </article>
            <article className="feature-playground__layout-item">
              <strong>Adaptive track</strong>
              <span>Container-owned behavior, not viewport-only.</span>
            </article>
          </div>
          <FeatureChips feature={feature} />
        </div>
      )
    case 'colors':
      return (
        <div className="feature-playground__subject feature-playground__subject--colors">
          <p className="eyebrow">color lab</p>
          <h4>{title}</h4>
          <div className="feature-playground__palette" aria-label="Generated color tokens">
            {['surface', 'border', 'hover', 'muted'].map((token) => (
              <span className="feature-playground__swatch" data-token={token} key={token}>
                {token}
              </span>
            ))}
          </div>
          <FeatureChips feature={feature} />
        </div>
      )
    case 'functions':
      return (
        <div className="feature-playground__subject feature-playground__subject--functions">
          <p className="eyebrow">math lab</p>
          <h4>{title}</h4>
          <div className="feature-playground__formula-stage" aria-label="CSS math stage">
            <span className="feature-playground__axis" />
            <span className="feature-playground__math-point">calc()</span>
          </div>
          <FeatureChips feature={feature} />
        </div>
      )
    case 'selectors':
      return (
        <form className="feature-playground__subject feature-playground__state-form">
          <p className="eyebrow">selector state lab</p>
          <h4>{title}</h4>
          <label>
            Email state
            <input type="email" placeholder="invalid until email" required />
          </label>
          <label className="feature-playground__inline-check">
            <input type="checkbox" defaultChecked /> selected option
          </label>
          <details>
            <summary>Disclosure state</summary>
            <p>Open, focus, checked, and invalid states are inspectable.</p>
          </details>
          <FeatureChips feature={feature} />
        </form>
      )
    case 'typography':
      return (
        <article className="feature-playground__subject feature-playground__subject--typography">
          <p className="eyebrow">type lab</p>
          <h4 className="feature-playground__type-headline">{title} changes the rhythm of real text</h4>
          <p className="feature-playground__type-copy">
            Adjust measure, line height, and wrap mode. The same copy now shows whether the feature improves line
            breaks, rhythm, and readable scanning.
          </p>
          <FeatureChips feature={feature} />
        </article>
      )
    case 'motion':
      return (
        <div className="feature-playground__subject feature-playground__subject--motion">
          <p className="eyebrow">motion lab</p>
          <h4>{title}</h4>
          <div className="feature-playground__motion-scroll" tabIndex={0} aria-label="Scrollable motion preview">
            {['entry', 'cover', 'exit'].map((step) => (
              <article className="feature-playground__motion-card" key={step}>
                {step}
              </article>
            ))}
          </div>
          <FeatureChips feature={feature} />
        </div>
      )
    case 'components':
      return (
        <div className="feature-playground__subject feature-playground__subject--components">
          <p className="eyebrow">native UI lab</p>
          <h4>{title}</h4>
          <details className="feature-playground__native-details">
            <summary>Inspect native state</summary>
            <p>Platform state remains semantic while CSS enhances the surface.</p>
          </details>
          <div className="feature-playground__native-carousel" tabIndex={0} aria-label="Registry snap carousel">
            {['one', 'two', 'three'].map((item) => (
              <span className="feature-playground__native-slide" key={item}>
                {item}
              </span>
            ))}
          </div>
          <FeatureChips feature={feature} />
        </div>
      )
    case 'effects':
      return (
        <div className="feature-playground__subject feature-playground__subject--effects">
          <p className="eyebrow">effects lab</p>
          <h4>{title}</h4>
          <div className="feature-playground__effect-stage">
            <span className="feature-playground__effect-glass">glass</span>
            <span className="feature-playground__effect-shape" />
          </div>
          <FeatureChips feature={feature} />
        </div>
      )
    case 'architecture':
      return (
        <div className="feature-playground__subject feature-playground__subject--architecture">
          <p className="eyebrow">systems lab</p>
          <h4>{title}</h4>
          <div className="feature-playground__scope-demo">
            <span>base layer</span>
            <strong className="feature-playground__token-output">token output</strong>
            <span>scoped child</span>
          </div>
          <FeatureChips feature={feature} />
        </div>
      )
    case 'games':
      return (
        <div className="feature-playground__subject feature-playground__subject--games">
          <p className="eyebrow">css game state</p>
          <h4>{title}</h4>
          <div className="feature-playground__game-board">
            {Array.from({ length: 9 }, (_, index) => (
              <label className="feature-playground__game-cell" key={index}>
                <input type="checkbox" />
                <span>{index + 1}</span>
              </label>
            ))}
          </div>
          <FeatureChips feature={feature} />
        </div>
      )
  }
}

export default FeaturePlayground
