import { chainHead, chainSpec, transaction } from "@/methods"
import { ParsedJsonRpcEnhancer } from "@/parsed"

const jsonRpcMsg = <T extends {}>(msg: T) => ({
  jsonrpc: "2.0",
  ...msg,
})

const [transactionGroup] = transaction.stop.split("_")
const unstable = "unstable"
const rpcMethods = "rpc_methods"
const RPC_METHODS_ID = "__INTERNAL_ID"

export const translate: ParsedJsonRpcEnhancer = (base) => {
  return (originalOnMsg) => {
    let isRunning = true
    let bufferedMsgs: Array<{ id: string; method: string; params: string }> = []

    // It's possible (and very likely) that the consumer will start sending requests
    // before we have figured out which are the actual methods that are available and
    // how to translate them. So, the initial `_send` function just captures those received
    // requests until it's able to "translate" them... At which point it will send all
    // the buffered messages and then it will mutate the _send function with the one
    // that it's able to transalte the requests
    let _send = (msg: any) => {
      bufferedMsgs.push(msg)
    }

    // originally the _onMsg function is wired up to receive the initial response to
    // our internal rpc_methods request. Once it receives the response, then it applies
    // the necessary transaltions and re-wires the _onMsg to the original one.
    let _onMsg: (msg: any) => void = ({
      id,
      result,
    }: {
      id: string
      result: { methods: string[] }
    }) => {
      if (id !== RPC_METHODS_ID || !isRunning) return

      const methodsSet = new Set(result.methods)
      const methodMappings: Record<string, string | null> = {}

      ;[chainHead, chainSpec, transaction].forEach((obj) => {
        Object.values(obj).forEach((method) => {
          if (methodsSet.has(method)) {
            methodMappings[method] = method
          } else {
            const [group, , name] = method.split("_")
            const unstableMethod = `${group}_${unstable}_${name}`

            if (methodsSet.has(unstableMethod)) {
              methodMappings[method] = unstableMethod
              methodsSet.delete(unstableMethod)
              methodsSet.add(method)
            } else {
              methodMappings[method] = null
              if (group === transactionGroup) {
                let matchedMethod: string
                const translatedMethod =
                  method === "stop" ? "unwatch" : "submitAndWatch"
                const txGroup = [
                  transactionGroup + "Watch",
                  transactionGroup,
                ].find((group) =>
                  ["v1", unstable].find((v) =>
                    methodsSet.has(
                      (matchedMethod = `${group}_${v}_${translatedMethod}`),
                    ),
                  ),
                )
                if (txGroup) {
                  methodMappings[method] = matchedMethod!
                  methodsSet.add(method)
                }
              }
            }
          }
        })
      })

      _onMsg = originalOnMsg
      const enhancedSend = ({
        method,
        ...rest
      }: {
        method: string
        id: string
      }) => {
        if (method === rpcMethods) {
          Promise.resolve().then(() => {
            originalOnMsg(
              jsonRpcMsg({
                id: rest.id,
                result: { methods: [...methodsSet] },
              }),
            )
          })
          return
        }

        const mapping = methodMappings[method]
        if (mapping === null)
          Promise.resolve().then(() => {
            originalOnMsg({
              error: { code: -32603, message: `Method not found: ${method}` },
              id: rest.id,
            })
          })
        else
          originalSend({
            method: mapping || method,
            ...rest,
          })
      }

      for (let i = 0; isRunning && i < bufferedMsgs.length; i++)
        enhancedSend(bufferedMsgs[i])
      bufferedMsgs = []
      if (isRunning) _send = enhancedSend
    }

    const { send: originalSend, disconnect } = base((msg: any) => {
      _onMsg(msg)
    })
    originalSend(
      jsonRpcMsg({
        id: RPC_METHODS_ID,
        method: rpcMethods,
        params: [],
      }),
    )

    return {
      send: (msg) => {
        _send(msg)
      },
      disconnect() {
        isRunning = false
        _send = _onMsg = () => {}
        bufferedMsgs = []
        disconnect()
      },
    }
  }
}
