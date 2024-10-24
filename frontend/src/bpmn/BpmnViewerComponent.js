import React, { useEffect, useRef } from 'react';
import BpmnViewer from 'bpmn-js/lib/Viewer';
import 'bpmn-js/dist/assets/diagram-js.css';  // Diagram styles
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';  // BPMN styles

const BpmnViewerComponent = ({ diagramXML }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    const bpmnViewer = new BpmnViewer({container: viewerRef.current});
    bpmnViewer.importXML(diagramXML).catch(console.error);
    return () => {
      bpmnViewer.destroy();
    };
  }, [diagramXML]);

  return (
    <div>
      <div ref={viewerRef} style={{ width: '100%', height: '600px' }}></div>
    </div>
  );
};

export default BpmnViewerComponent;
