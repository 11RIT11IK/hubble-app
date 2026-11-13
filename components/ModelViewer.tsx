"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; alt: string };

export default function ModelViewer({src , alt} : Props) {
	const ref = useRef<HTMLElement | null>(null);
  const [libraryReady, setLibraryReady] = useState(false);
	const [failed, setFailed] = useState(false);
	const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

	//we need to load our 3d model viewer library in browser so we use useEffect
  useEffect(() => {
		let cancelled = false;

		import("@google/model-viewer")
		.then (() => {
		if (!cancelled) setLibraryReady(true);
		})
    .catch(() => {
     if (!cancelled) setFailed(true);
     });

		return () => {
    cancelled = true;
    }
	
	}, [])
	
	useEffect(() => {
		const el = ref.current;
    if (!libraryReady || !el) return;

    const onProgress = (e: Event) => {
      const detail = (e as CustomEvent<{ totalProgress: number }>).detail;
      setProgress(Math.round(detail.totalProgress * 100));
    };
    const onLoad = () => setLoaded(true);
    const onError = () => setFailed(true);

    el.addEventListener("progress", onProgress);
    el.addEventListener("load", onLoad);
    el.addEventListener("error", onError);

    if ((el as HTMLElement & { loaded?: boolean }).loaded) setLoaded(true);

    return () => {
      el.removeEventListener("progress", onProgress);
      el.removeEventListener("load", onLoad);
      el.removeEventListener("error", onError);
    };
	
	}, [libraryReady])

	return (
    
		 <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:aspect-[4/3] lg:aspect-square">
      {libraryReady && !failed && (
        <model-viewer
          ref={ref}
          src={src}
          alt={alt}
          camera-controls
          auto-rotate
          shadow-intensity="1"
          touch-action="pan-y"
          loading="eager"
          className="h-full w-full"
        />
      )}

      {!loaded && !failed && (
        <div
          role="status"
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-100"
        >
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />
          <p className="text-sm text-slate-600">Loading 3D model… {progress}%</p>
          <div className="h-1.5 w-40 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {failed && (
        <div
          role="alert"
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1 bg-slate-100 px-6 text-center"
        >
          <p className="font-medium text-slate-900">The 3D model could not be loaded.</p>
          <p className="text-sm text-slate-600">Please refresh the page and try again.</p>
        </div>
      )}

      {loaded && (
        <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/80 px-3 py-1 text-xs text-slate-600 backdrop-blur">
          Drag to rotate · Scroll or pinch to zoom
        </p>
      )}
    </div>


	)

}