import { useMemo, useState, type RefObject } from 'react'
import type { FeatureControl, FeatureSnippetTemplate, FeatureSupportQuery, FeatureTarget } from '../../data/features'
import CodeBlock from '../ui/CodeBlock'
import ComputedStyleTable from '../playground/ComputedStyleTable'
import ElementTargetPicker from '../playground/ElementTargetPicker'
import LiveSnippet from '../playground/LiveSnippet'
import SupportQueryPanel from '../playground/SupportQueryPanel'
import { renderSnippetTemplate, type PlaygroundValues } from '../playground/playgroundUtils'

type ConsoleTab = 'elements' | 'styles' | 'computed' | 'variables' | 'supports' | 'snippets'

type CssDevConsoleProps = {
  rootRef: RefObject<HTMLElement | null>
  htmlTemplate: string
  cssRules: string
  controls: FeatureControl[]
  targets: FeatureTarget[]
  selectedTargetId: string
  onSelectTarget: (id: string) => void
  values: PlaygroundValues
  computedProperties: string[]
  supportQueries: FeatureSupportQuery[]
  snippets: FeatureSnippetTemplate[]
  refreshKey: number
}

const tabs: ConsoleTab[] = ['elements', 'styles', 'computed', 'variables', 'supports', 'snippets']

function CssDevConsole({
  rootRef,
  htmlTemplate,
  cssRules,
  controls,
  targets,
  selectedTargetId,
  onSelectTarget,
  values,
  computedProperties,
  supportQueries,
  snippets,
  refreshKey,
}: CssDevConsoleProps) {
  const [activeTab, setActiveTab] = useState<ConsoleTab>('elements')
  const selectedTarget = targets.find((target) => target.id === selectedTargetId) ?? targets[0]
  const renderedCss = useMemo(
    () => renderSnippetTemplate(cssRules, controls, values),
    [controls, cssRules, values],
  )
  const customProperties = controls.flatMap((control) => (control.cssVar ? [control.cssVar] : []))

  return (
    <aside className="css-dev-console" aria-label="CSS dev console">
      <div className="css-dev-console__tabs" role="tablist" aria-label="Dev console panels">
        {tabs.map((tab) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            key={tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="css-dev-console__panel" role="tabpanel">
        {activeTab === 'elements' ? (
          <>
            <ElementTargetPicker targets={targets} selectedId={selectedTargetId} onSelect={onSelectTarget} />
            <p>
              Inspecting <code>{selectedTarget?.selector ?? 'none'}</code>
            </p>
            <CodeBlock title="Scoped HTML" language="html" code={htmlTemplate} />
          </>
        ) : null}
        {activeTab === 'styles' ? <CodeBlock title="Authored rules" code={renderedCss} /> : null}
        {activeTab === 'computed' && selectedTarget ? (
          <ComputedStyleTable
            rootRef={rootRef}
            selector={selectedTarget.selector}
            properties={computedProperties}
            customProperties={customProperties}
            refreshKey={refreshKey}
          />
        ) : null}
        {activeTab === 'variables' ? (
          <table className="computed-table">
            <caption>Live custom properties</caption>
            <tbody>
              {controls.map((control) => (
                <tr key={control.id}>
                  <th scope="row">{control.cssVar ?? control.id}</th>
                  <td>{values[control.id] ?? control.defaultValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
        {activeTab === 'supports' ? <SupportQueryPanel queries={supportQueries} /> : null}
        {activeTab === 'snippets' ? (
          <LiveSnippet snippets={snippets} controls={controls} values={values} />
        ) : null}
      </div>
    </aside>
  )
}

export default CssDevConsole
