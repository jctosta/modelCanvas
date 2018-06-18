import context from '../../test/testHelpers';

const AppContext = ({
  Consumer(props) {
    return props.children(context);
  },
});

export default AppContext;
