import { useEffect, useState, type RefObject } from 'react'

type ComputedStyleTableProps = {
  rootRef: RefObject<HTMLElement | null>
  selector: string
  properties: string[]
  customProperties: string[]
  refreshKey: number
}

type ComputedRow = {
  property: string
  value: string
}

function readComputedRows(
  root: HTMLElement | null,
  selector: string,
  properties: string[],
  customProperties: string[],
) {
  const element = selector === ':scope' ? root : root?.querySelector<HTMLElement>(selector)
  if (!element) return { element: null, rows: [] as ComputedRow[] }

  const style = window.getComputedStyle(element)
  const rows = [...properties, ...customProperties].map((property) => ({
    property,
    value: style.getPropertyValue(property).trim() || 'not set',
  }))

  return { element, rows }
}

function ComputedStyleTable({
  rootRef,
  selector,
  properties,
  customProperties,
  refreshKey,
}: ComputedStyleTableProps) {
  const [rows, setRows] = useState<ComputedRow[]>([])
  const [found, setFound] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const result = readComputedRows(rootRef.current, selector, properties, customProperties)
      setRows(result.rows)
      setFound(Boolean(result.element))
    })

    return () => window.cancelAnimationFrame(frame)
  }, [customProperties, properties, refreshKey, rootRef, selector])

  if (!found) {
    return <p className="computed-table__empty">Target element is not currently mounted.</p>
  }

  return (
    <table className="computed-table">
      <caption>Computed styles</caption>
      <tbody>
        {rows.map((row) => (
          <tr key={row.property}>
            <th scope="row">{row.property}</th>
            <td>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ComputedStyleTable
