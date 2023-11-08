import {
  DecodedCall,
  V14,
  getViewBuilder,
} from "@polkadot-api/substrate-codegen"
import { useCallback, useEffect, useRef, useState } from "react"
import rawMetadata from "./polkadot.json"
import { CallDecodedViewer } from "./CallDecodedViewer"
const { callDecoder } = getViewBuilder(rawMetadata.metadata.value as V14)

export const CallDecoder: React.FC<{ callData?: string }> = ({ callData }) => {
  const [decoded, setDecoded] = useState<DecodedCall | null>(null)

  const inputRef = useRef<HTMLTextAreaElement>(null)

  const onBlur = useCallback(() => {
    if (inputRef.current) {
      const input = inputRef.current.value
      try {
        const decoded = callDecoder(input)
        setDecoded(decoded)
      } catch (e) {
        console.error(e)
      }
    }
  }, [inputRef])

  useEffect(() => {
    if (callData === undefined) return
    if (inputRef.current) inputRef.current.value = callData

    try {
      const decoded = callDecoder(callData)
      setDecoded(decoded)
    } catch (e) {
      console.error(e)
    }
  }, [callData])

  return (
    <div style={{ width: "960px" }}>
      <textarea
        rows={4}
        style={{ width: "100%", fontFamily: "monospace" }}
        onBlur={onBlur}
        ref={inputRef}
        placeholder="call data"
      />
      <hr />
      {decoded && <CallDecodedViewer decoded={decoded} />}
    </div>
  )
}
