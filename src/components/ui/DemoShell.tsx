import { useId, useMemo, useRef, useState, type ReactNode } from 'react'
import type {
  Feature,
  FeatureControl,
  FeatureSnippetTemplate,
  FeatureSupportQuery,
  FeatureTarget,
} from '../../data/features'
import DemoControlBar from '../playground/DemoControlBar'
import InspectorPanel from '../playground/InspectorPanel'
import LiveSnippet from '../playground/LiveSnippet'
import { getCssVarStyle } from '../playground/playgroundUtils'
import { usePlaygroundState } from '../playground/usePlaygroundState'
import BrowserSupportBadge from './BrowserSupportBadge'
import SupportNotice from './SupportNotice'

type DemoShellProps = {
  feature: Feature
  title: string
  explanation: string
  children: ReactNode
  css?: string
  fallback?: string
  why?: string
  controls?: FeatureControl[]
  targets?: FeatureTarget[]
  snippets?: FeatureSnippetTemplate[]
  computedProperties?: string[]
  supportQueries?: FeatureSupportQuery[]
}

function DemoShell({
  feature,
  title,
  explanation,
  children,
  css,
  fallback,
  why,
  controls = [],
  targets,
  snippets,
  computedProperties,
  supportQueries,
}: DemoShellProps) {
  const headingId = useId()
  const previewDescriptionId = useId()
  const stageRef = useRef<HTMLDivElement>(null)
  const activeTargets = targets ?? feature.interaction.targets
  const activeControls = controls
  const activeSnippets =
    snippets ??
    (css
      ? [
          {
            id: `${feature.slug}-snippet`,
            title: 'Key CSS',
            template: css,
          },
        ]
      : feature.interaction.snippetTemplates)
  const activeComputedProperties = computedProperties ?? feature.interaction.computedProperties
  const activeSupportQueries = supportQueries ?? feature.interaction.supportQueries
  const [selectedTargetId, setSelectedTargetId] = useState(activeTargets[0]?.id ?? '')
  const [refreshKey, setRefreshKey] = useState(0)
  const { values, setValue, resetValues } = usePlaygroundState(feature.slug, activeControls)
  const stageStyle = useMemo(() => getCssVarStyle(activeControls, values), [activeControls, values])
  const hasInspector = activeTargets.length > 0 || activeControls.length > 0 || activeSupportQueries.length > 0

  return (
    <section className="demo-shell" id={feature.slug} aria-labelledby={headingId}>
      <div className="demo-shell__header">
        <div>
          <p className="eyebrow">Live demo</p>
          <h2 id={headingId}>{title}</h2>
        </div>
        <BrowserSupportBadge support={feature.support} year={feature.baselineYear} />
      </div>
      <p className="demo-shell__intro">{explanation}</p>
      <p className="interaction-help">
        Keyboard: tab through controls, the live preview, inspector target buttons, and copyable snippets. Control
        changes update the preview, URL state, snippets, and computed styles.
      </p>
      {feature.category === 'motion' ? (
        <aside className="motion-safety-note" aria-label="Reduced motion behavior">
          Motion safe: this demo respects <code>prefers-reduced-motion</code>. Reduced-motion users receive static
          or near-instant states instead of continuous animation.
        </aside>
      ) : null}
      <DemoControlBar
        controls={activeControls}
        values={values}
        onChange={(id, value) => {
          setValue(id, value)
          setRefreshKey((current) => current + 1)
        }}
        onReset={
          activeControls.length > 0
            ? () => {
                resetValues()
                setRefreshKey((current) => current + 1)
              }
            : undefined
        }
      />
      <div className={`demo-shell__workspace ${hasInspector ? 'demo-shell__workspace--inspected' : ''}`}>
        <div
          className="demo-shell__stage"
          ref={stageRef}
          style={stageStyle}
          role="region"
          tabIndex={0}
          aria-label={`${title} live preview`}
          aria-describedby={previewDescriptionId}
          onInputCapture={() => setRefreshKey((current) => current + 1)}
          onChangeCapture={() => setRefreshKey((current) => current + 1)}
          onPointerUpCapture={() => setRefreshKey((current) => current + 1)}
        >
          <p className="visually-hidden" id={previewDescriptionId}>
            Interactive preview for {title}. Use the demo controls before this region to change CSS custom
            properties and inspect the results in the panel after this region.
          </p>
          {children}
        </div>
        {hasInspector ? (
          <InspectorPanel
            rootRef={stageRef}
            targets={activeTargets}
            selectedTargetId={selectedTargetId}
            onSelectTarget={setSelectedTargetId}
            controls={activeControls}
            computedProperties={activeComputedProperties}
            supportQueries={activeSupportQueries}
            refreshKey={refreshKey}
          />
        ) : null}
      </div>
      <LiveSnippet snippets={activeSnippets} controls={activeControls} values={values} />
      <SupportNotice support={feature.support} year={feature.baselineYear} note={fallback ?? feature.browserNotes} />
      <p className="why-note">
        <strong>Why this matters:</strong> {why ?? feature.whyItMatters}
      </p>
    </section>
  )
}

export default DemoShell
