import React from "react";

function useFetch<T>(url: RequestInfo | URL, options?: RequestInit) {
    const [data, setData] = React.useState<T | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const optionsRef = React.useRef(options);
    optionsRef.current = options;

    React.useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        async function handleFetch() {
            setLoading(true);
            setData(null);

            try {
                const response = await fetch(url, {
                    signal,
                    ...optionsRef.current
                });

                if (!response.ok) throw new Error(`Error: ${response.status}`);

                else {
                    const result = await response.json() as T;

                    if (!signal.aborted) setData(result);
                    else setData(null);
                }
            }

            catch(err) {
                if (!signal.aborted && err instanceof Error) setError(err.message);
            }

            finally {
                if (!signal.aborted) setLoading(false);
            }
        }

        handleFetch();

        return () => {
            controller.abort();
        }
    }, [url]);

    return {
        data,
        loading,
        error
    }
}

export default useFetch