import React, { useEffect, useRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  ZeebePropertiesProviderModule,
} from 'bpmn-js-properties-panel';
// Camunda 8 moddle extension
import zeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe';
// Camunda 8 behaviors
import ZeebeBehaviorsModule from 'camunda-bpmn-js-behaviors/lib/camunda-cloud';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

const sampleDiagram = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1"/>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
        <dc:Bounds x="173" y="102" width="36" height="36"/>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;

const BpmnModelerComponent = ({ diagramXML, onChange }) => {
  const modelerRef = useRef(null);
  const propertiesRef = useRef(null);
  const bpmnModeler = useRef(null);

  const handleSave = async () => {
    try {
      const { xml } = await bpmnModeler.current.saveXML({ format: true });
      console.log(xml);
      if (onChange) {
        onChange(xml);
      }
    } catch (err) {
      console.error('Error saving BPMN diagram:', err);
    }
  };

  useEffect(() => {
    bpmnModeler.current = new BpmnModeler({
      container: modelerRef.current,
      propertiesPanel: {
        parent: propertiesRef.current
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        ZeebePropertiesProviderModule,
        ZeebeBehaviorsModule
      ],
      moddleExtensions: {
        zeebe: zeebeModdle
      }
    });
    bpmnModeler.current.importXML(diagramXML || sampleDiagram).catch(console.error);
    const eventBus = bpmnModeler.current.get('eventBus');
    const handleDiagramChange = () => handleSave();
    eventBus.on('commandStack.changed', handleDiagramChange);
    return () => {
      eventBus.off('commandStack.changed', handleDiagramChange);
      bpmnModeler.current.destroy();
    };
  }, [diagramXML]);


  return (
    <div style={{ width: '100%', height: '700px', borderTop: '1px solid #ccc' }}>
      <div class="modeler" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div id="canvas" ref={modelerRef} style={{ width: '78%', height: '600px' }}></div>
        <div id="properties" ref={propertiesRef}
          style={{
            width: '22%',
            height: '100%',
            height: '600px',
            borderLeft: '1px solid #ccc'
          }}></div>
      </div>
    </div>
  );
};

export default BpmnModelerComponent;
