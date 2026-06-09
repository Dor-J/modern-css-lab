import { useId, useMemo, useRef, useState } from 'react'
import type { CssCatalogEntry, CssDemoSpec } from '../../data/cssCatalog'
import DemoControlBar from '../playground/DemoControlBar'
import { getCssVarStyle, renderSnippetTemplate } from '../playground/playgroundUtils'
import { usePlaygroundState } from '../playground/usePlaygroundState'
import BrowserSupportBadge from '../ui/BrowserSupportBadge'
import CssDevConsole from './CssDevConsole'

type CssDemoRendererProps = {
  entry: CssCatalogEntry
  spec: CssDemoSpec
}

function CssDemoRenderer({ entry, spec }: CssDemoRendererProps) {
  const headingId = useId()
  const previewDescriptionId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [selectedTargetId, setSelectedTargetId] = useState(spec.targets[0]?.id ?? '')
  const [refreshKey, setRefreshKey] = useState(0)
  const { values, setValue, resetValues } = usePlaygroundState(`css-${entry.slug}`, spec.controls)
  const cssVarStyle = useMemo(() => getCssVarStyle(spec.controls, values), [spec.controls, values])
  const renderedCss = useMemo(
    () => renderSnippetTemplate(spec.cssRules, spec.controls, values),
    [spec.controls, spec.cssRules, values],
  )

  return (
    <section className="css-demo-renderer" id={`demo-${entry.slug}`} aria-labelledby={headingId}>
      <header className="css-demo-renderer__header">
        <div>
          <p className="eyebrow">Deep CSS playground</p>
          <h2 id={headingId}>{entry.title}</h2>
          <p>{entry.summary}</p>
        </div>
        <span className={`catalog-status catalog-status--${entry.status}`}>{entry.status}</span>
      </header>
      <p className="interaction-help">
        This catalog demo is generated from a grammar-aware template. Controls update CSS custom properties,
        injected rules, snippets, support checks, and computed values.
      </p>
      {entry.category === 'motion' ? (
        <aside className="motion-safety-note" aria-label="Reduced motion behavior">
          Motion safe: catalog motion examples preserve readable static states under
          <code> prefers-reduced-motion</code>.
        </aside>
      ) : null}
      <DemoControlBar
        controls={spec.controls}
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
      <div className="css-demo-renderer__workspace">
        <div
          className="css-demo-renderer__stage"
          ref={rootRef}
          style={cssVarStyle}
          role="region"
          tabIndex={0}
          aria-label={`${entry.title} catalog demo preview`}
          aria-describedby={previewDescriptionId}
        >
          <style>{renderedCss}</style>
          <p className="visually-hidden" id={previewDescriptionId}>
            Live catalog preview for {entry.title}. The generated demo demonstrates the entry in a scoped element
            with current control values and an adjacent fallback or edge-case target.
          </p>
          <div
            className="css-demo-renderer__scope"
            data-css-demo={entry.slug}
            dangerouslySetInnerHTML={{ __html: spec.htmlTemplate }}
            onInput={() => setRefreshKey((current) => current + 1)}
            onChange={() => setRefreshKey((current) => current + 1)}
            onPointerUp={() => setRefreshKey((current) => current + 1)}
          />
        </div>
        <CssDevConsole
          rootRef={rootRef}
          htmlTemplate={spec.htmlTemplate}
          cssRules={spec.cssRules}
          controls={spec.controls}
          targets={spec.targets}
          selectedTargetId={selectedTargetId}
          onSelectTarget={setSelectedTargetId}
          values={values}
          computedProperties={spec.computedProperties}
          supportQueries={spec.supportQueries}
          snippets={spec.snippetTemplates}
          refreshKey={refreshKey}
        />
      </div>
      <div className="css-demo-renderer__notes">
        <article>
          <h3>Fallback</h3>
          <p>{entry.fallbackStrategy}</p>
        </article>
        <article>
          <h3>Browser caveat</h3>
          <p>{entry.browserNotes}</p>
        </article>
        <article>
          <h3>Accessibility</h3>
          <ul>
            {spec.accessibilityNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3>Support level</h3>
          <BrowserSupportBadge
            support={entry.status === 'experimental' ? 'experimental' : entry.status === 'deprecated' ? 'progressive' : 'baseline-widely'}
          />
        </article>
      </div>
    </section>
  )
}

export default CssDemoRenderer
