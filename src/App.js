import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'

import Films from './components/films/Films'
import FilmsInfo from './components/films/FilmsInfo'
import Character from './components/character/Character'
import CharacterInfo from './components/character/CharacterInfo'
import Species from './components/species/Species'
import SpeciesInfo from './components/species/SpeciesInfo'
import Starships from './components/starships/Starships'
import StarshipsInfo from './components/starships/StarshipsInfo'
import Vehicles from './components/vehicles/Vehicles'
import VehiclesInfo from './components/vehicles/VehiclesInfo'
import Planets from './components/planets/Planets'
import PlanetsInfo from './components/planets/PlanetsInfo'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <>
          <Header />
          <div>
            <Switch>
              <Route path='/people/:id' component={CharacterInfo} />
              <Route path="/people" component={Character} />
              <Route path='/films/:id' component={FilmsInfo} />
              <Route path="/films" component={Films} />
              <Route path="/species/:id" component={SpeciesInfo} />
              <Route path="/species" component={Species} />
              <Route path="/starships/:id" component={StarshipsInfo} />
              <Route path="/starships" component={Starships} />
              <Route path="/vehicles/:id" component={VehiclesInfo} />
              <Route path="/vehicles" component={Vehicles} />
              <Route path="/planets/:id" component={PlanetsInfo} />
              <Route path="/planets" component={Planets} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </>
      </BrowserRouter>
    )
  }
}

export default App;