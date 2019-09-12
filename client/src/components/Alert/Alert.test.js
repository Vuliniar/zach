import React from 'react';
import { Alert } from './Alert';

import { shallow } from 'enzyme';

describe('Alert Component', () => {

    it('Should NOT have any alerts', () => {
        let alerts = [];
        let cmp = shallow(<Alert alerts={alerts} />);
        expect(cmp.find('.alert').length).toBe(0);
    });

    it('Should have one alert', () => {
        let alerts = [
            {
                msg: "Testing",
                msgType: "success",
                id: 'testing02092019'
            }
        ];
        let cmp = shallow(<Alert alerts={alerts} />)
        expect(cmp.find('.alert').length).toBe(1);
    });
});