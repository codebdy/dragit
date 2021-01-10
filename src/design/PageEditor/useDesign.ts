import { useCanvasStore } from "./CanvasStore"

export function useDesign(){
  const canvasStore = useCanvasStore();
  return {isDesigning:!!canvasStore, canvasStore}
}