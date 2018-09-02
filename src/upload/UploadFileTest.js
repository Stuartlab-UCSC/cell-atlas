
// Test uploadFile.
// Work in progress.

// Examples from
// https://willowtreeapps.com/ideas/best-practices-for-unit-testing-with-a-react-redux-approach

// TODO:
// We really should not be changing state/props through Eventing.
// Rather we can test that each form element event handler fires the appropriate
// prop function, and that it perhaps changes ‘state’ in the appropriate way.

import { createShallow } from '@material-ui/core/test-utils';

////////////////  presentational component testing  //////////////////////////
describe('<UploadFile />', () => {

    // Shallow rendering.
    // https://material-ui.com/guides/testing/
    
    let shallow;

    before(() => {
        shallow = createShallow();
    });

    it('should work', () => {
        const wrapper = shallow(<UploadFile />);
    });
});

/* Presentational component props testing example.
// Not used here because there are no props.
export function HeaderLinks(props) {

    // Raw, unconnected component for testing.
    // TODO: Presentational component prop testing.

    ...
    return (
    <Grid container item className={classes.nav}>
        <HeaderMenu renderMenuLinks={() => menuLinks} />
    </Grid>
        )
}

// connected (or any other sort of HOC component, etc) for use in App
export default connect(mapStateToProps)(compose(withStyles(styles) withWidth())(HeaderLinks));
*/

////////////////  reducer testing  //////////////////////////
// See examples at https://willowtreeapps.com/ideas/best-practices-for-unit-testing-with-a-react-redux-approach

////////////////  connected component testing  //////////////////////////

describe('when a feature file is selected', () => {

    // Raw, unconnected component event testing.
    // TODO: Presentational component testing.
    // https://willowtreeapps.com/ideas/best-practices-for-unit-testing-with-a-react-redux-approach
    
    beforeEach(() => {
        component.find('input#uploadFeature')
            .simulate('change', { preventDefault() {} });
    })
    ...
}

// Component value and state.
component.instance().setFeatureFile({ target: { value: '8675309' } })

/* example:
setBankNumber = event => {

    // Component value and state.
    const input = event;
    const { accountInfo } = this.state;
    const { value: routingNumber } = input.target;
    this.setState({
        accountInfo: { ...accountInfo, bankNumber },
    });
};

// with this html:
<TextField
    id="routing-number"
    type="text"
    label="Bank Number"
    placeholder="9 digit number"
    onChange={this.setRoutingNumber}
/>
*/
/* another example:
it('defaults to 5 minimum payments', function () {

    // Component default value and state.
    const wrapper = shallow(
        <Payments />
    )
    assert.equal(wrapper.find('[data-test="payment"]').node.value, 5)
})
