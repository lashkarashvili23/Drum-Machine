let toggle = false;
let bank = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleEvent = this.handleEvent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.turnOff = this.turnOff.bind(this);
    this.handleBank = this.handleBank.bind(this);
    this.state = { value: 0.35 };
  }

  componentDidMount() {
    this.handleBank();
    document.addEventListener('keydown', this.handleEvent);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEvent);
  }

  handleChange(event) {
    if (!toggle) {
      this.setState({ value: event.target.value });
    }
  }

  turnOff() {
    if (!toggle) {
      document.getElementById('powerButton').classList.remove('btn-active');
      document.getElementById('display-text').innerHTML = 'OFF';
      toggle = true;
      if (document.getElementById('bankButton').classList.contains('btn-active')) {
        this.handleBank();
        document.getElementById('bankButton').classList.remove('btn-active');
      }
    } else {
      document.getElementById('powerButton').classList.add('btn-active');
      document.getElementById('display-text').innerHTML = 'ON';
      toggle = false;
      if (document.querySelector(`audio[dataKey="81"]`).innerHTML == 'Chord 1') {
        document.getElementById('bankButton').classList.add('btn-active');
      }
    }
  }

  handleBank() {
    if (!toggle) {
      if (!bank) {
        document.getElementById('bankButton').classList.add('btn-active');

        document.querySelector(`audio[dataKey="81"]`).src = 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3';
        document.querySelector(`audio[dataKey="81"]`).innerHTML = 'Chord 1';

        document.querySelector(`audio[dataKey="87"]`).src = 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3';
        document.querySelector(`audio[dataKey="87"]`).innerHTML = 'Chord 2';

        document.querySelector(`audio[dataKey="69"]`).src = 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3';
        document.querySelector(`audio[dataKey="69"]`).innerHTML = 'Chord 3';

        document.querySelector(`audio[dataKey="65"]`).src = 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3';
        document.querySelector(`audio[dataKey="65"]`).innerHTML = 'Shaker';

        document.querySelector(`audio[dataKey="83"]`).src = 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3';
        document.querySelector(`audio[dataKey="83"]`).innerHTML = 'Open HH';

        document.querySelector(`audio[dataKey="68"]`).src = 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3';
        document.querySelector(`audio[dataKey="68"]`).innerHTML = 'Closed HH';

        document.querySelector(`audio[dataKey="90"]`).src = 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3';
        document.querySelector(`audio[dataKey="90"]`).innerHTML = 'Punchy Kick';

        document.querySelector(`audio[dataKey="88"]`).src = 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3';
        document.querySelector(`audio[dataKey="88"]`).innerHTML = 'Side Stick';

        document.querySelector(`audio[dataKey="67"]`).src = 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3';
        document.querySelector(`audio[dataKey="67"]`).innerHTML = 'Snare';

        bank = true;
      } else {
        document.getElementById('bankButton').classList.remove('btn-active');

        document.querySelector(`audio[dataKey="81"]`).src = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3';
        document.querySelector(`audio[dataKey="81"]`).innerHTML = 'Heater 1';

        document.querySelector(`audio[dataKey="87"]`).src = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3';
        document.querySelector(`audio[dataKey="87"]`).innerHTML = 'Heater 2';

        document.querySelector(`audio[dataKey="69"]`).src = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3';
        document.querySelector(`audio[dataKey="69"]`).innerHTML = 'Heater 3';

        document.querySelector(`audio[dataKey="65"]`).src = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3';
        document.querySelector(`audio[dataKey="65"]`).innerHTML = 'Heater 4';

        document.querySelector(`audio[dataKey="83"]`).src = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3';
        document.querySelector(`audio[dataKey="83"]`).innerHTML = 'Clap';

        document.querySelector(`audio[dataKey="68"]`).src = 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3';
        document.querySelector(`audio[dataKey="68"]`).innerHTML = 'Open HH';

        document.querySelector(`audio[dataKey="90"]`).src = 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3';
        document.querySelector(`audio[dataKey="90"]`).innerHTML = "Kick n' Hat";

        document.querySelector(`audio[dataKey="88"]`).src = 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3';
        document.querySelector(`audio[dataKey="88"]`).innerHTML = 'Kick';

        document.querySelector(`audio[dataKey="67"]`).src = 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3';
        document.querySelector(`audio[dataKey="67"]`).innerHTML = 'Closed HH';

        bank = false;
      }
    }
  }

  handleEvent(e) {
    if (!toggle) {
      const audio = document.querySelector(`audio[dataKey="${e.keyCode}"]`);
      const key = document.querySelector(`.key[dataKey="${e.keyCode}"]`);
      if (!audio) return;
      audio.volume = this.state.value;
      audio.currentTime = 0;
      audio.play();
      key.classList.add('playing');
      setTimeout(() => {
        key.classList.remove('playing');
      }, 100);
      const name = document.getElementById('display-text');
      name.innerHTML = audio.innerHTML;
    }
  }

  handleClick(event) {
    if (!toggle) {
      const audio = document.querySelector(`audio[dataKey="${event.target.getAttribute("dataKey")}"]`);
      const key = event.target.getAttribute("dataKey");
      if (!audio) return;
      audio.volume = this.state.value;
      audio.currentTime = 0;
      audio.play();
      event.target.classList.add('playing');
      setTimeout(() => {
        event.target.classList.remove('playing');
      }, 100);
      const name = document.getElementById('display-text');
      name.innerHTML = audio.innerHTML;
    }
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "drum-machine" }, /*#__PURE__*/
      React.createElement("div", { id: "drum-pad" }, /*#__PURE__*/
      React.createElement("div", { className: "first" }, /*#__PURE__*/
      React.createElement("div", { onClick: this.handleClick, dataKey: "81", className: "pad key" }, "Q"), /*#__PURE__*/
      React.createElement("div", { onClick: this.handleClick, dataKey: "65", className: "pad key" }, "A"), /*#__PURE__*/
      React.createElement("div", { onClick: this.handleClick, dataKey: "90", className: "pad key" }, "Z")), /*#__PURE__*/

      React.createElement("div", { className: "second" }, /*#__PURE__*/
      React.createElement("div", { onClick: this.handleClick, dataKey: "87", className: "pad key" }, "W"), /*#__PURE__*/
      React.createElement("div", { onClick: this.handleClick, dataKey: "83", className: "pad key" }, "S"), /*#__PURE__*/
      React.createElement("div", { onClick: this.handleClick, dataKey: "88", className: "pad key" }, "X")), /*#__PURE__*/

      React.createElement("div", { className: "third" }, /*#__PURE__*/
      React.createElement("div", { onClick: this.handleClick, dataKey: "69", className: "pad key" }, "E"), /*#__PURE__*/
      React.createElement("div", { onClick: this.handleClick, dataKey: "68", className: "pad key" }, "D"), /*#__PURE__*/
      React.createElement("div", { onClick: this.handleClick, dataKey: "67", className: "pad key" }, "C")), /*#__PURE__*/


      React.createElement("audio", { dataKey: "81", src: "" }), /*#__PURE__*/
      React.createElement("audio", { dataKey: "87", src: "" }), /*#__PURE__*/
      React.createElement("audio", { dataKey: "69", src: "" }), /*#__PURE__*/
      React.createElement("audio", { dataKey: "65", src: "" }), /*#__PURE__*/
      React.createElement("audio", { dataKey: "83", src: "" }), /*#__PURE__*/
      React.createElement("audio", { dataKey: "68", src: "" }), /*#__PURE__*/
      React.createElement("audio", { dataKey: "90", src: "" }), /*#__PURE__*/
      React.createElement("audio", { dataKey: "88", src: "" }), /*#__PURE__*/
      React.createElement("audio", { dataKey: "67", src: "" })), /*#__PURE__*/


      React.createElement("div", { id: "display" }, /*#__PURE__*/
      React.createElement("div", { id: "div-power" }, /*#__PURE__*/
      React.createElement("label", { for: "powerButton" }, "Power"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/
      React.createElement("input", { onClick: this.turnOff, type: "button", id: "powerButton", className: "btn btn-active" })), /*#__PURE__*/


      React.createElement("div", { id: "screen" }, /*#__PURE__*/
      React.createElement("h2", { id: "display-text" }, "ON")), /*#__PURE__*/


      React.createElement("div", { id: "vol-div" }, /*#__PURE__*/
      React.createElement("label", { for: "bankButton" }, "Volume"), /*#__PURE__*/
      React.createElement("input", { id: "volume", type: "range", step: "0.01", onChange: this.handleChange, value: this.state.value, max: "1", min: "0" })), /*#__PURE__*/


      React.createElement("div", { id: "div-bank" }, /*#__PURE__*/
      React.createElement("label", { for: "bankButton" }, "Bank"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/
      React.createElement("input", { onClick: this.handleBank, type: "button", id: "bankButton", className: "btn" })))));





  }}




ReactDOM.render( /*#__PURE__*/
React.createElement(App, null),
document.getElementById('root'));