import { useId, useMemo, useState, type KeyboardEvent, type RefObject } from 'react'
import type { FeatureControl, FeatureSnippetTemplate, FeatureSupportQuery, FeatureTarget } from '../../data/features'
import CodeBlock from '../ui/CodeBlock'
import ComputedStyleTable from '../playground/ComputedStyleTable'
import ElementTargetPicker from '../playground/ElementTargetPicker'
import LiveSnippet from '../playground/LiveSnippet'
import SupportQueryPanel from '../playground/SupportQueryPanel'
import { renderSnippetTemplate, type PlaygroundValues } from '../playground/playgroundUtils'
import LiveRegion from '../ui/LiveRegion'

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

const tabDescriptions: Record<ConsoleTab, string> = {
  elements: 'Choose a target element and review the scoped HTML.',
  styles: 'Review the authored CSS rules with the current control values substituted.',
  computed: 'Read computed CSS values from the selected live element.',
  variables: 'Review live custom property values written by the demo controls.',
  supports: 'Review browser support checks and fallback states for this CSS entry.',
  snippets: 'Copy the current generated CSS, HTML, and fallback snippets.',
}

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
  const consoleId = useId()
  const [activeTab, setActiveTab] = useState<ConsoleTab>('elements')
  const selectedTarget = targets.find((target) => target.id === selectedTargetId) ?? targets[0]
  const renderedCss = useMemo(
    () => renderSnippetTemplate(cssRules, controls, values),
    [controls, cssRules, values],
  )
  const customProperties = controls.flatMap((control) => (control.cssVar ? [control.cssVar] : []))
  const activeTabId = `${consoleId}-${activeTab}-tab`
  const activePanelId = `${consoleId}-${activeTab}-panel`
  const activeDescriptionId = `${consoleId}-${activeTab}-description`

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return

    event.preventDefault()

    const currentIndex = tabs.indexOf(activeTab)
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? tabs.length - 1
          : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
            ? (currentIndex - 1 + tabs.length) % tabs.length
            : (currentIndex + 1) % tabs.length
    const nextTab = tabs[nextIndex]
    setActiveTab(nextTab)

    window.requestAnimationFrame(() => {
      document.getElementById(`${consoleId}-${nextTab}-tab`)?.focus()
    })
  }

  return (
    <aside className="css-dev-console" aria-label="CSS dev console">
      <div className="css-dev-console__tabs" role="tablist" aria-label="Dev console panels" onKeyDown={handleTabKeyDown}>
        {tabs.map((tab) => (
          <button
            type="button"
            role="tab"
            id={`${consoleId}-${tab}-tab`}
            aria-selected={activeTab === tab}
            aria-controls={`${consoleId}-${tab}-panel`}
            aria-describedby={`${consoleId}-${tab}-description`}
            tabIndex={activeTab === tab ? 0 : -1}
            key={tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <p className="visually-hidden" id={`${consoleId}-${tab}-description`} key={`${tab}-description`}>
          {tabDescriptions[tab]}
        </p>
      ))}
      <div
        className="css-dev-console__panel"
        role="tabpanel"
        id={activePanelId}
        aria-labelledby={activeTabId}
        aria-describedby={activeDescriptionId}
        tabIndex={0}
      >
        <p className="visually-hidden">{tabDescriptions[activeTab]}</p>
        {activeTab === 'elements' ? (
          <>
            <ElementTargetPicker
              targets={targets}
              selectedId={selectedTargetId}
              onSelect={onSelectTarget}
              label="Inspect catalog demo target"
            />
            <LiveRegion message={selectedTarget ? `Inspecting ${selectedTarget.label}.` : ''} />
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
