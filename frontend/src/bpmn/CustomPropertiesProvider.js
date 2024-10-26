import { SelectEntry } from '@bpmn-io/properties-panel';
import FormsApi from "../api/FormsApi"

class CustomPropertiesProvider {
    constructor(propertiesPanel, modeling) {
        propertiesPanel.registerProvider(500, this);
        this.modeling = modeling;
        this.options = [{
            value: 0,
            label: 'Select option'
        }];
        this.fetchOptions();
    }

    async fetchOptions() {
        try {
            const response = await FormsApi.GetAll();
            this.options = response.data.map(option => ({
                value: option._id,
                label: option.formName
            }));
        } catch (error) {
            console.error('Error fetching options:', error);
            this.options = [];
        }
    }

    getGroups(element) {
        return (groups) => {
            const customGroup = {
                id: 'custom-group',
                label: 'Custom Group',
                entries: [
                    {
                        id: 'customDropdown',
                        component: SelectEntry,
                        label: 'Select Your Form',
                        getOptions: () => {
                            return this.options;
                        },
                        getValue: () => {
                            return  localStorage.getItem(element.id);
                        },
                        setValue: (value) => {
                           localStorage.setItem(`${element.id}`, value)
                            return { customDropdown: value }
                        }
                    }
                ]
            };

            if (groups.filter(a => a.id === "form").length) {
                groups.filter(a => a.id === "form")[0]
                    .entries
                    .push(customGroup.entries[0]);
            }
            return groups;
        };
    }
}

CustomPropertiesProvider.$inject = ['propertiesPanel', 'modeling'];

export default CustomPropertiesProvider;
