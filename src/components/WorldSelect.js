import React from 'react';

const WorldSelect = (props) => {
  const setWorld = props.setWorld;

  return (
    <>
      <div className="form-select-wrapper">
        <label htmlFor="search-form-world">World:</label>
        <select 
          name="world" 
          id="search-form-world"
          onChange={(e) => setWorld(e.target.value)}
        >
          <optgroup label="Aether">
            <option value="adamantoise">Adamantoise</option>
            <option value="cactuar">Cactuar</option>
            <option value="faerie">Faerie</option>
            <option value="gilgamesh">Gilgamesh</option>
            <option value="jenova">Jenova</option>
            <option value="midgardsormr">Midgardsormr</option>
            <option value="sargatanas">Sargatanas</option>
            <option value="siren">Siren</option>
          </optgroup>
          <optgroup label="Crystal">
            <option value="balmung">Balmung</option>
            <option value="brynhildr">Brynhildr</option>
            <option value="coeurl">Coeurl</option>
            <option value="diabolos">Diabolos</option>
            <option value="goblin">Goblin</option>
            <option value="malboro">Malboro</option>
            <option value="mateus">Mateus</option>
            <option value="zalera">Zalera</option>
          </optgroup>
          <optgroup label="Primal">
            <option value="behemoth">Behemoth</option>
            <option value="excalibur"></option>
            <option value="exodus">Exodus</option>
            <option value="famfrit">Famfrit</option>
            <option value="hyperion">Hyperion</option>
            <option value="lamia">Lamia</option>
            <option value="leviathan">Leviathan</option>
            <option value="ultros">Ultros</option>
          </optgroup>
          <optgroup label="Chaos">
            <option value="cerberus">Cerberus</option>
            <option value="louisoix">Louisoix</option>
            <option value="moogle">Moogle</option>
            <option value="omega">Omega</option>
            <option value="ragnarok">Ragnarok</option>
            <option value="spriggan">Spriggan</option>
          </optgroup>
          <optgroup label="Light">
            <option value="lich">Lich</option>
            <option value="odin">Odin</option>
            <option value="phoenix">Phoenix</option>
            <option value="shiva">Shiva</option>
            <option value="twintania">Twintania</option>
            <option value="zodiark">Zodiark</option>
          </optgroup>
          <optgroup label="Elemental">
            <option value="aegis">Aegis</option>
            <option value="atomos">Atomos</option>
            <option value="carbuncle">Carbuncle</option>
            <option value="garuda">Garuda</option>
            <option value="gungnir">Gungnir</option>
            <option value="kujata">Kujata</option>
            <option value="ramuh">Ramuh</option>
            <option value="tonberry">Tonberry</option>
            <option value="typhon">Typhon</option>
            <option value="unicorn">Unicorn</option>
          </optgroup>
          <optgroup label="Gaia">
            <option value="alexander">Alexander</option>
            <option value="bahamut">Bahamut</option>
            <option value="durandal">Durandal</option>
            <option value="fenrir">Fenrir</option>
            <option value="ifrit">Ifrit</option>
            <option value="ridill">Ridill</option>
            <option value="tiamat">Tiamat</option>
            <option value="ultima">Ultima</option>
            <option value="valefor">Valefor</option>
            <option value="yojimbo">Yojimbo</option>
            <option value="zeromus">Zeromus</option>
          </optgroup>
          <optgroup label="Mana">
            <option value="anima">Anima</option>
            <option value="asura">Asura</option>
            <option value="belias">Belias</option>
            <option value="chocobo">Chocobo</option>
            <option value="hades">Hades</option>
            <option value="ixion">Ixion</option>
            <option value="mandragora">Mandragora</option>
            <option value="masamune">Masamune</option>
            <option value="pandaemonium">Pandaemonium</option>
            <option value="shinryu">Shinryu</option>
            <option value="titan">Titan</option>
          </optgroup>
        </select>
      </div>
    </>
  );
};

export default WorldSelect;
