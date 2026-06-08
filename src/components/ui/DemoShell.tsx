import { useMemo, useRef, useState, type ReactNode } from 'react'
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
    <section className="demo-shell" id={feature.slug}>
      <div className="demo-shell__header">
        <div>
          <p className="eyebrow">Live demo</p>
          <h2>{title}</h2>
        </div>
        <BrowserSupportBadge support={feature.support} year={feature.baselineYear} />
      </div>
      <p className="demo-shell__intro">{explanation}</p>
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
          onInputCapture={() => setRefreshKey((current) => current + 1)}
          onChangeCapture={() => setRefreshKey((current) => current + 1)}
          onPointerUpCapture={() => setRefreshKey((current) => current + 1)}
        >
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
