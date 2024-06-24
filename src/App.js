import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Index from "./pages/Index";
const App = () => {

  return (
    <>
      <Router>

        <Switch>
          <Route
            path='/'
            render={(props) => {
              return <Index {...props} />;
            }}
          />
        </Switch>
      </Router>
    </>
  );
};

export default App;

